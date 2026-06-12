import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import assetMap from "@/data/asset-map.json";

const A = assetMap as Record<string, string>;
const ORIGIN = typeof window !== "undefined" ? window.location.origin : "";
const ABS = (path: string) => (path?.startsWith("/") ? ORIGIN + path : path);

const WORDMARK_WHITE_URL = ABS(A["assets/logos/png/print_wordmark_white_on_trans_4000x920.png"]);
const WORDMARK_NAVY_URL  = ABS(A["assets/logos/png/print_wordmark_navy_on_trans_4000x920.png"]);

// Brand colors
const NAVY   = { hex: "#0B1029" };
const CREAM  = { hex: "#F5F3F0" };
const ORANGE = { hex: "#E8670A" };
const ORANGE_TEXT_HEX = "#A04108";
const BLACK = "#000000";
const WHITE = "#FFFFFF";

type Fields = {
  headline: string;
  subhead: string;
  offer: string;
  referralUrl: string;
  caption: string;
  qrStyle: QrStyle;
};

const DEFAULTS: Fields = {
  headline: "Refer a friend.",
  subhead: "Know someone who'd benefit from feeling like themselves again?",
  offer: "You both get $100 off your next visit.",
  referralUrl: "https://go.menswellnesscenters.com/refer",
  caption: "Scan to refer",
  qrStyle: "rounded",
};

/* ---------------------------- QR rendering (B&W) ---------------------------- */

export type QrStyle = "classic" | "dots" | "rounded";
export type QrRenderOpts = { dark: string; light: string; style: QrStyle };

function isFinder(r: number, c: number, n: number) {
  const inBlock = (br: number, bc: number) =>
    r >= br && r < br + 7 && c >= bc && c < bc + 7;
  return inBlock(0, 0) || inBlock(0, n - 7) || inBlock(n - 7, 0);
}

function prettyQrSvg(value: string, opts: QrRenderOpts): string {
  const qr = QRCode.create(value || " ", { errorCorrectionLevel: "M" });
  const n: number = qr.modules.size;
  const data: Uint8Array = qr.modules.data as unknown as Uint8Array;
  const get = (r: number, c: number) =>
    r >= 0 && c >= 0 && r < n && c < n ? data[r * n + c] === 1 : false;

  const { dark, light, style } = opts;
  const parts: string[] = [];
  parts.push(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${n} ${n}" shape-rendering="geometricPrecision">`,
  );
  parts.push(`<rect width="${n}" height="${n}" fill="${light}"/>`);

  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (!get(r, c)) continue;
      if (isFinder(r, c, n)) continue;
      if (style === "dots") {
        parts.push(`<circle cx="${c + 0.5}" cy="${r + 0.5}" r="0.42" fill="${dark}"/>`);
      } else if (style === "rounded") {
        parts.push(`<rect x="${c + 0.06}" y="${r + 0.06}" width="0.88" height="0.88" rx="0.32" ry="0.32" fill="${dark}"/>`);
      } else {
        parts.push(`<rect x="${c}" y="${r}" width="1" height="1" fill="${dark}"/>`);
      }
    }
  }

  const eyes = [{ x: 0, y: 0 }, { x: n - 7, y: 0 }, { x: 0, y: n - 7 }];
  const outerRx = style === "classic" ? 0.6 : 1.8;
  const innerRx = style === "classic" ? 0.3 : 1.0;
  for (const e of eyes) {
    parts.push(
      `<rect x="${e.x + 0.5}" y="${e.y + 0.5}" width="6" height="6" rx="${outerRx}" ry="${outerRx}" fill="none" stroke="${dark}" stroke-width="1"/>`,
    );
    parts.push(
      `<rect x="${e.x + 2}" y="${e.y + 2}" width="3" height="3" rx="${innerRx}" ry="${innerRx}" fill="${dark}"/>`,
    );
  }
  parts.push(`</svg>`);
  return parts.join("");
}

