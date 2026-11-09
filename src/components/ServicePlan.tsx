import type { CSSProperties } from "react";
import { SERVICE_OPTIONS } from "@/lib/lead-options";
import { Icon, type IconName } from "./Icon";
import { TrackedLink } from "./TrackedLink";

const rooms: Record<string, { area: string; icon: IconName; hint?: string; className?: string }> = {
  "ristrutturazione-completa": { area: "completa", icon: "home", hint: "Appartamento o casa intera", className: "plan-wide" },
  bagno: { area: "bagno", icon: "bath" },
  cucina: { area: "cucina", icon: "kitchen" },
  pavimenti: { area: "pavimenti", icon: "floor", className: "plan-door" },
  pittura: { area: "pittura", icon: "roller" },
  cartongesso: { area: "cartongesso", icon: "wall", className: "plan-door" },
  impianti: { area: "impianti", icon: "bolt" },
  facciata: { area: "facciata", icon: "building" },
  altro: { area: "altro", icon: "more" },
};

/** Primo passo del modulo disegnato come la pianta di una casa: ogni stanza è un lavoro. */
export function ServicePlan({ location }: { location: string }) {
  return (
    <ul className="plan">
      {SERVICE_OPTIONS.filter((o) => rooms[o.value]).map((o) => {
        const r = rooms[o.value];
        return (
          <li key={o.value} className={`contents`}>
            <TrackedLink
              href={`/preventivo/?servizio=${o.value}`}
              event="cta_click"
              location={location}
              service={o.value}
              className={`plan-room ${r.className ?? ""}`}
              style={{ "--area": r.area } as CSSProperties}
            >
              <Icon name={r.icon} size={22} className="shrink-0 text-sea" />
              <span>
                {o.label}
                {r.hint && <span className="block text-xs font-normal text-muted">{r.hint}</span>}
              </span>
            </TrackedLink>
          </li>
        );
      })}
    </ul>
  );
}
