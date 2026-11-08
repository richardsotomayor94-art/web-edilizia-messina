const steps = [
  {
    t: "Descrivi il lavoro",
    d: "Rispondi a poche domande su lavoro, immobile, metratura e zona. Puoi allegare foto o una piantina. Bastano 2 minuti.",
  },
  {
    t: "Verifichiamo la richiesta",
    d: "Controlliamo che i dati siano completi e individuiamo i professionisti locali che coprono quel servizio e quella zona.",
  },
  {
    t: "Vieni ricontattato",
    d: "Con il tuo consenso inoltriamo la richiesta a un numero limitato di imprese o artigiani, che ti contattano per un sopralluogo.",
  },
  {
    t: "Scegli tu",
    d: "Confronti i preventivi e decidi liberamente. Nessun obbligo e nessun costo per te.",
  },
];

export function HowItWorks({ compact = false }: { compact?: boolean }) {
  return (
    <ol className={`grid gap-4 ${compact ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-4"}`}>
      {steps.map((s, i) => (
        <li key={s.t} className="relative rounded-[var(--radius-card)] border border-stone bg-white p-5">
          <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-sea font-semibold text-white">
            {i + 1}
          </span>
          <h3 className="font-sans text-lg font-semibold">{s.t}</h3>
          <p className="mt-1 text-sm text-muted">{s.d}</p>
        </li>
      ))}
    </ol>
  );
}
