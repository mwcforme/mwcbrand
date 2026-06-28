import { createFileRoute, Link } from "@tanstack/react-router";
import { brandKit } from "@/lib/mwc/brand-kit";

export const Route = createFileRoute("/brand")({
  head: () => ({
    meta: [
      { title: "Brand · Men's Wellness Centers" },
      {
        name: "description",
        content:
          "Complete MWC brand reference: logos, fonts, colors, voice, imagery, and downloads. Everything another app or designer needs to build a brand kit.",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Brand · Men's Wellness Centers" },
      {
        property: "og:description",
        content:
          "Logos, fonts, colors, voice, imagery, and downloads — the complete MWC brand in one page.",
      },
    ],
    links: [
      { rel: "canonical", href: "/brand" },
      { rel: "alternate", type: "application/json", href: "/brand-kit.json" },
    ],
  }),
  component: BrandPage,
});

const NAVY = "#0B1029";
const CREAM = "#F5F3F0";
const ORANGE = "#E8670A";
const NAVY_LIGHT = "#1E244A";
const MUTED = "#9CA3AF";

function BrandPage() {
  const k = brandKit;

  return (
    <main style={{ background: CREAM, color: NAVY, minHeight: "100vh" }}>
      {/* Hero */}
      <section style={{ background: NAVY, color: CREAM, padding: "72px 24px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <p
            style={{
              textTransform: "uppercase",
              letterSpacing: "0.32em",
              fontSize: 12,
              color: ORANGE,
              margin: 0,
            }}
          >
            Brand Reference · v{k.version}
          </p>
          <h1
            style={{
              fontFamily: "Oswald, sans-serif",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.02em",
              fontSize: "clamp(40px, 7vw, 80px)",
              lineHeight: 1.02,
              margin: "16px 0 12px",
            }}
          >
            {k.identity.legal_name}
          </h1>
          <p style={{ fontSize: 22, maxWidth: 720, color: "#D9D7D3", margin: 0 }}>
            {k.identity.tagline} The complete brand system — logos, fonts, colors, voice, imagery,
            and downloads. Built for designers, partners, and AI tools.
          </p>
          <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", gap: 12 }}>
            <CTA href="/logo-library">Logo library</CTA>
            <CTA href="/downloads" variant="ghost">Downloads</CTA>
            <CTA href="/brand-kit" variant="ghost">LLM-readable kit</CTA>
            <CTA href="/brand-kit.json" variant="ghost">brand-kit.json</CTA>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "64px 24px 96px" }}>
        {/* Identity */}
        <Block eyebrow="01 · Identity" title="Who we are">
          <Grid>
            <Field label="Legal name" value={k.identity.legal_name} />
            <Field label="Short name" value={k.identity.short_name} />
            <Field label="Category" value={k.identity.category} />
            <Field label="Region" value={k.identity.region} />
            <Field label="Tagline" value={k.identity.tagline} />
            <Field label="Website" value={k.identity.website} link />
            <Field label="Booking" value={k.identity.booking_url} link />
            <Field label="Brand site" value={k.identity.brand_site} link />
          </Grid>
          <Note>{k.identity.positioning}</Note>
          <Note>
            <strong>Tagline rule:</strong> {k.identity.tagline_rules}
          </Note>
        </Block>

        {/* Logos */}
        <Block eyebrow="02 · Logos" title="Marks & lockups">
          <Note>
            Logo marks are <strong>Navy, Cream, White, or Black only</strong> — never orange.
            Orange is reserved for UI elements and CTAs.
          </Note>
          <ul style={{ paddingLeft: 20, margin: "12px 0 28px" }}>
            {k.logos.rules.map((r) => (
              <li key={r} style={{ marginBottom: 6 }}>{r}</li>
            ))}
          </ul>

          <h3 style={subHead}>Featured marks</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: 16,
            }}
          >
            {k.logos.featured.map((f) => {
              const dark = /white|cream/i.test(f.name ?? "");
              return (
                <a
                  key={f.url}
                  href={f.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "block",
                    background: dark ? NAVY : "#fff",
                    border: `1px solid ${dark ? NAVY_LIGHT : "#E5E7EB"}`,
                    borderRadius: 10,
                    padding: 20,
                    textDecoration: "none",
                    color: dark ? CREAM : NAVY,
                  }}
                >
                  <div
                    style={{
                      height: 80,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 12,
                    }}
                  >
                    <img
                      src={f.url}
                      alt={f.name ?? "logo"}
                      style={{ maxHeight: 64, maxWidth: "100%" }}
                    />
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{f.name}</div>
                  <div style={{ fontSize: 12, color: dark ? MUTED : "#6B7280", marginTop: 4 }}>
                    {f.format?.toUpperCase()} · {f.use_for ?? "logo asset"}
                  </div>
                </a>
              );
            })}
          </div>
          <p style={{ marginTop: 24 }}>
            Full library ({k.logos.all_assets.length} assets):{" "}
            <Link to="/logo-library" style={linkStyle}>/logo-library</Link> · CDN base:{" "}
            <code style={codeStyle}>{k.logos.cdn_base}</code>
          </p>
        </Block>

        {/* Colors */}
        <Block eyebrow="03 · Color" title="Palette & pairings">
          <h3 style={subHead}>Primary</h3>
          <SwatchGrid rows={k.colors.primary} />
          <h3 style={subHead}>Extended</h3>
          <SwatchGrid rows={k.colors.extended} />

          <h3 style={subHead}>Approved pairings</h3>
          <ul style={{ paddingLeft: 20 }}>
            {k.colors.pairings.map((p) => (
              <li key={p} style={{ marginBottom: 6 }}>{p}</li>
            ))}
          </ul>

          <h3 style={subHead}>Banned</h3>
          <ul style={{ paddingLeft: 20 }}>
            {k.colors.banned.map((b) => (
              <li key={b} style={{ marginBottom: 6 }}>{b}</li>
            ))}
          </ul>
        </Block>

        {/* Typography */}
        <Block eyebrow="04 · Typography" title="Type system">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 16,
            }}
          >
            <TypeCard
              role="Display"
              spec={k.typography.display}
              sample="FIND YOUR EDGE"
              sampleStyle={{
                fontFamily: "Oswald, sans-serif",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.02em",
                fontSize: 40,
              }}
            />
            <TypeCard
              role="Body"
              spec={k.typography.body}
              sample="Locally owned, physician-led men's health in Virginia."
              sampleStyle={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: 17,
                lineHeight: 1.55,
              }}
            />
            <TypeCard
              role="Mono"
              spec={k.typography.mono}
              sample="#0B1029 · #E8670A"
              sampleStyle={{
                fontFamily: "Inter, monospace",
                fontWeight: 500,
                fontSize: 16,
              }}
            />
          </div>

          <h3 style={subHead}>Type scale (px)</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: 8,
            }}
          >
            {Object.entries(k.typography.scale_px).map(([k2, v]) => (
              <div
                key={k2}
                style={{
                  background: "#fff",
                  border: "1px solid #E5E7EB",
                  borderRadius: 8,
                  padding: 12,
                }}
              >
                <div style={{ fontSize: 12, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.12em" }}>
                  {k2}
                </div>
                <div style={{ fontSize: 22, fontWeight: 600 }}>{v}px</div>
              </div>
            ))}
          </div>

          <h3 style={subHead}>Rules</h3>
          <ul style={{ paddingLeft: 20 }}>
            {k.typography.rules.map((r) => (
              <li key={r} style={{ marginBottom: 6 }}>{r}</li>
            ))}
          </ul>
        </Block>

        {/* Voice */}
        <Block eyebrow="05 · Voice" title="How we sound">
          <p>
            <strong>Descriptors:</strong> {k.voice.descriptors.join(" · ")}
          </p>
          <p>
            <strong>Person:</strong> {k.voice.person}
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
              marginTop: 16,
            }}
          >
            <ListCard title="Always say" items={k.voice.always_say} tone="good" />
            <ListCard title="Never say" items={k.voice.never_say} tone="bad" />
          </div>
          <h3 style={subHead}>Approved CTAs</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {k.voice.approved_ctas.map((c) => (
              <span
                key={c}
                style={{
                  background: NAVY,
                  color: CREAM,
                  padding: "8px 14px",
                  borderRadius: 999,
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                {c}
              </span>
            ))}
          </div>
        </Block>

        {/* Imagery */}
        <Block eyebrow="06 · Imagery" title="Photography direction">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
            }}
          >
            <ListCard title="Do" items={k.imagery.do as readonly string[]} tone="good" />
            <ListCard title="Don't" items={k.imagery.dont as readonly string[]} tone="bad" />
          </div>
          <p style={{ marginTop: 16 }}>
            Stock library: <Link to="/stock-downloads" style={linkStyle}>/stock-downloads</Link>
          </p>
        </Block>

        {/* References */}
        <Block eyebrow="07 · References" title="Where to go next">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 12,
            }}
          >
            {Object.entries(k.references).map(([label, href]) => (
              <a
                key={label}
                href={href}
                style={{
                  display: "block",
                  background: "#fff",
                  border: "1px solid #E5E7EB",
                  borderRadius: 8,
                  padding: 14,
                  textDecoration: "none",
                  color: NAVY,
                }}
              >
                <div style={{ fontSize: 12, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.12em" }}>
                  {label.replace(/_/g, " ")}
                </div>
                <div style={{ fontWeight: 600, marginTop: 4, wordBreak: "break-all" }}>{href}</div>
              </a>
            ))}
          </div>
        </Block>
      </div>
    </main>
  );
}

