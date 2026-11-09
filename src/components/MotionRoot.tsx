"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    __reveal?: boolean;
  }
}

/** Da desktop i titoli compaiono parola per parola. Su mobile la divisione non avviene: meno nodi e meno layout. */
function splitTitles() {
  document.querySelectorAll<HTMLElement>('[data-reveal="words"]:not([data-split])').forEach((title) => {
    title.dataset.split = "1";
    if (title.tagName === "H2") title.setAttribute("aria-label", title.textContent ?? "");
    let index = 0;
    let current: HTMLSpanElement | null = null;
    let gap = false;
    const box = document.createElement("span");
    if (title.tagName === "H2") box.setAttribute("aria-hidden", "true");
    for (const node of [...title.childNodes]) {
      const italic = node.nodeName === "EM";
      for (const token of (node.textContent ?? "").match(/\s+|\S+/g) ?? []) {
        if (!token.trim()) {
          gap = true;
          continue;
        }
        const piece = italic ? Object.assign(document.createElement("em"), { textContent: token }) : token;
        // La punteggiatura attaccata resta nella stessa maschera della parola
        if (current && !gap) {
          current.append(piece);
          continue;
        }
        if (current) box.append(" ");
        const mask = document.createElement("span");
        mask.className = "w";
        current = document.createElement("span");
        current.style.setProperty("--i", String(index++));
        current.append(piece);
        mask.append(current);
        box.append(mask);
        gap = false;
      }
    }
    title.replaceChildren(box);
  });
}

/** Da desktop, sui lavori di superficie, le fotografie si scoprono a piastrelle. Altrove resta un pannello, fatto col solo CSS. */
function layTiles() {
  document.querySelectorAll<HTMLElement>("[data-tiles]:not(.has-tiles):not(.is-in)").forEach((frame) => {
    const [cols, rows] = (frame.dataset.tiles ?? "").split("x").map(Number);
    if (!cols || !rows) return;
    const grid = document.createElement("span");
    grid.className = "ar-tiles";
    grid.setAttribute("aria-hidden", "true");
    grid.style.setProperty("--c", String(cols));
    grid.style.setProperty("--r", String(rows));
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const tile = document.createElement("i");
        tile.style.setProperty("--d", String(x + y));
        grid.append(tile);
      }
    }
    frame.append(grid);
    frame.classList.add("has-tiles");
  });
}

/** Header: segue la materia sotto di sé, si ritira scendendo, ricompare risalendo e mostra il capitolo corrente. */
function directHeader(pathname: string, motionOk: boolean, cleanups: (() => void)[]) {
  const header = document.querySelector<HTMLElement>(".site-header");
  const brand = header?.querySelector(".site-brand");
  if (!header || !brand) return;

  const chapters = [...document.querySelectorAll<HTMLElement>("main [data-chapter][id]")];
  const chapter = document.createElement("span");
  if (chapters.length) {
    chapter.className = "ar-chapter";
    chapter.setAttribute("aria-hidden", "true");
    brand.after(chapter);
  }
  const showChapter = (text: string) => {
    if (chapter.dataset.text === text) return;
    chapter.dataset.text = text;
    chapter.textContent = text;
    if (text && motionOk && chapters.length) chapter.animate({ opacity: [0, 1], translate: ["0 6px", "0 0"] }, { duration: 320, easing: "cubic-bezier(.16,1,.3,1)" });
  };

  // Una sottile fascia all'altezza dell'header: scura se sopra passa una sezione scura
  const footer = document.querySelector<HTMLElement>(".site-footer");
  const darks = new Set([...document.querySelectorAll<HTMLElement>('main [data-dark="true"], main .on-dark'), ...(footer ? [footer] : [])]);
  const crossing = new Set<Element>();
  const line = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (darks.has(e.target as HTMLElement)) {
          if (e.isIntersecting) crossing.add(e.target);
          else crossing.delete(e.target);
        }
        const el = e.target as HTMLElement;
        if (e.isIntersecting && (el.matches("[data-chapter]") || el === footer)) showChapter(chapters.includes(el) ? (el.dataset.chapter ?? "") : "");
      }
      header.dataset.tone = crossing.size ? "dark" : "light";
    },
    { rootMargin: "-3% 0px -96% 0px" },
  );
  new Set<Element>([...darks, ...document.querySelectorAll("main [data-chapter]")]).forEach((el) => line.observe(el));
  cleanups.push(() => {
    line.disconnect();
    chapter.remove();
    delete header.dataset.tone;
    delete header.dataset.hidden;
  });

  // Sul modulo e nell'area riservata l'header resta sempre al suo posto
  if (!motionOk || pathname.startsWith("/preventivo") || pathname.startsWith("/admin")) return;
  let last = scrollY;
  let queued = false;
  let hidden = false;
  const update = () => {
    queued = false;
    const y = scrollY;
    const delta = y - last;
    if (Math.abs(delta) < 6) return;
    last = y;
    const busy = header.dataset.menu === "true" || header.matches(":focus-within") || !!header.querySelector('[data-open="true"]');
    const next = delta > 0 && y > innerHeight * 0.6 && !busy;
    if (next !== hidden) {
      hidden = next;
      header.dataset.hidden = String(next);
    }
  };
  const onScroll = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(update);
  };
  addEventListener("scroll", onScroll, { passive: true });
  cleanups.push(() => removeEventListener("scroll", onScroll));
}

/** Footer: la firma sale dalla linea di terra quando ci arrivi; la pagina corrente è indicata nell'elenco dei lavori. */
function directFooter(pathname: string, motionOk: boolean, cleanups: (() => void)[]) {
  const footer = document.querySelector<HTMLElement>(".site-footer");
  if (!footer) return;
  const current = footer.querySelector(`.footer-service[href="${pathname}"]`);
  current?.setAttribute("aria-current", "page");
  cleanups.push(() => current?.removeAttribute("aria-current"));

  const word = footer.querySelector(".footer-word");
  if (!word || !motionOk) return;
  footer.dataset.foot = "wait";
  const io = new IntersectionObserver(
    ([e]) => {
      if (!e.isIntersecting) return;
      footer.dataset.foot = "in";
      io.disconnect();
    },
    { threshold: 0.25 },
  );
  io.observe(word);
  cleanups.push(() => {
    io.disconnect();
    delete footer.dataset.foot;
  });
}

/** Sulla chiusura delle landing la barra mobile lascia la scena all'invito principale. */
function yieldStickyBar(cleanups: (() => void)[]) {
  const bar = document.querySelector<HTMLElement>('aside[class*="bottom-0"]');
  const cta = document.querySelector("[data-closing-cta]");
  if (!bar || !cta) return;
  const io = new IntersectionObserver(([e]) => (bar.dataset.away = String(e.isIntersecting)));
  io.observe(cta);
  cleanups.push(() => {
    io.disconnect();
    delete bar.dataset.away;
  });
}

/**
 * Regia del movimento: comparse allo scorrimento, indice dei capitoli, header e footer.
 * Senza JS, o con riduzione del movimento, la pagina è completa e ferma.
 */
export function MotionRoot() {
  const pathname = usePathname();

  useEffect(() => {
    window.__reveal = true;
    const motionOk = document.documentElement.classList.contains("motion-ok");
    const cleanups: (() => void)[] = [];
    if (motionOk && matchMedia("(min-width: 1024px)").matches) {
      splitTitles();
      layTiles();
    }

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

    directHeader(pathname, motionOk, cleanups);
    directFooter(pathname, motionOk, cleanups);
    yieldStickyBar(cleanups);

    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return null;
}
