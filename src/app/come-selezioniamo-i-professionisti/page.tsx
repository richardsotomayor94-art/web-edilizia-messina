import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { ContentPage } from "@/components/ContentPage";

const title = "Come selezioniamo i professionisti partner";
const description = `I criteri con cui ${site.name} sceglie l'impresa per la tua richiesta a Messina: partita IVA e fattura, specializzazione, zona e un colloquio prima del contatto.`;
const path = "/come-selezioniamo-i-professionisti/";

export const metadata = pageMetadata({ title, description, path });

export default function SelezionePage() {
  return (
    <ContentPage
      title={title}
      description={description}
      path={path}
      crumbs={[{ name: "Home", path: "/" }, { name: "Come selezioniamo i professionisti", path }]}
      intro={<p>Ogni richiesta va a una sola impresa, scelta per il tipo di lavoro e per la zona. Ecco i criteri, e cosa conviene controllare a te prima di firmare.</p>}
    >
      <h2>Imprese specializzate, non tuttofare</h2>
      <p>
        Lavoriamo solo con imprese edili e artigiane che fanno quel lavoro per mestiere: l&apos;impermeabilizzazione a chi fa
        impermeabilizzazioni, la facciata a chi lavora in quota con i propri ponteggi, il cappotto a chi lo posa ogni giorno.
        Tutte hanno partita IVA, rilasciano regolare fattura e dispongono di squadre e mezzi propri. Per i lavori che
        richiedono un&apos;abilitazione (impianti, lavori strutturali) indirizziamo solo imprese abilitate per
        quell&apos;intervento. Non mandiamo tuttofare, improvvisati o chi non può lasciare fattura.
      </p>
      <p>
        Prima di passarti il contatto parliamo direttamente con l&apos;impresa e le spieghiamo la tua richiesta, così quando ti
        chiama sa già di cosa si tratta.
      </p>

      <h2>I criteri con cui scegliamo l&apos;impresa</h2>
      <ul>
        <li>Partita IVA e regolare fattura: è il primo requisito per collaborare con noi.</li>
        <li>Specializzazione nel lavoro richiesto, con squadre e attrezzature proprie.</li>
        <li>Zona: un&apos;impresa che lavora dove si trova la tua casa.</li>
        <li>Un colloquio con l&apos;impresa prima di passarti il contatto, per spiegarle la richiesta.</li>
        <li>Impegno a usare i tuoi dati solo per il sopralluogo e il preventivo, senza cederli a terzi.</li>
      </ul>

      <h2>I documenti te li mostra l&apos;impresa</h2>
      <p>
        Non facciamo controlli documentali per conto tuo. Visura camerale, DURC, abilitazioni (per gli impianti, ai sensi del
        DM 37/2008), assicurazione e garanzie te li mostra direttamente l&apos;impresa: chiedili sempre prima di firmare il
        preventivo.
      </p>

      <h2>Durante la collaborazione</h2>
      <ul>
        <li>Chiederemo ai clienti un riscontro su puntualità e chiarezza del contatto.</li>
        <li>Sospenderemo i partner che non rispondono, non si presentano ai sopralluoghi o ricevono segnalazioni fondate.</li>
        <li>Ogni richiesta va a una sola impresa, specializzata in quel lavoro.</li>
      </ul>

      <h2>Cosa non possiamo garantire</h2>
      <p>
        Non siamo un&apos;impresa edile e non dirigiamo i lavori: la qualità dell&apos;esecuzione, i tempi e i prezzi sono
        responsabilità del professionista con cui firmi il contratto. Per questo ti consigliamo sempre di chiedere un
        preventivo scritto e dettagliato, verificare i documenti dell&apos;impresa e, per lavori soggetti a pratica edilizia,
        affidarti a un tecnico abilitato.
      </p>
    </ContentPage>
  );
}