async function prettyQrPngBytes(value: string, opts: QrRenderOpts, pxSize = 900): Promise<Uint8Array> {
  const svg = prettyQrSvg(value, opts);
  const svgBlob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const i = new Image();
      i.onload = () => resolve(i);
      i.onerror = reject;
      i.src = url;
    });
    const canvas = document.createElement("canvas");
    canvas.width = pxSize;
    canvas.height = pxSize;
    const ctx = canvas.getContext("2d")!;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.fillStyle = opts.light;
    ctx.fillRect(0, 0, pxSize, pxSize);
    ctx.drawImage(img, 0, 0, pxSize, pxSize);
    const dataUrl = canvas.toDataURL("image/png");
    const b64 = dataUrl.split(",")[1];
    const bin = atob(b64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return bytes;
  } finally {
    URL.revokeObjectURL(url);
  }
}

/* ---------------------------- PDF builder ---------------------------- */

const IN = 72;
const TRIM_W = 3.5 * IN;
const TRIM_H = 2.0 * IN;
const BLEED  = 0.125 * IN;
const PAGE_W = TRIM_W + BLEED * 2;
const PAGE_H = TRIM_H + BLEED * 2;

function rgbHex(hex: string) {
  const h = hex.replace("#", "");
  return rgb(
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255,
  );
}

async function fetchPngBytes(url: string): Promise<Uint8Array> {
  const res = await fetch(url);
  const buf = await res.arrayBuffer();
  return new Uint8Array(buf);
}

// Naive word-wrap for pdf-lib drawText
function wrapText(text: string, font: import("pdf-lib").PDFFont, size: number, maxWidth: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    const test = cur ? cur + " " + w : w;
    if (font.widthOfTextAtSize(test, size) <= maxWidth) cur = test;
    else { if (cur) lines.push(cur); cur = w; }
  }
  if (cur) lines.push(cur);
  return lines;
}

