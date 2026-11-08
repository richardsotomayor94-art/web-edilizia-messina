import Link from "next/link";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Icon } from "@/components/Icon";

export const metadata: Metadata = pageMetadata({
  title: "Richiesta inviata",
  description: "Abbiamo ricevuto la tua richiesta di preventivo.",
  path: "/preventivo/grazie/",
  noindex: true,
});

export default function GraziePage() {
  return (
    <div className="container-page max-w-2xl py-14 text-center">
      <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-sea-soft text-sea">
        <Icon name="check" size={28} />
      </span>
      <h1 className="mt-5 text-3xl sm:text-4xl">Richiesta inviata, grazie!</h1>
      <p className="mt-4 text-lg text-ink-soft">
        Verifichiamo la tua richiesta e la inoltriamo ai professionisti locali adatti al tuo lavoro. Di norma vieni
        ricontattato nei giorni lavorativi successivi.
      </p>
      <div className="mt-8 rounded-[var(--radius-card)] border border-stone bg-white p-6 text-left">
        <h2 className="font-sans text-lg font-bold">Cosa succede ora</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-ink-soft">
          <li>Controlliamo che la richiesta sia completa (potremmo contattarti per un chiarimento).</li>
          <li>La inoltriamo a un numero limitato di imprese o artigiani per quel servizio e quella zona.</li>
          <li>Il professionista ti contatta per un sopralluogo e un preventivo scritto.</li>
          <li>Se nella tua zona non abbiamo professionisti disponibili, te lo comunichiamo.</li>
        </ol>
        <p className="mt-4 text-sm text-muted">
          Consiglio: chiedi sempre un preventivo scritto e dettagliato voce per voce e verifica che l&apos;impresa sia
          iscritta alla Camera di Commercio. Leggi <Link href="/guide/costo-ristrutturazione-casa-messina/" className="underline">come leggere un preventivo</Link>.
        </p>
      </div>
      <Link href="/" className="btn btn-secondary mt-8">Torna alla home</Link>
    </div>
  );
}
