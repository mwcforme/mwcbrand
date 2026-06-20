
# Reframe: "The Gift He Gives Himself"

You're right — there's no realistic gifting mechanic here (no card, no surprise booking for someone else). Trying to position this as a gift *to* dad creates friction. The honest, stronger frame is:

> **A gift he gives himself — so he can keep showing up for the people who count on him.**

This keeps Father's Day as the emotional trigger but puts the decision (and the booking) in his hands, where it actually lives. It also elevates the brand: this isn't a discount holiday play, it's a moment of permission to invest in himself *because* of his family, not instead of them.

## Core message architecture

- **Headline frame:** "The gift is showing up." / "Give yourself the hour. Give them the better version of you."
- **Emotional logic:** Dads are the constant. Energy, focus, presence, drive — those aren't vanity, they're how he provides. One hour to recalibrate is the most useful thing he'll do this month.
- **Father's Day hook:** Not "treat dad" — "this Father's Day, do the thing you've been putting off." The deadline (June 30) is a nudge, not a sale.
- **CTA voice:** "Book his first visit" → **"Book your first visit"** everywhere. Second person. He's the buyer, the recipient, and the beneficiary.

## What changes, file by file

### `src/routes/campaigns.fathers-day.tsx` (landing + emails + MMS)

**Landing page**
- Hero: replace any "gift him / treat dad" language with self-directed framing. New H1 candidate: *"The best thing you'll do for them this month takes one hour."* Subhead names the Father's Day moment without making it transactional.
- Value section: reframe the three pillars around **Energy / Focus / Presence** — the things his family actually feels — rather than clinical benefits.
- Testimonial / proof block: lean on dad-voice quotes ("I'm sharper at dinner," "I have patience again on Saturday mornings").
- Remove any remaining gift-card, "surprise him," or "treat" language.
- Keep the booking flow + UTM helper exactly as-is.

**Email (single send, no sequence change)**
- Subject: *"This Father's Day, the gift is showing up."*
- Preheader: *"One hour for you. The dividend goes to them."*
- Body: 3 short paragraphs — the frame, what the visit is, why now (June 30). Single CTA: **Book your first visit.**
- No codes, no HTML flourish (per your earlier rule). Plain, branded, human.

**MMS (3-touch)**
- Warm: *"Father's Day reminder from MWC — the best gift this month is the version of you that's rested, focused, and present. One hour. Book your first visit: [link]"*
- Mid: *"Half the guys we see say the same thing — 'I should've done this sooner.' Father's Day is the nudge. Book your first visit before 6/30: [link]"*
- Last call: *"Final reminder — slots for first visits close 6/30. One hour for you, dividend goes to your family. [link]"*
- Keep the resolved destination labels and bookingUrl helper.

**Campaign hub meta**
- Update the positioning line at the top to: *"Frame: a gift he gives himself, so he can keep showing up for his family."*
- Audience: *"Dads, 32–55, primary providers / present fathers."*

### `src/routes/social.fathers-day.tsx` (4-slide carousel)

- **Slide 1 (cover):** *"The gift is showing up."* — small kicker: *Father's Day at MWC.*
- **Slide 2:** *"60 minutes for you. The dividend goes to them."* (keeps the type fix we just made.)
- **Slide 3:** Three short lines — *Energy. Focus. Presence.* — with one-line explainers tying each back to family life.
- **Slide 4 (CTA):** *"Book your first visit before June 30."* — footer strip stays `BOOK.MENSWELLNESSCENTERS.COM`.
- No discount language, no "treat dad," no gift-card references on any slide.

## Out of scope (intentionally)

- No new routes, no new components, no design-system changes.
- Booking URL, UTM scheme, and offer ID stay as they are.
- Type scale / layout work on the carousel from the prior turn is preserved.

## Open question before I build

One call to make: **do you want the email and MMS to still reference "Father's Day" by name, or stay implicit** (e.g. "this month," "before 6/30")? Naming it makes the timing obvious; staying implicit makes the self-gift frame feel less holiday-coded and more evergreen. My recommendation: **name it once in the subject line / first MMS, then let the rest speak to him directly.** Tell me if you'd rather lean harder either way and I'll adjust the copy as I write it.
