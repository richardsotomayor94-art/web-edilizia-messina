"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { Wordmark } from "./Logo";
import { CTA_LABEL } from "@/config/site";
import { track } from "@/lib/analytics";
import type { NavGroup } from "@/config/service-catalog";

const mainNav = [
  { href: "/come-funziona/", label: "Come funziona" },
  { href: "/#zone", label: "Zone" },
  { href: "/guide/", label: "Guide" },
];

/** Sulle pagine con apertura scura l'header parte trasparente, poi diventa una barra compatta. */
function hasDarkOpening(pathname: string, darkPaths: string[]) {
  return darkPaths.includes(pathname) || pathname.startsWith("/guide/");
}

/** Piccolo ritardo prima di cambiare gruppo al passaggio del mouse: attraversare la colonna in diagonale non lo cambia. */
const HOVER_INTENT_MS = 90;

export function Header({ siteName, groups, darkPaths }: { siteName: string; groups: NavGroup[]; darkPaths: string[] }) {
  const pathname = usePathname();
  const currentGroup = groups.find((g) => g.items.some((s) => s.path === pathname));
  const current = currentGroup?.items.find((s) => s.path === pathname);
  const firstKey = groups[0]?.key;

  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState(currentGroup?.key ?? firstKey);
  const [mobileGroup, setMobileGroup] = useState<string | null>(currentGroup?.key ?? null);
  const [atTop, setAtTop] = useState(true);
  const servicesRef = useRef<HTMLDivElement>(null);
  const servicesBtnRef = useRef<HTMLButtonElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const hoverTimer = useRef<number | undefined>(undefined);

  // chiude i menu al cambio pagina e riparte dal gruppo della pagina (pattern "adjust state during render")
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
    setServicesOpen(false);
    setActiveGroup(currentGroup?.key ?? firstKey);
    setMobileGroup(currentGroup?.key ?? null);
  }

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setAtTop(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open && !servicesOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      // Se il fuoco era nel pannello, torna al pulsante che lo ha aperto
      if (servicesOpen && servicesRef.current?.contains(document.activeElement)) servicesBtnRef.current?.focus();
      setOpen(false);
      setServicesOpen(false);
    };
    const onPointer = (e: PointerEvent) => {
      if (!servicesRef.current?.contains(e.target as Node)) setServicesOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [open, servicesOpen]);

  // Il menu mobile copre la pagina: blocca lo scorrimento sotto, rende inerte il resto e porta il fuoco dentro
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    const behind = [...document.querySelectorAll<HTMLElement>("main, .site-footer, aside[class*='bottom-0']")];
    behind.forEach((el) => el.setAttribute("inert", ""));
    sheetRef.current?.querySelector<HTMLElement>("button, a")?.focus();
    const toggle = toggleRef.current;
    return () => {
      root.style.overflow = prev;
      behind.forEach((el) => el.removeAttribute("inert"));
      toggle?.focus({ preventScroll: true });
    };
  }, [open]);

  useEffect(() => () => window.clearTimeout(hoverTimer.current), []);

  const overlay = hasDarkOpening(pathname, darkPaths) && atTop && !open;
  const inServices = !!current;
  // Dalla landing, l'invito dell'header apre il modulo con il servizio già scelto
  const ctaHref = current ? `/preventivo/?servizio=${current.funnelService}` : "/preventivo/";
  const activeIndex = Math.max(0, groups.findIndex((g) => g.key === activeGroup));

  const toggleServices = () => {
    if (!servicesOpen) setActiveGroup(currentGroup?.key ?? firstKey);
    setServicesOpen((v) => !v);
  };

  // Colonna dei gruppi come elenco di schede verticale: frecce, Home e Fine spostano e attivano
  const onRailKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const keys: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    let next: number | undefined;
    if (e.key in keys) next = (activeIndex + keys[e.key] + groups.length) % groups.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = groups.length - 1;
    if (next === undefined) return;
    e.preventDefault();
    setActiveGroup(groups[next].key);
    document.getElementById(`mega-tab-${groups[next].key}`)?.focus();
  };

  const hoverGroup = (key: string) => (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setActiveGroup(key as NavGroup["key"]), HOVER_INTENT_MS);
  };
  const cancelHover = () => window.clearTimeout(hoverTimer.current);

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" className="absolute left-0 top-0 h-10 w-px" />
      <header className={`site-header ${overlay || open ? "on-dark" : ""}`} data-overlay={overlay} data-compact={!atTop && !open} data-menu={open}>
        <a href="#contenuto" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:bg-ink focus:px-3 focus:py-2 focus:text-paper">
          Vai al contenuto
        </a>
        <div className="wrap site-header-bar relative flex h-[4.25rem] items-center justify-between gap-4">
          <Link href="/" aria-label={`${siteName} – Home`} className="site-brand">
            <Wordmark size={32} onDark={overlay || open} />
          </Link>

          <nav aria-label="Principale" className="hidden items-center gap-7 lg:flex">
            {/* Il pannello si posiziona sulla barra dell'header (non sul pulsante): resta centrato a ogni larghezza */}
            <div
              ref={servicesRef}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) setServicesOpen(false);
              }}
            >
              <button ref={servicesBtnRef} type="button" className={`nav-link flex items-center gap-1.5 py-2 text-[0.95rem] ${inServices ? "is-active" : ""}`} aria-expanded={servicesOpen} aria-controls="menu-servizi" onClick={toggleServices}>
                Servizi
                <svg width="10" height="10" viewBox="0 0 12 12" aria-hidden="true" className={`transition-transform duration-[var(--motion-fast)] ${servicesOpen ? "rotate-180" : ""}`}>
                  <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </button>
              <div id="menu-servizi" className="mega" data-open={servicesOpen} inert={!servicesOpen}>
                <div className="mega-rail" role="tablist" aria-orientation="vertical" aria-label="Gruppi di servizi" onKeyDown={onRailKey} style={{ "--n": activeIndex, "--count": groups.length } as React.CSSProperties}>
                  <span className="mega-indicator" aria-hidden="true" />
                  {groups.map((g) => {
                    const selected = g.key === activeGroup;
                    return (
                      <button
                        key={g.key}
                        id={`mega-tab-${g.key}`}
                        type="button"
                        role="tab"
                        aria-selected={selected}
                        aria-controls={`mega-pane-${g.key}`}
                        tabIndex={selected ? 0 : -1}
                        className="mega-tab"
                        onClick={() => setActiveGroup(g.key)}
                        onFocus={() => setActiveGroup(g.key)}
                        onPointerEnter={hoverGroup(g.key)}
                        onPointerLeave={cancelHover}
                      >
                        <span className="mega-tab-label">{g.label}</span>
                        <span className="mega-tab-blurb">{g.blurb}</span>
                        <span className="mega-tab-count" aria-label={`${g.items.length} servizi`}>
                          {String(g.items.length).padStart(2, "0")}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <div className="mega-body">
                  {groups.map((g) => (
                    <div key={g.key} id={`mega-pane-${g.key}`} role="tabpanel" aria-labelledby={`mega-tab-${g.key}`} hidden={g.key !== activeGroup} className="mega-pane">
                      <ul className="mega-list">
                        {g.items.map((s, i) => (
                          <li key={s.id} style={{ "--i": i } as React.CSSProperties}>
                            <Link href={s.path} aria-current={pathname === s.path ? "page" : undefined} className="mega-link">
                              <span className="mega-link-title">{s.cardTitle}</span>
                              {s.hint && <span className="mega-link-hint">{s.hint}</span>}
                              <Icon name="arrow" size={16} className="mega-link-arrow" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <p className="mega-foot">
                    <span>Non trovi il tuo lavoro?</span>
                    <Link href="/preventivo/" className="mega-foot-link" onClick={() => track("cta_click", { location: "menu_servizi" })}>
                      Descrivilo nella richiesta <Icon name="arrow" size={14} />
                    </Link>
                  </p>
                </div>
              </div>
            </div>
            {mainNav.map((n) => (
              <Link key={n.href} href={n.href} className={`nav-link text-[0.95rem] ${pathname === n.href ? "is-active" : ""}`} aria-current={pathname === n.href ? "page" : undefined}>
                {n.label}
              </Link>
            ))}
            <Link href={ctaHref} className="btn btn-primary !min-h-11 !px-5 !py-2 text-[0.95rem]" onClick={() => track("cta_click", { location: "header" })}>
              {CTA_LABEL}
            </Link>
          </nav>

          <button
            type="button"
            ref={toggleRef}
            className="inline-flex h-11 w-11 items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Chiudi menu" : "Apri menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? "close" : "menu"} size={26} strokeWidth={1.5} />
          </button>
        </div>

        {open && (
          <nav ref={sheetRef} id="menu-mobile" aria-label="Menu mobile" className="menu-sheet lg:hidden" onClick={(e) => (e.target as HTMLElement).closest("a") && setOpen(false)}>
            <div className="wrap flex min-h-full flex-col pb-6 pt-2">
              <p className="t-label text-paper/60">Servizi</p>
              <div className="mt-1">
                {groups.map((g, gi) => {
                  const isOpen = mobileGroup === g.key;
                  return (
                    <div key={g.key} className="menu-item acc" data-open={isOpen} style={{ "--i": gi } as React.CSSProperties}>
                      <button type="button" className="acc-head" aria-expanded={isOpen} aria-controls={`acc-${g.key}`} onClick={() => setMobileGroup(isOpen ? null : g.key)}>
                        <span className="acc-title">{g.label}</span>
                        <span className="acc-count" aria-label={`${g.items.length} servizi`}>
                          {g.items.length}
                        </span>
                        <span className="acc-icon" aria-hidden="true" />
                      </button>
                      <div id={`acc-${g.key}`} className="acc-body" inert={!isOpen}>
                        <ul className="acc-inner">
                          {g.items.map((s, i) => (
                            <li key={s.id} style={{ "--j": i } as React.CSSProperties}>
                              <Link href={s.path} aria-current={pathname === s.path ? "page" : undefined} className="acc-link">
                                <span className="acc-link-title">{s.cardTitle}</span>
                                {s.hint && <span className="acc-link-hint">{s.hint}</span>}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
              <ul className="menu-item mt-5 grid grid-cols-2 gap-x-4" style={{ "--i": groups.length } as React.CSSProperties}>
                {[...mainNav, { href: "/chi-siamo/", label: "Chi siamo" }, { href: "/contatti/", label: "Contatti" }].map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} className="flex min-h-11 items-center text-paper/90">
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href={ctaHref} className="menu-item btn btn-primary mt-auto w-full" style={{ "--i": groups.length + 1 } as React.CSSProperties} onClick={() => track("cta_click", { location: "menu_mobile" })}>
                {CTA_LABEL} <Icon name="arrow" />
              </Link>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
