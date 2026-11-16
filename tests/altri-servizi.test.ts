import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { NEW_CATEGORY_VALUES, SPECIALIST_STATUS } from "@/config/specialist";
import { SERVICE_CATALOG, matchService, preventivoHref } from "@/config/service-catalog";
import { allServicePages, indexableServicePages, serviceLabel, specialistPages } from "@/config/services";
import { specialistExperience } from "@/config/specialist-pages";
import { SERVICE_OPTIONS } from "@/lib/lead-options";
import { leadSchema, PARTNER_SERVICES } from "@/lib/lead-schema";
import { stepsFor } from "@/lib/wizard";

const migrations = readdirSync(join(process.cwd(), "supabase/migrations"))
  .map((f) => readFileSync(join(process.cwd(), "supabase/migrations", f), "utf8"))
  .join("\n");

const base = { timeline: "quotes", city: "Messina", name: "Prova Sintetica", phone: "+39 333 1234567", consent_privacy: true };
const surface = (line: string) => ({ line, object: "metallo", material: "metallo", condition: line === "microsabbiatura" ? "ossidi" : "ruggine", intervention: "pulizia", size: "non_so", movable: "no" });
const payload = (v: string) =>
  v === "sabbiatura" || v === "microsabbiatura"
    ? { ...base, service: v, property_type: "altro", square_meters: "unknown", details: surface(v) }
    : { ...base, service: v, property_type: "appartamento", square_meters: "50_100" };

describe("le 8 categorie concordate", () => {
  it("sono esattamente otto, tutte in preparazione", () => {
    expect(NEW_CATEGORY_VALUES).toEqual([
      "sabbiatura",
      "microsabbiatura",
      "traslochi",
      "sgomberi-smaltimento",
      "giardinaggio",
      "restauro-tecnico",
      "restauro-conservativo",
      "risanamento-conservazione",
    ]);
    for (const v of NEW_CATEGORY_VALUES) expect(SPECIALIST_STATUS[v]).toBe("in_preparazione");
  });

  it.each(NEW_CATEGORY_VALUES.map((v) => [v]))("%s: landing, CTA, modulo, validazione, database, admin e partner", (v) => {
    const page = allServicePages.find((p) => p.funnelService === v);
    expect(page, "landing").toBeTruthy();
    expect(page!.path).toBe(`/${v}-messina/`);
    expect(preventivoHref(page!.funnelService)).toBe(`/preventivo/?servizio=${v}`);
    expect(SERVICE_OPTIONS.some((o) => o.value === v), "selezionabile nel modulo").toBe(true);
    expect(stepsFor(v).at(-1)?.key).toBe("contact");
    expect(leadSchema.safeParse(payload(v)).success, "validazione del server").toBe(true);
    expect(migrations, "riga nel catalogo del database").toContain(`('${v}',`);
    expect(serviceLabel(v)).not.toBe(v);
    expect(PARTNER_SERVICES).toContain(v);
    expect(specialistExperience[page!.id], "regia della landing").toBeTruthy();
  });

  it("restano fuori da sitemap e catalogo indicizzabile finché sono in preparazione", () => {
    for (const v of NEW_CATEGORY_VALUES) expect(indexableServicePages.some((p) => p.funnelService === v)).toBe(false);
  });

  it("nessuna landing nuova copia title, H1 o descrizione di un'altra", () => {
    for (const k of ["title", "h1", "metaDescription", "lead", "answer"] as const) {
      const values = allServicePages.map((p) => p[k]);
      expect(new Set(values).size, k).toBe(values.length);
    }
  });

  it("le pagine dei servizi extra non hanno la stessa sequenza di sezioni", () => {
    const seqs = specialistPages.filter((p) => NEW_CATEGORY_VALUES.includes(p.funnelService as never) && p.id !== "sabbiatura").map((p) => specialistExperience[p.id].sections.map((s) => s.key).join(">"));
    expect(new Set(seqs).size).toBeGreaterThanOrEqual(4);
  });
});

describe("catalogo per il futuro chatbot", () => {
  it.each([
    ["Mi serve una sabbiatura", "sabbiatura"],
    ["Cerco un servizio di microsabbiatura", "microsabbiatura"],
    ["Devo fare un trasloco", "traslochi"],
    ["Devo svuotare un appartamento", "sgomberi-smaltimento"],
    ["Devo sistemare il giardino", "giardinaggio"],
    ["Mi serve un restauro tecnico", "restauro-tecnico"],
    ["Devo fare un restauro conservativo", "restauro-conservativo"],
    ["Mi serve un intervento di risanamento e conservazione", "risanamento-conservazione"],
  ])("«%s» → %s", (text, value) => {
    expect(matchService(text)?.value).toBe(value);
  });

  it("se non riconosce il bisogno non indovina", () => {
    expect(matchService("buongiorno, vorrei un'informazione")).toBeUndefined();
  });

  it("ogni voce del catalogo è un valore accettato dal modulo e ogni landing esiste", () => {
    for (const e of SERVICE_CATALOG) {
      expect(SERVICE_OPTIONS.some((o) => o.value === e.value) || e.value === "opere-murarie", e.value).toBe(true);
      if (e.path) expect(allServicePages.some((p) => p.path === e.path), e.path).toBe(true);
    }
  });
});
