import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import assetMap from "@/data/asset-map.json";

type NavLeaf = { to: string; label: string };
type NavGroup = { label: string; items: NavLeaf[] };
type NavItem = NavLeaf | NavGroup;

const NAV: NavItem[] = [
  { to: "/", label: "Overview" },
  {
    label: "Brand",
    items: [
      { to: "/logo", label: "Logo" },
      { to: "/logo-library", label: "Logo Library" },
      { to: "/color", label: "Color" },
      { to: "/typography", label: "Typography" },
      { to: "/voice", label: "Voice & Tone" },
    ],
  },
  {
    label: "Applications",
    items: [
      { to: "/applications", label: "In the Wild" },
      { to: "/email-signature", label: "Email Signature" },
      { to: "/business-card", label: "Referral Card" },
      { to: "/lead-forms", label: "Lead Forms" },
    ],
  },
  {
    label: "Resources",
    items: [
      { to: "/accessibility", label: "Accessibility" },
      { to: "/prompts", label: "AI Prompts" },
    ],
  },
  { to: "/downloads", label: "Downloads" },
];

const isGroup = (item: NavItem): item is NavGroup => "items" in item;

const wordmark = (assetMap as Record<string, string>)[
  "assets/logos/svg/wordmark_navy.svg"
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const headerRef = useRef<HTMLElement>(null);

  // Close dropdowns on outside click or Escape
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!headerRef.current?.contains(e.target as Node)) setOpenMenu(null);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenMenu(null);
    }
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  function closeAll() {
    setOpen(false);
    setOpenMenu(null);
  }

  return (
    <header ref={headerRef} className={`site-header${open ? " nav-open" : ""}`}>
      <div className="nav-wrap">
        <Link to="/" className="logo-link" onClick={closeAll}>
          <img src={wordmark} alt="Men's Wellness Centers" />
          <span className="logo-text">Men's Wellness Centers</span>
        </Link>
        <nav aria-label="Main">
          <ul className="nav-links">
            {NAV.map((item) =>
              isGroup(item) ? (
                // Desktop hover is pure CSS (.nav-group:hover); click state
                // covers touch and keyboard users.
                <li
                  key={item.label}
                  className={`nav-group${openMenu === item.label ? " open" : ""}`}
                >
                  <button
                    type="button"
                    className={`nav-group-btn${
                      item.items.some((l) => l.to === pathname) ? " active" : ""
                    }`}
                    aria-expanded={openMenu === item.label}
                    onClick={() =>
                      setOpenMenu((m) => (m === item.label ? null : item.label))
                    }
                  >
                    {item.label}
                    <span className="nav-caret" aria-hidden="true">
                      ▾
                    </span>
                  </button>
                  <ul className="nav-dropdown">
                    {item.items.map((leaf) => (
                      <li key={leaf.to}>
                        <Link
                          to={leaf.to}
                          className={pathname === leaf.to ? "active" : ""}
                          onClick={closeAll}
                        >
                          {leaf.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className={pathname === item.to ? "active" : ""}
                    onClick={closeAll}
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
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
