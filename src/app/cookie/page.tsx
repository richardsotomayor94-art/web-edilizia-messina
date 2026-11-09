import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { ContentPage } from "@/components/ContentPage";
import { ConsentReopenButton } from "@/components/Analytics";

const path = "/cookie/";
const description = `Cookie e tecnologie simili usate da ${site.name}.`;
export const metadata = pageMetadata({ title: "Cookie policy", description, path, noindex: true });

export default function CookiePage() {
  const ga = !!site.analytics.ga4Id;
  return (
    <ContentPage title="Cookie policy" description={description} path={path} crumbs={[{ name: "Home", path: "/" }, { name: "Cookie", path }]}
      intro={<p>Documento in fase di revisione, coerente con la configurazione attuale del sito.</p>}>
      <h2>Strumenti tecnici (sempre attivi)</h2>
      <table>
        <thead><tr><th>Nome</th><th>Tipo</th><th>Finalità</th><th>Durata</th></tr></thead>
        <tbody>
          <tr><td>mc360_attr</td><td>sessionStorage (prima parte)</td><td>Ricordare pagina di ingresso e parametri della campagna per attribuire correttamente la richiesta</td><td>Fino alla chiusura della scheda</td></tr>
          <tr><td>mc360_wizard_draft</td><td>sessionStorage (prima parte)</td><td>Conservare le risposte del modulo se torni indietro</td><td>Fino alla chiusura della scheda o all&apos;invio</td></tr>
          <tr><td>mc360_consent_v1</td><td>localStorage (prima parte)</td><td>Ricordare la tua scelta sui cookie statistici</td><td>Fino alla cancellazione</td></tr>
          <tr><td>sb-* (solo area riservata)</td><td>Cookie tecnico</td><td>Sessione di accesso dello staff</td><td>Sessione</td></tr>
        </tbody>
      </table>
      <h2>Statistiche (solo con consenso)</h2>
      {ga ? (
        <p>
          Con il tuo consenso usiamo Google Analytics 4 con segnali pubblicitari disattivati, per misurare in forma aggregata
          l&apos;uso delle pagine. Non inviamo a Google nome, telefono, email o altri dati del modulo. Senza consenso Google
          Analytics non viene caricato.
        </p>
      ) : (
        <p>Al momento il sito non usa strumenti di statistica o profilazione di terze parti.</p>
      )}
      {ga && <div className="not-prose mt-4"><ConsentReopenButton /></div>}
      <h2>Servizi esterni</h2>
      <p>
        Se attivata, la verifica anti-spam Cloudflare Turnstile viene caricata solo all&apos;ultimo passaggio del modulo di
        richiesta, per distinguere persone e programmi automatici.
      </p>
    </ContentPage>
  );
}
