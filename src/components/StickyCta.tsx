"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "./Icon";
import { track } from "@/lib/analytics";

interface Props {
  phoneHref?: string;
  whatsappHref?: string;
}

/** Barra mobile discreta: solo i canali realmente configurati. */
export function StickyCta({ phoneHref, whatsappHref }: Props) {
  const pathname = usePathname() ?? "/";
  if (pathname.startsWith("/preventivo") || pathname.startsWith("/admin")) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-stone bg-paper/95 px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-md gap-2">
        {phoneHref && (
          <a
            href={phoneHref}
            onClick={() => track("phone_click", { location: "sticky" })}
            className="btn btn-secondary flex-1 !min-h-11 !px-2 text-sm"
          >
            <Icon name="phone" size={18} /> Chiama
          </a>
        )}
        {whatsappHref && (
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("whatsapp_click", { location: "sticky" })}
            className="btn btn-secondary flex-1 !min-h-11 !px-2 text-sm"
          >
            <Icon name="chat" size={18} /> WhatsApp
          </a>
        )}
        <Link
          href="/preventivo/"
          onClick={() => track("cta_click", { location: "sticky" })}
          className="btn btn-primary flex-[1.4] !min-h-11 text-sm"
        >
          Richiedi preventivo
        </Link>
      </div>
    </div>
  );
}
