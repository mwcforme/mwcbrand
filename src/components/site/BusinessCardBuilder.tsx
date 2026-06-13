import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import assetMap from "@/data/asset-map.json";

const A = assetMap as Record<string, string>;

// Relative URLs keep SSR and client markup identical (no hydration mismatch)
// and resolve fine for both <img> and fetch in the browser.
const WORDMARK_WHITE_URL = A["assets/logos/png/print_wordmark_white_on_trans_4000x920.png"];
const WORDMARK_NAVY_URL  = A["assets/logos/png/print_wordmark_navy_on_trans_4000x920.png"];

// Brand colors
const NAVY   = { hex: "#0B1029" };
const CREAM  = { hex: "#F5F3F0" };
const ORANGE = { hex: "#E8670A" };
const ORANGE_TEXT_HEX = "#A04108";
const BLACK = "#000000";
const WHITE = "#FFFFFF";

/* ----------------------- Design options (brand-safe) ----------------------- */

export type CardBg = "navy" | "cream" | "white" | "orange";
export type CardTextChoice = "auto" | "navy" | "cream" | "white" | "orange";
export type TextPos = "top" | "middle" | "bottom";
export type TextAlign = "left" | "center" | "right";

const BG_HEX: Record<CardBg, string> = {
  navy: NAVY.hex, cream: CREAM.hex, white: WHITE, orange: ORANGE.hex,
};
const isDarkBg = (bg: CardBg) => bg === "navy";

// Resolve a text choice against a background. "auto" picks the brand pairing
// with the best contrast; "orange" on light backgrounds maps to the accessible
// text orange (#A04108) per the brand accessibility audit.
function textHex(choice: CardTextChoice, bg: CardBg): string {
  if (choice === "auto") return isDarkBg(bg) ? CREAM.hex : NAVY.hex;
  if (choice === "orange") return isDarkBg(bg) ? ORANGE.hex : ORANGE_TEXT_HEX;
  if (choice === "navy") return NAVY.hex;
  if (choice === "cream") return CREAM.hex;
  return WHITE;
}

// Accent for the tagline and rules — orange except on the orange background.
function accentHex(bg: CardBg): string {
  return bg === "orange" ? NAVY.hex : ORANGE.hex;
}

// Accent for the back offer line.
function offerAccentHex(bg: CardBg): string {
  if (bg === "navy") return ORANGE.hex;
  if (bg === "orange") return NAVY.hex;
  return ORANGE_TEXT_HEX;
}