/* ---------- helpers ---------- */

const subHead: React.CSSProperties = {
  fontFamily: "Oswald, sans-serif",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
  fontSize: 18,
  margin: "28px 0 12px",
};

const linkStyle: React.CSSProperties = { color: ORANGE, textDecoration: "underline" };
const codeStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #E5E7EB",
  padding: "2px 6px",
  borderRadius: 4,
  fontSize: 13,
};

function CTA({
  href,
  children,
  variant = "solid",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "ghost";
}) {
  const solid = variant === "solid";
  return (
    <a
      href={href}
      style={{
        background: solid ? ORANGE : "transparent",
        color: solid ? "#fff" : CREAM,
        border: solid ? "none" : "1px solid rgba(245,243,240,0.3)",
        padding: "12px 20px",
        borderRadius: 8,
        fontWeight: 600,
        textDecoration: "none",
        fontSize: 14,
      }}
    >
      {children}
    </a>
  );
}

function Block({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ marginTop: 56, paddingTop: 40, borderTop: `1px solid #E5E7EB` }}>
      <p
        style={{
          textTransform: "uppercase",
          letterSpacing: "0.32em",
          fontSize: 11,
          color: ORANGE,
          margin: 0,
        }}
      >
        {eyebrow}
      </p>
      <h2
        style={{
          fontFamily: "Oswald, sans-serif",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.02em",
          fontSize: 36,
          margin: "8px 0 24px",
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: 12,
      }}
    >
      {children}
    </div>
  );
}

