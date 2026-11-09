/** Etichetta di sezione: numerata come le tavole di un progetto. */
export function TavLabel({ n, label, dark = false }: { n: string; label: string; dark?: boolean }) {
  return (
    <p className={`t-label flex items-center gap-3 ${dark ? "text-paper/70" : "text-muted"}`}>
      <span className={`tabular-nums ${dark ? "text-cotto-light" : "text-clay-dark"}`}>Tav. {n}</span>
      <span aria-hidden="true" className={`h-px w-8 ${dark ? "bg-paper/40" : "bg-ink/40"}`} />
      <span>{label}</span>
    </p>
  );
}
