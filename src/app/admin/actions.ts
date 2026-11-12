"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { sessionClient } from "@/lib/supabase/server";
import { MAX_PARTNERS_PER_LEAD } from "@/config/site";

const STATUSES = ["new", "qualified", "assigned", "contacted", "appointment", "quote_sent", "won", "lost", "invalid", "duplicate"] as const;

export async function signOut() {
  const supabase = await sessionClient();
  await supabase.auth.signOut();
  redirect("/admin/login/");
}

export async function updateLead(formData: FormData) {
  const parsed = z
    .object({
      id: z.uuid(),
      status: z.enum(STATUSES),
      lost_reason: z.string().max(500).optional(),
      job_value: z.string().optional(),
      revenue: z.string().optional(),
    })
    .safeParse(Object.fromEntries(formData));
  if (!parsed.success) return;
  const num = (v?: string) => (v && v.trim() !== "" && !Number.isNaN(Number(v)) ? Number(v) : null);
  const supabase = await sessionClient();
  await supabase
    .from("leads")
    .update({
      status: parsed.data.status,
      lost_reason: parsed.data.lost_reason || null,
      job_value: num(parsed.data.job_value),
      revenue: num(parsed.data.revenue),
    })
    .eq("id", parsed.data.id);
  revalidatePath(`/admin/leads/${parsed.data.id}/`);
}

export async function addNote(formData: FormData) {
  const parsed = z.object({ id: z.uuid(), body: z.string().trim().min(1).max(4000) }).safeParse(Object.fromEntries(formData));
  if (!parsed.success) return;
  const supabase = await sessionClient();
  await supabase.from("lead_notes").insert({ lead_id: parsed.data.id, body: parsed.data.body });
  revalidatePath(`/admin/leads/${parsed.data.id}/`);
}

export async function assignPartner(formData: FormData) {
  const parsed = z
    .object({ id: z.uuid(), partner_id: z.uuid(), price_charged: z.string().optional() })
    .safeParse(Object.fromEntries(formData));
  if (!parsed.success) return;
  const price = parsed.data.price_charged && !Number.isNaN(Number(parsed.data.price_charged)) ? Number(parsed.data.price_charged) : null;
  const supabase = await sessionClient();
  const { count } = await supabase
    .from("lead_assignments")
    .select("id", { count: "exact", head: true })
    .eq("lead_id", parsed.data.id)
    .neq("status", "cancelled");
  // Promessa pubblica: una richiesta va al massimo a MAX_PARTNERS_PER_LEAD professionisti
  if ((count ?? 0) >= MAX_PARTNERS_PER_LEAD) redirect(`/admin/leads/${parsed.data.id}/?errore=limite`);
  await supabase.from("lead_assignments").insert({ lead_id: parsed.data.id, partner_id: parsed.data.partner_id, price_charged: price });
  revalidatePath(`/admin/leads/${parsed.data.id}/`);
}

export async function createPartner(formData: FormData) {
  const parsed = z
    .object({
      business_name: z.string().trim().min(2).max(160),
      contact_name: z.string().trim().max(120).optional(),
      phone: z.string().trim().max(30).optional(),
      email: z.string().trim().max(254).optional(),
      vat_number: z.string().trim().max(20).optional(),
      services: z.string().optional(),
      areas: z.string().optional(),
      max_leads_day: z.string().optional(),
      billing_model: z.enum(["per_lead", "commission", "exclusive_fee", "asset_rent", "none"]).optional(),
      lead_price: z.string().optional(),
      commission_rate: z.string().optional(),
    })
    .safeParse(Object.fromEntries(formData));
  if (!parsed.success) return;
  const d = parsed.data;
  const list = (v?: string) => (v ? v.split(",").map((s) => s.trim()).filter(Boolean) : []);
  const num = (v?: string) => (v && !Number.isNaN(Number(v)) && v.trim() !== "" ? Number(v) : null);
  const supabase = await sessionClient();
  await supabase.from("partners").insert({
    business_name: d.business_name,
    contact_name: d.contact_name || null,
    phone: d.phone || null,
    email: d.email || null,
    vat_number: d.vat_number || null,
    services: list(d.services),
    areas: list(d.areas),
    max_leads_day: num(d.max_leads_day),
    billing_model: d.billing_model ?? null,
    lead_price: num(d.lead_price),
    commission_rate: num(d.commission_rate),
    active: false,
  });
  revalidatePath("/admin/partners/");
}

export async function togglePartner(formData: FormData) {
  const parsed = z.object({ id: z.uuid(), active: z.enum(["true", "false"]) }).safeParse(Object.fromEntries(formData));
  if (!parsed.success) return;
  const supabase = await sessionClient();
  await supabase
    .from("partners")
    .update({ active: parsed.data.active === "true", verified_at: parsed.data.active === "true" ? new Date().toISOString() : undefined })
    .eq("id", parsed.data.id);
  revalidatePath("/admin/partners/");
}