async function buildPdf(f: Fields): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  const helv     = await pdf.embedFont(StandardFonts.Helvetica);
  const helvBold = await pdf.embedFont(StandardFonts.HelveticaBold);

  const wordmarkWhitePng = await pdf.embedPng(await fetchPngBytes(WORDMARK_WHITE_URL));
  const wordmarkNavyPng  = await pdf.embedPng(await fetchPngBytes(WORDMARK_NAVY_URL));

  // QR — pure B&W. Front (on cream) = black on white. Back (on navy) = white on black tile.
  const frontQr = await pdf.embedPng(
    await prettyQrPngBytes(f.referralUrl, { dark: BLACK, light: WHITE, style: f.qrStyle }, 900),
  );
  const backQr = await pdf.embedPng(
    await prettyQrPngBytes(f.referralUrl, { dark: BLACK, light: WHITE, style: f.qrStyle }, 900),
  );

  /* ---------------- FRONT — brand promo ---------------- */
  const front = pdf.addPage([PAGE_W, PAGE_H]);
  front.drawRectangle({ x: 0, y: 0, width: PAGE_W, height: PAGE_H, color: rgbHex(NAVY.hex) });

  // Big wordmark centered upper
  {
    const wmW = 2.1 * IN;
    const wmH = wmW * (wordmarkWhitePng.height / wordmarkWhitePng.width);
    const wmX = (PAGE_W - wmW) / 2;
    const wmY = PAGE_H - BLEED - 0.42 * IN - wmH;
    front.drawImage(wordmarkWhitePng, { x: wmX, y: wmY, width: wmW, height: wmH });

    const tag = "FIND YOUR EDGE OVER AGE.";
    const fs = 8;
    const tw = helvBold.widthOfTextAtSize(tag, fs);
    front.drawText(tag, {
      x: (PAGE_W - tw) / 2,
      y: wmY - 0.22 * IN,
      size: fs,
      font: helvBold,
      color: rgbHex(ORANGE.hex),
    });
  }

  // Promo block bottom
  {
    const headline = f.headline.toUpperCase();
    const hsize = 14;
    const hw = helvBold.widthOfTextAtSize(headline, hsize);
    const hx = (PAGE_W - hw) / 2;
    const hy = BLEED + 0.42 * IN;
    front.drawText(headline, { x: hx, y: hy, size: hsize, font: helvBold, color: rgbHex(CREAM.hex) });

    const offer = f.offer;
    const osize = 8;
    const ow = helv.widthOfTextAtSize(offer, osize);
    front.drawText(offer, {
      x: (PAGE_W - ow) / 2,
      y: hy - 0.18 * IN,
      size: osize,
      font: helv,
      color: rgbHex(CREAM.hex),
    });
  }

  // Bottom orange rule
  front.drawRectangle({ x: BLEED, y: BLEED, width: TRIM_W, height: 2, color: rgbHex(ORANGE.hex) });

  drawCropMarks(front);

  /* ---------------- BACK — QR + how it works ---------------- */
  const back = pdf.addPage([PAGE_W, PAGE_H]);
  back.drawRectangle({ x: 0, y: 0, width: PAGE_W, height: PAGE_H, color: rgbHex(CREAM.hex) });

  // Left column: explainer text
  const innerX = BLEED + 0.24 * IN;
  const colW = 2.0 * IN;
  let cursorY = PAGE_H - BLEED - 0.34 * IN;

  // Small navy wordmark
  {
    const wmW = 1.0 * IN;
    const wmH = wmW * (wordmarkNavyPng.height / wordmarkNavyPng.width);
    back.drawImage(wordmarkNavyPng, { x: innerX, y: cursorY - wmH, width: wmW, height: wmH });
    cursorY -= wmH + 0.14 * IN;
  }

  // Headline
  back.drawText(f.headline.toUpperCase(), {
    x: innerX, y: cursorY, size: 12, font: helvBold, color: rgbHex(NAVY.hex),
  });
  cursorY -= 0.18 * IN;

  // Subhead (wrapped)
  const subLines = wrapText(f.subhead, helv, 7.5, colW);
  for (const line of subLines) {
    back.drawText(line, { x: innerX, y: cursorY, size: 7.5, font: helv, color: rgbHex(NAVY.hex) });
    cursorY -= 0.13 * IN;
  }
  cursorY -= 0.04 * IN;

  // Offer in orange
  const offerLines = wrapText(f.offer, helvBold, 8, colW);
  for (const line of offerLines) {
    back.drawText(line, { x: innerX, y: cursorY, size: 8, font: helvBold, color: rgbHex(ORANGE_TEXT_HEX) });
    cursorY -= 0.14 * IN;
  }

  // Vertical orange rule
  const ruleX = BLEED + 2.05 * IN;
  back.drawRectangle({
    x: ruleX, y: BLEED + 0.18 * IN, width: 2.5, height: TRIM_H - 0.36 * IN,
    color: rgbHex(ORANGE.hex),
  });

  // Right column: QR + caption
  {
    const rightX = ruleX + 0.16 * IN;
    const rightW = PAGE_W - BLEED - 0.18 * IN - rightX;
    const qrSize = Math.min(1.15 * IN, rightW);
    const qx = rightX + (rightW - qrSize) / 2;
    const qy = (PAGE_H - qrSize) / 2 + 0.05 * IN;

    // White plate behind QR for clean B&W contrast on cream
    back.drawRectangle({
      x: qx - 4, y: qy - 4, width: qrSize + 8, height: qrSize + 8, color: rgbHex(WHITE),
    });
    back.drawImage(backQr, { x: qx, y: qy, width: qrSize, height: qrSize });

    const capU = (f.caption || "Scan to refer").toUpperCase();
    const cw = helvBold.widthOfTextAtSize(capU, 7);
    back.drawText(capU, {
      x: rightX + (rightW - cw) / 2,
      y: qy - 0.20 * IN,
      size: 7,
      font: helvBold,
      color: rgbHex(NAVY.hex),
    });
  }

  drawCropMarks(back);
  return pdf.save();
}

function drawCropMarks(page: ReturnType<PDFDocument["addPage"]>) {
  const len = 0.1 * IN;
  const off = 0.02 * IN;
  const col = rgbHex("#000000");
  const t = 0.4;
  const corners = [
    { x: BLEED, y: BLEED },
    { x: PAGE_W - BLEED, y: BLEED },
    { x: BLEED, y: PAGE_H - BLEED },
    { x: PAGE_W - BLEED, y: PAGE_H - BLEED },
  ];
  for (const c of corners) {
    const hx = c.x === BLEED ? c.x - off - len : c.x + off;
    page.drawRectangle({ x: hx, y: c.y - t / 2, width: len, height: t, color: col });
    const vy = c.y === BLEED ? c.y - off - len : c.y + off;
    page.drawRectangle({ x: c.x - t / 2, y: vy, width: t, height: len, color: col });
  }
}

