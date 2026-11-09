import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { funnelServiceLabels, servicePages } from "@/config/services";
import { SERVICE_OPTIONS } from "@/lib/lead-options";
import { leadSchema } from "@/lib/lead-schema";

const migrations = readdirSync(join(process.cwd(), "supabase/migrations"))
  .map((f) => readFileSync(join(process.cwd(), "supabase/migrations", f), "utf8"))
  .join("\n");

describe("instradamento dei servizi", () => {
  it.each(servicePages.map((s) => [s.path, s.funnelService]))("%s non finisce in Altro", (_path, service) => {
    expect(service).not.toBe("altro");
  });

  it("ogni landing ha un servizio distinto", () => {
    const all = servicePages.map((s) => s.funnelService);
    expect(new Set(all).size).toBe(all.length);
  });

  it.each(servicePages.map((s) => [s.funnelService]))("%s è selezionabile nel modulo, ha un'etichetta ed esiste nel catalogo", (service) => {
    expect(SERVICE_OPTIONS.some((o) => o.value === service)).toBe(true);
    expect(funnelServiceLabels[service]).toBeTruthy();
    expect(migrations).toContain(`('${service}',`);
    const parsed = leadSchema.shape.service.safeParse(service);
    expect(parsed.success).toBe(true);
  });
});
