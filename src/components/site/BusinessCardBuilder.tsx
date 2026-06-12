import { useEffect, useMemo, useRef, useState } from "react";
import QRCode from "qrcode";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import assetMap from "@/data/asset-map.json";

const A = assetMap as Record<string, string>;
const ORIGIN = typeof window !== "undefined" ? window.location.origin : "";
const ABS = (path: string) => (path?.startsWith("/") ? ORIGIN + path : path);

const WORDMARK_WHITE_URL = ABS(A["assets/logos/png/print_wordmark_white_on_trans_4000x920.png"]);
const WORDMARK_NAVY_URL  = ABS(A["assets/logos/png/print_wordmark_navy_on_trans_4000x920.png"]);

// Brand colors
const NAVY   = { r: 0x0b / 255, g: 0x10 / 255, b: 0x29 / 255, hex: "#0B1029" };
const CREAM  = { r: 0xf5 / 255, g: 0xf3 / 255, b: 0xf0 / 255, hex: "#F5F3F0" };
const ORANGE = { r: 0xe8 / 255, g: 0x67 / 255, b: 0x0a / 255, hex: "#E8670A" };
const ORANGE_DARK_HEX = "#B84A08";
const ORANGE_TEXT_HEX = "#A04108";
const RULE_HEX = "#D4D2CE";
const CAPTION_HEX = "#4F555C";

type QrType = "booking" | "profile" | "referral" | "custom" | "vcard";
type QrConfig = { type: QrType; url: string; caption: string };

type Fields = {
  firstName: string;
  lastName: string;
  credentials: string;
  title: string;
  center: string;
  directPhone: string;
  includeDirect: boolean;
  centerPhone: string;
  email: string;
  profileSlug: string;
  front: QrConfig;
  back: QrConfig;
  sameQr: boolean;
};

const DEFAULTS: Fields = {
  firstName: "Michael",
  lastName: "Sample",
  credentials: "",
  title: "Center Director",
  center: "Glen Allen, VA",
  directPhone: "(804) 555-0123",
  includeDirect: true,
  centerPhone: "(804) 555-1000",
  email: "michael.sample@menswellnesscenters.com",
  profileSlug: "michael-sample",
  front: { type: "profile", url: "", caption: "Scan to connect" },
  back:  { type: "booking", url: "https://book.menswellnesscenters.com", caption: "Scan to book" },
  sameQr: false,
};

function digits(s: string) { return s.replace(/\D+/g, ""); }

function buildVCard(f: Fields): string {
  const phones: string[] = [];
  if (f.includeDirect && f.directPhone) phones.push(`TEL;TYPE=WORK,VOICE:+1${digits(f.directPhone)}`);
  if (f.centerPhone) phones.push(`TEL;TYPE=WORK,MAIN:+1${digits(f.centerPhone)}`);
  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${f.lastName};${f.firstName};;;${f.credentials}`,
    `FN:${f.firstName} ${f.lastName}${f.credentials ? ", " + f.credentials : ""}`,
    "ORG:Men's Wellness Centers",
    `TITLE:${f.title}`,
    ...phones,
    `EMAIL;TYPE=WORK:${f.email}`,
    "URL:https://menswellnesscenters.com",
    `ADR;TYPE=WORK:;;;${f.center};;;`,
    "END:VCARD",
  ].join("\n");
}

function resolveQrValue(side: QrConfig, f: Fields): string {
  switch (side.type) {
    case "booking":  return side.url || "https://book.menswellnesscenters.com";
    case "profile":  return side.url || `https://menswellnesscenters.com/team/${f.profileSlug || "team"}`;
    case "referral": return side.url || "https://go.menswellnesscenters.com/refer";
    case "custom":   return side.url || "https://menswellnesscenters.com";
    case "vcard":    return buildVCard(f);
  }
}

function defaultUrlFor(type: QrType, f: Fields): string {
  switch (type) {
    case "booking":  return "https://book.menswellnesscenters.com";
    case "profile":  return `https://menswellnesscenters.com/team/${f.profileSlug || "team"}`;
    case "referral": return "https://go.menswellnesscenters.com/refer";
    case "custom":   return "";
    case "vcard":    return "";
  }
}
function defaultCaptionFor(type: QrType): string {
  switch (type) {
    case "booking":  return "Scan to book";
    case "profile":  return "Scan to connect";
    case "referral": return "Refer a friend";
    case "custom":   return "Scan to learn more";
    case "vcard":    return "Save contact";
  }
}

