## Goal

Rebuild the uploaded `mwc-brand-site` (a 12-page static brand guidelines site for Men's Wellness Centers) as a proper TanStack Start app. Keep the structure, copy, and asset library 1:1, but refine the typography, spacing, motion, and component polish where the static HTML is rough. Port the interactive prompt-library filter and lead-form builder as real React components.

## What ships in this pass

### Routes (one file per page, each with its own `head()` metadata)

```
src/routes/
  __root.tsx          shared header + footer + fonts + favicons
  index.tsx           Overview (hero, 6-card system grid, positioning, stats, tagline lockup)
  logo.tsx            Logo system (stacked, horizontal, abbreviation, clear-space rules)
  logo-library.tsx    Library grid sourced from logo-library-data.json
  color.tsx           Color tokens, swatches, usage rules
  typography.tsx      Oswald / Montserrat / Inter type scale
  voice.tsx           Voice & messaging guidelines
  applications.tsx    Mockups (web hero, social, business card, signage, Google/Meta ads)
  accessibility.tsx   A11y + contrast notes (uses accessibility-audit.json)
  prompts.tsx         Prompt library with category filter + search + copy-to-clipboard
  email-signature.tsx Signature preview + copy HTML
  lead-forms.tsx      Lead-form builder (field picker, live preview, export HTML)
  downloads.tsx       Brand-pack zip + per-asset downloads
```

### Design system

- Port the token set from `css/styles.css` (Midnight Navy `#0b1029`, Cream `#f5f3f0`, Accent Orange `#e8670a`, etc.) into `src/styles.css` as `@theme` tokens and shadcn-mapped CSS variables. No hard-coded hex in components.
- Load Oswald, Montserrat, and Inter via `<link>` in `__root.tsx` head; register families in `@theme`.
- Build small primitives (`Eyebrow`, `SectionHead`, `StatStrip`, `TaglineLockup`, `Card`, `Button` variants `primary`/`ghost`) so every page composes from the same kit.
- Refinement pass over the static design: tighter editorial spacing, better section rhythm, subtle scroll-in motion via framer-motion on hero + section heads, hover affordances on cards, sticky-header polish, mobile nav as a sheet.

### Shared chrome

- `SiteHeader` with the 12-link nav, collapses to a Sheet on mobile, active-route highlight via `useRouterState`.
- `SiteFooter` matching the original four-column layout.
- SEO: each route sets its own title, description, og:title, og:description. og:image only on routes with a hero/cover image (Overview uses the social banner; Applications routes use their mockup). Favicons + JSON-LD Organization in root.

### Interactive ports

- **Prompts page**: parse the prompt cards out of `prompts.html` into a typed JSON dataset, render with category tabs, free-text filter, and a "Copy prompt" button (sonner toast on success).
- **Lead-forms page**: read the field schema from `lead-forms.html` / `lead-forms-kit/`, build a React form-builder with a live preview panel and an "Export HTML" button that downloads the snippet.
- **Email signature**: live preview with name/title/phone inputs, "Copy HTML" action.
- **Logo library**: render from `logo-library-data.json` with download buttons per variant.

### Assets

All binaries go through Lovable Assets (CDN), not bundled in the repo:

- `assets/logos/svg/*` (10 SVGs) + `assets/logos/png/*` — used inline across pages.
- `assets/favicon/*` — wired into root `head()` links + manifest.
- `assets/social/*` — used on Applications + as og:image sources.
- `assets/applications/*` — mockup imagery for Applications page (prefer `.webp`).
- `assets/from-booking/*` — badges + photography used in Applications.
- `assets/downloads/*` (9 zips, ~40 MB) — uploaded as assets, linked from Downloads page.
- `logo-library-data.json`, `accessibility-audit.json` — copied into `src/data/`.

### Technical notes

- Pure frontend; no Cloud/backend needed (no auth, no DB, no server functions).
- React + framer-motion for entrance animations; shadcn `sheet`, `tabs`, `button`, `card`, `input`, `textarea`, `sonner`.
- Each route file uses `createFileRoute("/path")` matching its filename; no `src/pages/`, no hash-anchor nav.
- I'll strip the `data-pplx-inline-edit` Perplexity capture script (preview-host artifact, not part of the brand site).

## Out of scope for this pass

- Wiring real form submissions (the lead-form builder exports HTML; it doesn't submit anywhere).
- Backend, analytics, or CMS.
- Rewriting brand copy — text is ported verbatim, only layout/typography is refined.

## Iterate after

Once the port is up and you can click through it, we'll iterate page-by-page on the visual refinements (motion, density, hero treatments) and on the interactive tools.
