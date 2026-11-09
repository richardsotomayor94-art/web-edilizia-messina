"use client";

import { useEffect } from "react";

/** Da desktop le fotografie si scoprono a piastrelle. Su mobile resta un solo pannello, fatto col solo CSS. */
function layTiles() {
  const laid: HTMLElement[] = [];
  document.querySelectorAll<HTMLElement>("[data-pp] [data-tiles]:not(.has-tiles):not(.is-in)").forEach((frame) => {
    const [cols, rows] = (frame.dataset.tiles ?? "").split("x").map(Number);
    if (!cols || !rows) return;
    const grid = document.createElement("span");
    grid.className = "pp-tiles";
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
    laid.push(frame);
  });
  return laid;
}

/**
 * Regia del pass pilota. Non tocca Header e Footer condivisi: li decora solo mentre si è su questa pagina.
 * Header che segue la materia sotto di sé, si ritira scendendo e ricompare risalendo, con il capitolo corrente.
 */
export function PilotMotion() {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>(".site-header");
    const brand = header?.querySelector(".site-brand");
    if (!header || !brand) return;

    const motionOk = document.documentElement.classList.contains("motion-ok");
    const desktop = matchMedia("(min-width: 1024px)").matches;
    const cleanups: (() => void)[] = [];

    if (motionOk && desktop) {
      const laid = layTiles();
      cleanups.push(() => laid.forEach((f) => (f.classList.remove("has-tiles"), f.querySelector(".pp-tiles")?.remove())));
    }

    header.dataset.pp = "";
    const chapter = document.createElement("span");
    chapter.className = "pp-chapter";
    chapter.setAttribute("aria-hidden", "true");
    brand.after(chapter);
    cleanups.push(() => {
      chapter.remove();
      delete header.dataset.pp;
      delete header.dataset.tone;
      delete header.dataset.hidden;
    });

    // Una sottile fascia all'altezza dell'header: tono della materia e capitolo corrente
    const footer = document.querySelector<HTMLElement>(".site-footer");
    const chapters = [...document.querySelectorAll<HTMLElement>("[data-pp] [data-chapter][id]")];
    const showChapter = (section: HTMLElement) => {
      const i = chapters.indexOf(section);
      const text = i < 0 ? "" : section.dataset.chapter ?? "";
      if (chapter.dataset.text === text) return;
      chapter.dataset.text = text;
      chapter.textContent = text;
      if (text && motionOk) chapter.animate({ opacity: [0, 1], translate: ["0 6px", "0 0"] }, { duration: 320, easing: "cubic-bezier(.16,1,.3,1)" });
    };
    const line = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          header.dataset.tone = el === footer || el.dataset.dark === "true" ? "dark" : "light";
          showChapter(el);
        }
      },
      { rootMargin: "-3% 0px -96% 0px" },
    );
    document.querySelectorAll("[data-pp] [data-dark]").forEach((el) => line.observe(el));
    if (footer) line.observe(footer);
    cleanups.push(() => line.disconnect());

    // Scendendo l'header cede lo schermo alla pagina; risalendo torna subito
    if (motionOk) {
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

    // Sulla chiusura la barra mobile lascia la scena all'invito principale
    const bar = document.querySelector<HTMLElement>('aside[class*="bottom-0"]');
    const closingCta = document.querySelector("[data-closing-cta]");
    if (bar && closingCta) {
      const io = new IntersectionObserver(([e]) => (bar.dataset.ppAway = String(e.isIntersecting)));
      io.observe(closingCta);
      cleanups.push(() => {
        io.disconnect();
        delete bar.dataset.ppAway;
      });
    }

    // Footer: la firma sale dalla linea di terra quando ci arrivi
    const word = footer?.querySelector<HTMLElement>(".footer-word");
    if (footer && word && motionOk) {
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

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
