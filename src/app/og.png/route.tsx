import { ImageResponse } from "next/og";
import { site } from "@/config/site";


const size = { width: 1200, height: 630 };


export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#0a3540", padding: 72, fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 72, height: 72, borderRadius: 16, background: "#b4472f", display: "flex" }} />
          <div style={{ fontSize: 44, color: "#ffffff", fontWeight: 700 }}>{site.name}</div>
        </div>
        <div style={{ fontSize: 66, color: "#ffffff", lineHeight: 1.1, display: "flex" }}>
          Ristrutturazioni e lavori in casa a Messina
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#f3c262" }}>
          Una richiesta, professionisti locali · gratis e senza impegno
        </div>
      </div>
    ),
    size,
  );
}
