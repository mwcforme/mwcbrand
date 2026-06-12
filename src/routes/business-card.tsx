import { createFileRoute } from "@tanstack/react-router";
import { BusinessCardBuilder } from "@/components/site/BusinessCardBuilder";

export const Route = createFileRoute("/business-card")({
  head: () => ({
    meta: [
      { title: "Business Card · Men's Wellness Centers Brand" },
      {
        name: "description",
        content:
          "Interactive business card builder for MWC employees. Live front/back preview, QR codes on both sides, and a print-ready PDF export.",
      },
      { property: "og:title", content: "Business Card · Men's Wellness Centers Brand" },
      {
        property: "og:description",
        content:
          "Build your MWC business card with QR codes on both sides and export a print-ready PDF.",
      },
    ],
  }),
  component: PageBusinessCard,
});

function PageBusinessCard() {
  return <BusinessCardBuilder />;
}
