import { createFileRoute } from "@tanstack/react-router";
import { PageBody } from "@/components/site/PageBody";
import { pageBodies } from "@/lib/mwc/page-bodies";

export const Route = createFileRoute("/logo")({
  head: () => ({
    meta: [
      { title: "Logo · Men's Wellness Centers Brand" },
      { name: "description", content: "" },
      { property: "og:title", content: "Logo · Men's Wellness Centers Brand" },
      { property: "og:description", content: "" },
    ],
  }),
  component: PageLogo,
});

function PageLogo() {
  return <PageBody html={pageBodies["logo"]} />;
}
