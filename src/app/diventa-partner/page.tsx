import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { ContentPage } from "@/components/ContentPage";
import { PartnerForm } from "@/components/PartnerForm";

const path = "/diventa-partner/";
const title = "Imprese e artigiani: ricevi richieste di lavoro a Messina";
const description = "Sei un'impresa edile, un artigiano o un impiantista di Messina? Candidati per ricevere richieste di preventivo qualificate nella tua zona.";
export const metadata = pageMetadata({ title: "Imprese e artigiani: diventa partner", description, path });

export default function PartnerPage() {
  return (
    <ContentPage title={title} description={description} path={path} crumbs={[{ name: "Home", path: "/" }, { name: "Diventa partner", path }]}
      intro={<p>La rete di professionisti è in costruzione. Se lavori a {site.city} o in provincia, puoi lasciarci i tuoi dati per essere ricontattato quando il servizio sarà attivo.</p>}>
      <h2>Come funzionerà</h2>
      <ul>
        <li>Richieste filtrate per servizio e zona che dichiari di coprire.</li>
        <li>Informazioni utili prima della chiamata: tipo di lavoro, metratura, tempistica, budget indicativo, foto.</li>
        <li>Al massimo 3 professionisti per richiesta: niente aste al ribasso tra decine di imprese.</li>
      </ul>
      <h2>Cosa chiediamo</h2>
      <ul>
        <li>Visura camerale, regolarità contributiva e, per gli impianti, abilitazione DM 37/2008.</li>
        <li>Risposta rapida ai clienti e sopralluoghi puntuali.</li>
        <li>Uso dei dati del cliente solo per quella richiesta.</li>
      </ul>
      <p>
        Oggi non sono attive condizioni economiche né collaborazioni. Sopralluoghi, preventivi, contratti, esecuzione, fatture e
        garanzie restano sempre del professionista che svolge il lavoro.
      </p>
      <h2>Candidati</h2>
      {site.demoMode && <p><strong>Versione dimostrativa:</strong> la candidatura non viene inviata né salvata. Non inserire dati reali.</p>}
      <div className="not-prose">
        <PartnerForm />
      </div>
    </ContentPage>
  );
}
