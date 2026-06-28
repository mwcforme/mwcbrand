import { createFileRoute } from "@tanstack/react-router";
import { brandKit } from "@/lib/mwc/brand-kit";

export const Route = createFileRoute("/brand-kit")({
  head: () => ({
    meta: [
      { title: "Brand Kit (LLM Reference) · Men's Wellness Centers" },
      {
        name: "description",
        content:
          "Single-page, machine-readable brand kit for LLMs and AI design tools. Logos, colors, typography, voice, and asset URLs for Men's Wellness Centers.",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Brand Kit (LLM Reference) · Men's Wellness Centers" },
      {
        property: "og:description",
        content:
          "Copy this page into ChatGPT, Claude, Canva AI, or any design tool to reproduce the Men's Wellness Centers brand.",
      },
    ],
    links: [
      { rel: "alternate", type: "application/json", href: "/brand-kit.json" },
      { rel: "canonical", href: "/brand-kit" },
    ],
  }),
  component: BrandKitPage,
});

function BrandKitPage() {
  const k = brandKit;
  return (
    <main style={{ maxWidth: 960, margin: "0 auto", padding: "48px 24px", lineHeight: 1.6 }}>
      <p style={{ textTransform: "uppercase", letterSpacing: "0.32em", fontSize: 12, color: "#B84A08" }}>
        LLM / AI Reference · v{k.version}
      </p>
      <h1 style={{ fontSize: 48, lineHeight: 1.05, margin: "12px 0 8px" }}>
        {k.identity.legal_name} Brand Kit
      </h1>
      <p style={{ fontSize: 20, color: "#1E244A" }}>
        Single-page, machine-readable brand kit. Copy this entire page (or fetch{" "}
        <a href="/brand-kit.json">/brand-kit.json</a>) into any LLM or design tool to reproduce the
        brand accurately.
      </p>

      <Section title="Identity">
        <KV data={k.identity} />
      </Section>

      <Section title="Colors">
        <h3>Primary</h3>
        <SwatchTable rows={k.colors.primary} />
        <h3>Extended</h3>
        <SwatchTable rows={k.colors.extended} />
        <h3>Banned</h3>
        <ul>{k.colors.banned.map((b) => <li key={b}>{b}</li>)}</ul>
        <h3>Approved pairings</h3>
        <ul>{k.colors.pairings.map((p) => <li key={p}>{p}</li>)}</ul>
      </Section>

      <Section title="Typography">
        <KV data={k.typography} />
      </Section>

      <Section title="Voice">
        <KV data={k.voice} />
      </Section>

      <Section title="Imagery">
        <KV data={k.imagery} />
      </Section>

      <Section title="Logos">
        <h3>Rules</h3>
        <ul>{k.logos.rules.map((r) => <li key={r}>{r}</li>)}</ul>
        <h3>Featured marks</h3>
        <ul>
          {k.logos.featured.map((f) => (
            <li key={f.url}>
              <a href={f.url}>{f.name}</a> — {f.use_for ?? "logo asset"} ({f.format})
            </li>
          ))}
        </ul>
        <p>
          Full library: <a href={k.logos.library_index_url}>{k.logos.library_index_url}</a> · CDN
          base: <code>{k.logos.cdn_base}</code> · {k.logos.all_assets.length} assets total.
        </p>
      </Section>

      <Section title="References">
        <KV data={k.references} />
      </Section>

      <Section title="Full JSON (machine block)">
        <p>Identical payload as <a href="/brand-kit.json">/brand-kit.json</a>.</p>
        <pre
          id="brand-kit-json"
          style={{
            background: "#0B1029",
            color: "#F5F3F0",
            padding: 20,
            borderRadius: 8,
            overflow: "auto",
            fontSize: 12,
            maxHeight: 600,
          }}
        >
          {JSON.stringify(k, null, 2)}
        </pre>
      </Section>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginTop: 48, paddingTop: 24, borderTop: "1px solid #E5E7EB" }}>
      <h2 style={{ fontSize: 28, marginBottom: 16 }}>{title}</h2>
      {children}
    </section>
  );
}

function KV({ data }: { data: unknown }) {
  return (
    <pre
      style={{
        background: "#F5F3F0",
        padding: 16,
        borderRadius: 6,
        overflow: "auto",
        fontSize: 13,
        lineHeight: 1.5,
      }}
    >
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}

function SwatchTable({ rows }: { rows: ReadonlyArray<{ name: string; hex: string; role?: string }> }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", margin: "12px 0" }}>
      <thead>
        <tr style={{ textAlign: "left", borderBottom: "1px solid #E5E7EB" }}>
          <th>Swatch</th>
          <th>Name</th>
          <th>HEX</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.hex} style={{ borderBottom: "1px solid #F5F3F0" }}>
            <td>
              <span
                style={{
                  display: "inline-block",
                  width: 32,
                  height: 32,
                  background: r.hex,
                  border: "1px solid #E5E7EB",
                  borderRadius: 4,
                }}
              />
            </td>
            <td>{r.name}</td>
            <td><code>{r.hex}</code></td>
            <td>{r.role}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
