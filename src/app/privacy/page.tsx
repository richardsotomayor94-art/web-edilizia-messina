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
  // Senza email pubblica si indicano i canali che il sito mostra davvero (modulo e WhatsApp nella pagina Contatti).
  const reach = site.contact.privacyEmail
    ? `scrivendo a ${site.contact.privacyEmail}`
    : "compilando il modulo di richiesta e indicando «Richiesta privacy» nella descrizione, oppure scrivendoci su WhatsApp al numero indicato nella pagina Contatti";
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
        vendita di dati, niente marketing, niente cessione a terzi, nessuna profilazione. La richiesta riceve un punteggio
        interno di priorità, calcolato solo sulle caratteristiche del lavoro; nessuna decisione viene presa in automatico.
      </p>

      <h2>1. Titolare del trattamento</h2>
      <p>
        {identity}. Il titolare è una persona fisica che opera dalla Spagna e offre il servizio a chi cerca imprese a Messina e
        provincia. Per le richieste sulla privacy puoi contattarci {reach}.
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
        {site.name} non vende lavori né prodotti: riceviamo la tua richiesta, cerchiamo un&apos;impresa indipendente
        specializzata nel lavoro che hai descritto e che opera a Messina e provincia, e le trasmettiamo la richiesta. È
        l&apos;impresa, non noi, a prepararti il preventivo, eseguire il lavoro e fatturarti.
      </p>
      <p>
        Usiamo i tuoi dati solo per ricontattarti riguardo alla richiesta che hai inviato e per permettere all&apos;impresa di
        prepararti un preventivo con un&apos;idea chiara di ciò che ti serve.
      </p>
      <p>
        <strong>Base giuridica</strong>: il servizio di contatto che ci chiedi (art. 6.1.b GDPR). La casella del modulo
        conferma la tua richiesta: non è un consenso separato. I dati tecnici servono a proteggere il modulo da spam e
        abusi, sulla base del nostro legittimo interesse (art. 6.1.f).
      </p>

      <h2>4. Chi li riceve</h2>
      <ul>
        <li>
          <strong>Il nostro rappresentante incaricato per Messina e provincia</strong>, persona autorizzata dal titolare al
          trattamento e tenuta a seguirne le istruzioni scritte, che gestisce le richieste, organizza i sopralluoghi e ti ricontatta.
        </li>
        <li>
          <strong>L&apos;impresa che prende in carico il lavoro</strong>, che li usa come <strong>titolare autonomo</strong> per
          il sopralluogo e il preventivo, e ti fornirà la propria informativa.
        </li>
      </ul>
      <p>Nessun altro li riceve per scopi propri: non vendiamo, non cediamo e non usiamo i tuoi dati per pubblicità.</p>
      <p>
        Per far funzionare il sito ci appoggiamo a fornitori tecnici che trattano i dati per nostro conto, come responsabili
        del trattamento (art. 28), senza poterli usare per scopi propri: hosting del sito (Vercel Inc.), database e archivio
        file (Supabase, server nell&apos;Unione Europea, Francoforte), Cloudflare (verifica anti-spam Turnstile, solo
        all&apos;ultimo passaggio del modulo) e Google Analytics solo se accetti i cookie statistici.
      </p>
      <p>
        Per avvisarci di una nuova richiesta usiamo un canale di notifica interno (messaggio o email), che riceve i dati
        essenziali della richiesta ed è letto solo dal titolare e dal rappresentante incaricato.
      </p>

      <h2>5. Per quanto tempo</h2>
      <p>
        Per 12 mesi dall&apos;invio; poi vengono cancellati automaticamente, foto comprese. Se la richiesta si chiude prima
        puoi chiederne subito la cancellazione, come in qualsiasi altro momento, {reach}. L&apos;impresa conserva
        i dati che riceve secondo la propria informativa. L&apos;hash dell&apos;IP usato contro lo spam si cancella dopo 48 ore.
        Restano solo i dati che la legge ci obbliga a conservare, per il tempo previsto.
      </p>

      <h2>6. Foto e planimetrie</h2>
      <p>
        I file sono conservati in un archivio privato, non accessibile pubblicamente: li vedono solo il titolare, il nostro
        collaboratore e l&apos;impresa che prende in carico la richiesta, tramite collegamenti temporanei. Il tuo browser ricomprime le foto e
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
        legittimo interesse (artt. 15-22 GDPR), {reach}, e revocare in qualsiasi momento il consenso ai cookie
        statistici dalla <Link href="/cookie/">cookie policy</Link>. Puoi anche presentare reclamo a un&apos;autorità di
        controllo: poiché il titolare opera dalla Spagna, l&apos;Agencia Española de Protección de Datos (www.aepd.es); se
        risiedi in Italia puoi rivolgerti anche al Garante per la protezione dei dati personali (www.garanteprivacy.it).
      </p>

      <h2>9. Dati obbligatori</h2>
      <p>
        Nome, telefono, comune e informazioni sul lavoro servono per gestire la richiesta: senza, non possiamo ricontattarti.
        Gli altri campi sono facoltativi. Il servizio è destinato a persone maggiorenni.
      </p>

      <h2>10. Cookie</h2>
      <p>Vedi la <Link href="/cookie/">cookie policy</Link>.</p>
    </ContentPage>
  );
}
