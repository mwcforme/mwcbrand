import { createFileRoute, Link } from "@tanstack/react-router";
import assetMap from "@/data/asset-map.json";

const A = assetMap as Record<string, string>;
const WORDMARK_WHITE = A["assets/logos/svg/wordmark_white.svg"];

// Brand tokens (mirrors src/styles.css :root):
//   --navy #0b1029 · --navy-mid #161b3a · --cream #f5f3f0 · --orange #e8670a
//   --orange-btn #b84a08 (AA-safe with white text; bright orange fails 4.5:1)
const NAVY = "#0b1029";
const NAVY_2 = "#161b3a";
const NAVY_DEEP = "#070b1d";
const CREAM = "#f5f3f0";
const ORANGE = "#e8670a"; // accent (borders, eyebrows, icons)
const ORANGE_CTA = "#b84a08"; // buttons/bands carrying white text — AA compliant
const INK = "#0b1029";
const INK_SOFT = "#4a4e66";

const ENROLL_URL = "https://go.menswellnesscenters.com/ambassador/enroll";
const REFER_URL = "https://go.menswellnesscenters.com/ambassador/referral";

export const Route = createFileRoute("/refer")({
  head: () => ({
    meta: [
      { title: "Refer a Friend · Men's Wellness Centers | Virginia" },
      {
        name: "description",
        content:
          "Know a man who's not himself lately? Refer him to Men's Wellness Centers. Enroll as an ambassador, share your link, and get rewarded when he books his first visit.",
      },
      { property: "og:title", content: "Refer a Friend · Men's Wellness Centers" },
      {
        property: "og:description",
        content:
          "Enroll as an MWC Ambassador. Share your link. Get rewarded when the men in your life get their edge back.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://mwcbrand.lovable.app/refer" },
    ],
    links: [{ rel: "canonical", href: "https://mwcbrand.lovable.app/refer" }],
  }),
  component: ReferMarketingPage,
});

