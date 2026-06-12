import { createFileRoute } from "@tanstack/react-router";
import { PageBody } from "@/components/site/PageBody";
import { pageBodies } from "@/lib/mwc/page-bodies";

export const Route = createFileRoute("/logo-library")({
  head: () => ({
    meta: [
      { title: "Logo Library · Men's Wellness Centers Brand" },
      { name: "description", content: "" },
      { property: "og:title", content: "Logo Library · Men's Wellness Centers Brand" },
      { property: "og:description", content: "" },
    ],
  }),
  component: PageLogoLibrary,
});

function PageLogoLibrary() {
  return <PageBody html={pageBodies["logo-library"]} />;
}
