import Image from "next/image";
import type { ServicePage } from "@/config/services";
import type { Media } from "@/config/media";
import type { ServiceExperience } from "@/config/service-experience";
import { DARK_GROUNDS } from "@/config/service-experience";
import { CTA_LABEL, site } from "@/config/site";
import { EVALUATION_CTA } from "@/config/specialist";
import { Breadcrumbs } from "../Breadcrumbs";
import { ContactShortcuts } from "../ContactShortcuts";
import { Icon } from "../Icon";
import { TrackedLink } from "../TrackedLink";
import { ServiceMotif } from "./Motif";

/** Apertura della landing: materia a tutta altezza, titolo grande e un disegno tecnico che si completa. */
export function ServiceHero({ s, x, img, number, crumbs, href, pending = false }: { s: ServicePage; x: ServiceExperience; img: Media; number: string; crumbs: { name: string; path: string }[]; href: string; pending?: boolean }) {
  const dark = DARK_GROUNDS.includes(x.ground);
  const landscape = img.src.width > img.src.height;
  return (
    <section data-chapter="apertura" data-dark={dark} className={`svc-hero g-${x.ground} ${dark ? "on-dark header-offset" : ""} ${x.flip ? "svc-hero-flip" : ""}`}>
      <div className={`svc-hero-media frame ${dark ? "" : "svc-hero-media-plain"}`}>
        <Image src={img.src} alt={img.alt} fill priority fetchPriority="high" sizes={landscape ? "(min-width: 1024px) 85vw, 100vw" : "(min-width: 1024px) 42vw, 100vw"} quality={60} />
      </div>

      <div className="svc-hero-body">
        <ServiceMotif name={x.motif} className="svc-hero-motif c-accent" />
        <div className="relative">
          <Breadcrumbs items={crumbs} />
          <p className="t-label c-accent mt-4 lg:mt-5">
            {number.startsWith("S") ? "Servizio" : "Lavoro"} {number} · {x.theme} · {site.city}
          </p>
          <h1 className="t-h1 mt-3 lg:!text-[clamp(3.1rem,5.3vw,5.6rem)]">{s.h1}</h1>
          <p className="t-lead c-sub mt-4 max-w-xl max-lg:line-clamp-4">{s.lead}</p>
          <div data-hero-cta className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5 lg:mt-7">
            <TrackedLink href={href} event="cta_click" location="service_hero" service={s.funnelService} className="btn btn-primary w-full text-lg sm:w-auto">
              {s.line ? EVALUATION_CTA : CTA_LABEL} <Icon name="arrow" />
            </TrackedLink>
            <p className="c-sub text-center text-sm sm:text-left">
              {s.line ? "Valutazione gratuita · un professionista specializzato, con partita IVA e fattura · senza impegno" : <>Richiesta gratuita · un&apos;impresa specializzata, con partita IVA e fattura · senza impegno</>}
            </p>
          </div>
          <ContactShortcuts location="service_hero" service={s.funnelService} label={s.navLabel.toLowerCase()} className="mt-3" />
          {pending && (
            <p role="note" className="b-rule c-sub mt-5 max-w-xl border-l-2 pl-4 text-sm">
              <strong className="c-accent">In preparazione.</strong> Stiamo confermando specialità, zone e condizioni dei professionisti: puoi già chiedere una valutazione e ti diciamo se abbiamo la persona adatta.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
