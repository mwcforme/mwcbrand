import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { brandKit } from "@/lib/mwc/brand-kit";

export const Route = createFileRoute("/brand-kit.json")({
  server: {
    handlers: {
      GET: async () => {
        return new Response(JSON.stringify(brandKit, null, 2), {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
            "Access-Control-Allow-Origin": "*",
          },
        });
      },
    },
  },
});
