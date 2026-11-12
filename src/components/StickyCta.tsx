"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "./Icon";
import { track } from "@/lib/analytics";
import { CTA_LABEL } from "@/config/site";
import { ContactAction } from "./ContactAction";

interface Props {
  phoneHref?: string;
  whatsappHref?: string;
  /** recapiti di prova: i pulsanti mostrano un avviso invece di chiamare */
  demoContacts?: boolean;
}

/**
 * Barra mobile: compare solo quando l'invito principale della pagina
 * ([data-hero-cta]) è uscito dallo schermo, così non lo duplica.
 * Mostra solo i canali realmente configurati e mai sopra il modulo.
 */
export function StickyCta({ phoneHref, whatsappHref, demoContacts = false }: Props) {
  const pathname = usePathname() ?? "/";
  const [heroInView, setHeroInView] = useState(true);
  const [closingInView, setClosingInView] = useState(false);
  // Sulle landing la barra porta al modulo con il servizio già scelto, come l'invito principale
  const [href, setHref] = useState("/preventivo/");

  useEffect(() => {
    const hero = document.querySelector("[data-hero-cta]");
    const target = hero?.querySelector("a")?.getAttribute("href");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- dipende dal DOM della pagina appena montata
    setHref(target?.startsWith("/preventivo") ? target : "/preventivo/");
    if (!hero) {
      setHeroInView(false);
      return;
    }
    const closing = document.querySelector("[data-closing-cta]");
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) (e.target === hero ? setHeroInView : setClosingInView)(e.isIntersecting);
    });
    io.observe(hero);
    if (closing) io.observe(closing);
    return () => io.disconnect();
  }, [pathname]);

  if (pathname.startsWith("/preventivo") || pathname.startsWith("/admin")) return null;

  return (
    <aside
      aria-label={CTA_LABEL}
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-stone bg-paper px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 transition-transform duration-[var(--motion-normal)] lg:hidden ${heroInView || closingInView ? "invisible translate-y-full" : ""}`}
    >
      <div className="mx-auto flex max-w-md gap-2">
        {phoneHref && (
          <ContactAction href={phoneHref} kind="phone" demo={demoContacts} location="sticky" ariaLabel="Chiama" className="btn btn-secondary !min-h-12 !px-4">
            <Icon name="phone" size={18} />
          </ContactAction>
        )}
        {whatsappHref && (
          <ContactAction href={whatsappHref} kind="whatsapp" demo={demoContacts} location="sticky" ariaLabel="Scrivici su WhatsApp" className="btn btn-secondary !min-h-12 !px-4">
            <Icon name="chat" size={18} />
          </ContactAction>
        )}
        <Link href={href} onClick={() => track("cta_click", { location: "sticky" })} className="btn btn-primary !min-h-12 flex-1">
          {CTA_LABEL}
        </Link>
      </div>
    </aside>
  );
}
