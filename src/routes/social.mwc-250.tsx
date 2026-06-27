import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";
import slide1 from "@/assets/mwc-250/slide-1.jpg";
import slide2 from "@/assets/mwc-250/slide-2.jpg";
import slide3 from "@/assets/mwc-250/slide-3.jpg";
import slide4 from "@/assets/mwc-250/slide-4.jpg";

async function exportSlideToPng(slideN: number) {
  const el = document.getElementById(`yw-slide-${slideN}`) as HTMLElement | null;
  if (!el) return;
  const prev = el.style.transform;
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
    a.download = `mwc-250-slide-${slideN}.png`;
    a.click();
  } finally {
    el.style.transform = prev;
  }
}

async function exportAllSlides() {
  for (const n of [1, 2, 3, 4]) {
    await exportSlideToPng(n);
    await new Promise((r) => setTimeout(r, 250));
  }
}

export const Route = createFileRoute("/social/mwc-250")({
  head: () => ({
    meta: [
      { title: "MWC 250 · Young Washington Carousel · Men's Wellness Centers" },
      {
        name: "description",
        content:
          "Instagram carousel (4 slides, 1080x1350) for the MWC 250 · Independence Day campaign, co-branded with the film Young Washington.",
      },
      { property: "og:title", content: "MWC 250 · Young Washington Carousel" },
      {
        property: "og:description",
        content:
          "250 years of showing up. The MWC × Young Washington Independence Day carousel.",
      },
      { property: "og:url", content: "https://mwcbrand.lovable.app/social/mwc-250" },
    ],
    links: [{ rel: "canonical", href: "https://mwcbrand.lovable.app/social/mwc-250" }],
  }),
  component: MwcCarousel,
});

const WORDMARK =
  "/__l5e/assets-v1/d8a9db5f-130d-40a6-bc53-ed4bb5150d26/Navy_on_Transparent__wordmark_2174x500.png";
const WORDMARK_LIGHT =
  "/__l5e/assets-v1/d0018746-8b08-4844-a04e-8ed1b2a745db/White_on_Navy__wordmark_2174x500.png";

const CREAM = "#f5f3f0";
const NAVY = "#0b1029";
const RED = "#b9261e";
const GOLD = "#c9a44a";
const INK_SOFT = "#4a4e66";

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
  heroSize?: number;
  job: string;
};

const SLIDES: Slide[] = [
  {
    n: 1,
    hero: "250 YEARS.",
    intro: "Two and a half centuries of American men showing up. For their families. For their neighbors. For the next 250.",
    strip: "INDEPENDENCE DAY · MWC × YOUNG WASHINGTON.",
    cta: "BookMWC.com",
    photo: slide1,
    alt: "Modern father at dawn with an American flag behind him",
    photoPosition: "55% 30%",
    photoScale: 1.05,
    job: "Hook · plant the flag. 250 years of showing up.",
  },
  {
    n: 2,
    hero: "AT 22.",
    intro: "Young Washington was 22 when he led men through the Ohio wilderness. You're not 22. You don't need to be. You just need to feel like you can show up for the people who count on you.",
    strip: "INSPIRED BY YOUNG WASHINGTON · IN THEATERS JULY 3.",
    cta: "BookMWC.com",
    photo: slide2,
    alt: "Painterly portrait of a young Revolutionary-era rider at dawn",
    photoPosition: "50% 25%",
    photoScale: 1.0,
    heroSize: 220,
    job: "Bridge · the co-brand. Tie the film's hero to your patient.",
  },
  {
    n: 3,
    hero: "THE CONSTANT.",
    intro: "Energy. Focus. Presence. The things your family actually feels, at the cookout, on the drive home, on the ordinary Tuesday in August.",
    strip: "PHYSICIAN-LED · LOCALLY OWNED.",
    cta: "BookMWC.com",
    photo: slide3,
    alt: "Father and son laughing on a small-town main street",
    photoPosition: "50% 35%",
    photoScale: 1.08,
    heroSize: 138,
    job: "Stakes · the dividend is felt by the people around him.",
  },
  {
    n: 4,
    hero: "BOOK.",
    intro: "Book your first visit at your local Men's Wellness Centers by July 4. One hour. A physician, real labs, a plan you can actually follow.",
    strip: "BOOKMWC.COM/MWC-250",
    cta: "BookMWC.com",
    photo: slide4,
    alt: "Family silhouette watching distant fireworks at twilight",
    photoPosition: "50% 65%",
    photoScale: 1.0,
    job: "Close · the nudge, not the sale. Window closes 7/4.",
  },
];

