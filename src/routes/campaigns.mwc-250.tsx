import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import slide1 from "@/assets/mwc-250/slide-1.jpg";
import slide2 from "@/assets/mwc-250/slide-2.jpg";
import slide3 from "@/assets/mwc-250/slide-3.jpg";
import slide4 from "@/assets/mwc-250/slide-4.jpg";

export const Route = createFileRoute("/campaigns/mwc-250")({
  head: () => ({
    meta: [
      { title: "MWC 250 · 4th of July Campaign · Men's Wellness Centers" },
      {
        name: "description",
        content:
          "America's 250th, co-branded with the film Young Washington. Landing page, email, MMS, and Instagram carousel for the MWC 250 Independence Day campaign.",
      },
      { property: "og:title", content: "MWC 250 · 4th of July Campaign" },
      {
        property: "og:description",
        content:
          "250 years of showing up. Landing page, email, MMS, and IG carousel, fully assembled.",
      },
      { property: "og:url", content: "https://mwcbrand.lovable.app/campaigns/mwc-250" },
    ],
    links: [{ rel: "canonical", href: "https://mwcbrand.lovable.app/campaigns/mwc-250" }],
  }),
  component: MwcCampaign,
});

const CREAM = "#f5f3f0";
const NAVY = "#0b1029";
const RED = "#b9261e";
const GOLD = "#c9a44a";
const INK_SOFT = "#4a4e66";

const WORDMARK =
  "/__l5e/assets-v1/d8a9db5f-130d-40a6-bc53-ed4bb5150d26/Navy_on_Transparent__wordmark_2174x500.png";
const WORDMARK_LIGHT =
  "/__l5e/assets-v1/d0018746-8b08-4844-a04e-8ed1b2a745db/White_on_Navy__wordmark_2174x500.png";

const HERO_PHOTO = slide1;
const BRIDGE_PHOTO = slide2;
const STAKES_PHOTO = slide3;
const CLOSE_PHOTO = slide4;

const OFFER_END = "July 4";
const FILM_RELEASE = "July 3, 2026";
const BOOKING_BASE = "/mwc-250";
const OFFER_ID = "mwc-250";

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

type ChannelId = "landing" | "email" | "mms" | "carousel";

const CHANNELS: { id: ChannelId; label: string; sub: string }[] = [
  { id: "landing", label: "Landing page", sub: BOOKING_BASE },
  { id: "email", label: "Email", sub: "Subject options + preview" },
  { id: "mms", label: "MMS", sub: "3 sends · 160 chars" },
  { id: "carousel", label: "IG carousel", sub: "4 slides · 1080×1350" },
];

const PILLARS = [
  {
    label: "Frame",
    body: "America's 250th, in partnership with the film Young Washington (in theaters July 3). 250 years of American men showing up, for family, for neighbors, for the next 250.",
  },
  {
    label: "Bridge",
    body: "Washington was 22 when he led men through the Ohio wilderness. You're not 22, and you don't need to be. You just need to feel like you can keep showing up.",
  },
  {
    label: "Offer",
    body: "A 60-minute physician visit with same-day labs. One hour to recalibrate energy, focus, and presence. Book through July 4.",
  },
  {
    label: "Close",
    body: "One CTA on every asset: BOOK YOUR FIRST VISIT, deep-linked to /mwc-250 with the campaign offer preselected.",
  },
];

