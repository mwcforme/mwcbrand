import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import logoLibrary from "@/data/logo-library-data.json";

const CDN_BASE = "https://mwc-brand.pplx.app/";

type Asset = {
  path: string;
  category: string;
  label: string;
  use_for: string;
  platform_spec: string;
  dimensions: [number, number] | null;
  size_bytes: number;
  ext: string;
};

type Category = {
  id: string;
  label: string;
  group: string;
  count: number;
};

export const Route = createFileRoute("/logo-library")({
  head: () => ({
    meta: [
      { title: "Logo Library · Men's Wellness Centers Brand" },
      {
        name: "description",
        content:
          "Every logo file with thumbnail, size, file type and suggested purpose. Filter, search, and download.",
      },
      { property: "og:title", content: "Logo Library · Men's Wellness Centers Brand" },
      {
        property: "og:description",
        content:
          "Every logo file with thumbnail, size, file type and suggested purpose. Filter, search, and download.",
      },
    ],
  }),
  component: PageLogoLibrary,
});

function formatBytes(n: number): string {
  if (!n) return "—";
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

function dimsLabel(a: Asset): string {
  if (a.dimensions) return `${a.dimensions[0]} × ${a.dimensions[1]} px`;
  if (a.ext === "svg") return "Vector (any size)";
  return "—";
}

function isDarkTile(a: Asset): boolean {
  const s = (a.label + " " + a.path).toLowerCase();
  return (
    s.includes("white") ||
    s.includes("cream") ||
    s.includes("light") ||
    s.includes("on_navy") ||
    s.includes("_navy.") ||
    s.includes("(navy)") ||
    s.includes("darkmode")
  );
}

function hasOrange(a: Asset): boolean {
  const s = (a.label + " " + a.path + " " + a.use_for).toLowerCase();
  return (
    s.includes("orange") ||
    s.includes("on_orange") ||
    s.includes("orange_bg") ||
    s.includes("_orange.") ||
    s.includes("(orange)")
  );
}

function PageLogoLibrary() {
  const data = logoLibrary as { categories: Category[]; assets: Asset[] };
  // Defensive: never surface any orange-containing logo, even if the JSON drifts.
  const assets = data.assets.filter((a) => !hasOrange(a));
  const allowedCats = new Set(assets.map((a) => a.category));
  const counts = assets.reduce<Record<string, number>>((acc, a) => {
    acc[a.category] = (acc[a.category] || 0) + 1;
    return acc;
  }, {});
  const categories = data.categories
    .filter((c) => allowedCats.has(c.id))
    .map((c) => ({ ...c, count: counts[c.id] || 0 }));

  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<string>("all");
  const [activeExt, setActiveExt] = useState<string>("all");

  const exts = useMemo(
    () => Array.from(new Set(assets.map((a) => a.ext))).sort(),
    [assets]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return assets.filter((a) => {
      if (activeCat !== "all" && a.category !== activeCat) return false;
      if (activeExt !== "all" && a.ext !== activeExt) return false;
      if (!q) return true;
      return (
        a.label.toLowerCase().includes(q) ||
        a.use_for.toLowerCase().includes(q) ||
        a.platform_spec.toLowerCase().includes(q) ||
        a.path.toLowerCase().includes(q)
      );
    });
  }, [assets, query, activeCat, activeExt]);

  // Group categories by group for the pills
  const groups = useMemo(() => {
    const m = new Map<string, Category[]>();
    for (const c of categories) {
      if (!m.has(c.group)) m.set(c.group, []);
      m.get(c.group)!.push(c);
    }
    return Array.from(m.entries());
  }, [categories]);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Brand Assets</p>
          <h1>Logo Library.</h1>
          <p>
            Every logo file with a live thumbnail, dimensions, file type and
            suggested purpose. Filter by platform or file type, search by name
            or use case, and download the exact file you need.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 24 }}>
            <a className="btn btn-ghost" href="/logo">
              View logo system rules
            </a>
          </div>
        </div>
      </section>

      <section className="section-alt">
        <div className="container">
          {/* Toolbar */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              marginBottom: 32,
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 16,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <input
                type="search"
                aria-label="Search the logo library"
                placeholder="Search by name, use case, or platform…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{
                  flex: "1 1 320px",
                  minWidth: 260,
                  padding: "14px 18px",
                  border: "1px solid var(--cream-deep)",
                  borderRadius: 6,
                  background: "var(--cream)",
                  color: "var(--ink)",
                  fontSize: 15,
                  fontFamily: "inherit",
                }}
              />
              <span
                style={{
                  fontSize: 12,
                  letterSpacing: ".18em",
                  textTransform: "uppercase",
                  color: "var(--ink-soft)",
                  fontWeight: 600,
                }}
              >
                {filtered.length} of {assets.length} assets
              </span>
            </div>

            {/* Category pills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <FilterPill
                active={activeCat === "all"}
                onClick={() => setActiveCat("all")}
                label={`All (${assets.length})`}
              />
              {groups.map(([group, items]) => (
                <span
                  key={group}
                  style={{ display: "inline-flex", gap: 8, flexWrap: "wrap" }}
                >
                  {items.map((c) => (
                    <FilterPill
                      key={c.id}
                      active={activeCat === c.id}
                      onClick={() => setActiveCat(c.id)}
                      label={`${c.label} (${c.count})`}
                    />
                  ))}
                </span>
              ))}
            </div>

            {/* Ext filter */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: ".2em",
                  textTransform: "uppercase",
                  color: "var(--ink-soft)",
                  fontWeight: 600,
                  alignSelf: "center",
                  marginRight: 4,
                }}
              >
                File type
              </span>
              <FilterPill
                active={activeExt === "all"}
                onClick={() => setActiveExt("all")}
                label="All"
              />
              {exts.map((e) => (
                <FilterPill
                  key={e}
                  active={activeExt === e}
                  onClick={() => setActiveExt(e)}
                  label={e.toUpperCase()}
                />
              ))}
            </div>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <p style={{ color: "var(--ink-soft)", padding: "48px 0" }}>
              No assets match your filters.
            </p>
          ) : (
            <div
              style={{
                display: "grid",
                gap: 20,
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(260px, 1fr))",
              }}
            >
              {filtered.map((a) => (
                <AssetCard key={a.path} asset={a} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function FilterPill({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: "8px 14px",
        borderRadius: 999,
        border: `1px solid ${active ? "var(--navy)" : "var(--cream-deep)"}`,
        background: active ? "var(--navy)" : "var(--cream)",
        color: active ? "var(--cream)" : "var(--ink)",
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: ".08em",
        textTransform: "uppercase",
        cursor: "pointer",
        fontFamily: "inherit",
        transition: "all .15s ease",
      }}
    >
      {label}
    </button>
  );
}

function AssetCard({ asset }: { asset: Asset }) {
  const url = CDN_BASE + asset.path;
  const filename = asset.path.split("/").pop() || "asset";
  const dark = isDarkTile(asset);

  return (
    <div
      style={{
        background: "var(--cream)",
        border: "1px solid var(--cream-deep)",
        borderRadius: 8,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          background: dark ? "var(--navy)" : "var(--cream-mid)",
          padding: 20,
          minHeight: 180,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "1px solid var(--cream-deep)",
        }}
      >
        <img
          src={url}
          alt={asset.label}
          loading="lazy"
          style={{
            maxWidth: "100%",
            maxHeight: 140,
            width: "auto",
            height: "auto",
            display: "block",
          }}
        />
      </div>
      <div
        style={{
          padding: 18,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          flex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
          }}
        >
          <h3
            style={{
              fontSize: 14,
              letterSpacing: ".08em",
              color: "var(--navy)",
              margin: 0,
            }}
          >
            {asset.label}
          </h3>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: ".16em",
              padding: "4px 8px",
              background: "var(--navy)",
              color: "var(--cream)",
              borderRadius: 3,
              flexShrink: 0,
            }}
          >
            {asset.ext.toUpperCase()}
          </span>
        </div>

        <dl
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            columnGap: 10,
            rowGap: 4,
            fontSize: 12,
            color: "var(--ink-soft)",
            margin: 0,
          }}
        >
          <dt style={{ fontWeight: 600, color: "var(--ink)" }}>Size</dt>
          <dd style={{ margin: 0 }}>{dimsLabel(asset)}</dd>
          <dt style={{ fontWeight: 600, color: "var(--ink)" }}>File</dt>
          <dd style={{ margin: 0 }}>{formatBytes(asset.size_bytes)}</dd>
          <dt style={{ fontWeight: 600, color: "var(--ink)" }}>Spec</dt>
          <dd style={{ margin: 0 }}>{asset.platform_spec}</dd>
        </dl>

        <p
          style={{
            fontSize: 13,
            color: "var(--ink-soft)",
            margin: 0,
            lineHeight: 1.5,
            flex: 1,
          }}
        >
          <strong style={{ color: "var(--navy)" }}>Use for:</strong>{" "}
          {asset.use_for}
        </p>

        <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
          <a
            href={url}
            download={filename}
            className="btn btn-primary"
            style={{ padding: "10px 16px", fontSize: 12, flex: 1, textAlign: "center" }}
          >
            Download
          </a>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost"
            style={{ padding: "10px 14px", fontSize: 12 }}
            aria-label="Open in new tab"
          >
            Open
          </a>
        </div>
      </div>
    </div>
  );
}
