import { describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));
const { formatTelegramMessage } = await import("@/lib/notify");

describe("notifica Telegram", () => {
  const lead = {
    id: "00000000-0000-4000-8000-000000000001",
    service: "ristrutturazione-bagno" as never,
    zone: "Centro",
    city: "Messina",
    tier: "hot",
    attachments: 2,
    // campi personali che NON devono finire su Telegram
    name: "Mario Rossi",
    phone: "+393331234567",
    description: "Bagno al secondo piano, via Garibaldi 10",
  };

  it("non contiene nome, telefono né descrizione", () => {
    const text = formatTelegramMessage(lead);
    expect(text).not.toContain("Mario");
    expect(text).not.toContain("333");
    expect(text).not.toContain("Garibaldi");
  });

  it("contiene lavoro, zona e il collegamento all'area riservata", () => {
    const text = formatTelegramMessage(lead);
    expect(text).toContain("Zona: Centro");
    expect(text).toContain(`/admin/leads/${lead.id}/`);
  });
});
