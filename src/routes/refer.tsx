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
          "How the Men's Wellness Centers referral program works: share a link, your friend books a no-cost first visit with labs, you get a personal thank-you. Enrollment optional.",
      },
      { property: "og:title", content: "Refer a Friend · Men's Wellness Centers" },
      {
        property: "og:description",
        content:
          "Refer a friend to MWC. He books a no-cost first visit with on-site labs. You get a personal thank-you. Enrollment optional.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://mwcbrand.lovable.app/refer" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://mwcbrand.lovable.app/refer" }],
  }),
  component: ReferPage,
});

/* Design tokens (align with site) */
const NAVY = "#0b1029";
const INK = "#111528";
const INK_SOFT = "#2a2f45";
const MUTED = "#5a6072";
const RULE = "#e5e7ef";
const RULE_SOFT = "#eef0f5";
const CREAM = "#faf8f4";
const ORANGE = "#e8670a";
const ORANGE_CTA = "#b84a08";

const BODY_FONT = "'Open Sans', system-ui, sans-serif";
const DISPLAY_FONT = "'Oswald', 'Open Sans', sans-serif";

/* Scoped responsive styles — inline styles can't do media queries */
const scopedCSS = `
.refer-root { background:#fff; color:${INK}; font-family:${BODY_FONT}; font-size:16px; line-height:1.65; }
.refer-root h1, .refer-root h2, .refer-root h3 { text-wrap: balance; }
.refer-root p { text-wrap: pretty; }

.refer-wrap { max-width: 1100px; margin: 0 auto; padding: 0 24px; }
.refer-wrap-narrow { max-width: 900px; margin: 0 auto; padding: 0 24px; }

.refer-eyebrow { display:inline-block; font-size:11px; font-weight:700; letter-spacing:2.5px;
  color:${ORANGE_CTA}; text-transform:uppercase; }
.refer-h1 { font-family:${DISPLAY_FONT}; font-weight:700; font-size: clamp(34px, 6vw, 52px);
  line-height:1.05; letter-spacing:0.3px; margin:10px 0 0; color:${NAVY}; text-transform:uppercase; }
.refer-h2 { font-family:${DISPLAY_FONT}; font-weight:700; font-size: clamp(24px, 3.4vw, 32px);
  color:${NAVY}; text-transform:uppercase; letter-spacing:0.5px; margin:0; }
.refer-lead { margin-top:14px; color:${INK_SOFT}; font-size: clamp(16px, 1.6vw, 18px); max-width: 62ch; }

/* Header */
.refer-header { background:${CREAM}; border-bottom:1px solid ${RULE}; padding: 44px 0 48px; }
.refer-breadcrumb { font-size:13px; color:${MUTED}; margin-bottom:14px; }
.refer-breadcrumb a { color:${MUTED}; text-decoration:none; }
.refer-breadcrumb a:hover { color:${INK}; text-decoration:underline; }

/* Stat strip */
.refer-strip { display:grid; grid-template-columns: repeat(4, 1fr); gap:0;
  border-top:1px solid ${RULE}; border-bottom:1px solid ${RULE}; background:#fff; }
.refer-strip > div { padding: 22px 20px; border-left:1px solid ${RULE_SOFT}; }
.refer-strip > div:first-child { border-left:none; }
.refer-strip .k { font-family:${DISPLAY_FONT}; font-size: 26px; color:${NAVY}; line-height:1; }
.refer-strip .v { font-size: 12px; color:${MUTED}; text-transform:uppercase; letter-spacing:1.2px;
  margin-top: 8px; font-weight:600; }
@media (max-width: 720px) { .refer-strip { grid-template-columns: repeat(2, 1fr); }
  .refer-strip > div:nth-child(3) { border-left:none; border-top:1px solid ${RULE_SOFT}; }
  .refer-strip > div:nth-child(4) { border-top:1px solid ${RULE_SOFT}; } }

/* Two-column intro */
.refer-two { display:grid; gap:40px; grid-template-columns: 1.15fr 1fr; align-items:start; }
@media (max-width: 820px) { .refer-two { grid-template-columns: 1fr; gap:28px; } }

.refer-facts { background:${CREAM}; border:1px solid ${RULE}; padding: 22px 26px; }
.refer-fact-row { display:grid; grid-template-columns: 140px 1fr; gap:16px; padding: 12px 0; }
.refer-fact-row + .refer-fact-row { border-top:1px solid ${RULE}; }
.refer-fact-row dt { font-size:12px; font-weight:700; color:${NAVY}; text-transform:uppercase;
  letter-spacing:0.6px; }
.refer-fact-row dd { margin:0; font-size:15px; color:${INK_SOFT}; line-height:1.55; }
@media (max-width: 520px) { .refer-fact-row { grid-template-columns: 1fr; gap:4px; } }

/* Steps */
.refer-steps { margin-top:32px; display:grid; gap:28px; grid-template-columns: repeat(3, 1fr); }
@media (max-width: 820px) { .refer-steps { grid-template-columns: 1fr; gap:20px; } }
.refer-step { border-top:3px solid ${ORANGE}; padding-top:18px; }
.refer-step .n { font-family:${DISPLAY_FONT}; font-size:28px; color:${NAVY}; font-weight:600;
  line-height:1; }
.refer-step .t { font-family:${DISPLAY_FONT}; font-size:19px; font-weight:600; color:${NAVY};
  text-transform:uppercase; letter-spacing:0.5px; margin-top:8px; }
.refer-step p { margin-top:10px; color:${INK_SOFT}; font-size:15px; }

/* Benefits */
.refer-benefits { margin-top:28px; display:grid; gap:22px; grid-template-columns: 1fr 1fr; }
@media (max-width: 720px) { .refer-benefits { grid-template-columns: 1fr; } }
.refer-card { background:#fff; border:1px solid ${RULE}; padding: 26px 28px 22px; }
.refer-card h3 { font-family:${DISPLAY_FONT}; font-size:20px; font-weight:700; color:${NAVY};
  text-transform:uppercase; letter-spacing:0.5px; margin:0; }
.refer-card ul { list-style:none; padding:0; margin:14px 0 0; }
.refer-card li { display:flex; gap:12px; padding:10px 0; font-size:15px; color:${INK_SOFT};
  line-height:1.55; }
.refer-card li + li { border-top:1px solid ${RULE}; }
.refer-card .ck { color:${ORANGE_CTA}; font-weight:700; flex-shrink:0; }

/* Eligibility table */
.refer-elig { margin-top:24px; border:1px solid ${RULE}; }
.refer-elig-row { display:grid; grid-template-columns: 220px 1fr; padding:18px 24px; gap:16px; }
.refer-elig-row + .refer-elig-row { border-top:1px solid ${RULE}; }
.refer-elig-row .k { font-size:12px; font-weight:700; color:${NAVY}; text-transform:uppercase;
  letter-spacing:0.6px; }
.refer-elig-row .v { font-size:15px; color:${INK_SOFT}; }
@media (max-width: 620px) { .refer-elig-row { grid-template-columns: 1fr; gap:6px; padding:16px 18px; } }

/* FAQ */
.refer-faq { margin-top:24px; background:#fff; border:1px solid ${RULE}; }
.refer-faq details { padding: 16px 22px; }
.refer-faq details + details { border-top:1px solid ${RULE}; }
.refer-faq summary { cursor:pointer; list-style:none; font-family:${DISPLAY_FONT};
  font-size:17px; font-weight:600; color:${NAVY}; letter-spacing:0.3px;
  display:flex; align-items:center; justify-content:space-between; gap:16px; }
.refer-faq summary::-webkit-details-marker { display:none; }
.refer-faq summary::after { content:"+"; font-family:${BODY_FONT}; font-weight:400; font-size:22px;
  color:${ORANGE_CTA}; line-height:1; transition: transform .18s ease; }
.refer-faq details[open] summary::after { content:"−"; }
.refer-faq details p { margin: 10px 0 4px; color:${INK_SOFT}; font-size:15px; }

/* CTA footer */
.refer-cta-grid { display:grid; gap:28px; grid-template-columns: 1.4fr 1fr; align-items:center; }
@media (max-width: 720px) { .refer-cta-grid { grid-template-columns: 1fr; } }
.refer-cta-actions { display:flex; flex-direction:column; gap:12px; }
.refer-btn { display:inline-block; text-align:center; padding:15px 24px; font-family:${DISPLAY_FONT};
  letter-spacing:1.2px; font-size:14px; font-weight:600; text-transform:uppercase;
  text-decoration:none; transition: transform .12s ease, background .15s ease; }
.refer-btn:hover { transform: translateY(-1px); }
.refer-btn-primary { background:${ORANGE_CTA}; color:#fff; }
.refer-btn-primary:hover { background:#a03f06; }
.refer-btn-ghost { background:transparent; color:#fff; border:1.5px solid rgba(255,255,255,0.45); }
.refer-btn-ghost:hover { background: rgba(255,255,255,0.08); }

/* Section spacing */
.refer-section { padding: 72px 0; }
@media (max-width: 720px) { .refer-section { padding: 52px 0; } }
`;

