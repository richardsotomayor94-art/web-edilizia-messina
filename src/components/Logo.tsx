/**
 * Marchio: una M tracciata come muro di una pianta, con al centro il simbolo
 * architettonico della porta aperta. Quattro archi così fanno i 360 del nome.
 */
export function LogoMark({ size = 34, arc = "var(--color-clay)" }: { size?: number; arc?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <path d="M8 42V7l16 18L40 7v35" fill="none" stroke="currentColor" strokeWidth="5.5" />
      <path d="M24 42V27" stroke="currentColor" strokeWidth="2.5" />
      <path d="M24 27a15 15 0 0 1 15 15" fill="none" stroke={arc} strokeWidth="2.5" />
    </svg>
  );
}

/** Marchio + logotipo: "Messina" corsivo è la firma ricorrente del brand. */
export function Wordmark({ size = 34, onDark = false, className = "" }: { size?: number; onDark?: boolean; className?: string }) {
  const accent = onDark ? "#f0c070" : "var(--color-clay)";
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <LogoMark size={size} arc={accent} />
      <span className="flex items-start font-display leading-none tracking-[-0.01em]" style={{ fontSize: size * 0.82 }}>
        <em>Messina</em>Casa
        <span className="ml-0.5 mt-[0.1em] font-sans text-[0.34em] font-semibold tracking-[0.02em]" style={{ color: accent }}>360</span>
      </span>
    </span>
  );
}
