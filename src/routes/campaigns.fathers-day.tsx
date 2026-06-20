import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import slide1Asset from "@/assets/fathers-day/slide-1.webp.asset.json";
import slide2Asset from "@/assets/fathers-day/slide-2.jpg.asset.json";
import slide3Asset from "@/assets/fathers-day/slide-3.webp.asset.json";
import slide4Asset from "@/assets/fathers-day/slide-4.jpg.asset.json";

export const Route = createFileRoute("/campaigns/fathers-day")({
  head: () => ({
    meta: [
      { title: "Father's Day Campaign · Men's Wellness Centers" },
      {
        name: "description",
        content:
          "Full Father's Day campaign for Men's Wellness Centers: landing page, email, MMS, and the Instagram carousel, all in one shippable package.",
      },
      { property: "og:title", content: "Father's Day Campaign · Men's Wellness Centers" },
      {
        property: "og:description",
        content:
          "Landing page, email, MMS, and Instagram carousel, the Father's Day promo, fully assembled.",
      },
      { property: "og:url", content: "https://mwcbrand.lovable.app/campaigns/fathers-day" },
    ],
    links: [
      { rel: "canonical", href: "https://mwcbrand.lovable.app/campaigns/fathers-day" },
    ],
  }),
  component: FathersDayCampaign,
});

const CREAM = "#f5f3f0";
const NAVY = "#0b1029";
const ORANGE = "#ff5500";
const INK_SOFT = "#4a4e66";

const WORDMARK =
  "/__l5e/assets-v1/d8a9db5f-130d-40a6-bc53-ed4bb5150d26/Navy_on_Transparent__wordmark_2174x500.png";
const WORDMARK_LIGHT =
  "/__l5e/assets-v1/d0018746-8b08-4844-a04e-8ed1b2a745db/White_on_Navy__wordmark_2174x500.png";

const HERO_PHOTO = slide1Asset.url;
const PROOF_PHOTO = slide2Asset.url;
const STAKES_PHOTO = slide3Asset.url;
const CLOSE_PHOTO = slide4Asset.url;

const OFFER_END = "June 30";
const BOOKING_BASE = "http://book.menswellnesscenters.com/fathers-day-2026";
const OFFER_ID = "fathers-day-2026";

// Single source of truth for every CTA: same destination + UTM tags,
// only the per-CTA placement/content tag changes.
function bookingUrl(content: string, source: "landing" | "email" | "mms" | "social" | "hub" = "hub") {
  const params = new URLSearchParams({
    utm_source: source,
    utm_medium: source === "email" ? "email" : source === "mms" ? "sms" : "web",
    utm_campaign: OFFER_ID,
    utm_content: content,
  });
  return `${BOOKING_BASE}?${params.toString()}`;
}

const BOOKING_URL = bookingUrl("default", "hub");

// ----- Channels -----

type ChannelId = "landing" | "email" | "mms" | "carousel";

const CHANNELS: { id: ChannelId; label: string; sub: string }[] = [
  { id: "landing", label: "Landing page", sub: "/fathers-day" },
  { id: "email", label: "Email", sub: "Subject + HTML" },
  { id: "mms", label: "MMS", sub: "3 sends · 160 chars" },
  { id: "carousel", label: "IG carousel", sub: "4 slides · 1080×1350" },
];

// ----- Campaign brief data -----

const PILLARS = [
  {
    label: "Frame",
    body: "A gift he gives himself, so he can keep showing up for the people who count on him. He's the buyer, the recipient, and the beneficiary.",
  },
  {
    label: "Offer",
    body: "A 60-minute physician visit with same-day labs. One hour to recalibrate energy, focus, and presence. Book through June 30.",
  },
  {
    label: "Stakes",
    body: "Dads are the constant. The dividend on one hour of attention goes straight to his family, sharper dinners, more patience, more years.",
  },
  {
    label: "Close",
    body: "One CTA on every asset: BOOK YOUR FIRST VISIT, deep-linked to the booking page with the first-visit offer preselected.",
  },
];

// ============================================================
// Page
// ============================================================

