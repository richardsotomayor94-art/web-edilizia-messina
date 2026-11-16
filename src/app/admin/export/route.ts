import { NextResponse } from "next/server";
import { requireStaff } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const COLS = [
  "created_at", "status", "lead_tier", "lead_score", "service", "property_type", "square_meters", "timeline", "budget_range", "details",
  "city", "zone", "postal_code", "name", "phone", "whatsapp", "email", "preferred_contact", "consent_marketing",
  "source", "utm_source", "utm_medium", "utm_campaign", "utm_content", "gclid", "landing_page", "referrer",
  "assigned_partner_id", "job_value", "revenue", "id",
] as const;

function csvCell(v: unknown): string {
  if (v === null || v === undefined) return "";
  // Dettagli dei servizi specialistici: JSON leggibile in una cella
  let s = typeof v === "object" ? JSON.stringify(v) : String(v);
  // protezione CSV/formula injection in Excel
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return /[",\r\n;]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export async function GET(req: Request) {
  const { supabase, user, isStaff } = await requireStaff();
  if (!user || !isStaff) return new NextResponse("Non autorizzato", { status: 401 });
  const sp = new URL(req.url).searchParams;
  const query = (cols: readonly string[]) => {
    let q = supabase.from("leads").select(cols.join(",")).order("created_at", { ascending: false }).limit(5000);
    for (const k of ["status", "service", "tier"] as const) {
      const v = sp.get(k);
      if (v) q = q.eq(k === "tier" ? "lead_tier" : k, v);
    }
    return q;
  };
  let { data, error } = await query(COLS);
  // Database senza la colonna dei servizi specialistici (migrazione 20261115000004 non ancora applicata)
  if (error?.code === "42703") ({ data, error } = await query(COLS.filter((c) => c !== "details")));
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
