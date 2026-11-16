import Image from "next/image";
import Link from "next/link";
import { specialistPages, isPendingService } from "@/config/services";
import { specialistHeroMedia } from "@/config/specialist-pages";
import { GROUP_LABELS, groupLabelOf, type CatalogGroup } from "@/config/service-catalog";
import { CTA_LABEL } from "@/config/site";
import { TavLabel } from "../TavLabel";
import { Title } from "../service/Band";
import { Icon } from "../Icon";
import { TrackedLink } from "../TrackedLink";

const GROUPS: { id: CatalogGroup; intro: string; cover: string }[] = [
  { id: "superfici", intro: "Pietra, mattoni, legno e metallo: il metodo si sceglie dopo una prova.", cover: "sabbiatura" },
  { id: "restauro", intro: "Dagli oggetti agli edifici storici: lavori diversi, professionisti diversi.", cover: "restauro" },
  { id: "spazi", intro: "Cambiare casa, liberare spazi, curare il verde.", cover: "traslochi" },
];

/**
 * Altri servizi in home: un indice in tre gruppi invece di nove schede in fila.
 * Finché sono in preparazione lo diciamo chiaramente: nessuna disponibilità promessa.
 */
export function SpecialistServices() {
  const pending = specialistPages.some(isPendingService);
  return (
    <section id="altri-servizi" aria-labelledby="spec-title" className="g-travertino seam-ruler cv-auto scroll-mt-16 relative py-16 lg:py-28">
      <div className="wrap">
        <TavLabel n="02·S" label="Altri servizi" />
        <Title id="spec-title" className="t-h2 mt-4 max-w-4xl" text="Oltre la ristrutturazione: *altri servizi* per casa ed edifici." />
        <p data-reveal className="t-lead mt-4 max-w-2xl text-ink-soft">
          Pulizia delle superfici, restauro e conservazione, traslochi, sgomberi e verde. Stesso metodo: ci descrivi il lavoro e cerchiamo chi lo fa per mestiere.
        </p>
        {pending && (
          <p className="t-label mt-5 text-clay-dark">In preparazione · stiamo confermando specialità e zone dei professionisti</p>
        )}
      </div>
      <div className="wrap mt-10 grid-12 gap-y-14 lg:mt-14">
        {GROUPS.map((g, gi) => {
          const items = specialistPages.filter((s) => groupLabelOf(s.funnelService) === GROUP_LABELS[g.id]);
          const cover = specialistHeroMedia[g.cover];
          return (
            <div key={g.id} className="col-span-12 md:col-span-6 lg:col-span-4">
              {cover && (
                <div data-reveal={gi === 1 ? "panel" : "mask"} className="frame aspect-[16/10]">
                  <Image src={cover.src} alt={cover.alt} fill sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw" placeholder="blur" className="object-cover object-[50%_40%]" />
                </div>
              )}
              <h3 className="t-label mt-5 font-sans text-clay-dark">{GROUP_LABELS[g.id]}</h3>
              <p className="mt-2 text-ink-soft">{g.intro}</p>
              <ul className="mt-4 border-b border-stone">
                {items.map((s) => (
                  <li key={s.id} className="border-t border-stone">
                    <Link href={s.path} className="group grid min-h-12 grid-cols-[2.25rem_1fr_auto] items-baseline gap-x-2 py-2.5">
                      <span className="text-xs tabular-nums text-muted">S{specialistPages.indexOf(s) + 1}</span>
                      <span className="font-display text-[1.45rem] leading-tight group-hover:underline">{s.cardTitle}</span>
                      <Icon name="arrow" size={16} className="text-clay" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <div className="wrap mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
        <TrackedLink href="/preventivo/" event="cta_click" location="home_altri_servizi" className="ar-inline-cta text-clay-dark">
          <span>{CTA_LABEL}</span> <Icon name="arrow" size={18} />
        </TrackedLink>
        <p className="text-sm text-muted">Le tavole sono illustrazioni: non raffigurano lavori eseguiti tramite questo servizio.</p>
      </div>
    </section>
  );
}
