import Link from "next/link";
import { guides } from "@/config/guides";
import { pageMetadata } from "@/lib/seo";
import { ContentPage } from "@/components/ContentPage";
import { ConversionBlock } from "@/components/ConversionBlock";
import { ProseBreak } from "@/components/ProseBreak";
import { media, serviceMedia } from "@/config/media";

const path = "/guide/come-scegliere-impresa-edile-messina/";
const guide = guides.find((g) => g.path === path)!;
const description = "Come scegliere un'impresa edile a Messina: documenti da chiedere, cosa deve contenere il preventivo, le clausole del contratto e i segnali d'allarme.";

export const metadata = pageMetadata({ title: "Come scegliere un'impresa edile a Messina", description, path, ogType: "article" });

const faqs = [
  { q: "Quali documenti chiedere a un'impresa edile?", a: "Visura camerale aggiornata, DURC in corso di validità e copertura assicurativa di responsabilità civile. Per gli impianti, l'abilitazione ai sensi del DM 37/2008." },
  { q: "Quanti preventivi conviene chiedere?", a: "Almeno due o tre, sulla stessa descrizione del lavoro e dopo un sopralluogo, così che siano confrontabili voce per voce." },
  { q: "Serve un contratto scritto per una ristrutturazione?", a: "È fortemente consigliato: deve indicare lavori, prezzo, tempi, pagamenti e cosa succede in caso di ritardi o difetti. Un preventivo firmato è meglio di un accordo a voce, ma un contratto completo tutela di più." },
  { q: `MessinaCasa360 è un'impresa edile?`, a: "No. È un servizio che raccoglie richieste di preventivo e le inoltra a imprese e artigiani indipendenti. Il contratto lo firmi direttamente con il professionista che scegli." },
];

export default function ScegliereImpresaGuide() {
  return (
    <>
      <ContentPage title={guide.title} description={description} path={path} article={{ updated: guide.updated }} faqs={faqs}
        crumbs={[{ name: "Home", path: "/" }, { name: "Guide", path: "/guide/" }, { name: "Scegliere l'impresa", path }]}
        intro={<p><strong>In breve:</strong> prima di firmare controlla i documenti dell&apos;impresa, confronta preventivi scritti voce per voce e fissa in un contratto tempi, pagamenti e responsabilità.</p>}>
        <h2>I documenti da chiedere</h2>
        <ul>
          <li><strong>Visura camerale:</strong> conferma che l&apos;impresa esiste, è attiva e svolge l&apos;attività che ti serve.</li>
          <li><strong>DURC:</strong> attesta la regolarità contributiva.</li>
          <li><strong>Assicurazione:</strong> chiedi una copia della polizza di responsabilità civile e controlla massimali e validità.</li>
          <li><strong>Abilitazione impianti:</strong> elettrico, idraulico e gas richiedono imprese abilitate ai sensi del DM 37/2008, che a fine lavori rilasciano la dichiarazione di conformità.</li>
        </ul>

        <h2>Il sopralluogo dice già molto</h2>
        <p>
          Un&apos;impresa seria guarda impianti, massetti, accessi e parti comuni, fa domande e prende misure. A Messina, in zona sismica 1, deve anche segnalare quando un intervento tocca le strutture e serve un tecnico abilitato.
          Diffida di chi dà un prezzo definitivo senza aver visto l&apos;immobile.
        </p>

        <ProseBreak img={media.progetto} insight="Un preventivo si confronta solo se le voci sono le stesse." />
        <h2>Cosa deve contenere il preventivo</h2>
        <ul>
          <li>Elenco delle lavorazioni con quantità e prezzi, non un totale unico.</li>
          <li>Marca e modello di materiali e forniture.</li>
          <li>Cosa è escluso: pratiche edilizie, smaltimento, ponteggi, IVA.</li>
          <li>Durata prevista e condizioni di validità dell&apos;offerta.</li>
        </ul>
        <p>Per confrontare i prezzi leggi <Link href="/guide/costo-ristrutturazione-casa-messina/">quali voci fanno il costo di una ristrutturazione</Link>.</p>

        <h2>Cosa scrivere nel contratto</h2>
        <ul>
          <li>Oggetto dei lavori, con il preventivo allegato.</li>
          <li>Inizio, fine e cronoprogramma, con una penale in caso di ritardo.</li>
          <li>Pagamenti legati agli stati di avanzamento, non anticipi elevati.</li>
          <li>Chi gestisce pratiche, sicurezza e rifiuti.</li>
          <li>Come si approvano le varianti: sempre per iscritto, con il relativo prezzo.</li>
        </ul>
        <p>
          Il Codice civile tutela il committente per vizi e difformità dell&apos;opera (art. 1667) e per i gravi difetti degli edifici (art. 1669). Se in cantiere lavorano più imprese, il D.Lgs. 81/2008 prevede la nomina di un coordinatore per la sicurezza.
          Fai valutare il contratto da un professionista di fiducia.
        </p>

        <h2>I segnali d&apos;allarme</h2>
        <ul>
          <li>Rifiuto di fornire documenti o un preventivo scritto.</li>
          <li>Richiesta di pagamenti in contanti o senza fattura.</li>
          <li>Anticipo molto alto prima dell&apos;inizio dei lavori.</li>
          <li>&quot;Non serve nessuna pratica&quot; detto senza una verifica tecnica. Vedi <Link href="/guide/cila-quando-serve/">quando serve la CILA</Link>.</li>
          <li>Prezzo molto più basso degli altri senza una spiegazione voce per voce.</li>
        </ul>
        <p>
          Se paghi con le modalità richieste per le detrazioni, conserva bonifici e fatture: vedi <Link href="/guide/bonus-ristrutturazione-2026/">bonus ristrutturazione 2026</Link>.
        </p>
        <p className="text-sm">Informazioni di carattere generale: non sostituiscono il parere di un tecnico o di un legale.</p>

        <h2>Domande frequenti</h2>
        {faqs.map((f) => (
          <div key={f.q}><h3>{f.q}</h3><p>{f.a}</p></div>
        ))}
      </ContentPage>
      <ConversionBlock location="guide_impresa" title="Vuoi confrontare *più proposte*?" text="Una sola richiesta, inoltrata a un massimo di 3 professionisti locali disponibili." img={serviceMedia.ristrutturazioni} />
    </>
  );
}
