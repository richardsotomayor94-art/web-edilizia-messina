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
      intro={<p>Le richieste arrivano già qualificate: lavoro, immobile, metratura, tempi, zona e, quando disponibili, foto.</p>}>
      <h2>Cosa ricevi</h2>
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
        Le condizioni economiche (costo per richiesta, percentuale sui lavori conclusi o esclusiva di zona) vengono concordate
        individualmente e messe per iscritto prima dell&apos;attivazione.
      </p>
      <h2>Candidati</h2>
      <div className="not-prose">
        <PartnerForm />
      </div>
    </ContentPage>
  );
}
