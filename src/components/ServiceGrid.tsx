import Link from "next/link";
import { servicePages, extraFunnelServices } from "@/config/services";
import { Icon, type IconName } from "./Icon";

const icons: Record<string, IconName> = {
  ristrutturazioni: "home",
  bagno: "bath",
  cucina: "kitchen",
  cartongesso: "wall",
  imbianchino: "roller",
  impianti: "bolt",
  pavimenti: "floor",
};

export function ServiceGrid() {
  const others = extraFunnelServices.filter((e) => e.value !== "altro").map((e) => e.label.toLowerCase()).join(", ");
  return (
    <div>
      <ul className="grid gap-x-10 border-b border-stone md:grid-cols-2">
        {servicePages.map((s) => (
          <li key={s.id} className="border-t border-stone">
            <Link href={s.path} className="group flex h-full items-start gap-4 py-5">
              <Icon name={icons[s.id] ?? "hammer"} size={26} className="mt-0.5 shrink-0 text-sea" />
              <span className="min-w-0 flex-1">
                <span className="block text-xl font-bold group-hover:underline">{s.cardTitle}</span>
                <span className="mt-1 block text-[0.95rem] text-muted">{s.cardText}</span>
              </span>
              <Icon name="arrow" className="mt-1 shrink-0 text-clay transition-transform group-hover:translate-x-1" />
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-muted">
        Raccogliamo richieste anche per {others}: sceglile nel{" "}
        <Link href="/preventivo/" className="underline">modulo di richiesta</Link>.
      </p>
    </div>
  );
}
