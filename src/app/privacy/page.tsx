import Link from "next/link";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { ContentPage } from "@/components/ContentPage";

const path = "/privacy/";
const description = `Informativa sul trattamento dei dati personali di ${site.name} (art. 13 GDPR).`;
export const metadata = pageMetadata({ title: "Informativa privacy", description, path, noindex: true });

const Flag = () => <span className="legal-flag">[REVISIONE LEGALE RICHIESTA]</span>;

export default function PrivacyPage() {
  const owner = site.legal.ownerName ?? "[TITOLARE DA INSERIRE: ragione sociale]";
  const vat = site.legal.vatNumber ?? "[P.IVA DA INSERIRE]";
  const addr = site.legal.address ?? "[SEDE LEGALE DA INSERIRE]";
  const mail = site.contact.privacyEmail ?? "[EMAIL PRIVACY DA INSERIRE]";
  return (
    <ContentPage
      title="Informativa privacy"
      description={description}
      path={path}
      crumbs={[{ name: "Home", path: "/" }, { name: "Privacy", path }]}
      intro={
        <p>
          <Flag /> Bozza tecnica del {new Date(site.privacyVersion.slice(0, 10)).toLocaleDateString("it-IT")} (versione{" "}
          {site.privacyVersion}). Va validata da un legale o DPO prima del lancio commerciale.
        </p>
      }
    >
      <h2>1. Titolare del trattamento</h2>
      <p>
        {owner}, P.IVA {vat}, {addr}. Contatto per la privacy: {mail}.
      </p>

      <h2>2. Che cosa facciamo</h2>
      <p>
        {site.name} raccoglie richieste di preventivo per lavori edili e le inoltra a imprese e professionisti partner
        indipendenti. Non eseguiamo direttamente i lavori.
      </p>

      <h2>3. Quali dati trattiamo</h2>
      <ul>
        <li><strong>Dati della richiesta</strong>: tipo di lavoro, immobile, metratura, tempistiche, budget indicativo (facoltativo), comune, CAP e zona, descrizione, eventuali foto e planimetrie.</li>
        <li><strong>Dati di contatto</strong>: nome, telefono, eventuale numero WhatsApp ed email, canale preferito.</li>
        <li><strong>Dati tecnici</strong>: pagina di provenienza, parametri della campagna (UTM, gclid), browser, impronta crittografica (hash) dell&apos;indirizzo IP usata solo per prevenire abusi; non conserviamo l&apos;IP in chiaro.</li>
        <li><strong>Prova del consenso</strong>: data e versione dell&apos;informativa accettata.</li>
      </ul>
      <p>Ti chiediamo di non inserire nella descrizione dati sanitari o altri dati particolari: non sono necessari.</p>

      <h2>4. Finalità e basi giuridiche</h2>
      <table>
        <thead>
          <tr><th>Finalità</th><th>Base giuridica</th><th>Conservazione</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>Gestire la tua richiesta e inoltrarla fino a 3 professionisti partner per servizio e zona, perché ti contattino per sopralluogo e preventivo</td>
            <td>Esecuzione di misure precontrattuali adottate su tua richiesta (art. 6.1.b GDPR) <Flag /></td>
            <td>24 mesi dalla richiesta, poi cancellazione <Flag /></td>
          </tr>
          <tr>
            <td>Sicurezza, prevenzione di spam e abusi, statistiche interne aggregate sui risultati del servizio</td>
            <td>Legittimo interesse (art. 6.1.f)</td>
            <td>Hash IP per il rate limit: 48 ore; dati della richiesta: come sopra</td>
          </tr>
          <tr>
            <td>Comunicazioni informative e promozionali sui nostri servizi</td>
            <td>Consenso facoltativo e separato (art. 6.1.a), revocabile in ogni momento</td>
            <td>Fino alla revoca, con verifica periodica <Flag /></td>
          </tr>
          <tr>
            <td>Adempimenti di legge e difesa di diritti</td>
            <td>Obbligo legale / legittimo interesse</td>
            <td>Per il tempo previsto dalla legge</td>
          </tr>
        </tbody>
      </table>
      <p>Non cediamo i tuoi dati a terzi per finalità di marketing proprie dei terzi.</p>

      <h2>5. A chi comunichiamo i dati</h2>
      <ul>
        <li>
          <strong>Professionisti partner</strong> (imprese edili, artigiani, impiantisti) a cui inoltriamo la richiesta: agiscono
          come <strong>titolari autonomi</strong> per il contatto, il sopralluogo e l&apos;eventuale contratto, e ti forniranno la
          propria informativa. Si impegnano per contratto a usare i dati solo per la tua richiesta. <Flag />
        </li>
        <li>
          <strong>Fornitori tecnici</strong> che trattano dati per nostro conto come responsabili (art. 28): hosting del sito
          (Vercel Inc.), database e archiviazione file (Supabase, server nell&apos;Unione Europea – Francoforte), servizi di
          notifica interna (es. Telegram) se attivati, Google Analytics solo se presti il consenso ai cookie statistici.
        </li>
      </ul>

      <h2>6. Trasferimenti fuori dall&apos;UE</h2>
      <p>
        Alcuni fornitori hanno sede negli Stati Uniti. I trasferimenti avvengono sulla base della decisione di adeguatezza UE-USA
        (Data Privacy Framework) per le società certificate o di clausole contrattuali standard. <Flag />
      </p>

      <h2>7. Foto e planimetrie</h2>
      <p>
        I file sono conservati in un archivio privato, non accessibile pubblicamente; sono visibili solo allo staff autorizzato
        e ai professionisti a cui inoltriamo la richiesta, tramite collegamenti temporanei. Le foto vengono ricompresse dal tuo
        browser e i metadati di posizione (EXIF/GPS) vengono rimossi quando possibile.
      </p>

      <h2>8. I tuoi diritti</h2>
      <p>
        Puoi chiedere accesso, rettifica, cancellazione, limitazione, portabilità, opporti al trattamento basato sul legittimo
        interesse e revocare in qualsiasi momento il consenso al marketing (artt. 15-22 GDPR), scrivendo a {mail}. Hai diritto
        di proporre reclamo al Garante per la protezione dei dati personali (www.garanteprivacy.it).
      </p>

      <h2>9. Obbligatorietà dei dati</h2>
      <p>
        Nome, telefono, comune e informazioni sul lavoro sono necessari per gestire la richiesta; gli altri campi sono
        facoltativi. Il consenso al marketing è facoltativo e non influisce sulla gestione della richiesta.
      </p>

      <h2>10. Cookie</h2>
      <p>Vedi la <Link href="/cookie/">cookie policy</Link>.</p>
    </ContentPage>
  );
}
