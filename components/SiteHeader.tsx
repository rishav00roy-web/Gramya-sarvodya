"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Badge from "@/components/Badge";
import { NAV, ORG, asset } from "@/lib/site";

/* The header of every page, laid out the way large foundation sites lay
   theirs: the seal and name at the left, the sections at the right with a
   panel of their pages under each, and one pill to join. On a phone the
   whole map folds into one menu.

   Panels open on hover and on keyboard focus (CSS :focus-within), so they
   need no script. On a phone or tablet the header is only the seal, the
   name and a menu button; the menu is its own full-screen sheet with each
   section folded, and the page underneath is held still while it is open
   so a swipe never scrolls the page behind it. */
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

  const [section, setSection] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const pathRef = useRef(pathname);
  useEffect(() => {
    pathRef.current = pathname;
  }, [pathname]);

  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  /* While the menu is open the page is pinned where it was (the iOS-safe
     way: the body is fixed at its own scroll offset), then put back. */
  useEffect(() => {
    if (!open) return;
    const y = window.scrollY;
    const startPath = pathRef.current;
    const startHash = window.location.hash;
    const body = document.body.style;
    const html = document.documentElement;
    html.dataset.menu = "open";
    body.position = "fixed";
    body.top = `-${y}px`;
    body.left = "0";
    body.right = "0";
    body.width = "100%";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const wide = window.matchMedia("(min-width: 1360px)");
    const onWide = () => wide.matches && setOpen(false);
    wide.addEventListener("change", onWide);
    const toggle = toggleRef.current;
    return () => {
      document.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
      delete html.dataset.menu;
      body.position = "";
      body.top = "";
      body.left = "";
      body.right = "";
      body.width = "";
      // Back to where the reader was, unless a menu link took them
      // somewhere else: a new page starts at its top, a new #section at it.
      const hash = window.location.hash;
      const target =
        hash && hash !== startHash
          ? document.getElementById(hash.slice(1))
          : null;
      if (target) target.scrollIntoView({ behavior: "instant" });
      else
        window.scrollTo({
          top: pathRef.current === startPath ? y : 0,
          behavior: "instant",
        });
      if (pathRef.current === startPath && !target)
        toggle?.focus({ preventScroll: true });
    };
  }, [open]);

  const close = () => setOpen(false);

  const current = (href: string) =>
    pathname === href ||
    pathname === `${href}/` ||
    pathname.startsWith(`${href}/`);

  return (
    <header
      className="bar"
      data-open={open}
      data-ready={ready}
      data-scrolled={scrolled}
    >
      <div className="bar__inner">
        <Link className="bar__brand" href="/" aria-label={`${ORG.name}, home`}>
          <span className="bar__seal">
            <span className="bar__spin">
              <Badge id="bar-seal" text={`${ORG.name}   ${ORG.motto}   `} />
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="bar__emblem"
              src={asset("/media/gsf-seal.webp")}
              alt=""
              width={64}
              height={64}
            />
          </span>
          <span className="bar__name">
            <span className="bar__name-1">Gramya Sarvodaya</span>
            <span className="bar__name-2">Foundation</span>
          </span>
        </Link>

        <nav className="bar__nav" aria-label="Primary">
          <ul className="bar__links" id="site-menu">
            {NAV.map((item) => (
              <li
                key={item.href}
                className={
                  item.children ? "bar__item bar__item--parent" : "bar__item"
                }
              >
                <Link
                  className="bar__link"
                  href={item.href}
                  aria-current={current(item.href) ? "page" : undefined}
                >
                  {item.label}
                  {item.children && (
                    <span className="bar__caret" aria-hidden="true" />
                  )}
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
          <Link
            className="bar__account"
            href="/account"
            aria-current={current("/account") ? "page" : undefined}
          >
            My account
          </Link>
          <Link className="bar__pill" href="/get-involved">
            Join us
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="bar__toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <span className="bar__toggle-lines" aria-hidden="true" />
          </button>
        </nav>
      </div>

      <div
        className="mnav"
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        hidden={!open}
      >
        <div className="mnav__top">
          <Link
            className="bar__brand"
            href="/"
            onClick={close}
            aria-label={`${ORG.name}, home`}
          >
            <span className="bar__seal">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="bar__emblem"
                src={asset("/media/gsf-seal.webp")}
                alt=""
                width={64}
                height={64}
              />
            </span>
            <span className="bar__name">
              <span className="bar__name-1">Gramya Sarvodaya</span>
              <span className="bar__name-2">Foundation</span>
            </span>
          </Link>
          <button
            ref={closeRef}
            type="button"
            className="mnav__close"
            onClick={close}
            aria-label="Close menu"
          >
            <span aria-hidden="true" />
          </button>
        </div>

        <ul className="mnav__list">
          {NAV.map((item) => {
            const isOpen = section === item.href;
            return (
              <li key={item.href} className="mnav__item">
                <div className="mnav__row">
                  <Link
                    className="mnav__link"
                    href={item.href}
                    onClick={close}
                    aria-current={current(item.href) ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <button
                      type="button"
                      className="mnav__fold"
                      aria-expanded={isOpen}
                      aria-controls={`mnav-${item.href.slice(1)}`}
                      aria-label={`${isOpen ? "Hide" : "Show"} ${item.label} pages`}
                      onClick={() => setSection(isOpen ? null : item.href)}
                    >
                      <span aria-hidden="true" />
                    </button>
                  )}
                </div>
                {item.children && (
                  <ul
                    className="mnav__sub"
                    id={`mnav-${item.href.slice(1)}`}
                    hidden={!isOpen}
                  >
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          className="mnav__sublink"
                          href={child.href}
                          onClick={close}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>

        <div className="mnav__foot">
          <Link
            className="button mnav__join"
            href="/get-involved"
            onClick={close}
          >
            Join us
          </Link>
          <Link className="mnav__account" href="/account" onClick={close}>
            My account
          </Link>
          <a href={`mailto:${ORG.email}`}>{ORG.email}</a>
          <a href={ORG.phoneHref}>{ORG.phone}</a>
        </div>
      </div>
    </header>
  );
}