function FathersDayCampaign() {
  const [channel, setChannel] = useState<ChannelId>("landing");

  return (
    <main className="fdc-root">
      <style>{css}</style>

      <header className="fdc-top">
        <div className="fdc-top-inner">
          <Link to="/social/fathers-day" className="fdc-back">
            ← Back to carousel
          </Link>
          <p className="fdc-kicker">Campaign package</p>
          <h1 className="fdc-title">Father's Day · Men's Wellness Centers</h1>
          <p className="fdc-lede">
            A reframed Father's Day campaign: not a gift you buy for him, but
            the gift he gives himself, one hour to recalibrate, so he can
            keep showing up for the people who count on him.
          </p>

          <dl className="fdc-meta">
            <div>
              <dt>Campaign</dt>
              <dd>Father's Day</dd>
            </div>
            <div>
              <dt>Offer ends</dt>
              <dd>{OFFER_END}</dd>
            </div>
            <div>
              <dt>Primary CTA</dt>
              <dd>Book your first visit</dd>
            </div>
            <div>
              <dt>CTA destination</dt>
              <dd style={{ fontFamily: "ui-monospace,monospace", fontSize: 12, letterSpacing: 0, textTransform: "none" }}>
                <a href={BOOKING_URL} target="_blank" rel="noreferrer" style={{ color: NAVY }}>
                  {BOOKING_URL}
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </header>

      <section className="fdc-pillars">
        {PILLARS.map((p) => (
          <article key={p.label} className="fdc-pillar">
            <p className="fdc-pillar-label">{p.label}</p>
            <p className="fdc-pillar-body">{p.body}</p>
          </article>
        ))}
      </section>

      <nav className="fdc-tabs" aria-label="Campaign channels">
        {CHANNELS.map((c) => (
          <button
            key={c.id}
            type="button"
            className="fdc-tab"
            data-active={channel === c.id}
            onClick={() => setChannel(c.id)}
          >
            <span className="fdc-tab-label">{c.label}</span>
            <span className="fdc-tab-sub">{c.sub}</span>
          </button>
        ))}
      </nav>

      <section className="fdc-stage">
        {channel === "landing" && <LandingPreview />}
        {channel === "email" && <EmailPreview />}
        {channel === "mms" && <MmsPreview />}
        {channel === "carousel" && <CarouselPreview />}
      </section>
    </main>
  );
}

// ============================================================
// Landing page preview
// ============================================================

