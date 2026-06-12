import { createFileRoute } from "@tanstack/react-router";
import { EmailSignatureEditor } from "@/components/site/EmailSignatureEditor";

export const Route = createFileRoute("/email-signature")({
  head: () => ({
    meta: [
      { title: "Email Signature · Men's Wellness Centers Brand" },
      {
        name: "description",
        content:
          "Interactive editor for the official Men's Wellness Centers employee email signature. Fill, preview, and copy in one step.",
      },
      { property: "og:title", content: "Email Signature · Men's Wellness Centers Brand" },
      {
        property: "og:description",
        content:
          "Build your MWC email signature with a live preview and one-click copy.",
      },
    ],
  }),
  component: PageEmailSignature,
});

function PageEmailSignature() {
  return <EmailSignatureEditor />;
}
