import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://mwcbrand.lovable.app";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const SOCIAL_PLATFORMS = [
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

const STATIC_ROUTES: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/logo", changefreq: "monthly", priority: "0.8" },
  { path: "/logo-library", changefreq: "monthly", priority: "0.7" },
  { path: "/color", changefreq: "monthly", priority: "0.7" },
  { path: "/typography", changefreq: "monthly", priority: "0.7" },
  { path: "/voice", changefreq: "monthly", priority: "0.8" },
  { path: "/accessibility", changefreq: "monthly", priority: "0.6" },
  { path: "/applications", changefreq: "monthly", priority: "0.7" },
  { path: "/downloads", changefreq: "weekly", priority: "0.7" },
  { path: "/stock-photos", changefreq: "weekly", priority: "0.7" },
  { path: "/stock-downloads", changefreq: "weekly", priority: "0.7" },
  { path: "/search", changefreq: "weekly", priority: "0.5" },
  { path: "/business-card", changefreq: "monthly", priority: "0.6" },
  { path: "/email-signature", changefreq: "monthly", priority: "0.6" },
  { path: "/lead-forms", changefreq: "monthly", priority: "0.6" },
  { path: "/prompts", changefreq: "monthly", priority: "0.6" },
  { path: "/social", changefreq: "weekly", priority: "0.8" },
  { path: "/social/fathers-day", changefreq: "weekly", priority: "0.8" },
  { path: "/social/reengagement-mms", changefreq: "weekly", priority: "0.8" },
  { path: "/campaigns/fathers-day", changefreq: "weekly", priority: "0.9" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          ...STATIC_ROUTES,
          ...SOCIAL_PLATFORMS.map((slug) => ({
            path: `/social/${slug}`,
            changefreq: "monthly" as const,
            priority: "0.7",
          })),
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
