import { describe, expect, it } from "vitest";
import { EMPTY_WIZARD, LAST_STEP, WIZARD_STEPS, stepIndexOfField, validateWizardStep } from "@/lib/wizard";

const contact = { ...EMPTY_WIZARD, name: "Anna", phone: "333 1234567", consent_privacy: true };

describe("wizard", () => {
  it("chiede i dati personali solo nell'ultimo step", () => {
    expect(WIZARD_STEPS[LAST_STEP].key).toBe("contact");
    expect(stepIndexOfField("phone")).toBe(LAST_STEP);
    expect(stepIndexOfField("consent_privacy")).toBe(LAST_STEP);
  });

  it("riporta allo step giusto un errore del server", () => {
    expect(WIZARD_STEPS[stepIndexOfField("postal_code")].key).toBe("where");
    expect(WIZARD_STEPS[stepIndexOfField("budget_range")].key).toBe("details");
    expect(stepIndexOfField("inesistente")).toBe(-1);
  });

  it("i dettagli sono sempre facoltativi", () => {
    expect(validateWizardStep("details", EMPTY_WIZARD)).toEqual({});
  });

  it("richiede il consenso privacy per inviare", () => {
    expect(validateWizardStep("contact", { ...contact, consent_privacy: false })).toHaveProperty("consent_privacy");
    expect(validateWizardStep("contact", contact)).toEqual({});
  });

  it("valida il telefono come il server", () => {
    expect(validateWizardStep("contact", { ...contact, phone: "123" })).toHaveProperty("phone");
    expect(validateWizardStep("contact", { ...contact, phone: "+39 090 123456" })).toEqual({});
  });

  it("chiede l'email solo se è il canale preferito", () => {
    expect(validateWizardStep("contact", { ...contact, preferred_contact: "email" })).toHaveProperty("email");
    expect(validateWizardStep("contact", { ...contact, preferred_contact: "email", email: "a@b.it" })).toEqual({});
  });

  it("controlla il CAP solo se indicato", () => {
    expect(validateWizardStep("where", { ...EMPTY_WIZARD, postal_code: "981" })).toHaveProperty("postal_code");
    expect(validateWizardStep("where", EMPTY_WIZARD)).toEqual({});
  });
});