function SlideCard({ slide }: { slide: Slide }) {
  const id = `yw-slide-${slide.n}`;
  return (
    <div className="yw-stage">
      <div className="yw-preview">
        <div className="yw-frame" id={id}>
          <header className="yw-top">
            <img src={WORDMARK} alt="Men's Wellness Centers" className="yw-wordmark" />
            <span className="yw-pill-num">{slide.n} / 4</span>
          </header>

          <div className="yw-photo">
            <img
              src={slide.photo}
              alt={slide.alt}
              loading="lazy"
              style={{
                objectPosition: slide.photoPosition ?? "center",
                transform: `scale(${slide.photoScale ?? 1})`,
              }}
            />
            <div className="yw-photo-tint" aria-hidden />
          </div>

          <div className="yw-body">
            <h1
              className="yw-hero"
              style={slide.heroSize ? { fontSize: `${slide.heroSize}px` } : undefined}
            >
              {slide.hero}
            </h1>
            <p className="yw-intro">{slide.intro}</p>
          </div>

          <footer className="yw-strip">
            <img src={WORDMARK_LIGHT} alt="" className="yw-strip-mark" aria-hidden />
            <span className="yw-strip-text">{slide.strip}</span>
            {slide.cta ? <span className="yw-cta">{slide.cta}</span> : null}
          </footer>
        </div>
      </div>
      <p className="yw-job">
        <strong>Slide {slide.n}</strong> · {slide.job}
      </p>
      <button
        type="button"
        className="yw-toggle"
        onClick={() => exportSlideToPng(slide.n)}
      >
        Export PNG · 1080×1350
      </button>
    </div>
  );
}

