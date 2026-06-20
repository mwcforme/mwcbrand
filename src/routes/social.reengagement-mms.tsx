import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toPng } from "html-to-image";

export const Route = createFileRoute("/social/reengagement-mms")({
  head: () => ({
    meta: [
      { title: "Re-engagement MMS · 30% Off · Men's Wellness Centers" },
      {
        name: "description",
        content:
          "MMS re-engagement images (1080x1080) offering 30% off the first visit at Men's Wellness Centers.",
      },
    ],
  }),
  component: ReengagementMMS,
});

const WORDMARK_LIGHT =
  "/__l5e/assets-v1/d0018746-8b08-4844-a04e-8ed1b2a745db/White_on_Navy__wordmark_2174x500.png";
const WORDMARK_DARK =
  "/__l5e/assets-v1/d8a9db5f-130d-40a6-bc53-ed4bb5150d26/Navy_on_Transparent__wordmark_2174x500.png";

const CREAM = "#f5f3f0";
const NAVY = "#0b1029";
const ORANGE = "#ff5500";
const INK_SOFT = "#4a4e66";

type Variant = {
  id: string;
  bg: "navy" | "cream" | "orange";
  eyebrow: string;
  hero: string;
  body: string;
  cta: string;
  fineprint: string;
  job: string;
};

const VARIANTS: Variant[] = [
  {
    id: "still-on-the-table",
    bg: "navy",
    eyebrow: "Your spot's still open",
    hero: "30% OFF\nFIRST VISIT",
    body: "Book this month.",
    cta: "BookMWC.com",
    fineprint: "New members. Reply STOP to opt out.",
    job: "Quiet reopen.",
  },
  {
    id: "one-hour-then",
    bg: "cream",
    eyebrow: "One hour. One plan.",
    hero: "30% OFF",
    body: "Physician + same-day labs.",
    cta: "BookMWC.com",
    fineprint: "New members. Reply STOP to opt out.",
    job: "Process + offer.",
  },
  {
    id: "labs-are-fine",
    bg: "navy",
    eyebrow: "Labs said \u201Cfine.\u201D",
    hero: "YOU KNEW\nTHEY WEREN'T.",
    body: "30% off your first visit.",
    cta: "BookMWC.com",
    fineprint: "New members. Reply STOP to opt out.",
    job: "Validation flip.",
  },
  {
    id: "no-runaround",
    bg: "orange",
    eyebrow: "No referral. No wait.",
    hero: "30% OFF\nBOOK TODAY",
    body: "One physician. One hour.",
    cta: "BookMWC.com",
    fineprint: "New members. Reply STOP to opt out.",
    job: "Punchy bright unit.",
  },
  {
    id: "three-problems",
    bg: "cream",
    eyebrow: "Low T · ED · Weight",
    hero: "30% OFF\nFIRST VISIT",
    body: "Physician-led men's care.",
    cta: "BookMWC.com",
    fineprint: "New members. Reply STOP to opt out.",
    job: "Category umbrella.",
  },
  {
    id: "window-closes",
    bg: "navy",
    eyebrow: "Last call this month",
    hero: "30% OFF\nENDS SOON",
    body: "Book before month's end.",
    cta: "BookMWC.com",
    fineprint: "New members. Reply STOP to opt out.",
    job: "Final send.",
  },
];

async function exportVariantToPng(id: string) {
  const el = document.getElementById(`mms-${id}`) as HTMLElement | null;
  if (!el) return;
  const prev = el.style.transform;
  el.style.transform = "none";
  try {
    const dataUrl = await toPng(el, {
      width: 1080,
      height: 1080,
      cacheBust: true,
      pixelRatio: 1,
      style: { transform: "none" },
    });
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `mwc-mms-30off-${id}.png`;
    a.click();
  } finally {
    el.style.transform = prev;
  }
}

async function exportAll() {
  for (const v of VARIANTS) {
    await exportVariantToPng(v.id);
    await new Promise((r) => setTimeout(r, 250));
  }
}

function VariantCard({ v }: { v: Variant }) {
  const isNavy = v.bg === "navy";
  const isOrange = v.bg === "orange";
  const surface = isNavy ? NAVY : isOrange ? ORANGE : CREAM;
  const ink = isNavy || isOrange ? CREAM : NAVY;
  const accent = isOrange ? NAVY : ORANGE;
  const wordmark = isNavy || isOrange ? WORDMARK_LIGHT : WORDMARK_DARK;

  return (
    <div className="mms-stage">
      <div className="mms-preview">
        <div
          className="mms-frame"
          id={`mms-${v.id}`}
          style={{ background: surface, color: ink }}
        >
          <header className="mms-top">
            <img src={wordmark} alt="Men's Wellness Centers" className="mms-wordmark" />
          </header>

          <div className="mms-body">
            <p className="mms-eyebrow" style={{ color: accent }}>
              {v.eyebrow}
            </p>
            <h1 className="mms-hero">{v.hero}</h1>
            <p className="mms-copy" style={{ color: isNavy ? "#cfcec9" : isOrange ? "#fce9dd" : INK_SOFT }}>
              {v.body}
            </p>
          </div>

          <footer className="mms-foot">
            <div className="mms-cta-pill" style={{ background: accent, color: isOrange ? CREAM : NAVY }}>
              {v.cta} · BookMWC.com
            </div>
            <p className="mms-fine" style={{ color: isNavy ? "#8a8b95" : isOrange ? "#3b1a07" : "#7a7d8c" }}>
              {v.fineprint}
            </p>
          </footer>
        </div>
      </div>
      <p className="mms-job">
        <strong>{v.id}</strong> · {v.job}
      </p>
      <button
        type="button"
        className="mms-toggle"
        onClick={() => exportVariantToPng(v.id)}
      >
        Export PNG · 1080×1080
      </button>
    </div>
  );
}

