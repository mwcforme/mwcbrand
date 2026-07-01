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
          "Learn how the Men's Wellness Centers referral program works: how to refer, what your friend receives, how you're thanked, and eligibility details.",
      },
      { property: "og:title", content: "Refer a Friend · Men's Wellness Centers" },
      {
        property: "og:description",
        content:
          "How the MWC referral program works: refer a friend, he books a no-cost first visit, you get a personal thank-you.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://mwcbrand.lovable.app/refer" },
    ],
    links: [{ rel: "canonical", href: "https://mwcbrand.lovable.app/refer" }],
  }),
  component: ReferPage,
});

/* Design tokens (align with site) */
const NAVY = "#0b1029";
const INK = "#111528";
const INK_SOFT = "#3b3f57";
const MUTED = "#6b7085";
const RULE = "#e5e7ef";
const CREAM = "#faf8f4";
const ORANGE = "#e8670a";
const ORANGE_CTA = "#b84a08";

const BODY_FONT = "'Open Sans', system-ui, sans-serif";
const DISPLAY_FONT = "'Oswald', 'Open Sans', sans-serif";

function ReferPage() {
  return (
    <div style={{ background: "#fff", color: INK, fontFamily: BODY_FONT, fontSize: 16, lineHeight: 1.6 }}>
      <SiteHeader />
      <PageHeader />
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

/* ---------------- Page header (breadcrumb + title) ---------------- */
function PageHeader() {
  return (
    <header
      style={{
        background: CREAM,
        borderBottom: `1px solid ${RULE}`,
        padding: "36px 24px 40px",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <nav style={{ fontSize: 13, color: MUTED, marginBottom: 14, letterSpacing: 0.2 }}>
          <Link to="/" style={{ color: MUTED, textDecoration: "none" }}>
            Home
          </Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: INK }}>Refer a Friend</span>
        </nav>
        <div
          style={{
            display: "inline-block",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 2,
            color: ORANGE_CTA,
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          Ambassador Program
        </div>
        <h1
          style={{
            fontFamily: DISPLAY_FONT,
            fontWeight: 700,
            fontSize: 44,
            lineHeight: 1.1,
            letterSpacing: 0.3,
            margin: 0,
            color: NAVY,
            textTransform: "uppercase",
          }}
        >
          Refer a Friend
        </h1>
        <p style={{ marginTop: 12, maxWidth: 720, color: INK_SOFT, fontSize: 17 }}>
          Help the men in your life get their edge back. Share a link, they book a no-cost first
          visit, and you get a personal thank-you when they show up.
        </p>
      </div>
    </header>
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
    <section style={{ padding: "56px 24px", borderBottom: `1px solid ${RULE}` }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gap: 40, gridTemplateColumns: "1.1fr 1fr" }}>
        <div>
          <h2 style={sectionTitle}>Program overview</h2>
          <p style={{ marginTop: 16, color: INK_SOFT, fontSize: 17 }}>
            The Men's Wellness Centers referral program is a simple way to point a friend, family
            member, or teammate toward care that actually addresses low energy, low drive, and stalled
            results. Share your referral link, he books when he's ready, and we take it from there.
          </p>
          <p style={{ marginTop: 12, color: INK_SOFT, fontSize: 17 }}>
            There's no pressure, no promo codes, and no discount language. This is a program built on
            trust between men who've been through the process and men who are about to start.
          </p>
        </div>
        <div
          style={{
            background: CREAM,
            border: `1px solid ${RULE}`,
            padding: "24px 28px",
          }}
        >
          <div
            style={{
              fontSize: 12,
              letterSpacing: 2,
              fontWeight: 700,
              color: ORANGE_CTA,
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            At a glance
          </div>
          <dl style={{ margin: 0 }}>
            {facts.map(([label, value], i) => (
              <div
                key={label}
                style={{
                  display: "grid",
                  gridTemplateColumns: "140px 1fr",
                  gap: 16,
                  padding: "12px 0",
                  borderTop: i === 0 ? "none" : `1px solid ${RULE}`,
                }}
              >
                <dt style={{ fontSize: 13, fontWeight: 700, color: NAVY, textTransform: "uppercase", letterSpacing: 0.5 }}>
                  {label}
                </dt>
                <dd style={{ margin: 0, fontSize: 15, color: INK_SOFT, lineHeight: 1.55 }}>{value}</dd>
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
    <section id="how-it-works" style={{ padding: "64px 24px", background: "#fff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <h2 style={sectionTitle}>How it works</h2>
        <p style={{ marginTop: 12, maxWidth: 720, color: INK_SOFT, fontSize: 17 }}>
          Three steps. No paperwork on your end.
        </p>
        <div
          style={{
            marginTop: 32,
            display: "grid",
            gap: 24,
            gridTemplateColumns: "repeat(3, 1fr)",
          }}
        >
          {steps.map((s) => (
            <div key={s.n} style={{ borderTop: `3px solid ${ORANGE}`, paddingTop: 20 }}>
              <div style={{ fontFamily: DISPLAY_FONT, fontSize: 28, color: NAVY, fontWeight: 600 }}>
                {s.n}
              </div>
              <div
                style={{
                  fontFamily: DISPLAY_FONT,
                  fontSize: 20,
                  fontWeight: 600,
                  color: NAVY,
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                  marginTop: 6,
                }}
              >
                {s.title}
              </div>
              <p style={{ marginTop: 10, color: INK_SOFT, fontSize: 15 }}>{s.body}</p>
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
    <section style={{ padding: "64px 24px", background: CREAM, borderTop: `1px solid ${RULE}`, borderBottom: `1px solid ${RULE}` }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <h2 style={sectionTitle}>What each side gets</h2>
        <div
          style={{
            marginTop: 28,
            display: "grid",
            gap: 24,
            gridTemplateColumns: "1fr 1fr",
          }}
        >
          <BenefitCard title="For him" items={him} />
          <BenefitCard title="For you" items={you} />
        </div>
      </div>
    </section>
  );
}

function BenefitCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div style={{ background: "#fff", border: `1px solid ${RULE}`, padding: "28px 28px 24px" }}>
      <div
        style={{
          fontFamily: DISPLAY_FONT,
          fontSize: 22,
          fontWeight: 700,
          color: NAVY,
          textTransform: "uppercase",
          letterSpacing: 0.5,
        }}
      >
        {title}
      </div>
      <ul style={{ listStyle: "none", padding: 0, margin: "16px 0 0" }}>
        {items.map((it) => (
          <li
            key={it}
            style={{
              display: "flex",
              gap: 12,
              padding: "10px 0",
              borderTop: `1px solid ${RULE}`,
              fontSize: 15,
              color: INK_SOFT,
              lineHeight: 1.55,
            }}
          >
            <span style={{ color: ORANGE_CTA, fontWeight: 700 }}>✓</span>
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
    <section style={{ padding: "64px 24px", background: "#fff" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <h2 style={sectionTitle}>Eligibility & rules</h2>
        <div style={{ marginTop: 24, border: `1px solid ${RULE}` }}>
          {rows.map(([k, v], i) => (
            <div
              key={k}
              style={{
                display: "grid",
                gridTemplateColumns: "220px 1fr",
                padding: "18px 24px",
                borderTop: i === 0 ? "none" : `1px solid ${RULE}`,
                gap: 16,
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 700, color: NAVY, textTransform: "uppercase", letterSpacing: 0.5 }}>
                {k}
              </div>
              <div style={{ fontSize: 15, color: INK_SOFT }}>{v}</div>
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
    <section style={{ padding: "64px 24px", background: CREAM, borderTop: `1px solid ${RULE}` }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <h2 style={sectionTitle}>Frequently asked questions</h2>
        <div style={{ marginTop: 24, background: "#fff", border: `1px solid ${RULE}` }}>
          {items.map(([q, a], i) => (
            <details
              key={q}
              style={{
                borderTop: i === 0 ? "none" : `1px solid ${RULE}`,
                padding: "18px 24px",
              }}
            >
              <summary
                style={{
                  cursor: "pointer",
                  listStyle: "none",
                  fontFamily: DISPLAY_FONT,
                  fontSize: 17,
                  fontWeight: 600,
                  color: NAVY,
                  letterSpacing: 0.3,
                }}
              >
                {q}
              </summary>
              <p style={{ marginTop: 10, color: INK_SOFT, fontSize: 15 }}>{a}</p>
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
    <section style={{ padding: "56px 24px", background: NAVY, color: "#fff" }}>
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          display: "grid",
          gap: 24,
          gridTemplateColumns: "1.4fr 1fr",
          alignItems: "center",
        }}
      >
        <div>
          <h2
            style={{
              fontFamily: DISPLAY_FONT,
              fontSize: 30,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 0.5,
              margin: 0,
            }}
          >
            Ready to refer someone?
          </h2>
          <p style={{ marginTop: 10, color: "rgba(255,255,255,0.85)", fontSize: 16 }}>
            Send a referral now, or enroll as an ambassador if you plan to refer more than once.
            Enrollment is optional.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <a
            href={REFER_URL}
            style={{
              display: "inline-block",
              textAlign: "center",
              background: ORANGE_CTA,
              color: "#fff",
              padding: "14px 24px",
              fontFamily: DISPLAY_FONT,
              letterSpacing: 1,
              fontSize: 15,
              fontWeight: 600,
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            Send a referral
          </a>
          <a
            href={ENROLL_URL}
            style={{
              display: "inline-block",
              textAlign: "center",
              background: "transparent",
              color: "#fff",
              padding: "13px 24px",
              border: "1.5px solid rgba(255,255,255,0.4)",
              fontFamily: DISPLAY_FONT,
              letterSpacing: 1,
              fontSize: 15,
              fontWeight: 600,
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            Enroll as an ambassador
          </a>
          <Link
            to="/ambassador"
            style={{
              textAlign: "center",
              color: "rgba(255,255,255,0.75)",
              fontSize: 13,
              textDecoration: "underline",
            }}
          >
            View printable referral tools
          </Link>
        </div>
      </div>
    </section>
  );
}

const sectionTitle: React.CSSProperties = {
  fontFamily: DISPLAY_FONT,
  fontSize: 28,
  fontWeight: 700,
  color: NAVY,
  textTransform: "uppercase",
  letterSpacing: 0.5,
  margin: 0,
};
