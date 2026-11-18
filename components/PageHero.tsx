import Link from "next/link";
import type { ReactNode } from "react";

/* The opening of every inner page, on forest green: a breadcrumb, the
   page's name in capitals, a script word hung from its right edge, and one
   sentence. The white arch at its foot rises into the page below. */
export default function PageHero({
  trail = [],
  label,
  lines,
  script,
  children,
  aside,
}: {
  /** The pages above this one, for the breadcrumb. Home is always first. */
  trail?: { href: string; label: string }[];
  label: string;
  lines: string[];
  script?: string;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className={aside ? "phero phero--aside" : "phero"} data-ground="dark">
      <div className="shell phero__inner">
        <div className="phero__words">
          <nav className="crumbs label" aria-label="Breadcrumb">
            <ol>
              {[{ href: "/", label: "Home" }, ...trail].map((c) => (
                <li key={c.href}>
                  <Link href={c.href}>{c.label}</Link>
                </li>
              ))}
              <li aria-current="page">{label}</li>
            </ol>
          </nav>
          <div className="lockup">
            <h1 className="phero__title caps">
              {lines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h1>
            {script && (
              <p className="lockup__script script" aria-hidden="true">
                {script}
              </p>
            )}
          </div>
          {children && <div className="phero__lede">{children}</div>}
        </div>
        {aside && <div className="phero__aside">{aside}</div>}
      </div>
      <div className="arch" aria-hidden="true" />
    </section>
  );
}
