import type { Metadata } from "next";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { LeadWizard } from "@/components/LeadWizard";
import { Icon } from "@/components/Icon";

export const metadata: Metadata = pageMetadata({
  title: "Richiedi un preventivo a Messina",
  description: "Descrivi il lavoro in pochi passaggi: inoltriamo la richiesta a un massimo di 3 professionisti locali. Gratis e senza impegno.",
  path: "/preventivo/",
  noindex: true, // pagina funzionale: non deve competere con le landing
});

const reassurance = [
  { i: "check" as const, t: "Gratis e senza impegno", d: "Non paghi nulla e non sei obbligato ad accettare i preventivi." },
  { i: "users" as const, t: "Massimo 3 professionisti", d: `Solo per quel servizio e quella zona, a ${site.city} e provincia. Se in zona non ce ne sono, te lo diciamo.` },
  { i: "shield" as const, t: "Dati riservati", d: "Foto e contatti sono visibili solo a noi e ai professionisti a cui inoltriamo la richiesta." },
  { i: "info" as const, t: "Non siamo un'impresa", d: "Ti mettiamo in contatto con imprese e artigiani indipendenti: il contratto lo firmi con loro." },
];

export default async function PreventivoPage(props: PageProps<"/preventivo">) {
  const sp = await props.searchParams;
  const servizio = typeof sp.servizio === "string" ? sp.servizio : undefined;
  return (
    <div className="bg-sand/50 border-b border-stone">
      <div className="container-page grid gap-8 py-5 sm:py-10 lg:grid-cols-[1fr_300px]">
        <div className="mx-auto w-full max-w-2xl lg:mx-0">
          <h1 className="text-2xl sm:text-4xl">Richiedi un preventivo</h1>
          <p className="mt-1 text-ink-soft">Rispondi a poche domande, ci vogliono un paio di minuti.</p>
          <div className="mt-4">
            <LeadWizard initialService={servizio} turnstileSiteKey={site.turnstileSiteKey} />
          </div>
        </div>
        <aside aria-label="Cosa aspettarti" className="mx-auto w-full max-w-2xl space-y-4 text-sm lg:mx-0 lg:pt-20">
          {reassurance.map((x) => (
            <div key={x.t} className="flex gap-3">
              <Icon name={x.i} className="mt-0.5 shrink-0 text-sea" />
              <div>
                <p className="font-semibold">{x.t}</p>
                <p className="text-muted">{x.d}</p>
              </div>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}
