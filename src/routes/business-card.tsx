import { createFileRoute } from "@tanstack/react-router";
import { BusinessCardBuilder } from "@/components/site/BusinessCardBuilder";

export const Route = createFileRoute("/business-card")({
  head: () => ({
    meta: [
      { title: "Referral Card · Men's Wellness Centers Brand" },
      {
        name: "description",
        content:
          "Editable referral promo card for MWC. Live front/back preview, a black-and-white QR code on the back, and a print-ready PDF export.",
      },
      { property: "og:title", content: "Referral Card · Men's Wellness Centers Brand" },
      {
        property: "og:description",
        content:
          "Edit the MWC referral card copy and export a print-ready PDF with a scannable QR code.",
      },
    ],
  }),
  component: PageBusinessCard,
});

function PageBusinessCard() {
  return <BusinessCardBuilder />;
}
