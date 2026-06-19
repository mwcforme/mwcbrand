import { createFileRoute } from "@tanstack/react-router";

const modules = import.meta.glob<{
  default: { url: string; original_filename: string; size: number; content_type?: string };
}>("@/assets/stock/*.asset.json", { eager: true });

type Photo = { name: string; url: string; size: number; type: string };

const PHOTOS: Photo[] = Object.values(modules)
  .map((m) => ({
    name: m.default.original_filename,
    url: m.default.url,
    size: m.default.size,
    type: (m.default.content_type ?? "").split("/")[1]?.toUpperCase() || "IMG",
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

const TOTAL_BYTES = PHOTOS.reduce((sum, p) => sum + p.size, 0);

function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export const Route = createFileRoute("/stock-downloads")({
  head: () => ({
    meta: [
      { title: "Stock Image Downloads · Men's Wellness Centers Brand" },
      {
        name: "description",
        content:
          "Download every approved Men's Wellness Centers stock image. Thumbnails, filenames, and one-click downloads for all photos in the brand library.",
      },
      { property: "og:title", content: "Stock Image Downloads · Men's Wellness Centers Brand" },
      {
        property: "og:description",
        content:
          "Download every approved Men's Wellness Centers stock image with thumbnail preview.",
      },
    ],
  }),
  component: StockDownloadsPage,
});

function StockDownloadsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Brand Library</p>
          <h1>Stock Image Downloads</h1>
          <p>
            Every approved stock image in the Men's Wellness Centers library —
            with thumbnail preview, filename, and a one-click download for the
            original high-resolution file.
          </p>
          <p className="asset-result-count">
            {PHOTOS.length} {PHOTOS.length === 1 ? "image" : "images"} ·{" "}
            {formatSize(TOTAL_BYTES)} total
          </p>
        </div>
      </section>

      <section className="section-alt">
        <div className="container">
          <ul className="stock-download-list">
            {PHOTOS.map((p) => (
              <li key={p.url} className="stock-download-row">
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="stock-download-thumb"
                  aria-label={`Open ${p.name}`}
                >
                  <img src={p.url} alt={p.name} loading="lazy" />
                </a>
                <div className="stock-download-info">
                  <p className="stock-download-name" title={p.name}>
                    {p.name}
                  </p>
                  <div className="asset-tags">
                    <span className="asset-tag">{p.type}</span>
                    <span className="asset-tag asset-tag-ext">
                      {formatSize(p.size)}
                    </span>
                  </div>
                </div>
                <div className="stock-download-actions">
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
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
