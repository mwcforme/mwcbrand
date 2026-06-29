import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import QRCode from "qrcode";
import { toPng } from "html-to-image";
import assetMap from "@/data/asset-map.json";

const A = assetMap as Record<string, string>;
const WORDMARK_WHITE = A["assets/logos/svg/wordmark_white.svg"];
const WORDMARK_NAVY = A["assets/logos/svg/wordmark_navy.svg"];

const ENROLL_URL = "https://go.menswellnesscenters.com/ambassador/enroll";
const REFER_URL = "https://go.menswellnesscenters.com/ambassador/referral";

const NAVY = "#1B2B4B";
const CREAM = "#F5F0E6";
const ORANGE = "#FF5500";

type FlyerSize = {
  id: string;
  label: string;
  wIn: number;
  hIn: number;
};

const SIZES: FlyerSize[] = [
  { id: "16x20", label: "16 × 20 in", wIn: 16, hIn: 20 },
  { id: "18x24", label: "18 × 24 in", wIn: 18, hIn: 24 },
  { id: "22x28", label: "22 × 28 in", wIn: 22, hIn: 28 },
  { id: "24x36", label: "24 × 36 in", wIn: 24, hIn: 36 },
  { id: "36x48", label: "36 × 48 in", wIn: 36, hIn: 48 },
];

const DPI = 100; // 100 DPI export keeps 36x48 at 3600x4800 — print-acceptable for posters.

export const Route = createFileRoute("/ambassador")({
  head: () => ({
    meta: [
      { title: "Ambassador Program · Men's Wellness Centers" },
      {
        name: "description",
        content:
          "The MWC Ambassador Program. Enroll, refer the men in your life, and earn. Includes in-center poster flyers in five print sizes.",
      },
      { property: "og:title", content: "Ambassador Program · Men's Wellness Centers" },
      {
        property: "og:description",
        content:
          "Enroll as an MWC Ambassador and refer friends. Download print-ready in-center flyers in 16×20 through 36×48.",
      },
    ],
  }),
  component: AmbassadorPage,
});

function useQrDataUrl(text: string, size = 1024) {
  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => {
    let cancelled = false;
    QRCode.toDataURL(text, {
      errorCorrectionLevel: "H",
      margin: 1,
      width: size,
      color: { dark: NAVY, light: "#00000000" },
    }).then((u) => {
      if (!cancelled) setUrl(u);
    });
    return () => {
      cancelled = true;
    };
  }, [text, size]);
  return url;
}

function AmbassadorPage() {
  const enrollQr = useQrDataUrl(ENROLL_URL);
  const referQr = useQrDataUrl(REFER_URL);

  return (
    <div style={{ background: CREAM, color: NAVY }}>
      <Hero />
      <HowItWorks />
      <FlyerSection enrollQr={enrollQr} referQr={referQr} />
      <ResourcesSection />
    </div>
  );
}

/* ───────────────────────────── Hero ───────────────────────────── */

