"use client";

import { useEffect, useState } from "react";
import { DEMO_CONTACT_EVENT } from "./ContactAction";

const LABEL = { phone: "il numero di telefono", whatsapp: "il numero WhatsApp", email: "l'indirizzo email" } as const;

/** Avviso dei recapiti di prova e contrassegno della versione dimostrativa. Solo in demo. */
export function DemoNotice() {
  const [kind, setKind] = useState<keyof typeof LABEL | null>(null);

  useEffect(() => {
    const on = (e: Event) => setKind(((e as CustomEvent).detail as keyof typeof LABEL) ?? "phone");
    window.addEventListener(DEMO_CONTACT_EVENT, on);
    return () => window.removeEventListener(DEMO_CONTACT_EVENT, on);
  }, []);

  useEffect(() => {
    if (!kind) return;
    const t = window.setTimeout(() => setKind(null), 7000);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setKind(null);
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [kind]);

  return (
    <aside aria-label="Avvisi della versione dimostrativa">
      <div role="status" aria-live="polite" className="demo-toast" data-open={!!kind}>
        {kind && (
          <>
            <p>
              <strong>Recapito di prova.</strong> In questa versione dimostrativa {LABEL[kind]} non è reale: nessuna chiamata o messaggio viene inviato.
            </p>
            <button type="button" onClick={() => setKind(null)} className="demo-toast-close" aria-label="Chiudi avviso">
              ×
            </button>
          </>
        )}
      </div>
    </aside>
  );
}
