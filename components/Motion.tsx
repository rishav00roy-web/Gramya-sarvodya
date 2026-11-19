"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/* The site's only scripted motion, both off when the device asks for less
   motion:

   - Lenis smooths mouse-wheel scrolling on a desktop with a fine pointer.
     Touch scrolling is left native, so phones keep their own feel. It
     pauses while the menu sheet is open.
   - GSAP's ScrollTrigger lets the home page's later sections rise in once
     as they reach the screen. Nothing already on screen when the page
     opens is hidden, so the hero never flickers or waits. */
const REVEAL =
  ".quote__panel, .section__head, .creed__facts, .band__inner, .steps, .ways, .closing__inner";

export default function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desk = window.matchMedia("(pointer: fine) and (min-width: 900px)");
    if (calm.matches || !desk.matches) return;
    let alive = true;
    let cleanup = () => {};
    import("lenis").then(({ default: Lenis }) => {
      if (!alive) return;
      const lenis = new Lenis({ autoRaf: true, anchors: { offset: -88 } });
      const html = document.documentElement;
      // The menu pins the page and puts it back when it closes; Lenis
      // waits until that has happened, then picks up from where it is.
      let timer = 0;
      const watch = new MutationObserver(() => {
        window.clearTimeout(timer);
        if (html.dataset.menu === "open") lenis.stop();
        else timer = window.setTimeout(() => lenis.start(), 60);
      });
      watch.observe(html, { attributes: true, attributeFilter: ["data-menu"] });
      // A link followed mid-glide must not carry the glide onto the next
      // page, which opens at its top (or, going back, where it was left).
      const settle = () => {
        if (!lenis.isScrolling || lenis.isStopped) return;
        lenis.stop();
        lenis.start();
      };
      document.addEventListener("click", settle, true);
      window.addEventListener("popstate", settle);
      cleanup = () => {
        window.clearTimeout(timer);
        watch.disconnect();
        document.removeEventListener("click", settle, true);
        window.removeEventListener("popstate", settle);
        lenis.destroy();
      };
    });
    return () => {
      alive = false;
      cleanup();
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const items = [...document.querySelectorAll<HTMLElement>(REVEAL)].filter(
      (el) => el.getBoundingClientRect().top > window.innerHeight,
    );
    if (!items.length) return;
    let alive = true;
    let cleanup = () => {};
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (!alive) return;
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
          for (const el of items) {
            gsap.from(el, {
              y: 24,
              opacity: 0,
              duration: 0.7,
              ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            });
          }
        });
        cleanup = () => ctx.revert();
      },
    );
    return () => {
      alive = false;
      cleanup();
    };
  }, [pathname]);

  return null;
}