function Hero() {
  return (
    <section
      style={{
        background: NAVY,
        color: CREAM,
        padding: "96px 0 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(900px 500px at 85% 20%, rgba(255,85,0,0.18), transparent 60%), radial-gradient(700px 400px at 15% 90%, rgba(255,255,255,0.06), transparent 60%)",
          pointerEvents: "none",
        }}
      />
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px", position: "relative" }}>
        <p
          style={{
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            fontSize: 12,
            color: ORANGE,
            fontWeight: 700,
            marginBottom: 18,
          }}
        >
          MWC Ambassador Program
        </p>
        <h1
          style={{
            fontFamily: '"Oswald", "Bebas Neue", system-ui, sans-serif',
            fontWeight: 700,
            fontSize: "clamp(48px, 7.5vw, 96px)",
            lineHeight: 0.95,
            letterSpacing: "-0.01em",
            margin: 0,
            maxWidth: 980,
          }}
        >
          The men around you
          <br />
          deserve the same edge.
        </h1>
        <p
          style={{
            marginTop: 24,
            fontSize: 20,
            lineHeight: 1.5,
            maxWidth: 720,
            color: "rgba(245,240,230,0.85)",
          }}
        >
          Enroll once. Refer the men in your life. Earn rewards every time a brother, father,
          friend, or teammate books his first visit and shows up.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 36 }}>
          <a
            href={ENROLL_URL}
            target="_blank"
            rel="noreferrer"
            style={{
              background: ORANGE,
              color: "#fff",
              padding: "16px 28px",
              borderRadius: 8,
              fontWeight: 700,
              textDecoration: "none",
              letterSpacing: "0.02em",
              fontSize: 15,
              textTransform: "uppercase",
            }}
          >
            Enroll as an Ambassador →
          </a>
          <a
            href={REFER_URL}
            target="_blank"
            rel="noreferrer"
            style={{
              background: "transparent",
              color: CREAM,
              padding: "16px 28px",
              borderRadius: 8,
              fontWeight: 700,
              textDecoration: "none",
              letterSpacing: "0.02em",
              fontSize: 15,
              textTransform: "uppercase",
              border: "1.5px solid rgba(245,240,230,0.5)",
            }}
          >
            Send a Referral
          </a>
        </div>
        <p style={{ marginTop: 28, fontSize: 13, color: "rgba(245,240,230,0.6)" }}>
          go.menswellnesscenters.com/ambassador/enroll · /referral
        </p>
      </div>
    </section>
  );
}

/* ───────────────────────────── How it works ───────────────────────────── */

