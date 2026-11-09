import { describe, expect, it } from "vitest";
import { MESSINA_ZONES, MUNICIPALITIES, isKnownMunicipality, provinceByCluster, resolveAreaSlug } from "@/config/areas";

describe("aree", () => {
  it("apre la SEO solo per Messina", () => {
    expect(MUNICIPALITIES.filter((m) => m.seoEnabled).map((m) => m.id)).toEqual(["messina"]);
    expect(MESSINA_ZONES.some((z) => z.seoEnabled)).toBe(false);
  });

  it("non dichiara copertura o partner non verificati", () => {
    for (const a of [...MUNICIPALITIES, ...MESSINA_ZONES]) {
      expect(a.coverageVerified).toBe(false);
      expect(a.partnerAvailability).toBe("none");
    }
  });

  it("risolve zona e comune sul server", () => {
    expect(resolveAreaSlug("Messina", "Ganzirri")).toBe("ganzirri");
    expect(resolveAreaSlug("messina", "centro")).toBe("messina-centro");
    expect(resolveAreaSlug("Messina", "zona sconosciuta")).toBe("messina");
    expect(resolveAreaSlug(" Milazzo ")).toBe("milazzo");
  });

  it("ignora chiavi ereditate e comuni fuori catalogo", () => {
    expect(resolveAreaSlug("constructor")).toBeUndefined();
    expect(isKnownMunicipality("constructor")).toBe(false);
    expect(resolveAreaSlug("Patti")).toBeUndefined(); // comune noto ma non ancora in service_areas
    expect(isKnownMunicipality("Patti")).toBe(true);
  });

  it("raggruppa la provincia senza Messina", () => {
    const names = provinceByCluster().flatMap((c) => c.names);
    expect(names).not.toContain("Messina");
    expect(names).toContain("Taormina");
  });
});
