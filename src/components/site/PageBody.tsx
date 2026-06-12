import { useRouter } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

/**
 * Renders trusted, project-authored HTML (from src/data/page-bodies/*) and
 * intercepts internal <a href="/..."> clicks so navigation stays client-side.
 */
export function PageBody({ html }: { html: string }) {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    function onClick(e: MouseEvent) {
      const a = (e.target as HTMLElement | null)?.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href) return;
      // Internal absolute paths starting with "/" but not "//" or "/__l5e/" (CDN downloads)
      if (
        href.startsWith("/") &&
        !href.startsWith("//") &&
        !href.startsWith("/__l5e/") &&
        !a.hasAttribute("download") &&
        a.getAttribute("target") !== "_blank"
      ) {
        e.preventDefault();
        router.navigate({ to: href });
      }
    }
    root.addEventListener("click", onClick);
    return () => root.removeEventListener("click", onClick);
  }, [router]);

  return <div ref={ref} dangerouslySetInnerHTML={{ __html: html }} />;
}
