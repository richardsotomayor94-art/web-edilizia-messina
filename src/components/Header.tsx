"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { Wordmark } from "./Logo";
import { servicePages } from "@/config/services";
import { CTA_LABEL } from "@/config/site";
import { track } from "@/lib/analytics";

const mainNav = [
  { href: "/come-funziona/", label: "Come funziona" },
  { href: "/#zone", label: "Zone" },
  { href: "/guide/", label: "Guide" },
];

export function Header({ siteName }: { siteName: string }) {
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

  // Sulla home l'header si appoggia sulla fotografia finché non si scorre
  const overlay = pathname === "/" && atTop && !open;

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" className="absolute left-0 top-0 h-10 w-px" />
      <header className={`site-header ${overlay ? "on-dark" : ""}`} data-overlay={overlay}>
        <a href="#contenuto" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:bg-ink focus:px-3 focus:py-2 focus:text-paper">
          Vai al contenuto
        </a>
        <div className="wrap flex h-[4.25rem] items-center justify-between gap-4">
          <Link href="/" aria-label={`${siteName} – Home`}>
            <Wordmark size={32} onDark={overlay} />
          </Link>

          <nav aria-label="Principale" className="hidden items-center gap-7 lg:flex">
            <div
              ref={servicesRef}
              className="relative"
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) setServicesOpen(false);
              }}
            >
              <button type="button" className="flex items-center gap-1.5 py-2 text-[0.95rem]" aria-expanded={servicesOpen} aria-controls="menu-servizi" onClick={() => setServicesOpen((v) => !v)}>
                Servizi
                <svg width="10" height="10" viewBox="0 0 12 12" aria-hidden="true" className={`transition-transform duration-[var(--motion-fast)] ${servicesOpen ? "rotate-180" : ""}`}>
                  <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </button>
              <div id="menu-servizi" className={`absolute left-0 top-full mt-2 w-72 border border-stone bg-calce py-2 text-ink ${servicesOpen ? "block" : "hidden"}`}>
                {servicePages.map((s, i) => (
                  <Link key={s.id} href={s.path} className="flex items-baseline gap-3 px-4 py-2 text-[0.95rem] hover:bg-sand">
                    <span className="text-xs tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</span>
                    {s.cardTitle}
                  </Link>
                ))}
              </div>
            </div>
            {mainNav.map((n) => (
              <Link key={n.href} href={n.href} className="link-grow text-[0.95rem]" aria-current={pathname === n.href ? "page" : undefined}>
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
          <nav id="menu-mobile" aria-label="Menu mobile" className="max-h-[calc(100dvh-4.25rem)] overflow-y-auto border-t border-stone bg-paper text-ink lg:hidden">
            <div className="wrap pb-6 pt-4">
              <p className="t-label text-muted">Servizi</p>
              <ul className="mt-1">
                {servicePages.map((s, i) => (
                  <li key={s.id} className="border-b border-stone">
                    <Link href={s.path} className="flex min-h-12 items-baseline gap-3 py-2.5 font-display text-2xl">
                      <span className="font-sans text-xs tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</span>
                      {s.cardTitle}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="mt-4 grid grid-cols-2 gap-x-4">
                {[...mainNav, { href: "/chi-siamo/", label: "Chi siamo" }, { href: "/contatti/", label: "Contatti" }].map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} className="flex min-h-11 items-center">
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/preventivo/" className="btn btn-primary mt-4 w-full" onClick={() => track("cta_click", { location: "menu_mobile" })}>
                {CTA_LABEL} <Icon name="arrow" />
              </Link>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
