
**Design read:** redesign-preserve of a trust-first medical landing page for a Virginia men's health brand. Brand tokens (navy #0b1226, orange #ef6c1a, Oswald + Open Sans) stay locked. Dials: variance 4, motion 2, density 4. This is targeted evolution — visuals and copy only, no IA changes, no link changes.

## What the audit flagged

Running the page against the skill surfaced a handful of AI tells and a redundancy problem. None are structural; all are polish.

1. **Eyebrow overuse.** Skill cap for 6 sections is 2 eyebrows. Currently 6: "The Process", "What Each Side Gets", "The Fine Print", "Common Questions", "Ready When You Are", plus the two "For Your Friend / For You" micro-labels in the rewards strip. Reads templated.
2. **Section-number badges.** Cards in "How It Works" carry big 01/02/03/04 numerals — the exact enumeration tell the skill bans.
3. **Card sub-labels.** "No Link Needed", "Text, Email, or In Person", "60 Minutes On-Site", "3 Months Credited to Your Account" — decorative meta strings above each card title. The title alone communicates the step.
4. **Content redundancy.** Rewards strip, "Simple, on Both Ends" benefits section, and the final CTA all restate the same "10% off / 3 months free" line. Three restatements of the same offer in a 6-section page.
5. **Spec-table hairlines.** Eligibility is 6 rows with a hairline under every row (the Marrow-cookware pattern the skill flags). Reads as a long list, not a scannable summary.
6. **AI-y section headlines.** "Simple, on Both Ends", "The Fine Print", "Common Questions", "Ready When You Are" — performative-craftsman labels the skill flags for rewrite to plain functional language.
7. **Zero real images.** Even a restrained trust-first page needs at least one real image. Currently text on flat backgrounds throughout.
8. **Copy self-audit.** No em-dashes (already cleaned), no broken grammar, no fake numbers. Good.

## The polish (all in `src/routes/refer.tsx`)

**Cut redundancy**
- Remove the standalone `Benefits` section entirely. Its content is already covered by the rewards strip and the how-it-works steps.
- Keep the rewards strip as the single offer summary directly under the hero.

**Strip eyebrows down to 2 total**
- Keep: "The Process" over How It Works (rename to "How It Works" as the section header, drop the eyebrow), and one on FAQ.
- Actually: drop eyebrows from Rewards, Eligibility, and Final CTA. Keep one eyebrow on How It Works and one on FAQ. Total 2, matches ceil(sections/3).
- Rewards strip: keep "For Your Friend" / "For You" as functional column labels (they're not eyebrows above a headline — they're grid-column headers, which the skill allows).

**Rewrite section headlines to plain language**
- "Eligibility & Rules" stays (functional).
- "Frequently Asked" → "Questions".
- Final CTA h2 stays but drop the "Ready When You Are" eyebrow above it.

**Remove enumeration tells from How It Works**
- Delete the big 01/02/03/04 numerals on cards.
- Delete the per-card meta sub-labels ("No Link Needed" etc.).
- Keep the 4-card grid with just title + body + optional inline link. Cleaner hierarchy, one row of visual info per card instead of three.

**Reshape Eligibility**
- Drop the 6-row hairline table.
- Convert to a 2-column card grid (3 cards per column, 6 total): each card = one topic (Who Can Refer, Who Can Be Referred, Friend's Discount, Your Credit, Outreach, Privacy). Same content, no hairline-per-row pattern.

**Add one real image**
- Add a subtle hero background photograph (professional Virginia clinical setting or a portrait) via `picsum.photos/seed/mwc-refer-provider/1920/1200` overlaid with the existing navy gradient at ~72% opacity so brand color still dominates. Preserves the trust-first restraint while removing the pure-text-on-flat-navy hero.

**Small typography and layout fixes**
- Add `text-wrap: balance` audit on the section h2s (already in the CSS — verify it's applied).
- Cap hero top padding at ~pt-24 equivalent (already close, verify `clamp(72px, 12vw, 140px)` on desktop resolves under 120px — trim upper bound to 120px).
- Verify all CTAs pass WCAG AA against their backgrounds (orange on navy — check contrast; ghost pill on navy — verify border visibility).

## Out of scope

- No changes to routing, URLs, `REFER_URL`, `ENROLL_URL`, or the ambassador tools link.
- No brand color, font, or logo changes.
- No new sections, no removed content that changes what the page communicates — only redundancy compression.
- No motion added — trust-first medical page stays static (motion dial 2).
