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

export default async function GraziePage(props: PageProps<"/preventivo/grazie">) {
  const sp = await props.searchParams;
  const fotoParziale = sp.foto === "parziale";
  return (
    <div className="container-page max-w-2xl py-12 text-center">
      <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-sea-soft text-sea">
        <Icon name="check" size={28} />
      </span>
      <h1 className="mt-5 text-3xl sm:text-4xl">Richiesta inviata, grazie!</h1>
      <p className="mt-4 text-lg text-ink-soft">
        Ora la controlliamo e cerchiamo i professionisti adatti al tuo lavoro e alla tua zona. Se in zona non ce ne sono di disponibili, te lo comunichiamo.
      </p>
      {fotoParziale && (
        <p role="status" className="mt-4 rounded-md border border-stone bg-sand p-3 text-sm">
          La richiesta è arrivata, ma non siamo riusciti a caricare tutte le foto. Potrai mostrarle direttamente al professionista.
        </p>
      )}
      <div className="mt-8 rounded-[var(--radius-card)] border border-stone bg-white p-6 text-left">
        <h2 className="text-lg font-bold">Cosa succede ora</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-ink-soft">
          <li>Controlliamo che la richiesta sia completa: potremmo contattarti per un chiarimento.</li>
          <li>La inoltriamo a un massimo di 3 imprese o artigiani per quel servizio e quella zona.</li>
          <li>Il professionista ti contatta per un sopralluogo e un preventivo scritto.</li>
          <li>Confronti le proposte e decidi liberamente, anche di non accettarne nessuna.</li>
        </ol>
        <p className="mt-4 text-sm text-muted">
          Consiglio: chiedi sempre un preventivo scritto e dettagliato voce per voce e verifica che l&apos;impresa sia iscritta alla Camera di Commercio. Leggi{" "}
          <Link href="/guide/costo-ristrutturazione-casa-messina/" className="underline">come leggere un preventivo</Link>.
        </p>
      </div>
      <Link href="/" className="btn btn-secondary mt-8">Torna alla home</Link>
    </div>
  );
}
