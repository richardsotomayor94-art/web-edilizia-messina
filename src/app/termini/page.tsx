import Link from "next/link";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { ContentPage } from "@/components/ContentPage";

const path = "/termini/";
const description = `Termini e condizioni d'uso del servizio ${site.name}.`;
export const metadata = pageMetadata({ title: "Termini del servizio", description, path, noindex: true });

export default function TerminiPage() {
  return (
    <ContentPage title="Termini del servizio" description={description} path={path} crumbs={[{ name: "Home", path: "/" }, { name: "Termini", path }]}
      intro={<p>Documento in fase di revisione: la versione definitiva sarà pubblicata prima dell&apos;attivazione del servizio.</p>}>
      <h2>1. Il servizio</h2>
      <p>
        {site.name} offre un servizio gratuito per gli utenti che consente di descrivere un lavoro edile e di essere messi in
        contatto con imprese e professionisti partner indipendenti. {site.name} non esegue lavori, non è parte dei contratti
        tra utente e professionista e non riceve pagamenti dagli utenti.
      </p>
      <h2>2. Nessun obbligo</h2>
      <p>L&apos;invio di una richiesta non obbliga ad accettare alcun preventivo.</p>
      <h2>3. Responsabilità</h2>
      <p>
        Preventivi, prezzi, tempi, qualità dell&apos;esecuzione, garanzie e pratiche edilizie sono di responsabilità del
        professionista scelto dall&apos;utente. Selezioniamo i partner secondo i criteri descritti in{" "}
        <Link href="/come-selezioniamo-i-professionisti/">Come selezioniamo i professionisti</Link>, senza garantirne
        l&apos;operato.
      </p>
      <h2>4. Contenuti informativi</h2>
      <p>
        Guide e pagine informative hanno carattere generale e non costituiscono consulenza tecnica, legale o fiscale. Per
        permessi e detrazioni rivolgiti a un tecnico abilitato e al tuo commercialista.
      </p>
      <h2>5. Uso corretto</h2>
      <p>È vietato inviare richieste false, per conto di terzi senza autorizzazione o con dati altrui.</p>
      <h2>6. Remunerazione</h2>
      <p>
        Il servizio è remunerato dai professionisti partner secondo accordi commerciali (ad esempio per richiesta ricevuta,
        percentuale su lavori conclusi o canone di zona).
      </p>
    </ContentPage>
  );
}
