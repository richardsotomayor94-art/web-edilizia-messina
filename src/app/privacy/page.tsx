import Link from "next/link";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { ContentPage } from "@/components/ContentPage";

const path = "/privacy/";
const description = `Informativa sul trattamento dei dati personali di ${site.name} (art. 13 GDPR).`;
export const metadata = pageMetadata({ title: "Informativa privacy", description, path, noindex: true });

export default function PrivacyPage() {
  const owner = site.legal.ownerName ?? "Il titolare del servizio";
  const identity = [owner, site.legal.vatNumber && `P.IVA ${site.legal.vatNumber}`, site.legal.address].filter(Boolean).join(", ");
  const mail = site.contact.privacyEmail ?? "il modulo di richiesta presente su questo sito";
  return (
    <ContentPage plain
      title="Informativa privacy"
      description={description}
      path={path}
      crumbs={[{ name: "Home", path: "/" }, { name: "Privacy", path }]}
      intro={
        <p>
          Versione del {new Date(site.privacyVersion.slice(0, 10)).toLocaleDateString("it-IT")}, in fase di revisione: la versione definitiva sarà pubblicata prima dell&apos;attivazione del servizio.
        </p>
      }
    >
      <p>
        Il sito fa una cosa sola: raccoglie la tua richiesta per poterti ricontattare e far preparare il preventivo. Niente
        vendita di dati, niente marketing, niente cessione a terzi, nessuna profilazione.
      </p>

      <h2>1. Titolare del trattamento</h2>
      <p>
        {identity}. Per le richieste sulla privacy puoi scrivere a {mail}.
      </p>

      <h2>2. Quali dati raccogliamo</h2>
      <ul>
        <li><strong>La richiesta</strong>: tipo di lavoro, immobile, metratura, tempistiche, budget indicativo (facoltativo), comune, CAP e zona, descrizione, eventuali foto e planimetrie.</li>
        <li><strong>I tuoi contatti</strong>: nome, telefono, eventuale numero WhatsApp ed email, canale preferito.</li>
        <li><strong>Dati tecnici</strong>: pagina di provenienza, parametri della campagna (UTM, gclid), browser e un&apos;impronta crittografica (hash) dell&apos;indirizzo IP, usata solo per bloccare spam e abusi; l&apos;IP in chiaro non viene conservato.</li>
        <li><strong>Prova dell&apos;invio</strong>: data e versione dell&apos;informativa accettata.</li>
      </ul>
      <p>Ti chiediamo di non inserire nella descrizione dati sanitari o altri dati particolari: non servono.</p>

      <h2>3. Perché raccogliamo i tuoi dati</h2>
      <p>
        Solo per ricontattarti riguardo alla richiesta che hai inviato e per permettere all&apos;impresa di prepararti un
        preventivo con un&apos;idea chiara di ciò che ti serve.
      </p>
      <p>
        <strong>Base giuridica</strong>: la tua richiesta (misure precontrattuali, art. 6.1.b GDPR) e il consenso che dai
        inviando il modulo (art. 6.1.a). I dati tecnici servono a proteggere il modulo da spam e abusi, sulla base del nostro
        legittimo interesse (art. 6.1.f).
      </p>

      <h2>4. Chi li riceve</h2>
      <ul>
        <li>
          <strong>Il nostro collaboratore sul territorio di Messina</strong>, che gestisce le richieste e ti ricontatta.
        </li>
        <li>
          <strong>L&apos;impresa che prende in carico il lavoro</strong>, che li usa come <strong>titolare autonomo</strong> per
          il sopralluogo e il preventivo, e ti fornirà la propria informativa.
        </li>
      </ul>
      <p>Nessun altro: non vendiamo, non cediamo e non usiamo i tuoi dati per pubblicità.</p>
      <p>
        Per far funzionare il sito ci appoggiamo a fornitori tecnici che conservano i dati per nostro conto, come responsabili
        del trattamento (art. 28), senza poterli usare per scopi propri: hosting del sito (Vercel Inc.), database e archivio
        file (Supabase, server nell&apos;Unione Europea, Francoforte), notifiche interne (es. Telegram) se attivate e Google
        Analytics solo se accetti i cookie statistici.
      </p>

      <h2>5. Per quanto tempo</h2>
      <p>
        Fino alla chiusura della richiesta e comunque non oltre 12 mesi; poi vengono cancellati. Puoi chiederne la
        cancellazione in qualsiasi momento scrivendo a {mail}. L&apos;hash dell&apos;IP usato contro lo spam si cancella dopo
        48 ore. Restano solo i dati che la legge ci obbliga a conservare, per il tempo previsto.
      </p>

      <h2>6. Foto e planimetrie</h2>
      <p>
        I file sono conservati in un archivio privato, non accessibile pubblicamente: li vedono solo il nostro collaboratore e
        l&apos;impresa che prende in carico la richiesta, tramite collegamenti temporanei. Il tuo browser ricomprime le foto e
        toglie i dati di posizione (EXIF/GPS); le immagini che non riesce a elaborare non vengono caricate.
      </p>

      <h2>7. Trasferimenti fuori dall&apos;UE</h2>
      <p>
        Alcuni fornitori tecnici hanno sede negli Stati Uniti. I trasferimenti avvengono sulla base della decisione di
        adeguatezza UE-USA (Data Privacy Framework) per le società certificate o di clausole contrattuali standard.
      </p>

      <h2>8. I tuoi diritti</h2>
      <p>
        Puoi chiedere accesso, rettifica, cancellazione, limitazione e portabilità dei dati, opporti al trattamento basato sul
        legittimo interesse e revocare il consenso in qualsiasi momento (artt. 15-22 GDPR), scrivendo a {mail}. La revoca non
        rende illecito quanto fatto prima. Puoi anche presentare reclamo al Garante per la protezione dei dati personali
        (www.garanteprivacy.it).
      </p>

      <h2>9. Dati obbligatori</h2>
      <p>
        Nome, telefono, comune e informazioni sul lavoro servono per gestire la richiesta: senza, non possiamo ricontattarti.
        Gli altri campi sono facoltativi.
      </p>

      <h2>10. Cookie</h2>
      <p>Vedi la <Link href="/cookie/">cookie policy</Link>.</p>
    </ContentPage>
  );
}
