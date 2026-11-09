"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/** Vista di una pagina servizio: solo lo slug del servizio, nessun dato personale. */
export function TrackView({ service }: { service: string }) {
  useEffect(() => {
    track("view_service", { service });
  }, [service]);
  return null;
}
