import Link from "next/link";
import { servicePages, extraFunnelServices } from "@/config/services";
import { Icon } from "./Icon";

export function ServiceGrid({ exclude }: { exclude?: string }) {
  const items = servicePages.filter((s) => s.id !== exclude);
  return (
    <div>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((s) => (
          <li key={s.id}>
            <Link
              href={s.path}
              className="group flex h-full flex-col rounded-[var(--radius-card)] border border-stone bg-white p-5 transition hover:border-sea hover:shadow-md"
            >
              <span className="flex items-center justify-between">
                <span className="font-display text-xl">{s.cardTitle}</span>
                <Icon name="arrow" className="text-sea transition group-hover:translate-x-1" />
              </span>
              <span className="mt-2 text-sm text-muted">{s.cardText}</span>
            </Link>
          </li>
        ))}
      </ul>
      {!exclude && (
        <p className="mt-4 text-sm text-muted">
          Raccogliamo richieste anche per{" "}
          {extraFunnelServices
            .filter((e) => e.value !== "altro")
            .map((e) => e.label.toLowerCase())
            .join(", ")}
          : sceglile nel <Link href="/preventivo/" className="underline">modulo di richiesta</Link>. Ti diremo con
          trasparenza se in zona abbiamo professionisti disponibili.
        </p>
      )}
    </div>
  );
}
