/**
 * Fonte unica del territorio.
 *
 * Copertura operativa e SEO sono due cose separate:
 *  - `status: "collecting"` = accettiamo richieste, non significa che ci siano partner;
 *  - `seoEnabled` apre una landing solo con copertura reale, domanda misurata e
 *    contenuto proprio (vedi docs/LOCAL-SEO-EXPANSION.md). Oggi solo Messina.
 *
 * Gli slug coincidono con la tabella service_areas: l'instradamento dei lead
 * (CAP/comune → area → servizio → partner) può appoggiarsi qui senza migrazioni.
 * Nomi e CAP verificati il 2026-11-09 sull'elenco ISTAT dei 108 comuni.
 */
export type AreaCluster = "messina" | "jonica" | "milazzese" | "tirrenica" | "nebrodi";

export interface ServiceArea {
  id: string;
  /** Slug in service_areas; assente se l'area non è ancora a catalogo */
  slug?: string;
  name: string;
  municipality: string;
  province: "ME";
  cluster: AreaCluster;
  cap?: string;
  status: "collecting";
  seoEnabled: boolean;
  routingEnabled: boolean;
  coverageVerified: boolean;
  partnerAvailability: "none" | "partial" | "full";
}

function area(a: Pick<ServiceArea, "id" | "name" | "municipality" | "cluster"> & Partial<ServiceArea>): ServiceArea {
  return { province: "ME", status: "collecting", seoEnabled: false, routingEnabled: false, coverageVerified: false, partnerAvailability: "none", ...a };
}

export const CLUSTER_LABELS: Record<AreaCluster, string> = {
  messina: "Messina città",
  jonica: "Riviera Jonica",
  milazzese: "Area del Milazzese",
  tirrenica: "Fascia tirrenica",
  nebrodi: "Costa dei Nebrodi",
};

/** Comuni: l'ordine segue la popolazione, che guida anche i suggerimenti del modulo. */
export const MUNICIPALITIES: ServiceArea[] = [
  area({ id: "messina", slug: "messina", name: "Messina", municipality: "Messina", cluster: "messina", cap: "98121-98168", seoEnabled: true }),
  area({ id: "barcellona-pg", slug: "barcellona-pozzo-di-gotto", name: "Barcellona Pozzo di Gotto", municipality: "Barcellona Pozzo di Gotto", cluster: "milazzese", cap: "98051" }),
  area({ id: "milazzo", slug: "milazzo", name: "Milazzo", municipality: "Milazzo", cluster: "milazzese", cap: "98057" }),
  area({ id: "capo-dorlando", name: "Capo d'Orlando", municipality: "Capo d'Orlando", cluster: "nebrodi", cap: "98071" }),
  area({ id: "patti", name: "Patti", municipality: "Patti", cluster: "tirrenica", cap: "98066" }),
  area({ id: "santagata", name: "Sant'Agata di Militello", municipality: "Sant'Agata di Militello", cluster: "nebrodi", cap: "98076" }),
  area({ id: "taormina", slug: "taormina", name: "Taormina", municipality: "Taormina", cluster: "jonica", cap: "98039" }),
  area({ id: "giardini-naxos", name: "Giardini-Naxos", municipality: "Giardini-Naxos", cluster: "jonica", cap: "98035" }),
  area({ id: "santa-teresa", name: "Santa Teresa di Riva", municipality: "Santa Teresa di Riva", cluster: "jonica", cap: "98028" }),
  area({ id: "villafranca", name: "Villafranca Tirrena", municipality: "Villafranca Tirrena", cluster: "tirrenica", cap: "98049" }),
  area({ id: "rometta", name: "Rometta", municipality: "Rometta", cluster: "tirrenica", cap: "98043" }),
  area({ id: "spadafora", name: "Spadafora", municipality: "Spadafora", cluster: "tirrenica", cap: "98048" }),
  area({ id: "scaletta", name: "Scaletta Zanclea", municipality: "Scaletta Zanclea", cluster: "jonica", cap: "98029" }),
];

/** Zone di Messina presenti in service_areas. "Centro" è un'etichetta descrittiva, non una località. */
export const MESSINA_ZONES: ServiceArea[] = [
  area({ id: "messina-centro", slug: "messina-centro", name: "Centro", municipality: "Messina", cluster: "messina" }),
  area({ id: "ganzirri", slug: "ganzirri", name: "Ganzirri", municipality: "Messina", cluster: "messina" }),
  area({ id: "torre-faro", slug: "torre-faro", name: "Torre Faro", municipality: "Messina", cluster: "messina" }),
  area({ id: "giostra", slug: "giostra", name: "Giostra", municipality: "Messina", cluster: "messina" }),
  area({ id: "tremestieri", slug: "tremestieri", name: "Tremestieri", municipality: "Messina", cluster: "messina" }),
  area({ id: "galati", slug: "galati", name: "Galati", municipality: "Messina", cluster: "messina" }),
];

const normalize = (s: string) => s.trim().toLowerCase();
const bySlug = (list: ServiceArea[]) => new Map(list.filter((a) => a.slug).map((a) => [normalize(a.name), a.slug as string]));

const ZONE_SLUGS = bySlug(MESSINA_ZONES);
ZONE_SLUGS.set("messina centro", "messina-centro");
const CITY_SLUGS = bySlug(MUNICIPALITIES);

/** Area dedotta dal server: il client invia solo testo libero, mai lo slug. */
export function resolveAreaSlug(city: string, zone?: string): string | undefined {
  const z = zone ? normalize(zone) : "";
  if (z && normalize(city) === "messina" && ZONE_SLUGS.has(z)) return ZONE_SLUGS.get(z);
  return CITY_SLUGS.get(normalize(city));
}

export function isKnownMunicipality(city: string): boolean {
  return MUNICIPALITIES.some((m) => normalize(m.name) === normalize(city));
}

/** Comuni per cluster, esclusa Messina (che ha le sue zone). */
export function provinceByCluster(): { cluster: AreaCluster; label: string; names: string[] }[] {
  const order: AreaCluster[] = ["jonica", "milazzese", "tirrenica", "nebrodi"];
  return order.map((cluster) => ({ cluster, label: CLUSTER_LABELS[cluster], names: MUNICIPALITIES.filter((m) => m.cluster === cluster).map((m) => m.name) }));
}