function ReengagementMMS() {
  const [pageBg, setPageBg] = useState<"cream" | "navy">("cream");

  return (
    <main
      style={{
        background: pageBg === "cream" ? CREAM : NAVY,
        minHeight: "100vh",
        padding: "48px 24px 96px",
        color: pageBg === "cream" ? NAVY : CREAM,
      }}
    >
      <style>{css}</style>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <header style={{ marginBottom: 40 }}>
          <p
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: ".28em",
              textTransform: "uppercase",
              color: ORANGE,
              marginBottom: 10,
            }}
          >
            MMS Re-engagement · {VARIANTS.length} variants · 1080 × 1080
          </p>
          <h1
            style={{
              fontFamily: "'Oswald',sans-serif",
              fontWeight: 600,
              letterSpacing: ".02em",
              textTransform: "uppercase",
              fontSize: "clamp(36px,5vw,64px)",
              marginBottom: 12,
            }}
          >
            30% off first visit
          </h1>
          <p
            style={{
              maxWidth: 720,
              color: pageBg === "cream" ? INK_SOFT : "#b0ada8",
              fontSize: 17,
              lineHeight: 1.6,
            }}
          >
            Send these to a re-engagement list that booked an intake but never
            completed a visit. Each variant leads with a different hook;
            otherwise the offer, footer, and compliance text stay constant.
          </p>
          <div style={{ marginTop: 20, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button
              onClick={() => setPageBg("cream")}
              className="mms-toggle"
              data-active={pageBg === "cream"}
            >
              Cream BG
            </button>
            <button
              onClick={() => setPageBg("navy")}
              className="mms-toggle"
              data-active={pageBg === "navy"}
            >
              Navy BG
            </button>
            <button
              onClick={() => exportAll()}
              className="mms-toggle"
              data-active="true"
              style={{ marginLeft: "auto" }}
            >
              ⬇ Export all PNGs
            </button>
          </div>
        </header>

        <div className="mms-grid">
          {VARIANTS.map((v) => (
            <VariantCard key={v.id} v={v} />
          ))}
        </div>
      </div>
    </main>
  );
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');

.mms-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 40px;
}
.mms-stage { display: flex; flex-direction: column; gap: 14px; }
.mms-preview {
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 18px 48px rgba(11,16,41,0.18);
  background: #000;
}
.mms-frame {
  width: 1080px;
  height: 1080px;
  transform-origin: top left;
  transform: scale(calc(var(--mms-w, 360) / 1080));
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 72px;
  font-family: 'Inter', sans-serif;
}
/* Use a CSS var driven by the container width via JS-free trick: each preview is square,
   so scale by its rendered width using a CSS container query fallback. */
.mms-preview { container-type: inline-size; }
.mms-preview .mms-frame {
  transform: scale(calc(100cqw / 1080));
}

.mms-top { display:flex; align-items:center; justify-content:flex-start; }
.mms-wordmark { height: 60px; width: auto; opacity: .95; }

.mms-body { flex: 1; display:flex; flex-direction:column; justify-content:center; padding: 32px 0; }
.mms-eyebrow {
  font-family: 'Inter', sans-serif;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: .22em;
  text-transform: uppercase;
  margin-bottom: 28px;
}
.mms-hero {
  font-family: 'Oswald', sans-serif;
  font-weight: 700;
  font-size: 132px;
  line-height: 0.94;
  letter-spacing: -0.01em;
  text-transform: uppercase;
  white-space: pre-line;
  margin: 0 0 36px 0;
}
.mms-copy {
  font-size: 28px;
  line-height: 1.45;
  max-width: 880px;
  margin: 0;
}

.mms-foot { display:flex; flex-direction:column; gap: 22px; }
.mms-cta-pill {
  align-self: flex-start;
  padding: 22px 36px;
  border-radius: 999px;
  font-family: 'Oswald', sans-serif;
  font-weight: 700;
  font-size: 30px;
  letter-spacing: .06em;
  text-transform: uppercase;
}
.mms-fine {
  font-size: 18px;
  line-height: 1.4;
  margin: 0;
  max-width: 880px;
}

.mms-job { font-size: 13px; line-height: 1.5; opacity: .8; margin: 0; }
.mms-toggle {
  align-self: flex-start;
  appearance: none;
  border: 1px solid currentColor;
  background: transparent;
  color: inherit;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: .18em;
  text-transform: uppercase;
  padding: 10px 16px;
  border-radius: 999px;
  cursor: pointer;
  transition: background .15s ease, color .15s ease;
}
.mms-toggle:hover, .mms-toggle[data-active="true"] {
  background: ${ORANGE};
  color: ${CREAM};
  border-color: ${ORANGE};
}
`;
