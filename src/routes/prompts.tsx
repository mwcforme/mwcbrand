import { createFileRoute } from "@tanstack/react-router";
import { PageBody } from "@/components/site/PageBody";
import { pageBodies } from "@/lib/mwc/page-bodies";

export const Route = createFileRoute("/prompts")({
  head: () => ({
    meta: [
      { title: "Prompt Library · Men's Wellness Centers Brand" },
      { name: "description", content: "" },
      { property: "og:title", content: "Prompt Library · Men's Wellness Centers Brand" },
      { property: "og:description", content: "" },
    ],
  }),
  component: PagePrompts,
});

function PagePrompts() {
  return <PageBody html={pageBodies["prompts"]} />;
}
