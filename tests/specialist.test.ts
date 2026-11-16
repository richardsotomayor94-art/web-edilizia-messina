import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { leadSchema, PARTNER_SERVICES } from "@/lib/lead-schema";
import { EMPTY_WIZARD, SPECIALIST_STEPS, WIZARD_STEPS, stepIndexOfField, stepsFor, validateWizardStep } from "@/lib/wizard";
import { OBJECT_OPTIONS, SPECIALIST_SLUGS, SPECIALIST_STATUS, describeDetails, specialistSlug } from "@/config/specialist";
import { allServicePages, indexableServicePages, isPendingService, specialistPages } from "@/config/services";
import { specialistExperience } from "@/config/specialist-pages";

const base = {
  timeline: "quotes",
  city: "Messina",
  name: "Prova Sintetica",
  phone: "+39 333 1234567",
  consent_privacy: true,
  property_type: "altro",
  square_meters: "unknown",
};
const tomba = { line: "restauro", object: "tomba", material: "marmo", intervention: "pulizia", size: "medio", movable: "no", cemetery: "Gran Camposanto", access: "cappella" };

const migrations = readdirSync(join(process.cwd(), "supabase/migrations"))
  .map((f) => readFileSync(join(process.cwd(), "supabase/migrations", f), "utf8"))
  .join("\n");

describe("servizi specialistici: richiesta", () => {
  it("accetta una richiesta di restauro funerario con i dettagli e fissa immobile e metratura", () => {
    const r = leadSchema.safeParse({ ...base, service: "restauro", property_type: "villa", square_meters: "gt150", budget_range: "gt60k", details: tomba });
    expect(r.success).toBe(true);
    if (!r.success) return;
    expect(r.data.property_type).toBe("altro");
    expect(r.data.square_meters).toBe("unknown");
    expect(r.data.budget_range).toBeUndefined();
    expect(r.data.details?.cemetery).toBe("Gran Camposanto");
  });

  it("toglie cimitero e sepoltura se l'oggetto non è funerario", () => {
    const r = leadSchema.safeParse({ ...base, service: "restauro", details: { ...tomba, object: "porta", material: "legno" } });
    expect(r.success && r.data.details?.cemetery).toBe(undefined);
    expect(r.success && r.data.details?.access).toBe(undefined);
  });

  it("senza dettagli validi la richiesta specialistica è rifiutata sul campo giusto", () => {
    const r = leadSchema.safeParse({ ...base, service: "sabbiatura", details: { line: "sabbiatura", object: "tomba" } });
    expect(r.success).toBe(false);
    if (r.success) return;
    const fields = r.error.issues.map((i) => i.path[0]);
    expect(fields).toContain("object");
    expect(stepIndexOfField("object_type", "sabbiatura")).toBe(SPECIALIST_STEPS.findIndex((s) => s.key === "object"));
  });

  it("i dettagli di una richiesta in casa vengono ignorati", () => {
    const r = leadSchema.safeParse({ ...base, service: "bagno", property_type: "appartamento", square_meters: "lt50", details: tomba });
    expect(r.success && r.data.details).toBe(undefined);
  });

  it("ogni oggetto porta a una sottocategoria del catalogo; il dubbio va alla valutazione generale", () => {
    expect(specialistSlug("restauro", "tomba")).toBe("restauro-funerario");
    expect(specialistSlug("restauro", "mobile")).toBe("restauro-legno");
    expect(specialistSlug("restauro", "altro")).toBe("restauro-valutazione");
    expect(specialistSlug("sabbiatura", "metallo")).toBe("sabbiatura");
    for (const line of ["restauro", "sabbiatura"] as const) for (const o of OBJECT_OPTIONS[line]) expect(migrations).toContain(`('${o.slug}',`);
  });

  it("le imprese possono dichiarare ogni sottocategoria, non la linea generica", () => {
    for (const s of SPECIALIST_SLUGS) expect(PARTNER_SERVICES).toContain(s.slug);
    expect(PARTNER_SERVICES).not.toContain("restauro");
  });

  it("l'area admin mostra i dettagli in chiaro", () => {
    const rows = Object.fromEntries(describeDetails(tomba));
    expect(rows.Oggetto).toMatch(/Tomba/);
    expect(rows.Cimitero).toBe("Gran Camposanto");
    expect(describeDetails(null)).toEqual([]);
  });
});

describe("servizi specialistici: modulo", () => {
  it("il percorso specialistico chiede oggetto, materiale e intervento e finisce con i contatti", () => {
    expect(stepsFor("restauro").map((s) => s.key)).toEqual(["service", "object", "material", "intervention", "dimensions", "timeline", "where", "details", "contact"]);
    expect(stepsFor("bagno")).toBe(WIZARD_STEPS);
    expect(SPECIALIST_STEPS.at(-1)?.key).toBe("contact");
  });

  it("valida le scelte specialistiche, anche «Non lo so»", () => {
    expect(validateWizardStep("material", EMPTY_WIZARD)).toHaveProperty("material");
    expect(validateWizardStep("material", { ...EMPTY_WIZARD, material: "non_so" })).toEqual({});
    expect(validateWizardStep("dimensions", { ...EMPTY_WIZARD, item_size: "medio" })).toHaveProperty("movable");
  });
});

describe("servizi specialistici: pubblicazione", () => {
  const pending = specialistPages.filter(isPendingService);

  it("finché sono in preparazione restano fuori da sitemap e catalogo indicizzabile", async () => {
    expect(Object.values(SPECIALIST_STATUS).every((s) => s === "in_preparazione")).toBe(true);
    const sitemap = (await import("@/app/sitemap")).default();
    for (const s of pending) {
      expect(indexableServicePages).not.toContain(s);
      expect(sitemap.some((e) => new URL(e.url).pathname === s.path)).toBe(false);
    }
  });

  it("ogni landing ha la sua regia, un invito al modulo e le FAQ sullo stato del servizio", () => {
    for (const s of specialistPages) {
      expect(specialistExperience[s.id]).toBeTruthy();
      expect(allServicePages).toContain(s);
      expect(s.faqs.some((f) => /attivo/.test(f.q))).toBe(true);
    }
  });

  it("nessuna promessa non dimostrabile su tecniche, prezzi o specialisti", () => {
    const text = JSON.stringify(specialistPages) + JSON.stringify(specialistExperience);
    const forbidden = [/ecologic/i, /senza residui(?!\?)/i, /tutte le superfici/i, /garantit/i, /leader/i, /unic[oi] a Messina/i, /pochi specialisti/i, /\d+\s?€(?!\s*",)/, /entro \d+ (ore|giorni)/i];
    for (const re of forbidden) {
      const hits = (text.match(new RegExp(re.source, re.flags + "g")) ?? []).filter((h) => !/^0 €/.test(h));
      expect(hits, re.source).toEqual([]);
    }
  });
});
