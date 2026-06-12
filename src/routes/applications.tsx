import { createFileRoute } from "@tanstack/react-router";
import { PageBody } from "@/components/site/PageBody";
import { pageBodies } from "@/lib/mwc/page-bodies";

export const Route = createFileRoute("/applications")({
  head: () => ({
    meta: [
      { title: "Applications · Men's Wellness Centers Brand" },
      { name: "description", content: "Brand applications: web, social, signage, stationery, and ads. The system in the wild." },
      { property: "og:title", content: "Applications · Men's Wellness Centers Brand" },
      { property: "og:description", content: "Brand applications: web, social, signage, stationery, and ads. The system in the wild." },
    ],
  }),
  component: PageApplications,
});

function PageApplications() {
  return <PageBody html={pageBodies["applications"]} />;
}
