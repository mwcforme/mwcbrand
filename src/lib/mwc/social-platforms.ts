import assetMap from "@/data/asset-map.json";

const MAP = assetMap as Record<string, string>;

export type PlatformSlug =
  | "linkedin"
  | "facebook"
  | "instagram"
  | "tiktok"
  | "youtube"
  | "x-twitter"
  | "threads"
  | "github"
  | "google-business";

export type PlatformAsset = {
  path: string;
  url: string;
  name: string;
  ext: string;
  role: string; // "cover", "avatar", "post", "story", "ad", "other"
  dims?: string;
};

export type Platform = {
  slug: PlatformSlug;
  name: string;
  handle: string;
  tagline: string;
  description: string;
  brandColor: string; // platform brand color
  brandColorSoft: string;
  surface: "light" | "dark";
  match: (path: string) => boolean;
  preferred: { cover?: string; avatar?: string; post?: string };
  specs: { label: string; size: string }[];
};

const HANDLE = "@menswellnesscenters";

export const PLATFORMS: Record<PlatformSlug, Platform> = {
  linkedin: {
    slug: "linkedin",
    name: "LinkedIn",
    handle: "Men's Wellness Centers",
    tagline: "Modern men's health, delivered with precision.",
    description:
      "Company page, personal banners, and sponsored content built to the LinkedIn spec system.",
    brandColor: "#0A66C2",
    brandColorSoft: "#E7F1FB",
    surface: "light",
    match: (p) => p.includes("/social/linkedin"),
    preferred: {
      cover: "linkedin_company_cover_1128x191_navy.png",
      avatar: "linkedin_company_logo_300x300_white_on_navy.png",
      post: "linkedin_square_1200x1200_navy.png",
    },
    specs: [
      { label: "Company Cover", size: "1128 × 191" },
      { label: "Personal Banner", size: "1584 × 396" },
      { label: "Company Logo", size: "300 × 300" },
      { label: "Square Post", size: "1200 × 1200" },
      { label: "Sponsored", size: "1200 × 628" },
      { label: "Life Tab", size: "1128 × 376" },
    ],
  },
  facebook: {
    slug: "facebook",
    name: "Facebook",
    handle: HANDLE,
    tagline: "Your local team for men's health & longevity.",
    description:
      "Page covers, profile marks, square + portrait posts, and 9:16 story ads.",
    brandColor: "#1877F2",
    brandColorSoft: "#E7F0FE",
    surface: "light",
    match: (p) =>
      /\/social\/facebook(?!_instagram)/.test(p) ||
      p.includes("/social/facebook_instagram_"),
    preferred: {
      cover: "facebook_cover_1640x924_navy.png",
      avatar: "facebook_320x320_white_on_navy.png",
      post: "facebook_instagram_square_1440x1440_navy.png",
    },
    specs: [
      { label: "Page Cover", size: "1640 × 924" },
      { label: "Legacy Cover", size: "851 × 315" },
      { label: "Profile", size: "320 × 320" },
      { label: "Square Post", size: "1440 × 1440" },
      { label: "Portrait", size: "1440 × 1800" },
      { label: "Story / Ad", size: "1440 × 2560" },
    ],
  },
  instagram: {
    slug: "instagram",
    name: "Instagram",
    handle: HANDLE,
    tagline: "Confidence is a daily practice.",
    description:
      "Square and 4:5 portrait posts plus 9:16 stories, drawn from the shared Meta visual set.",
    brandColor: "#E1306C",
    brandColorSoft: "#FCE7EF",
    surface: "light",
    match: (p) => p.includes("/social/facebook_instagram_"),
    preferred: {
      avatar: "facebook_320x320_white_on_navy.png",
      post: "facebook_instagram_portrait_1440x1800_navy.png",
    },
    specs: [
      { label: "Square Post", size: "1440 × 1440" },
      { label: "Portrait Post", size: "1440 × 1800" },
      { label: "Story / Reel", size: "1440 × 2560" },
      { label: "Profile", size: "320 × 320" },
    ],
  },
  tiktok: {
    slug: "tiktok",
    name: "TikTok",
    handle: HANDLE,
    tagline: "Real men. Real health. Real talk.",
    description:
      "Profile marks across three sizes plus 9:16 vertical safe-zone reference frames.",
    brandColor: "#FE2C55",
    brandColorSoft: "#1F1F1F",
    surface: "dark",
    match: (p) => p.includes("/social/tiktok"),
    preferred: {
      avatar: "tiktok_profile_1080x1080_white_on_navy.png",
      post: "tiktok_vertical_1080x1920_navy.png",
    },
    specs: [
      { label: "Profile 1080", size: "1080 × 1080" },
      { label: "Profile 720", size: "720 × 720" },
      { label: "Profile 200", size: "200 × 200" },
      { label: "Vertical Frame", size: "1080 × 1920" },
    ],
  },
  youtube: {
    slug: "youtube",
    name: "YouTube",
    handle: HANDLE,
    tagline: "Men's Wellness Centers — channel home",
    description:
      "Channel banner with TV-safe area plus profile marks for the corner badge.",
    brandColor: "#FF0000",
    brandColorSoft: "#FFE9E9",
    surface: "light",
    match: (p) => p.includes("/social/youtube"),
    preferred: {
      cover: "youtube_banner_2560x1440_navy.png",
      avatar: "youtube_800x800_white_on_navy.png",
    },
    specs: [
      { label: "Channel Banner", size: "2560 × 1440" },
      { label: "Profile", size: "800 × 800" },
    ],
  },
  "x-twitter": {
    slug: "x-twitter",
    name: "X (Twitter)",
    handle: HANDLE,
    tagline: "Health that meets you where you are.",
    description:
      "Header banner sized for the new X profile crop, paired with the bug for the avatar.",
    brandColor: "#000000",
    brandColorSoft: "#15202B",
    surface: "dark",
    match: (p) => p.includes("/social/x_twitter"),
    preferred: {
      cover: "x_twitter_header_1500x500_navy.png",
      avatar: "linkedin_company_logo_300x300_white_on_navy.png",
    },
    specs: [
      { label: "Header", size: "1500 × 500" },
      { label: "Profile", size: "400 × 400" },
    ],
  },
  threads: {
    slug: "threads",
    name: "Threads",
    handle: HANDLE,
    tagline: "Short notes from the clinic.",
    description: "Link-preview image sized for Threads' 2:1 share card.",
    brandColor: "#000000",
    brandColorSoft: "#101010",
    surface: "dark",
    match: (p) => p.includes("/social/threads"),
    preferred: {
      cover: "threads_link_preview_1200x600.png",
      avatar: "linkedin_company_logo_300x300_white_on_navy.png",
    },
    specs: [{ label: "Link Preview", size: "1200 × 600" }],
  },
  github: {
    slug: "github",
    name: "GitHub",
    handle: "menswellnesscenters",
    tagline: "Internal tooling & open-source contributions.",
    description:
      "Organization avatar plus the 2:1 social preview card used when repos are linked.",
    brandColor: "#24292F",
    brandColorSoft: "#0D1117",
    surface: "dark",
    match: (p) => p.includes("/social/github"),
    preferred: {
      cover: "github_social_preview_1280x640_navy.png",
      avatar: "github_profile_500x500_white_on_navy.png",
    },
    specs: [
      { label: "Social Preview", size: "1280 × 640" },
      { label: "Profile", size: "500 × 500" },
      { label: "Avatar", size: "260 × 260" },
    ],
  },
  "google-business": {
    slug: "google-business",
    name: "Google Business",
    handle: "Men's Wellness Centers",
    tagline: "Trusted men's health — open today",
    description:
      "Profile assets for the Google Business listing: logo, square profile, and cover.",
    brandColor: "#1A73E8",
    brandColorSoft: "#E8F0FE",
    surface: "light",
    match: (p) => p.includes("/social/gbp_"),
    preferred: {
      cover: "gbp_cover_1080x608.png",
      avatar: "gbp_logo_720x720.png",
    },
    specs: [
      { label: "Cover", size: "1080 × 608" },
      { label: "Logo", size: "720 × 720" },
      { label: "Profile", size: "250 × 250" },
    ],
  },
};

