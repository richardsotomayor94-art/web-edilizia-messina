import Link from "next/link";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { ContentPage } from "@/components/ContentPage";

const path = "/termini/";
const description = `Termini e condizioni d'uso del servizio ${site.name}.`;
export const metadata = pageMetadata({ title: "Termini del servizio", description, path, noindex: true });

export default function TerminiPage() {
  const owner = site.legal.ownerName ?? "Il titolare del servizio";
  const identity = [owner, site.legal.vatNumber && `P.IVA ${site.legal.vatNumber}`, site.legal.address].filter(Boolean).join(", ");
  return (
    <ContentPage plain title="Termini del servizio" description={description} path={path} crumbs={[{ name: "Home", path: "/" }, { name: "Termini", path }]}
      intro={<p>Documento in fase di revisione: la versione definitiva sarà pubblicata prima dell&apos;attivazione del servizio.</p>}>
      <h2>1. Il servizio</h2>
      <p>
        {site.name} offre un servizio gratuito per gli utenti che consente di descrivere un lavoro edile e di essere messi in
        contatto con un&apos;impresa partner indipendente, specializzata nel lavoro richiesto, che opera a Messina e provincia.
        {site.name} non vende lavori né prodotti, non esegue lavori, non emette fatture per i lavori, non è parte dei contratti
        tra utente e impresa e non riceve pagamenti dagli utenti: il preventivo, l&apos;esecuzione e la fatturazione spettano
        solo all&apos;impresa. Il servizio riguarda immobili situati a Messina e provincia.
      </p>
      <h2>2. Chi offre il servizio</h2>
      <p>
        {identity}. Non esiste una sede aperta al pubblico: il servizio si svolge solo online e per telefono. Per qualsiasi
        richiesta, compreso l&apos;esercizio dei diritti sui dati, puoi contattarci dalla pagina <Link href="/contatti/">Contatti</Link>.
      </p>
      <h2>3. Nessun obbligo</h2>
      <p>L&apos;invio di una richiesta non obbliga ad accettare alcun preventivo.</p>
      <h2>4. Responsabilità</h2>
      <p>
        Preventivi, prezzi, tempi, qualità dell&apos;esecuzione, garanzie e pratiche edilizie sono di responsabilità dell&apos;impresa che prende in carico la richiesta. Selezioniamo i partner secondo i criteri descritti in{" "}
        <Link href="/come-selezioniamo-i-professionisti/">Come selezioniamo i professionisti</Link>, senza garantirne
        l&apos;operato. Eventuali reclami sul lavoro vanno rivolti all&apos;impresa che lo ha eseguito.
      </p>
      <h2>5. Contenuti informativi</h2>
      <p>
        Guide e pagine informative hanno carattere generale e non costituiscono consulenza tecnica, legale o fiscale. Per
        permessi e detrazioni rivolgiti a un tecnico abilitato e al tuo commercialista.
      </p>
      <h2>6. Uso corretto</h2>
      <p>È vietato inviare richieste false, per conto di terzi senza autorizzazione o con dati altrui.</p>
      <h2>7. Costi per l&apos;utente e rapporto con le imprese</h2>
      <p>
        L&apos;invio di una richiesta è gratuito per l&apos;utente. Eventuali accordi economici tra il titolare del servizio e
        le imprese partner sono separati dal rapporto con te e non comportano alcun costo per l&apos;utente: il prezzo dei
        lavori lo stabilisce solo l&apos;impresa nel proprio preventivo.
      </p>
      <h2>8. Dati personali</h2>
      <p>
        Come trattiamo i tuoi dati è spiegato nell&apos;<Link href="/privacy/">informativa privacy</Link>, in particolare a
        quali imprese li trasmettiamo.
      </p>
      <h2>9. Consumatori</h2>
      <p>
        Restano ferme le tutele inderogabili che la legge riconosce ai consumatori nel paese di residenza, compresa la
        competenza del giudice del luogo di residenza o domicilio del consumatore.
      </p>
      <h2>10. Modifiche</h2>
      <p>Possiamo aggiornare questi termini; la versione in vigore è sempre quella pubblicata su questa pagina.</p>
    </ContentPage>
  );
}