/* ---------------------------- UI ---------------------------- */

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  border: "1px solid var(--cream-deep)",
  borderRadius: 4,
  fontFamily: "Montserrat, sans-serif",
  fontSize: 14,
  color: "var(--ink)",
  background: "var(--cream)",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "Montserrat, sans-serif",
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "var(--caption-light)",
  marginBottom: 6,
};

function CardPreview({
  side,
  fields,
  showGuides,
}: {
  side: "front" | "back";
  fields: Fields;
  showGuides: boolean;
}) {
  const [svg, setSvg] = useState<string>("");

  useEffect(() => {
    setSvg(prettyQrSvg(fields.referralUrl, { dark: BLACK, light: WHITE, style: fields.qrStyle }));
  }, [fields.referralUrl, fields.qrStyle]);

  const W = 350, H = 200;
  const bleedPx = (0.125 / 3.5) * W;
  const isFront = side === "front";

  return (
    <div style={{ display: "inline-block" }}>
      <div
        style={{
          position: "relative",
          width: W + bleedPx * 2,
          height: H + bleedPx * 2,
          padding: bleedPx,
          background: showGuides ? "repeating-linear-gradient(45deg, #f0d4b8 0 4px, transparent 4px 8px)" : "transparent",
          boxSizing: "content-box",
          borderRadius: 4,
        }}
      >
        <div
          style={{
            width: W,
            height: H,
            background: isFront ? NAVY.hex : CREAM.hex,
            color: isFront ? CREAM.hex : NAVY.hex,
            position: "relative",
            overflow: "hidden",
            borderRadius: 2,
            boxShadow: "0 8px 28px rgba(11,16,41,0.18)",
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          {isFront ? (
            <>
              <div style={{
                position: "absolute", top: 22, left: 0, right: 0,
                display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
              }}>
                <img src={WORDMARK_WHITE_URL} alt="" style={{ height: 30, width: "auto" }} />
                <div style={{
                  fontSize: 9, fontWeight: 700, letterSpacing: "0.22em",
                  color: ORANGE.hex, textTransform: "uppercase",
                }}>
                  Find Your Edge Over Age.
                </div>
              </div>
              <div style={{
                position: "absolute", left: 0, right: 0, bottom: 26,
                display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "0 18px",
              }}>
                <div style={{
                  fontFamily: "Oswald, sans-serif", fontWeight: 700, fontSize: 18,
                  letterSpacing: "0.06em", color: CREAM.hex, textTransform: "uppercase", textAlign: "center",
                }}>
                  {fields.headline}
                </div>
                <div style={{ fontSize: 9, color: CREAM.hex, textAlign: "center", opacity: 0.9 }}>
                  {fields.offer}
                </div>
              </div>
              <div style={{
                position: "absolute", left: 12, right: 12, bottom: 6, height: 2,
                background: ORANGE.hex,
              }} />
            </>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2.5px 130px", height: "100%", padding: 16, gap: 12 }}>
              <div style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 6 }}>
                <img src={WORDMARK_NAVY_URL} alt="" style={{ height: 18, width: "auto", alignSelf: "flex-start" }} />
                <div style={{
                  fontFamily: "Oswald, sans-serif", fontWeight: 700, fontSize: 15,
                  letterSpacing: "0.04em", color: NAVY.hex, textTransform: "uppercase", lineHeight: 1.1,
                }}>
                  {fields.headline}
                </div>
                <div style={{ fontSize: 8.5, color: NAVY.hex, lineHeight: 1.4 }}>
                  {fields.subhead}
                </div>
                <div style={{
                  fontSize: 9.5, fontWeight: 700, color: ORANGE_TEXT_HEX, lineHeight: 1.3, marginTop: 2,
                }}>
                  {fields.offer}
                </div>
              </div>
              <div style={{ background: ORANGE.hex, width: 2.5, borderRadius: 1 }} />
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, justifyContent: "center" }}>
                <div
                  style={{ width: 110, height: 110, background: WHITE, padding: 4, borderRadius: 3 }}
                  dangerouslySetInnerHTML={{ __html: svg.replace(/<svg /, '<svg style="width:100%;height:100%;display:block;" ') }}
                />
                <div style={{
                  fontSize: 8, fontWeight: 700, letterSpacing: "0.14em",
                  color: NAVY.hex, textTransform: "uppercase", textAlign: "center",
                }}>
                  {fields.caption || "Scan to refer"}
                </div>
              </div>
            </div>
          )}
        </div>

        {showGuides && (
          <div style={{
            position: "absolute", inset: bleedPx,
            border: "1px dashed rgba(232,103,10,0.55)", pointerEvents: "none",
          }} />
        )}
      </div>
      <div style={{
        marginTop: 8, fontFamily: "Montserrat, sans-serif", fontSize: 11, fontWeight: 700,
        letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--caption-light)",
        textAlign: "center", width: W + bleedPx * 2,
      }}>
        {isFront ? "Front" : "Back"}
      </div>
    </div>
  );
}