export const PLATFORM_ORDER: PlatformSlug[] = [
  "linkedin",
  "facebook",
  "instagram",
  "tiktok",
  "youtube",
  "x-twitter",
  "threads",
  "github",
  "google-business",
];

function deriveRole(filename: string): string {
  const f = filename.toLowerCase();
  if (f.includes("cover") || f.includes("banner") || f.includes("header"))
    return "cover";
  if (
    f.includes("profile") ||
    f.includes("avatar") ||
    f.includes("logo") ||
    f.includes("square_60") ||
    /\b(200|260|300|320|400|500|720|800)\b/.test(f)
  )
    return "avatar";
  if (f.includes("story") || f.includes("vertical") || f.includes("1920"))
    return "story";
  if (f.includes("sponsored") || f.includes("ad") || f.includes("preview"))
    return "ad";
  if (f.includes("life_tab")) return "feature";
  return "post";
}

function deriveDims(filename: string): string | undefined {
  const m = filename.match(/(\d{2,5})x(\d{2,5})/);
  return m ? `${m[1]} × ${m[2]}` : undefined;
}

export function getPlatformAssets(slug: PlatformSlug): PlatformAsset[] {
  const platform = PLATFORMS[slug];
  return Object.entries(MAP)
    .filter(([path]) => platform.match(path))
    .map(([path, url]) => {
      const name = path.split("/").pop() ?? path;
      const ext = (name.split(".").pop() ?? "").toLowerCase();
      return {
        path,
        url,
        name,
        ext,
        role: deriveRole(name),
        dims: deriveDims(name),
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function pickAsset(
  assets: PlatformAsset[],
  preferredFilename: string | undefined,
  fallbackRole: string,
): PlatformAsset | undefined {
  if (preferredFilename) {
    const hit = assets.find((a) => a.name === preferredFilename);
    if (hit) return hit;
  }
  return assets.find((a) => a.role === fallbackRole);
}

export function getPlatformHero(slug: PlatformSlug) {
  const assets = getPlatformAssets(slug);
  const platform = PLATFORMS[slug];
  return {
    assets,
    cover: pickAsset(assets, platform.preferred.cover, "cover"),
    avatar: pickAsset(assets, platform.preferred.avatar, "avatar"),
    post: pickAsset(assets, platform.preferred.post, "post"),
  };
}
