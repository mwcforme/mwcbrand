import { Link } from "@tanstack/react-router";
import assetMap from "@/data/asset-map.json";

const wordmarkWhite = (assetMap as Record<string, string>)[
  "assets/logos/svg/wordmark_white.svg"
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src={wordmarkWhite} alt="Men's Wellness Centers" />
            <p>
              The brand system for Men's Wellness Centers. Locally owned,
              physician-led, in-person men's health in Virginia.
            </p>
          </div>
          <div className="footer-col">
            <h4>Brand</h4>
            <ul>
              <li><Link to="/">Overview</Link></li>
              <li><Link to="/logo">Logo</Link></li>
              <li><Link to="/color">Color</Link></li>
              <li><Link to="/typography">Typography</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Apply</h4>
            <ul>
              <li><Link to="/voice">Voice</Link></li>
              <li><Link to="/accessibility">Accessibility</Link></li>
              <li><Link to="/prompts">Prompts</Link></li>
              <li><Link to="/applications">Applications</Link></li>
              <li><Link to="/logo-library">Logo Library</Link></li>
              <li><Link to="/email-signature">Email Signature</Link></li>
              <li><Link to="/lead-forms">Lead Forms</Link></li>
              <li><Link to="/downloads">Downloads</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li>Glen Allen, Virginia</li>
              <li>
                <a href="mailto:marketing@menswellnesscenters.com">
                  marketing@menswellnesscenters.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Men's Wellness Centers. Brand system v2026.06.</span>
          <span>LEGITSCRIPT CERTIFIED · PHYSICIAN-LED · LOCALLY OWNED</span>
        </div>
      </div>
    </footer>
  );
}
