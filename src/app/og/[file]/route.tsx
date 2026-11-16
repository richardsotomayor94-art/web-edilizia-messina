import { ImageResponse } from "next/og";
import { site } from "@/config/site";
import { allServicePages } from "@/config/services";
import { GROUP_LABELS, SERVICE_CATALOG } from "@/config/service-catalog";

/**
 * Immagine social di ogni servizio (WhatsApp, Facebook, LinkedIn, X): stesso stile di /og.png,
 * con il nome del servizio e il suo gruppo, così ogni pagina condivisa si riconosce da sola.
 * Generata al build: /og/<id>.png per ogni landing, nessuna funzione a ogni richiesta.
 */
const size = { width: 1200, height: 630 };

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return allServicePages.map((s) => ({ file: `${s.id}.png` }));
}

export async function GET(_req: Request, ctx: RouteContext<"/og/[file]">) {
  const { file } = await ctx.params;
  const s = allServicePages.find((p) => `${p.id}.png` === file);
  if (!s) return new Response("Not found", { status: 404 });
  const group = SERVICE_CATALOG.find((e) => e.value === s.funnelService)?.group;
  const title = `${s.cardTitle} a ${site.city}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#1c1b19", padding: 72, fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="64" height="64" viewBox="0 0 48 48">
            <path d="M8 42V7l16 18L40 7v35" fill="none" stroke="#f1ece2" strokeWidth="5.5" />
            <path d="M24 42V27" stroke="#f1ece2" strokeWidth="2.5" />
            <path d="M24 27a15 15 0 0 1 15 15" fill="none" stroke="#e0703f" strokeWidth="2.5" />
          </svg>
          <div style={{ fontSize: 36, color: "#f1ece2", fontWeight: 700 }}>{site.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          {group && <div style={{ display: "flex", fontSize: 26, letterSpacing: 4, textTransform: "uppercase", color: "#e0703f" }}>{GROUP_LABELS[group]}</div>}
          <div style={{ display: "flex", fontSize: title.length > 34 ? 66 : 80, color: "#f1ece2", lineHeight: 1.05 }}>{title}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 28, color: "rgba(241,236,226,0.8)" }}>
          <div style={{ display: "flex", width: 56, height: 3, background: "#e0703f" }} />
          {"Una sola richiesta, gratuita · un professionista della zona"}
        </div>
      </div>
    ),
    size,
  );
}
