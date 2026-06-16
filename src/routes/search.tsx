import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import assetMap from "@/data/asset-map.json";

const searchSchema = z.object({
  q: z.string().optional().catch(""),
});

export const Route = createFileRoute("/search")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Search Assets · Men's Wellness Centers Brand" },
      {
        name: "description",
        content:
          "Search the full brand asset library: logos, downloads, favicons, social images, and more.",
      },
    ],
  }),
  component: SearchPage,
});

type AssetEntry = {
  path: string;
  url: string;
  name: string;
  folder: string;
  ext: string;
  category: string;
  isImage: boolean;
  hasDarkBg: boolean;
};

const IMG_EXT = new Set([
  "png",
  "jpg",
  "jpeg",
  "webp",
  "gif",
  "svg",
  "ico",
  "avif",
]);

function categorize(path: string): string {
  if (path.includes("/downloads/")) return "Downloads";
  if (path.includes("/logos/svg/")) return "Logos · SVG";
  if (path.includes("/logos/png/")) return "Logos · PNG";
  if (path.includes("/logos/pdf/")) return "Logos · PDF";
  if (path.includes("/logos/")) return "Logos";
  if (path.includes("/favicons/") || path.includes("favicon")) return "Favicons";
  if (path.includes("/social/")) return "Social";
  if (path.includes("/applications/") || path.includes("/in-the-wild/"))
    return "Applications";
  if (path.includes("/email")) return "Email";
  return "Other";
}

const ALL_ASSETS: AssetEntry[] = Object.entries(
  assetMap as Record<string, string>,
).map(([path, url]) => {
  const file = path.split("/").pop() ?? path;
  const folder = path.substring(0, path.lastIndexOf("/"));
  const ext = (file.split(".").pop() ?? "").toLowerCase();
  const lower = file.toLowerCase();
  return {
    path,
    url,
    name: file,
    folder,
    ext,
    category: categorize(path),
    isImage: IMG_EXT.has(ext),
    hasDarkBg:
      lower.includes("white_on") ||
      lower.includes("on_navy") ||
      lower.includes("_white_") ||
      lower.endsWith("_white.svg"),
  };
});

const CATEGORIES = Array.from(new Set(ALL_ASSETS.map((a) => a.category))).sort();

function SearchPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/search" });
  const [query, setQuery] = useState(search.q ?? "");
  const [category, setCategory] = useState<string>("All");

  const results = useMemo(() => {
    const tokens: string[] = query
      .toLowerCase()
      .split(/\s+/)
      .map((t: string) => t.trim())
      .filter(Boolean);
    return ALL_ASSETS.filter((a) => {
      if (category !== "All" && a.category !== category) return false;
      if (tokens.length === 0) return true;
      const hay = a.path.toLowerCase();
      return tokens.every((t: string) => hay.includes(t));
    });
  }, [query, category]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    navigate({ search: { q: query || undefined } });
  }

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Brand Library</p>
          <h1>Search Assets</h1>
          <p>
            Find any logo, favicon, social image, or downloadable kit across the
            full brand library. Type to filter by filename, format, or folder.
          </p>

          <form onSubmit={onSubmit} className="asset-search-bar" role="search">
            <input
              type="search"
              placeholder="Search for 'navy png', 'favicon', 'wordmark svg'…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search assets"
              autoFocus
            />
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </form>

          <div className="asset-filter-chips" role="tablist" aria-label="Filter by category">
            {["All", ...CATEGORIES].map((c) => (
              <button
                type="button"
                key={c}
                className={`chip${category === c ? " chip-active" : ""}`}
                onClick={() => setCategory(c)}
                aria-pressed={category === c}
              >
                {c}
                <span className="chip-count">
                  {c === "All"
                    ? ALL_ASSETS.length
                    : ALL_ASSETS.filter((a) => a.category === c).length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section-alt">
        <div className="container">
          <p className="asset-result-count">
            {results.length} {results.length === 1 ? "asset" : "assets"}
            {query ? <> matching "<strong>{query}</strong>"</> : null}
          </p>

          {results.length === 0 ? (
            <div className="asset-empty">
              <h3>No assets found</h3>
              <p>Try fewer keywords or pick a different category above.</p>
            </div>
          ) : (
            <ul className="asset-grid">
              {results.map((a) => (
                <li key={a.path} className={`asset-card${a.hasDarkBg ? " on-dark" : ""}`}>
                  <a
                    href={a.url}
                    target="_blank"
                    rel="noreferrer"
                    className="asset-preview"
                    aria-label={`Open ${a.name}`}
                  >
                    {a.isImage ? (
                      <img src={a.url} alt={a.name} loading="lazy" />
                    ) : (
                      <div className="asset-file-icon" aria-hidden="true">
                        <span>{a.ext.toUpperCase() || "FILE"}</span>
                      </div>
                    )}
                  </a>
                  <div className="asset-meta">
                    <p className="asset-name" title={a.name}>{a.name}</p>
                    <p className="asset-folder" title={a.folder}>{a.folder}</p>
                    <div className="asset-tags">
                      <span className="asset-tag">{a.category}</span>
                      <span className="asset-tag asset-tag-ext">{a.ext}</span>
                    </div>
                    <div className="asset-actions">
                      <a href={a.url} target="_blank" rel="noreferrer" className="asset-link">
                        Open
                      </a>
                      <a href={a.url} download={a.name} className="asset-link asset-link-primary">
                        Download
                      </a>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
