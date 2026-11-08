"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";

interface Props {
  href: string;
  event: AnalyticsEvent;
  location: string;
  service?: string;
  className?: string;
  children: ReactNode;
  external?: boolean;
  ariaLabel?: string;
}

/** Link con evento analytics (senza PII). */
export function TrackedLink({ href, event, location, service, className, children, external, ariaLabel }: Props) {
  const onClick = () => track(event, { location, service });
  if (external || href.startsWith("tel:") || href.startsWith("https://wa.me")) {
    return (
      <a
        href={href}
        className={className}
        onClick={onClick}
        aria-label={ariaLabel}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
