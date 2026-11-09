import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { ContentPage } from "@/components/ContentPage";
import { ConversionBlock } from "@/components/ConversionBlock";
import { ProseBreak } from "@/components/ProseBreak";
import { media } from "@/config/media";

const path = "/guide/bonus-ristrutturazione-2026/";
const title = "Bonus ristrutturazione 2026: aliquote, limiti e novità 2027";
const description = "Detrazioni 2026 per ristrutturazioni, ecobonus, sismabonus e bonus mobili: aliquote, limiti di spesa, novità del DDL Bilancio 2027 e fonti ufficiali.";
const updated = "2026-11-09";
export const metadata = pageMetadata({ title: "Bonus ristrutturazione 2026 e novità 2027", description, path, ogType: "article" });

const faqs = [
  { q: "Qual è l'aliquota del bonus ristrutturazione nel 2026?", a: "Secondo l'Agenzia delle Entrate, per le spese 2026 la detrazione è del 50% per l'abitazione principale (per il proprietario o titolare di un diritto reale) e del 36% negli altri casi, con un limite di spesa di 96.000 euro per unità immobiliare, ripartita in 10 anni." },
  { q: "Cosa cambia nel 2027?", a: "Con le norme in vigore a novembre 2026, nel 2027 le aliquote scendono al 36% (abitazione principale) e al 30% (altri casi). Il disegno di legge di Bilancio 2027 (A.C. 3174, presentato alla Camera il 30 ottobre 2026) proroga al 2027 il 50% per l'abitazione principale e il 36% negli altri casi per recupero edilizio, ecobonus e sismabonus; introduce per l'ecobonus un limite unico di 96.000 euro e prevede il 50% su massimo 5.000 euro per i mobili. Non è ancora legge e può cambiare." },
  { q: "Il bonus mobili esiste ancora nel 2026?", a: "Sì: detrazione del 50% su un massimo di 5.000 euro per acquisti nel 2026, collegata a interventi di recupero edilizio iniziati dal 1° gennaio 2025." },
];

const Src = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
);

export default function BonusGuide() {
  return (
    <>
    <ContentPage title={title} description={description} path={path} article={{ updated }} faqs={faqs}
      crumbs={[{ name: "Home", path: "/" }, { name: "Guide", path: "/guide/" }, { name: "Bonus 2026", path }]}
      intro={<p><strong>In breve:</strong> nel 2026 le principali detrazioni per la casa valgono il 50% sull&apos;abitazione principale e il 36% negli altri casi. Verifica sempre i requisiti con il tuo commercialista.</p>}>
      <p className="text-sm">Dati riscontrati su fonti ufficiali alla data di aggiornamento. Le norme fiscali cambiano spesso: controlla le fonti linkate prima di decidere.</p>

      <h2>Riepilogo 2026</h2>
      <table>
        <thead><tr><th>Agevolazione</th><th>Abitazione principale</th><th>Altri immobili</th><th>Limite</th></tr></thead>
        <tbody>
          <tr><td>Bonus ristrutturazioni (recupero edilizio)</td><td>50%</td><td>36%</td><td>96.000 € per unità, 10 rate</td></tr>
          <tr><td>Ecobonus (riqualificazione energetica)</td><td>50%</td><td>36%</td><td>Limiti per tipo di intervento</td></tr>
          <tr><td>Sismabonus</td><td>50%</td><td>36%</td><td>96.000 € per unità</td></tr>
          <tr><td>Bonus mobili ed elettrodomestici</td><td colSpan={2}>50% (collegato a ristrutturazione iniziata dal 1/1/2025)</td><td>5.000 €</td></tr>
        </tbody>
      </table>
      <p>
        L&apos;aliquota maggiorata del 50% spetta per l&apos;abitazione principale ai proprietari o titolari di un diritto reale
        di godimento. Dal 2025 le caldaie uniche alimentate a combustibili fossili non sono più agevolate, né con l&apos;ecobonus né con la detrazione per il recupero edilizio.
      </p>

      <h2>Cosa cambia nel 2027</h2>
      <p>
        Con la normativa vigente le aliquote scendono nel 2027 al 36% (abitazione principale) e al 30% (altri casi). Il disegno
        di legge di Bilancio 2027 (A.C. 3174, presentato alla Camera il 30 ottobre 2026) proroga al 2027 il 50% per
        l&apos;abitazione principale e il 36% negli altri casi per recupero edilizio, ecobonus e sismabonus; introduce per
        l&apos;ecobonus un limite unico di 96.000 euro e prevede il 50% su massimo 5.000 euro per i mobili.{" "}
        <strong>Non è ancora legge e può cambiare</strong>: aggiorneremo questa pagina dopo la pubblicazione in Gazzetta Ufficiale.
      </p>

      <ProseBreak img={media.materia} insight="Il bonus si perde spesso sulle carte, non sui lavori." />
      <h2>Cosa serve in pratica</h2>
      <ul>
        <li>Pagamenti con bonifico &quot;parlante&quot; quando richiesto dalla normativa.</li>
        <li>Fatture intestate a chi detrae, con descrizione dei lavori.</li>
        <li>Il titolo edilizio corretto (se necessario: vedi <Link href="/guide/cila-quando-serve/">CILA: quando serve</Link>).</li>
        <li>Per gli interventi di risparmio energetico, la comunicazione all&apos;ENEA nei termini previsti.</li>
      </ul>

      <h2>Fonti ufficiali</h2>
      <ul>
        <li><Src href="https://www.agenziaentrate.gov.it/portale/documents/d/guest/ristrutturazioni_edilizie_le_agevolazioni_fiscali-1">Agenzia delle Entrate – Ristrutturazioni edilizie: le agevolazioni fiscali (guida, febbraio 2026)</Src></li>
        <li><Src href="https://www.agenziaentrate.gov.it/portale/aree-tematiche/casa/agevolazioni/bonus-mobili-ed-elettrodomestici">Agenzia delle Entrate – Bonus mobili ed elettrodomestici</Src></li>
        <li><Src href="https://ance.it/wp-content/uploads/allegati/guida_dell'Ance_bonus_edilizi_2026_novit%C3%A0_e_conferme_ALL1.pdf">ANCE – Bonus edilizi 2026, novità e conferme (limite del sismabonus)</Src></li>
        <li><Src href="https://www.agenziaentrate.gov.it/portale/documents/20143/10186910/Riqualificazione_energetica.pdf">Agenzia delle Entrate – Riqualificazione energetica (guida)</Src></li>
        <li><Src href="https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:legge:2025-12-30;199~art1!vig=">Legge 30 dicembre 2025, n. 199 (Legge di Bilancio 2026), art. 1, comma 22</Src></li>
        <li><Src href="https://documenti.camera.it/leg19/pdl/pdf/leg.19.pdl.camera.3174.19PDL0221140.pdf">Camera dei deputati – A.C. 3174, disegno di legge di Bilancio 2027</Src></li>
      </ul>
      <p className="text-sm">Questa guida ha carattere informativo e non costituisce consulenza fiscale.</p>

      <h2>Domande frequenti</h2>
      {faqs.map((f) => (
        <div key={f.q}><h3>{f.q}</h3><p>{f.a}</p></div>
      ))}
    </ContentPage>
    <ConversionBlock location="guide_bonus" title="Prima i lavori, *poi le detrazioni*." img={media.ombra} />
    </>
  );
}
