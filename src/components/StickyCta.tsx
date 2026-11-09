"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "./Icon";
import { track } from "@/lib/analytics";

interface Props {
  phoneHref?: string;
  whatsappHref?: string;
}

/**
 * Barra mobile: compare solo quando l'invito principale della pagina
 * ([data-hero-cta]) è uscito dallo schermo, così non lo duplica.
 * Mostra solo i canali realmente configurati.
 */
export function StickyCta({ phoneHref, whatsappHref }: Props) {
  const pathname = usePathname() ?? "/";
  const [heroInView, setHeroInView] = useState(true);

  useEffect(() => {
    const hero = document.querySelector("[data-hero-cta]");
    if (!hero) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- dipende dal DOM della pagina appena montata
      setHeroInView(false);
      return;
    }
    const io = new IntersectionObserver(([entry]) => setHeroInView(entry.isIntersecting));
    io.observe(hero);
    return () => io.disconnect();
  }, [pathname]);

  if (pathname.startsWith("/preventivo") || pathname.startsWith("/admin")) return null;

  return (
    <aside
      aria-label="Richiedi un preventivo"
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-stone bg-paper px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 transition-transform duration-200 lg:hidden ${heroInView ? "invisible translate-y-full" : ""}`}
    >
      <div className="mx-auto flex max-w-md gap-2">
        {phoneHref && (
          <a href={phoneHref} onClick={() => track("phone_click", { location: "sticky" })} className="btn btn-secondary flex-1 !min-h-11 !px-2 text-sm">
            <Icon name="phone" size={18} /> Chiama
          </a>
        )}
        {whatsappHref && (
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", { location: "sticky" })} className="btn btn-secondary flex-1 !min-h-11 !px-2 text-sm">
            <Icon name="chat" size={18} /> WhatsApp
          </a>
        )}
        <Link href="/preventivo/" onClick={() => track("cta_click", { location: "sticky" })} className="btn btn-primary flex-[1.4] !min-h-11 text-sm">
          Richiedi un preventivo
        </Link>
      </div>
    </aside>
  );
}