function HowItWorks() {
  const steps = [
    {
      n: "01",
      t: "Enroll",
      d: "Sign up at /ambassador/enroll. Takes about 60 seconds. You get a personal referral link and a scannable QR.",
    },
    {
      n: "02",
      t: "Refer",
      d: "Share your link or QR with any man who'd benefit from TRT, ED treatment, or medical weight loss in Virginia.",
    },
    {
      n: "03",
      t: "Earn",
      d: "When your referral books and shows up for his first visit, you're rewarded. Repeat as often as you want.",
    },
  ];
  return (
    <section style={{ padding: "96px 0", background: CREAM }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px" }}>
        <p
          style={{
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            fontSize: 12,
            color: ORANGE,
            fontWeight: 700,
            marginBottom: 12,
          }}
        >
          How it works
        </p>
        <h2
          style={{
            fontFamily: '"Oswald", system-ui, sans-serif',
            fontSize: "clamp(34px, 4.5vw, 56px)",
            lineHeight: 1.05,
            margin: 0,
            maxWidth: 820,
          }}
        >
          Three steps. No fine print.
        </h2>
        <div
          style={{
            marginTop: 56,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 24,
          }}
        >
          {steps.map((s) => (
            <div
              key={s.n}
              style={{
                background: "#fff",
                border: `1px solid ${NAVY}1A`,
                borderRadius: 14,
                padding: "32px 28px",
              }}
            >
              <div
                style={{
                  fontFamily: '"Oswald", system-ui, sans-serif',
                  fontSize: 14,
                  letterSpacing: "0.2em",
                  color: ORANGE,
                  fontWeight: 700,
                }}
              >
                {s.n}
              </div>
              <h3
                style={{
                  fontFamily: '"Oswald", system-ui, sans-serif',
                  fontSize: 28,
                  margin: "8px 0 12px",
                  letterSpacing: "-0.005em",
                }}
              >
                {s.t}
              </h3>
              <p style={{ fontSize: 15.5, lineHeight: 1.55, color: `${NAVY}CC`, margin: 0 }}>
                {s.d}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────── Flyers ───────────────────────────── */

function FlyerSection({
  enrollQr,
  referQr,
}: {
  enrollQr: string | null;
  referQr: string | null;
}) {
  const [activeId, setActiveId] = useState<string>("24x36");
  const active = useMemo(() => SIZES.find((s) => s.id === activeId)!, [activeId]);
  const flyerRef = useRef<HTMLDivElement>(null);

  async function exportFlyer(size: FlyerSize) {
    // Render the flyer at native pixel dims using a transient absolute clone.
    const node = document.getElementById(`flyer-${size.id}`) as HTMLElement | null;
    if (!node) return;
    const w = size.wIn * DPI;
    const h = size.hIn * DPI;
    const prev = node.style.transform;
    node.style.transform = "none";
    try {
      const dataUrl = await toPng(node, {
        width: w,
        height: h,
        pixelRatio: 1,
        cacheBust: true,
        style: { transform: "none" },
      });
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `mwc-ambassador-flyer-${size.id}.png`;
      a.click();
    } finally {
      node.style.transform = prev;
    }
  }

  return (
    <section style={{ padding: "96px 0", background: NAVY, color: CREAM }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 20,
            marginBottom: 36,
          }}
        >
          <div>
            <p
              style={{
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                fontSize: 12,
                color: ORANGE,
                fontWeight: 700,
                marginBottom: 12,
              }}
            >
              In-center flyers
            </p>
            <h2
              style={{
                fontFamily: '"Oswald", system-ui, sans-serif',
                fontSize: "clamp(34px, 4.5vw, 56px)",
                lineHeight: 1.05,
                margin: 0,
                maxWidth: 820,
              }}
            >
              Print, hang, and let men scan.
            </h2>
            <p
              style={{
                marginTop: 14,
                fontSize: 16,
                lineHeight: 1.5,
                color: "rgba(245,240,230,0.75)",
                maxWidth: 640,
              }}
            >
              Five standard print sizes. Each exports as a print-ready PNG at {DPI} DPI with two
              scannable QR codes — one to enroll, one to refer.
            </p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {SIZES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveId(s.id)}
                style={{
                  background: activeId === s.id ? ORANGE : "transparent",
                  color: activeId === s.id ? "#fff" : CREAM,
                  border: `1.5px solid ${activeId === s.id ? ORANGE : "rgba(245,240,230,0.35)"}`,
                  padding: "10px 14px",
                  borderRadius: 8,
                  fontWeight: 700,
                  fontSize: 13,
                  letterSpacing: "0.04em",
                  cursor: "pointer",
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Live preview of selected size */}
        <div
          ref={flyerRef}
          style={{
            background: "#0e1934",
            border: "1px solid rgba(245,240,230,0.12)",
            borderRadius: 16,
            padding: 32,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <FlyerPreview size={active} enrollQr={enrollQr} referQr={referQr} maxPx={620} />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 12,
            marginTop: 24,
          }}
        >
          {SIZES.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => exportFlyer(s)}
              style={{
                background: CREAM,
                color: NAVY,
                border: "none",
                padding: "16px 18px",
                borderRadius: 10,
                fontWeight: 700,
                cursor: "pointer",
                textAlign: "left",
                lineHeight: 1.2,
              }}
            >
              <div style={{ fontSize: 11, letterSpacing: "0.18em", color: ORANGE }}>
                DOWNLOAD PNG
              </div>
              <div style={{ fontSize: 18, marginTop: 4 }}>{s.label}</div>
              <div style={{ fontSize: 11, marginTop: 2, color: `${NAVY}99` }}>
                {s.wIn * DPI} × {s.hIn * DPI} px · {DPI} DPI
              </div>
            </button>
          ))}
        </div>

        {/* Off-screen full-res flyer nodes — one per size — used by export. */}
        <div
          aria-hidden
          style={{
            position: "fixed",
            left: -100000,
            top: 0,
            pointerEvents: "none",
            opacity: 0,
          }}
        >
          {SIZES.map((s) => (
            <div
              id={`flyer-${s.id}`}
              key={s.id}
              style={{ width: s.wIn * DPI, height: s.hIn * DPI }}
            >
              <FlyerArt size={s} enrollQr={enrollQr} referQr={referQr} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FlyerPreview({
  size,
  enrollQr,
  referQr,
  maxPx,
}: {
  size: FlyerSize;
  enrollQr: string | null;
  referQr: string | null;
  maxPx: number;
}) {
  // Scale the native-size art down to fit the preview area.
  const nativeW = size.wIn * DPI;
  const nativeH = size.hIn * DPI;
  const scale = Math.min(maxPx / nativeW, (maxPx * 1.4) / nativeH);
  return (
    <div
      style={{
        width: nativeW * scale,
        height: nativeH * scale,
        boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
        borderRadius: 6,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: nativeW,
          height: nativeH,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        <FlyerArt size={size} enrollQr={enrollQr} referQr={referQr} />
      </div>
    </div>
  );
}

/* The actual flyer art. Renders at native print pixels; all internal sizes
 * are proportional to the shorter edge so the layout holds across aspects
 * (4:5 to 3:4 to 2:3). */
function FlyerArt({
  size,
  enrollQr,
  referQr,
}: {
  size: FlyerSize;
  enrollQr: string | null;
  referQr: string | null;
}) {
  const w = size.wIn * DPI;
  const h = size.hIn * DPI;
  const unit = w / 100; // 1u = 1% of width
  const pad = unit * 6;

  return (
    <div
      style={{
        width: w,
        height: h,
        background: CREAM,
        color: NAVY,
        position: "relative",
        fontFamily: '"Inter", system-ui, sans-serif',
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top navy band */}
      <div
        style={{
          background: NAVY,
          color: CREAM,
          padding: `${pad}px ${pad}px ${pad * 0.9}px`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: pad,
        }}
      >
        <img
          src={WORDMARK_WHITE}
          alt="Men's Wellness Centers"
          style={{ height: unit * 5.5, width: "auto" }}
        />
        <div
          style={{
            fontFamily: '"Oswald", system-ui, sans-serif',
            fontSize: unit * 2.2,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: ORANGE,
            fontWeight: 700,
          }}
        >
          Ambassador Program
        </div>
      </div>

      {/* Hero copy */}
      <div
        style={{
          padding: `${pad * 1.4}px ${pad}px ${pad}px`,
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            fontFamily: '"Oswald", "Bebas Neue", system-ui, sans-serif',
            fontWeight: 700,
            fontSize: unit * 11,
            lineHeight: 0.92,
            letterSpacing: "-0.01em",
            color: NAVY,
          }}
        >
          KNOW A MAN
          <br />
          <span style={{ color: ORANGE }}>WHO NEEDS</span>
          <br />
          HIS EDGE BACK?
        </div>

        <p
          style={{
            marginTop: pad * 0.7,
            fontSize: unit * 2.6,
            lineHeight: 1.35,
            color: `${NAVY}CC`,
            maxWidth: w - pad * 2,
          }}
        >
          Refer him to Men's Wellness Centers. When he books his first visit,
          you earn — every single time.
        </p>

        {/* QR pair */}
        <div
          style={{
            marginTop: "auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: pad * 0.8,
            alignItems: "stretch",
          }}
        >
          <QrCard
            unit={unit}
            label="Enroll as Ambassador"
            url="ambassador/enroll"
            qr={enrollQr}
            accent
          />
          <QrCard
            unit={unit}
            label="Send a Referral"
            url="ambassador/referral"
            qr={referQr}
          />
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          background: NAVY,
          color: CREAM,
          padding: `${pad * 0.7}px ${pad}px`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: unit * 1.8,
          letterSpacing: "0.06em",
        }}
      >
        <span style={{ fontWeight: 700, color: ORANGE, letterSpacing: "0.25em" }}>
          GO.MENSWELLNESSCENTERS.COM
        </span>
        <span style={{ opacity: 0.7 }}>
          TRT · ED · Weight Loss · Virginia
        </span>
      </div>
    </div>
  );
}

function QrCard({
  unit,
  label,
  url,
  qr,
  accent,
}: {
  unit: number;
  label: string;
  url: string;
  qr: string | null;
  accent?: boolean;
}) {
  return (
    <div
      style={{
        background: "#fff",
        border: accent ? `${unit * 0.4}px solid ${ORANGE}` : `${unit * 0.2}px solid ${NAVY}26`,
        borderRadius: unit * 1.2,
        padding: unit * 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: unit * 1,
      }}
    >
      <div
        style={{
          fontFamily: '"Oswald", system-ui, sans-serif',
          fontSize: unit * 2.6,
          fontWeight: 700,
          letterSpacing: "0.04em",
          textAlign: "center",
          color: NAVY,
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
      {qr ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={qr}
          alt={label}
          style={{ width: "100%", maxWidth: unit * 26, height: "auto" }}
        />
      ) : (
        <div style={{ width: "100%", aspectRatio: "1 / 1", background: "#f2efe9" }} />
      )}
      <div
        style={{
          fontSize: unit * 1.4,
          color: `${NAVY}99`,
          letterSpacing: "0.05em",
          textAlign: "center",
        }}
      >
        go.menswellnesscenters.com/{url}
      </div>
    </div>
  );
}

/* ───────────────────────────── Resources ───────────────────────────── */

function ResourcesSection() {
  return (
    <section style={{ padding: "96px 0", background: CREAM }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px" }}>
        <p
          style={{
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            fontSize: 12,
            color: ORANGE,
            fontWeight: 700,
            marginBottom: 12,
          }}
        >
          More ambassador tools
        </p>
        <h2
          style={{
            fontFamily: '"Oswald", system-ui, sans-serif',
            fontSize: "clamp(34px, 4.5vw, 56px)",
            lineHeight: 1.05,
            margin: 0,
          }}
        >
          Take it everywhere.
        </h2>
        <div
          style={{
            marginTop: 40,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 20,
          }}
        >
          <ResourceCard
            eyebrow="Pocket-sized"
            title="Referral Business Card"
            body="Print-ready, double-sided 3.5×2 in card with your QR on the back. Hand it out anywhere."
            href="/business-card"
            internal
            cta="Open Card Builder"
          />
          <ResourceCard
            eyebrow="Sign up once"
            title="Ambassador Enrollment"
            body="Become an MWC Ambassador. Get your personal link, your QR, and start earning."
            href={ENROLL_URL}
            cta="Enroll Now"
          />
          <ResourceCard
            eyebrow="Send a man in"
            title="Refer a Friend"
            body="Already enrolled? Send a man directly to the referral intake form."
            href={REFER_URL}
            cta="Refer Now"
          />
        </div>
        <div
          style={{
            marginTop: 56,
            padding: 32,
            border: `1px solid ${NAVY}22`,
            borderRadius: 14,
            background: "#fff",
            display: "flex",
            alignItems: "center",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          <img src={WORDMARK_NAVY} alt="MWC" style={{ height: 36 }} />
          <div style={{ flex: 1, minWidth: 240 }}>
            <div style={{ fontWeight: 700, fontSize: 18 }}>Brand-compliant by default</div>
            <div style={{ color: `${NAVY}AA`, fontSize: 14, marginTop: 4 }}>
              Every flyer uses navy + cream + the one accent orange — no orange on the logo, ever.
            </div>
          </div>
          <Link
            to="/brand"
            style={{
              color: NAVY,
              border: `1.5px solid ${NAVY}`,
              padding: "10px 16px",
              borderRadius: 8,
              fontWeight: 700,
              textDecoration: "none",
              fontSize: 14,
            }}
          >
            View Brand Page →
          </Link>
        </div>
      </div>
    </section>
  );
}

function ResourceCard({
  eyebrow,
  title,
  body,
  href,
  internal,
  cta,
}: {
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  internal?: boolean;
  cta: string;
}) {
  const inner = (
    <>
      <div
        style={{
          fontSize: 11,
          letterSpacing: "0.22em",
          color: ORANGE,
          textTransform: "uppercase",
          fontWeight: 700,
        }}
      >
        {eyebrow}
      </div>
      <h3
        style={{
          fontFamily: '"Oswald", system-ui, sans-serif',
          fontSize: 26,
          margin: "8px 0 10px",
        }}
      >
        {title}
      </h3>
      <p style={{ color: `${NAVY}BB`, fontSize: 15, lineHeight: 1.5, margin: 0 }}>{body}</p>
      <div
        style={{
          marginTop: 20,
          color: ORANGE,
          fontWeight: 700,
          fontSize: 14,
          letterSpacing: "0.04em",
        }}
      >
        {cta} →
      </div>
    </>
  );
  const base: React.CSSProperties = {
    display: "block",
    background: "#fff",
    border: `1px solid ${NAVY}1F`,
    borderRadius: 14,
    padding: 28,
    textDecoration: "none",
    color: NAVY,
  };
  if (internal) {
    return (
      <Link to={href} style={base}>
        {inner}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noreferrer" style={base}>
      {inner}
    </a>
  );
}
