/** Avanzamento circolare del modulo: il "360" del marchio applicato al percorso. */
export function ProgressRing({ value, total, size = 56 }: { value: number; total: number; size?: number }) {
  const r = 22;
  const c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox="0 0 52 52" aria-hidden="true" className="shrink-0">
      <circle cx="26" cy="26" r={r} fill="none" stroke="var(--color-stone)" strokeWidth="2" />
      <circle className="ring-arc" cx="26" cy="26" r={r} fill="none" stroke="var(--color-clay)" strokeWidth="2.5" strokeDasharray={c} strokeDashoffset={c * (1 - value / total)} transform="rotate(-90 26 26)" />
      <text x="26" y="32" textAnchor="middle" fontSize="18" fontFamily="var(--font-editorial)" fill="currentColor">{value}</text>
    </svg>
  );
}
