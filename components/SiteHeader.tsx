"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Badge from "@/components/Badge";
import { NAV, ORG, asset } from "@/lib/site";

/* The bar across the top of every page: the seal at the left (it turns as
   the page scrolls, a CSS scroll-driven animation), the sections at the
   right, and on a phone a menu that opens over the page.

   Every page opens on forest green, so the bar starts in white ink with
   nothing behind it, and takes a white ground of its own once the page has
   moved. One passive scroll listener sets that, and only on a change. */
export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    // The first reading, and the sign that the menu can now fold, on the
    // first frame after hydration.
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

  // A new page closes the menu (state adjusted during render, not in an effect).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // While the menu is open: Escape closes it and the page behind stays put.
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
    <header className="bar" data-scrolled={scrolled || open} data-open={open} data-ready={ready}>
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
            <span className="bar__name-1 caps">Gramya Sarvodaya</span>
            <span className="bar__name-2 label">Foundation</span>
          </span>
        </Link>

        <nav className="bar__nav" aria-label="Primary">
          <ul className="bar__links" id="site-menu">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  className="bar__link"
                  href={item.href}
                  aria-current={current(item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
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