// WCAG relative-luminance contrast, for the soft warning in the form.
function relLum(hex: string) {
  const h = hex.replace("#", "");
  const f = (i: number) => {
    const c = parseInt(h.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(0) + 0.7152 * f(2) + 0.0722 * f(4);
}
function contrastRatio(a: string, b: string) {
  const [l1, l2] = [relLum(a), relLum(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

type Fields = {
  headline: string;
  subhead: string;
  offer: string;
  referralUrl: string;
  caption: string;
  qrStyle: QrStyle;
  frontBg: CardBg;
  backBg: CardBg;
  headlineColor: CardTextChoice;
  bodyColor: CardTextChoice;
  textPos: TextPos;
  textAlign: TextAlign;
};

const DEFAULTS: Fields = {
  headline: "Refer a friend.",
  subhead: "Know someone who'd benefit from feeling like themselves again?",
  offer: "You both get $100 off your next visit.",
  referralUrl: "https://go.menswellnesscenters.com/refer",
  caption: "Scan to refer",
  qrStyle: "rounded",
  frontBg: "navy",
  backBg: "cream",
  headlineColor: "auto",
  bodyColor: "auto",
  textPos: "bottom",
  textAlign: "center",
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

// Bleed presets — Vistaprint's business-card template is 3.58 × 2.08 in (0.04 in
// bleed); most commercial printers (GotPrint, UPrinting, 4over…) want 0.125 in.
export type PrintPreset = "standard" | "vistaprint";
export const PRINT_PRESETS: Record<PrintPreset, { label: string; bleedIn: number }> = {
  standard:   { label: "Standard ⅛″", bleedIn: 0.125 },
  vistaprint: { label: "Vistaprint", bleedIn: 0.04 },
};

type PdfOpts = { bleedIn: number; cropMarks: boolean };

function pageDims(bleedIn: number) {
  const BLEED = bleedIn * IN;
  return { BLEED, PAGE_W: TRIM_W + BLEED * 2, PAGE_H: TRIM_H + BLEED * 2 };
}

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
  if (!res.ok) throw new Error(`Asset fetch failed (${res.status}): ${url}`);
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

async function buildPdf(f: Fields, opts: PdfOpts): Promise<Uint8Array> {
  const { BLEED, PAGE_W, PAGE_H } = pageDims(opts.bleedIn);
  const pdf = await PDFDocument.create();
  pdf.setTitle("MWC Referral Card");
  pdf.setCreator("Men's Wellness Centers Brand Site");
  const helv     = await pdf.embedFont(StandardFonts.Helvetica);
  const helvBold = await pdf.embedFont(StandardFonts.HelveticaBold);

  // TrimBox/BleedBox let print uploaders (Vistaprint etc.) auto-detect the cut line.
  const setPrintBoxes = (page: ReturnType<PDFDocument["addPage"]>) => {
    page.setBleedBox(0, 0, PAGE_W, PAGE_H);
    page.setTrimBox(BLEED, BLEED, TRIM_W, TRIM_H);
  };

  const wordmarkWhitePng = await pdf.embedPng(await fetchPngBytes(WORDMARK_WHITE_URL));
  const wordmarkNavyPng  = await pdf.embedPng(await fetchPngBytes(WORDMARK_NAVY_URL));

  // QR — pure black on white for maximum scan contrast; drawn on a white plate on the cream back.
  const backQr = await pdf.embedPng(
    await prettyQrPngBytes(f.referralUrl, { dark: BLACK, light: WHITE, style: f.qrStyle }, 900),
  );

  /* ---------------- FRONT — brand promo ---------------- */
  const front = pdf.addPage([PAGE_W, PAGE_H]);
  setPrintBoxes(front);
  front.drawRectangle({ x: 0, y: 0, width: PAGE_W, height: PAGE_H, color: rgbHex(BG_HEX[f.frontBg]) });

  const frontWordmark = isDarkBg(f.frontBg) ? wordmarkWhitePng : wordmarkNavyPng;
  const fHeadHex = textHex(f.headlineColor, f.frontBg);
  const fBodyHex = textHex(f.bodyColor, f.frontBg);
  const fAccentHex = accentHex(f.frontBg);

  {
    // Wrapped copy + measurements first, so position math knows the block size
    const maxW = TRIM_W - 0.5 * IN;
    const hsize = 14, osize = 8;
    const headGap = 0.21 * IN, offerGap = 0.12 * IN, headOfferGap = 0.18 * IN;
    const hLines = wrapText(f.headline.toUpperCase(), helvBold, hsize, maxW);
    const oLines = wrapText(f.offer, helv, osize, maxW);
    // first headline baseline → last offer baseline
    const blockH = (hLines.length - 1) * headGap + headOfferGap + (oLines.length - 1) * offerGap;

    const wmW = 2.1 * IN;
    const wmH = wmW * (frontWordmark.height / frontWordmark.width);

    // Vertical placement: the promo block moves; the wordmark lockup takes the
    // opposite end (or stays top when the block is centered).
    let promoTop: number; // baseline of the first headline line
    let wmY: number;      // bottom edge of the wordmark image
    if (f.textPos === "top") {
      promoTop = PAGE_H - BLEED - 0.45 * IN;
      wmY = BLEED + 0.50 * IN;
    } else if (f.textPos === "middle") {
      promoTop = (PAGE_H + blockH) / 2 - 0.05 * IN;
      wmY = PAGE_H - BLEED - 0.42 * IN - wmH;
    } else {
      promoTop = BLEED + 0.42 * IN + (hLines.length - 1) * headGap;
      wmY = PAGE_H - BLEED - 0.42 * IN - wmH;
    }

    const alignX = (w: number) =>
      f.textAlign === "left" ? BLEED + 0.25 * IN :
      f.textAlign === "right" ? PAGE_W - BLEED - 0.25 * IN - w :
      (PAGE_W - w) / 2;

    // Wordmark lockup (always centered) + tagline in the accent color
    front.drawImage(frontWordmark, { x: (PAGE_W - wmW) / 2, y: wmY, width: wmW, height: wmH });
    const tag = "FIND YOUR EDGE OVER AGE.";
    const tw = helvBold.widthOfTextAtSize(tag, 8);
    front.drawText(tag, {
      x: (PAGE_W - tw) / 2, y: wmY - 0.22 * IN, size: 8, font: helvBold, color: rgbHex(fAccentHex),
    });

    // Promo block
    let y = promoTop;
    for (const line of hLines) {
      front.drawText(line, { x: alignX(helvBold.widthOfTextAtSize(line, hsize)), y, size: hsize, font: helvBold, color: rgbHex(fHeadHex) });
      y -= headGap;
    }
    y = promoTop - (hLines.length - 1) * headGap - headOfferGap;
    for (const line of oLines) {
      front.drawText(line, { x: alignX(helv.widthOfTextAtSize(line, osize)), y, size: osize, font: helv, color: rgbHex(fBodyHex) });
      y -= offerGap;
    }
  }

  // Bottom accent rule
  front.drawRectangle({ x: BLEED, y: BLEED, width: TRIM_W, height: 2, color: rgbHex(fAccentHex) });

  if (opts.cropMarks) drawCropMarks(front, BLEED, PAGE_W, PAGE_H);

  /* ---------------- BACK — QR + how it works ---------------- */
  const back = pdf.addPage([PAGE_W, PAGE_H]);
  setPrintBoxes(back);
  back.drawRectangle({ x: 0, y: 0, width: PAGE_W, height: PAGE_H, color: rgbHex(BG_HEX[f.backBg]) });

  const backWordmark = isDarkBg(f.backBg) ? wordmarkWhitePng : wordmarkNavyPng;
  const bHeadHex = textHex(f.headlineColor, f.backBg);
  const bBodyHex = textHex(f.bodyColor, f.backBg);
  const bOfferHex = offerAccentHex(f.backBg);
  const bAccentHex = accentHex(f.backBg);

  // Left column: explainer text — width stops short of the vertical rule at 2.05 in
  const innerX = BLEED + 0.24 * IN;
  const colW = 1.66 * IN;
  let cursorY = PAGE_H - BLEED - 0.34 * IN;

  // Small wordmark
  {
    const wmW = 1.0 * IN;
    const wmH = wmW * (backWordmark.height / backWordmark.width);
    back.drawImage(backWordmark, { x: innerX, y: cursorY - wmH, width: wmW, height: wmH });
    cursorY -= wmH + 0.14 * IN;
  }

  // Headline (wrapped)
  for (const line of wrapText(f.headline.toUpperCase(), helvBold, 12, colW)) {
    back.drawText(line, { x: innerX, y: cursorY, size: 12, font: helvBold, color: rgbHex(bHeadHex) });
    cursorY -= 0.18 * IN;
  }

  // Subhead (wrapped)
  const subLines = wrapText(f.subhead, helv, 7.5, colW);
  for (const line of subLines) {
    back.drawText(line, { x: innerX, y: cursorY, size: 7.5, font: helv, color: rgbHex(bBodyHex) });
    cursorY -= 0.13 * IN;
  }
  cursorY -= 0.04 * IN;

  // Offer in the accent that reads on this background
  const offerLines = wrapText(f.offer, helvBold, 8, colW);
  for (const line of offerLines) {
    back.drawText(line, { x: innerX, y: cursorY, size: 8, font: helvBold, color: rgbHex(bOfferHex) });
    cursorY -= 0.14 * IN;
  }

  // Vertical accent rule
  const ruleX = BLEED + 2.05 * IN;
  back.drawRectangle({
    x: ruleX, y: BLEED + 0.18 * IN, width: 2.5, height: TRIM_H - 0.36 * IN,
    color: rgbHex(bAccentHex),
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
      color: rgbHex(textHex("auto", f.backBg)),
    });
  }

  if (opts.cropMarks) drawCropMarks(back, BLEED, PAGE_W, PAGE_H);
  return pdf.save();
}

function drawCropMarks(page: ReturnType<PDFDocument["addPage"]>, BLEED: number, PAGE_W: number, PAGE_H: number) {
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
  bleedIn,
}: {
  side: "front" | "back";
  fields: Fields;
  showGuides: boolean;
  bleedIn: number;
}) {
  const [svg, setSvg] = useState<string>("");

  useEffect(() => {
    setSvg(prettyQrSvg(fields.referralUrl, { dark: BLACK, light: WHITE, style: fields.qrStyle }));
  }, [fields.referralUrl, fields.qrStyle]);

  const W = 350, H = 200;
  const bleedPx = (bleedIn / 3.5) * W;
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
            background: BG_HEX[isFront ? fields.frontBg : fields.backBg],
            position: "relative",
            overflow: "hidden",
            borderRadius: 2,
            boxShadow: "0 8px 28px rgba(11,16,41,0.18)",
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          {isFront ? (() => {
            const bg = fields.frontBg;
            const wordmark = isDarkBg(bg) ? WORDMARK_WHITE_URL : WORDMARK_NAVY_URL;
            const alignItems =
              fields.textAlign === "left" ? "flex-start" :
              fields.textAlign === "right" ? "flex-end" : "center";
            const promo = (
              <div key="promo" style={{
                display: "flex", flexDirection: "column", gap: 4,
                alignItems, textAlign: fields.textAlign, padding: "0 18px",
              }}>
                <div style={{
                  fontFamily: "Oswald, sans-serif", fontWeight: 700, fontSize: 18,
                  letterSpacing: "0.06em", color: textHex(fields.headlineColor, bg), textTransform: "uppercase",
                }}>
                  {fields.headline}
                </div>
                <div style={{ fontSize: 9, color: textHex(fields.bodyColor, bg) }}>
                  {fields.offer}
                </div>
              </div>
            );
            const lockup = (
              <div key="lockup" style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
              }}>
                <img src={wordmark} alt="" style={{ height: 30, width: "auto" }} />
                <div style={{
                  fontSize: 9, fontWeight: 700, letterSpacing: "0.22em",
                  color: accentHex(bg), textTransform: "uppercase",
                }}>
                  Find Your Edge Over Age.
                </div>
              </div>
            );
            const spacer = <div key="spacer" style={{ flex: 1 }} />;
            const order =
              fields.textPos === "top" ? [promo, spacer, lockup] :
              fields.textPos === "middle" ? [lockup, spacer, promo, <div key="spacer2" style={{ flex: 1 }} />] :
              [lockup, spacer, promo];
            return (
              <>
                <div style={{
                  position: "absolute", inset: 0, display: "flex", flexDirection: "column",
                  padding: "22px 0 26px",
                }}>
                  {order}
                </div>
                <div style={{
                  position: "absolute", left: 12, right: 12, bottom: 6, height: 2,
                  background: accentHex(bg),
                }} />
              </>
            );
          })() : (() => {
            const bg = fields.backBg;
            const wordmark = isDarkBg(bg) ? WORDMARK_WHITE_URL : WORDMARK_NAVY_URL;
            return (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2.5px 130px", height: "100%", padding: 16, gap: 12 }}>
              <div style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 6 }}>
                <img src={wordmark} alt="" style={{ height: 18, width: "auto", alignSelf: "flex-start" }} />
                <div style={{
                  fontFamily: "Oswald, sans-serif", fontWeight: 700, fontSize: 15,
                  letterSpacing: "0.04em", color: textHex(fields.headlineColor, bg), textTransform: "uppercase", lineHeight: 1.1,
                }}>
                  {fields.headline}
                </div>
                <div style={{ fontSize: 8.5, color: textHex(fields.bodyColor, bg), lineHeight: 1.4 }}>
                  {fields.subhead}
                </div>
                <div style={{
                  fontSize: 9.5, fontWeight: 700, color: offerAccentHex(bg), lineHeight: 1.3, marginTop: 2,
                }}>
                  {fields.offer}
                </div>
              </div>
              <div style={{ background: accentHex(bg), width: 2.5, borderRadius: 1 }} />
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, justifyContent: "center" }}>
                <div
                  style={{ width: 110, height: 110, background: WHITE, padding: 4, borderRadius: 3 }}
                  dangerouslySetInnerHTML={{ __html: svg.replace(/<svg /, '<svg style="width:100%;height:100%;display:block;" ') }}
                />
                <div style={{
                  fontSize: 8, fontWeight: 700, letterSpacing: "0.14em",
                  color: textHex("auto", bg), textTransform: "uppercase", textAlign: "center",
                }}>
                  {fields.caption || "Scan to refer"}
                </div>
              </div>
            </div>
            );
          })()}
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

