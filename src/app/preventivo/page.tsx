import Image from "next/image";
import type { Metadata } from "next";
import { site } from "@/config/site";
import { media } from "@/config/media";
import { pageMetadata } from "@/lib/seo";
import { LeadWizard } from "@/components/LeadWizard";

export const metadata: Metadata = pageMetadata({
  title: "Richiedi un preventivo a Messina",
  description: "Descrivi il lavoro in pochi passaggi: inoltriamo la richiesta a un massimo di 3 professionisti locali. Gratis e senza impegno.",
  path: "/preventivo/",
  noindex: true, // pagina funzionale: non deve competere con le landing
});

const reassurance = [
  { t: "Gratis e senza impegno", d: "Non paghi nulla e non sei obbligato ad accettare i preventivi." },
  { t: "Massimo 3 professionisti", d: `Solo per quel servizio e quella zona, a ${site.city} e provincia. Se in zona non ce ne sono, te lo diciamo.` },
  { t: "Dati riservati", d: "Foto e contatti sono visibili solo a noi e ai professionisti a cui inoltriamo la richiesta." },
  { t: "Non siamo un'impresa", d: "Ti mettiamo in contatto con imprese e artigiani indipendenti: il contratto lo firmi con loro." },
];

export default async function PreventivoPage(props: PageProps<"/preventivo">) {
  const sp = await props.searchParams;
  const servizio = typeof sp.servizio === "string" ? sp.servizio : undefined;
  return (
    <div className="grid lg:min-h-[calc(100svh-4.25rem)] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <aside aria-label="Cosa aspettarti" className="on-dark relative isolate order-last overflow-hidden bg-ink p-6 text-paper lg:order-first lg:flex lg:flex-col lg:justify-end lg:p-14">
        <div className="absolute inset-0 -z-10 hidden lg:block">
          <Image src={media.progetto.src} alt="" fill sizes="100vw" className="object-cover opacity-35" />
        </div>
        <p className="hidden font-display text-[clamp(3rem,5vw,5rem)] leading-[0.98] tracking-[-0.02em] lg:block">
          Il tuo progetto, <em>una volta sola</em>.
        </p>
        <dl className="grid gap-4 sm:grid-cols-2 lg:mt-10">
          {reassurance.map((x) => (
            <div key={x.t} className="border-t border-paper/25 pt-2.5">
              <dt className="font-semibold">{x.t}</dt>
              <dd className="mt-0.5 text-sm text-paper/75">{x.d}</dd>
            </div>
          ))}
        </dl>
      </aside>
      <div className="bg-sand/60 lg:px-[clamp(2rem,5vw,6rem)] lg:py-12">
        <div className="mx-auto w-full max-w-2xl px-4 pb-8 pt-5 lg:p-0">
          <h1 className="t-h1 !text-[clamp(2.4rem,4vw,3.5rem)]">Richiedi un preventivo</h1>
          <p className="mt-1 text-ink-soft">Rispondi a poche domande, ci vogliono un paio di minuti.</p>
          <div className="mt-4">
            <LeadWizard initialService={servizio} turnstileSiteKey={site.turnstileSiteKey} demo={site.demoMode} />
          </div>
        </div>
      </div>
    </div>
  );
}
