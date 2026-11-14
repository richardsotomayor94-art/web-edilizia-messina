import Link from "next/link";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { ContentPage } from "@/components/ContentPage";

const description = `${site.name} è un servizio che aiuta chi vive a Messina a trovare imprese e artigiani per ristrutturazioni e lavori in casa. Non siamo un'impresa edile.`;
const path = "/chi-siamo/";

export const metadata = pageMetadata({ title: "Chi siamo: preventivi per la casa a Messina", description, path });

export default function ChiSiamoPage() {
  return (
    <ContentPage
      title={`Chi è ${site.name}`}
      description={description}
      path={path}
      pageType="AboutPage"
      crumbs={[{ name: "Home", path: "/" }, { name: "Chi siamo", path }]}
      intro={<p>Un servizio dedicato a {site.city}, con un obiettivo semplice: rendere più facile trovare il professionista giusto per i lavori in casa.</p>}
    >
      <h2>Cosa facciamo</h2>
      <p>
        Siamo un servizio di contatto tra chi ha bisogno di un lavoro in casa e imprese locali specializzate, a {site.serviceArea}.
        Gratuito per te, senza registrazione, senza impegno. Ci racconti il lavoro e ti mettiamo in comunicazione con un&apos;impresa
        che fa proprio quel tipo di intervento.
      </p>
      <p>
        Se per quel settore non abbiamo ancora un&apos;impresa, la cerchiamo noi: un nostro collaboratore sul territorio individua
        un&apos;impresa di quel settore. Se non la troviamo, te lo diciamo chiaramente.
      </p>
      <h2>Cosa non facciamo</h2>
      <ul>
        <li>Non siamo un&apos;impresa edile, uno studio tecnico o un servizio ufficiale di alcun marchio.</li>
        <li>Non eseguiamo lavori, non facciamo preventivi e non fissiamo prezzi: lo fa l&apos;impresa che ti contatta, con la sua partita IVA, la sua fattura e la sua garanzia.</li>
        <li>Non firmiamo contratti d&apos;appalto al posto tuo e non incassiamo pagamenti per i lavori.</li>
        <li>Non vendiamo i tuoi dati a terzi per pubblicità.</li>
        <li>Non pubblichiamo recensioni, numeri o lavori che non possiamo dimostrare.</li>
      </ul>
      <h2>Perché trasparenza</h2>
      <p>
        Molti portali di preventivi non spiegano chiaramente chi riceve i tuoi dati e quante imprese ti chiameranno. Noi lo
        diciamo prima dell&apos;invio: una sola impresa, specializzata nel tuo lavoro, solo per la tua richiesta. Trovi tutti i dettagli in{" "}
        <Link href="/come-funziona/">Come funziona</Link> e nell&apos;<Link href="/privacy/">informativa privacy</Link>.
      </p>
      <h2>Come scriviamo le guide</h2>
      <p>
        Le <Link href="/guide/">guide</Link> e le pagine dei lavori sono curate dalla redazione di {site.name}. Per bonus,
        pratiche edilizie e impianti partiamo dai testi ufficiali (leggi, decreti, Agenzia delle Entrate, Regione Siciliana) e
        li citiamo nella pagina stessa; ogni guida e ogni pagina dei lavori riporta la data dell&apos;ultimo aggiornamento. Non pubblichiamo prezzi al metro quadro
        né cifre che non possiamo verificare: spieghiamo da cosa dipende il costo. Le informazioni sono generali e non
        sostituiscono il parere di un tecnico abilitato.
      </p>
      {site.legal.ownerName && (
        <>
          <h2>Dati societari</h2>
          <p>
            {site.legal.ownerName}
            {site.legal.vatNumber ? ` – P.IVA ${site.legal.vatNumber}` : ""}
            {site.legal.address ? ` – ${site.legal.address}` : ""}
          </p>
        </>
      )}
    </ContentPage>
  );
}