function Field({ label, value, link }: { label: string; value: string; link?: boolean }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #E5E7EB",
        borderRadius: 8,
        padding: 14,
      }}
    >
      <div
        style={{
          fontSize: 11,
          color: "#6B7280",
          textTransform: "uppercase",
          letterSpacing: "0.18em",
        }}
      >
        {label}
      </div>
      <div style={{ fontWeight: 600, marginTop: 4, wordBreak: "break-word" }}>
        {link ? (
          <a href={value} style={linkStyle}>{value}</a>
        ) : (
          value
        )}
      </div>
    </div>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        background: "#fff",
        border: `1px solid #E5E7EB`,
        borderLeft: `3px solid ${ORANGE}`,
        padding: "12px 16px",
        borderRadius: 6,
        margin: "12px 0",
      }}
    >
      {children}
    </p>
  );
}

function SwatchGrid({
  rows,
}: {
  rows: ReadonlyArray<{ name: string; hex: string; role?: string }>;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: 12,
        marginBottom: 8,
      }}
    >
      {rows.map((r) => {
        const dark = isDark(r.hex);
        return (
          <div
            key={r.hex}
            style={{
              border: "1px solid #E5E7EB",
              borderRadius: 8,
              overflow: "hidden",
              background: "#fff",
            }}
          >
            <div
              style={{
                background: r.hex,
                color: dark ? CREAM : NAVY,
                padding: 20,
                fontWeight: 700,
                fontSize: 18,
              }}
            >
              {r.name}
            </div>
            <div style={{ padding: 12 }}>
              <code style={codeStyle}>{r.hex}</code>
              {r.role && (
                <div style={{ fontSize: 12, color: "#6B7280", marginTop: 6 }}>{r.role}</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function TypeCard({
  role,
  spec,
  sample,
  sampleStyle,
}: {
  role: string;
  spec: { family: string; weights?: readonly number[]; case?: string; use_for?: string };
  sample: string;
  sampleStyle: React.CSSProperties;
}) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #E5E7EB",
        borderRadius: 10,
        padding: 20,
      }}
    >
      <div
        style={{
          fontSize: 11,
          color: ORANGE,
          textTransform: "uppercase",
          letterSpacing: "0.18em",
        }}
      >
        {role}
      </div>
      <div style={{ fontSize: 22, fontWeight: 700, marginTop: 4 }}>{spec.family}</div>
      <div style={{ fontSize: 13, color: "#6B7280", marginTop: 4 }}>
        {spec.weights?.join(", ")} · {spec.case ?? spec.use_for}
      </div>
      <div style={{ marginTop: 16, ...sampleStyle, color: NAVY }}>{sample}</div>
    </div>
  );
}

function ListCard({
  title,
  items,
  tone,
}: {
  title: string;
  items: readonly string[];
  tone: "good" | "bad";
}) {
  const accent = tone === "good" ? "#5DD68A" : "#E8670A";
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #E5E7EB",
        borderTop: `3px solid ${accent}`,
        borderRadius: 8,
        padding: 16,
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: 8 }}>{title}</div>
      <ul style={{ paddingLeft: 18, margin: 0 }}>
        {items.map((i) => (
          <li key={i} style={{ marginBottom: 4 }}>{i}</li>
        ))}
      </ul>
    </div>
  );
}

function isDark(hex: string) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 < 140;
}