function MwcCampaign() {
  const [channel, setChannel] = useState<ChannelId>("landing");

  return (
    <main className="ywc-root">
      <style>{css}</style>

      <header className="ywc-top">
        <div className="ywc-top-inner">
          <Link to="/social/mwc-250" className="ywc-back">
            ← Open carousel builder
          </Link>
          <p className="ywc-kicker">Campaign package · Independence Day 2026</p>
          <h1 className="ywc-title">MWC 250 · Young Washington</h1>
          <p className="ywc-lede">
            America's semiquincentennial, co-branded with the film
            <em> Young Washington</em>. Same brand logic as the rest of the
            year, with patriotic dressing: 250 years of American men showing
            up, and one hour that keeps you in the game for the next 250.
          </p>

          <div className="ywc-cobrand" role="group" aria-label="Co-brand bar">
            <img src={WORDMARK} alt="Men's Wellness Centers" className="ywc-cobrand-mark" />
            <span className="ywc-cobrand-x" aria-hidden>×</span>
            <div className="ywc-cobrand-film">
              <span className="ywc-cobrand-film-name">YOUNG WASHINGTON</span>
              <span className="ywc-cobrand-film-meta">In theaters {FILM_RELEASE}</span>
            </div>
          </div>

          <dl className="ywc-meta">
            <div>
              <dt>Campaign</dt>
              <dd>MWC 250</dd>
            </div>
            <div>
              <dt>Window</dt>
              <dd>Now → {OFFER_END}</dd>
            </div>
            <div>
              <dt>Primary CTA</dt>
              <dd>Book your first visit</dd>
            </div>
            <div>
              <dt>CTA destination</dt>
              <dd style={{ fontFamily: "ui-monospace,monospace", fontSize: 12, letterSpacing: 0, textTransform: "none" }}>
                <a href={BOOKING_URL} style={{ color: NAVY }}>{BOOKING_URL}</a>
              </dd>
            </div>
          </dl>
        </div>
      </header>

      <section className="ywc-pillars">
        {PILLARS.map((p) => (
          <article key={p.label} className="ywc-pillar">
            <p className="ywc-pillar-label">{p.label}</p>
            <p className="ywc-pillar-body">{p.body}</p>
          </article>
        ))}
      </section>

      <nav className="ywc-tabs" aria-label="Campaign channels">
        {CHANNELS.map((c) => (
          <button
            key={c.id}
            type="button"
            className="ywc-tab"
            data-active={channel === c.id}
            onClick={() => setChannel(c.id)}
          >
            <span className="ywc-tab-label">{c.label}</span>
            <span className="ywc-tab-sub">{c.sub}</span>
          </button>
        ))}
      </nav>

      <section className="ywc-stage">
        {channel === "landing" && <LandingPreview />}
        {channel === "email" && <EmailPreview />}
        {channel === "mms" && <MmsPreview />}
        {channel === "carousel" && <CarouselPreview />}
      </section>
    </main>
  );
}

