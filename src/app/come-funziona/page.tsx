import Link from "next/link";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { ContentPage } from "@/components/ContentPage";
import { HowItWorks, STEP_COUNT } from "@/components/HowItWorks";
import { ConversionBlock } from "@/components/ConversionBlock";
import { media } from "@/config/media";

const title = "Come funziona: dalla richiesta al preventivo";
const description = "Ci racconti il lavoro e ti mettiamo in contatto con un'impresa locale specializzata, con partita IVA e fattura. Gratis e senza impegno.";
const path = "/come-funziona/";

export const metadata = pageMetadata({ title: "Come funziona: richiesta e preventivo", description, path });

const faqs = [
  { q: "Quante imprese mi contatteranno?", a: "Una: l'impresa specializzata in quel lavoro nella tua zona. Se per quel settore non ne abbiamo una, la cerchiamo noi; se non la troviamo, te lo diciamo chiaramente." },
  { q: "Serve un sopralluogo prima di un preventivo?", a: "Per un preventivo affidabile sì: solo vedendo l'immobile si valutano impianti, massetti, accessi e condizioni reali. Una cifra data senza sopralluogo è una stima. Lo fa l'impresa che ti contatta: chiedile prima se è gratuito." },
  { q: "Chi può fare un sopralluogo per una ristrutturazione a Messina?", a: "L'impresa o l'artigiano che dovrà eseguire i lavori. Se servono pratiche edilizie o interventi sulle strutture, serve anche un tecnico abilitato. MessinaCasa360 non fa sopralluoghi: ti mette in contatto con l'impresa." },
  { q: "Devo pagare per inviare una richiesta?", a: "No. Inviare una richiesta è gratuito e senza impegno. Paghi solo il lavoro all'impresa, se accetti il suo preventivo." },
  { q: "Con chi firmo il contratto per i lavori?", a: "Direttamente con l'impresa che ti contatta. Noi non eseguiamo lavori e non siamo parte del contratto d'appalto." },
  { q: "Posso annullare la richiesta?", a: "Sì. Scrivici in qualsiasi momento e chiederemo all'impresa di non contattarti più; puoi anche chiedere la cancellazione dei tuoi dati." },
];

export default function ComeFunzionaPage() {
  return (
    <>
      <ContentPage
        unnumbered
        title={title}
        description={description}
        path={path}
        crumbs={[{ name: "Home", path: "/" }, { name: "Come funziona", path }]}
        intro={<p>{site.name} è un servizio di contatto gratuito tra chi ha bisogno di un lavoro in casa a {site.city} e imprese locali specializzate. Ecco cosa succede quando invii una richiesta.{site.demoMode && " Questa è una versione dimostrativa: le richieste non sono ancora attive."}</p>}
        faqs={faqs}
      >
        <h2>I {STEP_COUNT} passaggi</h2>
        <div className="not-prose">
          <HowItWorks compact />
        </div>

        <h2>1. Ci scrivi</h2>
        <p>
          Con il modulo ci dici che lavoro ti serve, dove e, se puoi, ci mandi una foto. Il modulo guidato ti chiede anche
          l&apos;immobile, la metratura e le tempistiche. Foto e planimetrie sono conservate in uno spazio riservato, non pubblico.
        </p>
        <h2>2. Cerchiamo l&apos;impresa giusta</h2>
        <p>
          Contattiamo un&apos;impresa che esegue proprio quel tipo di lavoro nella tua zona e le spieghiamo la tua richiesta, così
          quando ti chiama sa già di cosa si tratta. Inoltriamo i dati come previsto dall&apos;
          <Link href="/privacy/">informativa privacy</Link>. Se per quel settore non ne abbiamo una, la cerchiamo noi per te; se
          non la troviamo, te lo diciamo chiaramente.
        </p>
        <h2>3. Ti chiama l&apos;impresa</h2>
        <p>
          Fissa con te il sopralluogo, ti fa il preventivo e decidi tu se procedere, oppure di non accettare. Lavoro, fattura e
          garanzia sono suoi.
        </p>

        <h2>Chi fa cosa</h2>
        <p>
          Per te la richiesta è gratuita e non ti obbliga a nulla. {site.name} non esegue lavori, non fa preventivi e non fissa
          prezzi: sopralluogo, preventivo, contratto, esecuzione, fattura e garanzie sono dell&apos;impresa che ti contatta.
        </p>
        <p>
          Vuoi sapere con quali imprese lavoriamo? Leggi <Link href="/come-selezioniamo-i-professionisti/">come selezioniamo le imprese</Link>.
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
      <ConversionBlock location="come_funziona" title="Raccontaci il *lavoro*." img={media.ombra} />
    </>
  );
}
