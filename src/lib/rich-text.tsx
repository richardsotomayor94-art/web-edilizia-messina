import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Testi con link interni nella forma [etichetta](/percorso/).
 * Solo percorsi interni: nessun link esterno può entrare da qui.
 */
const LINK_RE = /\[([^\]]+)\]\((\/[^)\s]*)\)/g;

export function richText(text: string, className = "link"): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK_RE)) {
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push(
      <Link key={`${m.index}-${m[2]}`} href={m[2]} className={className}>
        {m[1]}
      </Link>,
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

/** Stesso testo senza markup: per dati strutturati, meta e conteggi. */
export function plainText(text: string): string {
  return text.replace(LINK_RE, "$1");
}
