/**
 * Marchio: una M tracciata come muro di una pianta, con al centro il simbolo
 * architettonico della porta aperta. Quattro archi così fanno i 360 del nome.
 * Le classi lm-* permettono l'intro: tratto della M, porta che si apre, logotipo.
 */
export function LogoMark({ size = 34, arc = "var(--color-clay)" }: { size?: number; arc?: string }) {
  return (
    <svg className="lm" width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <path className="lm-m" d="M8 42V7l16 18L40 7v35" pathLength="1" fill="none" stroke="currentColor" strokeWidth="5.5" />
      <path className="lm-leaf" d="M24 42V27" stroke="currentColor" strokeWidth="2.5" />
      <path className="lm-arc" d="M24 27a15 15 0 0 1 15 15" pathLength="1" fill="none" stroke={arc} strokeWidth="2.5" />
    </svg>
  );
}

/** Marchio + logotipo: "Messina" corsivo è la firma ricorrente del brand. */
export function Wordmark({ size = 34, onDark = false, className = "" }: { size?: number; onDark?: boolean; className?: string }) {
  const accent = onDark ? "#f0c070" : "var(--color-clay)";
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <LogoMark size={size} arc={accent} />
      <span className="lm-word flex items-start font-display leading-none tracking-[-0.01em]" style={{ fontSize: size * 0.82 }}>
        <em>Messina</em>Casa
        <span className="ml-0.5 mt-[0.1em] font-sans text-[0.34em] font-semibold tracking-[0.02em]" style={{ color: accent }}>360</span>
      </span>
    </span>
  );
}
