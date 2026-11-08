import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { ContentPage } from "@/components/ContentPage";

const path = "/guide/cila-quando-serve/";
const title = "CILA: quando serve per ristrutturare casa (e cosa cambia in Sicilia)";
const description = "Edilizia libera, CILA, SCIA o permesso di costruire: quale titolo serve per rifare bagno, spostare tramezzi o rifare gli impianti. Con le particolarità della Sicilia.";
const updated = "2026-11-08";
export const metadata = pageMetadata({ title, description, path, ogType: "article" });

const faqs = [
  { q: "Serve la CILA per rifare il bagno?", a: "Se sostituisci solo piastrelle e sanitari nella stessa posizione, di norma si tratta di edilizia libera. Se sposti sanitari e scarichi o modifichi la distribuzione degli spazi, in genere serve una CILA asseverata da un tecnico abilitato." },
  { q: "Serve la CILA per spostare un muro interno?", a: "Per tramezzi non portanti di norma sì, serve la CILA. Se il muro è portante l'intervento tocca le strutture e serve un titolo diverso (in genere SCIA) con progetto strutturale." },
  { q: "Chi presenta la CILA?", a: "Un tecnico abilitato (geometra, architetto, ingegnere) che assevera la conformità dell'intervento, per conto del proprietario, allo Sportello Unico per l'Edilizia del Comune." },
  { q: "In Sicilia valgono le stesse regole?", a: "La Sicilia ha recepito il Testo unico dell'edilizia con la propria legge regionale (L.R. 16/2016 e successive modifiche), che può differire dalla normativa nazionale in alcuni punti. Per un immobile a Messina la verifica va fatta con un tecnico e con il Comune." },
];

export default function CilaGuide() {
  return (
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

      <h2>Le particolarità della Sicilia</h2>
      <p>
        La Regione Siciliana ha recepito il Testo unico dell&apos;edilizia con la <strong>L.R. 10 agosto 2016, n. 16</strong>,
        modificata nel tempo (tra cui dalla L.R. 23/2021), con regole proprie su edilizia libera e CILA che in alcuni punti
        possono differire dal testo nazionale. Per questo, a Messina, la scelta del titolo va sempre verificata con un tecnico
        abilitato e con lo Sportello Unico per l&apos;Edilizia del Comune.
      </p>

      <h2>Perché conviene non improvvisare</h2>
      <ul>
        <li>Una pratica mancante può comportare sanzioni e problemi in caso di vendita dell&apos;immobile.</li>
        <li>Il titolo corretto è spesso un requisito per accedere alle detrazioni fiscali (vedi <Link href="/guide/bonus-ristrutturazione-2026/">bonus 2026</Link>).</li>
        <li>In zona ad alta pericolosità sismica, come Messina, qualsiasi intervento sulle strutture richiede progettazione e verifiche specifiche.</li>
      </ul>

      <h2>Fonti</h2>
      <ul>
        <li><a href="https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.presidente.repubblica:2001-06-06;380" target="_blank" rel="noopener noreferrer">DPR 6 giugno 2001, n. 380 (Normattiva)</a></li>
        <li><a href="https://w3.ars.sicilia.it/lex/L_2016_016.htm" target="_blank" rel="noopener noreferrer">L.R. Sicilia 10 agosto 2016, n. 16 (ARS)</a></li>
        <li>DM 2 marzo 2018 – Glossario dell&apos;edilizia libera (GU n. 81 del 7 aprile 2018)</li>
      </ul>
      <p className="text-sm">Informazioni di carattere generale: non sostituiscono il parere di un tecnico abilitato.</p>

      <h2>Domande frequenti</h2>
      {faqs.map((f) => (
        <div key={f.q}><h3>{f.q}</h3><p>{f.a}</p></div>
      ))}
    </ContentPage>
  );
}
