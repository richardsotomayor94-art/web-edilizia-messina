"use client";

import type { ReactNode } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";

export const DEMO_CONTACT_EVENT = "mc360:demo-contact";

/**
 * Link di contatto (telefono, WhatsApp, email). Con recapiti di prova diventa un pulsante
 * che mostra un avviso: non chiama, non apre WhatsApp, non scrive a nessuno.
 */
export function ContactAction({
  href,
  kind,
  demo,
  location,
  service,
  className,
  ariaLabel,
  children,
}: {
  href: string;
  kind: "phone" | "whatsapp" | "email";
  demo: boolean;
  location: string;
  service?: string;
  className?: string;
  ariaLabel?: string;
  children: ReactNode;
}) {
  if (demo) {
    return (
      <button
        type="button"
        className={className}
        aria-label={ariaLabel ? `${ariaLabel} (recapito di prova)` : undefined}
        onClick={() => window.dispatchEvent(new CustomEvent(DEMO_CONTACT_EVENT, { detail: kind }))}
      >
        {children}
      </button>
    );
  }
  const event: AnalyticsEvent = kind === "phone" ? "phone_click" : kind === "whatsapp" ? "whatsapp_click" : "email_click";
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className={className}
      aria-label={ariaLabel}
      onClick={() => track(event, { location, service })}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
