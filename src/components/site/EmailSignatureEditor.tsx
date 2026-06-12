import { useMemo, useRef, useState } from "react";

type Fields = {
  firstName: string;
  lastName: string;
  credentials: string;
  title: string;
  center: string;
  directPhone: string;
  centerPhone: string;
  email: string;
  includeDirect: boolean;
  includeSocial: boolean;
};

const DEFAULTS: Fields = {
  firstName: "Michael",
  lastName: "Sample",
  credentials: "",
  title: "Center Director",
  center: "Glen Allen, VA",
  directPhone: "(804) 555-0123",
  centerPhone: "(804) 555-1000",
  email: "michael.sample@menswellnesscenters.com",
  includeDirect: true,
  includeSocial: true,
};

const LOGO_URL =
  "https://mwc-brand.pplx.app/assets/logos/png/Navy_on_Transparent__wordmark_348x80.png";
const LINKEDIN_ICON =
  "https://mwc-brand.pplx.app/email-signature/kit/icon-linkedin.png";
const INSTAGRAM_ICON =
  "https://mwc-brand.pplx.app/email-signature/kit/icon-instagram.png";

function digits(s: string) {
  return s.replace(/\D+/g, "");
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildSignatureHtml(f: Fields): string {
  const fullName = `${f.firstName} ${f.lastName}${
    f.credentials ? ", " + f.credentials : ""
  }`.trim();
  const directDigits = digits(f.directPhone);
  const centerDigits = digits(f.centerPhone);

  const directRow = f.includeDirect && f.directPhone
    ? `<tr>
        <td width="62" valign="middle" style="width:62px;padding:2px 0;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;line-height:14px;color:#4F555C;text-transform:uppercase;letter-spacing:1.2px;mso-line-height-rule:exactly;">Direct</td>
        <td valign="middle" style="padding:2px 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:16px;color:#0B1029;mso-line-height-rule:exactly;">
          <a href="tel:+1${directDigits}" style="color:#0B1029;text-decoration:none;">${escapeHtml(f.directPhone)}</a>
        </td>
      </tr>`
    : "";

  const social = f.includeSocial
    ? `<table cellpadding="0" cellspacing="0" border="0" role="presentation" style="border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;margin-top:14px;">
        <tr>
          <td valign="middle" style="padding-right:10px;">
            <a href="https://www.linkedin.com/company/menswellnesscenters" style="text-decoration:none;border:0;outline:0;">
              <img src="${LINKEDIN_ICON}" alt="LinkedIn" width="22" height="22" border="0" style="display:block;border:0;outline:0;width:22px;height:22px;-ms-interpolation-mode:bicubic;" />
            </a>
          </td>
          <td valign="middle" style="padding-right:10px;">
            <a href="https://www.instagram.com/menswellnesscenters" style="text-decoration:none;border:0;outline:0;">
              <img src="${INSTAGRAM_ICON}" alt="Instagram" width="22" height="22" border="0" style="display:block;border:0;outline:0;width:22px;height:22px;-ms-interpolation-mode:bicubic;" />
            </a>
          </td>
        </tr>
      </table>`
    : "";

  return `<!-- Men's Wellness Centers - Employee Email Signature -->
<table cellpadding="0" cellspacing="0" border="0" role="presentation" width="620" style="border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;font-family:Arial,Helvetica,sans-serif;color:#0B1029;line-height:1.4;width:620px;">
  <tr>
    <td valign="top" width="200" style="width:200px;padding:0;border-right:2px solid #E8670A;">
      <table cellpadding="0" cellspacing="0" border="0" role="presentation" width="180" style="border-collapse:collapse;width:180px;">
        <tr>
          <td valign="top" style="padding:0 22px 0 0;">
            <a href="https://menswellnesscenters.com" style="text-decoration:none;border:0;outline:0;">
              <img src="${LOGO_URL}" alt="Men's Wellness Centers" width="174" height="40" border="0" style="display:block;border:0;outline:0;text-decoration:none;width:174px;height:40px;max-width:174px;-ms-interpolation-mode:bicubic;" />
            </a>
            <p style="margin:14px 0 0;padding:0;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;line-height:14px;letter-spacing:1.5px;color:#A04108;text-transform:uppercase;mso-line-height-rule:exactly;">
              Find Your Edge Over Age.
            </p>
          </td>
        </tr>
      </table>
    </td>
    <td valign="top" width="420" style="width:420px;padding:0 0 0 22px;">
      <p style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;font-size:17px;font-weight:700;line-height:20px;color:#0B1029;letter-spacing:0.3px;mso-line-height-rule:exactly;">${escapeHtml(fullName)}</p>
      <p style="margin:4px 0 0;padding:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;line-height:16px;color:#A04108;text-transform:uppercase;letter-spacing:1.6px;mso-line-height-rule:exactly;">${escapeHtml(f.title)}</p>
      <p style="margin:6px 0 0;padding:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;line-height:16px;color:#0B1029;text-transform:uppercase;letter-spacing:1px;mso-line-height-rule:exactly;">Men's Wellness Centers &middot; ${escapeHtml(f.center)}</p>
      <table cellpadding="0" cellspacing="0" border="0" role="presentation" width="100%" style="border-collapse:collapse;width:100%;margin:12px 0 10px;">
        <tr><td height="1" bgcolor="#D4D2CE" style="font-size:1px;line-height:1px;background:#D4D2CE;height:1px;">&nbsp;</td></tr>
      </table>
      <table cellpadding="0" cellspacing="0" border="0" role="presentation" style="border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;">
        ${directRow}
        <tr>
          <td width="62" valign="middle" style="width:62px;padding:2px 0;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;line-height:14px;color:#4F555C;text-transform:uppercase;letter-spacing:1.2px;mso-line-height-rule:exactly;">Center</td>
          <td valign="middle" style="padding:2px 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:16px;color:#0B1029;mso-line-height-rule:exactly;">
            <a href="tel:+1${centerDigits}" style="color:#0B1029;text-decoration:none;">${escapeHtml(f.centerPhone)}</a>
          </td>
        </tr>
        <tr>
          <td width="62" valign="middle" style="width:62px;padding:2px 0;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;line-height:14px;color:#4F555C;text-transform:uppercase;letter-spacing:1.2px;mso-line-height-rule:exactly;">Email</td>
          <td valign="middle" style="padding:2px 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:16px;color:#0B1029;mso-line-height-rule:exactly;">
            <a href="mailto:${escapeHtml(f.email)}" style="color:#0B1029;text-decoration:none;">${escapeHtml(f.email)}</a>
          </td>
        </tr>
        <tr>
          <td width="62" valign="middle" style="width:62px;padding:2px 0;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;line-height:14px;color:#4F555C;text-transform:uppercase;letter-spacing:1.2px;mso-line-height-rule:exactly;">Web</td>
          <td valign="middle" style="padding:2px 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:16px;color:#0B1029;mso-line-height-rule:exactly;">
            <a href="https://menswellnesscenters.com" style="color:#0B1029;text-decoration:none;">menswellnesscenters.com</a>
          </td>
        </tr>
      </table>
      <table cellpadding="0" cellspacing="0" border="0" role="presentation" style="border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;margin-top:14px;">
        <tr>
          <td valign="middle" style="padding:0;">
            <a href="https://book.menswellnesscenters.com" style="display:inline-block;background:#B84A08;color:#FFFFFF;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;line-height:14px;text-decoration:none;text-transform:uppercase;letter-spacing:1.8px;padding:10px 20px;border-radius:4px;mso-line-height-rule:exactly;">Book an Appointment</a>
          </td>
          <td valign="middle" style="padding-left:14px;font-family:Arial,Helvetica,sans-serif;font-size:9px;font-weight:700;line-height:13px;color:#4F555C;text-transform:uppercase;letter-spacing:1.4px;mso-line-height-rule:exactly;">
            Physician-Led<br>LegitScript Certified<br>Locally Owned
          </td>
        </tr>
      </table>
      ${social}
    </td>
  </tr>
  <tr>
    <td colspan="2" style="padding:18px 0 0;">
      <table cellpadding="0" cellspacing="0" border="0" role="presentation" width="100%" style="border-collapse:collapse;width:100%;">
        <tr><td height="1" bgcolor="#D4D2CE" style="font-size:1px;line-height:1px;background:#D4D2CE;height:1px;">&nbsp;</td></tr>
      </table>
      <p style="margin:12px 0 0;padding:0;font-family:Arial,Helvetica,sans-serif;font-size:9px;font-weight:700;line-height:13px;color:#0B1029;letter-spacing:1.4px;text-transform:uppercase;mso-line-height-rule:exactly;">Confidentiality Notice</p>
      <p style="margin:6px 0 0;padding:0;font-family:Arial,Helvetica,sans-serif;font-size:9px;font-weight:400;line-height:14px;color:#4F555C;letter-spacing:0.2px;mso-line-height-rule:exactly;">The documents in this e-mail transmission may contain confidential health information that is privileged and legally protected from disclosure by federal law, the Health Insurance Portability and Accountability Act (HIPAA). This information is intended only for use of the individual or entity named above. If you are not the intended recipient, you are hereby notified that reading, disseminating, disclosing, distributing, copying, acting upon or otherwise using the information contained in this e-mail is strictly prohibited. If you have received this information in error, please notify the sender immediately and delete the content.</p>
    </td>
  </tr>
</table>`;
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  border: "1px solid var(--cream-deep)",
  borderRadius: 4,
  fontFamily: "Montserrat, sans-serif",
  fontSize: 14,
  color: "var(--ink)",
  background: "var(--cream)",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "Montserrat, sans-serif",
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "var(--caption-light)",
  marginBottom: 6,
};

export function EmailSignatureEditor() {
  const [fields, setFields] = useState<Fields>(DEFAULTS);
  const [status, setStatus] = useState<{ kind: "rendered" | "html" | "download" | "error"; msg: string } | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const html = useMemo(() => buildSignatureHtml(fields), [fields]);

  function update<K extends keyof Fields>(k: K, v: Fields[K]) {
    setFields((f) => ({ ...f, [k]: v }));
  }

  async function copyRendered() {
    try {
      const node = previewRef.current?.querySelector("table");
      if (!node) throw new Error("no preview");
      const range = document.createRange();
      range.selectNodeContents(node);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
      document.execCommand("copy");
      sel?.removeAllRanges();
      setStatus({ kind: "rendered", msg: "Rendered signature copied. Paste into your email client." });
    } catch {
      try {
        // Clipboard API fallback (rich)
        const blob = new Blob([html], { type: "text/html" });
        const textBlob = new Blob([previewRef.current?.innerText ?? ""], { type: "text/plain" });
        await navigator.clipboard.write([new ClipboardItem({ "text/html": blob, "text/plain": textBlob })]);
        setStatus({ kind: "rendered", msg: "Rendered signature copied. Paste into your email client." });
      } catch {
        setStatus({ kind: "error", msg: "Couldn't copy. Use the Copy HTML button instead." });
      }
    }
  }

  async function copyHtml() {
    try {
      await navigator.clipboard.writeText(html);
      setStatus({ kind: "html", msg: "HTML source copied to clipboard." });
    } catch {
      setStatus({ kind: "error", msg: "Couldn't copy. Select the code and copy manually." });
    }
  }

  function downloadHtm() {
    const fileName = `mwc-signature-${(fields.firstName + "-" + fields.lastName).toLowerCase().replace(/[^a-z0-9-]/g, "")}.htm`;
    const blob = new Blob(
      [
        `<!DOCTYPE html><html><head><meta charset="utf-8"><title>MWC Signature</title></head><body>${html}</body></html>`,
      ],
      { type: "text/html" },
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    setStatus({ kind: "download", msg: `Downloaded ${fileName}.` });
  }

  function reset() {
    setFields(DEFAULTS);
    setStatus(null);
  }

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Brand Applications</p>
          <h1>Email Signature.</h1>
          <p>
            Fill in your details, preview the result live, then copy the rendered signature
            straight into Gmail, Outlook, or Apple Mail. The template is Outlook-bulletproof
            (table-based layout, VML button, absolute image URLs) and locked to brand color,
            type, and spacing.
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          <div
            style={{
              display: "grid",
              gap: 32,
              gridTemplateColumns: "minmax(0, 360px) minmax(0, 1fr)",
              alignItems: "start",
            }}
            className="sig-editor-grid"
          >
            {/* FORM */}
            <div
              style={{
                background: "var(--cream)",
                border: "1px solid var(--cream-deep)",
                borderRadius: 8,
                padding: 28,
                position: "sticky",
                top: 96,
              }}
            >
              <p className="eyebrow" style={{ marginBottom: 8 }}>Your Details</p>
              <h3 style={{ marginBottom: 20, fontSize: 22 }}>Edit signature.</h3>

              <div style={{ display: "grid", gap: 14 }}>
                <div style={{ display: "grid", gap: 14, gridTemplateColumns: "1fr 1fr" }}>
                  <div>
                    <label style={labelStyle}>First name</label>
                    <input style={inputStyle} value={fields.firstName} onChange={(e) => update("firstName", e.target.value)} />
                  </div>
                  <div>
                    <label style={labelStyle}>Last name</label>
                    <input style={inputStyle} value={fields.lastName} onChange={(e) => update("lastName", e.target.value)} />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Credentials (optional)</label>
                  <input style={inputStyle} placeholder="MD, NP, PA-C" value={fields.credentials} onChange={(e) => update("credentials", e.target.value)} />
                </div>

                <div>
                  <label style={labelStyle}>Title</label>
                  <input style={inputStyle} value={fields.title} onChange={(e) => update("title", e.target.value)} />
                </div>

                <div>
                  <label style={labelStyle}>Primary center</label>
                  <input style={inputStyle} placeholder="City, ST" value={fields.center} onChange={(e) => update("center", e.target.value)} />
                </div>

                <div>
                  <label style={labelStyle}>Direct phone</label>
                  <input style={inputStyle} value={fields.directPhone} onChange={(e) => update("directPhone", e.target.value)} disabled={!fields.includeDirect} />
                  <label style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 8, fontSize: 12, color: "var(--ink-soft)" }}>
                    <input type="checkbox" checked={fields.includeDirect} onChange={(e) => update("includeDirect", e.target.checked)} />
                    Include direct line
                  </label>
                </div>

                <div>
                  <label style={labelStyle}>Center phone</label>
                  <input style={inputStyle} value={fields.centerPhone} onChange={(e) => update("centerPhone", e.target.value)} />
                </div>

                <div>
                  <label style={labelStyle}>Email</label>
                  <input style={inputStyle} type="email" value={fields.email} onChange={(e) => update("email", e.target.value)} />
                </div>

                <label style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 12, color: "var(--ink-soft)" }}>
                  <input type="checkbox" checked={fields.includeSocial} onChange={(e) => update("includeSocial", e.target.checked)} />
                  Include LinkedIn + Instagram icons
                </label>

                <button
                  type="button"
                  onClick={reset}
                  style={{
                    marginTop: 4,
                    background: "transparent",
                    border: "none",
                    color: "var(--ink-soft)",
                    fontSize: 12,
                    fontFamily: "Montserrat, sans-serif",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    cursor: "pointer",
                    textAlign: "left",
                    padding: 0,
                  }}
                >
                  ↺ Reset to example
                </button>
              </div>
            </div>

            {/* PREVIEW + ACTIONS */}
            <div style={{ display: "grid", gap: 24 }}>
              <div>
                <p className="eyebrow" style={{ marginBottom: 8 }}>Live Preview</p>
                <h3 style={{ marginBottom: 16, fontSize: 22 }}>How it lands in the inbox.</h3>

                <div
                  style={{
                    background: "#ffffff",
                    border: "1px solid var(--cream-deep)",
                    borderRadius: 8,
                    padding: 32,
                    overflowX: "auto",
                  }}
                >
                  <div ref={previewRef} dangerouslySetInnerHTML={{ __html: html }} />
                </div>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
                <button type="button" className="btn btn-primary" onClick={copyRendered}>
                  Copy Rendered Signature
                </button>
                <button type="button" className="btn btn-ghost" onClick={copyHtml}>
                  Copy HTML Source
                </button>
                <button type="button" className="btn btn-ghost" onClick={downloadHtm}>
                  Download .htm
                </button>
                {status && (
                  <span
                    role="status"
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: 13,
                      fontWeight: 600,
                      color: status.kind === "error" ? "var(--error-text-light)" : "var(--success-text)",
                    }}
                  >
                    {status.msg}
                  </span>
                )}
              </div>

              <details
                style={{
                  background: "var(--cream)",
                  border: "1px solid var(--cream-deep)",
                  borderRadius: 8,
                  padding: "16px 20px",
                }}
              >
                <summary
                  style={{
                    cursor: "pointer",
                    fontFamily: "Oswald, sans-serif",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    fontSize: 14,
                    color: "var(--navy)",
                  }}
                >
                  View HTML source
                </summary>
                <pre
                  style={{
                    marginTop: 14,
                    padding: 16,
                    background: "var(--navy)",
                    color: "#e7e3dc",
                    borderRadius: 4,
                    overflowX: "auto",
                    fontFamily: "Inter, monospace",
                    fontSize: 12,
                    lineHeight: 1.55,
                    maxHeight: 380,
                  }}
                >
                  <code>{html}</code>
                </pre>
              </details>
            </div>
          </div>
        </div>
      </section>

      <section className="section-alt">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Install</p>
            <h2>Three ways to install.</h2>
            <p>Pick the method that matches your email client. Most people only need step one.</p>
          </div>

          <div className="grid grid-3">
            <div className="card">
              <div className="card-body">
                <h3>1. Gmail / Outlook Web</h3>
                <p>
                  Click <strong>Copy Rendered Signature</strong>, open Settings → Signatures,
                  and paste. Save. Send yourself a test.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h3>2. Outlook desktop</h3>
                <p>
                  Click <strong>Download .htm</strong>, then in Outlook open File →
                  Options → Mail → Signatures and replace your signature file.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h3>3. Apple Mail</h3>
                <p>
                  Use <strong>Copy Rendered Signature</strong> and paste into Mail →
                  Settings → Signatures. Uncheck "Always match my default message font."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .sig-editor-grid { grid-template-columns: 1fr !important; }
          .sig-editor-grid > div:first-child { position: static !important; }
        }
      `}</style>
    </>
  );
}
