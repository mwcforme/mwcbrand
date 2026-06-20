import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";
import slide1Asset from "@/assets/fathers-day/slide-1.webp.asset.json";
import slide2Asset from "@/assets/fathers-day/slide-2.jpg.asset.json";
import slide3Asset from "@/assets/fathers-day/slide-3.webp.asset.json";
import slide4Asset from "@/assets/fathers-day/slide-4.jpg.asset.json";

async function exportSlideToPng(slideN: number) {
  const el = document.getElementById(`fd-slide-${slideN}`) as HTMLElement | null;
  if (!el) return;
  const prevTransform = el.style.transform;
  // Snapshot at native 1080x1350 by neutralizing the preview scale transform.
  el.style.transform = "none";
  try {
    const dataUrl = await toPng(el, {
      width: 1080,
      height: 1350,
      cacheBust: true,
      pixelRatio: 1,
      style: { transform: "none" },
    });
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `mwc-fathers-day-slide-${slideN}.png`;
    a.click();
  } finally {
    el.style.transform = prevTransform;
  }
}

async function exportAllSlides() {
  for (const n of [1, 2, 3, 4]) {
    await exportSlideToPng(n);
    await new Promise((r) => setTimeout(r, 250));
  }
}

export const Route = createFileRoute("/social/fathers-day")({
  head: () => ({
    meta: [
      { title: "Father's Day Carousel · Men's Wellness Centers" },
      {
        name: "description",
        content: "Instagram carousel (4 slides, 1080x1350) for the Father's Day promo.",
      },
    ],
  }),
  component: FathersDayCarousel,
});

const WORDMARK =
  "/__l5e/assets-v1/d8a9db5f-130d-40a6-bc53-ed4bb5150d26/Navy_on_Transparent__wordmark_2174x500.png";
const WORDMARK_LIGHT =
  "/__l5e/assets-v1/d0018746-8b08-4844-a04e-8ed1b2a745db/White_on_Navy__wordmark_2174x500.png";

type Slide = {
  n: number;
  hero: string;
  intro: string;
  strip: string;
  cta?: string;
  photo: string;
  alt: string;
  photoPosition?: string;
  photoScale?: number;
  job: string;
};

const SLIDES: Slide[] = [
  {
    n: 1,
    hero: "GIFTED.",
    intro: "He has bought every gift on this list except the one he actually needs.",
    strip: "THIS FATHER'S DAY, GIVE HIM ANSWERS.",
    photo: slide1Asset.url,
    alt: "Couple smiling on the beach at golden hour",
    photoPosition: "55% 35%",
    photoScale: 1.0,
    job: "Hook · reframe instantly. This is a gift idea first.",
  },
  {
    n: 2,
    hero: "60 MINUTES.",
    intro: "A 60-minute visit with a physician. Same-day labs. He will finally know his numbers, not just guess.",
    strip: "PHYSICIAN-LED. SAME-DAY LABS.",
    cta: "CLAIM 10% OFF",
    photo: slide2Asset.url,
    alt: "Man cooling down after a workout",
    photoPosition: "76% 28%",
    photoScale: 1.16,
    job: "Offer · make the value clear early.",
  },
  {
    n: 3,
    hero: "SHOW UP.",
    intro: "Be there for the moments that matter. The trips, the milestones, the ordinary days. That starts with taking care of himself.",
    strip: "LOCALLY OWNED. JUDGMENT-FREE.",
    photo: slide3Asset.url,
    alt: "Couple relaxing together on a rooftop patio",
    photoPosition: "55% 42%",
    photoScale: 1.1,
    job: "Stakes · emotional payoff, the real reason to book.",
  },
  {
    n: 4,
    hero: "BOOK.",
    intro: "This Father's Day, claim 10% off his first plan through June 30. Sit down with a physician at your local Men's Wellness Centers.",
    strip: "BOOK AT BOOKMWC.COM",
    cta: "BOOK NOW",
    photo: slide4Asset.url,
    alt: "Smiling man leaning on a railing after a workout",
    photoPosition: "68% center",
    photoScale: 1.2,
    job: "Close · hard close with urgency.",
  },
];

const CREAM = "#f5f3f0";
const NAVY = "#0b1029";
const ORANGE = "#ff5500";
const INK_SOFT = "#4a4e66";

