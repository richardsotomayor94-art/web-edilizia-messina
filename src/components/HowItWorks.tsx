import { Num } from "./service/Band";

/** Testo del proprietario (2026-11-14). «Ci chiami» tornerà quando ci sarà un numero reale. */
const steps = [
  { t: "Ci scrivi", d: "Con il modulo ci dici che lavoro ti serve, dove e, se puoi, ci mandi una foto." },
  { t: "Cerchiamo l'impresa giusta", d: "Contattiamo un'impresa che esegue proprio quel tipo di lavoro nella tua zona. Se per quel settore non ne abbiamo una, la cerchiamo noi per te." },
  { t: "Ti chiama l'impresa", d: "Fissa con te il sopralluogo, ti fa il preventivo e decidi tu se procedere. Lavoro, fattura e garanzia sono suoi." },
];
export const STEP_COUNT = steps.length;

export function HowItWorks({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <ol className="grid gap-x-8 gap-y-5 sm:grid-cols-3">
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
          <span className="t-step block text-ink"><Num value={String(i + 1).padStart(2, "0")} /></span>
          <h3 className="t-h3 mt-3">{s.t}</h3>
          <p className="mt-2 text-[0.95rem] text-muted">{s.d}</p>
        </li>
      ))}
    </ol>
  );
}
