import { createFileRoute } from "@tanstack/react-router";
import { PageBody } from "@/components/site/PageBody";
import { pageBodies } from "@/lib/mwc/page-bodies";

export const Route = createFileRoute("/lead-forms")({
  head: () => ({
    meta: [
      { title: "Lead Forms · Men's Wellness Centers Brand" },
      { name: "description", content: "" },
      { property: "og:title", content: "Lead Forms · Men's Wellness Centers Brand" },
      { property: "og:description", content: "" },
    ],
  }),
  component: PageLeadForms,
});

function PageLeadForms() {
  return <PageBody html={pageBodies["lead-forms"]} />;
}
