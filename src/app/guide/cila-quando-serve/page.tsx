import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { ContentPage } from "@/components/ContentPage";
import { ConversionBlock } from "@/components/ConversionBlock";
import { ProseBreak } from "@/components/ProseBreak";
import { media } from "@/config/media";

const path = "/guide/cila-quando-serve/";
const title = "CILA: quando serve per ristrutturare casa (e le regole in Sicilia)";
const description = "Edilizia libera, CILA o SCIA: quale titolo serve per rifare il bagno, spostare tramezzi o rifare gli impianti, con le regole in vigore in Sicilia.";
const updated = "2026-11-09";
export const metadata = pageMetadata({ title: "CILA: quando serve e regole in Sicilia", description, path, ogType: "article" });

const faqs = [
  { q: "Serve la CILA per rifare il bagno?", a: "Se sostituisci solo piastrelle e sanitari nella stessa posizione, di norma si tratta di edilizia libera. Se sposti sanitari e scarichi o modifichi la distribuzione degli spazi, in genere serve una CILA asseverata da un tecnico abilitato." },
  { q: "Serve la CILA per spostare un muro interno?", a: "Per tramezzi non portanti di norma sì, serve la CILA. Se il muro è portante l'intervento tocca le strutture e serve un titolo diverso (in genere SCIA) con progetto strutturale." },
  { q: "Chi presenta la CILA?", a: "La presenta l'interessato (proprietario o avente titolo), di norma tramite il tecnico abilitato che assevera il progetto. A Messina passa dallo Sportello Telematico del Comune." },
  { q: "In Sicilia valgono le stesse regole?", a: "In Sicilia il riferimento è la L.R. 16/2016, come modificata dalle L.R. 23/2021, 2/2022 e 27/2024 (recepimento del Salva Casa): lo spostamento di pareti interne non strutturali rientra nell'art. 3, comma 2; gli interventi su strutture o prospetti nella SCIA dell'art. 10. Per un immobile a Messina la verifica va fatta con un tecnico e con il Comune." },
];

export default function CilaGuide() {
  return (
    <>
    <ContentPage title={title} description={description} path={path} article={{ updated }} faqs={faqs}
      crumbs={[{ name: "Home", path: "/" }, { name: "Guide", path: "/guide/" }, { name: "CILA", path }]}
      intro={<p><strong>In breve:</strong> rinnovare finiture è di norma edilizia libera; spostare tramezzi o impianti richiede in genere la CILA; toccare le strutture richiede titoli più complessi. In Sicilia si applica anche la legge regionale.</p>}>
      <h2>I quattro regimi in sintesi</h2>
      <table>
        <thead><tr><th>Regime</th><th>Esempi tipici</th><th>Riferimento nazionale</th></tr></thead>
        <tbody>
          <tr><td>Edilizia libera</td><td>Rifare pavimenti e rivestimenti, sostituire sanitari nella stessa posizione, tinteggiare, riparare impianti esistenti</td><td>Art. 6 DPR 380/2001; Glossario DM 2 marzo 2018</td></tr>
          <tr><td>CILA</td><td>Spostare o demolire tramezzi non portanti, rifare il bagno cambiando la distribuzione, rifare gli impianti modificandoli</td><td>Art. 6-bis DPR 380/2001</td></tr>
          <tr><td>SCIA</td><td>Interventi che toccano parti strutturali (es. aperture in muri portanti)</td><td>Art. 22 DPR 380/2001</td></tr>
          <tr><td>Permesso di costruire</td><td>Nuove costruzioni, ristrutturazioni pesanti, ampliamenti</td><td>Art. 10 DPR 380/2001</td></tr>
        </tbody>
      </table>

      <ProseBreak img={media.progetto} insight="Prima del cantiere viene la pratica giusta." />
      <h2>Le particolarità della Sicilia</h2>
      <p>
        In Sicilia il riferimento è la <strong>L.R. 10 agosto 2016, n. 16</strong>, come modificata dalle L.R. 23/2021, 2/2022 e 27/2024
        (recepimento del Salva Casa). Lo spostamento di pareti interne non strutturali rientra nell&apos;art. 3, comma 2; gli
        interventi su strutture o prospetti nella SCIA dell&apos;art. 10. A Messina la scelta del titolo va sempre verificata con
        un tecnico abilitato e la pratica passa dallo{" "}
        <a href="https://sportellotelematico.comune.messina.it/" target="_blank" rel="noopener noreferrer">Sportello Telematico del Comune</a>.
      </p>

      <h2>Perché conviene non improvvisare</h2>
      <ul>
        <li>Una pratica mancante può comportare sanzioni e problemi in caso di vendita dell&apos;immobile.</li>
        <li>Il titolo corretto è spesso un requisito per accedere alle detrazioni fiscali (vedi <Link href="/guide/bonus-ristrutturazione-2026/">bonus 2026</Link>).</li>
        <li>Il Comune di Messina è in zona sismica 1: qualsiasi intervento sulle strutture richiede progettazione e verifiche specifiche. Vedi <Link href="/guide/lavori-casa-messina-verifiche-zona/">cosa controllare zona per zona</Link>.</li>
      </ul>

      <h2>Fonti</h2>
      <ul>
        <li><a href="https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.presidente.repubblica:2001-06-06;380" target="_blank" rel="noopener noreferrer">DPR 6 giugno 2001, n. 380 (Normattiva)</a></li>
        <li><a href="https://www.regione.sicilia.it/system/files/2025-04/lr%2016_2016%20agg%2028%20feb%202025.pdf" target="_blank" rel="noopener noreferrer">L.R. Sicilia 10 agosto 2016, n. 16, testo coordinato (Regione Siciliana)</a></li>
        <li>DM 2 marzo 2018 – Glossario dell&apos;edilizia libera (GU n. 81 del 7 aprile 2018)</li>
      </ul>
      <p className="text-sm">Informazioni di carattere generale: non sostituiscono il parere di un tecnico abilitato.</p>

      <h2>Domande frequenti</h2>
      {faqs.map((f) => (
        <div key={f.q}><h3>{f.q}</h3><p>{f.a}</p></div>
      ))}
    </ContentPage>
    <ConversionBlock location="guide_cila" title="Serve una mano con *i lavori*?" img={media.ombra} />
    </>
  );
}
