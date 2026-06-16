import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  PLATFORMS,
  PLATFORM_ORDER,
  type PlatformSlug,
  getPlatformAssets,
  getPlatformHero,
} from "@/lib/mwc/social-platforms";

export const Route = createFileRoute("/social/$platform")({
  loader: ({ params }) => {
    const slug = params.platform as PlatformSlug;
    if (!PLATFORMS[slug]) throw notFound();
    return { slug };
  },
  head: ({ params }) => {
    const slug = params.platform as PlatformSlug;
    const p = PLATFORMS[slug];
    if (!p) {
      return {
        meta: [{ title: "Platform · Men's Wellness Centers Brand" }],
      };
    }
    return {
      meta: [
        { title: `${p.name} · Social · MWC Brand` },
        {
          name: "description",
          content: `${p.name} brand assets, specs, and live profile mockup for Men's Wellness Centers. ${p.description}`,
        },
        {
          property: "og:title",
          content: `${p.name} · MWC Brand`,
        },
        {
          property: "og:description",
          content: p.description,
        },
        {
          property: "og:url",
          content: `https://mwcbrand.lovable.app/social/${slug}`,
        },
      ],
      links: [
        {
          rel: "canonical",
          href: `https://mwcbrand.lovable.app/social/${slug}`,
        },
      ],
    };
  },
  component: PlatformPage,
});

