import Link from "next/link";
import { LOCAL_GUIDE_PATH, guides } from "@/config/guides";
import { pageMetadata } from "@/lib/seo";
import { ContentPage } from "@/components/ContentPage";
import { CtaBanner } from "@/components/CtaBanner";

const path = LOCAL_GUIDE_PATH;
const heading = guides.find((g) => g.path === path)!;
const description = "Zona sismica 1, centro ricostruito dopo il 1908, vincoli a Ganzirri e Capo Peloro, PAI nella zona sud: le verifiche da fare prima dei lavori a Messina.";
const updated = heading.updated;

export const metadata = pageMetadata({ title: "Lavori in casa a Messina: verifiche", description, path, ogType: "article" });

const faqs = [
  { q: "Messina è in zona sismica?", a: "Sì. Il Comune di Messina è classificato in zona sismica 1 dalla classificazione regionale in vigore dal 2022. Gli interventi su strutture portanti richiedono un tecnico abilitato e il titolo edilizio adeguato." },
  { q: "Come si presenta una pratica edilizia a Messina?", a: "Attraverso lo Sportello Telematico del Comune di Messina, di norma tramite il tecnico che segue la pratica. Dal 1° ottobre 2025 è obbligatorio usare la modulistica unificata." },
  { q: "Serve l'autorizzazione paesaggistica a Ganzirri o Torre Faro?", a: "Dipende da posizione e tipo di lavoro. La fascia di 300 metri dalla costa e dai laghi e le riserve sono aree tutelate per legge: prima di iniziare verifica i vincoli con un tecnico e, nella Riserva di Capo Peloro, il parere dell'ente gestore." },
  { q: "Cos'è il PAI e perché riguarda i lavori in casa?", a: "Il Piano di Assetto Idrogeologico individua le aree a pericolosità di frana e alluvione. Prima dei lavori il tecnico deve verificare nel PAI vigente la pericolosità del lotto." },
];

const Src = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
);

