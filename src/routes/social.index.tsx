import { createFileRoute, Link } from "@tanstack/react-router";
import {
  PLATFORM_ORDER,
  PLATFORMS,
  getPlatformHero,
} from "@/lib/mwc/social-platforms";

export const Route = createFileRoute("/social/")({
  head: () => ({
    meta: [
      { title: "Social Media · Men's Wellness Centers Brand" },
      {
        name: "description",
        content:
          "Platform-by-platform social media assets for Men's Wellness Centers: covers, profile marks, posts, stories, and live mockups for LinkedIn, Facebook, Instagram, TikTok, YouTube, X, Threads, GitHub, and Google Business.",
      },
      {
        property: "og:title",
        content: "Social Media · Men's Wellness Centers Brand",
      },
      {
        property: "og:url",
        content: "https://mwcbrand.lovable.app/social",
      },
    ],
    links: [
      { rel: "canonical", href: "https://mwcbrand.lovable.app/social" },
    ],
  }),
  component: SocialIndex,
});

function SocialIndex() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Brand · Channels</p>
          <h1>Social Media</h1>
          <p>
            Every platform has its own spec system, crop quirks, and tone. Pick
            a channel below to see the live mockup, every cover and profile
            mark, and the post sizes you can ship today.
          </p>
        </div>
      </section>

      <section className="section-alt">
        <div className="container">
          <ul className="platform-grid">
            {PLATFORM_ORDER.map((slug) => {
              const p = PLATFORMS[slug];
              const { cover, avatar, assets } = getPlatformHero(slug);
              return (
                <li
                  key={slug}
                  className={`platform-card platform-${slug} surface-${p.surface}`}
                >
                  <Link
                    to="/social/$platform"
                    params={{ platform: slug }}
                    className="platform-card-link"
                    aria-label={`${p.name} brand page`}
                  >
                    <div
                      className="platform-card-cover"
                      style={{ background: p.brandColorSoft }}
                    >
                      {cover ? (
                        <img src={cover.url} alt="" loading="lazy" />
                      ) : (
                        <div
                          className="platform-card-fallback"
                          style={{ background: p.brandColor }}
                        />
                      )}
                    </div>
                    <div className="platform-card-body">
                      <div
                        className="platform-card-avatar"
                        style={{ borderColor: p.brandColor }}
                      >
                        {avatar ? (
                          <img src={avatar.url} alt="" loading="lazy" />
                        ) : null}
                      </div>
                      <div className="platform-card-meta">
                        <p
                          className="platform-card-eyebrow"
                          style={{ color: p.brandColor }}
                        >
                          {p.name}
                        </p>
                        <h3>{p.handle}</h3>
                        <p className="platform-card-desc">{p.description}</p>
                        <p className="platform-card-count">
                          {assets.length}{" "}
                          {assets.length === 1 ? "asset" : "assets"} ready
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
