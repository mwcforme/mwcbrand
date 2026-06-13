// Vite raw-imports for static page bodies. The HTML is authored with
// repo-relative asset paths (assets/…) and static .html links; rewrite() maps
// assets to their uploaded CDN URLs via asset-map.json and internal links to
// SPA routes at import time.
import index from "@/data/page-bodies/index.html?raw";
import logo from "@/data/page-bodies/logo.html?raw";
import logoLibrary from "@/data/page-bodies/logo-library.html?raw";
import color from "@/data/page-bodies/color.html?raw";
import typography from "@/data/page-bodies/typography.html?raw";
import voice from "@/data/page-bodies/voice.html?raw";
import applications from "@/data/page-bodies/applications.html?raw";
import accessibility from "@/data/page-bodies/accessibility.html?raw";
import prompts from "@/data/page-bodies/prompts.html?raw";
import emailSignature from "@/data/page-bodies/email-signature.html?raw";
import leadForms from "@/data/page-bodies/lead-forms.html?raw";
import downloads from "@/data/page-bodies/downloads.html?raw";
import manifest from "@/data/page-bodies/manifest.json";
import assetMap from "@/data/asset-map.json";

const A = assetMap as Record<string, string>;

function rewrite(html: string): string {
  return html
    // assets/... and prompt-library/... → uploaded CDN URL (quoted or unquoted attrs)
    .replace(
      /(src|srcset|href)=(["']?)((?:assets|prompt-library)\/[^"'\s>]+)\2/g,
      (m, attr: string, q: string, path: string) => {
        const mapped = A[path];
        return mapped ? `${attr}=${q}${mapped}${q}` : m;
      },
    )
    // internal static links (color.html, index.html#x) → SPA routes (/color, /#x)
    .replace(
      /href=(["']?)([a-z0-9-]+)\.html(#[^"'\s>]*)?\1/g,
      (_m, q: string, page: string, hash: string | undefined) =>
        `href=${q}${page === "index" ? "/" : `/${page}`}${hash ?? ""}${q}`,
    );
}

const raw: Record<string, string> = {
  index,
  logo,
  "logo-library": logoLibrary,
  color,
  typography,
  voice,
  applications,
  accessibility,
  prompts,
  "email-signature": emailSignature,
  "lead-forms": leadForms,
  downloads,
};

export const pageBodies: Record<string, string> = Object.fromEntries(
  Object.entries(raw).map(([k, v]) => [k, rewrite(v)]),
);

export const pageMeta = manifest as Record<
  string,
  { title: string; description: string; file: string }
>;
