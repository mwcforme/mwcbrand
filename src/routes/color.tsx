import { createFileRoute } from "@tanstack/react-router";
import { PageBody } from "@/components/site/PageBody";
import { pageBodies } from "@/lib/mwc/page-bodies";

export const Route = createFileRoute("/color")({
  head: () => ({
    meta: [
      { title: "Color · Men's Wellness Centers Brand" },
      { name: "description", content: "Color tokens: Midnight Navy, Accent Orange, Cream, and supporting palette. WCAG 2.2 AA compliant." },
      { property: "og:title", content: "Color · Men's Wellness Centers Brand" },
      { property: "og:description", content: "Color tokens: Midnight Navy, Accent Orange, Cream, and supporting palette. WCAG 2.2 AA compliant." },
    ],
  }),
  component: PageColor,
});

function PageColor() {
  return <PageBody html={pageBodies["color"]} />;
}
