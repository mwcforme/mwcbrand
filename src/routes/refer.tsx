import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

const REFER_URL = "https://go.menswellnesscenters.com/ambassador/referral";
const ENROLL_URL = "https://go.menswellnesscenters.com/ambassador/enroll";
const HERO_IMAGE =
  "https://picsum.photos/seed/mwc-refer-provider/1920/1200";

export const Route = createFileRoute("/refer")({
  head: () => ({
    meta: [
      { title: "Refer a Friend · Men's Wellness Centers | Virginia" },
      {
        name: "description",
        content:
          "Refer a friend to Men's Wellness Centers. He gets 10% off his program. You get 3 months of free service for every friend who joins.",
      },
      { property: "og:title", content: "Refer a Friend · Men's Wellness Centers" },
      {
        property: "og:description",
        content:
          "He gets 10% off his program. You get 3 months of free service. Simple, on both ends.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://mwcbrand.lovable.app/refer" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://mwcbrand.lovable.app/refer" }],
  }),
  component: ReferPage,
});

/* MWC brand tokens */
const NAVY = "#0b1226";
const NAVY_DEEP = "#070c1c";
const INK = "#0b1226";
const INK_SOFT = "#3a3f52";
const MUTED = "#6a6f80";
const RULE = "#e6e8ee";
const SURFACE = "#f5f6f9";
const ORANGE = "#ef6c1a";
const ORANGE_HOVER = "#d95e10";

const BODY_FONT = "'Open Sans', system-ui, sans-serif";
const DISPLAY_FONT = "'Oswald', 'Open Sans', sans-serif";

/* Motion primitive: heavy, cinematic ease */
const EASE = "cubic-bezier(0.32, 0.72, 0, 1)";

const scopedCSS = `
.mwc-refer { background:#fff; color:${INK}; font-family:${BODY_FONT}; font-size:16px; line-height:1.65; }
.mwc-refer h1,.mwc-refer h2,.mwc-refer h3 { text-wrap:balance; margin:0; }
.mwc-refer p { text-wrap:pretty; }
.mwc-refer ::selection { background:${ORANGE}; color:#fff; }

.mwc-wrap { max-width:1200px; margin:0 auto; padding:0 24px; }

.mwc-display { font-family:${DISPLAY_FONT}; font-weight:700; text-transform:uppercase;
  letter-spacing:0.5px; line-height:1.0; color:#fff; }
.mwc-h2 { font-family:${DISPLAY_FONT}; font-weight:700; text-transform:uppercase;
  letter-spacing:0.5px; line-height:1.03; color:${NAVY};
  font-size: clamp(32px, 4.6vw, 52px); }
.mwc-eyebrow { display:inline-flex; align-items:center; gap:8px;
  font-family:${BODY_FONT}; font-size:11px; font-weight:700;
  letter-spacing:2.8px; text-transform:uppercase; color:${ORANGE};
  padding:6px 12px; border-radius:999px;
  background:color-mix(in oklab, ${ORANGE} 10%, transparent);
  border:1px solid color-mix(in oklab, ${ORANGE} 25%, transparent); }
.mwc-eyebrow::before { content:""; width:5px; height:5px; border-radius:999px; background:${ORANGE}; }
.mwc-eyebrow.on-dark { color:#ffb98a;
  background:rgba(239,108,26,0.14);
  border-color:rgba(239,108,26,0.32); }
.mwc-eyebrow.on-dark::before { background:#ffb98a; }

/* ---------- Pills (magnetic, button-in-button) ---------- */
.mwc-pill { position:relative; display:inline-flex; align-items:center; gap:14px;
  padding:14px 18px 14px 26px; border-radius:999px;
  font-family:${DISPLAY_FONT}; font-weight:600; letter-spacing:1.4px;
  font-size:13.5px; text-transform:uppercase; text-decoration:none;
  transition: transform .5s ${EASE}, background-color .35s ${EASE}, border-color .35s ${EASE}, box-shadow .5s ${EASE};
  will-change: transform; }
.mwc-pill .pip { width:34px; height:34px; border-radius:999px;
  display:inline-flex; align-items:center; justify-content:center;
  font-size:15px; line-height:1;
  transition: transform .5s ${EASE}, background-color .35s ${EASE}; }
.mwc-pill:active { transform: scale(0.98); }

.mwc-pill-primary { background:${ORANGE}; color:#fff;
  box-shadow: 0 1px 0 rgba(255,255,255,0.25) inset, 0 12px 30px -14px rgba(239,108,26,0.55); }
.mwc-pill-primary .pip { background:rgba(0,0,0,0.14); color:#fff; }
.mwc-pill-primary:hover { background:${ORANGE_HOVER}; transform: translateY(-1px);
  box-shadow: 0 1px 0 rgba(255,255,255,0.25) inset, 0 18px 40px -14px rgba(239,108,26,0.7); }
.mwc-pill-primary:hover .pip { transform: translate(3px, -1px); background:rgba(0,0,0,0.22); }

.mwc-pill-ghost { background:transparent; color:#fff;
  border:1px solid rgba(255,255,255,0.35); padding:14px 24px; gap:12px; }
.mwc-pill-ghost .pip { background:rgba(255,255,255,0.10); color:#fff; }
.mwc-pill-ghost:hover { border-color:rgba(255,255,255,0.85); background:rgba(255,255,255,0.06); transform: translateY(-1px); }
.mwc-pill-ghost:hover .pip { transform: translate(3px, -1px); background:rgba(255,255,255,0.18); }

/* ---------- Hero ---------- */
.mwc-hero { position:relative; background:${NAVY_DEEP};
  padding: clamp(88px, 12vw, 140px) 0 clamp(96px, 13vw, 160px);
  overflow:hidden; isolation:isolate; }
.mwc-hero .bg { position:absolute; inset:0; z-index:0;
  background-image:url("${HERO_IMAGE}");
  background-size:cover; background-position:center;
  opacity:0.22; filter:grayscale(0.6) contrast(1.05);
  transform: scale(1.05); }
.mwc-hero .scrim { position:absolute; inset:0; z-index:1;
  background:
    linear-gradient(180deg, rgba(7,12,28,0.78) 0%, rgba(7,12,28,0.9) 60%, rgba(7,12,28,0.98) 100%),
    radial-gradient(1000px 500px at 82% -10%, rgba(239,108,26,0.22), transparent 60%),
    radial-gradient(700px 400px at 12% 110%, rgba(60,120,220,0.12), transparent 60%);
  pointer-events:none; }
.mwc-hero .grain { position:absolute; inset:0; z-index:2; pointer-events:none;
  opacity:0.04; mix-blend-mode:overlay;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>"); }
.mwc-hero-inner { position:relative; z-index:3; text-align:center; max-width:960px;
  margin:0 auto; padding:0 24px; }
.mwc-hero .eyebrow-row { display:flex; justify-content:center; margin-bottom:22px; }
.mwc-hero h1 { font-size: clamp(48px, 9vw, 104px); letter-spacing:-0.5px; }
.mwc-hero h1 .amp { color:${ORANGE}; font-style:normal; }
.mwc-hero .sub { margin: 26px auto 0; max-width: 620px;
  color: rgba(255,255,255,0.86); font-size: clamp(16px, 1.55vw, 19px); }
.mwc-hero .cta-row { margin-top: 38px; display:flex; gap:14px; justify-content:center; flex-wrap:wrap; }

.mwc-crumb { color:rgba(255,255,255,0.6); font-size:12.5px; letter-spacing:1.5px;
  text-transform:uppercase; margin-bottom:22px; text-align:center; }
.mwc-crumb a { color:rgba(255,255,255,0.6); text-decoration:none; transition:color .3s ${EASE}; }
.mwc-crumb a:hover { color:#fff; }
.mwc-crumb .sep { margin:0 10px; opacity:0.5; }

/* ---------- Rewards strip (double-bezel plate) ---------- */
.mwc-rewards-wrap { background:#fff; padding: clamp(48px, 6vw, 72px) 0; }
.mwc-rewards { max-width:1160px; margin:0 auto; padding: 0 24px; }
.mwc-rewards-plate { position:relative;
  background: linear-gradient(180deg, #f8f9fc 0%, #eef0f5 100%);
  border-radius: 28px; padding: 8px;
  box-shadow: 0 30px 60px -30px rgba(11,18,38,0.18), 0 1px 0 rgba(255,255,255,0.9) inset; }
.mwc-rewards-grid { display:grid; grid-template-columns: 1fr 1fr;
  background:#fff; border-radius: calc(28px - 8px);
  box-shadow: 0 1px 0 rgba(255,255,255,1) inset,
    0 0 0 1px rgba(11,18,38,0.06); overflow:hidden; }
.mwc-reward { padding: 44px 44px; position:relative; }
.mwc-reward + .mwc-reward::before { content:""; position:absolute; left:0; top:20%; bottom:20%; width:1px;
  background: linear-gradient(180deg, transparent, ${RULE} 30%, ${RULE} 70%, transparent); }
.mwc-reward .who { font-size:11px; font-weight:700; letter-spacing:2.6px;
  text-transform:uppercase; color:${ORANGE}; }
.mwc-reward .what { font-family:${DISPLAY_FONT}; font-weight:700; color:${NAVY};
  font-size: clamp(28px, 3.4vw, 42px); line-height:1.02; margin-top:12px;
  text-transform:uppercase; letter-spacing:0.3px; }
.mwc-reward .detail { margin-top:14px; color:${INK_SOFT}; font-size:15.5px; }
@media (max-width:720px){
  .mwc-rewards-grid { grid-template-columns:1fr; }
  .mwc-reward + .mwc-reward::before { left:20%; right:20%; top:0; bottom:auto; width:auto; height:1px;
    background: linear-gradient(90deg, transparent, ${RULE} 30%, ${RULE} 70%, transparent); }
  .mwc-reward { padding: 32px 28px; }
}

/* ---------- Sections ---------- */
.mwc-section { padding: clamp(80px, 11vw, 140px) 0; }
.mwc-section.tint { background:#fafafa; }
.mwc-section-head { max-width: 780px; margin: 0 auto clamp(44px, 6vw, 68px); text-align:center; }
.mwc-section-head .mwc-eyebrow { margin-bottom:18px; }
.mwc-section-head p { margin-top:16px; color:${INK_SOFT}; font-size:17.5px; }

/* ---------- How-it-works cards (double-bezel) ---------- */
.mwc-cards { display:grid; grid-template-columns:repeat(2,1fr); gap:20px; }
@media (max-width:820px){ .mwc-cards { grid-template-columns:1fr; } }
.mwc-card-shell { padding: 6px; border-radius: 22px;
  background: linear-gradient(180deg, #eff1f6 0%, #e4e7ee 100%);
  transition: transform .6s ${EASE}, box-shadow .6s ${EASE}; }
.mwc-card-shell:hover { transform: translateY(-4px);
  box-shadow: 0 40px 60px -30px rgba(11,18,38,0.22); }
.mwc-card { background:${SURFACE}; border-radius: calc(22px - 6px);
  padding:30px 30px 28px; display:flex; flex-direction:column; gap:12px; height:100%;
  box-shadow: 0 1px 0 rgba(255,255,255,0.9) inset, 0 0 0 1px rgba(11,18,38,0.04); }
.mwc-card h3 { font-family:${DISPLAY_FONT}; font-weight:700; color:${NAVY};
  font-size: 21px; letter-spacing:0.3px; text-transform:uppercase; }
.mwc-card p { color:${INK_SOFT}; font-size:15.5px; }
.mwc-card a.inline { color:${ORANGE}; font-weight:700; text-decoration:none;
  align-self:flex-start; display:inline-flex; align-items:center; gap:8px;
  transition: gap .35s ${EASE}; }
.mwc-card a.inline::after { content:"→"; transition: transform .35s ${EASE}; }
.mwc-card a.inline:hover { gap:12px; }
.mwc-card a.inline:hover::after { transform: translateX(3px); }

/* ---------- Eligibility (double-bezel cards) ---------- */
.mwc-elig-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:16px;
  max-width:1080px; margin:0 auto; }
@media (max-width:820px){ .mwc-elig-grid { grid-template-columns:1fr; } }
.mwc-elig-shell { padding: 5px; border-radius: 18px;
  background: linear-gradient(180deg, #eef0f5, #e2e5ec);
  transition: transform .5s ${EASE}, box-shadow .5s ${EASE}; }
.mwc-elig-shell:hover { transform: translateY(-2px);
  box-shadow: 0 26px 50px -30px rgba(11,18,38,0.2); }
.mwc-elig-card { background:#fff; border-radius: calc(18px - 5px);
  padding:26px 28px; display:flex; flex-direction:column; gap:10px; height:100%;
  box-shadow: 0 0 0 1px rgba(11,18,38,0.05); }
.mwc-elig-card .k { font-family:${DISPLAY_FONT}; font-weight:700; color:${NAVY};
  text-transform:uppercase; font-size:13.5px; letter-spacing:1.2px; }
.mwc-elig-card .v { color:${INK_SOFT}; font-size:15.5px; line-height:1.62; }

/* ---------- FAQ (plate) ---------- */
.mwc-faq-shell { max-width:920px; margin:0 auto; padding: 6px; border-radius: 22px;
  background: linear-gradient(180deg, #eef0f5, #e2e5ec); }
.mwc-faq { background:#fff; border-radius: calc(22px - 6px); overflow:hidden;
  box-shadow: 0 0 0 1px rgba(11,18,38,0.05); }
.mwc-faq details { padding:22px 30px; transition: background-color .35s ${EASE}; }
.mwc-faq details + details { border-top:1px solid ${RULE}; }
.mwc-faq details[open] { background: #fafbfd; }
.mwc-faq summary { list-style:none; cursor:pointer; display:flex;
  justify-content:space-between; align-items:center; gap:18px;
  font-family:${DISPLAY_FONT}; font-weight:600; font-size:18px;
  color:${NAVY}; letter-spacing:0.3px; }
.mwc-faq summary::-webkit-details-marker { display:none; }
.mwc-faq summary .qi { width:32px; height:32px; border-radius:999px; flex:none;
  display:inline-flex; align-items:center; justify-content:center;
  background: color-mix(in oklab, ${ORANGE} 12%, transparent);
  color:${ORANGE}; font-family:${BODY_FONT}; font-size:20px; line-height:1; font-weight:400;
  transition: transform .5s ${EASE}, background-color .35s ${EASE}; }
.mwc-faq details[open] summary .qi { transform: rotate(45deg);
  background: color-mix(in oklab, ${ORANGE} 20%, transparent); }
.mwc-faq p { margin:14px 0 4px; color:${INK_SOFT}; font-size:15.5px; }

/* ---------- Bottom CTA ---------- */
.mwc-cta { background:${NAVY_DEEP}; padding: clamp(88px, 12vw, 140px) 0; position:relative;
  overflow:hidden; }
.mwc-cta::before { content:""; position:absolute; inset:0;
  background:
    radial-gradient(900px 400px at 50% -20%, rgba(239,108,26,0.18), transparent 60%),
    radial-gradient(700px 400px at 50% 120%, rgba(60,120,220,0.10), transparent 60%);
  pointer-events:none; }
.mwc-cta-inner { position:relative; text-align:center; max-width:820px;
  margin:0 auto; padding:0 24px; }
.mwc-cta h2 { font-size: clamp(34px, 5.4vw, 60px); letter-spacing:-0.2px; }
.mwc-cta h2 .amp { color:${ORANGE}; }
.mwc-cta p { margin: 20px auto 0; color:rgba(255,255,255,0.86); max-width:56ch; font-size:17px; }
.mwc-cta .row { margin-top:36px; display:flex; gap:14px; justify-content:center; flex-wrap:wrap; }
.mwc-cta .tools { margin-top:26px; }
.mwc-cta .tools a { color:rgba(255,255,255,0.72); font-size:13px;
  text-decoration:none; letter-spacing:0.6px; border-bottom:1px solid rgba(255,255,255,0.25);
  padding-bottom:2px; transition: color .35s ${EASE}, border-color .35s ${EASE}; }
.mwc-cta .tools a:hover { color:#fff; border-color:#fff; }

/* ---------- Reveal (scroll entry) ---------- */
.reveal { opacity:0; transform: translateY(28px);
  filter: blur(6px);
  transition: opacity .9s ${EASE}, transform .9s ${EASE}, filter .9s ${EASE}; }
.reveal.is-in { opacity:1; transform: translateY(0); filter: blur(0); }
.reveal-stagger > * { opacity:0; transform: translateY(22px); filter: blur(6px);
  transition: opacity .8s ${EASE}, transform .8s ${EASE}, filter .8s ${EASE}; }
.reveal-stagger.is-in > *:nth-child(1) { transition-delay: 60ms; }
.reveal-stagger.is-in > *:nth-child(2) { transition-delay: 140ms; }
.reveal-stagger.is-in > *:nth-child(3) { transition-delay: 220ms; }
.reveal-stagger.is-in > *:nth-child(4) { transition-delay: 300ms; }
.reveal-stagger.is-in > *:nth-child(5) { transition-delay: 380ms; }
.reveal-stagger.is-in > *:nth-child(6) { transition-delay: 460ms; }
.reveal-stagger.is-in > *:nth-child(7) { transition-delay: 540ms; }
.reveal-stagger.is-in > * { opacity:1; transform: translateY(0); filter: blur(0); }

@media (prefers-reduced-motion: reduce) {
  .reveal, .reveal-stagger > *,
  .mwc-pill, .mwc-card-shell, .mwc-elig-shell,
  .mwc-faq summary .qi, .mwc-card a.inline, .mwc-card a.inline::after {
    transition: none !important; transform: none !important; filter: none !important; opacity: 1 !important;
  }
}

.mwc-refer .u-muted { color:${MUTED}; }
`;

/* IntersectionObserver hook — one shared observer, applies .is-in once */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal, .reveal-stagger");
    if (!("IntersectionObserver" in window) || els.length === 0) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function ReferPage() {
  useReveal();
  return (
    <div className="mwc-refer">
      <style>{scopedCSS}</style>
      <Hero />
      <RewardsStrip />
      <HowItWorks />
      <Eligibility />
      <Faq />
      <FinalCta />
    </div>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section className="mwc-hero">
      <div className="bg" aria-hidden />
      <div className="scrim" aria-hidden />
      <div className="grain" aria-hidden />
      <div className="mwc-hero-inner">
        <nav className="mwc-crumb reveal" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span className="sep">›</span>
          <span style={{ color: "#fff" }}>Refer</span>
        </nav>
        <div className="eyebrow-row reveal">
          <span className="mwc-eyebrow on-dark">Ambassador Program</span>
        </div>
        <h1 className="mwc-display reveal">
          Refer a Friend<span className="amp">.</span>
        </h1>
        <p className="sub reveal">
          He gets 10% off his program. You get 3 months of free service for every friend who joins.
          No cap on how many friends you can refer.
        </p>
        <div className="cta-row reveal">
          <a href={REFER_URL} className="mwc-pill mwc-pill-primary">
            Send a Referral <span className="pip" aria-hidden>↗</span>
          </a>
          <a href="#how-it-works" className="mwc-pill mwc-pill-ghost">
            How It Works <span className="pip" aria-hidden>↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- Rewards strip ---------- */
function RewardsStrip() {
  return (
    <div className="mwc-rewards-wrap">
      <div className="mwc-rewards">
        <div className="mwc-rewards-plate reveal">
          <div className="mwc-rewards-grid">
            <div className="mwc-reward">
              <div className="who">For Your Friend</div>
              <div className="what">10% Off His Program</div>
              <div className="detail">
                Applied when he enrolls in a program after his first visit. No promo code to
                remember. He just gives your full name when he books.
              </div>
            </div>
            <div className="mwc-reward">
              <div className="who">For You</div>
              <div className="what">3 Months of Free Service</div>
              <div className="detail">
                Credited to your account every time a friend you referred completes his first visit
                and enrolls in a program. Stack it for every friend who joins.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- How It Works ---------- */
function HowItWorks() {
  const steps = [
    {
      title: "Give Your Friend Your Full Name",
      body:
        "Tell him your full name and to mention it when he books. No portal, no link to copy, no code to remember. Enrollment is optional and only recommended if you plan to refer more than once.",
      cta: { label: "Enroll as an ambassador", href: ENROLL_URL },
    },
    {
      title: "He Books His First Visit",
      body:
        "He books his no-cost first visit at the location closest to him in Richmond, Newport News, or Virginia Beach, and gives your full name at booking.",
    },
    {
      title: "He Meets a Licensed Provider",
      body:
        "Sit-down visit with a licensed Virginia provider. Labs drawn on-site and reviewed the same visit. When he enrolls in a program, he gets 10% off.",
    },
    {
      title: "You Get 3 Months Free",
      body:
        "Once he enrolls, 3 months of free service is added to your account. Refer as many friends as you like. Every enrollment stacks.",
    },
  ];
  return (
    <section id="how-it-works" className="mwc-section">
      <div className="mwc-wrap">
        <div className="mwc-section-head reveal">
          <span className="mwc-eyebrow">The Process</span>
          <h2 className="mwc-h2">How It Works</h2>
          <p>Four steps. No paperwork on your end, no cost to him for the first visit.</p>
        </div>
        <div className="mwc-cards reveal-stagger">
          {steps.map((s) => (
            <div className="mwc-card-shell" key={s.title}>
              <article className="mwc-card">
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                {s.cta && <a className="inline" href={s.cta.href}>{s.cta.label}</a>}
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Eligibility ---------- */
function Eligibility() {
  const rows: [string, string][] = [
    ["Who Can Refer", "Any current or past patient, 18 or older."],
    [
      "Who Can Be Referred",
      "Adult men, 21 or older, who have not been a patient in the last 12 months.",
    ],
    [
      "Friend's Discount",
      "10% off his program, applied at enrollment. One time, per new patient.",
    ],
    [
      "Your Credit",
      "3 months of free service, added to your account after his first visit and enrollment. Stackable across multiple referrals.",
    ],
    ["Outreach", "We contact the referred person once. Additional contact only with his consent."],
    [
      "Privacy",
      "HIPAA compliant. Referring does not share any medical information about either party.",
    ],
  ];
  return (
    <section className="mwc-section tint">
      <div className="mwc-wrap">
        <div className="mwc-section-head reveal">
          <h2 className="mwc-h2">Eligibility &amp; Rules</h2>
        </div>
        <div className="mwc-elig-grid reveal-stagger">
          {rows.map(([k, v]) => (
            <div className="mwc-elig-shell" key={k}>
              <div className="mwc-elig-card">
                <div className="k">{k}</div>
                <div className="v">{v}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
function Faq() {
  const items: [string, string][] = [
    [
      "How does my friend get his 10% off?",
      "He just gives your full name when he books his no-cost first visit. The 10% is applied automatically when he enrolls in a program.",
    ],
    [
      "When do my 3 free months hit my account?",
      "After your friend completes his first visit and enrolls in a program. Credits are added directly to your account.",
    ],
    [
      "Can I stack credits from multiple friends?",
      "Yes. Every friend who enrolls adds another 3 months of free service to your account. There is no cap.",
    ],
    [
      "Do I have to enroll as an ambassador to refer someone?",
      "No. You can refer without enrolling. Enrollment is only recommended if you plan to refer regularly and want a dashboard to track your referrals.",
    ],
    [
      "Does my friend pay anything for the first visit?",
      "No. The first visit is no-cost and includes labs, reviewed the same visit.",
    ],
    [
      "Will you keep contacting my friend?",
      "No. We reach out once. Any additional communication only happens with his consent.",
    ],
    [
      "Is any of my friend's health information shared with me?",
      "Never. The program is fully HIPAA compliant. You only see that a referral was completed, not any medical detail.",
    ],
  ];
  return (
    <section className="mwc-section">
      <div className="mwc-wrap">
        <div className="mwc-section-head reveal">
          <span className="mwc-eyebrow">Common Questions</span>
          <h2 className="mwc-h2">Questions</h2>
        </div>
        <div className="mwc-faq-shell reveal">
          <div className="mwc-faq">
            {items.map(([q, a]) => (
              <details key={q}>
                <summary>
                  <span>{q}</span>
                  <span className="qi" aria-hidden>+</span>
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Final CTA ---------- */
function FinalCta() {
  return (
    <section className="mwc-cta">
      <div className="mwc-cta-inner">
        <h2 className="mwc-display reveal" style={{ fontSize: "clamp(34px,5.4vw,60px)" }}>
          He Gets 10% Off<span className="amp">.</span> You Get 3 Months Free<span className="amp">.</span>
        </h2>
        <p className="reveal">
          Send a referral now, or enroll as an ambassador if you plan to refer more than once.
          Enrollment is optional.
        </p>
        <div className="row reveal">
          <a href={REFER_URL} className="mwc-pill mwc-pill-primary">
            Send a Referral <span className="pip" aria-hidden>↗</span>
          </a>
          <a href={ENROLL_URL} className="mwc-pill mwc-pill-ghost">
            Enroll as an Ambassador <span className="pip" aria-hidden>↗</span>
          </a>
        </div>
        <div className="tools reveal">
          <Link to="/ambassador">View printable referral tools</Link>
        </div>
      </div>
    </section>
  );
}

// keep MUTED referenced
void MUTED;
