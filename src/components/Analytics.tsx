"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { captureAttribution } from "@/lib/attribution";

const CONSENT_KEY = "mc360_consent_v1";

function loadGa(id: string) {
  if (document.getElementById("ga4-src")) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", id, { anonymize_ip: true, allow_google_signals: false, allow_ad_personalization_signals: false });
  const s = document.createElement("script");
  s.id = "ga4-src";
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(s);
}

/** Revoca: blocca GA4 anche se già caricato (flag ufficiale ga-disable-<ID>) e cancella i suoi cookie. */
function disableGa(id: string) {
  (window as unknown as Record<string, boolean>)[`ga-disable-${id}`] = true;
  window.__mc360Consent = false;
  const host = location.hostname;
  const domains = ["", host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
  for (const name of document.cookie.split(";").map((c) => c.split("=")[0].trim()).filter((n) => /^_ga(_|$)|^_gid$/.test(n))) {
    for (const d of domains) document.cookie = `${name}=; Max-Age=0; path=/${d ? `; domain=${d}` : ""}`;
  }
}

/**
 * - Cattura l'attribuzione (sempre, solo sessionStorage di prima parte).
 * - GA4 viene caricato SOLO se configurato e SOLO dopo consenso esplicito.
 * - Se GA4 non è configurato, nessun banner (nessun cookie non tecnico).
 */
export function Analytics({ ga4Id }: { ga4Id?: string }) {
  const [choice, setChoice] = useState<"unknown" | "granted" | "denied" | "pending">("pending");

  useEffect(() => {
    captureAttribution();
    if (!ga4Id) return;
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(CONSENT_KEY);
    } catch {
      /* ignore */
    }
    const c = stored === "granted" || stored === "denied" ? stored : "unknown";
    // eslint-disable-next-line react-hooks/set-state-in-effect -- lettura one-shot di localStorage al mount
    setChoice(c);
    if (c === "granted") {
      (window as unknown as Record<string, boolean>)[`ga-disable-${ga4Id}`] = false;
      window.__mc360Consent = true;
      loadGa(ga4Id);
    } else if (c === "denied") {
      disableGa(ga4Id);
    }
    const reopen = () => setChoice("unknown");
    window.addEventListener("mc360:open-consent", reopen);
    return () => window.removeEventListener("mc360:open-consent", reopen);
  }, [ga4Id]);

  if (!ga4Id || choice !== "unknown") return null;

  const decide = (v: "granted" | "denied") => {
    try {
      localStorage.setItem(CONSENT_KEY, v);
    } catch {
      /* ignore */
    }
    setChoice(v);
    if (v === "granted") {
      (window as unknown as Record<string, boolean>)[`ga-disable-${ga4Id}`] = false;
      window.__mc360Consent = true;
      loadGa(ga4Id);
    } else {
      disableGa(ga4Id);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="consent-title"
      className="fixed inset-x-3 bottom-20 z-50 mx-auto max-w-xl rounded-[var(--radius-card)] border border-stone bg-white p-4 shadow-xl lg:bottom-4"
    >
      <h2 id="consent-title" className="font-sans text-base font-bold">
        Statistiche anonime
      </h2>
      <p className="mt-1 text-sm text-ink-soft">
        Usiamo cookie tecnici necessari al funzionamento. Con il tuo consenso useremmo anche Google Analytics per capire quali
        pagine sono utili. Puoi cambiare idea in qualsiasi momento dalla <Link href="/cookie/" className="underline">cookie policy</Link>.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" className="btn btn-secondary !min-h-10 flex-1" onClick={() => decide("denied")}>
          Rifiuta
        </button>
        <button type="button" className="btn btn-sea !min-h-10 flex-1" onClick={() => decide("granted")}>
          Accetta statistiche
        </button>
      </div>
    </div>
  );
}

export function ConsentReopenButton() {
  return (
    <button
      type="button"
      className="btn btn-secondary"
      onClick={() => {
        try {
          localStorage.removeItem(CONSENT_KEY);
        } catch {
          /* ignore */
        }
        window.dispatchEvent(new Event("mc360:open-consent"));
      }}
    >
      Modifica preferenze cookie
    </button>
  );
}
