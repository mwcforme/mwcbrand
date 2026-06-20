import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/social/fathers-day")({
  head: () => ({
    meta: [
      { title: "Father's Day Carousel · Men's Wellness Centers" },
      { name: "description", content: "Instagram carousel (4 slides, 1080x1350) for the Father's Day promo." },
    ],
  }),
  component: FathersDayCarousel,
});

const WORDMARK = "/__l5e/assets-v1/d8a9db5f-130d-40a6-bc53-ed4bb5150d26/Navy_on_Transparent__wordmark_2174x500.png";
const WORDMARK_LIGHT = "/__l5e/assets-v1/d0018746-8b08-4844-a04e-8ed1b2a745db/White_on_Navy__wordmark_2174x500.png";

type Slide = {
  n: number;
  hero: string;
  intro: string;
  strip: string;
  cta?: string;
  photo: string;
  alt: string;
  job: string;
};

const SLIDES: Slide[] = [
  {
    n: 1,
    hero: "GIFTED.",
    intro: "He has bought every gift on this list except the one he actually needs.",
    strip: "THIS FATHER'S DAY, GIVE HIM ANSWERS.",
    photo: "/__l5e/assets-v1/8ebffcec-37b2-42fd-84af-3088ad1eb6b3/happy-family-dad-mens-wellness-lifestyle-05.webp",
    alt: "Father with adult family, warm and present",
    job: "Hook · reframe instantly. Not a vitality ad — a gift idea.",
  },
  {
    n: 2,
    hero: "60 MINUTES.",
    intro: "A no-cost 60-minute visit with a physician. Same-day labs. He will finally know his numbers, not just guess.",
    strip: "PHYSICIAN-LED. SAME-DAY LABS.",
    cta: "CLAIM 10% OFF",
    photo: "/__l5e/assets-v1/6a30f276-5d44-4b5f-9a13-5649170fabe7/stock-businessman-handshake-meeting-office.webp",
    alt: "Patient meeting with physician in person",
    job: "Offer · make the gift concrete and lead with value.",
  },
  {
    n: 3,
    hero: "SHOW UP.",
    intro: "Be there for the moments that matter. The trips, the milestones, the ordinary days. That starts with taking care of himself.",
    strip: "LOCALLY OWNED. JUDGMENT-FREE.",
    photo: "/__l5e/assets-v1/69bd63c0-f232-4414-ac37-0d4c02bdad9f/couple-in-park.webp",
    alt: "Dad present with partner outdoors",
    job: "Stakes · emotional payoff, the real reason to book.",
  },
  {
    n: 4,
    hero: "BOOK.",
    intro: "This Father's Day, claim 10% off his first plan, through June 30. Sit down with a physician at your local Men's Wellness Centers.",
    strip: "BOOK AT BOOKMWC.COM",
    cta: "BOOK NOW",
    photo: "/__l5e/assets-v1/c7098d92-dc91-458a-aeae-f7f31fd516c8/man-running-sunset-trt-energy-boost-01.webp",
    alt: "Confident man at golden hour",
    job: "Close · hard close with urgency.",
  },
];

const CREAM = "#f5f3f0";
const NAVY = "#0b1029";
const ORANGE = "#b84a08";
const INK_SOFT = "#4a4e66";

function SlideCard({ slide }: { slide: Slide }) {
  const id = `fd-slide-${slide.n}`;
  const download = () => {
    const node = document.getElementById(id);
    if (!node) return;
    // Open print-friendly screenshot guidance: simplest reliable export is to
    // right-click the rendered slide and Save Image. The page itself is the source.
    window.open(`#${id}`, "_self");
  };
  void download;

  return (
    <div className="fd-stage">
      <div className="fd-frame" id={id}>
        {/* Top: wordmark */}
        <header className="fd-top">
          <img src={WORDMARK} alt="Men's Wellness Centers" className="fd-wordmark" />
          <span className="fd-pill-num">{slide.n} / 4</span>
        </header>

        {/* Photo */}
        <div className="fd-photo">
          <img src={slide.photo} alt={slide.alt} loading="lazy" />
        </div>

        {/* Hero word + intro */}
        <div className="fd-body">
          <h1 className="fd-hero">{slide.hero}</h1>
          <p className="fd-intro">{slide.intro}</p>
        </div>

        {/* Navy bottom strip */}
        <footer className="fd-strip">
          <img src={WORDMARK_LIGHT} alt="" className="fd-strip-mark" aria-hidden />
          <span className="fd-strip-text">{slide.strip}</span>
          {slide.cta ? <span className="fd-cta">{slide.cta}</span> : null}
        </footer>
      </div>
      <p className="fd-job">
        <strong>Slide {slide.n}</strong> · {slide.job}
      </p>
    </div>
  );
}

