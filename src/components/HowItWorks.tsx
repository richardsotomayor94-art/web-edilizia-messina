const steps = [
  { t: "Racconti il lavoro", d: "Poche domande su lavoro, immobile, metratura e zona. Se vuoi, aggiungi foto o una piantina." },
  { t: "Verifichiamo la richiesta", d: "Controlliamo che i dati siano completi e cerchiamo professionisti locali per quel servizio e quella zona." },
  { t: "Ti mettiamo in contatto", d: "Con il tuo consenso inoltriamo la richiesta a un massimo di 3 imprese o artigiani. Se in zona non ce ne sono, te lo diciamo." },
  { t: "Scegli tu", d: "Sopralluogo, preventivo scritto e decisione libera. Nessun obbligo e nessun costo per te." },
];

export function HowItWorks({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <ol className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
        {steps.map((s, i) => (
          <li key={s.t} className="border-t border-ink pt-3">
            <span className="font-display text-3xl leading-none text-clay">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-2 !text-[1.45rem]">{s.t}</h3>
            <p className="mt-1 text-[0.95rem] text-muted">{s.d}</p>
          </li>
        ))}
      </ol>
    );
  }
  return (
    <ol className="process">
      <div className="process-fill" aria-hidden="true" />
      {steps.map((s, i) => (
        <li key={s.t} data-reveal style={{ "--i": i } as React.CSSProperties}>
          <span className="t-step block text-ink">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="t-h3 mt-3">{s.t}</h3>
          <p className="mt-2 text-[0.95rem] text-muted">{s.d}</p>
        </li>
      ))}
    </ol>
  );
}