function SlideCard({ slide }: { slide: Slide }) {
  const id = `fd-slide-${slide.n}`;

  return (
    <div className="fd-stage">
      <div className="fd-preview">
        <div className="fd-frame" id={id}>
          <header className="fd-top">
            <img src={WORDMARK} alt="Men's Wellness Centers" className="fd-wordmark" />
            <span className="fd-pill-num">{slide.n} / 4</span>
          </header>

          <div className="fd-photo">
            <img
              src={slide.photo}
              alt={slide.alt}
              loading="lazy"
              style={{
                objectPosition: slide.photoPosition ?? "center",
                transform: `scale(${slide.photoScale ?? 1})`,
              }}
            />
          </div>

          <div className="fd-body">
            <h1 className="fd-hero">{slide.hero}</h1>
            <p className="fd-intro">{slide.intro}</p>
          </div>

          <footer className="fd-strip">
            <img src={WORDMARK_LIGHT} alt="" className="fd-strip-mark" aria-hidden />
            <span className="fd-strip-text">{slide.strip}</span>
            {slide.cta ? <span className="fd-cta">{slide.cta}</span> : null}
          </footer>
        </div>
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
    <main
      style={{
        background: bg === "cream" ? CREAM : NAVY,
        minHeight: "100vh",
        padding: "48px 24px 96px",
        color: bg === "cream" ? NAVY : CREAM,
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
            Instagram Carousel · 4 slides · 1080 × 1350
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
            Father's Day Promo
          </h1>
          <p
            style={{
              maxWidth: 720,
              color: bg === "cream" ? INK_SOFT : "#b0ada8",
              fontSize: 17,
              lineHeight: 1.6,
            }}
          >
            Rebuilt with only your uploaded photos. Cream surface, real wordmark,
            oversized Oswald hero word, navy bottom strip, and orange CTA pill.
          </p>
          <div style={{ marginTop: 20, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button
              onClick={() => setBg("cream")}
              className="fd-toggle"
              data-active={bg === "cream"}
            >
              Cream BG
            </button>
            <button
              onClick={() => setBg("navy")}
              className="fd-toggle"
              data-active={bg === "navy"}
            >
              Navy BG
            </button>
          </div>
        </header>

        <div className="fd-grid">
          {SLIDES.map((slide) => (
            <SlideCard key={slide.n} slide={slide} />
          ))}
        </div>

        <ResponsiveCheck bg={bg} />
      </div>
    </main>
  );
}

// === Automated responsive safe-margin check ===
// Renders every slide at common Instagram preview sizes and measures the
// rendered DOM to confirm that the photo, hero word, body copy and footer
// strip all stay inside the 1080x1350 safe area at every scale.

const SAFE_INSET = 60;            // px in the 1080x1350 frame
const FRAME_W = 1080;
const FRAME_H = 1350;
const FRAME_RATIO = FRAME_W / FRAME_H; // 0.8

type PreviewSize = { label: string; width: number; note: string };

const PREVIEW_SIZES: PreviewSize[] = [
  { label: "Profile thumb", width: 110, note: "Instagram profile grid" },
  { label: "Search grid", width: 160, note: "Explore / search tile" },
  { label: "Feed", width: 300, note: "In-feed preview" },
  { label: "Detail", width: 460, note: "Tap-to-open detail view" },
  { label: "Full", width: 540, note: "1:1 at half-res" },
];

type CheckRow = {
  size: PreviewSize;
  slideN: number;
  aspectOk: boolean;
  marginsOk: boolean;
  details: string;
};

function ResponsiveCheck({ bg }: { bg: "cream" | "navy" }) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [rows, setRows] = useState<CheckRow[]>([]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const tolerance = 1.5; // px slop for sub-pixel rounding

    const run = () => {
      const out: CheckRow[] = [];
      const frames = root.querySelectorAll<HTMLElement>("[data-rc-frame]");
      frames.forEach((frame) => {
        const slideN = Number(frame.dataset.slideN);
        const sizeLabel = frame.dataset.sizeLabel ?? "";
        const sizeWidth = Number(frame.dataset.sizeWidth);
        const size: PreviewSize =
          PREVIEW_SIZES.find((s) => s.label === sizeLabel) ?? {
            label: sizeLabel,
            width: sizeWidth,
            note: "",
          };

        const fRect = frame.getBoundingClientRect();
        const expectedH = fRect.width / FRAME_RATIO;
        const aspectOk = Math.abs(fRect.height - expectedH) < tolerance;
        const scale = fRect.width / FRAME_W;
        const safePx = SAFE_INSET * scale;

        const photo = frame.querySelector<HTMLElement>(".fd-photo")!;
        const hero = frame.querySelector<HTMLElement>(".fd-hero")!;
        const intro = frame.querySelector<HTMLElement>(".fd-intro")!;
        const strip = frame.querySelector<HTMLElement>(".fd-strip")!;

        const issues: string[] = [];
        const checkInside = (
          el: HTMLElement,
          name: string,
          allowFullBleedBottom = false,
        ) => {
          const r = el.getBoundingClientRect();
          if (r.left < fRect.left + safePx - tolerance)
            issues.push(`${name} left bleed`);
          if (r.right > fRect.right - safePx + tolerance)
            issues.push(`${name} right bleed`);
          if (r.top < fRect.top - tolerance)
            issues.push(`${name} top overflow`);
          if (!allowFullBleedBottom && r.bottom > fRect.bottom + tolerance)
            issues.push(`${name} bottom overflow`);
        };
        checkInside(photo, "photo");
        checkInside(hero, "hero");
        checkInside(intro, "intro");
        // Strip is intentionally full-bleed left/right; only check bottom alignment.
        const sRect = strip.getBoundingClientRect();
        if (Math.abs(sRect.bottom - fRect.bottom) > tolerance)
          issues.push("strip not flush bottom");

        out.push({
          size,
          slideN,
          aspectOk,
          marginsOk: issues.length === 0,
          details: issues.length
            ? issues.join(", ")
            : `scale ${scale.toFixed(3)} · safe ${safePx.toFixed(1)}px`,
        });
      });
      setRows(out);
    };

    // Wait a frame so fonts/images settle, then re-run on resize.
    const raf = requestAnimationFrame(run);
    const ro = new ResizeObserver(run);
    ro.observe(root);
    window.addEventListener("resize", run);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", run);
    };
  }, []);

  const total = rows.length;
  const passing = rows.filter((r) => r.aspectOk && r.marginsOk).length;
  const allGreen = total > 0 && passing === total;

  return (
    <section
      ref={rootRef}
      className="fd-rc"
      data-bg={bg}
      aria-labelledby="fd-rc-heading"
    >
      <header className="fd-rc-head">
        <div>
          <p className="fd-rc-kicker">Responsive safe-margin check</p>
          <h2 id="fd-rc-heading" className="fd-rc-title">
            Every slide × every preview size
          </h2>
          <p className="fd-rc-sub">
            Each slide is rendered at five common Instagram preview widths.
            After layout, the DOM is measured to confirm the 4:5 aspect ratio
            holds and the photo, hero word, body copy, and footer strip all
            stay inside the 60px safe inset (full-bleed strip excepted).
          </p>
        </div>
        <div
          className="fd-rc-summary"
          data-state={total === 0 ? "pending" : allGreen ? "pass" : "fail"}
        >
          {total === 0 ? "Measuring…" : `${passing} / ${total} pass`}
        </div>
      </header>

      <div className="fd-rc-sizes">
        {PREVIEW_SIZES.map((size) => (
          <div className="fd-rc-size" key={size.label}>
            <div className="fd-rc-size-head">
              <span className="fd-rc-size-label">{size.label}</span>
              <span className="fd-rc-size-dim">
                {size.width}×{Math.round(size.width / FRAME_RATIO)}
              </span>
              <span className="fd-rc-size-note">{size.note}</span>
            </div>
            <div className="fd-rc-row">
              {SLIDES.map((slide) => {
                const scale = size.width / FRAME_W;
                const row = rows.find(
                  (r) =>
                    r.size.label === size.label && r.slideN === slide.n,
                );
                const state = !row
                  ? "pending"
                  : row.aspectOk && row.marginsOk
                    ? "pass"
                    : "fail";
                return (
                  <div className="fd-rc-cell" key={slide.n}>
                    <div
                      className="fd-rc-frame"
                      data-rc-frame
                      data-slide-n={slide.n}
                      data-size-label={size.label}
                      data-size-width={size.width}
                      style={{
                        width: size.width,
                        height: size.width / FRAME_RATIO,
                      }}
                    >
                      <div
                        className="fd-rc-inner"
                        style={{ transform: `scale(${scale})` }}
                      >
                        <MiniSlide slide={slide} />
                      </div>
                      <div
                        className="fd-rc-safe"
                        style={{
                          inset: `${SAFE_INSET * scale}px`,
                          bottom: `${(SAFE_INSET + 160) * scale}px`,
                        }}
                        aria-hidden
                      />
                    </div>
                    <p className="fd-rc-cell-label" data-state={state}>
                      <span className="fd-rc-dot" aria-hidden />
                      Slide {slide.n}
                      {row ? (
                        <span className="fd-rc-cell-meta">{row.details}</span>
                      ) : null}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Re-uses the existing slide markup at 1:1 dimensions so the parent .fd-rc-frame
// can scale a single element and DOM measurements reflect real positions.
function MiniSlide({ slide }: { slide: Slide }) {
  return (
    <div
      className="fd-frame"
      style={{ transform: "none", position: "relative", boxShadow: "none" }}
    >
      <header className="fd-top">
        <img src={WORDMARK} alt="" className="fd-wordmark" aria-hidden />
        <span className="fd-pill-num">{slide.n} / 4</span>
      </header>
      <div className="fd-photo">
        <img
          src={slide.photo}
          alt=""
          aria-hidden
          loading="lazy"
          style={{
            objectPosition: slide.photoPosition ?? "center",
            transform: `scale(${slide.photoScale ?? 1})`,
          }}
        />
      </div>
      <div className="fd-body">
        <h3 className="fd-hero">{slide.hero}</h3>
        <p className="fd-intro">{slide.intro}</p>
      </div>
      <footer className="fd-strip">
        <img src={WORDMARK_LIGHT} alt="" className="fd-strip-mark" aria-hidden />
        <span className="fd-strip-text">{slide.strip}</span>
        {slide.cta ? <span className="fd-cta">{slide.cta}</span> : null}
      </footer>
    </div>
  );
}

const css = `
.fd-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(360px,1fr));gap:48px;align-items:start}
.fd-stage{display:flex;flex-direction:column;align-items:center;gap:14px}
.fd-preview{width:calc(1080px * var(--fd-scale, 0.45));height:calc(1350px * var(--fd-scale, 0.45));position:relative;overflow:hidden}
.fd-frame{width:1080px;height:1350px;background:${CREAM};color:${NAVY};position:absolute;top:0;left:0;display:flex;flex-direction:column;transform-origin:top left;transform:scale(var(--fd-scale, 0.45));box-shadow:0 24px 60px rgba(11,16,41,.18),0 2px 0 rgba(11,16,41,.06);overflow:hidden;font-family:'Montserrat',system-ui,sans-serif}
@media(min-width:1280px){.fd-stage{--fd-scale:0.5}}
@media(max-width:900px){.fd-stage{--fd-scale:0.42}}
@media(max-width:640px){.fd-stage{--fd-scale:0.32}}
@media(max-width:420px){.fd-stage{--fd-scale:0.26}}
.fd-top{position:absolute;top:0;left:0;right:0;height:120px;display:flex;align-items:center;justify-content:space-between;padding:0 60px;z-index:3}
.fd-wordmark{height:54px;width:auto;display:block}
.fd-pill-num{font-family:'Oswald',sans-serif;font-weight:600;font-size:18px;letter-spacing:.24em;color:${NAVY};border:1.5px solid ${NAVY};padding:8px 18px;border-radius:999px;background:rgba(245,243,240,.72);backdrop-filter:blur(8px)}
.fd-photo{position:absolute;top:120px;left:60px;right:60px;height:620px;overflow:hidden;border-radius:6px;background:#ddd}
.fd-photo img{width:100%;height:100%;object-fit:cover;display:block;transform-origin:center center}
.fd-body{position:absolute;top:780px;left:60px;right:60px;display:flex;flex-direction:column;gap:24px}
.fd-hero{font-family:'Oswald',sans-serif;font-weight:700;font-size:188px;line-height:.88;letter-spacing:0;text-transform:uppercase;color:${NAVY};margin:0}
.fd-intro{font-family:'Montserrat',sans-serif;font-size:34px;line-height:1.32;color:${NAVY};max-width:930px;margin:0;font-weight:500}
.fd-strip{position:absolute;bottom:0;left:0;right:0;height:160px;background:${NAVY};color:${CREAM};display:flex;align-items:center;padding:0 60px;gap:28px}
.fd-strip-mark{height:46px;width:auto;flex-shrink:0;opacity:.95}
.fd-strip-text{font-family:'Oswald',sans-serif;font-weight:600;font-size:29px;letter-spacing:.14em;text-transform:uppercase;color:${CREAM};flex:1;line-height:1.1}
.fd-cta{font-family:'Oswald',sans-serif;font-weight:700;font-size:26px;letter-spacing:.16em;text-transform:uppercase;background:${ORANGE};color:${CREAM};padding:18px 28px;border-radius:6px;white-space:nowrap}
.fd-job{font-size:13px;letter-spacing:.04em;color:inherit;opacity:.75;max-width:480px;text-align:center}
.fd-job strong{font-family:'Oswald',sans-serif;letter-spacing:.16em;text-transform:uppercase;color:${ORANGE}}
.fd-toggle{font-family:'Oswald',sans-serif;font-weight:600;font-size:12px;letter-spacing:.18em;text-transform:uppercase;padding:10px 18px;border-radius:4px;border:1px solid currentColor;background:transparent;color:inherit;cursor:pointer}
.fd-toggle[data-active="true"]{background:${ORANGE};border-color:${ORANGE};color:${CREAM}}

/* Responsive check panel */
.fd-rc{margin-top:96px;border-top:1px solid color-mix(in srgb, currentColor 18%, transparent);padding-top:48px}
.fd-rc-head{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:24px;align-items:start;margin-bottom:32px}
.fd-rc-kicker{font-size:12px;font-weight:600;letter-spacing:.28em;text-transform:uppercase;color:${ORANGE};margin:0 0 8px}
.fd-rc-title{font-family:'Oswald',sans-serif;font-weight:600;letter-spacing:.02em;text-transform:uppercase;font-size:clamp(24px,3vw,38px);margin:0 0 10px;color:inherit}
.fd-rc-sub{max-width:720px;font-size:15px;line-height:1.55;opacity:.78;margin:0}
.fd-rc-summary{font-family:'Oswald',sans-serif;font-weight:600;letter-spacing:.16em;text-transform:uppercase;font-size:14px;padding:10px 16px;border-radius:6px;white-space:nowrap;align-self:start}
.fd-rc-summary[data-state="pass"]{background:#0f5132;color:#d1f0dc}
.fd-rc-summary[data-state="fail"]{background:#7a1f1f;color:#ffdcdc}
.fd-rc-summary[data-state="pending"]{background:color-mix(in srgb, currentColor 10%, transparent);color:inherit}
.fd-rc-sizes{display:flex;flex-direction:column;gap:40px}
.fd-rc-size-head{display:flex;flex-wrap:wrap;align-items:baseline;gap:12px;margin-bottom:14px;padding-bottom:10px;border-bottom:1px dashed color-mix(in srgb, currentColor 22%, transparent)}
.fd-rc-size-label{font-family:'Oswald',sans-serif;font-weight:600;letter-spacing:.16em;text-transform:uppercase;font-size:14px}
.fd-rc-size-dim{font-size:12px;font-family:'JetBrains Mono',ui-monospace,monospace;opacity:.7}
.fd-rc-size-note{font-size:12px;opacity:.6}
.fd-rc-row{display:flex;flex-wrap:wrap;gap:24px;align-items:flex-start}
.fd-rc-cell{display:flex;flex-direction:column;gap:8px;min-width:0}
.fd-rc-frame{position:relative;overflow:hidden;border-radius:4px;background:${CREAM};box-shadow:0 4px 14px rgba(11,16,41,.18)}
.fd-rc-inner{position:absolute;top:0;left:0;width:1080px;height:1350px;transform-origin:top left}
.fd-rc-safe{position:absolute;border:1px dashed rgba(255,85,0,.55);pointer-events:none;border-radius:2px}
.fd-rc-cell-label{margin:0;font-size:11px;font-family:'JetBrains Mono',ui-monospace,monospace;display:flex;align-items:center;gap:6px;flex-wrap:wrap;opacity:.85}
.fd-rc-dot{width:8px;height:8px;border-radius:999px;flex-shrink:0;background:#777}
.fd-rc-cell-label[data-state="pass"] .fd-rc-dot{background:#2bb673}
.fd-rc-cell-label[data-state="fail"] .fd-rc-dot{background:#e35454}
.fd-rc-cell-label[data-state="fail"]{color:#e35454;opacity:1}
.fd-rc-cell-meta{opacity:.6;font-size:10px;white-space:nowrap}
.fd-rc[data-bg="navy"] .fd-rc-frame{box-shadow:0 4px 14px rgba(0,0,0,.45)}
@media(max-width:640px){.fd-rc-head{grid-template-columns:1fr}}
`;