function MwcCarousel() {
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
              color: RED,
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
            MWC 250 · Young Washington
          </h1>
          <p
            style={{
              maxWidth: 720,
              color: bg === "cream" ? INK_SOFT : "#b0ada8",
              fontSize: 17,
              lineHeight: 1.6,
            }}
          >
            America's semiquincentennial. Co-branded with the film
            <em> Young Washington</em> (in theaters July 3, 2026). The frame is
            simple: 250 years of American men showing up, and one hour that
            keeps you in the game for the next 250.
          </p>
          <div style={{ marginTop: 20, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button
              onClick={() => setBg("cream")}
              className="yw-toggle"
              data-active={bg === "cream"}
            >
              Cream BG
            </button>
            <button
              onClick={() => setBg("navy")}
              className="yw-toggle"
              data-active={bg === "navy"}
            >
              Navy BG
            </button>
            <button
              onClick={() => exportAllSlides()}
              className="yw-toggle"
              data-active="true"
              style={{ marginLeft: "auto" }}
            >
              ⬇ Export all PNGs
            </button>
          </div>
        </header>

        <div className="yw-grid">
          {SLIDES.map((slide) => (
            <SlideCard key={slide.n} slide={slide} />
          ))}
        </div>

        <ResponsiveCheck bg={bg} />
      </div>
    </main>
  );
}

const SAFE_INSET = 60;
const FRAME_W = 1080;
const FRAME_H = 1350;
const FRAME_RATIO = FRAME_W / FRAME_H;

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
    const tolerance = 1.5;

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

        const photo = frame.querySelector<HTMLElement>(".yw-photo")!;
        const hero = frame.querySelector<HTMLElement>(".yw-hero")!;
        const intro = frame.querySelector<HTMLElement>(".yw-intro")!;
        const strip = frame.querySelector<HTMLElement>(".yw-strip")!;

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
      className="yw-rc"
      data-bg={bg}
      aria-labelledby="yw-rc-heading"
    >
      <header className="yw-rc-head">
        <div>
          <p className="yw-rc-kicker">Responsive safe-margin check</p>
          <h2 id="yw-rc-heading" className="yw-rc-title">
            Every slide × every preview size
          </h2>
          <p className="yw-rc-sub">
            Each slide is rendered at five Instagram preview widths. After
            layout, the DOM is measured to confirm the 4:5 aspect ratio holds
            and the photo, hero word, body copy, and footer strip stay inside
            the 60px safe inset.
          </p>
        </div>
        <div
          className="yw-rc-summary"
          data-state={total === 0 ? "pending" : allGreen ? "pass" : "fail"}
        >
          {total === 0 ? "Measuring…" : `${passing} / ${total} pass`}
        </div>
      </header>

      <div className="yw-rc-sizes">
        {PREVIEW_SIZES.map((size) => (
          <div className="yw-rc-size" key={size.label}>
            <div className="yw-rc-size-head">
              <span className="yw-rc-size-label">{size.label}</span>
              <span className="yw-rc-size-dim">
                {size.width}×{Math.round(size.width / FRAME_RATIO)}
              </span>
              <span className="yw-rc-size-note">{size.note}</span>
            </div>
            <div className="yw-rc-row">
              {SLIDES.map((slide) => {
                const scale = size.width / FRAME_W;
                const row = rows.find(
                  (r) => r.size.label === size.label && r.slideN === slide.n,
                );
                const state = !row
                  ? "pending"
                  : row.aspectOk && row.marginsOk
                    ? "pass"
                    : "fail";
                return (
                  <div className="yw-rc-cell" key={slide.n}>
                    <div
                      className="yw-rc-frame"
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
                        className="yw-rc-inner"
                        style={{ transform: `scale(${scale})` }}
                      >
                        <MiniSlide slide={slide} />
                      </div>
                      <div
                        className="yw-rc-safe"
                        style={{
                          inset: `${SAFE_INSET * scale}px`,
                          bottom: `${(SAFE_INSET + 160) * scale}px`,
                        }}
                        aria-hidden
                      />
                    </div>
                    <p className="yw-rc-cell-label" data-state={state}>
                      <span className="yw-rc-dot" aria-hidden />
                      Slide {slide.n}
                      {row ? (
                        <span className="yw-rc-cell-meta">{row.details}</span>
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

function MiniSlide({ slide }: { slide: Slide }) {
  return (
    <div
      className="yw-frame"
      style={{ transform: "none", position: "relative", boxShadow: "none" }}
    >
      <header className="yw-top">
        <img src={WORDMARK} alt="" className="yw-wordmark" aria-hidden />
        <span className="yw-pill-num">{slide.n} / 4</span>
      </header>
      <div className="yw-photo">
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
        <div className="yw-photo-tint" aria-hidden />
      </div>
      <div className="yw-body">
        <h3
          className="yw-hero"
          style={slide.heroSize ? { fontSize: `${slide.heroSize}px` } : undefined}
        >
          {slide.hero}
        </h3>
        <p className="yw-intro">{slide.intro}</p>
      </div>
      <footer className="yw-strip">
        <img src={WORDMARK_LIGHT} alt="" className="yw-strip-mark" aria-hidden />
        <span className="yw-strip-text">{slide.strip}</span>
        {slide.cta ? <span className="yw-cta">{slide.cta}</span> : null}
      </footer>
    </div>
  );
}

const css = `
.yw-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(360px,1fr));gap:48px;align-items:start}
.yw-stage{display:flex;flex-direction:column;align-items:center;gap:14px}
.yw-preview{width:calc(${FRAME_W}px * var(--yw-scale, 0.45));height:calc(${FRAME_H}px * var(--yw-scale, 0.45));position:relative;overflow:hidden}
.yw-frame{width:${FRAME_W}px;height:${FRAME_H}px;background:${CREAM};color:${NAVY};position:absolute;top:0;left:0;display:flex;flex-direction:column;transform-origin:top left;transform:scale(var(--yw-scale, 0.45));box-shadow:0 24px 60px rgba(11,16,41,.18),0 2px 0 rgba(11,16,41,.06);overflow:hidden;font-family:'Montserrat',system-ui,sans-serif}
@media(min-width:1280px){.yw-stage{--yw-scale:0.5}}
@media(max-width:900px){.yw-stage{--yw-scale:0.42}}
@media(max-width:640px){.yw-stage{--yw-scale:0.32}}
@media(max-width:420px){.yw-stage{--yw-scale:0.26}}
.yw-top{position:absolute;top:0;left:0;right:0;height:120px;display:flex;align-items:center;justify-content:space-between;padding:0 60px;z-index:3}
.yw-wordmark{height:54px;width:auto;display:block;filter:drop-shadow(0 1px 0 rgba(245,243,240,.6))}
.yw-pill-num{font-family:'Oswald',sans-serif;font-weight:600;font-size:18px;letter-spacing:.24em;color:${NAVY};border:1.5px solid ${NAVY};padding:8px 18px;border-radius:999px;background:rgba(245,243,240,.78);backdrop-filter:blur(8px);white-space:nowrap;line-height:1}
.yw-photo{position:absolute;top:120px;left:60px;right:60px;height:580px;overflow:hidden;border-radius:6px;background:#ddd}
.yw-photo img{width:100%;height:100%;object-fit:cover;display:block;transform-origin:center center}
.yw-photo-tint{position:absolute;inset:0;background:linear-gradient(180deg,rgba(11,16,41,0) 60%,rgba(11,16,41,.18) 100%);pointer-events:none}
.yw-body{position:absolute;top:730px;left:60px;right:60px;bottom:200px;display:flex;flex-direction:column;gap:20px;overflow:hidden}
.yw-hero{font-family:'Oswald',sans-serif;font-weight:700;font-size:158px;line-height:.86;letter-spacing:0;text-transform:uppercase;color:${NAVY};margin:0}
.yw-hero::first-letter{color:${RED}}
.yw-intro{font-family:'Montserrat',sans-serif;font-size:30px;line-height:1.32;color:${NAVY};max-width:930px;margin:0;font-weight:500}
.yw-strip{position:absolute;bottom:0;left:0;right:0;height:160px;background:${NAVY};color:${CREAM};display:flex;align-items:center;padding:0 60px;gap:20px;border-top:6px solid ${RED}}
.yw-strip-mark{height:46px;width:auto;flex-shrink:0;opacity:.95}
.yw-strip-text{font-family:'Oswald',sans-serif;font-weight:600;font-size:24px;letter-spacing:.12em;text-transform:uppercase;color:${CREAM};flex:1;min-width:0;line-height:1.1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.yw-cta{font-family:'Oswald',sans-serif;font-weight:700;font-size:24px;letter-spacing:.14em;text-transform:uppercase;background:${RED};color:${CREAM};padding:16px 24px;border-radius:6px;white-space:nowrap;flex-shrink:0;box-shadow:0 0 0 2px ${GOLD} inset}
.yw-job{font-size:13px;letter-spacing:.04em;color:inherit;opacity:.75;max-width:480px;text-align:center}
.yw-job strong{font-family:'Oswald',sans-serif;letter-spacing:.16em;text-transform:uppercase;color:${RED}}
.yw-toggle{font-family:'Oswald',sans-serif;font-weight:600;font-size:12px;letter-spacing:.18em;text-transform:uppercase;padding:10px 18px;border-radius:4px;border:1px solid currentColor;background:transparent;color:inherit;cursor:pointer}
.yw-toggle[data-active="true"]{background:${RED};border-color:${RED};color:${CREAM}}

.yw-rc{margin-top:96px;border-top:1px solid color-mix(in srgb, currentColor 18%, transparent);padding-top:48px}
.yw-rc-head{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:24px;align-items:start;margin-bottom:32px}
.yw-rc-kicker{font-size:12px;font-weight:600;letter-spacing:.28em;text-transform:uppercase;color:${RED};margin:0 0 8px}
.yw-rc-title{font-family:'Oswald',sans-serif;font-weight:600;letter-spacing:.02em;text-transform:uppercase;font-size:clamp(24px,3vw,38px);margin:0 0 10px;color:inherit}
.yw-rc-sub{max-width:720px;font-size:15px;line-height:1.55;opacity:.78;margin:0}
.yw-rc-summary{font-family:'Oswald',sans-serif;font-weight:600;letter-spacing:.16em;text-transform:uppercase;font-size:14px;padding:10px 16px;border-radius:6px;white-space:nowrap;align-self:start}
.yw-rc-summary[data-state="pass"]{background:#0f5132;color:#d1f0dc}
.yw-rc-summary[data-state="fail"]{background:#7a1f1f;color:#ffdcdc}
.yw-rc-summary[data-state="pending"]{background:color-mix(in srgb, currentColor 10%, transparent);color:inherit}
.yw-rc-sizes{display:flex;flex-direction:column;gap:40px}
.yw-rc-size-head{display:flex;flex-wrap:wrap;align-items:baseline;gap:12px;margin-bottom:14px;padding-bottom:10px;border-bottom:1px dashed color-mix(in srgb, currentColor 22%, transparent)}
.yw-rc-size-label{font-family:'Oswald',sans-serif;font-weight:600;letter-spacing:.16em;text-transform:uppercase;font-size:14px}
.yw-rc-size-dim{font-size:12px;font-family:'JetBrains Mono',ui-monospace,monospace;opacity:.7}
.yw-rc-size-note{font-size:12px;opacity:.6}
.yw-rc-row{display:flex;flex-wrap:wrap;gap:24px;align-items:flex-start}
.yw-rc-cell{display:flex;flex-direction:column;gap:8px;min-width:0}
.yw-rc-frame{position:relative;overflow:hidden;border-radius:4px;background:${CREAM};box-shadow:0 4px 14px rgba(11,16,41,.18)}
.yw-rc-inner{position:absolute;top:0;left:0;width:${FRAME_W}px;height:${FRAME_H}px;transform-origin:top left}
.yw-rc-safe{position:absolute;border:1px dashed rgba(185,38,30,.55);pointer-events:none;border-radius:2px}
.yw-rc-cell-label{margin:0;font-size:11px;font-family:'JetBrains Mono',ui-monospace,monospace;display:flex;align-items:center;gap:6px;flex-wrap:wrap;opacity:.85}
.yw-rc-dot{width:8px;height:8px;border-radius:999px;flex-shrink:0;background:#777}
.yw-rc-cell-label[data-state="pass"] .yw-rc-dot{background:#2bb673}
.yw-rc-cell-label[data-state="fail"] .yw-rc-dot{background:#e35454}
.yw-rc-cell-label[data-state="fail"]{color:#e35454;opacity:1}
.yw-rc-cell-meta{opacity:.6;font-size:10px;white-space:nowrap}
.yw-rc[data-bg="navy"] .yw-rc-frame{box-shadow:0 4px 14px rgba(0,0,0,.45)}
@media(max-width:640px){.yw-rc-head{grid-template-columns:1fr}}
`;
