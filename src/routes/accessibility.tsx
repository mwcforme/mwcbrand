import { createFileRoute } from "@tanstack/react-router";
import { PageBody } from "@/components/site/PageBody";
import { pageBodies } from "@/lib/mwc/page-bodies";

export const Route = createFileRoute("/accessibility")({
  head: () => ({
    meta: [
      { title: "Accessibility · Men's Wellness Centers Brand" },
      { name: "description", content: "" },
      { property: "og:title", content: "Accessibility · Men's Wellness Centers Brand" },
      { property: "og:description", content: "" },
    ],
  }),
  component: PageAccessibility,
});

function PageAccessibility() {
  return <PageBody html={pageBodies["accessibility"]} />;
}
