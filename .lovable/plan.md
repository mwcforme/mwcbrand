## Goal

Add a `/business-card` page to the MWC brand site: an interactive editor that
generates a US 3.5×2 in landscape card with a QR code on **both** sides, plus
a print-ready PDF export. Same pattern and chrome as `/email-signature`.

## Route

```
src/routes/business-card.tsx          // createFileRoute("/business-card") + head() meta
src/components/site/BusinessCardBuilder.tsx
```

Add **Business Card** to `SiteHeader` nav next to Email Signature.

## Card spec

- Trim: 3.5 × 2 in landscape (1050 × 600 px @ 300 DPI)
- Bleed: 0.125 in on all sides → 3.75 × 2.25 in (1125 × 675 px) full-bleed art
- Safe area: 0.125 in inside trim
- Crop marks: 0.125 in tick marks at each corner outside bleed
- Color: brand tokens — Midnight Navy `#0B1029`, Cream `#F5F3F0`, Accent Orange `#E8670A`
- Type: Oswald (display) + Montserrat (body), already loaded by `__root.tsx`

## Layout

**Front — brand-forward**
- Background: Midnight Navy, full-bleed
- Logo lockup (Cream wordmark on transparent) — centered upper third
- Tagline below, small caps Cream/Orange: "Find Your Edge Over Age."
- QR (front destination) bottom-right, ~0.65 in square, on a Cream tile so it scans on dark bg
- Thin Orange rule along bottom edge

**Back — info-dense**
- Background: Cream
- Left column: Name (Oswald 18pt), credentials, Title (Orange caps), Center line
- Divider (1 px hairline, `#D4D2CE`)
- Contact rows: Direct, Center, Email, Web (same labels as email signature)
- Right column: QR (back destination), ~0.85 in square, with a 9pt caption underneath ("Scan to book" / "Scan to connect" depending on destination)
- 2 px Orange vertical rule between columns

Same brand visual language as the email signature so the two artifacts feel like siblings.

## Form fields (left column of the editor, sticky)

Identity: First name, Last name, Credentials, Title, Primary center, Direct phone (toggle include), Center phone, Email.

QR section per side (Front QR + Back QR each independently):
- Destination type radio: **Booking URL**, **Personal profile URL**, **Referral URL** (default `https://go.menswellnesscenters.com/refer`), **Custom URL**, **vCard (contact info)**
- For URL types: pre-filled value, editable
- For vCard: auto-built from identity fields (FN, TITLE, ORG=Men's Wellness Centers, TEL, EMAIL, URL)
- Caption text (auto-suggested per type, editable: "Scan to book", "Scan to connect", "Save contact")
- Defaults: Front = Personal profile URL, Back = Booking URL (matches the user's intent — booking + profile, with same-QR-on-both as a 1-click toggle).

A "Use the same QR on both sides" toggle copies front → back.

Reset to example button.

## Live preview (right column)

- Both sides rendered side by side as HTML/CSS at exact aspect ratio, scaled to fit (using brand tokens, not the print colorspace — purely visual proof).
- Safe area + bleed shown as toggleable dashed overlays so the user can see what will trim.
- QR rendered live as SVG via `qrcode` npm package.

## Actions

- **Download Print-Ready PDF** — generates a 2-page PDF (front, back) at 3.75 × 2.25 in with bleed + crop marks. Filename `mwc-card-{first}-{last}.pdf`.
- **Download PNG (front + back)** — 300 DPI, no bleed (proof images).
- **Copy vCard** — copies the vCard text to clipboard (useful even without scanning).

Status messages inline (same pattern as Email Signature page).

## Install / usage section (bottom)

3-card explainer: "Print at any printer", "Order through Moo/Vistaprint", "Share digitally" — short copy, brand-styled cards.

## Technical notes

- `bun add qrcode pdf-lib` — both are pure JS, edge-safe, no Node-only deps.
- QR rendered with `qrcode.toString(value, { type: 'svg', margin: 0, color: { dark, light } })`.
- PDF built with `pdf-lib`:
  - Page size in points: `3.75 in × 2.25 in` = `270 × 162 pt`
  - Embed the Cream wordmark PNG once (fetch from existing asset map URL) for the front
  - Draw the QRs as PNG bitmaps from `qrcode.toDataURL(... { width: 600 })` so quality is print-grade
  - Embed Helvetica as a fallback for type (Oswald/Montserrat aren't bundled; the PDF will use Helvetica weights — acceptable for a v1; we can upgrade to embedded brand fonts later if you want exact type)
  - Draw crop marks as 0.125 in lines at corners
- All work client-side; no backend needed.

## Out of scope

- Embedding Oswald/Montserrat as TTFs in the PDF (Helvetica fallback for v1)
- Multi-employee batch export
- CMYK output (PDF is RGB; most printers accept it for digital print runs — note this in the UI)

## What you'll see when it ships

```
/business-card
┌────────────────┬───────────────────────────────────────────────┐
│ Your Details   │  Live Preview                                 │
│  • identity    │   ┌────────────────┐   ┌────────────────┐    │
│  • Front QR    │   │  FRONT (navy)  │   │  BACK (cream)  │    │
│  • Back QR     │   │  logo · QR     │   │  name · QR     │    │
│  • [Reset]     │   └────────────────┘   └────────────────┘    │
│                │                                               │
│                │  [Download PDF] [PNG] [Copy vCard]            │
└────────────────┴───────────────────────────────────────────────┘
```

Add nav link, ship route, done. Iterate on layout polish after you see it live.