function LandingPreview() {
  const html = useMemo(landingHtml, []);
  return (
    <div className="fdc-card">
      <div className="fdc-card-head">
        <div>
          <p className="fdc-card-kicker">Landing page</p>
          <h2>bookmwc.com/fathers-day</h2>
          <p className="fdc-card-sub">
            Single-purpose page. Hero, offer, what's included, social proof,
            FAQ, and one repeated CTA. Renders below in a 1280px frame.
          </p>
        </div>
        <CopyButton text={html} label="Copy HTML" />
      </div>
      <div className="fdc-browser">
        <div className="fdc-browser-bar">
          <span className="fdc-dot" />
          <span className="fdc-dot" />
          <span className="fdc-dot" />
          <div className="fdc-url">bookmwc.com/fathers-day</div>
        </div>
        <div className="fdc-browser-body">
          <div className="fdc-landing">
            <header className="lp-nav">
              <img src={WORDMARK} alt="Men's Wellness Centers" />
              <a className="lp-nav-cta" href={bookingUrl("nav", "landing")}>
                Book your first visit
              </a>
            </header>

            <section className="lp-hero">
              <div className="lp-hero-photo">
                <img src={HERO_PHOTO} alt="Father with his family at golden hour" />
              </div>
              <div className="lp-hero-copy">
                <p className="lp-eyebrow">Father's Day · Book by {OFFER_END}</p>
                <h1>
                  The gift is<br />
                  showing up.
                </h1>
                <p className="lp-sub">
                  One hour for you. The dividend goes to them. A 60-minute
                  visit with a physician, same-day labs, real answers,
                  a plan you can actually follow. So the version of you they
                  see at dinner is the one you want them to remember.
                </p>
                <div className="lp-cta-row">
                  <a className="lp-cta" href={bookingUrl("hero", "landing")}>
                    Book your first visit
                  </a>
                  <span className="lp-cta-meta">No insurance hoops · Locally owned</span>
                </div>
              </div>
            </section>

            <section className="lp-included">
              <h2>One hour. Three things they'll feel.</h2>
              <ul>
                <li>
                  <strong>Energy</strong>, for the Saturday morning, the late
                  meeting, the second half of the day.
                </li>
                <li>
                  <strong>Focus</strong>, sharper at dinner, sharper at work,
                  fewer things falling through the cracks.
                </li>
                <li>
                  <strong>Presence</strong>, patience on the hard days, room
                  for the small moments that actually count.
                </li>
                <li>
                  <strong>A real plan</strong>, physician-led, built on your
                  numbers, judgment-free.
                </li>
              </ul>
            </section>

            <section className="lp-stakes">
              <div className="lp-stakes-copy">
                <p className="lp-eyebrow">Why now</p>
                <h2>You are the constant. Act like it.</h2>
                <p>
                  Your family doesn't need another gadget. They need the
                  rested, focused, present version of you, at the dinner
                  table, on the trip, on the ordinary Tuesday. That starts
                  with one hour you keep putting off.
                </p>
              </div>
              <div className="lp-stakes-photo">
                <img src={STAKES_PHOTO} alt="Father present with the people who matter" />
              </div>
            </section>

            <section className="lp-faq">
              <h2>Frequently asked</h2>
              <details open>
                <summary>What's included in the first visit?</summary>
                <p>
                  A 60-minute one-on-one with a physician, same-day labs, and
                  a written plan you can act on. Book by {OFFER_END}; the
                  visit itself can be scheduled after.
                </p>
              </details>
              <details>
                <summary>Do I need to know which plan I want?</summary>
                <p>
                  No. Book the consult, the physician builds your plan with
                  you, based on what your labs actually say.
                </p>
              </details>
              <details>
                <summary>Is this a Father's Day promotion?</summary>
                <p>
                  Father's Day is the nudge, not the gimmick. No discount, no
                  gift card, just the moment to finally do the thing you've
                  been putting off.
                </p>
              </details>
            </section>

            <footer className="lp-foot">
              <div className="lp-foot-cta">
                <p className="lp-eyebrow">Last call</p>
                <h2>Book before {OFFER_END}.</h2>
                <a className="lp-cta" href={bookingUrl("footer-lastcall", "landing")}>
                  Book your first visit
                </a>
              </div>
              <div className="lp-foot-mark">
                <img src={WORDMARK_LIGHT} alt="Men's Wellness Centers" />
                <p>Physician-led · Same-day labs · Locally owned</p>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Email preview
// ============================================================

const EMAIL_SUBJECTS = [
  "This Father's Day, the gift is showing up.",
  "One hour for you. The dividend goes to them.",
  "The thing you've been putting off, book it.",
];

function EmailPreview() {
  return (
    <div className="fdc-card">
      <div className="fdc-card-head">
        <div>
          <p className="fdc-card-kicker">Email</p>
          <h2>Father's Day · Promo send</h2>
          <p className="fdc-card-sub">
            One hero email. Single CTA repeated twice. Renders cleanly in
            Gmail, Apple Mail, and Outlook (table layout, inline styles).
          </p>
        </div>
      </div>

      <div className="fdc-email-meta">
        <div>
          <p className="fdc-card-kicker">From</p>
          <p>Men's Wellness Centers &lt;hello@bookmwc.com&gt;</p>
        </div>
        <div>
          <p className="fdc-card-kicker">Preheader</p>
          <p>One hour for you. The dividend goes to them. Book your first visit by {OFFER_END}.</p>
        </div>
      </div>

      <div className="fdc-card-sub" style={{ marginBottom: 12 }}>
        <strong style={{ color: ORANGE }}>Subject A/B/C:</strong>
        <ul className="fdc-subject-list">
          {EMAIL_SUBJECTS.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>

      <div className="fdc-email-frame">
        <iframe
          title="Father's Day email preview"
          srcDoc={emailPreviewHtml()}
          style={{ width: "100%", height: 1100, border: 0, display: "block" }}
        />
      </div>
    </div>
  );
}

// ============================================================
// MMS preview
// ============================================================

type MmsMsg = {
  label: string;
  send: string;
  body: string;
  media: string;
};

// Short links route through the booking page with the offer preselected.
// In production these are CNAMEd to bookmwc.com/go/<slug> -> bookingUrl(...).
const MMS_MESSAGES: MmsMsg[] = [
  {
    label: "Send 1 · Warm-up",
    send: "Mon, Jun 8 · 10:00 AM local",
    body:
      "MWC: Father's Day reminder. The best gift this month is the version of you that's rested, focused, and present. One hour. Book your first visit: book.menswellnesscenters.com/fathers-day-2026 Reply STOP to opt out.",
    media: HERO_PHOTO,
  },
  {
    label: "Send 2 · Mid",
    send: "Sat, Jun 13 · 9:00 AM local",
    body:
      "MWC: Half the guys we see say the same thing, \"I should've done this sooner.\" One hour with a physician. Book your first visit before 6/30: book.menswellnesscenters.com/fathers-day-2026 Reply STOP to opt out.",
    media: PROOF_PHOTO,
  },
  {
    label: "Send 3 · Last call",
    send: "Thu, Jun 26 · 6:00 PM local",
    body:
      "MWC: Final reminder, first-visit slots close 6/30. One hour for you. The dividend goes to your family. book.menswellnesscenters.com/fathers-day-2026 Reply STOP to opt out.",
    media: CLOSE_PHOTO,
  },
];

// Resolved destinations for the MMS short links, shown under each bubble so
// you can verify the redirect target preselects the right offer.
const MMS_DESTINATIONS: Record<string, string> = {
  "Send 1 · Warm-up": bookingUrl("mms-warm", "mms"),
  "Send 2 · Mid": bookingUrl("mms-mid", "mms"),
  "Send 3 · Last call": bookingUrl("mms-last", "mms"),
};

function MmsPreview() {
  return (
    <div className="fdc-card">
      <div className="fdc-card-head">
        <div>
          <p className="fdc-card-kicker">MMS · 3-send sequence</p>
          <h2>Father's Day · SMS list</h2>
          <p className="fdc-card-sub">
            Each send: branded prefix (MWC), one idea, a tracked short link, and
            STOP language. Every short link resolves to the same booking page
            with the Father's Day first-visit offer preselected.
          </p>
        </div>
      </div>

      <div className="fdc-mms-grid">
        {MMS_MESSAGES.map((m) => {
          const chars = m.body.length;
          const segments = Math.max(1, Math.ceil(chars / 160));
          return (
            <article key={m.label} className="fdc-mms">
              <header className="fdc-mms-head">
                <p className="fdc-card-kicker">{m.label}</p>
                <p className="fdc-mms-when">{m.send}</p>
              </header>

              <div className="fdc-phone">
                <div className="fdc-phone-notch" />
                <div className="fdc-phone-screen">
                  <div className="fdc-phone-from">Men's Wellness Centers</div>
                  <div className="fdc-bubble">
                    <img src={m.media} alt="" />
                    <p>{m.body}</p>
                  </div>
                </div>
              </div>

              <p className="fdc-mms-dest">
                Resolves to:{" "}
                <a href={MMS_DESTINATIONS[m.label]} target="_blank" rel="noreferrer">
                  {MMS_DESTINATIONS[m.label]}
                </a>
              </p>

              <footer className="fdc-mms-foot">
                <span>{chars} chars</span>
                <span>{segments} segment{segments > 1 ? "s" : ""}</span>
                <CopyButton text={m.body} label="Copy" />
              </footer>
            </article>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
// Carousel preview (link out)
// ============================================================

function CarouselPreview() {
  return (
    <div className="fdc-card">
      <div className="fdc-card-head">
        <div>
          <p className="fdc-card-kicker">Instagram carousel</p>
          <h2>4 slides · 1080 × 1350</h2>
          <p className="fdc-card-sub">
            The carousel is the social anchor of the campaign. It lives in the
            dedicated builder where you can export PNGs slide-by-slide.
          </p>
        </div>
        <Link to="/social/fathers-day" className="fdc-cta">
          Open carousel builder →
        </Link>
      </div>

      <div className="fdc-carousel-grid">
        {[
          { n: 1, photo: HERO_PHOTO, hero: "SHOWING UP." },
          { n: 2, photo: PROOF_PHOTO, hero: "60 MINUTES." },
          { n: 3, photo: STAKES_PHOTO, hero: "THE CONSTANT." },
          { n: 4, photo: CLOSE_PHOTO, hero: "BOOK." },
        ].map((s) => (
          <figure key={s.n} className="fdc-thumb">
            <img src={s.photo} alt={`Slide ${s.n}`} />
            <figcaption>
              <span>Slide {s.n} / 4</span>
              <strong>{s.hero}</strong>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// Helpers
// ============================================================

function CopyButton({ text, label }: { text: string; label: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className="fdc-copy"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setDone(true);
          setTimeout(() => setDone(false), 1600);
        } catch {
          /* noop */
        }
      }}
    >
      {done ? "Copied ✓" : label}
    </button>
  );
}

// ============================================================
// Email HTML (table layout, inline styles)
// ============================================================

function emailPreviewHtml() {
  return `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Father's Day · MWC</title></head>
<body style="margin:0;padding:0;background:${CREAM};font-family:Helvetica,Arial,sans-serif;color:${NAVY};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">One hour for you. The dividend goes to them. Book your first visit by ${OFFER_END}.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${CREAM};">
  <tr><td align="center" style="padding:24px;">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:100%;background:#ffffff;border:1px solid #e7e3dc;">
      <tr><td style="padding:24px 28px;border-bottom:1px solid #efece6;">
        <img src="https://mwcbrand.lovable.app${WORDMARK}" alt="Men's Wellness Centers" height="32" style="height:32px;display:block;">
      </td></tr>
      <tr><td style="padding:0;">
        <img src="https://mwcbrand.lovable.app${HERO_PHOTO}" alt="" width="600" style="width:100%;display:block;height:auto;">
      </td></tr>
      <tr><td style="padding:32px 28px 8px 28px;">
        <p style="margin:0 0 12px 0;font-size:12px;letter-spacing:.22em;text-transform:uppercase;color:${ORANGE};font-weight:700;">Father's Day · Book by ${OFFER_END}</p>
        <h1 style="margin:0 0 16px 0;font-family:'Oswald',Helvetica,Arial,sans-serif;font-size:40px;line-height:1.05;letter-spacing:.01em;text-transform:uppercase;color:${NAVY};">The gift is showing up.</h1>
        <p style="margin:0 0 18px 0;font-size:17px;line-height:1.55;color:${NAVY};">This Father's Day, the most useful thing you'll do for your family is the thing you keep putting off for yourself.</p>
        <p style="margin:0 0 24px 0;font-size:17px;line-height:1.55;color:${NAVY};">One hour with a physician. Same-day labs. A real plan. So the version of you they see at dinner is rested, focused, and present, not running on fumes.</p>
      </td></tr>
      <tr><td align="center" style="padding:8px 28px 28px 28px;">
        <a href="${bookingUrl("email-hero", "email")}" style="display:inline-block;background:${ORANGE};color:#ffffff;text-decoration:none;font-family:'Oswald',Helvetica,Arial,sans-serif;font-weight:700;letter-spacing:.16em;text-transform:uppercase;font-size:15px;padding:18px 28px;border-radius:4px;">Book your first visit</a>
      </td></tr>
      <tr><td style="padding:8px 28px 28px 28px;border-top:1px solid #efece6;">
        <h2 style="margin:24px 0 12px 0;font-family:'Oswald',Helvetica,Arial,sans-serif;font-size:22px;letter-spacing:.05em;text-transform:uppercase;color:${NAVY};">One hour. Three things they'll feel.</h2>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr><td style="padding:6px 0;font-size:15px;line-height:1.5;color:${NAVY};">• <strong>Energy</strong>, for the second half of the day, not just the first.</td></tr>
          <tr><td style="padding:6px 0;font-size:15px;line-height:1.5;color:${NAVY};">• <strong>Focus</strong>, sharper at dinner, sharper at work, fewer things dropped.</td></tr>
          <tr><td style="padding:6px 0;font-size:15px;line-height:1.5;color:${NAVY};">• <strong>Presence</strong>, patience on the hard days, room for the small moments.</td></tr>
          <tr><td style="padding:6px 0;font-size:15px;line-height:1.5;color:${NAVY};">• <strong>A real plan</strong>, physician-led, built on your numbers, judgment-free.</td></tr>
        </table>
      </td></tr>
      <tr><td style="padding:0 28px 32px 28px;">
        <p style="margin:0 0 18px 0;font-size:15px;line-height:1.6;color:${INK_SOFT};">You are the constant in their lives. One hour is the smallest possible investment in keeping it that way. Window closes ${OFFER_END}.</p>
        <a href="${bookingUrl("email-secondary", "email")}" style="display:inline-block;background:${ORANGE};color:#ffffff;text-decoration:none;font-family:'Oswald',Helvetica,Arial,sans-serif;font-weight:700;letter-spacing:.16em;text-transform:uppercase;font-size:14px;padding:14px 22px;border-radius:4px;">Book your first visit</a>
      </td></tr>
      <tr><td style="padding:24px 28px;background:${NAVY};color:${CREAM};">
        <img src="https://mwcbrand.lovable.app${WORDMARK_LIGHT}" alt="Men's Wellness Centers" height="26" style="height:26px;display:block;margin-bottom:10px;">
        <p style="margin:0;font-size:12px;line-height:1.5;color:${CREAM};opacity:.85;">Physician-led · Same-day labs · Locally owned. Offer ends ${OFFER_END}. <a href="{{unsubscribe_url}}" style="color:${CREAM};text-decoration:underline;">Unsubscribe</a>.</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;
}

// ============================================================
// Landing HTML (for the copy-to-clipboard helper)
// ============================================================

function landingHtml() {
  return `<!-- bookmwc.com/fathers-day · paste into your site builder -->
<section class="fd-hero">
  <h1>The gift is showing up.</h1>
  <p>One hour for you. The dividend goes to them. A 60-minute physician visit with same-day labs and a plan you can actually follow.</p>
  <a class="fd-cta" href="${bookingUrl("hero", "landing")}">Book your first visit</a>
</section>
<section class="fd-included">
  <h2>One hour. Three things they'll feel.</h2>
  <ul>
    <li><strong>Energy</strong>, for the second half of the day, not just the first.</li>
    <li><strong>Focus</strong>, sharper at dinner, sharper at work.</li>
    <li><strong>Presence</strong>, patience on the hard days, room for the small ones.</li>
    <li><strong>A real plan</strong>, physician-led, judgment-free.</li>
  </ul>
</section>
<section class="fd-foot">
  <h2>Book before ${OFFER_END}.</h2>
  <a class="fd-cta" href="${bookingUrl("footer-lastcall", "landing")}">Book your first visit</a>
</section>`;
}

// ============================================================
// Styles
// ============================================================

const css = `
.fdc-root{min-height:100vh;background:${CREAM};color:${NAVY};font-family:'Montserrat',system-ui,sans-serif;padding:48px 24px 96px;}
.fdc-top-inner{max-width:1200px;margin:0 auto;}
.fdc-back{display:inline-block;font-size:13px;letter-spacing:.06em;color:${INK_SOFT};text-decoration:none;margin-bottom:24px;}
.fdc-back:hover{color:${ORANGE};}
.fdc-kicker{margin:0 0 10px;font-size:12px;font-weight:600;letter-spacing:.28em;text-transform:uppercase;color:${ORANGE};}
.fdc-title{margin:0 0 14px;font-family:'Oswald',sans-serif;font-weight:600;letter-spacing:.02em;text-transform:uppercase;font-size:clamp(36px,5vw,64px);}
.fdc-lede{max-width:720px;font-size:17px;line-height:1.6;color:${INK_SOFT};margin:0 0 28px;}
.fdc-meta{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:18px;margin:0 0 40px;padding:20px;border:1px solid #e2ddd2;border-radius:6px;background:#fff;}
.fdc-meta div{margin:0;}
.fdc-meta dt{font-size:11px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:${INK_SOFT};margin-bottom:4px;}
.fdc-meta dd{margin:0;font-family:'Oswald',sans-serif;font-size:18px;letter-spacing:.04em;text-transform:uppercase;color:${NAVY};}

.fdc-pillars{max-width:1200px;margin:0 auto 40px;display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;}
.fdc-pillar{background:#fff;border:1px solid #e2ddd2;border-left:3px solid ${ORANGE};padding:18px 20px;border-radius:4px;}
.fdc-pillar-label{margin:0 0 8px;font-family:'Oswald',sans-serif;font-size:13px;letter-spacing:.18em;text-transform:uppercase;color:${ORANGE};}
.fdc-pillar-body{margin:0;font-size:14px;line-height:1.55;color:${NAVY};}

.fdc-tabs{max-width:1200px;margin:0 auto 24px;display:flex;flex-wrap:wrap;gap:8px;border-bottom:1px solid #d9d3c5;padding-bottom:0;}
.fdc-tab{appearance:none;background:transparent;border:none;border-bottom:3px solid transparent;padding:14px 18px;cursor:pointer;text-align:left;color:${INK_SOFT};font-family:inherit;}
.fdc-tab[data-active="true"]{color:${NAVY};border-bottom-color:${ORANGE};}
.fdc-tab-label{display:block;font-family:'Oswald',sans-serif;font-size:15px;letter-spacing:.14em;text-transform:uppercase;}
.fdc-tab-sub{display:block;font-size:11px;letter-spacing:.04em;margin-top:2px;opacity:.7;}

.fdc-stage{max-width:1200px;margin:0 auto;}
.fdc-card{background:#fff;border:1px solid #e2ddd2;border-radius:6px;padding:24px;}
.fdc-card-head{display:flex;justify-content:space-between;gap:24px;align-items:flex-start;margin-bottom:20px;flex-wrap:wrap;}
.fdc-card-head h2{margin:4px 0 6px;font-family:'Oswald',sans-serif;font-size:24px;letter-spacing:.04em;text-transform:uppercase;}
.fdc-card-kicker{margin:0;font-size:11px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:${ORANGE};}
.fdc-card-sub{margin:0;font-size:14px;line-height:1.55;color:${INK_SOFT};max-width:640px;}
.fdc-copy{font-family:'Oswald',sans-serif;font-weight:600;font-size:12px;letter-spacing:.16em;text-transform:uppercase;padding:10px 16px;border-radius:4px;border:1px solid ${NAVY};background:transparent;color:${NAVY};cursor:pointer;flex-shrink:0;}
.fdc-copy:hover{background:${NAVY};color:${CREAM};}
.fdc-cta{display:inline-block;background:${ORANGE};color:${CREAM};text-decoration:none;font-family:'Oswald',sans-serif;font-weight:700;letter-spacing:.14em;text-transform:uppercase;font-size:13px;padding:12px 18px;border-radius:4px;}
.fdc-cta:hover{filter:brightness(.95);}

/* Browser chrome for landing */
.fdc-browser{border:1px solid #d9d3c5;border-radius:8px;overflow:hidden;background:${CREAM};}
.fdc-browser-bar{display:flex;align-items:center;gap:8px;padding:10px 14px;background:#ece8df;border-bottom:1px solid #d9d3c5;}
.fdc-dot{width:10px;height:10px;border-radius:999px;background:#c8c1b1;}
.fdc-url{margin-left:12px;font-family:ui-monospace,monospace;font-size:12px;color:${INK_SOFT};background:#fff;padding:4px 10px;border-radius:999px;border:1px solid #d9d3c5;}
.fdc-browser-body{max-height:760px;overflow:auto;background:${CREAM};}

/* Landing page (inside browser) */
.fdc-landing{background:${CREAM};color:${NAVY};font-family:'Montserrat',sans-serif;}
.lp-nav{display:flex;justify-content:space-between;align-items:center;padding:20px 32px;background:#fff;border-bottom:1px solid #ebe6da;}
.lp-nav img{height:28px;width:auto;}
.lp-nav-cta{font-family:'Oswald',sans-serif;font-weight:600;letter-spacing:.14em;text-transform:uppercase;font-size:12px;background:${ORANGE};color:${CREAM};padding:10px 16px;border-radius:4px;text-decoration:none;}
.lp-hero{display:grid;grid-template-columns:1.1fr 1fr;gap:0;align-items:stretch;}
.lp-hero-photo{height:480px;overflow:hidden;}
.lp-hero-photo img{width:100%;height:100%;object-fit:cover;object-position:55% 35%;display:block;}
.lp-hero-copy{padding:64px 48px;display:flex;flex-direction:column;justify-content:center;gap:18px;}
.lp-eyebrow{margin:0;font-size:11px;font-weight:700;letter-spacing:.24em;text-transform:uppercase;color:${ORANGE};}
.lp-hero-copy h1{margin:0;font-family:'Oswald',sans-serif;font-weight:700;font-size:54px;line-height:1.02;letter-spacing:.005em;text-transform:uppercase;}
.lp-sub{margin:0;font-size:17px;line-height:1.55;color:${INK_SOFT};}
.lp-cta-row{display:flex;align-items:center;gap:14px;flex-wrap:wrap;margin-top:6px;}
.lp-cta{display:inline-block;background:${ORANGE};color:${CREAM};text-decoration:none;font-family:'Oswald',sans-serif;font-weight:700;letter-spacing:.16em;text-transform:uppercase;font-size:14px;padding:16px 24px;border-radius:4px;}
.lp-cta-meta{font-size:12px;color:${INK_SOFT};letter-spacing:.04em;}

.lp-included{padding:64px 48px;background:#fff;border-top:1px solid #ebe6da;border-bottom:1px solid #ebe6da;}
.lp-included h2{margin:0 0 24px;font-family:'Oswald',sans-serif;font-size:28px;letter-spacing:.04em;text-transform:uppercase;}
.lp-included ul{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(2,1fr);gap:14px 28px;}
.lp-included li{position:relative;padding-left:22px;font-size:15px;line-height:1.55;}
.lp-included li:before{content:"";position:absolute;left:0;top:9px;width:8px;height:8px;border-radius:999px;background:${ORANGE};}

.lp-stakes{display:grid;grid-template-columns:1fr 1fr;gap:0;align-items:stretch;background:${CREAM};}
.lp-stakes-copy{padding:64px 48px;display:flex;flex-direction:column;justify-content:center;gap:14px;}
.lp-stakes-copy h2{margin:0;font-family:'Oswald',sans-serif;font-size:36px;letter-spacing:.02em;text-transform:uppercase;line-height:1.05;}
.lp-stakes-copy p{margin:0;font-size:15px;line-height:1.6;color:${INK_SOFT};}
.lp-stakes-photo{height:360px;overflow:hidden;}
.lp-stakes-photo img{width:100%;height:100%;object-fit:cover;object-position:55% 42%;display:block;}

.lp-faq{padding:48px 48px;background:#fff;border-top:1px solid #ebe6da;}
.lp-faq h2{margin:0 0 18px;font-family:'Oswald',sans-serif;font-size:24px;letter-spacing:.04em;text-transform:uppercase;}
.lp-faq details{border-top:1px solid #ebe6da;padding:14px 0;}
.lp-faq details:last-of-type{border-bottom:1px solid #ebe6da;}
.lp-faq summary{font-family:'Oswald',sans-serif;font-size:15px;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;}
.lp-faq p{margin:10px 0 0;font-size:14px;line-height:1.55;color:${INK_SOFT};}

.lp-foot{display:grid;grid-template-columns:1fr 1fr;background:${NAVY};color:${CREAM};}
.lp-foot-cta{padding:48px;display:flex;flex-direction:column;justify-content:center;gap:14px;}
.lp-foot-cta h2{margin:0;font-family:'Oswald',sans-serif;font-size:32px;letter-spacing:.04em;text-transform:uppercase;}
.lp-foot-cta .lp-eyebrow{color:${ORANGE};}
.lp-foot-mark{padding:48px;border-left:1px solid rgba(245,243,240,.12);display:flex;flex-direction:column;justify-content:center;gap:12px;}
.lp-foot-mark img{height:32px;width:auto;}
.lp-foot-mark p{margin:0;font-size:13px;letter-spacing:.06em;opacity:.8;}

/* Email */
.fdc-email-meta{display:grid;grid-template-columns:1fr 2fr;gap:24px;padding:18px;background:${CREAM};border-radius:4px;margin-bottom:16px;}
.fdc-email-meta p{margin:4px 0 0;font-size:13px;color:${NAVY};}
.fdc-subject-list{margin:8px 0 0;padding-left:20px;}
.fdc-subject-list li{font-size:14px;line-height:1.6;color:${NAVY};}
.fdc-email-frame{border:1px solid #d9d3c5;border-radius:6px;overflow:hidden;background:${CREAM};}

/* MMS */
.fdc-mms-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;}
.fdc-mms{background:${CREAM};border:1px solid #e2ddd2;border-radius:8px;padding:18px;display:flex;flex-direction:column;gap:12px;}
.fdc-mms-head{display:flex;justify-content:space-between;align-items:baseline;gap:10px;flex-wrap:wrap;}
.fdc-mms-when{margin:0;font-size:12px;color:${INK_SOFT};}
.fdc-phone{background:#1c1c1e;border-radius:24px;padding:14px 12px 18px;position:relative;color:#fff;}
.fdc-phone-notch{width:60px;height:5px;background:#3a3a3c;border-radius:999px;margin:0 auto 10px;}
.fdc-phone-screen{display:flex;flex-direction:column;gap:6px;}
.fdc-phone-from{text-align:center;font-size:11px;color:#9a9a9a;margin-bottom:4px;}
.fdc-bubble{background:#2c2c2e;border-radius:16px;overflow:hidden;max-width:88%;}
.fdc-bubble img{width:100%;height:140px;object-fit:cover;display:block;}
.fdc-bubble p{margin:0;padding:10px 12px;font-size:13px;line-height:1.4;color:#fff;}
.fdc-mms-foot{display:flex;justify-content:space-between;align-items:center;gap:10px;font-size:11px;color:${INK_SOFT};font-family:ui-monospace,monospace;}
.fdc-mms-dest{margin:0;font-size:11px;font-family:ui-monospace,monospace;color:${INK_SOFT};word-break:break-all;}
.fdc-mms-dest a{color:${NAVY};text-decoration:underline;}

/* Carousel */
.fdc-carousel-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px;}
.fdc-thumb{margin:0;background:${CREAM};border:1px solid #e2ddd2;border-radius:6px;overflow:hidden;}
.fdc-thumb img{width:100%;aspect-ratio:4/5;object-fit:cover;display:block;}
.fdc-thumb figcaption{padding:10px 12px;display:flex;justify-content:space-between;align-items:baseline;}
.fdc-thumb figcaption span{font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:${INK_SOFT};}
.fdc-thumb figcaption strong{font-family:'Oswald',sans-serif;font-size:14px;letter-spacing:.06em;}

@media(max-width:780px){
  .lp-hero,.lp-stakes,.lp-foot{grid-template-columns:1fr;}
  .lp-included ul{grid-template-columns:1fr;}
  .lp-hero-photo,.lp-stakes-photo{height:280px;}
  .lp-hero-copy,.lp-stakes-copy,.lp-foot-cta,.lp-foot-mark,.lp-included,.lp-faq{padding:36px 24px;}
}
`;
