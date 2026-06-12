import { createFileRoute } from "@tanstack/react-router";
import { PageBody } from "@/components/site/PageBody";
import { pageBodies } from "@/lib/mwc/page-bodies";

export const Route = createFileRoute("/typography")({
  head: () => ({
    meta: [
      { title: "Typography · Men's Wellness Centers Brand" },
      { name: "description", content: "Typography system: Oswald for display, Montserrat for body, Inter for data and code. Editorial spacing and uppercase headlines." },
      { property: "og:title", content: "Typography · Men's Wellness Centers Brand" },
      { property: "og:description", content: "Typography system: Oswald for display, Montserrat for body, Inter for data and code. Editorial spacing and uppercase headlines." },
    ],
  }),
  component: PageTypography,
});

function PageTypography() {
  return <PageBody html={pageBodies["typography"]} />;
}
