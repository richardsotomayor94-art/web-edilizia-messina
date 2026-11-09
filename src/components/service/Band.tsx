import type { CSSProperties, ReactNode } from "react";
import { DARK_GROUNDS, type Ground, type Seam } from "@/config/service-experience";

/**
 * Sezione del sistema: ogni fondo è una materia (intonaco, calce, travertino, lavica, Stretto, cotto).
 * `prev` è il fondo precedente: serve al taglio ad arco e alla dissolvenza durante lo scorrimento.
 * Senza CSS moderno restano i fondi statici.
 */
export function Band({
  id,
  ground,
  prev,
  seam = "none",
  chapter,
  labelledBy,
  fade = false,
  className = "",
  children,
}: {
  id?: string;
  ground: Ground;
  prev: Ground;
  seam?: Seam;
  chapter?: string;
  labelledBy?: string;
  fade?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const dark = DARK_GROUNDS.includes(ground);
  const style = { "--prev": `var(--g-${prev})` } as CSSProperties;
  return (
    <section id={id} aria-labelledby={labelledBy} data-chapter={chapter} data-dark={dark} className="band cv-auto scroll-mt-16" style={style}>
      <div className={`band-in g-${ground} ${dark ? "on-dark" : ""} ${seam === "door" ? "seam-door" : ""} ${seam === "ruler" ? "seam-ruler" : ""} ${fade ? "band-fade" : ""} ${className}`}>
        {seam === "door" && (
          <svg data-reveal="draw" className="door-arc" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            <path d="M0 0A100 100 0 0 1 100 100" pathLength="1" fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          </svg>
        )}
        {children}
      </div>
    </section>
  );
}

/**
 * Titolo di sezione: `*testo*` diventa corsivo. La divisione in parole per la comparsa
 * avviene solo da desktop, in MotionRoot: su mobile il DOM resta leggero.
 */
export function Title({ text, id, as: Tag = "h2", className = "t-h2" }: { text: string; id?: string; as?: "h2" | "p"; className?: string }) {
  const parts = text.split("*");
  return (
    <Tag id={id} data-reveal="words" className={className}>
      {parts.map((part, i) => (i % 2 ? <em key={i}>{part}</em> : part))}
    </Tag>
  );
}

/** Numero di tavola, come nei disegni di progetto. */
export function Tav({ n, label }: { n: number; label: string }) {
  return (
    <p className="t-label flex items-center gap-3 c-sub">
      <span className="c-accent tabular-nums">Tav. {String(n).padStart(2, "0")}</span>
      <span aria-hidden="true" className="h-px w-8 bg-current opacity-40" />
      <span>{label}</span>
    </p>
  );
}

/** Numero che sale dalla sua maschera. */
export function Num({ value, className = "" }: { value: string; className?: string }) {
  return (
    <span data-reveal="num" className={`t-num ${className}`}>
      <span className="w">
        <span>{value}</span>
      </span>
    </span>
  );
}
