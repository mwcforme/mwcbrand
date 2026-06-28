# LLM-Readable Brand Kit Reference Page

Create a single, static, machine-readable page that any LLM, AI tool, or third-party brand-kit builder can fetch once to reproduce the Men's Wellness Centers brand. Optimized for crawlers and copy-paste into ChatGPT, Claude, Canva AI, Adobe Express, etc.

## What gets built

### 1. New route: `/brand-kit` (HTML)
A single long static page (no JS interactivity) containing the full brand system in plain, structured text + minimal semantic HTML. Sections:

- **Identity** — Full name, short name, tagline, positioning, region, category
- **Logo** — Direct CDN URLs for primary wordmark, M-bug, favicon (SVG + PNG @1x/2x/3x, navy and cream variants only — no orange logos)
- **Color tokens** — Every swatch from `color.html` as a structured table (name, HEX, RGB, HSL, role, allowed pairings)
- **Typography** — Oswald (display), Montserrat (body), Inter (mono) with Google Fonts URLs, weights, tracking values, full type scale
- **Voice & messaging** — Tagline, approved phrases, banned words (no "clinic", "free", em-dashes, teal), tone descriptors
- **Imagery rules** — In-person, physician-led, Virginia, no stock-cliché, no AI-generated
- **Do / Don't** — Consolidated from color + typography + logo pages
- **Asset index** — Newline-delimited absolute URLs to every downloadable logo, favicon, and signature template
- **Machine block** — A single `<pre>` containing the entire brand kit as JSON for one-shot ingestion

### 2. Companion JSON endpoint: `/brand-kit.json`
Same data as the machine block, served as a standalone file so tools can fetch it directly without HTML parsing. Implemented as a TanStack server route under `src/routes/brand-kit[.]json.ts` returning `application/json`.

### 3. Discovery wiring
- Add `<link rel="alternate" type="application/json" href="/brand-kit.json">` and a canonical meta description to `/brand-kit`'s `head()`
- Add both URLs to `public/robots.txt` and the dynamic `sitemap.xml`
- Add an `llms.txt` at `public/llms.txt` (emerging convention) pointing to `/brand-kit` and `/brand-kit.json` so LLM crawlers find it
- Add a header nav link under the existing "Brand" group so humans can find it

### 4. Content sourcing (no duplication of source-of-truth)
Pull values from the existing canonical files at build time rather than re-typing:
- Colors: parse from `src/data/page-bodies/color.html` or hard-code the same tokens used there
- Logos: from `src/data/logo-library-data.json` (already orange-filtered)
- Voice: from `src/data/page-bodies/voice.html` key phrases

A small helper `src/lib/mwc/brand-kit.ts` builds the canonical JSON object once and is imported by both the `/brand-kit` page and the `/brand-kit.json` route.

## Files

- `src/lib/mwc/brand-kit.ts` (new) — single source of truth, exports `brandKit` object
- `src/routes/brand-kit.tsx` (new) — renders the human + machine HTML view
- `src/routes/brand-kit[.]json.ts` (new) — JSON endpoint
- `public/llms.txt` (new) — LLM-crawler discovery file
- `public/robots.txt` (edit) — allow + reference llms.txt
- `src/routes/sitemap[.]xml.ts` (edit) — add `/brand-kit` and `/brand-kit.json`
- `src/components/site/SiteHeader.tsx` (edit) — add "Brand Kit (LLM)" link

## Out of scope

- No interactive UI, no preview widgets, no downloads ZIP (existing `/downloads` covers that)
- No auth, no analytics, no edge personalization — must stay fully static/cacheable