function PlatformPage() {
  const data = Route.useLoaderData() as { slug: PlatformSlug };
  const slug = data.slug;
  const platform = PLATFORMS[slug];
  const { assets, cover, avatar, post } = getPlatformHero(slug);

  return (
    <>
      <section
        className={`page-hero platform-hero platform-${slug} surface-${platform.surface}`}
        style={{
          background:
            platform.surface === "dark"
              ? platform.brandColorSoft
              : undefined,
        }}
      >
        <div className="container">
          <p
            className="eyebrow"
            style={{
              color:
                platform.surface === "dark" ? "#fff" : platform.brandColor,
            }}
          >
            Channels · {platform.name}
          </p>
          <h1
            style={{
              color: platform.surface === "dark" ? "#fff" : undefined,
            }}
          >
            {platform.name}
          </h1>
          <p
            style={{
              color:
                platform.surface === "dark"
                  ? "rgba(255,255,255,0.78)"
                  : undefined,
            }}
          >
            {platform.description}
          </p>

          <div className="platform-nav" role="navigation" aria-label="Other platforms">
            {PLATFORM_ORDER.map((s) => (
              <Link
                key={s}
                to="/social/$platform"
                params={{ platform: s }}
                className={`platform-nav-pill${s === slug ? " active" : ""}`}
              >
                {PLATFORMS[s].name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Live Profile Mockup</h2>
          <p className="section-lede">
            How the assets render inside the real {platform.name} profile chrome.
          </p>

          <PlatformMockup
            slug={slug}
            cover={cover?.url}
            avatar={avatar?.url}
            post={post?.url}
          />
        </div>
      </section>

      <section className="section-alt">
        <div className="container">
          <h2 className="section-title">Spec Sheet</h2>
          <ul className="spec-grid">
            {platform.specs.map((s) => (
              <li key={s.label} className="spec-card">
                <p className="spec-label">{s.label}</p>
                <p className="spec-size">{s.size}</p>
                <p className="spec-unit">pixels</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">All {platform.name} Assets</h2>
          <p className="section-lede">
            {assets.length}{" "}
            {assets.length === 1 ? "file" : "files"} in the library.
          </p>
          {assets.length === 0 ? (
            <div className="asset-empty">
              <h3>No assets yet</h3>
              <p>This platform hasn't been packaged into the library yet.</p>
            </div>
          ) : (
            <ul className="asset-grid">
              {assets.map((a) => (
                <li
                  key={a.path}
                  className={`asset-card${platform.surface === "dark" || a.name.toLowerCase().includes("white_on") || a.name.toLowerCase().includes("_navy.png") ? " on-dark" : ""}`}
                >
                  <a
                    href={a.url}
                    target="_blank"
                    rel="noreferrer"
                    className="asset-preview"
                    aria-label={`Open ${a.name}`}
                  >
                    <img src={a.url} alt={a.name} loading="lazy" />
                  </a>
                  <div className="asset-meta">
                    <p className="asset-name" title={a.name}>
                      {a.name}
                    </p>
                    <div className="asset-tags">
                      <span className="asset-tag">{a.role}</span>
                      {a.dims ? (
                        <span className="asset-tag">{a.dims}</span>
                      ) : null}
                      <span className="asset-tag asset-tag-ext">{a.ext}</span>
                    </div>
                    <div className="asset-actions">
                      <a
                        href={a.url}
                        target="_blank"
                        rel="noreferrer"
                        className="asset-link"
                      >
                        Open
                      </a>
                      <a
                        href={a.url}
                        download={a.name}
                        className="asset-link asset-link-primary"
                      >
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

function PlatformMockup({
  slug,
  cover,
  avatar,
  post,
}: {
  slug: PlatformSlug;
  cover?: string;
  avatar?: string;
  post?: string;
}) {
  const p = PLATFORMS[slug];
  switch (slug) {
    case "linkedin":
      return (
        <div className="mockup mockup-linkedin">
          <div className="mock-chrome">
            <div className="mock-chrome-bar" style={{ background: p.brandColor }}>
              <span className="mock-chrome-logo">in</span>
              <span className="mock-chrome-search">Search</span>
            </div>
          </div>
          <div className="mock-card">
            <div className="mock-cover" style={{ background: p.brandColorSoft }}>
              {cover ? <img src={cover} alt="" /> : null}
            </div>
            <div className="mock-profile-row">
              <div className="mock-avatar mock-avatar-square">
                {avatar ? <img src={avatar} alt="" /> : null}
              </div>
              <div className="mock-profile-text">
                <h3>{p.handle}</h3>
                <p>{p.tagline}</p>
                <p className="mock-meta">Health, Wellness & Fitness · 1,240 followers</p>
                <div className="mock-actions">
                  <button type="button" style={{ background: p.brandColor }}>
                    + Follow
                  </button>
                  <button type="button" className="ghost">Visit website</button>
                </div>
              </div>
            </div>
            <div className="mock-feed-card">
              <p className="mock-post-header">
                <strong>{p.handle}</strong> posted · 2h
              </p>
              {post ? <img src={post} alt="" className="mock-post-img" /> : null}
              <p className="mock-post-caption">
                Confidence is built on real data. Here's what we measure on day
                one. <span style={{ color: p.brandColor }}>#mensheath</span>
              </p>
            </div>
          </div>
        </div>
      );
    case "facebook":
      return (
        <div className="mockup mockup-facebook">
          <div className="mock-chrome">
            <div className="mock-chrome-bar" style={{ background: p.brandColor }}>
              <span className="mock-chrome-logo">f</span>
              <span className="mock-chrome-search">Search Facebook</span>
            </div>
          </div>
          <div className="mock-card">
            <div className="mock-cover mock-cover-tall">
              {cover ? <img src={cover} alt="" /> : null}
            </div>
            <div className="mock-profile-row">
              <div className="mock-avatar mock-avatar-circle big">
                {avatar ? <img src={avatar} alt="" /> : null}
              </div>
              <div className="mock-profile-text">
                <h3>{p.handle}</h3>
                <p className="mock-meta">Medical Clinic · 4.9 ★ · Open today</p>
                <div className="mock-actions">
                  <button type="button" style={{ background: p.brandColor }}>👍 Like</button>
                  <button type="button" className="ghost">Message</button>
                </div>
              </div>
            </div>
            <div className="mock-feed-card">
              <p className="mock-post-header"><strong>{p.handle}</strong> · 5h</p>
              {post ? <img src={post} alt="" className="mock-post-img" /> : null}
              <p className="mock-post-caption">{p.tagline}</p>
            </div>
          </div>
        </div>
      );
    case "instagram":
      return (
        <div className="mockup mockup-instagram">
          <div className="mock-phone">
            <div className="mock-phone-header">
              <span className="mock-ig-handle">menswellnesscenters</span>
              <span>···</span>
            </div>
            <div className="mock-ig-bio">
              <div
                className="mock-avatar mock-avatar-circle big"
                style={{
                  background:
                    "conic-gradient(from 210deg, #f58529, #dd2a7b, #8134af, #515bd4, #f58529)",
                  padding: 3,
                }}
              >
                <div className="mock-avatar-inner">
                  {avatar ? <img src={avatar} alt="" /> : null}
                </div>
              </div>
              <div className="mock-ig-stats">
                <div><strong>248</strong><span>posts</span></div>
                <div><strong>12.4k</strong><span>followers</span></div>
                <div><strong>312</strong><span>following</span></div>
              </div>
            </div>
            <p className="mock-ig-name"><strong>Men's Wellness Centers</strong></p>
            <p className="mock-ig-tagline">{p.tagline}</p>
            <div className="mock-ig-actions">
              <button type="button" style={{ background: p.brandColor, color: "#fff" }}>Follow</button>
              <button type="button" className="ghost">Message</button>
            </div>
            <div className="mock-ig-grid">
              {[post, post, post, post, post, post].map((src, i) =>
                src ? (
                  <div key={i} className="mock-ig-cell">
                    <img src={src} alt="" />
                  </div>
                ) : (
                  <div key={i} className="mock-ig-cell mock-ig-cell-empty" />
                ),
              )}
            </div>
          </div>
        </div>
      );
    case "tiktok":
      return (
        <div className="mockup mockup-tiktok">
          <div className="mock-phone mock-phone-dark">
            <div className="mock-tt-vertical">
              {post ? <img src={post} alt="" /> : null}
              <div className="mock-tt-overlay">
                <div className="mock-tt-handle">
                  <strong>@menswellnesscenters</strong>
                  <p>{p.tagline}</p>
                  <p className="mock-tt-music">♪ original sound — MWC</p>
                </div>
                <div className="mock-tt-rail">
                  <div className="mock-tt-avatar">
                    {avatar ? <img src={avatar} alt="" /> : null}
                    <span style={{ background: p.brandColor }}>+</span>
                  </div>
                  <div className="mock-tt-action">♥<span>12.4k</span></div>
                  <div className="mock-tt-action">💬<span>842</span></div>
                  <div className="mock-tt-action">↗<span>Share</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    case "youtube":
      return (
        <div className="mockup mockup-youtube">
          <div className="mock-chrome">
            <div className="mock-chrome-bar" style={{ background: "#fff", color: "#111", borderBottom: "1px solid #eee" }}>
              <span className="mock-chrome-logo" style={{ background: p.brandColor, color: "#fff" }}>▶</span>
              <span className="mock-chrome-search">Search</span>
            </div>
          </div>
          <div className="mock-card">
            <div className="mock-cover mock-cover-yt">
              {cover ? <img src={cover} alt="" /> : null}
            </div>
            <div className="mock-profile-row">
              <div className="mock-avatar mock-avatar-circle big">
                {avatar ? <img src={avatar} alt="" /> : null}
              </div>
              <div className="mock-profile-text">
                <h3>Men's Wellness Centers</h3>
                <p className="mock-meta">@menswellnesscenters · 8.2k subscribers · 142 videos</p>
                <p>{p.tagline}</p>
                <div className="mock-actions">
                  <button type="button" style={{ background: p.brandColor }}>Subscribe</button>
                  <button type="button" className="ghost">Join</button>
                </div>
              </div>
            </div>
            <div className="mock-yt-grid">
              {[post, post, post].map((src, i) =>
                src ? (
                  <div key={i} className="mock-yt-thumb">
                    <img src={src} alt="" />
                    <p>Episode {i + 1}: Testosterone, explained</p>
                  </div>
                ) : null,
              )}
            </div>
          </div>
        </div>
      );
    case "x-twitter":
      return (
        <div className="mockup mockup-x">
          <div className="mock-card mock-card-dark">
            <div className="mock-cover">
              {cover ? <img src={cover} alt="" /> : null}
            </div>
            <div className="mock-profile-row">
              <div className="mock-avatar mock-avatar-circle big white-ring">
                {avatar ? <img src={avatar} alt="" /> : null}
              </div>
              <div className="mock-profile-text">
                <h3>Men's Wellness Centers</h3>
                <p className="mock-meta">@menswellnesscenters</p>
                <p>{p.tagline}</p>
                <p className="mock-meta">📍 Florida · mwc.health · Joined Jan 2024</p>
                <div className="mock-actions">
                  <button type="button" style={{ background: "#fff", color: "#000" }}>Follow</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    case "threads":
      return (
        <div className="mockup mockup-threads">
          <div className="mock-phone mock-phone-dark">
            <div className="mock-threads-post">
              <div className="mock-threads-head">
                <div className="mock-avatar mock-avatar-circle">
                  {avatar ? <img src={avatar} alt="" /> : null}
                </div>
                <div>
                  <strong>menswellnesscenters</strong>
                  <span>2h</span>
                </div>
              </div>
              <p className="mock-threads-text">{p.tagline}</p>
              {cover ? (
                <img src={cover} alt="" className="mock-threads-img" />
              ) : null}
              <div className="mock-threads-actions">
                <span>♡ 1.2k</span>
                <span>💬 84</span>
                <span>↻ 32</span>
                <span>↗</span>
              </div>
            </div>
          </div>
        </div>
      );
    case "github":
      return (
        <div className="mockup mockup-github">
          <div className="mock-card mock-card-dark">
            <div className="mock-gh-head">
              <div className="mock-avatar mock-avatar-circle big white-ring">
                {avatar ? <img src={avatar} alt="" /> : null}
              </div>
              <div>
                <h3>menswellnesscenters</h3>
                <p className="mock-meta">Internal tooling & open-source</p>
                <button type="button" className="ghost">Follow</button>
              </div>
            </div>
            <div className="mock-gh-repo">
              <p className="mock-gh-repo-name">
                <span style={{ color: "#58a6ff" }}>menswellnesscenters</span> /{" "}
                <strong>brand-system</strong>
              </p>
              <p className="mock-meta">Public brand assets and design tokens.</p>
              {cover ? (
                <img src={cover} alt="" className="mock-gh-preview" />
              ) : null}
            </div>
          </div>
        </div>
      );
    case "google-business":
      return (
        <div className="mockup mockup-gbp">
          <div className="mock-gbp-search">
            <div className="mock-gbp-input">men's wellness centers near me</div>
          </div>
          <div className="mock-card mock-gbp-card">
            <div className="mock-gbp-row">
              <div className="mock-gbp-text">
                <h3>{p.handle}</h3>
                <p className="mock-meta">
                  <span style={{ color: "#1a73e8" }}>Website</span> ·
                  Medical clinic · 4.9 ★ (212)
                </p>
                <p>{p.tagline}</p>
                <p className="mock-meta">Open · Closes 6 PM</p>
                <div className="mock-actions">
                  <button type="button" style={{ background: p.brandColor }}>Directions</button>
                  <button type="button" className="ghost">Call</button>
                  <button type="button" className="ghost">Website</button>
                </div>
              </div>
              <div className="mock-gbp-logo">
                {avatar ? <img src={avatar} alt="" /> : null}
              </div>
            </div>
            {cover ? (
              <img src={cover} alt="" className="mock-gbp-cover" />
            ) : null}
          </div>
        </div>
      );
    default:
      return null;
  }
}
