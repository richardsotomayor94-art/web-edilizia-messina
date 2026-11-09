import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { ContentPage } from "@/components/ContentPage";
import { ConversionBlock } from "@/components/ConversionBlock";
import { ProseBreak } from "@/components/ProseBreak";
import { material } from "@/config/media";

const path = "/guide/costo-rifacimento-bagno-messina/";
const title = "Quanto costa rifare un bagno a Messina: le voci che fanno il prezzo";
const description = "Quanto costa rifare un bagno a Messina dipende da impianti, metratura e materiali: cosa cambia tra finiture e rifacimento completo e come confrontare i preventivi.";
const updated = "2026-11-09";
export const metadata = pageMetadata({ title: "Quanto costa rifare un bagno a Messina", description, path, ogType: "article" });

const faqs = [
  { q: "Quanto costa rifare un bagno a Messina?", a: "Non esiste un prezzo unico e non ne pubblichiamo uno: dipende da metratura, rifacimento di impianti e scarichi, spostamento dei sanitari e materiali. Le cifre che si trovano online sono stime nazionali. Per un importo affidabile servono un sopralluogo e un preventivo scritto voce per voce." },
  { q: "Un bagno piccolo costa molto meno?", a: "Meno, ma non in proporzione ai metri. Si riducono le superfici da rivestire, mentre smontaggio, scarichi, sanitari e rubinetteria restano. Per questo il prezzo al metro quadro inganna soprattutto sui bagni piccoli." },
  { q: "Si può rifare il bagno senza cambiare gli impianti?", a: "Sì, se scarichi e tubazioni sono in buono stato e i sanitari restano dove sono. Prima di coprire tutto con nuovi rivestimenti conviene farli verificare, perché rifarli dopo costa di più." },
  { q: "Serve un sopralluogo per il preventivo del bagno?", a: "Per un preventivo affidabile sì. Solo vedendo il bagno si possono valutare stato degli scarichi, posizione delle colonne, fondi e accessi. Lo fa il professionista che ti contatta: chiedigli prima se è gratuito." },
];

export default function CostoBagnoGuide() {
  return (
    <>
      <ContentPage title={title} description={description} path={path} article={{ updated }} faqs={faqs}
        crumbs={[{ name: "Home", path: "/" }, { name: "Guide", path: "/guide/" }, { name: "Costo rifacimento bagno", path }]}
        intro={<p><strong>In breve:</strong> il costo di un bagno dipende soprattutto da quanto intervieni su impianti e scarichi, poi da metratura e materiali. Un importo affidabile arriva solo dopo un sopralluogo.</p>}>
        <h2>Perché non esiste un prezzo unico</h2>
        <p>
          Online si trovano cifre molto diverse. <a href="https://www.cronoshare.it/blog/quanto-costa-rifare-il-bagno/" rel="noopener">Cronoshare</a> indica
          una media nazionale tra 3.000 e 10.000 € (articolo del gennaio 2026), <a href="https://www.money.it/quanto-costa-rifare-un-bagno-i-costi-della-ristrutturazione" rel="noopener">Money.it</a> tra
          800 e 1.200 € al metro quadro (marzo 2025).
        </p>
        <p>
          Sono stime nazionali, non riferite a Messina, e non descrivono lo stesso lavoro: usale per orientarti, non per decidere.
          Noi non pubblichiamo un prezzo: preferiamo spiegarti le voci che lo determinano.
        </p>

        <h2>Tre lavori diversi sotto lo stesso nome</h2>
        <table>
          <thead><tr><th>Intervento</th><th>Cosa comprende</th><th>Cosa fa salire il costo</th><th>Pratica, di norma</th></tr></thead>
          <tbody>
            <tr><td>Solo finiture</td><td>Nuovi rivestimenti e sanitari, impianti dove sono</td><td>Formato e materiale, rimozione del vecchio</td><td>Edilizia libera</td></tr>
            <tr><td>Da vasca a doccia</td><td>Smontaggio, adattamento degli scarichi, impermeabilizzazione, rivestimenti della zona</td><td>Spostamento dello scarico, piatto su misura</td><td>Da verificare se tocchi gli impianti</td></tr>
            <tr><td>Rifacimento completo</td><td>Demolizione, impianti e scarichi, fondi, impermeabilizzazione, rivestimenti, sanitari</td><td>Nuova posizione dei sanitari, stato degli scarichi</td><td>In genere CILA se cambi impianti o distribuzione</td></tr>
          </tbody>
        </table>

        <h2>Perché contano i metri quadri, ma non da soli</h2>
        <p>
          Una parte del costo non dipende dalla metratura: smontaggio, scarichi, sanitari, rubinetteria e intervento di idraulico ed
          elettricista ci sono in un bagno di 4 metri quadri come in uno di 8. A crescere con i metri sono pavimenti e rivestimenti.
        </p>
        <p>Per ricevere preventivi utili, indica:</p>
        <ul>
          <li>lunghezza e larghezza del bagno, e altezza dei rivestimenti;</li>
          <li>cosa resta al suo posto e cosa si sposta;</li>
          <li>vasca o doccia, oggi e dopo i lavori;</li>
          <li>se c&apos;è una finestra o se il bagno è cieco.</li>
        </ul>

        <ProseBreak img={material.bagnoGrezzo} insight="Quello che non si vede pesa quanto quello che si sceglie." />
        <h2>Cosa incide in modo particolare a Messina</h2>
        <ul>
          <li>Negli appartamenti in condominio le colonne di scarico sono parti comuni: eventuali interventi vanno concordati con l&apos;amministratore.</li>
          <li>Il clima umido della costa rende importante una buona ventilazione: se il bagno è cieco, valuta un aspiratore.</li>
          <li>Piano alto senza ascensore, cassoni su area pubblica e accessi in ZTL sono voci da chiarire nel preventivo. Vedi <Link href="/guide/lavori-casa-messina-verifiche-zona/">cosa controllare zona per zona</Link>.</li>
        </ul>

        <h2>Come ottenere preventivi confrontabili</h2>
        <ol>
          <li>Smontaggio, smaltimento e rifacimento degli scarichi, indicati a parte.</li>
          <li>Tipo di impermeabilizzazione della zona doccia.</li>
          <li>Marca e modello di sanitari, rubinetteria e piatto doccia.</li>
          <li>Metri quadri di rivestimenti e costo del materiale.</li>
          <li>Dichiarazione di conformità dell&apos;impianto a fine lavori.</li>
        </ol>
        <p>Per il resto vale la lista di <Link href="/guide/come-scegliere-impresa-edile-messina/">come scegliere un&apos;impresa edile a Messina</Link>.</p>

        <h2>Pratiche e bonus</h2>
        <p>
          Se cambi solo finiture e sanitari di norma non serve alcuna pratica: vedi <Link href="/guide/cila-quando-serve/">quando serve la CILA</Link>.
          Una parte della spesa può essere detraibile quando l&apos;intervento rientra tra quelli agevolati: vedi il <Link href="/guide/bonus-ristrutturazione-2026/">bonus ristrutturazione 2026</Link>.
        </p>

        <h2>Domande frequenti</h2>
        {faqs.map((f) => (
          <div key={f.q}>
            <h3>{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}
      </ContentPage>
      <ConversionBlock location="guide_costo_bagno" href="/preventivo/?servizio=bagno" service="bagno" title="Un preventivo per il *tuo* bagno." img={material.bagnoMacro} bring={["Misure del bagno", "Cosa vuoi spostare", "2 o 3 foto"]} />
    </>
  );
}
