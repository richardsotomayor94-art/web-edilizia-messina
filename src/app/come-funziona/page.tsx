import Link from "next/link";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { ContentPage } from "@/components/ContentPage";
import { HowItWorks } from "@/components/HowItWorks";
import { CtaBanner } from "@/components/CtaBanner";

const title = "Come funziona: dalla richiesta al preventivo";
const description = "Descrivi il lavoro, verifichiamo la richiesta e la inoltriamo a un massimo di 3 professionisti locali. Gratis per chi chiede il preventivo.";
const path = "/come-funziona/";

export const metadata = pageMetadata({ title: "Come funziona: richiesta e preventivo", description, path });

const faqs = [
  { q: "Quante imprese mi contatteranno?", a: "Al massimo 3 professionisti per richiesta, selezionati per servizio e zona. Spesso meno, in base alla disponibilità." },
  { q: "Chi paga il servizio?", a: "Non tu. Il servizio è sostenuto dai professionisti partner, che possono riconoscerci un compenso per le richieste ricevute o per i lavori conclusi, secondo accordi commerciali con noi." },
  { q: "Con chi firmo il contratto per i lavori?", a: "Direttamente con l'impresa o l'artigiano che scegli. Noi non eseguiamo lavori e non siamo parte del contratto d'appalto." },
  { q: "Posso annullare la richiesta?", a: "Sì. Scrivici in qualsiasi momento e chiederemo ai professionisti di non contattarti più; puoi anche chiedere la cancellazione dei tuoi dati." },
];

export default function ComeFunzionaPage() {
  return (
    <>
      <ContentPage
        title={title}
        description={description}
        path={path}
        crumbs={[{ name: "Home", path: "/" }, { name: "Come funziona", path }]}
        intro={<p>{site.name} ti aiuta a trovare professionisti e imprese locali per il tuo progetto a {site.city}. Ecco esattamente cosa succede quando invii una richiesta.</p>}
        faqs={faqs}
      >
        <h2>I 4 passaggi</h2>
        <div className="not-prose">
          <HowItWorks compact />
        </div>

        <h2>1. Descrivi il lavoro</h2>
        <p>
          Il modulo guidato ti chiede il tipo di lavoro, l&apos;immobile, la metratura, le tempistiche, la zona e, se vuoi, un budget
          indicativo. Puoi allegare foto e planimetrie: sono conservate in uno spazio riservato, non pubblico.
        </p>
        <h2>2. Verifichiamo la richiesta</h2>
        <p>
          Controlliamo che la richiesta sia completa e realistica e filtriamo invii automatici o duplicati. Se manca qualcosa
          di importante potremmo contattarti per un chiarimento.
        </p>
        <h2>3. Inoltro a professionisti locali</h2>
        <p>
          Individuiamo fino a 3 imprese o artigiani partner che coprono quel servizio e quella zona e inoltriamo loro la
          richiesta, come previsto dall&apos;<Link href="/privacy/">informativa privacy</Link>. Se in zona non abbiamo
          professionisti disponibili te lo diciamo.
        </p>
        <h2>4. Sopralluogo, preventivo e scelta</h2>
        <p>
          I professionisti disponibili ti contattano per fissare un sopralluogo e consegnarti un preventivo scritto. Sei libero di
          confrontare, negoziare e scegliere, oppure di non accettare nessuna proposta.
        </p>

        <h2>Come ci sosteniamo</h2>
        <p>
          Per chi chiede un preventivo il servizio è gratuito. Il servizio è sostenuto dai professionisti partner, ad
          esempio con un compenso per ogni richiesta ricevuta, una percentuale sui lavori conclusi o un canone per una zona.
          Questo non cambia il prezzo che concordi con il professionista e non ti obbliga a nulla.
        </p>
        <p>
          Vuoi sapere come scegliamo i partner? Leggi <Link href="/come-selezioniamo-i-professionisti/">come selezioniamo i professionisti</Link>.
        </p>

        <h2>Domande frequenti</h2>
        <ul>
          {faqs.map((f) => (
            <li key={f.q}>
              <strong>{f.q}</strong> {f.a}
            </li>
          ))}
        </ul>
      </ContentPage>
      <div className="container-page">
        <CtaBanner location="come_funziona" />
      </div>
    </>
  );
}
