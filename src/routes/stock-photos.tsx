import { createFileRoute } from "@tanstack/react-router";

const modules = import.meta.glob<{ default: { url: string; original_filename: string; size: number } }>(
  "@/assets/stock/*.asset.json",
  { eager: true },
);

type Photo = { name: string; url: string; size: number };

const PHOTOS: Photo[] = Object.values(modules)
  .map((m) => ({
    name: m.default.original_filename,
    url: m.default.url,
    size: m.default.size,
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

function formatSize(bytes: number) {
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export const Route = createFileRoute("/stock-photos")({
  head: () => ({
    meta: [
      { title: "Stock Photos · Men's Wellness Centers Brand" },
      {
        name: "description",
        content:
          "Approved stock photography for use across Men's Wellness Centers marketing and brand applications. Preview and download originals.",
      },
      { property: "og:title", content: "Stock Photos · Men's Wellness Centers Brand" },
      {
        property: "og:description",
        content:
          "Approved stock photography for use across Men's Wellness Centers marketing and brand applications.",
      },
    ],
  }),
  component: StockPhotosPage,
});

function StockPhotosPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Brand Library</p>
          <h1>Stock Photos</h1>
          <p>
            Approved, licensed stock photography for ads, web, social, and
            print. Click any image to preview at full size, or use Download to
            save the original high-resolution file.
          </p>
        </div>
      </section>

      <section className="section-alt">
        <div className="container">
          <p className="asset-result-count">
            {PHOTOS.length} {PHOTOS.length === 1 ? "photo" : "photos"} available
          </p>

          <ul className="asset-grid">
            {PHOTOS.map((p) => (
              <li key={p.url} className="asset-card">
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="asset-preview"
                  aria-label={`Open ${p.name}`}
                >
                  <img src={p.url} alt={p.name} loading="lazy" />
                </a>
                <div className="asset-meta">
                  <p className="asset-name" title={p.name}>{p.name}</p>
                  <div className="asset-tags">
                    <span className="asset-tag">JPG</span>
                    <span className="asset-tag asset-tag-ext">
                      {formatSize(p.size)}
                    </span>
                  </div>
                  <div className="asset-actions">
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noreferrer"
                      className="asset-link"
                    >
                      Open
                    </a>
                    <a
                      href={p.url}
                      download={p.name}
                      className="asset-link asset-link-primary"
                    >
                      Download
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
