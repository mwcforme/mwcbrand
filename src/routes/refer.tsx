import { createFileRoute, Link } from "@tanstack/react-router";

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

/* MWC brand tokens (matched to menswellnesscenters.com) */
const NAVY = "#0b1226";
const NAVY_DEEP = "#070c1c";
const INK = "#0b1226";
const INK_SOFT = "#3a3f52";
const MUTED = "#6a6f80";
const RULE = "#e6e8ee";
const SURFACE = "#f1f2f5";
const ORANGE = "#ef6c1a";
const ORANGE_HOVER = "#d95e10";

const BODY_FONT = "'Open Sans', system-ui, sans-serif";
const DISPLAY_FONT = "'Oswald', 'Open Sans', sans-serif";

const scopedCSS = `
.mwc-refer { background:#fff; color:${INK}; font-family:${BODY_FONT}; font-size:16px; line-height:1.65; }
.mwc-refer h1,.mwc-refer h2,.mwc-refer h3 { text-wrap:balance; margin:0; }
.mwc-refer p { text-wrap:pretty; }

.mwc-wrap { max-width:1200px; margin:0 auto; padding:0 24px; }

.mwc-display { font-family:${DISPLAY_FONT}; font-weight:700; text-transform:uppercase;
  letter-spacing:0.5px; line-height:1.02; color:#fff; }
.mwc-h2 { font-family:${DISPLAY_FONT}; font-weight:700; text-transform:uppercase;
  letter-spacing:0.5px; line-height:1.05; color:${NAVY};
  font-size: clamp(30px, 4.2vw, 44px); }
.mwc-eyebrow { display:inline-block; font-size:12px; font-weight:700; letter-spacing:2.6px;
  text-transform:uppercase; color:${ORANGE}; }

.mwc-pill { display:inline-flex; align-items:center; justify-content:center;
  padding:16px 34px; border-radius:999px; font-family:${DISPLAY_FONT};
  font-weight:600; letter-spacing:1.4px; font-size:14px; text-transform:uppercase;
  text-decoration:none; transition: background .15s ease, transform .12s ease, border-color .15s ease; }
.mwc-pill:hover { transform: translateY(-1px); }
.mwc-pill:active { transform: translateY(0); }
.mwc-pill-primary { background:${ORANGE}; color:#fff; }
.mwc-pill-primary:hover { background:${ORANGE_HOVER}; }
.mwc-pill-ghost { background:transparent; color:#fff; border:1.5px solid rgba(255,255,255,0.65); }
.mwc-pill-ghost:hover { border-color:#fff; background:rgba(255,255,255,0.08); }

/* Hero */
.mwc-hero { position:relative; background:${NAVY_DEEP};
  padding: clamp(64px, 9vw, 96px) 0 clamp(72px, 11vw, 128px);
  overflow:hidden; isolation:isolate; }
.mwc-hero .bg { position:absolute; inset:0; z-index:0;
  background-image:url("${HERO_IMAGE}");
  background-size:cover; background-position:center;
  opacity:0.28; filter:grayscale(0.6) contrast(1.05); }
.mwc-hero .scrim { position:absolute; inset:0; z-index:1;
  background:
    linear-gradient(180deg, rgba(7,12,28,0.72) 0%, rgba(7,12,28,0.86) 60%, rgba(7,12,28,0.94) 100%),
    radial-gradient(1200px 500px at 80% -10%, rgba(239,108,26,0.18), transparent 60%);
  pointer-events:none; }
.mwc-hero-inner { position:relative; z-index:2; text-align:center; max-width:900px; margin:0 auto; padding:0 24px; }
.mwc-hero h1 { font-size: clamp(44px, 8vw, 88px); }
.mwc-hero .sub { margin: 22px auto 0; max-width: 640px;
  color: rgba(255,255,255,0.88); font-size: clamp(16px, 1.6vw, 19px); }
.mwc-hero .cta-row { margin-top: 34px; display:flex; gap:14px; justify-content:center; flex-wrap:wrap; }

.mwc-crumb { color:rgba(255,255,255,0.72); font-size:13px; letter-spacing:0.5px;
  margin-bottom:18px; text-align:center; }
.mwc-crumb a { color:rgba(255,255,255,0.72); text-decoration:none; }
.mwc-crumb a:hover { color:#fff; text-decoration:underline; }
.mwc-crumb .sep { margin:0 10px; opacity:0.5; }

/* Rewards strip */
.mwc-rewards { background:#fff; border-bottom:1px solid ${RULE}; }
.mwc-rewards-grid { display:grid; grid-template-columns: 1fr 1fr;
  max-width:1200px; margin:0 auto; }
.mwc-reward { padding: 44px 40px; }
.mwc-reward + .mwc-reward { border-left:1px solid ${RULE}; }
.mwc-reward .who { font-size:12px; font-weight:700; letter-spacing:2.4px;
  text-transform:uppercase; color:${ORANGE}; }
.mwc-reward .what { font-family:${DISPLAY_FONT}; font-weight:700; color:${NAVY};
  font-size: clamp(28px, 3.4vw, 40px); line-height:1.05; margin-top:10px;
  text-transform:uppercase; letter-spacing:0.3px; }
.mwc-reward .detail { margin-top:10px; color:${INK_SOFT}; font-size:15.5px; }
@media (max-width:720px){
  .mwc-rewards-grid { grid-template-columns:1fr; }
  .mwc-reward + .mwc-reward { border-left:none; border-top:1px solid ${RULE}; }
  .mwc-reward { padding: 32px 24px; }
}

/* Sections */
.mwc-section { padding: clamp(64px, 9vw, 110px) 0; }
.mwc-section.tint { background:#fafafa; }
.mwc-section-head { max-width: 780px; margin: 0 auto clamp(36px, 5vw, 56px); text-align:center; }
.mwc-section-head p { margin-top:14px; color:${INK_SOFT}; font-size:17px; }

/* How-it-works cards */
.mwc-cards { display:grid; grid-template-columns:repeat(2,1fr); gap:24px; }
@media (max-width:820px){ .mwc-cards { grid-template-columns:1fr; } }
.mwc-card { background:${SURFACE}; border-radius:16px; padding:32px 32px 30px;
  display:flex; flex-direction:column; gap:12px; }
.mwc-card h3 { font-family:${DISPLAY_FONT}; font-weight:700; color:${NAVY};
  font-size: 22px; letter-spacing:0.3px; text-transform:uppercase; }
.mwc-card p { color:${INK_SOFT}; font-size:15.5px; }
.mwc-card a.inline { color:${ORANGE}; font-weight:700; text-decoration:underline;
  align-self:flex-start; }

/* Eligibility card grid (replaces spec table) */
.mwc-elig-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:20px;
  max-width:1080px; margin:0 auto; }
@media (max-width:820px){ .mwc-elig-grid { grid-template-columns:1fr; } }
.mwc-elig-card { background:#fff; border:1px solid ${RULE}; border-radius:14px;
  padding:26px 28px; display:flex; flex-direction:column; gap:10px; }
.mwc-elig-card .k { font-family:${DISPLAY_FONT}; font-weight:700; color:${NAVY};
  text-transform:uppercase; font-size:14px; letter-spacing:1px; }
.mwc-elig-card .v { color:${INK_SOFT}; font-size:15.5px; line-height:1.6; }

/* FAQ */
.mwc-faq { max-width:900px; margin:0 auto; background:#fff;
  border:1px solid ${RULE}; border-radius:16px; overflow:hidden; }
.mwc-faq details { padding:20px 28px; }
.mwc-faq details + details { border-top:1px solid ${RULE}; }
.mwc-faq summary { list-style:none; cursor:pointer; display:flex;
  justify-content:space-between; align-items:center; gap:18px;
  font-family:${DISPLAY_FONT}; font-weight:600; font-size:18px;
  color:${NAVY}; letter-spacing:0.3px; }
.mwc-faq summary::-webkit-details-marker { display:none; }
.mwc-faq summary::after { content:"+"; color:${ORANGE}; font-size:26px;
  font-family:${BODY_FONT}; line-height:1; font-weight:400; }
.mwc-faq details[open] summary::after { content:"\\2212"; }
.mwc-faq p { margin:12px 0 4px; color:${INK_SOFT}; font-size:15.5px; }

/* Bottom CTA band */
.mwc-cta { background:${NAVY_DEEP}; padding: clamp(72px, 10vw, 120px) 0; position:relative;
  overflow:hidden; }
.mwc-cta::before { content:""; position:absolute; inset:0;
  background: radial-gradient(900px 400px at 50% -20%, rgba(239,108,26,0.14), transparent 60%);
  pointer-events:none; }
.mwc-cta-inner { position:relative; text-align:center; max-width:820px;
  margin:0 auto; padding:0 24px; }
.mwc-cta h2 { font-size: clamp(30px, 5vw, 52px); }
.mwc-cta p { margin: 18px auto 0; color:rgba(255,255,255,0.88); max-width:56ch; font-size:17px; }
.mwc-cta .row { margin-top:32px; display:flex; gap:14px; justify-content:center; flex-wrap:wrap; }
.mwc-cta .tools { margin-top:22px; }
.mwc-cta .tools a { color:rgba(255,255,255,0.78); font-size:13px;
  text-decoration:underline; letter-spacing:0.4px; }
.mwc-cta .tools a:hover { color:#fff; }

/* Suppress unused token warnings for MUTED so lint stays quiet */
.mwc-refer .u-muted { color:${MUTED}; }
`;

