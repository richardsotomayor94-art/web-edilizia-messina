import type { ReactNode } from "react";
import { Icon, type IconName } from "../Icon";

/**
 * Scelta con un tocco. Sono pulsanti (non radio ARIA) perché ogni tocco fa
 * avanzare il modulo: con Tab + Invio la tastiera funziona senza scorciatoie.
 */
export function ChoiceGroup({
  name,
  labelledBy,
  options,
  value,
  onChoose,
  error,
  icons,
  columns = 2,
}: {
  name: string;
  labelledBy: string;
  /** `wide`: la voce occupa tutta la riga (testi lunghi), così le altre restano a coppie della stessa misura */
  options: readonly { value: string; label: string; hint?: string; wide?: boolean }[];
  value: string;
  onChoose: (v: string) => void;
  error?: string;
  icons?: Record<string, IconName>;
  columns?: 1 | 2;
}) {
  return (
    <div>
      {/* Righe tutte alte uguali; sotto i 360 px una colonna sola, così nessuna parola esce dal riquadro */}
      <div role="group" aria-labelledby={labelledBy} aria-describedby={error ? `e-${name}` : undefined} className={`grid auto-rows-fr gap-2 ${columns === 2 ? "min-[360px]:grid-cols-2" : ""}`}>
        {options.map((o, i) => {
          const selected = value === o.value;
          const lastAlone = columns === 2 && !o.wide && i === options.length - 1 && options.filter((x) => !x.wide).length % 2 === 1;
          return (
            <button
              key={o.value}
              id={i === 0 ? `f-${name}` : undefined}
              type="button"
              aria-pressed={selected}
              onClick={() => onChoose(o.value)}
              className={`tile ${selected ? "tile-on" : ""} ${columns === 2 && (o.wide || lastAlone) ? "min-[360px]:col-span-2" : ""}`}
            >
              {icons?.[o.value] && <Icon name={icons[o.value]} size={22} strokeWidth={1.5} className="shrink-0 text-clay" />}
              <span className="min-w-0 flex-1 [overflow-wrap:break-word]">
                <span className="block font-semibold leading-tight">{o.label}</span>
                {o.hint && <span className="mt-0.5 block text-xs text-muted">{o.hint}</span>}
              </span>
              {selected && <Icon name="check" size={18} className="shrink-0 text-clay" />}
            </button>
          );
        })}
      </div>
      {error && <FieldError id={`e-${name}`}>{error}</FieldError>}
    </div>
  );
}

export function Field({
  id,
  label,
  hint,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={`f-${id}`} className="block text-sm font-semibold">
        {label} {hint && <span className="font-normal text-muted">({hint})</span>}
      </label>
      <div className="mt-1">{children}</div>
      {error && <FieldError id={`e-${id}`}>{error}</FieldError>}
    </div>
  );
}

export function FieldError({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-1.5 text-sm font-medium text-err">
      {children}
    </p>
  );
}