function FathersDayCarousel() {
  const [bg, setBg] = useState<"cream" | "navy">("cream");
  return (
    <main style={{ background: bg === "cream" ? CREAM : NAVY, minHeight: "100vh", padding: "48px 24px 96px", color: bg === "cream" ? NAVY : CREAM }}>
      <style>{css}</style>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <header style={{ marginBottom: 40 }}>
          <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".28em", textTransform: "uppercase", color: ORANGE, marginBottom: 10 }}>
            Instagram Carousel · 4 slides · 1080 × 1350
          </p>
          <h1 style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 600, letterSpacing: ".02em", textTransform: "uppercase", fontSize: "clamp(36px,5vw,64px)", marginBottom: 12 }}>
            Father's Day Promo
          </h1>
          <p style={{ maxWidth: 720, color: bg === "cream" ? INK_SOFT : "#b0ada8", fontSize: 17, lineHeight: 1.6 }}>
            Hook · Offer · Stakes · Close. Cream surface, real wordmark, oversized Oswald hero word, real photo, navy bottom strip, orange CTA pill.
            Right-click any slide to save as image, or screenshot at 1× zoom for a true 1080×1350 export.
          </p>
          <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
            <button onClick={() => setBg("cream")} className="fd-toggle" data-active={bg === "cream"}>Cream BG</button>
            <button onClick={() => setBg("navy")} className="fd-toggle" data-active={bg === "navy"}>Navy BG</button>
          </div>
        </header>

        <div className="fd-grid">
          {SLIDES.map((s) => <SlideCard key={s.n} slide={s} />)}
        </div>
      </div>
    </main>
  );
}

const css = `
.fd-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(360px,1fr));gap:48px}
.fd-stage{display:flex;flex-direction:column;align-items:center;gap:14px}
.fd-frame{width:1080px;height:1350px;background:${CREAM};color:${NAVY};position:relative;display:flex;flex-direction:column;
  transform-origin:top left;
  transform:scale(var(--fd-scale, 0.45));
  box-shadow:0 24px 60px rgba(11,16,41,.18),0 2px 0 rgba(11,16,41,.06);
  overflow:hidden;font-family:'Montserrat',system-ui,sans-serif;
}
/* Reserve scaled space so cards lay out correctly */
.fd-stage{width:calc(1080px * var(--fd-scale, 0.45));}
.fd-stage::before{content:"";display:block;width:1px;height:calc(1350px * var(--fd-scale, 0.45));margin-bottom:-14px}
@media(min-width:1280px){.fd-stage{--fd-scale:0.5}}
@media(max-width:900px){.fd-stage{--fd-scale:0.42}}
@media(max-width:640px){.fd-stage{--fd-scale:0.32}}
@media(max-width:420px){.fd-stage{--fd-scale:0.26}}

.fd-top{position:absolute;top:0;left:0;right:0;height:120px;display:flex;align-items:center;justify-content:space-between;padding:0 60px;z-index:3}
.fd-wordmark{height:54px;width:auto;display:block}
.fd-pill-num{font-family:'Oswald',sans-serif;font-weight:600;font-size:18px;letter-spacing:.24em;color:${NAVY};border:1.5px solid ${NAVY};padding:8px 18px;border-radius:999px}

.fd-photo{position:absolute;top:120px;left:60px;right:60px;height:620px;overflow:hidden;border-radius:6px;background:#000}
.fd-photo img{width:100%;height:100%;object-fit:cover;display:block;filter:saturate(1.02) contrast(1.02)}

.fd-body{position:absolute;top:780px;left:60px;right:60px;display:flex;flex-direction:column;gap:24px}
.fd-hero{font-family:'Oswald',sans-serif;font-weight:700;font-size:200px;line-height:.88;letter-spacing:-.01em;text-transform:uppercase;color:${NAVY};margin:0}
.fd-intro{font-family:'Montserrat',sans-serif;font-size:34px;line-height:1.32;color:${NAVY};max-width:920px;margin:0;font-weight:500}

.fd-strip{position:absolute;bottom:0;left:0;right:0;height:160px;background:${NAVY};color:${CREAM};display:flex;align-items:center;padding:0 60px;gap:32px}
.fd-strip-mark{height:46px;width:auto;flex-shrink:0;opacity:.95}
.fd-strip-text{font-family:'Oswald',sans-serif;font-weight:600;font-size:30px;letter-spacing:.14em;text-transform:uppercase;color:${CREAM};flex:1;line-height:1.1}
.fd-cta{font-family:'Oswald',sans-serif;font-weight:700;font-size:26px;letter-spacing:.16em;text-transform:uppercase;background:${ORANGE};color:${CREAM};padding:18px 28px;border-radius:6px;white-space:nowrap}

.fd-job{font-size:13px;letter-spacing:.04em;color:inherit;opacity:.75;max-width:480px;text-align:center}
.fd-job strong{font-family:'Oswald',sans-serif;letter-spacing:.16em;text-transform:uppercase;color:${ORANGE}}

.fd-toggle{font-family:'Oswald',sans-serif;font-weight:600;font-size:12px;letter-spacing:.18em;text-transform:uppercase;padding:10px 18px;border-radius:4px;border:1px solid currentColor;background:transparent;color:inherit;cursor:pointer}
.fd-toggle[data-active="true"]{background:${ORANGE};border-color:${ORANGE};color:${CREAM}}
`;
