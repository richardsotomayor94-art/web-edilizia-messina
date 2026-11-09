import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { servicePages } from "@/config/services";
import { LOCAL_GUIDE_PATH } from "@/config/guides";
import { ContentPage } from "@/components/ContentPage";
import { ConversionBlock } from "@/components/ConversionBlock";
import { ProseBreak } from "@/components/ProseBreak";
import { material, media } from "@/config/media";

const path = "/guide/ristrutturare-casa-messina-da-dove-iniziare/";
const title = "Devo ristrutturare casa a Messina: da dove iniziare";
const description = "Devi ristrutturare casa a Messina? Da dove iniziare: stato dell'immobile, budget, pratiche, preventivi e ordine dei lavori, passo dopo passo.";
const updated = "2026-11-09";
export const metadata = pageMetadata({ title: "Ristrutturare casa a Messina: da dove iniziare", description, path, ogType: "article" });

const faqs = [
  { q: "Devo ristrutturare un appartamento a Messina: da dove inizio?", a: "Dallo stato reale dell'immobile: impianti, umidità, solai e documenti. Poi decidi cosa vuoi cambiare e con quale budget, capisci quali pratiche servono e solo a quel punto chiedi preventivi confrontabili." },
  { q: "Viene prima il tecnico o l'impresa?", a: "Se cambi distribuzione, impianti o strutture conviene partire da un tecnico abilitato, che definisce cosa si può fare e quale pratica serve. Se rinnovi solo le finiture puoi partire direttamente dai preventivi." },
  { q: "In che ordine si fanno i lavori?", a: "Di norma: demolizioni, tramezzi, impianti, massetti, intonaci, cartongesso, rivestimenti e pavimenti, infissi e porte, pittura e installazioni finali. L'impresa lo conferma nel cronoprogramma." },
  { q: "Serve un sopralluogo prima di un preventivo?", a: "Per un preventivo affidabile sì: solo vedendo l'immobile si valutano impianti, massetti, accessi e condizioni reali. Una cifra data senza sopralluogo è una stima." },
];

export default function DaDoveIniziareGuide() {
  return (
    <>
      <ContentPage title={title} description={description} path={path} article={{ updated }} faqs={faqs}
        crumbs={[{ name: "Home", path: "/" }, { name: "Guide", path: "/guide/" }, { name: "Da dove iniziare", path }]}
        intro={<p><strong>In breve:</strong> prima di cercare chi fa i lavori, capisci com&apos;è messa la casa, cosa vuoi cambiare e quali pratiche servono. Un preventivo è utile solo se descrive bene il lavoro.</p>}>
        <h2>Capisci com&apos;è messa la casa</h2>
        <p>Prima dei colori e dei pavimenti viene quello che non si vede. Annota cosa sai e cosa non sai:</p>
        <ul>
          <li>età e stato di impianto elettrico, idraulico e gas;</li>
          <li>macchie di umidità, infiltrazioni, crepe;</li>
          <li>planimetria e documenti dell&apos;immobile;</li>
          <li>regolamento di condominio, se ce n&apos;è uno.</li>
        </ul>

        <h2>Decidi cosa vuoi cambiare e il budget</h2>
        <p>
          Separa ciò che è necessario da ciò che ti piacerebbe. Un budget indicativo aiuta chi ti risponde a proporre soluzioni
          realistiche; tieni un margine per gli imprevisti, che in una casa datata emergono spesso a cantiere aperto. Le voci che
          fanno il prezzo sono spiegate nella guida su <Link href="/guide/costo-ristrutturazione-casa-messina/">quanto costa ristrutturare casa a Messina</Link>.
        </p>

        <h2>Capisci quali pratiche servono</h2>
        <p>
          Sostituire finiture e sanitari rientra di norma nell&apos;edilizia libera. Spostare tramezzi o rifare impianti richiede in genere
          una CILA. Se tocchi strutture o prospetti serve un titolo diverso e un progetto. Il riferimento è la guida su <Link href="/guide/cila-quando-serve/">quando serve la CILA</Link>; la
          verifica va sempre fatta da un tecnico abilitato.
        </p>

        <ProseBreak img={media.progetto} insight="Prima si decide sulla carta. Poi si apre il cantiere." />
        <h2>Controlla vincoli e condominio</h2>
        <p>
          Messina è in zona sismica 1: su muri portanti e solai serve sempre un tecnico. Sulla costa e nelle aree tutelate possono
          servire altre autorizzazioni. In condominio verifica orari, comunicazioni e parti comuni. I dettagli sono in <Link href={LOCAL_GUIDE_PATH}>cosa controllare zona per zona</Link>.
        </p>

        <h2>Chiedi preventivi confrontabili</h2>
        <p>
          Descrivi il lavoro nello stesso modo a tutti e chiedi un computo voce per voce. Per un importo affidabile serve un sopralluogo:
          una cifra data senza vedere la casa resta una stima. Puoi partire da una sola <Link href="/preventivo/">richiesta di preventivo</Link>.
        </p>

        <h2>Scegli l&apos;impresa e metti tutto per iscritto</h2>
        <p>
          Controlla visura, DURC e, per gli impianti, l&apos;abilitazione. Fissa in un contratto lavori, tempi e pagamenti. Trovi la lista
          completa in <Link href="/guide/come-scegliere-impresa-edile-messina/">come scegliere un&apos;impresa edile a Messina</Link>. Prima di
          pagare verifica anche le condizioni del <Link href="/guide/bonus-ristrutturazione-2026/">bonus ristrutturazione</Link>.
        </p>

        <ProseBreak img={material.ristrutturazioneGrezzo} insight="Rompere una volta sola: l'ordine dei lavori vale quanto i lavori." />
        <h2>L&apos;ordine dei lavori</h2>
        <ol>
          <li>Demolizioni e smaltimento</li>
          <li>Nuovi tramezzi</li>
          <li>Impianti, finché le pareti sono aperte</li>
          <li>Massetti e intonaci</li>
          <li>Cartongesso e controsoffitti</li>
          <li>Rivestimenti e pavimenti</li>
          <li>Infissi e porte</li>
          <li>Pittura e installazioni finali</li>
        </ol>
        <p>È la sequenza più comune: l&apos;impresa la adatta al cantiere e la indica nel cronoprogramma.</p>

        <h2>Da quale lavoro parti</h2>
        <ul>
          {servicePages.map((s) => (
            <li key={s.id}><Link href={s.path}>{s.cardTitle}</Link>: {s.cardText}</li>
          ))}
        </ul>

        <h2>Domande frequenti</h2>
        {faqs.map((f) => (
          <div key={f.q}>
            <h3>{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}
      </ContentPage>
      <ConversionBlock location="guide_inizio" title="Parti da una *richiesta chiara*." img={media.materia} bring={["Metratura della casa", "Cosa vuoi cambiare", "Foto e piantina, se le hai"]} />
    </>
  );
}