function ReferPage() {
  return (
    <div className="refer-root">
      <style>{scopedCSS}</style>
      <SiteHeader />
      <PageHeader />
      <StatStrip />
      <Intro />
      <HowItWorks />
      <BenefitsGrid />
      <Eligibility />
      <Faq />
      <CtaFooter />
      <SiteFooter />
    </div>
  );
}

/* ---------------- Page header ---------------- */
function PageHeader() {
  return (
    <header className="refer-header">
      <div className="refer-wrap">
        <nav className="refer-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span style={{ margin: "0 8px", color: MUTED }}>›</span>
          <span style={{ color: INK }}>Refer a Friend</span>
        </nav>
        <span className="refer-eyebrow">Ambassador Program</span>
        <h1 className="refer-h1">Refer a Friend</h1>
        <p className="refer-lead">
          Help the men in your life get their edge back. Share a link, he books a no-cost first
          visit, and you get a personal thank-you when he shows up.
        </p>
      </div>
    </header>
  );
}

/* ---------------- Quick stat strip ---------------- */
function StatStrip() {
  const stats: [string, string][] = [
    ["$0", "First visit cost"],
    ["3", "Virginia locations"],
    ["Same day", "Lab results"],
    ["Optional", "Enrollment"],
  ];
  return (
    <div className="refer-strip" role="list">
      {stats.map(([k, v]) => (
        <div key={v} role="listitem">
          <div className="k">{k}</div>
          <div className="v">{v}</div>
        </div>
      ))}
    </div>
  );
}

