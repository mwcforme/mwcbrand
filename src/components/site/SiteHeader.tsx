import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import assetMap from "@/data/asset-map.json";

const NAV = [
  { to: "/", label: "Overview" },
  { to: "/logo", label: "Logo" },
  { to: "/logo-library", label: "Library" },
  { to: "/color", label: "Color" },
  { to: "/typography", label: "Type" },
  { to: "/voice", label: "Voice" },
  { to: "/applications", label: "Applications" },
  { to: "/accessibility", label: "A11y" },
  { to: "/prompts", label: "Prompts" },
  { to: "/email-signature", label: "Email" },
  { to: "/business-card", label: "Card" },
  { to: "/lead-forms", label: "Lead Forms" },
  { to: "/downloads", label: "Downloads" },
];

const wordmark = (assetMap as Record<string, string>)[
  "assets/logos/svg/wordmark_navy.svg"
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className={`site-header${open ? " nav-open" : ""}`}>
      <div className="nav-wrap">
        <Link to="/" className="logo-link" onClick={() => setOpen(false)}>
          <img src={wordmark} alt="Men's Wellness Centers" />
          <span className="logo-text">Men's Wellness Centers</span>
        </Link>
        <nav>
          <ul className="nav-links">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={pathname === item.to ? "active" : ""}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <button
          type="button"
          className="nav-toggle"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          ☰
        </button>
      </div>
    </header>
  );
}