function ReferPage() {
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
      <div className="mwc-hero-inner">
        <nav className="mwc-crumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span className="sep">›</span>
          <span style={{ color: "#fff" }}>Refer a Friend</span>
        </nav>
        <h1 className="mwc-display">Refer a Friend</h1>
        <p className="sub">
          He gets 10% off his program. You get 3 months of free service for every friend who joins.
          No cap on how many friends you can refer.
        </p>
        <div className="cta-row">
          <a href={REFER_URL} className="mwc-pill mwc-pill-primary">Send a Referral</a>
          <a href="#how-it-works" className="mwc-pill mwc-pill-ghost">How It Works</a>
        </div>
      </div>
    </section>
  );
}

/* ---------- Rewards strip ---------- */
function RewardsStrip() {
  return (
    <div className="mwc-rewards">
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
        "He books his no-cost first visit at the MWC location closest to him in Richmond, Newport News, or Virginia Beach, and gives your full name at booking.",
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
        <div className="mwc-section-head">
          <span className="mwc-eyebrow">The Process</span>
          <h2 className="mwc-h2" style={{ marginTop: 12 }}>How It Works</h2>
          <p>Four steps. No paperwork on your end, no cost to him for the first visit.</p>
        </div>
        <div className="mwc-cards">
          {steps.map((s) => (
            <article className="mwc-card" key={s.title}>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              {s.cta && <a className="inline" href={s.cta.href}>{s.cta.label} →</a>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Eligibility ---------- */
function Eligibility() {
  const rows: [string, string][] = [
    ["Who Can Refer", "Any current or past MWC patient, 18 or older."],
    [
      "Who Can Be Referred",
      "Adult men, 21 or older, who have not been an MWC patient in the last 12 months.",
    ],
    [
      "Friend's Discount",
      "10% off his program, applied at enrollment. One time, per new patient.",
    ],
    [
      "Your Credit",
      "3 months of free service, added to your account after his first visit and enrollment. Stackable across multiple referrals.",
    ],
    ["Outreach", "MWC contacts the referred person once. Additional contact only with his consent."],
    [
      "Privacy",
      "HIPAA compliant. Referring does not share any medical information about either party.",
    ],
  ];
  return (
    <section className="mwc-section tint">
      <div className="mwc-wrap">
        <div className="mwc-section-head">
          <h2 className="mwc-h2">Eligibility &amp; Rules</h2>
        </div>
        <div className="mwc-elig-grid">
          {rows.map(([k, v]) => (
            <div className="mwc-elig-card" key={k}>
              <div className="k">{k}</div>
              <div className="v">{v}</div>
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
      "No. MWC reaches out once. Any additional communication only happens with his consent.",
    ],
    [
      "Is any of my friend's health information shared with me?",
      "Never. The program is fully HIPAA compliant. You only see that a referral was completed, not any medical detail.",
    ],
  ];
  return (
    <section className="mwc-section">
      <div className="mwc-wrap">
        <div className="mwc-section-head">
          <span className="mwc-eyebrow">Common Questions</span>
          <h2 className="mwc-h2" style={{ marginTop: 12 }}>Questions</h2>
        </div>
        <div className="mwc-faq">
          {items.map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
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
        <h2 className="mwc-display" style={{ fontSize: "clamp(32px,5vw,56px)" }}>
          He Gets 10% Off. You Get 3 Months Free.
        </h2>
        <p>
          Send a referral now, or enroll as an ambassador if you plan to refer more than once.
          Enrollment is optional.
        </p>
        <div className="row">
          <a href={REFER_URL} className="mwc-pill mwc-pill-primary">Send a Referral</a>
          <a href={ENROLL_URL} className="mwc-pill mwc-pill-ghost">Enroll as an Ambassador</a>
        </div>
        <div className="tools">
          <Link to="/ambassador">View printable referral tools →</Link>
        </div>
      </div>
    </section>
  );
}
