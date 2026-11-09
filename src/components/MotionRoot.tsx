"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    __reveal?: boolean;
  }
}

/**
 * Regia del movimento, un solo componente e due osservatori: comparse allo scorrimento e indice dei capitoli.
 * Senza JS, o con riduzione del movimento, la pagina è completa e ferma.
 */
export function MotionRoot() {
  const pathname = usePathname();

  useEffect(() => {
    window.__reveal = true;
    const motionOk = document.documentElement.classList.contains("motion-ok");
    const cleanups: (() => void)[] = [];

    const items = document.querySelectorAll("[data-reveal]:not(.is-in)");
    if (!motionOk) {
      items.forEach((el) => el.classList.add("is-in"));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (!e.isIntersecting) continue;
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
      );
      items.forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
    }

    // Indice laterale: si accende il capitolo che attraversa il centro dello schermo
    const rail = document.querySelector<HTMLElement>("[data-rail]");
    if (rail) {
      const links = new Map([...rail.querySelectorAll<HTMLElement>("[data-rail-link]")].map((a) => [a.dataset.railLink, a]));
      const onChapter = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (!e.isIntersecting) continue;
            const section = e.target as HTMLElement;
            links.forEach((a, id) => (id === section.id ? a.setAttribute("aria-current", "true") : a.removeAttribute("aria-current")));
            rail.dataset.dark = section.dataset.dark;
            rail.toggleAttribute("data-done", !section.id);
          }
        },
        { rootMargin: "-50% 0px -50% 0px" },
      );
      document.querySelectorAll("[data-chapter]").forEach((el) => onChapter.observe(el));
      cleanups.push(() => onChapter.disconnect());
    }

    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return null;
}
