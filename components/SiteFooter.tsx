import Link from "next/link";
import { FOOTER_NAV, ORG } from "@/lib/site";

const LEGAL = [
  { href: "/legal/privacy-policy", label: "Privacy Policy" },
  { href: "/legal/terms-and-conditions", label: "Terms and Conditions" },
  { href: "/legal/disclaimer", label: "Disclaimer" },
  { href: "/legal/cookie-policy", label: "Cookie Policy" },
  { href: "/legal/accessibility", label: "Website Accessibility" },
  { href: "/legal/grievance-and-feedback", label: "Grievance and Feedback" },
  { href: "/credits", label: "Photo credits" },
];

/* The forest-green close of every page: the name set large, the tagline,
   the way round the site, how to reach the Foundation, and the small print. */
export default function SiteFooter() {
  return (
    <footer className="footer" data-ground="dark">
      <div className="shell">
        <div className="footer__mast">
          <p className="footer__name caps">Gramya Sarvodaya Foundation</p>
          <p className="footer__tagline">{ORG.tagline}</p>
        </div>

        <div className="footer__cols">
          <nav aria-label="Footer">
            <p className="footer__head label">The Foundation</p>
            <ul className="footer__list">
              {FOOTER_NAV.map((item) => (
                <li key={item.label}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="footer__head label">Write or call</p>
            <ul className="footer__list">
              <li>
                <a href={`mailto:${ORG.email}`}>{ORG.email}</a>
              </li>
              <li>
                <a href={ORG.phoneHref}>{ORG.phone}</a>
              </li>
              <li>
                <a href={ORG.url}>{ORG.website}</a>
              </li>
            </ul>
          </div>

          <div>
            <p className="footer__head label">Office address</p>
            <address className="footer__address">
              {ORG.office.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>
          </div>

          <nav aria-label="Legal">
            <p className="footer__head label">Legal and website</p>
            <ul className="footer__list">
              {LEGAL.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="footer__base">
          <p className="footer__motto script">{ORG.motto}.</p>
          <p className="footer__copy">
            Photographs on this site are illustrative, from{" "}
            <Link href="/credits">Unsplash</Link>, and do not show Foundation
            projects.
          </p>
          <p className="footer__copy">
            © {ORG.year} {ORG.name}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
