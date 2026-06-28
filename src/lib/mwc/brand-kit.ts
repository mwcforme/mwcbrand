/**
 * Single source of truth for the LLM-readable brand kit.
 * Consumed by /brand-kit (HTML) and /brand-kit.json (raw JSON).
 */
import logoLib from "@/data/logo-library-data.json";

export const CDN_BASE = "https://mwc-brand.pplx.app/";
export const SITE_BASE = "https://mwcbrand.lovable.app";

type LogoAsset = {
  path: string;
  category?: string;
  label?: string;
  name?: string;
  use_for?: string;
  platform_spec?: string;
  dimensions?: [number, number] | null;
  size_bytes?: number;
  ext?: string;
};

const allAssets = (logoLib as { assets: LogoAsset[] }).assets;

// Defensive: exclude any orange variants (brand rule: no orange in logos).
const safeAssets = allAssets.filter((a) => {
  const blob = `${a.path} ${a.label ?? ""} ${a.name ?? ""} ${a.use_for ?? ""}`.toLowerCase();
  return !blob.includes("orange");
});

const url = (path: string) => CDN_BASE + path.replace(/^\//, "");

const featuredLogos = safeAssets
  .filter((a) =>
    /wordmark_navy\.svg$|wordmark_white\.svg$|wordmark_cream\.svg$|m_bug_navy\.svg$|m_bug_white\.svg$|m_bug_cream\.svg$|favicon-32\.png$|favicon-192\.png$|favicon-512\.png$|apple-touch-icon/i.test(
      a.path,
    ),
  )
  .map((a) => ({
    name: a.label || a.path.split("/").pop(),
    url: url(a.path),
    use_for: a.use_for,
    format: a.ext,
    dimensions: a.dimensions,
  }));

export const brandKit = {
  $schema: "https://mwcbrand.lovable.app/brand-kit.json",
  version: "2026.06",
  updated: "2026-06-28",
  identity: {
    legal_name: "Men's Wellness Centers",
    short_name: "MWC",
    full_title: "Men's Wellness Centers | TRT, ED & Weight Loss in Virginia",
    tagline: "Find Your Edge Over Age.",
    tagline_rules:
      "Use as-written. Title case. Period included. Never abbreviate, rephrase, or substitute.",
    positioning:
      "Locally owned, physician-led men's health practice in Virginia. 60-minute, in-person, no-cost first appointment. Members, not patients.",
    category: "Men's health · TRT · ED · Weight loss",
    region: "Virginia (Richmond metro)",
    website: "https://menswellnesscenters.com",
    booking_url: "https://book.menswellnesscenters.com",
    brand_site: SITE_BASE,
  },
  colors: {
    primary: [
      {
        name: "Midnight Navy",
        hex: "#0B1029",
        rgb: [11, 16, 41],
        hsl: [230, 58, 10],
        role: "Brand anchor. Hero moments. Footer. Accent.",
      },
      {
        name: "Accent Orange",
        hex: "#E8670A",
        rgb: [232, 103, 10],
        hsl: [25, 92, 47],
        role: "Accents, underlines, key links, highlights. UI only — never on logo marks.",
      },
      {
        name: "Orange Button",
        hex: "#B84A08",
        rgb: [184, 74, 8],
        hsl: [22, 92, 38],
        role: "CTA buttons only. WCAG AA on cream and navy.",
      },
      {
        name: "Warm Off-White (Cream)",
        hex: "#F5F3F0",
        rgb: [245, 243, 240],
        hsl: [36, 17, 95],
        role: "Default surface. Page and section backgrounds. Cream text on dark.",
      },
    ],
    extended: [
      { name: "Navy Mid", hex: "#161B3A", role: "Section backgrounds, cards." },
      { name: "Navy Light", hex: "#1E244A", role: "Elevated surfaces, borders, dividers." },
      { name: "Body Gray", hex: "#B0ADA8", role: "Body copy on dark surfaces." },
      { name: "Muted Gray", hex: "#9CA3AF", role: "Secondary text, captions, metadata." },
      { name: "Success Green", hex: "#5DD68A", role: "Success states only. Replaces banned teal." },
    ],
    banned: ["#000000 (pure black)", "#FFFFFF (pure white)", "Any teal", "Blue gradients", "Multi-color gradients"],
    pairings: [
      "Navy text (#0B1029) on Cream (#F5F3F0) — body default",
      "Cream text (#F5F3F0) on Navy (#0B1029) — dark surfaces",
      "Orange Button (#B84A08) on Cream or Navy — CTA only",
    ],
  },
  typography: {
    display: {
      family: "Oswald",
      weights: [600],
      case: "UPPERCASE",
      tracking: { headline: "0.04em", display: "0.02em" },
      google_fonts: "https://fonts.googleapis.com/css2?family=Oswald:wght@600&display=swap",
    },
    body: {
      family: "Montserrat",
      weights: [400, 600],
      case: "Sentence case",
      tracking: { eyebrow: "0.32em", caption: "0.18em" },
      google_fonts:
        "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap",
    },
    mono: {
      family: "Inter",
      weights: [500],
      use_for: "Data, code, tokens",
      google_fonts: "https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap",
    },
    scale_px: {
      display_xl: 96,
      display_lg: 64,
      display_md: 48,
      headline: 32,
      lead: 22,
      body: 17,
      caption: 14,
      eyebrow: 12,
    },
    rules: [
      "Oswald 600 uppercase for all headlines.",
      "Montserrat 400 sentence-case for body.",
      "Eyebrows tracked 0.32em uppercase.",
      "No italics — use weight or color for emphasis.",
      "Max two families per surface.",
      "No em-dashes anywhere.",
    ],
    legacy_banned: ["Bebas Neue"],
  },
  voice: {
    descriptors: ["Assertive", "Respectful", "Inclusive", "Modern masculine", "Clinically grounded"],
    person: "Second person. Address men as leaders, protectors, providers.",
    always_say: [
      "Men's Wellness Centers",
      "Members",
      "No-cost appointment",
      "60-minute in-person appointment",
      "Physician-led",
      "Locally owned",
      "LegitScript certified",
    ],
    never_say: [
      "clinic",
      "practice",
      "office",
      "facility",
      "patients",
      "clients",
      "customers",
      "users",
      "free (use 'no-cost')",
      "guy / guys",
      "em-dashes (—)",
      "Age Well. MensWell. (deprecated tagline)",
      "15-minute call",
      "consult",
      "visit",
      "video appointment",
    ],
    approved_ctas: [
      "Book his first visit",
      "Book your first visit",
      "BookMWC.com",
    ],
  },
  imagery: {
    do: [
      "Real men, 35–65, Virginia regional feel",
      "In-person, physician-led settings",
      "Natural light, documentary tone",
      "Family / vitality moments framed as outcomes",
    ],
    dont: [
      "AI-generated faces or bodies",
      "Generic stock-cliché (handshakes, lab beakers, syringes)",
      "Shirtless gym mirror selfies",
      "Pill-bottle close-ups",
    ],
  },
  logos: {
    rules: [
      "Logo marks are Navy, Cream, White, or Black only — never orange.",
      "Use SVG for any large-format / swag / signage application.",
      "Maintain clear space equal to the height of the 'M' on all sides.",
      "Minimum wordmark width: 70px digital, 0.75in print.",
    ],
    featured: featuredLogos,
    library_index_url: `${SITE_BASE}/logo-library`,
    cdn_base: CDN_BASE,
    all_assets: safeAssets.map((a) => ({
      url: url(a.path),
      category: a.category,
      label: a.label,
      use_for: a.use_for,
      ext: a.ext,
      dimensions: a.dimensions,
      size_bytes: a.size_bytes,
    })),
  },
  references: {
    color_page: `${SITE_BASE}/color`,
    typography_page: `${SITE_BASE}/typography`,
    voice_page: `${SITE_BASE}/voice`,
    logo_page: `${SITE_BASE}/logo`,
    logo_library_page: `${SITE_BASE}/logo-library`,
    downloads_page: `${SITE_BASE}/downloads`,
    sitemap: `${SITE_BASE}/sitemap.xml`,
    llms_txt: `${SITE_BASE}/llms.txt`,
    json: `${SITE_BASE}/brand-kit.json`,
  },
} as const;

export type BrandKit = typeof brandKit;
