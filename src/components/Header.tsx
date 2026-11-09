"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { Wordmark } from "./Logo";
import { CTA_LABEL } from "@/config/site";
import { track } from "@/lib/analytics";

const mainNav = [
  { href: "/come-funziona/", label: "Come funziona" },
  { href: "/#zone", label: "Zone" },
  { href: "/guide/", label: "Guide" },
];

export interface NavService {
  id: string;
  path: string;
  cardTitle: string;
}

/** Sulle pagine con apertura scura l'header parte trasparente, poi diventa una barra compatta. */
function hasDarkOpening(pathname: string, darkPaths: string[]) {
  return darkPaths.includes(pathname) || pathname.startsWith("/guide/");
}

export function Header({ siteName, services, darkPaths }: { siteName: string; services: NavService[]; darkPaths: string[] }) {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const servicesRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  // chiude i menu al cambio pagina (pattern "adjust state during render")
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
    setServicesOpen(false);
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

  // Il menu mobile copre la pagina: blocca lo scorrimento sotto
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = prev;
    };
  }, [open]);

  const overlay = hasDarkOpening(pathname, darkPaths) && atTop && !open;
  const inServices = services.some((s) => s.path === pathname);

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
            <div
              ref={servicesRef}
              className="relative"
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) setServicesOpen(false);
              }}
            >
              <button type="button" className={`nav-link flex items-center gap-1.5 py-2 text-[0.95rem] ${inServices ? "is-active" : ""}`} aria-expanded={servicesOpen} aria-controls="menu-servizi" onClick={() => setServicesOpen((v) => !v)}>
                Servizi
                <svg width="10" height="10" viewBox="0 0 12 12" aria-hidden="true" className={`transition-transform duration-[var(--motion-fast)] ${servicesOpen ? "rotate-180" : ""}`}>
                  <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </button>
              <div id="menu-servizi" className="nav-panel" data-open={servicesOpen} inert={!servicesOpen}>
                {services.map((s, i) => (
                  <Link key={s.id} href={s.path} aria-current={pathname === s.path ? "page" : undefined} className="nav-panel-link">
                    <span className="text-xs tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-display text-[1.45rem] leading-tight">{s.cardTitle}</span>
                  </Link>
                ))}
              </div>
            </div>
            {mainNav.map((n) => (
              <Link key={n.href} href={n.href} className={`nav-link text-[0.95rem] ${pathname === n.href ? "is-active" : ""}`} aria-current={pathname === n.href ? "page" : undefined}>
                {n.label}
              </Link>
            ))}
            <Link href="/preventivo/" className="btn btn-primary !min-h-11 !px-5 !py-2 text-[0.95rem]" onClick={() => track("cta_click", { location: "header" })}>
              {CTA_LABEL}
            </Link>
          </nav>

          <button
            type="button"
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
          <nav id="menu-mobile" aria-label="Menu mobile" className="menu-sheet lg:hidden">
            <div className="wrap flex min-h-full flex-col pb-6 pt-2">
              <p className="t-label text-paper/60">Servizi</p>
              <ul className="mt-1">
                {services.map((s, i) => (
                  <li key={s.id} className="menu-item border-b border-paper/15" style={{ "--i": i } as React.CSSProperties}>
                    <Link href={s.path} aria-current={pathname === s.path ? "page" : undefined} className="flex min-h-12 items-baseline gap-3 py-2 font-display text-[1.85rem] leading-tight">
                      <span className="font-sans text-xs tabular-nums text-paper/60">{String(i + 1).padStart(2, "0")}</span>
                      {s.cardTitle}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="menu-item mt-3 grid grid-cols-2 gap-x-4" style={{ "--i": services.length } as React.CSSProperties}>
                {[...mainNav, { href: "/chi-siamo/", label: "Chi siamo" }, { href: "/contatti/", label: "Contatti" }].map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} className="flex min-h-11 items-center text-paper/90">
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/preventivo/" className="menu-item btn btn-primary mt-auto w-full" style={{ "--i": services.length + 1 } as React.CSSProperties} onClick={() => track("cta_click", { location: "menu_mobile" })}>
                {CTA_LABEL} <Icon name="arrow" />
              </Link>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
