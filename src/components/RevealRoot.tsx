"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    __reveal?: boolean;
  }
}

/** Un solo osservatore per tutta la pagina: gli elementi [data-reveal] ricevono .is-in una volta sola. */
export function RevealRoot() {
  const pathname = usePathname();

  useEffect(() => {
    window.__reveal = true;
    const items = document.querySelectorAll("[data-reveal]:not(.is-in)");
    if (!document.documentElement.classList.contains("motion-ok")) {
      items.forEach((el) => el.classList.add("is-in"));
      return;
    }
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
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