function LandingPreview() {
  return (
    <div className="ywc-card">
      <div className="ywc-card-head">
        <div>
          <p className="ywc-card-kicker">Landing page</p>
          <h2>bookmwc.com{BOOKING_BASE}</h2>
          <p className="ywc-card-sub">
            Single-purpose page. Co-brand bar, hero, the bridge to the film,
            what's included, and one repeated CTA. Rendered below in a
            browser frame.
          </p>
        </div>
      </div>
      <div className="ywc-browser">
        <div className="ywc-browser-bar">
          <span className="ywc-dot" />
          <span className="ywc-dot" />
          <span className="ywc-dot" />
          <div className="ywc-url">bookmwc.com{BOOKING_BASE}</div>
        </div>
        <div className="ywc-browser-body">
          <div className="ywc-landing">
            <header className="lp-nav">
              <img src={WORDMARK} alt="Men's Wellness Centers" />
              <a className="lp-nav-cta" href={bookingUrl("nav", "landing")}>
                Book your first visit
              </a>
            </header>

            <div className="lp-cobrand">
              <span className="lp-cobrand-eyebrow">MWC × Young Washington</span>
              <span className="lp-cobrand-meta">In theaters {FILM_RELEASE}</span>
            </div>

            <section className="lp-hero">
              <div className="lp-hero-photo">
                <img src={HERO_PHOTO} alt="Modern American father at dawn with the flag behind him" />
              </div>
              <div className="lp-hero-copy">
                <p className="lp-eyebrow">MWC 250 · Book by {OFFER_END}</p>
                <h1>
                  250 years of<br />
                  showing up.
                </h1>
                <p className="lp-sub">
                  A 60-minute visit with a physician, same-day labs, real
                  answers, a plan you can actually follow. So the version
                  of you at the cookout, on the drive, on the ordinary
                  Tuesday in August is the one your family counts on.
                </p>
                <div className="lp-cta-row">
                  <a className="lp-cta" href={bookingUrl("hero", "landing")}>
                    Book your first visit
                  </a>
                  <span className="lp-cta-meta">No insurance hoops · Locally owned</span>
                </div>
              </div>
            </section>

            <section className="lp-bridge">
              <div className="lp-bridge-photo">
                <img src={BRIDGE_PHOTO} alt="Painterly portrait of a young Revolutionary-era rider at dawn" />
              </div>
              <div className="lp-bridge-copy">
                <p className="lp-eyebrow">The bridge</p>
                <h2>At 22, he was already moving.</h2>
                <p>
                  Washington was 22 when he led men through the Ohio
                  wilderness. You're not 22. You don't need to be. You just
                  need to feel like the man who can show up for the people
                  who count on him, this week, this season, the next
                  250 years of ordinary Tuesdays.
                </p>
                <p className="lp-bridge-credit">
                  In partnership with <strong>Young Washington</strong>, in
                  theaters {FILM_RELEASE}.
                </p>
              </div>
            </section>

            <section className="lp-included">
              <h2>One hour. Three things they'll feel.</h2>
              <ul>
                <li>
                  <strong>Energy</strong>, for the second half of the day,
                  not just the first.
                </li>
                <li>
                  <strong>Focus</strong>, sharper at dinner, sharper at work,
                  fewer things falling through.
                </li>
                <li>
                  <strong>Presence</strong>, patience on the hard days, room
                  for the small moments.
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
                  Your family doesn't need another flag-themed mug. They
                  need the rested, focused, present version of you, at the
                  cookout, in the car, on the ordinary Tuesday. That
                  starts with one hour you keep putting off.
                </p>
              </div>
              <div className="lp-stakes-photo">
                <img src={STAKES_PHOTO} alt="Father and son laughing on a small-town main street" />
              </div>
            </section>

            <section className="lp-faq">
              <h2>Frequently asked</h2>
              <details open>
                <summary>What's included in the first visit?</summary>
                <p>
                  A 60-minute one-on-one with a physician, same-day labs,
                  and a written plan you can act on. Book by {OFFER_END};
                  the visit itself can be scheduled after.
                </p>
              </details>
              <details>
                <summary>What's the deal with Young Washington?</summary>
                <p>
                  It's the new film about a young George Washington, in
                  theaters {FILM_RELEASE}. We're co-branded for the 250th
                  because the through-line is the same one our patients
                  live: show up, do the next right thing, repeat.
                </p>
              </details>
              <details>
                <summary>Is this a 4th of July promotion?</summary>
                <p>
                  Independence Day is the nudge, not the gimmick. No
                  discount, no gift card, just the moment to finally do
                  the thing you've been putting off.
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
                <p className="lp-foot-cobrand">
                  In partnership with <strong>Young Washington</strong> ·
                  In theaters {FILM_RELEASE}
                </p>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}

const EMAIL_SUBJECTS = [
  "250 years of showing up. Your hour is next.",
  "Young Washington was 22. You don't need to be.",
  "Independence Day, the nudge you've been waiting for.",
];

function EmailPreview() {
  const html = useMemo(emailPreviewHtml, []);
  return (
    <div className="ywc-card">
      <div className="ywc-card-head">
        <div>
          <p className="ywc-card-kicker">Email</p>
          <h2>MWC 250 · Hero send</h2>
          <p className="ywc-card-sub">
            One hero email. Co-brand bar at top, single CTA repeated twice.
            Renders cleanly in Gmail, Apple Mail, and Outlook.
          </p>
        </div>
      </div>

      <div className="ywc-email-meta">
        <div>
          <p className="ywc-card-kicker">From</p>
          <p>Men's Wellness Centers &lt;hello@bookmwc.com&gt;</p>
        </div>
        <div>
          <p className="ywc-card-kicker">Preheader</p>
          <p>250 years of showing up. One hour for the next 250. Book by {OFFER_END}.</p>
        </div>
      </div>

      <div className="ywc-card-sub" style={{ marginBottom: 12 }}>
        <strong style={{ color: RED }}>Subject A/B/C:</strong>
        <ul className="ywc-subject-list">
          {EMAIL_SUBJECTS.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>

      <div className="ywc-email-frame">
        <iframe
          title="MWC 250 email preview"
          srcDoc={html}
          style={{ width: "100%", height: 1180, border: 0, display: "block" }}
        />
      </div>
    </div>
  );
}

type MmsMsg = {
  label: string;
  send: string;
  body: string;
  media: string;
};

const MMS_MESSAGES: MmsMsg[] = [
  {
    label: "Send 1 · Warm-up",
    send: "Mon, Jun 22 · 10:00 AM local",
    body:
      "MWC: America's 250th this July. 250 years of men showing up. One hour with a physician keeps you in the game for the next stretch. Book your first visit: bookmwc.com/mwc-250 Reply STOP to opt out.",
    media: HERO_PHOTO,
  },
  {
    label: "Send 2 · Mid",
    send: "Mon, Jun 29 · 9:00 AM local",
    body:
      "MWC: Young Washington (in theaters 7/3) was 22 when he led men through the wilderness. You don't need to be 22, just back in the chair. bookmwc.com/mwc-250 Reply STOP to opt out.",
    media: BRIDGE_PHOTO,
  },
  {
    label: "Send 3 · Last call",
    send: "Thu, Jul 3 · 6:00 PM local",
    body:
      "MWC: Final reminder, first-visit window closes 7/4. One hour for you. The dividend goes to your family for the next 250. bookmwc.com/mwc-250 Reply STOP to opt out.",
    media: CLOSE_PHOTO,
  },
];

const MMS_DESTINATIONS: Record<string, string> = {
  "Send 1 · Warm-up": bookingUrl("mms-warm", "mms"),
  "Send 2 · Mid": bookingUrl("mms-mid", "mms"),
  "Send 3 · Last call": bookingUrl("mms-last", "mms"),
};

function MmsPreview() {
  return (
    <div className="ywc-card">
      <div className="ywc-card-head">
        <div>
          <p className="ywc-card-kicker">MMS · 3-send sequence</p>
          <h2>MWC 250 · SMS list</h2>
          <p className="ywc-card-sub">
            Each send: branded prefix (MWC), one idea, a tracked short link, and
            STOP language. Every short link resolves to {BOOKING_BASE} with the
            MWC 250 offer preselected.
          </p>
        </div>
      </div>

      <div className="ywc-mms-grid">
        {MMS_MESSAGES.map((m) => {
          const chars = m.body.length;
          const segments = Math.max(1, Math.ceil(chars / 160));
          return (
            <article key={m.label} className="ywc-mms">
              <header className="ywc-mms-head">
                <p className="ywc-card-kicker">{m.label}</p>
                <p className="ywc-mms-when">{m.send}</p>
              </header>

              <div className="ywc-phone">
                <div className="ywc-phone-notch" />
                <div className="ywc-phone-screen">
                  <div className="ywc-phone-from">Men's Wellness Centers</div>
                  <div className="ywc-bubble">
                    <img src={m.media} alt="" />
                    <p>{m.body}</p>
                  </div>
                </div>
              </div>

              <p className="ywc-mms-dest">
                Resolves to:{" "}
                <a href={MMS_DESTINATIONS[m.label]}>{MMS_DESTINATIONS[m.label]}</a>
              </p>

              <footer className="ywc-mms-foot">
                <span>{chars} chars</span>
                <span>{segments} segment{segments > 1 ? "s" : ""}</span>
              </footer>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function CarouselPreview() {
  return (
    <div className="ywc-card">
      <div className="ywc-card-head">
        <div>
          <p className="ywc-card-kicker">Instagram carousel</p>
          <h2>4 slides · 1080 × 1350</h2>
          <p className="ywc-card-sub">
            The carousel is the social anchor of the campaign. Open the
            dedicated builder to export PNGs slide-by-slide.
          </p>
        </div>
        <Link to="/social/mwc-250" className="ywc-cta">
          Open carousel builder →
        </Link>
      </div>

      <div className="ywc-carousel-grid">
        {[
          { n: 1, photo: HERO_PHOTO, hero: "250 YEARS." },
          { n: 2, photo: BRIDGE_PHOTO, hero: "AT 22." },
          { n: 3, photo: STAKES_PHOTO, hero: "THE CONSTANT." },
          { n: 4, photo: CLOSE_PHOTO, hero: "BOOK." },
        ].map((s) => (
          <figure key={s.n} className="ywc-thumb">
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

function emailPreviewHtml() {
  return `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>MWC 250 · Young Washington</title></head>
<body style="margin:0;padding:0;background:${CREAM};font-family:Helvetica,Arial,sans-serif;color:${NAVY};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">250 years of showing up. One hour for the next 250. Book by ${OFFER_END}.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${CREAM};">
  <tr><td align="center" style="padding:24px;">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:100%;background:#ffffff;border:1px solid #e7e3dc;">
      <tr><td style="padding:14px 28px;background:${NAVY};color:${CREAM};border-top:4px solid ${RED};">
        <table role="presentation" width="100%"><tr>
          <td style="font-family:'Oswald',Helvetica,Arial,sans-serif;font-size:13px;letter-spacing:.22em;text-transform:uppercase;color:${CREAM};">MWC × Young Washington</td>
          <td align="right" style="font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:${GOLD};">In theaters ${FILM_RELEASE}</td>
        </tr></table>
      </td></tr>
      <tr><td style="padding:24px 28px;border-bottom:1px solid #efece6;">
        <img src="https://mwcbrand.lovable.app${WORDMARK}" alt="Men's Wellness Centers" height="32" style="height:32px;display:block;">
      </td></tr>
      <tr><td style="padding:0;">
        <img src="https://mwcbrand.lovable.app${HERO_PHOTO}" alt="" width="600" style="width:100%;display:block;height:auto;">
      </td></tr>
      <tr><td style="padding:32px 28px 8px 28px;">
        <p style="margin:0 0 12px 0;font-size:12px;letter-spacing:.22em;text-transform:uppercase;color:${RED};font-weight:700;">MWC 250 · Book by ${OFFER_END}</p>
        <h1 style="margin:0 0 16px 0;font-family:'Oswald',Helvetica,Arial,sans-serif;font-size:40px;line-height:1.05;letter-spacing:.01em;text-transform:uppercase;color:${NAVY};">250 years of showing up.</h1>
        <p style="margin:0 0 18px 0;font-size:17px;line-height:1.55;color:${NAVY};">America's 250th this July. Two and a half centuries of men showing up, for family, for neighbors, for the next ordinary Tuesday.</p>
        <p style="margin:0 0 24px 0;font-size:17px;line-height:1.55;color:${NAVY};">One hour with a physician. Same-day labs. A real plan. So the version of you at the cookout is the one they want to remember.</p>
      </td></tr>
      <tr><td align="center" style="padding:8px 28px 28px 28px;">
        <a href="${bookingUrl("email-hero", "email")}" style="display:inline-block;background:${RED};color:#ffffff;text-decoration:none;font-family:'Oswald',Helvetica,Arial,sans-serif;font-weight:700;letter-spacing:.16em;text-transform:uppercase;font-size:15px;padding:18px 28px;border-radius:4px;">Book your first visit</a>
      </td></tr>
      <tr><td style="padding:8px 28px 28px 28px;border-top:1px solid #efece6;">
        <h2 style="margin:24px 0 12px 0;font-family:'Oswald',Helvetica,Arial,sans-serif;font-size:22px;letter-spacing:.05em;text-transform:uppercase;color:${NAVY};">At 22, he was already moving.</h2>
        <p style="margin:0 0 10px 0;font-size:15px;line-height:1.55;color:${NAVY};">Young Washington (in theaters ${FILM_RELEASE}) was 22 when he led men through the Ohio wilderness. You're not 22. You don't need to be. You just need to feel like the man who can keep showing up.</p>
      </td></tr>
      <tr><td style="padding:8px 28px 28px 28px;border-top:1px solid #efece6;">
        <h2 style="margin:24px 0 12px 0;font-family:'Oswald',Helvetica,Arial,sans-serif;font-size:22px;letter-spacing:.05em;text-transform:uppercase;color:${NAVY};">One hour. Three things they'll feel.</h2>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr><td style="padding:6px 0;font-size:15px;line-height:1.5;color:${NAVY};">• <strong>Energy</strong>, for the second half of the day.</td></tr>
          <tr><td style="padding:6px 0;font-size:15px;line-height:1.5;color:${NAVY};">• <strong>Focus</strong>, sharper at dinner, sharper at work.</td></tr>
          <tr><td style="padding:6px 0;font-size:15px;line-height:1.5;color:${NAVY};">• <strong>Presence</strong>, patience on the hard days.</td></tr>
          <tr><td style="padding:6px 0;font-size:15px;line-height:1.5;color:${NAVY};">• <strong>A real plan</strong>, physician-led, judgment-free.</td></tr>
        </table>
      </td></tr>
      <tr><td style="padding:0 28px 32px 28px;">
        <p style="margin:0 0 18px 0;font-size:15px;line-height:1.6;color:${INK_SOFT};">You are the constant. One hour is the smallest possible investment in keeping it that way. Window closes ${OFFER_END}.</p>
        <a href="${bookingUrl("email-secondary", "email")}" style="display:inline-block;background:${RED};color:#ffffff;text-decoration:none;font-family:'Oswald',Helvetica,Arial,sans-serif;font-weight:700;letter-spacing:.16em;text-transform:uppercase;font-size:14px;padding:14px 22px;border-radius:4px;">Book your first visit</a>
      </td></tr>
      <tr><td style="padding:24px 28px;background:${NAVY};color:${CREAM};border-top:4px solid ${RED};">
        <img src="https://mwcbrand.lovable.app${WORDMARK_LIGHT}" alt="Men's Wellness Centers" height="26" style="height:26px;display:block;margin-bottom:10px;">
        <p style="margin:0 0 6px 0;font-size:12px;line-height:1.5;color:${CREAM};opacity:.85;">Physician-led · Same-day labs · Locally owned. Window closes ${OFFER_END}.</p>
        <p style="margin:0;font-size:11px;line-height:1.5;color:${GOLD};letter-spacing:.12em;text-transform:uppercase;">In partnership with Young Washington · In theaters ${FILM_RELEASE}</p>
        <p style="margin:8px 0 0 0;font-size:11px;color:${CREAM};opacity:.7;"><a href="{{unsubscribe_url}}" style="color:${CREAM};text-decoration:underline;">Unsubscribe</a></p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;
}

const css = `
.ywc-root{min-height:100vh;background:${CREAM};color:${NAVY};font-family:'Montserrat',system-ui,sans-serif;padding:48px 24px 96px;}
.ywc-top-inner{max-width:1200px;margin:0 auto;}
.ywc-back{display:inline-block;font-size:13px;letter-spacing:.06em;color:${INK_SOFT};text-decoration:none;margin-bottom:24px;}
.ywc-back:hover{color:${RED};}
.ywc-kicker{margin:0 0 10px;font-size:12px;font-weight:600;letter-spacing:.28em;text-transform:uppercase;color:${RED};}
.ywc-title{margin:0 0 14px;font-family:'Oswald',sans-serif;font-weight:600;letter-spacing:.02em;text-transform:uppercase;font-size:clamp(36px,5vw,64px);}
.ywc-lede{max-width:760px;font-size:17px;line-height:1.6;color:${INK_SOFT};margin:0 0 24px;}

.ywc-cobrand{display:inline-flex;align-items:center;gap:18px;padding:14px 20px;background:${NAVY};color:${CREAM};border-radius:6px;border-top:3px solid ${RED};margin:0 0 28px;flex-wrap:wrap;}
.ywc-cobrand-mark{height:26px;width:auto;filter:invert(1) brightness(1.5);}
.ywc-cobrand-x{font-family:'Oswald',sans-serif;font-size:18px;color:${GOLD};letter-spacing:.12em;}
.ywc-cobrand-film{display:flex;flex-direction:column;line-height:1.15;}
.ywc-cobrand-film-name{font-family:'Oswald',sans-serif;font-weight:700;font-size:18px;letter-spacing:.18em;text-transform:uppercase;color:${CREAM};}
.ywc-cobrand-film-meta{font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:${GOLD};}

.ywc-meta{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:18px;margin:0 0 40px;padding:20px;border:1px solid #e2ddd2;border-radius:6px;background:#fff;}
.ywc-meta div{margin:0;}
.ywc-meta dt{font-size:11px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:${INK_SOFT};margin-bottom:4px;}
.ywc-meta dd{margin:0;font-family:'Oswald',sans-serif;font-size:18px;letter-spacing:.04em;text-transform:uppercase;color:${NAVY};}

.ywc-pillars{max-width:1200px;margin:0 auto 40px;display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;}
.ywc-pillar{background:#fff;border:1px solid #e2ddd2;border-left:3px solid ${RED};padding:18px 20px;border-radius:4px;}
.ywc-pillar-label{margin:0 0 8px;font-family:'Oswald',sans-serif;font-size:13px;letter-spacing:.18em;text-transform:uppercase;color:${RED};}
.ywc-pillar-body{margin:0;font-size:14px;line-height:1.55;color:${NAVY};}

.ywc-tabs{max-width:1200px;margin:0 auto 24px;display:flex;flex-wrap:wrap;gap:8px;border-bottom:1px solid #d9d3c5;padding-bottom:0;}
.ywc-tab{appearance:none;background:transparent;border:none;border-bottom:3px solid transparent;padding:14px 18px;cursor:pointer;text-align:left;color:${INK_SOFT};font-family:inherit;}
.ywc-tab[data-active="true"]{color:${NAVY};border-bottom-color:${RED};}
.ywc-tab-label{display:block;font-family:'Oswald',sans-serif;font-size:15px;letter-spacing:.14em;text-transform:uppercase;}
.ywc-tab-sub{display:block;font-size:11px;letter-spacing:.04em;margin-top:2px;opacity:.7;}

.ywc-stage{max-width:1200px;margin:0 auto;}
.ywc-card{background:#fff;border:1px solid #e2ddd2;border-radius:6px;padding:24px;}
.ywc-card-head{display:flex;justify-content:space-between;gap:24px;align-items:flex-start;margin-bottom:20px;flex-wrap:wrap;}
.ywc-card-head h2{margin:4px 0 6px;font-family:'Oswald',sans-serif;font-size:24px;letter-spacing:.04em;text-transform:uppercase;}
.ywc-card-kicker{margin:0;font-size:11px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:${RED};}
.ywc-card-sub{margin:0;font-size:14px;line-height:1.55;color:${INK_SOFT};max-width:640px;}
.ywc-cta{display:inline-block;background:${RED};color:${CREAM};text-decoration:none;font-family:'Oswald',sans-serif;font-weight:700;letter-spacing:.14em;text-transform:uppercase;font-size:13px;padding:12px 18px;border-radius:4px;box-shadow:inset 0 0 0 2px ${GOLD};}
.ywc-cta:hover{filter:brightness(.95);}

.ywc-browser{border:1px solid #d9d3c5;border-radius:8px;overflow:hidden;background:${CREAM};}
.ywc-browser-bar{display:flex;align-items:center;gap:8px;padding:10px 14px;background:#ece8df;border-bottom:1px solid #d9d3c5;}
.ywc-dot{width:10px;height:10px;border-radius:999px;background:#c8c1b1;}
.ywc-url{margin-left:12px;font-family:ui-monospace,monospace;font-size:12px;color:${INK_SOFT};background:#fff;padding:4px 10px;border-radius:999px;border:1px solid #d9d3c5;}
.ywc-browser-body{max-height:820px;overflow:auto;background:${CREAM};}

.ywc-landing{background:${CREAM};color:${NAVY};font-family:'Montserrat',sans-serif;}
.lp-nav{display:flex;justify-content:space-between;align-items:center;padding:20px 32px;background:#fff;border-bottom:1px solid #ebe6da;}
.lp-nav img{height:28px;width:auto;}
.lp-nav-cta{font-family:'Oswald',sans-serif;font-weight:600;letter-spacing:.14em;text-transform:uppercase;font-size:12px;background:${RED};color:${CREAM};padding:10px 16px;border-radius:4px;text-decoration:none;box-shadow:inset 0 0 0 2px ${GOLD};}
.lp-cobrand{display:flex;justify-content:space-between;align-items:center;padding:10px 32px;background:${NAVY};color:${CREAM};border-bottom:3px solid ${RED};}
.lp-cobrand-eyebrow{font-family:'Oswald',sans-serif;font-weight:700;font-size:12px;letter-spacing:.24em;text-transform:uppercase;}
.lp-cobrand-meta{font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:${GOLD};}
.lp-hero{display:grid;grid-template-columns:1.1fr 1fr;gap:0;align-items:stretch;}
.lp-hero-photo{height:520px;overflow:hidden;}
.lp-hero-photo img{width:100%;height:100%;object-fit:cover;object-position:55% 30%;display:block;}
.lp-hero-copy{padding:64px 48px;display:flex;flex-direction:column;justify-content:center;gap:18px;}
.lp-eyebrow{margin:0;font-size:11px;font-weight:700;letter-spacing:.24em;text-transform:uppercase;color:${RED};}
.lp-hero-copy h1{margin:0;font-family:'Oswald',sans-serif;font-weight:700;font-size:54px;line-height:1.02;letter-spacing:.005em;text-transform:uppercase;}
.lp-sub{margin:0;font-size:17px;line-height:1.55;color:${INK_SOFT};}
.lp-cta-row{display:flex;align-items:center;gap:14px;flex-wrap:wrap;margin-top:6px;}
.lp-cta{display:inline-block;background:${RED};color:${CREAM};text-decoration:none;font-family:'Oswald',sans-serif;font-weight:700;letter-spacing:.16em;text-transform:uppercase;font-size:14px;padding:16px 24px;border-radius:4px;box-shadow:inset 0 0 0 2px ${GOLD};}
.lp-cta-meta{font-size:12px;color:${INK_SOFT};letter-spacing:.04em;}

.lp-bridge{display:grid;grid-template-columns:1fr 1.1fr;gap:0;align-items:stretch;background:${NAVY};color:${CREAM};}
.lp-bridge-photo{height:460px;overflow:hidden;}
.lp-bridge-photo img{width:100%;height:100%;object-fit:cover;object-position:50% 25%;display:block;}
.lp-bridge-copy{padding:64px 48px;display:flex;flex-direction:column;justify-content:center;gap:14px;}
.lp-bridge-copy h2{margin:0;font-family:'Oswald',sans-serif;font-size:42px;letter-spacing:.02em;text-transform:uppercase;line-height:1.02;}
.lp-bridge-copy p{margin:0;font-size:16px;line-height:1.6;color:#cfd1de;}
.lp-bridge-copy .lp-eyebrow{color:${GOLD};}
.lp-bridge-credit{font-size:12px !important;letter-spacing:.14em;text-transform:uppercase;color:${GOLD} !important;}

.lp-included{padding:64px 48px;background:#fff;border-top:1px solid #ebe6da;border-bottom:1px solid #ebe6da;}
.lp-included h2{margin:0 0 24px;font-family:'Oswald',sans-serif;font-size:28px;letter-spacing:.04em;text-transform:uppercase;}
.lp-included ul{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(2,1fr);gap:14px 28px;}
.lp-included li{position:relative;padding-left:22px;font-size:15px;line-height:1.55;}
.lp-included li:before{content:"";position:absolute;left:0;top:9px;width:8px;height:8px;border-radius:999px;background:${RED};}

.lp-stakes{display:grid;grid-template-columns:1fr 1fr;gap:0;align-items:stretch;background:${CREAM};}
.lp-stakes-copy{padding:64px 48px;display:flex;flex-direction:column;justify-content:center;gap:14px;}
.lp-stakes-copy h2{margin:0;font-family:'Oswald',sans-serif;font-size:36px;letter-spacing:.02em;text-transform:uppercase;line-height:1.05;}
.lp-stakes-copy p{margin:0;font-size:15px;line-height:1.6;color:${INK_SOFT};}
.lp-stakes-photo{height:360px;overflow:hidden;}
.lp-stakes-photo img{width:100%;height:100%;object-fit:cover;object-position:50% 35%;display:block;}

.lp-faq{padding:48px 48px;background:#fff;border-top:1px solid #ebe6da;}
.lp-faq h2{margin:0 0 18px;font-family:'Oswald',sans-serif;font-size:24px;letter-spacing:.04em;text-transform:uppercase;}
.lp-faq details{border-top:1px solid #ebe6da;padding:14px 0;}
.lp-faq details:last-of-type{border-bottom:1px solid #ebe6da;}
.lp-faq summary{font-family:'Oswald',sans-serif;font-size:15px;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;}
.lp-faq p{margin:10px 0 0;font-size:14px;line-height:1.55;color:${INK_SOFT};}

.lp-foot{display:grid;grid-template-columns:1fr 1fr;background:${NAVY};color:${CREAM};border-top:4px solid ${RED};}
.lp-foot-cta{padding:48px;display:flex;flex-direction:column;justify-content:center;gap:14px;}
.lp-foot-cta h2{margin:0;font-family:'Oswald',sans-serif;font-size:32px;letter-spacing:.04em;text-transform:uppercase;}
.lp-foot-cta .lp-eyebrow{color:${RED};}
.lp-foot-mark{padding:48px;border-left:1px solid rgba(245,243,240,.12);display:flex;flex-direction:column;justify-content:center;gap:10px;}
.lp-foot-mark img{height:32px;width:auto;}
.lp-foot-mark p{margin:0;font-size:13px;letter-spacing:.06em;opacity:.85;}
.lp-foot-cobrand{font-size:11px !important;letter-spacing:.14em;text-transform:uppercase;color:${GOLD} !important;opacity:1 !important;}

.ywc-email-meta{display:grid;grid-template-columns:1fr 2fr;gap:24px;padding:18px;background:${CREAM};border-radius:4px;margin-bottom:16px;}
.ywc-email-meta p{margin:4px 0 0;font-size:13px;color:${NAVY};}
.ywc-subject-list{margin:8px 0 0;padding-left:20px;}
.ywc-subject-list li{font-size:14px;line-height:1.6;color:${NAVY};}
.ywc-email-frame{border:1px solid #d9d3c5;border-radius:6px;overflow:hidden;background:${CREAM};}

.ywc-mms-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;}
.ywc-mms{background:${CREAM};border:1px solid #e2ddd2;border-radius:8px;padding:18px;display:flex;flex-direction:column;gap:12px;}
.ywc-mms-head{display:flex;justify-content:space-between;align-items:baseline;gap:10px;flex-wrap:wrap;}
.ywc-mms-when{margin:0;font-size:12px;color:${INK_SOFT};}
.ywc-phone{background:#1c1c1e;border-radius:24px;padding:14px 12px 18px;position:relative;color:#fff;}
.ywc-phone-notch{width:60px;height:5px;background:#3a3a3c;border-radius:999px;margin:0 auto 10px;}
.ywc-phone-screen{display:flex;flex-direction:column;gap:6px;}
.ywc-phone-from{text-align:center;font-size:11px;color:#9a9a9a;margin-bottom:4px;}
.ywc-bubble{background:#2c2c2e;border-radius:16px;overflow:hidden;max-width:88%;}
.ywc-bubble img{width:100%;height:140px;object-fit:cover;display:block;}
.ywc-bubble p{margin:0;padding:10px 12px;font-size:13px;line-height:1.4;color:#fff;}
.ywc-mms-foot{display:flex;justify-content:space-between;align-items:center;gap:10px;font-size:11px;color:${INK_SOFT};font-family:ui-monospace,monospace;}
.ywc-mms-dest{margin:0;font-size:11px;font-family:ui-monospace,monospace;color:${INK_SOFT};word-break:break-all;}
.ywc-mms-dest a{color:${NAVY};text-decoration:underline;}

.ywc-carousel-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px;}
.ywc-thumb{margin:0;background:${CREAM};border:1px solid #e2ddd2;border-radius:6px;overflow:hidden;}
.ywc-thumb img{width:100%;aspect-ratio:4/5;object-fit:cover;display:block;}
.ywc-thumb figcaption{padding:10px 12px;display:flex;justify-content:space-between;align-items:baseline;}
.ywc-thumb figcaption span{font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:${INK_SOFT};}
.ywc-thumb figcaption strong{font-family:'Oswald',sans-serif;font-size:14px;letter-spacing:.06em;}

@media(max-width:780px){
  .lp-hero,.lp-bridge,.lp-stakes,.lp-foot{grid-template-columns:1fr;}
  .lp-included ul{grid-template-columns:1fr;}
  .lp-hero-photo,.lp-bridge-photo,.lp-stakes-photo{height:280px;}
  .lp-hero-copy,.lp-bridge-copy,.lp-stakes-copy,.lp-foot-cta,.lp-foot-mark,.lp-included,.lp-faq{padding:36px 24px;}
}
`;
