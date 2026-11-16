import Image from "next/image";
import Link from "next/link";
import { specialistPages, isPendingService } from "@/config/services";
import { specialistHeroMedia } from "@/config/specialist-pages";
import { EVALUATION_CTA } from "@/config/specialist";
import { TavLabel } from "../TavLabel";
import { Title } from "../service/Band";
import { Icon } from "../Icon";
import { TrackedLink } from "../TrackedLink";

/**
 * Servizi specialistici in home: stesse tavole, stesse regole dell'indice dei lavori.
 * Finché un servizio è in preparazione lo diciamo chiaramente: nessuna disponibilità promessa.
 */
export function SpecialistServices() {
  return (
    <section id="servizi-specialistici" aria-labelledby="spec-title" className="g-travertino seam-ruler cv-auto scroll-mt-16 relative py-16 lg:py-28">
      <div className="wrap">
        <TavLabel n="02·S" label="Servizi specialistici" />
        <Title id="spec-title" className="t-h2 mt-4 max-w-4xl" text="Oltre la ristrutturazione: *recuperare* ciò che hai già." />
        <p data-reveal className="t-lead mt-4 max-w-2xl text-ink-soft">
          Pulizia e restauro di tombe, marmi, porte e mobili, e pulizie specialistiche di pietra, legno e metallo. Prima si valuta l&apos;oggetto, poi si sceglie chi e come.
        </p>
      </div>
      <ul className="wrap mt-10 grid-12 gap-y-12 lg:mt-14">
        {specialistPages.map((s, i) => {
          const img = specialistHeroMedia[s.id];
          return (
            <li key={s.id} className={`col-span-12 ${i === 0 ? "lg:col-span-6" : "lg:col-span-5 lg:col-start-8 lg:mt-24"}`}>
              <Link href={s.path} className="group block">
                <div data-reveal={i === 0 ? "mask" : "panel"} className="frame frame-zoom aspect-[4/3]">
                  <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" placeholder="blur" className="object-cover object-[50%_35%]" />
                </div>
                <div data-reveal className="mt-4 grid grid-cols-[2.5rem_1fr] gap-x-2">
                  <span className="font-display text-4xl leading-none text-clay">S{i + 1}</span>
                  <div>
                    <h3 className="t-h3 group-hover:underline">{s.cardTitle}</h3>
                    <p className="mt-2 max-w-xl text-ink-soft">{s.cardText}</p>
                    {isPendingService(s) && <p className="t-label mt-3 text-clay-dark">In preparazione · raccogliamo richieste di valutazione</p>}
                  </div>
                </div>
              </Link>
              <TrackedLink href={`/preventivo/?servizio=${s.funnelService}`} event="cta_click" location={`home_specialist_${i + 1}`} service={s.funnelService} className="ar-inline-cta mt-4 ml-[3rem] text-clay-dark">
                <span>{EVALUATION_CTA}</span> <Icon name="arrow" size={18} />
              </TrackedLink>
            </li>
          );
        })}
      </ul>
      <p className="wrap mt-10 text-sm text-muted">Le tavole sono illustrazioni: non raffigurano lavori eseguiti tramite questo servizio.</p>
    </section>
  );
}
