import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

const REFER_URL = "https://go.menswellnesscenters.com/ambassador/referral";
const ENROLL_URL = "https://go.menswellnesscenters.com/ambassador/enroll";

export const Route = createFileRoute("/refer")({
  head: () => ({
    meta: [
      { title: "Refer a Friend · Men's Wellness Centers | Virginia" },
      {
        name: "description",
        content:
          "Refer a friend to Men's Wellness Centers. He gets 10% off his program. You get 3 months of free service for every friend who joins. Enrollment optional.",
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
.mwc-pill-primary { background:${ORANGE}; color:#fff; }
.mwc-pill-primary:hover { background:${ORANGE_HOVER}; }
.mwc-pill-ghost { background:transparent; color:#fff; border:1.5px solid rgba(255,255,255,0.55); }
.mwc-pill-ghost:hover { border-color:#fff; background:rgba(255,255,255,0.06); }

/* Hero */
.mwc-hero { position:relative; background:${NAVY_DEEP};
  padding: clamp(72px, 12vw, 140px) 0 clamp(80px, 13vw, 160px);
  overflow:hidden; }
.mwc-hero::before { content:""; position:absolute; inset:0;
  background:
    radial-gradient(1200px 500px at 80% -10%, rgba(239,108,26,0.10), transparent 60%),
    radial-gradient(900px 400px at 10% 110%, rgba(255,255,255,0.05), transparent 60%);
  pointer-events:none; }
.mwc-hero-inner { position:relative; text-align:center; max-width:900px; margin:0 auto; padding:0 24px; }
.mwc-hero h1 { font-size: clamp(44px, 8vw, 88px); }
.mwc-hero .sub { margin: 22px auto 0; max-width: 640px;
  color: rgba(255,255,255,0.85); font-size: clamp(16px, 1.6vw, 19px); }
.mwc-hero .cta-row { margin-top: 34px; display:flex; gap:14px; justify-content:center; flex-wrap:wrap; }

.mwc-crumb { color:rgba(255,255,255,0.7); font-size:13px; letter-spacing:0.5px;
  margin-bottom:18px; text-align:center; }
.mwc-crumb a { color:rgba(255,255,255,0.7); text-decoration:none; }
.mwc-crumb a:hover { color:#fff; text-decoration:underline; }
.mwc-crumb .sep { margin:0 10px; opacity:0.5; }

/* Rewards headline strip (replaces the old stats trust bar) */
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

/* Card grid */
.mwc-cards { display:grid; grid-template-columns:repeat(2,1fr); gap:24px; }
@media (max-width:820px){ .mwc-cards { grid-template-columns:1fr; } }
.mwc-card { background:${SURFACE}; border-radius:16px; padding:36px 36px 34px;
  display:flex; flex-direction:column; gap:14px; }
.mwc-card-top { display:flex; align-items:flex-start; justify-content:space-between; gap:16px; }
.mwc-card-n { font-family:${DISPLAY_FONT}; font-weight:700; color:${NAVY};
  font-size: 42px; line-height:1; }
.mwc-card h3 { font-family:${DISPLAY_FONT}; font-weight:700; color:${NAVY};
  font-size: 24px; letter-spacing:0.3px; margin-top:6px; }
.mwc-card .meta { font-size:13px; color:${MUTED}; font-weight:600; letter-spacing:0.6px; }
.mwc-card p { color:${INK_SOFT}; font-size:15.5px; }
.mwc-card a.inline { color:${ORANGE}; font-weight:700; text-decoration:underline; }

/* Two-column benefits */
.mwc-two { display:grid; grid-template-columns:1fr 1fr; gap:24px; }
@media (max-width:820px){ .mwc-two { grid-template-columns:1fr; } }
.mwc-benefit { background:${SURFACE}; border-radius:16px; padding:36px; }
.mwc-benefit .badge { display:inline-block; font-family:${DISPLAY_FONT};
  background:${ORANGE}; color:#fff; padding:6px 12px; border-radius:999px;
  font-size:12px; letter-spacing:1.4px; text-transform:uppercase; font-weight:600; }
.mwc-benefit h3 { font-family:${DISPLAY_FONT}; font-weight:700; color:${NAVY};
  text-transform:uppercase; font-size:22px; letter-spacing:0.5px; margin-top:14px; }
.mwc-benefit .headline { font-family:${DISPLAY_FONT}; color:${NAVY};
  font-size:32px; font-weight:700; line-height:1.05; margin-top:6px; }
.mwc-benefit ul { list-style:none; padding:0; margin:18px 0 0; }
.mwc-benefit li { display:flex; gap:12px; padding:12px 0; color:${INK_SOFT}; font-size:15.5px; line-height:1.55; }
.mwc-benefit li + li { border-top:1px solid rgba(11,18,38,0.08); }
.mwc-benefit .ck { color:${ORANGE}; font-weight:800; flex-shrink:0; }

/* Eligibility list */
.mwc-elig { max-width:960px; margin:0 auto; background:#fff;
  border:1px solid ${RULE}; border-radius:16px; overflow:hidden; }
.mwc-elig-row { display:grid; grid-template-columns:260px 1fr; gap:24px; padding:22px 28px; }
.mwc-elig-row + .mwc-elig-row { border-top:1px solid ${RULE}; }
.mwc-elig-row .k { font-family:${DISPLAY_FONT}; font-weight:700; color:${NAVY};
  text-transform:uppercase; font-size:14px; letter-spacing:1px; }
.mwc-elig-row .v { color:${INK_SOFT}; font-size:15.5px; }
@media (max-width:620px){ .mwc-elig-row { grid-template-columns:1fr; gap:6px; padding:20px 22px; } }

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
  background: radial-gradient(900px 400px at 50% -20%, rgba(239,108,26,0.12), transparent 60%);
  pointer-events:none; }
.mwc-cta-inner { position:relative; text-align:center; max-width:820px;
  margin:0 auto; padding:0 24px; }
.mwc-cta h2 { font-size: clamp(30px, 5vw, 52px); }
.mwc-cta p { margin: 18px auto 0; color:rgba(255,255,255,0.85); max-width:56ch; font-size:17px; }
.mwc-cta .row { margin-top:32px; display:flex; gap:14px; justify-content:center; flex-wrap:wrap; }
.mwc-cta .tools { margin-top:22px; }
.mwc-cta .tools a { color:rgba(255,255,255,0.75); font-size:13px;
  text-decoration:underline; letter-spacing:0.4px; }
.mwc-cta .tools a:hover { color:#fff; }
`;

function ReferPage() {
  return (
    <div className="mwc-refer">
      <style>{scopedCSS}</style>
      <SiteHeader />
      <Hero />
      <RewardsStrip />
      <HowItWorks />
      <Benefits />
      <Eligibility />
      <Faq />
      <FinalCta />
      <SiteFooter />
    </div>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section className="mwc-hero">
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

/* ---------- Rewards strip (replaces the stat trust bar) ---------- */
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
      n: "01",
      meta: "No Link Needed",
      title: "Give Your Friend Your Full Name",
      body:
        "Tell him your full name and to mention it when he books. No portal, no link to copy, no code to remember. Enrollment is optional and only recommended if you plan to refer more than once.",
      cta: { label: "Enroll as an ambassador", href: ENROLL_URL },
    },
    {
      n: "02",
      meta: "Text, Email, or In Person",
      title: "Tell Someone Who Needs It",
      body:
        "When he books his no-cost first visit at the MWC location closest to him in Richmond, Newport News, or Virginia Beach, he gives your full name at booking.",
    },
    {
      n: "03",
      meta: "60 Minutes On-Site",
      title: "He Meets a Licensed Provider",
      body:
        "Sit-down visit with a licensed Virginia provider. Labs drawn on-site and reviewed the same visit. When he enrolls in a program, he gets 10% off.",
    },
    {
      n: "04",
      meta: "3 Months Credited to Your Account",
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
            <article className="mwc-card" key={s.n}>
              <div className="mwc-card-top">
                <div>
                  <h3>{s.title}</h3>
                  <div className="meta" style={{ marginTop: 6 }}>{s.meta}</div>
                </div>
                <div className="mwc-card-n">{s.n}</div>
              </div>
              <p>{s.body}</p>
              {s.cta && <a className="inline" href={s.cta.href}>{s.cta.label} →</a>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Benefits ---------- */
function Benefits() {
  const him = [
    "No-cost first visit with a licensed Virginia provider",
    "Labs drawn on-site and reviewed the same visit",
    "10% off his program when he enrolls",
    "Same-day appointments at all three Virginia locations",
  ];
  const you = [
    "3 months of free service for every friend who enrolls",
    "No cap. Stack credits across multiple referrals",
    "Optional ambassador dashboard to track your referrals",
    "Personal thank-you after each completed enrollment",
  ];
  return (
    <section className="mwc-section tint">
      <div className="mwc-wrap">
        <div className="mwc-section-head">
          <span className="mwc-eyebrow">What Each Side Gets</span>
          <h2 className="mwc-h2" style={{ marginTop: 12 }}>Simple, on Both Ends</h2>
        </div>
        <div className="mwc-two">
          <BenefitCard badge="For Him" headline="10% Off" items={him} />
          <BenefitCard badge="For You" headline="3 Months Free" items={you} />
        </div>
      </div>
    </section>
  );
}

function BenefitCard({
  badge,
  headline,
  items,
}: {
  badge: string;
  headline: string;
  items: string[];
}) {
  return (
    <div className="mwc-benefit">
      <span className="badge">{badge}</span>
      <div className="headline">{headline}</div>
      <ul>
        {items.map((it) => (
          <li key={it}>
            <span className="ck" aria-hidden>✓</span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Eligibility ---------- */
function Eligibility() {
  const rows: [string, string][] = [
    ["Who Can Refer", "Any current or past MWC patient, 18 or older."],
    ["Who Can Be Referred", "Adult men, 21 or older, who have not been an MWC patient in the last 12 months."],
    ["Friend's Discount", "10% off his program, applied at enrollment. One time, per new patient."],
    ["Your Credit", "3 months of free service, added to your account after his first visit and enrollment. Stackable across multiple referrals."],
    ["Outreach", "MWC contacts the referred person once. Additional contact only with his consent."],
    ["Privacy", "HIPAA compliant. Referring does not share any medical information about either party."],
  ];
  return (
    <section className="mwc-section">
      <div className="mwc-wrap">
        <div className="mwc-section-head">
          <span className="mwc-eyebrow">The Fine Print</span>
          <h2 className="mwc-h2" style={{ marginTop: 12 }}>Eligibility &amp; Rules</h2>
        </div>
        <div className="mwc-elig">
          {rows.map(([k, v]) => (
            <div className="mwc-elig-row" key={k}>
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
    <section className="mwc-section tint">
      <div className="mwc-wrap">
        <div className="mwc-section-head">
          <span className="mwc-eyebrow">Common Questions</span>
          <h2 className="mwc-h2" style={{ marginTop: 12 }}>Frequently Asked</h2>
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
        <span className="mwc-eyebrow">Ready When You Are</span>
        <h2 className="mwc-display" style={{ marginTop: 12, fontSize: "clamp(32px,5vw,56px)" }}>
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
