import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { ContentPage } from "@/components/ContentPage";
import { CtaBanner } from "@/components/CtaBanner";

const path = "/guide/costo-ristrutturazione-casa-messina/";
const title = "Quanto costa ristrutturare casa a Messina: le voci che fanno il prezzo";
const description = "Da cosa dipende il costo di una ristrutturazione a Messina, perché i prezzi al metro quadro online non bastano e come confrontare i preventivi.";
const updated = "2026-11-08";
export const metadata = pageMetadata({ title, description, path, ogType: "article" });

const faqs = [
  { q: "Quanto costa ristrutturare un appartamento a Messina?", a: "Non esiste un prezzo unico: il costo dipende soprattutto da metratura, impianti da rifare, stato dei massetti, finiture scelte, pratiche edilizie e accessibilità del cantiere. Un preventivo affidabile richiede un sopralluogo; diffida delle cifre al metro quadro date senza vedere l'immobile." },
  { q: "Perché i prezzi al metro quadro trovati online sono così diversi?", a: "Perché sommano lavori diversi: alcuni includono solo opere edili, altri anche impianti, infissi, pratiche e forniture. Lo stesso valore al metro quadro può descrivere ristrutturazioni completamente diverse." },
  { q: "Come confrontare due preventivi di ristrutturazione?", a: "Confronta voce per voce: quantità, materiali (marca e modello), cosa è escluso, IVA, oneri per pratiche e smaltimento, tempi e modalità di pagamento. Due totali simili possono nascondere contenuti molto diversi." },
];

export default function CostoGuide() {
  return (
    <>
      <ContentPage title={title} description={description} path={path} article={{ updated }} faqs={faqs}
        crumbs={[{ name: "Home", path: "/" }, { name: "Guide", path: "/guide/" }, { name: "Costo ristrutturazione", path }]}
        intro={<p><strong>In breve:</strong> il costo di una ristrutturazione dipende da 6–7 voci principali. Conoscerle ti permette di descrivere bene il lavoro e di confrontare preventivi davvero comparabili.</p>}>
        <h2>Perché non pubblichiamo un prezzo al metro quadro</h2>
        <p>
          Online si trovano forchette di prezzo molto ampie e spesso senza fonte. Un valore al metro quadro mette insieme
          lavori diversi (solo finiture oppure anche impianti, infissi e pratiche) e non tiene conto dello stato di partenza
          dell&apos;immobile. Preferiamo spiegarti le voci che determinano il costo reale: sono le stesse che un professionista
          valuterà al sopralluogo.
        </p>

        <h2>Le voci che fanno il prezzo</h2>
        <table>
          <thead><tr><th>Voce</th><th>Cosa la fa aumentare</th></tr></thead>
          <tbody>
            <tr><td>Demolizioni e smaltimento</td><td>Rimozione di pavimenti e rivestimenti, tramezzi da abbattere, piano alto senza ascensore</td></tr>
            <tr><td>Impianti</td><td>Rifacimento completo dell&apos;elettrico e dell&apos;idraulico, nuovo quadro, predisposizioni (clima, domotica)</td></tr>
            <tr><td>Massetti e sottofondi</td><td>Massetti da rifare, dislivelli, impianti a pavimento</td></tr>
            <tr><td>Bagni e cucina</td><td>Spostamento di scarichi e attacchi, livello di sanitari e rubinetteria</td></tr>
            <tr><td>Finiture</td><td>Materiali e formati di pavimenti e rivestimenti, pitture speciali, controsoffitti con luci</td></tr>
            <tr><td>Infissi e porte</td><td>Sostituzione delle finestre, porte su misura</td></tr>
            <tr><td>Pratiche e tecnici</td><td>CILA o SCIA, direzione lavori, aggiornamento catastale</td></tr>
            <tr><td>Logistica del cantiere</td><td>ZTL, occupazione di suolo pubblico, ponteggi, orari condominiali</td></tr>
          </tbody>
        </table>

        <h2>Cosa incide in modo particolare a Messina</h2>
        <ul>
          <li>Molti edifici sono stati costruiti o ricostruiti nel Novecento dopo il terremoto del 1908: impianti e solai vanno verificati prima di progettare.</li>
          <li>La città è in un&apos;area ad alta pericolosità sismica: qualsiasi intervento su strutture portanti richiede un tecnico abilitato e la pratica adeguata.</li>
          <li>Negli immobili vicini al mare salsedine e umidità impongono materiali adatti per infissi, ringhiere e intonaci.</li>
          <li>In centro la logistica (accesso dei mezzi, suolo pubblico) può pesare sul costo e sui tempi.</li>
        </ul>

        <h2>Come ottenere preventivi confrontabili</h2>
        <ol>
          <li>Descrivi il lavoro nello stesso modo a tutti (metratura, ambienti, cosa rifare), meglio con foto e piantina.</li>
          <li>Chiedi un computo voce per voce, con quantità e materiali specificati.</li>
          <li>Fatti indicare cosa è escluso: pratiche, smaltimento, forniture, pulizie, IVA.</li>
          <li>Chiedi un cronoprogramma e le modalità di pagamento legate agli stati di avanzamento.</li>
          <li>Verifica i documenti dell&apos;impresa (visura camerale, DURC) e, per gli impianti, la dichiarazione di conformità a fine lavori.</li>
        </ol>

        <h2>Bonus fiscali</h2>
        <p>
          Una parte della spesa può essere detraibile se l&apos;intervento rientra tra quelli agevolati. Vedi la guida{" "}
          <Link href="/guide/bonus-ristrutturazione-2026/">bonus ristrutturazione 2026</Link>.
        </p>

        <h2>Domande frequenti</h2>
        {faqs.map((f) => (
          <div key={f.q}>
            <h3>{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}
      </ContentPage>
      <div className="container-page"><CtaBanner location="guide_costo" service="ristrutturazione-completa" title="Vuoi un preventivo basato su un sopralluogo?" /></div>
    </>
  );
}
