import { createFileRoute } from "@tanstack/react-router";
import { PageBody } from "@/components/site/PageBody";
import { pageBodies } from "@/lib/mwc/page-bodies";

export const Route = createFileRoute("/email-signature")({
  head: () => ({
    meta: [
      { title: "Email Signature · Men's Wellness Centers Brand" },
      { name: "description", content: "" },
      { property: "og:title", content: "Email Signature · Men's Wellness Centers Brand" },
      { property: "og:description", content: "" },
    ],
  }),
  component: PageEmailSignature,
});

function PageEmailSignature() {
  return <PageBody html={pageBodies["email-signature"]} />;
}
