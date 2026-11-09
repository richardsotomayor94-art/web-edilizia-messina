const steps = [
  {
    t: "Descrivi il lavoro",
    d: "Poche domande su lavoro, immobile, metratura e zona. Se vuoi, aggiungi foto o una piantina.",
  },
  {
    t: "Verifichiamo la richiesta",
    d: "Controlliamo che i dati siano completi e cerchiamo professionisti locali per quel servizio e quella zona.",
  },
  {
    t: "Ti mettiamo in contatto",
    d: "Con il tuo consenso inoltriamo la richiesta a un massimo di 3 imprese o artigiani. Se in zona non ce ne sono, te lo diciamo.",
  },
  {
    t: "Scegli tu",
    d: "Sopralluogo, preventivo scritto e decisione libera. Nessun obbligo e nessun costo per te.",
  },
];

export function HowItWorks({ compact = false }: { compact?: boolean }) {
  return (
    <ol className={`grid gap-x-8 gap-y-6 ${compact ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-4"}`}>
      {steps.map((s, i) => (
        <li key={s.t} className="border-t-2 border-ink pt-3">
          <span className="text-sm font-bold text-clay">Passo {i + 1}</span>
          <h3 className="mt-1 text-lg font-bold">{s.t}</h3>
          <p className="mt-1 text-[0.95rem] text-muted">{s.d}</p>
        </li>
      ))}
    </ol>
  );
}
