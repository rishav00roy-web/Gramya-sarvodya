import Link from "next/link";
import type { ReactNode } from "react";

/* The opening of every inner page, on a rounded forest card: a breadcrumb,
   the page's name, and one sentence. */
export default function PageHero({
  trail = [],
  label,
  lines,
  children,
  aside,
}: {
  /** The pages above this one, for the breadcrumb. Home is always first. */
  trail?: { href: string; label: string }[];
  label: string;
  lines: string[];
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className={aside ? "phero phero--aside shell" : "phero shell"}>
      <div className="phero__card phero__inner" data-ground="dark">
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
          <h1 className="phero__title caps">
            {lines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>
          {children && <div className="phero__lede">{children}</div>}
        </div>
        {aside && <div className="phero__aside">{aside}</div>}
      </div>
    </section>
  );
}
