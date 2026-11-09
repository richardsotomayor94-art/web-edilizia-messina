import { NextResponse } from "next/server";
import { requireStaff } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const COLS = [
  "created_at", "status", "lead_tier", "lead_score", "service", "property_type", "square_meters", "timeline", "budget_range",
  "city", "zone", "postal_code", "name", "phone", "whatsapp", "email", "preferred_contact", "consent_marketing",
  "source", "utm_source", "utm_medium", "utm_campaign", "utm_content", "gclid", "landing_page", "referrer",
  "assigned_partner_id", "job_value", "revenue", "id",
] as const;

function csvCell(v: unknown): string {
  if (v === null || v === undefined) return "";
  let s = String(v);
  // protezione CSV/formula injection in Excel
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return /[",\r\n;]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export async function GET(req: Request) {
  const { supabase, user, isStaff } = await requireStaff();
  if (!user || !isStaff) return new NextResponse("Non autorizzato", { status: 401 });
  const sp = new URL(req.url).searchParams;
  let q = supabase.from("leads").select(COLS.join(",")).order("created_at", { ascending: false }).limit(5000);
  for (const k of ["status", "service", "tier"] as const) {
    const v = sp.get(k);
    if (v) q = q.eq(k === "tier" ? "lead_tier" : k, v);
  }
  const { data, error } = await q;
  if (error) return new NextResponse("Errore", { status: 500 });
  const rows = (data as unknown as Record<string, unknown>[]) ?? [];
  const csv = [COLS.join(";"), ...rows.map((r) => COLS.map((c) => csvCell(r[c])).join(";"))].join("\r\n");
  return new NextResponse("﻿" + csv, {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename="lead-${new Date().toISOString().slice(0, 10)}.csv"`,
      "cache-control": "no-store",
    },
  });
}