export function BusinessCardBuilder() {
  const [fields, setFields] = useState<Fields>(DEFAULTS);
  const [showGuides, setShowGuides] = useState(true);
  const [status, setStatus] = useState<{ kind: "ok" | "error"; msg: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const lastObjectUrl = useRef<string | null>(null);

  function update<K extends keyof Fields>(k: K, v: Fields[K]) {
    setFields((f) => ({ ...f, [k]: v }));
  }

  async function downloadPdf() {
    try {
      setBusy(true);
      const bytes = await buildPdf(fields);
      const ab = new ArrayBuffer(bytes.byteLength);
      new Uint8Array(ab).set(bytes);
      const blob = new Blob([ab], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      if (lastObjectUrl.current) URL.revokeObjectURL(lastObjectUrl.current);
      lastObjectUrl.current = url;
      const a = document.createElement("a");
      a.href = url;
      a.download = `mwc-referral-card.pdf`;
      document.body.appendChild(a); a.click(); a.remove();
      setStatus({ kind: "ok", msg: "Print-ready referral card downloaded (3.75 × 2.25 in with bleed + crop marks)." });
    } catch (e) {
      console.error(e);
      setStatus({ kind: "error", msg: "PDF export failed. Check the console for details." });
    } finally {
      setBusy(false);
    }
  }

  function reset() { setFields(DEFAULTS); setStatus(null); }

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Brand Applications</p>
          <h1>Referral Card.</h1>
          <p>
            A promo handout — not a personal business card. Front carries the brand and the
            offer; back explains how to refer and pairs a clean black-and-white QR with the
            referral URL. Edit the copy, then download a print-ready PDF
            (3.5 × 2 in landscape, 0.125 in bleed, crop marks).
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          <div
            className="card-builder-grid"
            style={{
              display: "grid",
              gap: 32,
              gridTemplateColumns: "minmax(0, 360px) minmax(0, 1fr)",
              alignItems: "start",
            }}
          >
            {/* FORM */}
            <div style={{
              background: "var(--cream)",
              border: "1px solid var(--cream-deep)",
              borderRadius: 8,
              padding: 28,
              position: "sticky",
              top: 96,
              maxHeight: "calc(100vh - 120px)",
              overflowY: "auto",
            }}>
              <p className="eyebrow" style={{ marginBottom: 8 }}>Card Copy</p>
              <h3 style={{ marginBottom: 20, fontSize: 22 }}>Edit promo.</h3>

              <div style={{ display: "grid", gap: 14 }}>
                <div>
                  <label style={labelStyle}>Headline</label>
                  <input style={inputStyle} value={fields.headline} onChange={(e) => update("headline", e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>Subhead (back only)</label>
                  <textarea
                    style={{ ...inputStyle, minHeight: 64, resize: "vertical", fontFamily: "Montserrat, sans-serif" }}
                    value={fields.subhead}
                    onChange={(e) => update("subhead", e.target.value)}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Offer</label>
                  <input style={inputStyle} value={fields.offer} onChange={(e) => update("offer", e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>Referral URL</label>
                  <input style={inputStyle} value={fields.referralUrl} onChange={(e) => update("referralUrl", e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>QR caption</label>
                  <input style={inputStyle} value={fields.caption} onChange={(e) => update("caption", e.target.value)} />
                </div>

                <div style={{
                  marginTop: 6, paddingTop: 16,
                  borderTop: "1px solid var(--cream-deep)",
                }}>
                  <label style={labelStyle}>QR style (always black &amp; white)</label>
                  <div style={{ display: "flex", gap: 6 }}>
                    {(["rounded", "dots", "classic"] as QrStyle[]).map((s) => {
                      const active = fields.qrStyle === s;
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => update("qrStyle", s)}
                          style={{
                            padding: "6px 10px",
                            borderRadius: 4,
                            border: `1px solid ${active ? "var(--orange)" : "var(--cream-deep)"}`,
                            background: active ? "var(--orange)" : "var(--cream)",
                            color: active ? "var(--cream)" : "var(--ink)",
                            fontFamily: "Montserrat, sans-serif",
                            fontSize: 11, fontWeight: 700,
                            letterSpacing: "0.08em", textTransform: "uppercase",
                            cursor: "pointer",
                          }}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={reset}
                  style={{
                    marginTop: 4, background: "transparent", border: "none",
                    color: "var(--ink-soft)", fontSize: 12, fontFamily: "Montserrat, sans-serif",
                    letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600,
                    cursor: "pointer", textAlign: "left", padding: 0,
                  }}
                >
                  ↺ Reset to example
                </button>
              </div>
            </div>

            {/* PREVIEW + ACTIONS */}
            <div style={{ display: "grid", gap: 24 }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
                  <div>
                    <p className="eyebrow" style={{ marginBottom: 8 }}>Live Preview</p>
                    <h3 style={{ fontSize: 22 }}>Front and back at trim size.</h3>
                  </div>
                  <label style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 12, color: "var(--ink-soft)" }}>
                    <input type="checkbox" checked={showGuides} onChange={(e) => setShowGuides(e.target.checked)} />
                    Show bleed + safe area
                  </label>
                </div>

                <div style={{
                  background: "#f0eee8",
                  border: "1px solid var(--cream-deep)",
                  borderRadius: 8,
                  padding: 28,
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 32,
                  justifyContent: "center",
                }}>
                  <CardPreview side="front" fields={fields} showGuides={showGuides} />
                  <CardPreview side="back" fields={fields} showGuides={showGuides} />
                </div>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
                <button type="button" className="btn btn-primary" onClick={downloadPdf} disabled={busy}>
                  {busy ? "Building PDF…" : "Download Print-Ready PDF"}
                </button>
                {status && (
                  <span role="status" style={{
                    fontFamily: "Montserrat, sans-serif", fontSize: 13, fontWeight: 600,
                    color: status.kind === "error" ? "var(--error-text-light)" : "var(--success-text)",
                  }}>
                    {status.msg}
                  </span>
                )}
              </div>

              <p style={{ fontSize: 12, color: "var(--ink-soft)", lineHeight: 1.6 }}>
                Output is RGB at 3.75 × 2.25 in (trim 3.5 × 2 in, 0.125 in bleed) with crop marks at each corner.
                QR codes are pure black-and-white for maximum scan reliability across lighting conditions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-alt">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Hand it out</p>
            <h2>Three ways to use it.</h2>
            <p>Same card, multiple drop points. Keep a stack at every front desk.</p>
          </div>
          <div className="grid grid-3">
            <div className="card"><div className="card-body">
              <h3>1. At the counter</h3>
              <p>Tuck one into every checkout folder. Patients leave feeling great — give them something to share.</p>
            </div></div>
            <div className="card"><div className="card-body">
              <h3>2. In welcome kits</h3>
              <p>Drop a card into every new-patient packet so they have a referral on hand from day one.</p>
            </div></div>
            <div className="card"><div className="card-body">
              <h3>3. At local events</h3>
              <p>Bring a stack to community sponsorships, gym partnerships, and provider mixers. Same QR every time.</p>
            </div></div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .card-builder-grid { grid-template-columns: 1fr !important; }
          .card-builder-grid > div:first-child { position: static !important; max-height: none !important; }
        }
      `}</style>
    </>
  );
}