export default function LocalGuide() {
  return (
    <>
      <ContentPage title={heading.title} description={description} path={path} article={{ updated }} faqs={faqs}
        crumbs={[{ name: "Home", path: "/" }, { name: "Guide", path: "/guide/" }, { name: "Verifiche a Messina", path }]}
        intro={<p><strong>In breve:</strong> tutta Messina è in zona sismica 1. Poi cambia da zona a zona: in centro contano la struttura degli edifici e la logistica, sulla costa e ai laghi i vincoli paesaggistici, nella zona sud il rischio idrogeologico.</p>}>
        <h2>Ovunque in città: zona sismica 1</h2>
        <p>
          Il Comune di Messina è classificato in <strong>zona sismica 1</strong>. Sostituire finiture e sanitari non tocca le strutture, ma aprire un varco in un muro portante o intervenire sui solai richiede un tecnico abilitato e il titolo edilizio adeguato.
          In Sicilia gli interventi su strutture o prospetti rientrano nella SCIA dell&apos;art. 10 della L.R. 16/2016: vedi la guida <Link href="/guide/cila-quando-serve/">CILA: quando serve</Link>.
        </p>

        <h2>Centro: la città del Piano Borzì</h2>
        <p>
          Dopo il terremoto e il maremoto del 28 dicembre 1908 il centro fu ricostruito sulla maglia regolare a isolati del Piano Borzì del 1911. Per chi ristruttura significa soprattutto una cosa: prima di progettare, fai verificare lo stato reale di impianti e solai, senza dare per scontata la loro età o la loro tipologia.
        </p>
        <ul>
          <li><strong>Condominio:</strong> controlla regolamento, orari dei lavori e comunicazioni all&apos;amministratore. Colonne di scarico e parti comuni vanno concordate.</li>
          <li><strong>Ponteggi e cassoni:</strong> su area pubblica richiedono verifica e autorizzazione del Comune.</li>
          <li><strong>Accesso dei mezzi:</strong> a Messina esistono ZTL. Controlla sul sito del Comune o dell&apos;ATM se l&apos;indirizzo del cantiere è interessato.</li>
        </ul>

        <h2>Zona nord: costa, laghi e Riserva di Capo Peloro</h2>
        <p>
          Tra Contemplazione, Sperone, Ganzirri e Torre Faro il tema principale sono i vincoli. Il Codice dei beni culturali tutela per legge la fascia di 300 metri dalla costa e dai laghi e le riserve naturali.
        </p>
        <ul>
          <li><strong>Autorizzazione paesaggistica:</strong> se il lavoro cambia l&apos;aspetto esterno dell&apos;edificio, verifica con un tecnico se serve e rivolgiti alla Soprintendenza BB.CC.AA. di Messina.</li>
          <li><strong>Riserva Laguna di Capo Peloro:</strong> il regolamento distingue zona A e pre-riserva e prevede parere o nulla osta dell&apos;ente gestore per diversi interventi.</li>
          <li><strong>Materiali:</strong> in ambiente costiero l&apos;aerosol marino può depositare sali nei materiali e favorirne il degrado. Per infissi, ringhiere e intonaci esterni chiedi prodotti adatti.</li>
          <li><strong>Accesso:</strong> anche a Torre Faro è prevista una ZTL: verifica il periodo in cui è attiva.</li>
        </ul>

        <h2>Zona sud: rischio idrogeologico</h2>
        <p>
          L&apos;alluvione dell&apos;ottobre 2009 colpì Giampilieri, Itala e Scaletta Zanclea e causò 37 vittime. Tra Tremestieri, Galati, Santo Stefano Briga e Giampilieri, come in ogni altra parte del territorio, prima dei lavori il tecnico deve verificare nel <strong>PAI vigente</strong> la pericolosità del lotto, soprattutto per opere esterne, muri di contenimento e scavi.
        </p>

        <h2>Chi controlla cosa</h2>
        <table>
          <thead><tr><th>Verifica</th><th>Dove</th></tr></thead>
          <tbody>
            <tr><td>Titolo edilizio (CILA, SCIA)</td><td>Tecnico abilitato e Sportello Telematico del Comune; modulistica unificata obbligatoria dal 1° ottobre 2025</td></tr>
            <tr><td>Vincolo paesaggistico</td><td>Tecnico abilitato e Soprintendenza BB.CC.AA. di Messina</td></tr>
            <tr><td>Riserva di Capo Peloro</td><td>Ente gestore: Città Metropolitana di Messina</td></tr>
            <tr><td>Pericolosità idrogeologica</td><td>PAI della Regione Siciliana</td></tr>
            <tr><td>Suolo pubblico e ZTL</td><td>Comune di Messina</td></tr>
            <tr><td>Parti comuni</td><td>Amministratore di condominio</td></tr>
          </tbody>
        </table>

        <h2>Fonti</h2>
        <ul>
          <li><Src href="https://www2.regione.sicilia.it/deliberegiunta/file/giunta/allegati/N.081_24.02.2022.pdf">Regione Siciliana, DGR 81/2022: classificazione sismica dei comuni</Src></li>
          <li><Src href="https://servizio-nazionale.protezionecivile.gov.it/en/pagina-base/earthquake-and-tsunami-messina-and-reggio-calabria/">Protezione Civile: terremoto e maremoto del 1908</Src></li>
          <li><Src href="https://www.cittametropolitana.me.it/la-provincia/news2020/vii-direzione-servizi-generali-e-politiche-di-sviluppo-econo/allegati/piazze-di-messina-notizie-sintetiche-sulle-piazze-della-ricostruzione.pdf">Città Metropolitana di Messina: le piazze della ricostruzione</Src></li>
          <li><Src href="https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:2004-01-22;42~art142!vig=">D.Lgs. 42/2004, art. 142 (Normattiva)</Src></li>
          <li><Src href="https://orbs.regione.sicilia.it/images/72_-_Laguna_di_Capo_Peloro.pdf">Riserva Laguna di Capo Peloro: decreto istitutivo e regolamento</Src></li>
          <li><Src href="https://www.regione.sicilia.it/la-regione-informa/interventi-protezione-civile-regionale">Regione Siciliana: alluvione del 2009</Src></li>
          <li><Src href="https://www.sitr.regione.sicilia.it/pai/pai-bacini-idrografici/">Regione Siciliana: PAI per bacino idrografico</Src></li>
          <li><Src href="https://sportellotelematico.comune.messina.it/">Comune di Messina: Sportello Telematico</Src></li>
          <li><Src href="https://www.comune.messina.it/it/news/pass-residenti-nelle-ztl-cambiano-le-regole">Comune di Messina: pass residenti nelle ZTL</Src></li>
        </ul>
        <p className="text-sm">Informazioni di carattere generale, verificate alla data di aggiornamento: non sostituiscono il parere di un tecnico abilitato.</p>

        <h2>Domande frequenti</h2>
        {faqs.map((f) => (
          <div key={f.q}><h3>{f.q}</h3><p>{f.a}</p></div>
        ))}
      </ContentPage>
      <div className="container-page"><CtaBanner location="guide_locale" title="Hai già un lavoro in mente?" text="Descrivi il progetto: nel modulo puoi indicare la zona e allegare foto." /></div>
    </>
  );
}
