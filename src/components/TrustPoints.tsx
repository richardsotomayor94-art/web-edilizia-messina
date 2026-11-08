import { Icon, type IconName } from "./Icon";

const points: { icon: IconName; t: string; d: string }[] = [
  { icon: "check", t: "Gratis e senza impegno", d: "Chi chiede il preventivo non paga nulla e non è obbligato ad accettare." },
  { icon: "users", t: "Pochi contatti, mirati", d: "La richiesta va solo a professionisti locali per quel servizio, non a liste infinite." },
  { icon: "shield", t: "Dati protetti", d: "I tuoi dati sono condivisi solo per gestire la tua richiesta, come spiegato nell'informativa." },
  { icon: "info", t: "Trasparenza", d: "Non siamo un'impresa edile: ti mettiamo in contatto con imprese e artigiani indipendenti." },
];

export function TrustPoints() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {points.map((p) => (
        <li key={p.t} className="flex gap-3">
          <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-sea ring-1 ring-stone">
            <Icon name={p.icon} />
          </span>
          <span>
            <span className="block font-semibold">{p.t}</span>
            <span className="text-sm text-muted">{p.d}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