/* ---------------- Intro / at a glance ---------------- */
function Intro() {
  const facts: [string, string][] = [
    ["Cost to refer", "Free. No purchase or enrollment required."],
    ["What he receives", "A no-cost first visit with a licensed Virginia provider and on-site labs."],
    ["What you receive", "A personal thank-you after each referred friend completes his first visit."],
    ["Where it works", "All three MWC centers: Richmond, Newport News, Virginia Beach."],
    ["Privacy", "HIPAA compliant. We contact a referred person once, unless they opt in."],
  ];
  return (
    <section className="refer-section" style={{ borderBottom: `1px solid ${RULE}` }}>
      <div className="refer-wrap refer-two">
        <div>
          <h2 className="refer-h2">Program overview</h2>
          <p style={{ marginTop: 16, color: INK_SOFT, fontSize: 17 }}>
            The Men's Wellness Centers referral program is a simple way to point a friend, family
            member, or teammate toward care that actually addresses low energy, low drive, and stalled
            results. Share your referral link, he books when he's ready, and we take it from there.
          </p>
          <p style={{ marginTop: 12, color: INK_SOFT, fontSize: 17 }}>
            No pressure, no promo codes, no discount language. Just a program built on trust between
            men who've been through the process and men who are about to start.
          </p>
        </div>
        <div className="refer-facts">
          <div className="refer-eyebrow" style={{ marginBottom: 12 }}>At a glance</div>
          <dl style={{ margin: 0 }}>
            {facts.map(([label, value]) => (
              <div className="refer-fact-row" key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

/* ---------------- How it works ---------------- */
function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Get your referral link",
      body:
        "Copy your personal referral link from the ambassador portal. Enrollment is optional, but recommended if you plan to refer more than once.",
    },
    {
      n: "02",
      title: "Share it with someone who needs it",
      body:
        "Send it by text, email, or in person. He uses the link to book a no-cost first visit at the MWC location closest to him.",
    },
    {
      n: "03",
      title: "We handle the rest",
      body:
        "He meets with a licensed Virginia provider, gets labs drawn on-site, and reviews results the same day. Once his first visit is complete, you get a personal thank-you.",
    },
  ];
  return (
    <section id="how-it-works" className="refer-section" style={{ background: "#fff" }}>
      <div className="refer-wrap">
        <h2 className="refer-h2">How it works</h2>
        <p className="refer-lead">Three steps. No paperwork on your end.</p>
        <div className="refer-steps">
          {steps.map((s) => (
            <div key={s.n} className="refer-step">
              <div className="n">{s.n}</div>
              <div className="t">{s.title}</div>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Benefits ---------------- */
function BenefitsGrid() {
  const him = [
    "Sit-down visit with a licensed Virginia provider",
    "Labs drawn on-site, reviewed the same day",
    "Clear, personalized recommendations — no upsell",
    "Follow-up guidance tailored to his goals",
  ];
  const you = [
    "Personal thank-you after each completed first visit",
    "Simple dashboard to track your referrals",
    "Optional ambassador enrollment for repeat referrers",
    "The quiet satisfaction of pointing a friend the right way",
  ];
  return (
    <section
      className="refer-section"
      style={{ background: CREAM, borderTop: `1px solid ${RULE}`, borderBottom: `1px solid ${RULE}` }}
    >
      <div className="refer-wrap">
        <h2 className="refer-h2">What each side gets</h2>
        <div className="refer-benefits">
          <BenefitCard title="For him" items={him} />
          <BenefitCard title="For you" items={you} />
        </div>
      </div>
    </section>
  );
}

function BenefitCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="refer-card">
      <h3>{title}</h3>
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

/* ---------------- Eligibility ---------------- */
function Eligibility() {
  const rows: [string, string][] = [
    ["Who can refer", "Anyone 18+. Current members, past members, spouses, coworkers, and friends."],
    ["Who can be referred", "Adult men, 21+, who have not been an MWC patient in the last 12 months."],
    ["How rewards work", "Issued after the referred friend completes his first visit. One thank-you per new patient."],
    ["Outreach", "MWC contacts the referred person once. Additional outreach only with their consent."],
    ["Compliance", "HIPAA compliant. Referring does not share any medical information about either party."],
  ];
  return (
    <section className="refer-section" style={{ background: "#fff" }}>
      <div className="refer-wrap-narrow">
        <h2 className="refer-h2">Eligibility & rules</h2>
        <div className="refer-elig">
          {rows.map(([k, v]) => (
            <div className="refer-elig-row" key={k}>
              <div className="k">{k}</div>
              <div className="v">{v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
function Faq() {
  const items: [string, string][] = [
    [
      "Do I have to enroll to refer someone?",
      "No. You can send a referral without enrolling. Enrollment is only recommended if you plan to refer regularly and want a dashboard to track your referrals.",
    ],
    [
      "Does my friend pay anything for the first visit?",
      "No. The first visit is no-cost, includes labs, and comes with same-day review of his results.",
    ],
    [
      "How and when do I get thanked?",
      "After your referred friend completes his first visit. Thank-yous are personal and go out through the ambassador portal.",
    ],
    [
      "Will you keep contacting my friend?",
      "No. MWC reaches out once. Any additional communication only happens with their consent.",
    ],
    [
      "Is any of my friend's health information shared with me?",
      "Never. The program is fully HIPAA compliant. You only see that a referral was completed, not any medical detail.",
    ],
    [
      "Can I refer more than one person?",
      "Yes. There is no cap. Each completed first visit is acknowledged individually.",
    ],
  ];
  return (
    <section className="refer-section" style={{ background: CREAM, borderTop: `1px solid ${RULE}` }}>
      <div className="refer-wrap-narrow">
        <h2 className="refer-h2">Frequently asked questions</h2>
        <div className="refer-faq">
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

/* ---------------- CTA footer ---------------- */
function CtaFooter() {
  return (
    <section style={{ padding: "64px 0", background: NAVY, color: "#fff" }}>
      <div className="refer-wrap-narrow refer-cta-grid">
        <div>
          <h2
            style={{
              fontFamily: DISPLAY_FONT,
              fontSize: "clamp(24px, 3.4vw, 32px)",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 0.5,
              margin: 0,
              lineHeight: 1.15,
            }}
          >
            Ready to refer someone?
          </h2>
          <p style={{ marginTop: 12, color: "rgba(255,255,255,0.88)", fontSize: 16, maxWidth: "48ch" }}>
            Send a referral now, or enroll as an ambassador if you plan to refer more than once.
            Enrollment is optional.
          </p>
        </div>
        <div className="refer-cta-actions">
          <a href={REFER_URL} className="refer-btn refer-btn-primary">
            Send a referral
          </a>
          <a href={ENROLL_URL} className="refer-btn refer-btn-ghost">
            Enroll as an ambassador
          </a>
          <Link
            to="/ambassador"
            style={{
              textAlign: "center",
              color: "rgba(255,255,255,0.8)",
              fontSize: 13,
              textDecoration: "underline",
              marginTop: 2,
            }}
          >
            View printable referral tools
          </Link>
        </div>
      </div>
    </section>
  );
}
