"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import { servicePages } from "@/config/services";
import { track } from "@/lib/analytics";

const mainNav = [
  { href: "/come-funziona/", label: "Come funziona" },
  { href: "/guide/", label: "Guide" },
  { href: "/chi-siamo/", label: "Chi siamo" },
];

export function Header({ siteName }: { siteName: string }) {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();
  // chiude i menu al cambio pagina (pattern "adjust state during render")
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
    setServicesOpen(false);
  }

  useEffect(() => {
    if (!open && !servicesOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      setServicesOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, servicesOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-stone bg-paper">
      <a href="#contenuto" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:bg-ink focus:px-3 focus:py-2 focus:text-paper">
        Vai al contenuto
      </a>
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-bold" aria-label={`${siteName} – Home`}>
          <Logo />
          <span className="text-lg tracking-tight">{siteName}</span>
        </Link>

        <nav aria-label="Principale" className="hidden items-center gap-6 lg:flex">
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) setServicesOpen(false);
            }}
          >
            <button type="button" className="flex items-center gap-1 py-2 text-[0.95rem] text-ink-soft hover:text-ink" aria-expanded={servicesOpen} aria-controls="menu-servizi" onClick={() => setServicesOpen((v) => !v)}>
              Servizi
              <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg>
            </button>
            <div id="menu-servizi" className={`absolute left-0 top-full w-64 rounded-[var(--radius-card)] border border-stone bg-white p-2 ${servicesOpen ? "block" : "hidden"}`}>
              {servicePages.map((s) => (
                <Link key={s.id} href={s.path} className="block rounded-md px-3 py-2 text-sm hover:bg-sand">
                  {s.cardTitle}
                </Link>
              ))}
            </div>
          </div>
          {mainNav.map((n) => (
            <Link key={n.href} href={n.href} className="text-[0.95rem] text-ink-soft hover:text-ink" aria-current={pathname?.startsWith(n.href) ? "page" : undefined}>
              {n.label}
            </Link>
          ))}
          <Link href="/preventivo/" className="btn btn-primary !min-h-10 !py-2" onClick={() => track("cta_click", { location: "header" })}>
            Richiedi un preventivo
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-stone lg:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Chiudi menu" : "Apri menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? "close" : "menu"} size={22} />
        </button>
      </div>

      {open && (
        <nav id="menu-mobile" aria-label="Menu mobile" className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-stone bg-paper lg:hidden">
          <div className="container-page grid gap-1 py-3">
            <p className="eyebrow px-2 pt-1">Servizi</p>
            {servicePages.map((s) => (
              <Link key={s.id} href={s.path} className="rounded-md px-2 py-2.5 hover:bg-sand">
                {s.cardTitle}
              </Link>
            ))}
            <hr className="my-2 border-stone" />
            {mainNav.map((n) => (
              <Link key={n.href} href={n.href} className="rounded-md px-2 py-2.5 hover:bg-sand">
                {n.label}
              </Link>
            ))}
            <Link href="/contatti/" className="rounded-md px-2 py-2.5 hover:bg-sand">
              Contatti
            </Link>
            <Link href="/preventivo/" className="btn btn-primary mt-2" onClick={() => track("cta_click", { location: "menu_mobile" })}>
              Richiedi un preventivo
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
