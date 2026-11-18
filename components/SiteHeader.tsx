"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Badge from "@/components/Badge";
import { NAV, ORG, asset } from "@/lib/site";

/* The header of every page, laid out the way large foundation sites lay
   theirs: the seal and name at the left, the sections at the right with a
   panel of their pages under each, and one pill to join. On a phone the
   whole map folds into one menu.

   Panels open on hover and on keyboard focus (CSS :focus-within), so they
   need no script; the menu on small screens is the only scripted part, and
   until the script runs the links stay visible in a row. */
export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    const frame = requestAnimationFrame(() => {
      onScroll();
      setReady(true);
    });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.documentElement.dataset.menu = "open";
    return () => {
      document.removeEventListener("keydown", onKey);
      delete document.documentElement.dataset.menu;
    };
  }, [open]);

  const current = (href: string) =>
    pathname === href || pathname === `${href}/` || pathname.startsWith(`${href}/`);

  return (
    <header className="bar" data-open={open} data-ready={ready} data-scrolled={scrolled}>
      <div className="bar__inner">
        <Link className="bar__brand" href="/" aria-label={`${ORG.name}, home`}>
          <span className="bar__seal">
            <span className="bar__spin">
              <Badge id="bar-seal" text={`${ORG.name}   ${ORG.motto}   `} />
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="bar__emblem" src={asset("/media/gsf-seal.webp")} alt="" width={64} height={64} />
          </span>
          <span className="bar__name">
            <span className="bar__name-1">Gramya Sarvodaya</span>
            <span className="bar__name-2">Foundation</span>
          </span>
        </Link>

        <nav className="bar__nav" aria-label="Primary">
          <ul className="bar__links" id="site-menu">
            {NAV.map((item) => (
              <li key={item.href} className={item.children ? "bar__item bar__item--parent" : "bar__item"}>
                <Link
                  className="bar__link"
                  href={item.href}
                  aria-current={current(item.href) ? "page" : undefined}
                >
                  {item.label}
                  {item.children && <span className="bar__caret" aria-hidden="true" />}
                </Link>
                {item.children && (
                  <ul className="bar__panel" aria-label={item.label}>
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link className="bar__sublink" href={child.href}>
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <Link className="bar__pill" href="/get-involved">
            Join us
          </Link>
          <button
            type="button"
            className="bar__toggle"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="bar__toggle-lines" aria-hidden="true" />
            <span className="bar__toggle-text">{open ? "Close" : "Menu"}</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
