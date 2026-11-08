import type { Metadata } from "next";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { LeadWizard } from "@/components/LeadWizard";
import { Icon } from "@/components/Icon";

export const metadata: Metadata = pageMetadata({
  title: "Richiedi un preventivo per lavori in casa a Messina",
  description: "Descrivi il lavoro in pochi passaggi: inoltriamo la richiesta a professionisti locali. Gratis e senza impegno.",
  path: "/preventivo/",
  noindex: true, // pagina funzionale: non deve competere con le landing
});

export default async function PreventivoPage(props: PageProps<"/preventivo">) {
  const sp = await props.searchParams;
  const servizio = typeof sp.servizio === "string" ? sp.servizio : undefined;
  return (
    <div className="blueprint min-h-[70vh] border-b border-stone">
      <div className="container-page grid gap-8 py-8 sm:py-12 lg:grid-cols-[1fr_300px]">
        <div className="mx-auto w-full max-w-2xl lg:mx-0">
          <h1 className="text-3xl sm:text-4xl">Richiedi un preventivo</h1>
          <p className="mt-2 text-ink-soft">Bastano 2 minuti. Ti ricontattano professionisti di {site.city} e provincia.</p>
          <div className="mt-6">
            <LeadWizard initialService={servizio} turnstileSiteKey={site.turnstileSiteKey} />
          </div>
        </div>
        <aside className="space-y-4 text-sm lg:pt-24">
          {[
            { i: "check" as const, t: "Gratis e senza impegno", d: "Non paghi nulla e non sei obbligato ad accettare i preventivi." },
            { i: "users" as const, t: "Pochi professionisti", d: "Inoltriamo la richiesta solo a partner locali per quel servizio e quella zona." },
            { i: "shield" as const, t: "Dati riservati", d: "Foto e contatti sono visibili solo a noi e ai professionisti selezionati." },
            { i: "info" as const, t: "Non siamo un'impresa", d: "Ti mettiamo in contatto con imprese e artigiani indipendenti." },
          ].map((x) => (
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
