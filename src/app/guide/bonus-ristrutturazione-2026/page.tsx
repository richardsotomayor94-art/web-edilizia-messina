import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { ContentPage } from "@/components/ContentPage";

const path = "/guide/bonus-ristrutturazione-2026/";
const title = "Bonus ristrutturazione 2026: aliquote, limiti e cosa cambia nel 2027";
const description = "Detrazione per ristrutturazioni, ecobonus, sismabonus e bonus mobili nel 2026: aliquote 50% e 36%, limiti di spesa e fonti ufficiali dell'Agenzia delle Entrate.";
const updated = "2026-11-08";
export const metadata = pageMetadata({ title, description, path, ogType: "article" });

const faqs = [
  { q: "Qual è l'aliquota del bonus ristrutturazione nel 2026?", a: "Secondo l'Agenzia delle Entrate, per le spese 2026 la detrazione è del 50% per l'abitazione principale (per il proprietario o titolare di un diritto reale) e del 36% negli altri casi, con un limite di spesa di 96.000 euro per unità immobiliare, ripartita in 10 anni." },
  { q: "Cosa cambia nel 2027?", a: "Con le norme in vigore a novembre 2026, nel 2027 le aliquote scendono al 36% (abitazione principale) e al 30% (altri casi). Il disegno di legge di Bilancio 2027 prevede di confermare le aliquote del 2026, ma finché non è legge pubblicata in Gazzetta Ufficiale va considerato non definitivo." },
  { q: "Il bonus mobili esiste ancora nel 2026?", a: "Sì: detrazione del 50% su un massimo di 5.000 euro per acquisti nel 2026, collegata a interventi di recupero edilizio iniziati dal 1° gennaio 2025." },
];

const Src = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
);

export default function BonusGuide() {
  return (
    <ContentPage title={title} description={description} path={path} article={{ updated }} faqs={faqs}
      crumbs={[{ name: "Home", path: "/" }, { name: "Guide", path: "/guide/" }, { name: "Bonus 2026", path }]}
      intro={<p><strong>In breve:</strong> nel 2026 le principali detrazioni per la casa valgono il 50% sull&apos;abitazione principale e il 36% negli altri casi. Verifica sempre i requisiti con il tuo commercialista.</p>}>
      <p className="text-sm"><span className="legal-flag">Verifica fonti</span> Dati riscontrati su pagine e guide ufficiali dell&apos;Agenzia delle Entrate alla data di aggiornamento. Le norme fiscali cambiano spesso: controlla le fonti linkate prima di decidere.</p>

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
        di godimento. Dal 2025 le caldaie uniche alimentate a combustibili fossili non sono più agevolate con l&apos;ecobonus.
      </p>

      <h2>Cosa cambia nel 2027</h2>
      <p>
        Con la normativa vigente le aliquote scendono nel 2027 al 36% (abitazione principale) e al 30% (altri casi). Il disegno
        di legge di Bilancio 2027 approvato dal Consiglio dei ministri a fine ottobre 2026 prevede, secondo la stampa, la
        conferma delle aliquote attuali: <strong>non è ancora legge</strong>. Aggiorneremo questa pagina dopo la pubblicazione in
        Gazzetta Ufficiale.
      </p>

      <h2>Superbonus</h2>
      <p>
        Non risultano, sulle fonti ufficiali consultate, aliquote Superbonus per nuove spese ordinarie sostenute nel 2026. Per
        casi particolari (ad esempio aree colpite da eventi sismici) chiedi una verifica al tuo commercialista.
      </p>

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
        <li><Src href="https://www.agenziaentrate.gov.it/portale/aree-tematiche/casa/agevolazioni/sisma-bonus">Agenzia delle Entrate – Sismabonus</Src></li>
        <li><Src href="https://www.agenziaentrate.gov.it/portale/documents/20143/10186910/Riqualificazione_energetica.pdf">Agenzia delle Entrate – Riqualificazione energetica (guida)</Src></li>
        <li>Legge 30 dicembre 2025, n. 199 (Legge di Bilancio 2026), art. 1, comma 22.</li>
      </ul>
      <p className="text-sm">Questa guida ha carattere informativo e non costituisce consulenza fiscale.</p>

      <h2>Domande frequenti</h2>
      {faqs.map((f) => (
        <div key={f.q}><h3>{f.q}</h3><p>{f.a}</p></div>
      ))}
    </ContentPage>
  );
}
