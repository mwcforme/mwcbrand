import { createFileRoute } from "@tanstack/react-router";
import { PageBody } from "@/components/site/PageBody";
import { pageBodies } from "@/lib/mwc/page-bodies";

export const Route = createFileRoute("/voice")({
  head: () => ({
    meta: [
      { title: "Voice & Messaging · Men's Wellness Centers Brand" },
      { name: "description", content: "Brand voice, terminology, tagline, and approved phrases. Members not patients. No clinic. No free. No em-dashes." },
      { property: "og:title", content: "Voice & Messaging · Men's Wellness Centers Brand" },
      { property: "og:description", content: "Brand voice, terminology, tagline, and approved phrases. Members not patients. No clinic. No free. No em-dashes." },
    ],
  }),
  component: PageVoice,
});

function PageVoice() {
  return <PageBody html={pageBodies["voice"]} />;
}