/* ---------------------------- QR rendering ---------------------------- */

async function qrSvg(value: string, dark: string, light: string): Promise<string> {
  return QRCode.toString(value || " ", {
    type: "svg",
    margin: 0,
    errorCorrectionLevel: "M",
    color: { dark, light },
  });
}
async function qrPngBytes(value: string, dark: string, light: string, size = 600): Promise<Uint8Array> {
  const dataUrl = await QRCode.toDataURL(value || " ", {
    margin: 0,
    width: size,
    errorCorrectionLevel: "M",
    color: { dark, light },
  });
  const b64 = dataUrl.split(",")[1];
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

/* ---------------------------- PDF builder ---------------------------- */

const IN = 72; // points per inch
const TRIM_W = 3.5 * IN;
const TRIM_H = 2.0 * IN;
const BLEED  = 0.125 * IN;
const PAGE_W = TRIM_W + BLEED * 2; // 3.75 in
const PAGE_H = TRIM_H + BLEED * 2; // 2.25 in

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

async function buildPdf(f: Fields): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  const helv      = await pdf.embedFont(StandardFonts.Helvetica);
  const helvBold  = await pdf.embedFont(StandardFonts.HelveticaBold);

  const wordmarkWhitePng = await pdf.embedPng(await fetchPngBytes(WORDMARK_WHITE_URL));
  const wordmarkNavyPng  = await pdf.embedPng(await fetchPngBytes(WORDMARK_NAVY_URL));

  const frontVal = resolveQrValue(f.sameQr ? f.front : f.front, f);
  const backVal  = resolveQrValue(f.sameQr ? f.front : f.back,  f);

  const frontQr = await pdf.embedPng(await qrPngBytes(frontVal, CREAM.hex, NAVY.hex, 700));
  const backQr  = await pdf.embedPng(await qrPngBytes(backVal,  NAVY.hex,  CREAM.hex, 900));

  /* ---------------- FRONT PAGE ---------------- */
  const front = pdf.addPage([PAGE_W, PAGE_H]);
  // Full-bleed navy
  front.drawRectangle({ x: 0, y: 0, width: PAGE_W, height: PAGE_H, color: rgbHex(NAVY.hex) });

  // Wordmark — centered upper area
  {
    const wmW = 1.9 * IN;
    const wmH = wmW * (wordmarkWhitePng.height / wordmarkWhitePng.width);
    const wmX = (PAGE_W - wmW) / 2;
    const wmY = PAGE_H - BLEED - 0.35 * IN - wmH;
    front.drawImage(wordmarkWhitePng, { x: wmX, y: wmY, width: wmW, height: wmH });

    // Tagline
    const tag = "FIND YOUR EDGE OVER AGE.";
    const fs = 7;
    const tw = helvBold.widthOfTextAtSize(tag, fs);
    front.drawText(tag, {
      x: (PAGE_W - tw) / 2,
      y: wmY - 0.18 * IN,
      size: fs,
      font: helvBold,
      color: rgbHex(ORANGE_TEXT_HEX),
      characterSpacing: 1.6,
    });
  }

  // QR bottom-right on cream tile
  {
    const qrSize = 0.7 * IN;
    const pad = 0.06 * IN;
    const tileSize = qrSize + pad * 2;
    const x = PAGE_W - BLEED - 0.18 * IN - tileSize;
    const y = BLEED + 0.18 * IN;
    front.drawRectangle({ x, y, width: tileSize, height: tileSize, color: rgbHex(CREAM.hex) });
    front.drawImage(frontQr, { x: x + pad, y: y + pad, width: qrSize, height: qrSize });

    const cap = (f.sameQr ? f.front.caption : f.front.caption) || defaultCaptionFor(f.front.type);
    const capU = cap.toUpperCase();
    const cw = helvBold.widthOfTextAtSize(capU, 5.5);
    front.drawText(capU, {
      x: x + (tileSize - cw) / 2,
      y: y - 0.13 * IN,
      size: 5.5,
      font: helvBold,
      color: rgbHex(CREAM.hex),
      characterSpacing: 1.2,
    });
  }

  // Bottom orange rule (inside trim)
  front.drawRectangle({
    x: BLEED, y: BLEED, width: TRIM_W, height: 1.5, color: rgbHex(ORANGE.hex),
  });

  drawCropMarks(front);

  /* ---------------- BACK PAGE ---------------- */
  const back = pdf.addPage([PAGE_W, PAGE_H]);
  back.drawRectangle({ x: 0, y: 0, width: PAGE_W, height: PAGE_H, color: rgbHex(CREAM.hex) });

  // Left column content
  const innerX = BLEED + 0.22 * IN;
  const innerY = BLEED + 0.22 * IN;
  const colW = 2.0 * IN;

  const fullName = `${f.firstName} ${f.lastName}${f.credentials ? ", " + f.credentials : ""}`.trim();

  let cursorY = PAGE_H - BLEED - 0.32 * IN;
  back.drawText(fullName, {
    x: innerX, y: cursorY, size: 13, font: helvBold, color: rgbHex(NAVY.hex),
  });
  cursorY -= 0.18 * IN;
  back.drawText(f.title.toUpperCase(), {
    x: innerX, y: cursorY, size: 7, font: helvBold,
    color: rgbHex(ORANGE_TEXT_HEX), characterSpacing: 1.4,
  });
  cursorY -= 0.14 * IN;
  back.drawText(`MEN'S WELLNESS CENTERS  ·  ${f.center.toUpperCase()}`, {
    x: innerX, y: cursorY, size: 6.5, font: helvBold,
    color: rgbHex(NAVY.hex), characterSpacing: 1,
  });

  // Hairline divider
  cursorY -= 0.14 * IN;
  back.drawRectangle({
    x: innerX, y: cursorY, width: colW, height: 0.5, color: rgbHex(RULE_HEX),
  });
  cursorY -= 0.14 * IN;

  // Contact rows
  const rows: Array<[string, string]> = [];
  if (f.includeDirect && f.directPhone) rows.push(["DIRECT", f.directPhone]);
  if (f.centerPhone) rows.push(["CENTER", f.centerPhone]);
  if (f.email) rows.push(["EMAIL", f.email]);
  rows.push(["WEB", "menswellnesscenters.com"]);

  for (const [label, val] of rows) {
    back.drawText(label, {
      x: innerX, y: cursorY, size: 6, font: helvBold,
      color: rgbHex(CAPTION_HEX), characterSpacing: 1.2,
    });
    back.drawText(val, {
      x: innerX + 0.46 * IN, y: cursorY, size: 7.5, font: helv, color: rgbHex(NAVY.hex),
    });
    cursorY -= 0.14 * IN;
  }

  // Vertical orange rule
  const ruleX = BLEED + 2.3 * IN;
  back.drawRectangle({
    x: ruleX, y: BLEED + 0.18 * IN, width: 1.5, height: TRIM_H - 0.36 * IN,
    color: rgbHex(ORANGE.hex),
  });

  // Right column: small wordmark + QR + caption
  {
    const rightX = ruleX + 0.2 * IN;
    const rightW = PAGE_W - BLEED - 0.22 * IN - rightX;

    // Small wordmark top-right
    const wmW = Math.min(0.85 * IN, rightW);
    const wmH = wmW * (wordmarkNavyPng.height / wordmarkNavyPng.width);
    back.drawImage(wordmarkNavyPng, {
      x: rightX + (rightW - wmW) / 2,
      y: PAGE_H - BLEED - 0.28 * IN - wmH,
      width: wmW, height: wmH,
    });

    const qrSize = Math.min(0.85 * IN, rightW);
    const qx = rightX + (rightW - qrSize) / 2;
    const qy = BLEED + 0.32 * IN;
    back.drawImage(backQr, { x: qx, y: qy, width: qrSize, height: qrSize });

    const cap = (f.sameQr ? f.front.caption : f.back.caption) || defaultCaptionFor(f.back.type);
    const capU = cap.toUpperCase();
    const cw = helvBold.widthOfTextAtSize(capU, 5.5);
    back.drawText(capU, {
      x: qx + (qrSize - cw) / 2,
      y: qy - 0.13 * IN,
      size: 5.5,
      font: helvBold,
      color: rgbHex(CAPTION_HEX),
      characterSpacing: 1.2,
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
    // horizontal tick (toward outside)
    const hx = c.x === BLEED ? c.x - off - len : c.x + off;
    page.drawRectangle({ x: hx, y: c.y - t / 2, width: len, height: t, color: col });
    // vertical tick (toward outside)
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

function QrControls({
  label,
  value,
  onChange,
  fields,
}: {
  label: string;
  value: QrConfig;
  onChange: (v: QrConfig) => void;
  fields: Fields;
}) {
  const types: { key: QrType; label: string }[] = [
    { key: "booking",  label: "Booking" },
    { key: "profile",  label: "Profile" },
    { key: "referral", label: "Referral" },
    { key: "vcard",    label: "vCard" },
    { key: "custom",   label: "Custom" },
  ];
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
        {types.map((t) => {
          const active = value.type === t.key;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() =>
                onChange({
                  ...value,
                  type: t.key,
                  url: defaultUrlFor(t.key, fields),
                  caption: defaultCaptionFor(t.key),
                })
              }
              style={{
                padding: "6px 10px",
                borderRadius: 4,
                border: `1px solid ${active ? "var(--orange)" : "var(--cream-deep)"}`,
                background: active ? "var(--orange)" : "var(--cream)",
                color: active ? "var(--cream)" : "var(--ink)",
                fontFamily: "Montserrat, sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>
      {value.type !== "vcard" && (
        <input
          style={{ ...inputStyle, marginBottom: 8 }}
          placeholder="https://..."
          value={value.url}
          onChange={(e) => onChange({ ...value, url: e.target.value })}
        />
      )}
      {value.type === "vcard" && (
        <p style={{ fontSize: 12, color: "var(--ink-soft)", marginBottom: 8 }}>
          QR will encode this employee's contact card — scanning saves it to phone contacts.
        </p>
      )}
      <input
        style={inputStyle}
        placeholder="Caption (e.g. Scan to book)"
        value={value.caption}
        onChange={(e) => onChange({ ...value, caption: e.target.value })}
      />
    </div>
  );
}

function CardPreview({
  side,
  fields,
  showGuides,
}: {
  side: "front" | "back";
  fields: Fields;
  showGuides: boolean;
}) {
  const qrCfg = side === "front" ? fields.front : (fields.sameQr ? fields.front : fields.back);
  const qrValue = resolveQrValue(qrCfg, fields);
  const [svg, setSvg] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    const dark  = side === "front" ? NAVY.hex  : NAVY.hex;
    const light = side === "front" ? CREAM.hex : CREAM.hex;
    qrSvg(qrValue, dark, light).then((s) => { if (!cancelled) setSvg(s); });
    return () => { cancelled = true; };
  }, [qrValue, side]);

  // Card displayed at 350×200 px (1:1 aspect with trim), with bleed visualized outside
  const W = 350, H = 200;
  const bleedPx = (0.125 / 3.5) * W; // ~12.5

  const fullName = `${fields.firstName} ${fields.lastName}${fields.credentials ? ", " + fields.credentials : ""}`.trim();

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
                position: "absolute", top: 24, left: 0, right: 0,
                display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
              }}>
                <img src={WORDMARK_WHITE_URL} alt="" style={{ height: 28, width: "auto" }} />
                <div style={{
                  fontSize: 8, fontWeight: 700, letterSpacing: "0.18em",
                  color: ORANGE_TEXT_HEX, textTransform: "uppercase",
                }}>
                  Find Your Edge Over Age.
                </div>
              </div>
              <div style={{
                position: "absolute", right: 14, bottom: 14,
                background: CREAM.hex, padding: 6, borderRadius: 2,
                width: 64, height: 64,
              }}
                dangerouslySetInnerHTML={{ __html: svg.replace(/<svg /, '<svg style="width:100%;height:100%;display:block;" ') }}
              />
              <div style={{
                position: "absolute", right: 14, bottom: 0,
                width: 64, textAlign: "center",
                fontSize: 6, fontWeight: 700, letterSpacing: "0.12em",
                color: CREAM.hex, textTransform: "uppercase", paddingBottom: 2,
              }}>
                {(fields.front.caption || defaultCaptionFor(fields.front.type))}
              </div>
              <div style={{
                position: "absolute", left: 12, right: 12, bottom: 6, height: 1,
                background: ORANGE.hex,
              }} />
            </>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1px 96px", height: "100%", padding: 16, gap: 12 }}>
              <div style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 4 }}>
                <div style={{ fontFamily: "Oswald, sans-serif", fontWeight: 700, fontSize: 16, color: NAVY.hex, lineHeight: 1.1 }}>
                  {fullName || "—"}
                </div>
                <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: "0.16em", color: ORANGE_TEXT_HEX, textTransform: "uppercase" }}>
                  {fields.title}
                </div>
                <div style={{ fontSize: 7.5, fontWeight: 700, letterSpacing: "0.1em", color: NAVY.hex, textTransform: "uppercase", marginBottom: 6 }}>
                  Men's Wellness Centers · {fields.center}
                </div>
                <div style={{ height: 1, background: RULE_HEX, margin: "2px 0 6px" }} />
                {fields.includeDirect && fields.directPhone && (
                  <Row label="Direct" value={fields.directPhone} />
                )}
                {fields.centerPhone && <Row label="Center" value={fields.centerPhone} />}
                {fields.email && <Row label="Email" value={fields.email} />}
                <Row label="Web" value="menswellnesscenters.com" />
              </div>
              <div style={{ background: ORANGE.hex, width: 1.5 }} />
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <img src={WORDMARK_NAVY_URL} alt="" style={{ height: 14, width: "auto" }} />
                <div
                  style={{ width: 72, height: 72 }}
                  dangerouslySetInnerHTML={{ __html: svg.replace(/<svg /, '<svg style="width:100%;height:100%;display:block;" ') }}
                />
                <div style={{ fontSize: 6, fontWeight: 700, letterSpacing: "0.14em", color: CAPTION_HEX, textTransform: "uppercase", textAlign: "center" }}>
                  {(side === "front" ? fields.front.caption : (fields.sameQr ? fields.front.caption : fields.back.caption)) || defaultCaptionFor(qrCfg.type)}
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

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "44px 1fr", gap: 6, alignItems: "baseline", margin: "1px 0" }}>
      <div style={{ fontSize: 6.5, fontWeight: 700, letterSpacing: "0.14em", color: CAPTION_HEX, textTransform: "uppercase" }}>
        {label}
      </div>
      <div style={{ fontSize: 8, color: NAVY.hex, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {value}
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

  // Sync defaults when identity changes that drive defaults (profile slug → profile URL)
  useEffect(() => {
    setFields((f) => {
      const next = { ...f };
      if (f.front.type === "profile" && (!f.front.url || f.front.url.startsWith("https://menswellnesscenters.com/team/"))) {
        next.front = { ...f.front, url: defaultUrlFor("profile", f) };
      }
      if (f.back.type === "profile" && (!f.back.url || f.back.url.startsWith("https://menswellnesscenters.com/team/"))) {
        next.back = { ...f.back, url: defaultUrlFor("profile", f) };
      }
      return next;
    });
  }, [fields.profileSlug]); // eslint-disable-line react-hooks/exhaustive-deps

  function update<K extends keyof Fields>(k: K, v: Fields[K]) {
    setFields((f) => ({ ...f, [k]: v }));
  }

  async function downloadPdf() {
    try {
      setBusy(true);
      const bytes = await buildPdf(fields);
      // Copy into a fresh ArrayBuffer so the Blob constructor gets a clean BlobPart
      const ab = new ArrayBuffer(bytes.byteLength);
      new Uint8Array(ab).set(bytes);
      const blob = new Blob([ab], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      if (lastObjectUrl.current) URL.revokeObjectURL(lastObjectUrl.current);
      lastObjectUrl.current = url;
      const a = document.createElement("a");
      a.href = url;
      a.download = `mwc-card-${(fields.firstName + "-" + fields.lastName).toLowerCase().replace(/[^a-z0-9-]/g, "")}.pdf`;
      document.body.appendChild(a); a.click(); a.remove();
      setStatus({ kind: "ok", msg: "Print-ready PDF downloaded (3.75 × 2.25 in with bleed + crop marks)." });
    } catch (e) {
      console.error(e);
      setStatus({ kind: "error", msg: "PDF export failed. Check the console for details." });
    } finally {
      setBusy(false);
    }
  }

  async function copyVCard() {
    try {
      await navigator.clipboard.writeText(buildVCard(fields));
      setStatus({ kind: "ok", msg: "vCard copied to clipboard." });
    } catch {
      setStatus({ kind: "error", msg: "Couldn't copy. Try again." });
    }
  }

  function reset() { setFields(DEFAULTS); setStatus(null); }

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Brand Applications</p>
          <h1>Business Card.</h1>
          <p>
            Fill in your details, choose a QR destination for each side, and download a
            print-ready PDF (3.5 × 2 in landscape, 0.125 in bleed, crop marks). The card uses
            the same brand color, type, and lockup as the rest of the system.
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
              <p className="eyebrow" style={{ marginBottom: 8 }}>Your Details</p>
              <h3 style={{ marginBottom: 20, fontSize: 22 }}>Edit card.</h3>

              <div style={{ display: "grid", gap: 14 }}>
                <div style={{ display: "grid", gap: 14, gridTemplateColumns: "1fr 1fr" }}>
                  <div>
                    <label style={labelStyle}>First name</label>
                    <input style={inputStyle} value={fields.firstName} onChange={(e) => update("firstName", e.target.value)} />
                  </div>
                  <div>
                    <label style={labelStyle}>Last name</label>
                    <input style={inputStyle} value={fields.lastName} onChange={(e) => update("lastName", e.target.value)} />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Credentials (optional)</label>
                  <input style={inputStyle} placeholder="MD, NP, PA-C" value={fields.credentials} onChange={(e) => update("credentials", e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>Title</label>
                  <input style={inputStyle} value={fields.title} onChange={(e) => update("title", e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>Primary center</label>
                  <input style={inputStyle} placeholder="City, ST" value={fields.center} onChange={(e) => update("center", e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>Direct phone</label>
                  <input style={inputStyle} value={fields.directPhone} onChange={(e) => update("directPhone", e.target.value)} disabled={!fields.includeDirect} />
                  <label style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 8, fontSize: 12, color: "var(--ink-soft)" }}>
                    <input type="checkbox" checked={fields.includeDirect} onChange={(e) => update("includeDirect", e.target.checked)} />
                    Include direct line
                  </label>
                </div>
                <div>
                  <label style={labelStyle}>Center phone</label>
                  <input style={inputStyle} value={fields.centerPhone} onChange={(e) => update("centerPhone", e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>Email</label>
                  <input style={inputStyle} type="email" value={fields.email} onChange={(e) => update("email", e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>Profile slug</label>
                  <input style={inputStyle} placeholder="firstname-lastname" value={fields.profileSlug} onChange={(e) => update("profileSlug", e.target.value)} />
                  <p style={{ fontSize: 11, color: "var(--ink-soft)", marginTop: 4 }}>
                    Used to build menswellnesscenters.com/team/{fields.profileSlug || "…"}
                  </p>
                </div>

                <div style={{
                  marginTop: 6, paddingTop: 16,
                  borderTop: "1px solid var(--cream-deep)",
                  display: "grid", gap: 16,
                }}>
                  <QrControls
                    label="Front QR"
                    value={fields.front}
                    onChange={(v) => update("front", v)}
                    fields={fields}
                  />
                  <label style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 12, color: "var(--ink-soft)" }}>
                    <input type="checkbox" checked={fields.sameQr} onChange={(e) => update("sameQr", e.target.checked)} />
                    Use the same QR on both sides
                  </label>
                  {!fields.sameQr && (
                    <QrControls
                      label="Back QR"
                      value={fields.back}
                      onChange={(v) => update("back", v)}
                      fields={fields}
                    />
                  )}
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
                <button type="button" className="btn btn-ghost" onClick={copyVCard}>
                  Copy vCard
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
                Brand fonts (Oswald / Montserrat) fall back to Helvetica in the PDF for v1 — visual proportions stay correct.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-alt">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Print</p>
            <h2>Three ways to use it.</h2>
            <p>The PDF is print-shop ready. Pick the path that fits your situation.</p>
          </div>
          <div className="grid grid-3">
            <div className="card"><div className="card-body">
              <h3>1. Local print shop</h3>
              <p>Email the PDF. Ask for 3.5 × 2 in landscape, 16 pt cover, matte. The crop marks tell them where to cut.</p>
            </div></div>
            <div className="card"><div className="card-body">
              <h3>2. Online (Moo / Vistaprint)</h3>
              <p>Upload as a 2-sided design. Most online printers strip crop marks automatically — the bleed is already baked in.</p>
            </div></div>
            <div className="card"><div className="card-body">
              <h3>3. Share digitally</h3>
              <p>Use <strong>Copy vCard</strong> to send your contact card in chat or email. The back QR does the same thing in person.</p>
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
