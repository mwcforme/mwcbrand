import { createFileRoute } from "@tanstack/react-router";
import { PageBody } from "@/components/site/PageBody";
import { pageBodies } from "@/lib/mwc/page-bodies";

export const Route = createFileRoute("/downloads")({
  head: () => ({
    meta: [
      { title: "Downloads · Men's Wellness Centers Brand" },
      { name: "description", content: "Downloadable brand assets: full pack, SVG logos, PNG logos, PDF logos, favicons, and social avatars." },
      { property: "og:title", content: "Downloads · Men's Wellness Centers Brand" },
      { property: "og:description", content: "Downloadable brand assets: full pack, SVG logos, PNG logos, PDF logos, favicons, and social avatars." },
    ],
  }),
  component: PageDownloads,
});

function PageDownloads() {
  return <PageBody html={pageBodies["downloads"]} />;
}