function ReferMarketingPage() {
  return (
    <div style={{ background: NAVY, color: "#fff", fontFamily: "'Montserrat', sans-serif" }}>
      <MockTopBar />
      <MockNav />
      <Hero />
      <StatsBar />
      <HowItWorks />
      <WhyRefer />
      <TestimonialBand />
      <PosterStrip />
      <CtaBand />
      <MockFooter />
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Top utility bar                                                   */
/* ---------------------------------------------------------------- */
function MockTopBar() {
  const items = [
    ["RICHMOND", "(804) 346-4636"],
    ["NEWPORT NEWS", "(757) 806-6263"],
    ["VIRGINIA BEACH", "(757) 612-4428"],
  ];
  return (
    <div style={{ background: NAVY, borderBottom: `1px solid rgba(255,255,255,0.08)` }}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "10px 24px",
          display: "flex",
          justifyContent: "center",
          gap: 40,
          fontSize: 12,
          letterSpacing: "0.12em",
          fontWeight: 600,
          color: "#fff",
        }}
      >
        {items.map(([city, phone], i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: ORANGE }}>●</span>
            <span>{city}</span>
            <span style={{ opacity: 0.7 }}>{phone}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Main nav                                                          */
/* ---------------------------------------------------------------- */
function MockNav() {
  return (
    <div style={{ background: "#fff", color: NAVY_2 }}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "18px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontWeight: 700,
              letterSpacing: "0.02em",
              lineHeight: 1,
              fontSize: 22,
            }}
          >
            MEN'S
            <div style={{ fontSize: 9, letterSpacing: "0.35em", marginTop: 2 }}>
              WELLNESS CENTERS
            </div>
          </div>
        </div>
        <nav
          style={{
            display: "flex",
            gap: 32,
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.08em",
          }}
        >
          {["HOW IT WORKS", "SERVICES", "LOCATIONS", "ABOUT US", "REFER"].map((l) => (
            <span key={l} style={{ opacity: l === "REFER" ? 1 : 0.85 }}>
              {l}
            </span>
          ))}
        </nav>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span
            style={{
              border: `1.5px solid ${NAVY_2}`,
              borderRadius: 999,
              padding: "10px 18px",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.08em",
            }}
          >
            866-344-4955
          </span>
          <span
            style={{
              background: ORANGE_CTA,
              color: "#fff",
              borderRadius: 999,
              padding: "12px 20px",
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: "0.08em",
            }}
          >
            BOOK APPOINTMENT
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Hero                                                              */
/* ---------------------------------------------------------------- */
function Hero() {
  return (
    <section style={{ background: NAVY, padding: "80px 24px 96px" }}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.15fr 1fr",
          gap: 64,
          alignItems: "start",
        }}
      >
        <div>
          <div
            style={{
              display: "inline-block",
              padding: "8px 14px",
              border: `1px solid ${ORANGE}`,
              color: ORANGE,
              fontSize: 11,
              letterSpacing: "0.25em",
              fontWeight: 700,
              marginBottom: 28,
            }}
          >
            AMBASSADOR PROGRAM · BY INVITATION
          </div>
          <h1
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontWeight: 700,
              fontSize: 84,
              lineHeight: 0.98,
              letterSpacing: "-0.01em",
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            Know a man who's{" "}
            <span style={{ fontWeight: 400, fontStyle: "italic", opacity: 0.9 }}>
              not himself
            </span>{" "}
            lately?
          </h1>
          <p
            style={{
              fontSize: 18,
              lineHeight: 1.55,
              maxWidth: 560,
              marginTop: 28,
              color: "rgba(255,255,255,0.85)",
            }}
          >
            Refer him to Men's Wellness Centers. Sit-down visit with a licensed Virginia
            provider. Labs drawn on-site and reviewed the same day. No-cost first
            appointment. You get thanked, he gets his edge back.
          </p>

          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: "32px 0 0",
              display: "grid",
              gap: 12,
              maxWidth: 520,
            }}
          >
            {[
              "Tired by noon. Coffee stopped working.",
              "Same gym effort. Nothing to show.",
              "Sex drive is down. He's noticed the change.",
              "Labs came back fine. He isn't.",
            ].map((line) => (
              <li
                key={line}
                style={{ display: "flex", gap: 12, fontSize: 15, color: "rgba(255,255,255,0.9)" }}
              >
                <span style={{ color: ORANGE, marginTop: 6 }}>●</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>

          <div style={{ display: "flex", gap: 20, marginTop: 40, flexWrap: "wrap", alignItems: "center" }}>
            <a
              href={REFER_URL}
              style={{
                background: ORANGE_CTA,
                color: "#fff",
                padding: "16px 26px",
                borderRadius: 999,
                fontWeight: 800,
                letterSpacing: "0.08em",
                fontSize: 12,
                textDecoration: "none",
              }}
            >
              SEND A REFERRAL →
            </a>
            <a
              href="#how-it-works"
              style={{
                border: "1.5px solid rgba(255,255,255,0.35)",
                color: "#fff",
                padding: "16px 26px",
                borderRadius: 999,
                fontWeight: 700,
                letterSpacing: "0.08em",
                fontSize: 12,
                textDecoration: "none",
              }}
            >
              READ HOW IT WORKS
            </a>
            <span
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.55)",
                fontStyle: "italic",
              }}
            >
              No enrollment required to refer.
            </span>
          </div>
        </div>

        {/* Right: at-a-glance info panel */}
        <aside
          aria-label="Program at a glance"
          style={{
            background: NAVY_2,
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 18,
            padding: 36,
            boxShadow: "0 30px 60px -20px rgba(0,0,0,0.5)",
          }}
        >
          <div
            style={{
              fontSize: 11,
              letterSpacing: "0.25em",
              color: ORANGE,
              fontWeight: 700,
              marginBottom: 14,
            }}
          >
            AT A GLANCE
          </div>
          <div
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontWeight: 700,
              fontSize: 26,
              lineHeight: 1.15,
              letterSpacing: "0.01em",
              textTransform: "uppercase",
              marginBottom: 24,
            }}
          >
            The MWC Ambassador Program
          </div>
          {[
            ["Who it's for", "Current members, referring partners, and anyone who knows a man who's been putting it off."],
            ["What it costs", "Nothing to join. No purchase required. Free to share."],
            ["What he gets", "A no-cost first visit with a licensed Virginia provider and on-site labs."],
            ["What you get", "A personal thank-you every time a referred friend completes his first visit."],
            ["Where it works", "All three MWC centers: Richmond, Newport News, Virginia Beach."],
          ].map(([label, val]) => (
            <div
              key={label}
              style={{
                display: "grid",
                gridTemplateColumns: "130px 1fr",
                gap: 16,
                padding: "14px 0",
                borderTop: "1px solid rgba(255,255,255,0.08)",
                alignItems: "start",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.15em",
                  color: "rgba(255,255,255,0.55)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  paddingTop: 2,
                }}
              >
                {label}
              </div>
              <div style={{ fontSize: 14, lineHeight: 1.55, color: "rgba(255,255,255,0.9)" }}>
                {val}
              </div>
            </div>
          ))}
          <p
            style={{
              fontSize: 11,
              lineHeight: 1.5,
              color: INK_SOFT === INK_SOFT ? "rgba(255,255,255,0.55)" : undefined,
              marginTop: 20,
              paddingTop: 16,
              borderTop: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            Rewards are issued after a referred friend completes his first visit. MWC never
            contacts a referred person more than once without their consent.
          </p>
        </aside>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Stats                                                             */
/* ---------------------------------------------------------------- */
function StatsBar() {
  const stats = [
    ["10,000+", "MEN TREATED SINCE 2015"],
    ["10+", "YEARS OF EXPERIENCE"],
    ["Same-Day", "APPOINTMENTS AVAILABLE"],
    ["3", "CENTERS ACROSS VIRGINIA"],
  ];
  return (
    <section
      style={{
        background: NAVY,
        borderTop: "1px solid rgba(255,255,255,0.08)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        padding: "48px 24px",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 24,
          textAlign: "center",
        }}
      >
        {stats.map(([n, label]) => (
          <div key={label}>
            <div
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 700,
                fontSize: 48,
                lineHeight: 1,
                letterSpacing: "0.01em",
              }}
            >
              {n}
            </div>
            <div
              style={{
                marginTop: 10,
                fontSize: 11,
                letterSpacing: "0.2em",
                color: "rgba(255,255,255,0.65)",
                fontWeight: 700,
              }}
            >
              {label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* How it works                                                      */
/* ---------------------------------------------------------------- */
function HowItWorks() {
  const steps = [
    ["01", "Get your link", "We give you a personal referral link instantly. Enroll anytime if you want rewards tracked to your name."],
    ["02", "Share", "Text it, hand him a card, drop it on group chat. He books when he's ready."],
    ["03", "Get thanked", "When he completes his first visit, we thank you. Every time."],
  ];
  return (
    <section id="how-it-works" style={{ background: CREAM, color: NAVY_2, padding: "96px 24px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div
          style={{
            fontSize: 12,
            letterSpacing: "0.25em",
            color: ORANGE,
            fontWeight: 700,
            marginBottom: 16,
          }}
        >
          HOW IT WORKS
        </div>
        <h2
          style={{
            fontFamily: "'Oswald', sans-serif",
            fontWeight: 700,
            fontSize: 56,
            lineHeight: 1,
            letterSpacing: "-0.01em",
            margin: 0,
            textTransform: "uppercase",
            maxWidth: 780,
          }}
        >
          Refer the men around you.<br />We take it from there.
        </h2>
        <div
          style={{
            marginTop: 56,
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 32,
          }}
        >
          {steps.map(([n, t, d]) => (
            <div
              key={n}
              style={{
                background: "#fff",
                border: `1px solid rgba(27,43,75,0.1)`,
                padding: 40,
                borderRadius: 12,
              }}
            >
              <div
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  color: ORANGE,
                  fontWeight: 700,
                  fontSize: 40,
                  lineHeight: 1,
                }}
              >
                {n}
              </div>
              <div
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontWeight: 700,
                  fontSize: 26,
                  textTransform: "uppercase",
                  marginTop: 18,
                  letterSpacing: "0.02em",
                }}
              >
                {t}
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.6, marginTop: 12, color: "#3b4560" }}>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Why refer / value                                                 */
/* ---------------------------------------------------------------- */
function WhyRefer() {
  const points = [
    [
      "It's the easiest good you can do.",
      "The man in your life won't book on his own. A referral from you is the reason he finally goes.",
    ],
    [
      "No sales pitch. Ever.",
      "Sit-down visit with a licensed Virginia provider. Labs on-site, reviewed the same day. That's it.",
    ],
    [
      "He keeps his privacy.",
      "We only ever contact who you tell us to, once. If he's not ready, he's not bothered again.",
    ],
    [
      "You get thanked.",
      "When he completes his first visit, you're rewarded. Not points. Not tiers. Real thanks.",
    ],
  ];
  return (
    <section style={{ background: NAVY, padding: "96px 24px" }}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1.4fr",
          gap: 80,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 12,
              letterSpacing: "0.25em",
              color: ORANGE,
              fontWeight: 700,
              marginBottom: 16,
            }}
          >
            WHY REFER
          </div>
          <h2
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontWeight: 700,
              fontSize: 56,
              lineHeight: 1,
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            Because he'd do it for you.
          </h2>
          <p
            style={{
              marginTop: 20,
              fontSize: 16,
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.75)",
              maxWidth: 380,
            }}
          >
            Most men don't call. They wait. Then they wait more. A nudge from someone
            they trust changes the whole timeline.
          </p>
        </div>
        <div style={{ display: "grid", gap: 4, borderTop: "1px solid rgba(255,255,255,0.12)" }}>
          {points.map(([t, d]) => (
            <div
              key={t}
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.12)",
                padding: "28px 0",
                display: "grid",
                gridTemplateColumns: "1fr 1.4fr",
                gap: 32,
                alignItems: "start",
              }}
            >
              <div
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontWeight: 700,
                  fontSize: 22,
                  textTransform: "uppercase",
                  letterSpacing: "0.02em",
                }}
              >
                {t}
              </div>
              <div style={{ fontSize: 15, lineHeight: 1.65, color: "rgba(255,255,255,0.8)" }}>{d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Testimonial                                                       */
/* ---------------------------------------------------------------- */
function TestimonialBand() {
  return (
    <section style={{ background: CREAM, color: NAVY_2, padding: "96px 24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <div
          style={{
            fontFamily: "'Oswald', sans-serif",
            color: ORANGE,
            fontSize: 56,
            lineHeight: 1,
            marginBottom: 24,
          }}
        >
          "
        </div>
        <blockquote
          style={{
            fontFamily: "'Oswald', sans-serif",
            fontWeight: 500,
            fontSize: 36,
            lineHeight: 1.2,
            letterSpacing: "-0.005em",
            margin: 0,
            textTransform: "uppercase",
          }}
        >
          My buddy sent me the link. I finally went. Six weeks later I'm sleeping,
          lifting, and my wife noticed before I did.
        </blockquote>
        <div
          style={{
            marginTop: 28,
            fontSize: 12,
            letterSpacing: "0.25em",
            fontWeight: 700,
            color: "#3b4560",
          }}
        >
          MARCUS · RICHMOND · MEMBER SINCE 2024
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Poster / assets strip                                             */
/* ---------------------------------------------------------------- */
function PosterStrip() {
  return (
    <section style={{ background: NAVY, padding: "96px 24px" }}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1.2fr",
          gap: 64,
          alignItems: "center",
        }}
      >
        <div>
          <div
            style={{
              fontSize: 12,
              letterSpacing: "0.25em",
              color: ORANGE,
              fontWeight: 700,
              marginBottom: 16,
            }}
          >
            AMBASSADOR TOOLKIT
          </div>
          <h2
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontWeight: 700,
              fontSize: 48,
              lineHeight: 1,
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            Everything you need to share it.
          </h2>
          <p
            style={{
              marginTop: 20,
              fontSize: 16,
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.75)",
              maxWidth: 460,
            }}
          >
            Referral business cards, in-center flyers in five poster sizes, dual-QR
            hand-outs, and a personal referral link. All print-ready.
          </p>
          <div style={{ display: "flex", gap: 14, marginTop: 32, flexWrap: "wrap" }}>
            <Link
              to="/ambassador"
              style={{
                background: ORANGE_CTA,
                color: "#fff",
                padding: "16px 26px",
                borderRadius: 999,
                fontWeight: 800,
                letterSpacing: "0.08em",
                fontSize: 12,
                textDecoration: "none",
              }}
            >
              OPEN THE AMBASSADOR HUB
            </Link>
            <Link
              to="/business-card"
              style={{
                border: "1.5px solid rgba(255,255,255,0.35)",
                color: "#fff",
                padding: "16px 26px",
                borderRadius: 999,
                fontWeight: 700,
                letterSpacing: "0.08em",
                fontSize: 12,
                textDecoration: "none",
              }}
            >
              REFERRAL CARDS
            </Link>
          </div>
        </div>

        {/* Mock poster preview */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {[0, 1].map((i) => (
            <div
              key={i}
              style={{
                aspectRatio: "3 / 4",
                background: i === 0 ? NAVY_2 : CREAM,
                color: i === 0 ? "#fff" : NAVY_2,
                borderRadius: 12,
                padding: 24,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div
                style={{
                  fontSize: 9,
                  letterSpacing: "0.3em",
                  fontWeight: 700,
                  opacity: 0.75,
                }}
              >
                MEN'S WELLNESS CENTERS
              </div>
              <div
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontWeight: 700,
                  fontSize: 26,
                  lineHeight: 0.95,
                  textTransform: "uppercase",
                }}
              >
                Know a man<br />who needs<br />
                <span style={{ color: ORANGE }}>his edge back?</span>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    background: i === 0 ? "#fff" : NAVY_2,
                    borderRadius: 4,
                  }}
                />
                <div style={{ fontSize: 9, letterSpacing: "0.2em", fontWeight: 700 }}>
                  SCAN TO REFER
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* CTA band                                                          */
/* ---------------------------------------------------------------- */
function CtaBand() {
  const faqs: [string, string][] = [
    [
      "Do I have to be a current patient to refer someone?",
      "No. The program is open to current members, family, friends, and partner providers. If you know a man in Virginia who could benefit, you can refer him.",
    ],
    [
      "What does it cost him to book?",
      "Nothing for the first visit. MWC covers the initial consult and on-site labs so he can make a decision with real data in front of him.",
    ],
    [
      "How will he be contacted?",
      "One outreach from the local center, at a reasonable hour, to help him schedule. If he doesn't respond, we stop. He is never added to a marketing list without opting in.",
    ],
    [
      "How am I rewarded, and when?",
      "You're thanked after your referred friend completes his first visit. Details are outlined during enrollment; rewards are not tied to purchases he makes.",
    ],
    [
      "Is my information — or his — shared with anyone?",
      "No. MWC is a licensed Virginia medical practice bound by HIPAA. Referral information is used only to schedule the visit and to thank you after it happens.",
    ],
    [
      "Can I share my referral link publicly?",
      "Yes. Ambassadors receive a personal link and print-ready materials (business cards, in-center flyers) they can share one-to-one or post as they see fit.",
    ],
  ];
  return (
    <section style={{ background: NAVY, color: "#fff", padding: "96px 24px" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div
          style={{
            fontSize: 12,
            letterSpacing: "0.25em",
            color: ORANGE,
            fontWeight: 700,
            marginBottom: 16,
          }}
        >
          FREQUENTLY ASKED
        </div>
        <h2
          style={{
            fontFamily: "'Oswald', sans-serif",
            fontWeight: 700,
            fontSize: 48,
            lineHeight: 1,
            letterSpacing: "-0.005em",
            textTransform: "uppercase",
            margin: 0,
            maxWidth: 780,
          }}
        >
          Straight answers before you refer.
        </h2>
        <div style={{ marginTop: 40, borderTop: "1px solid rgba(255,255,255,0.12)" }}>
          {faqs.map(([q, a]) => (
            <details
              key={q}
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.12)",
                padding: "22px 0",
              }}
            >
              <summary
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontWeight: 700,
                  fontSize: 20,
                  letterSpacing: "0.01em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  listStyle: "none",
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 24,
                  alignItems: "start",
                }}
              >
                <span>{q}</span>
                <span style={{ color: ORANGE, fontSize: 22, lineHeight: 1 }}>+</span>
              </summary>
              <p
                style={{
                  marginTop: 14,
                  fontSize: 15,
                  lineHeight: 1.65,
                  color: "rgba(255,255,255,0.8)",
                  maxWidth: 780,
                }}
              >
                {a}
              </p>
            </details>
          ))}
        </div>

        <div
          style={{
            marginTop: 56,
            padding: "28px 32px",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 12,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", maxWidth: 560 }}>
            Still have questions? The program page has full terms and the ambassador hub
            has the toolkit.
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link
              to="/ambassador"
              style={{
                border: "1.5px solid rgba(255,255,255,0.35)",
                color: "#fff",
                padding: "14px 22px",
                borderRadius: 999,
                fontWeight: 700,
                letterSpacing: "0.08em",
                fontSize: 12,
                textDecoration: "none",
              }}
            >
              PROGRAM DETAILS
            </Link>
            <a
              href={ENROLL_URL}
              style={{
                background: ORANGE_CTA,
                color: "#fff",
                padding: "14px 22px",
                borderRadius: 999,
                fontWeight: 800,
                letterSpacing: "0.08em",
                fontSize: 12,
                textDecoration: "none",
              }}
            >
              ENROLL WHEN READY →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Footer                                                            */
/* ---------------------------------------------------------------- */
function MockFooter() {
  return (
    <footer style={{ background: "#070b1d", padding: "64px 24px 40px", color: "#fff" }}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
          gap: 40,
        }}
      >
        <div>
          {WORDMARK_WHITE ? (
            <img src={WORDMARK_WHITE} alt="Men's Wellness Centers" style={{ height: 40 }} />
          ) : (
            <div
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 700,
                fontSize: 22,
              }}
            >
              MEN'S WELLNESS CENTERS
            </div>
          )}
          <p
            style={{
              marginTop: 20,
              fontSize: 13,
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.6)",
              maxWidth: 340,
            }}
          >
            Virginia's men's health practice since 2015. TRT, ED and medical weight loss
            managed by licensed providers.
          </p>
        </div>
        {[
          ["LOCATIONS", ["Richmond", "Newport News", "Virginia Beach"]],
          ["PROGRAM", ["How it works", "Refer a friend", "Ambassador hub"]],
          ["COMPANY", ["About", "Contact", "Privacy"]],
        ].map(([h, items]) => (
          <div key={h as string}>
            <div
              style={{
                fontSize: 11,
                letterSpacing: "0.25em",
                fontWeight: 700,
                marginBottom: 16,
                color: ORANGE,
              }}
            >
              {h}
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10 }}>
              {(items as string[]).map((i) => (
                <li key={i} style={{ fontSize: 14, color: "rgba(255,255,255,0.8)" }}>
                  {i}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div
        style={{
          maxWidth: 1280,
          margin: "48px auto 0",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          paddingTop: 24,
          fontSize: 12,
          color: "rgba(255,255,255,0.5)",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <span>© {new Date().getFullYear()} Men's Wellness Centers. All rights reserved.</span>
        <span>Licensed Virginia medical practice.</span>
      </div>
    </footer>
  );
}