const BG_OPTIONS: { key: CardBg; hex: string; label: string }[] = [
  { key: "navy", hex: NAVY.hex, label: "Navy" },
  { key: "cream", hex: CREAM.hex, label: "Cream" },
  { key: "white", hex: WHITE, label: "White" },
  { key: "orange", hex: ORANGE.hex, label: "Orange" },
];

const TEXT_OPTIONS: { key: CardTextChoice; hex?: string; label: string }[] = [
  { key: "auto", label: "Auto" },
  ...BG_OPTIONS,
];

function pillStyle(active: boolean): React.CSSProperties {
  return {
    display: "inline-flex", alignItems: "center", gap: 6,
    padding: "5px 9px", borderRadius: 4, cursor: "pointer",
    border: `1px solid ${active ? "var(--orange)" : "var(--cream-deep)"}`,
    boxShadow: active ? "0 0 0 1px var(--orange)" : "none",
    background: "var(--cream)", color: "var(--ink)",
    fontFamily: "Montserrat, sans-serif", fontSize: 10, fontWeight: 700,
    letterSpacing: "0.06em", textTransform: "uppercase",
  };
}

function SwatchRow<T extends string>({
  value, options, onChange,
}: {
  value: T;
  options: { key: T; hex?: string; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
      {options.map((o) => (
        <button key={o.key} type="button" onClick={() => onChange(o.key)} style={pillStyle(value === o.key)}>
          {o.hex && (
            <span style={{
              width: 13, height: 13, borderRadius: "50%", background: o.hex,
              border: "1px solid rgba(11,16,41,0.25)", display: "inline-block",
            }} />
          )}
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function BusinessCardBuilder() {
  const [fields, setFields] = useState<Fields>(DEFAULTS);
  const [showGuides, setShowGuides] = useState(true);
  const [preset, setPreset] = useState<PrintPreset>("standard");
  const [cropMarks, setCropMarks] = useState(false);
  const [status, setStatus] = useState<{ kind: "ok" | "error"; msg: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const lastObjectUrl = useRef<string | null>(null);

  const bleedIn = PRINT_PRESETS[preset].bleedIn;
  const docW = (3.5 + bleedIn * 2).toFixed(2);
  const docH = (2 + bleedIn * 2).toFixed(2);

  // Soft contrast check (3:1 = WCAG large-text minimum) per side and text role
  const contrastWarnings: string[] = [];
  for (const [label, choice, bg] of [
    ["front headline", fields.headlineColor, fields.frontBg],
    ["front offer", fields.bodyColor, fields.frontBg],
    ["back headline", fields.headlineColor, fields.backBg],
    ["back body", fields.bodyColor, fields.backBg],
  ] as [string, CardTextChoice, CardBg][]) {
    if (contrastRatio(textHex(choice, bg), BG_HEX[bg]) < 3) contrastWarnings.push(label);
  }

  function update<K extends keyof Fields>(k: K, v: Fields[K]) {
    setFields((f) => ({ ...f, [k]: v }));
  }

  async function downloadPdf() {
    try {
      setBusy(true);
      const bytes = await buildPdf(fields, { bleedIn, cropMarks });
      const ab = new ArrayBuffer(bytes.byteLength);
      new Uint8Array(ab).set(bytes);
      const blob = new Blob([ab], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      if (lastObjectUrl.current) URL.revokeObjectURL(lastObjectUrl.current);
      lastObjectUrl.current = url;
      const a = document.createElement("a");
      a.href = url;
      a.download = `mwc-referral-card-${preset}.pdf`;
      document.body.appendChild(a); a.click(); a.remove();
      setStatus({
        kind: "ok",
        msg: `Print-ready referral card downloaded (${docW} × ${docH} in full bleed${cropMarks ? ", crop marks" : ""}).`,
      });
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
            referral URL. Edit the copy, pick your printer's bleed preset, then download a
            print-ready PDF (3.5 × 2 in trim, full-bleed, ready to upload to Vistaprint and
            other print services).
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
                  <p style={{
                    fontSize: 11, color: "var(--ink-soft)", marginTop: 6, lineHeight: 1.5,
                    fontFamily: "Montserrat, sans-serif",
                  }}>
                    The QR encodes exactly this URL — open it in a browser and confirm it's live before printing.
                  </p>
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

                <div style={{
                  marginTop: 6, paddingTop: 16,
                  borderTop: "1px solid var(--cream-deep)",
                  display: "grid", gap: 14,
                }}>
                  <div>
                    <label style={labelStyle}>Front background</label>
                    <SwatchRow value={fields.frontBg} options={BG_OPTIONS} onChange={(v) => update("frontBg", v)} />
                  </div>
                  <div>
                    <label style={labelStyle}>Back background</label>
                    <SwatchRow value={fields.backBg} options={BG_OPTIONS} onChange={(v) => update("backBg", v)} />
                  </div>
                  <div>
                    <label style={labelStyle}>Headline color</label>
                    <SwatchRow value={fields.headlineColor} options={TEXT_OPTIONS} onChange={(v) => update("headlineColor", v)} />
                  </div>
                  <div>
                    <label style={labelStyle}>Body text color</label>
                    <SwatchRow value={fields.bodyColor} options={TEXT_OPTIONS} onChange={(v) => update("bodyColor", v)} />
                  </div>
                  <div>
                    <label style={labelStyle}>Text position (front)</label>
                    <div style={{ display: "flex", gap: 6 }}>
                      {(["top", "middle", "bottom"] as TextPos[]).map((p) => (
                        <button key={p} type="button" onClick={() => update("textPos", p)} style={pillStyle(fields.textPos === p)}>
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Text alignment (front)</label>
                    <div style={{ display: "flex", gap: 6 }}>
                      {(["left", "center", "right"] as TextAlign[]).map((a) => (
                        <button key={a} type="button" onClick={() => update("textAlign", a)} style={pillStyle(fields.textAlign === a)}>
                          {a}
                        </button>
                      ))}
                    </div>
                  </div>
                  {contrastWarnings.length > 0 && (
                    <p style={{
                      fontSize: 11, lineHeight: 1.5, margin: 0,
                      fontFamily: "Montserrat, sans-serif", fontWeight: 600,
                      color: "var(--error-text-light)",
                    }}>
                      ⚠ Low contrast: {contrastWarnings.join(", ")}. Pick a different color
                      combination so the card stays readable in print.
                    </p>
                  )}
                </div>

                <div style={{
                  marginTop: 6, paddingTop: 16,
                  borderTop: "1px solid var(--cream-deep)",
                }}>
                  <label style={labelStyle}>Printer preset</label>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {(Object.keys(PRINT_PRESETS) as PrintPreset[]).map((p) => {
                      const active = preset === p;
                      return (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setPreset(p)}
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
                          {PRINT_PRESETS[p].label}
                        </button>
                      );
                    })}
                  </div>
                  <p style={{
                    fontSize: 11, color: "var(--ink-soft)", marginTop: 6, lineHeight: 1.5,
                    fontFamily: "Montserrat, sans-serif",
                  }}>
                    {preset === "vistaprint"
                      ? "3.58 × 2.08 in — matches Vistaprint's standard business-card template."
                      : "3.75 × 2.25 in — the ⅛″ bleed most commercial printers ask for."}
                  </p>
                  <label style={{
                    display: "flex", gap: 8, alignItems: "center", marginTop: 10,
                    fontSize: 12, color: "var(--ink-soft)", fontFamily: "Montserrat, sans-serif",
                  }}>
                    <input type="checkbox" checked={cropMarks} onChange={(e) => setCropMarks(e.target.checked)} />
                    Include crop marks (leave off for online printers like Vistaprint)
                  </label>
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
                  <CardPreview side="front" fields={fields} showGuides={showGuides} bleedIn={bleedIn} />
                  <CardPreview side="back" fields={fields} showGuides={showGuides} bleedIn={bleedIn} />
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
                Output is {docW} × {docH} in full bleed (trim 3.5 × 2 in, {bleedIn} in bleed) with
                TrimBox and BleedBox metadata embedded, so upload tools at Vistaprint, GotPrint, and
                similar printers detect the cut line automatically. QR codes are pure black-and-white
                for maximum scan reliability across lighting conditions.
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
