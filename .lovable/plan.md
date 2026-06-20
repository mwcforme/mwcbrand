## Issues found in PNG exports

**Slide 1** — OK. Hero fits, strip fits.

**Slide 2** — Footer strip text "PHYSICIAN-LED. SAME-DAY LABS." wraps to two lines and crowds the orange CTA. Strip looks broken.

**Slide 3** — Hero "THE CONSTANT." wraps to two lines ("THE" / "CONSTANT.") at 158px. Looks like a layout bug, not an intentional stack. Big empty space to the right of "THE".

**Slide 4** — Orange CTA "BOOK YOUR VIS…" is **clipped off the right edge** of the 1080px frame. Critical: the CTA on the closer slide is broken.

Root causes:
1. `.fd-hero` is a fixed 158px and doesn't downscale when the headline is two words or longer than ~10 chars.
2. `.fd-strip` is a single flex row with `padding:0 60px`, gap 28px, 29px strip text, and a 26px CTA with 28px horizontal padding. On slides where strip text + CTA exceeds ~960px, either the text wraps (slide 2) or the CTA overflows the frame (slide 4).

## Fixes

### `src/routes/social.fathers-day.tsx`

**1. Hero auto-fit (fixes slide 3)**
Replace the fixed `font-size:158px` on `.fd-hero` with a length-aware size. Two options, pick the simpler:
- Add a `heroSize` field per slide (e.g. slide 3 → 132px) so "THE CONSTANT." fits one line.
- Or compute via CSS: keep 158px default, add `.fd-hero[data-long="true"]{font-size:128px}` and set `data-long` on slides where `hero.length > 10`.

Going with the per-slide override — simpler, deterministic, no JS measuring.

**2. Footer strip layout (fixes slides 2 & 4)**
- Shorten strip copy:
  - Slide 2: `"PHYSICIAN-LED. SAME-DAY LABS."` → `"PHYSICIAN-LED."` (the "same-day labs" line is already in the body copy).
  - Slide 4: keep `"BOOK.MENSWELLNESSCENTERS.COM"` but drop the duplicated CTA — the URL **is** the call to action on the close slide. Remove `cta: "BOOK YOUR VISIT"` from slide 4.
- Tighten the strip so it can never overflow:
  - `.fd-strip-text`: 29px → 26px, `letter-spacing:.12em`, allow `min-width:0` + `overflow:hidden`/`text-overflow:ellipsis` as a safety net.
  - `.fd-cta`: 26px → 24px, padding `18px 28px` → `16px 24px`.
  - `.fd-strip`: gap `28px` → `20px`.
- Keep slide 2's CTA ("BOOK YOUR VISIT") — with the shorter strip text + smaller CTA it now fits on one line.

**3. Verify**
Re-export PNGs after the change and confirm: slide 2 strip is one line, slide 3 hero is one line, slide 4 CTA either fits fully or is removed in favor of the URL strip.

No other files change. Booking-link logic, copy, and reframe stay as-is.
