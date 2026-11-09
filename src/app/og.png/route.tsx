import { ImageResponse } from "next/og";
import { site } from "@/config/site";

const size = { width: 1200, height: 630 };

export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#1c1b19", padding: 72, fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <svg width="80" height="80" viewBox="0 0 48 48">
            <path d="M8 42V7l16 18L40 7v35" fill="none" stroke="#f1ece2" strokeWidth="5.5" />
            <path d="M24 42V27" stroke="#f1ece2" strokeWidth="2.5" />
            <path d="M24 27a15 15 0 0 1 15 15" fill="none" stroke="#e0703f" strokeWidth="2.5" />
          </svg>
          <div style={{ fontSize: 44, color: "#f1ece2", fontWeight: 700 }}>{site.name}</div>
        </div>
        <div style={{ fontSize: 76, color: "#f1ece2", lineHeight: 1.05, display: "flex" }}>Lavori in casa a Messina</div>
        <div style={{ display: "flex", fontSize: 30, color: "#e0703f" }}>Una sola richiesta, fino a tre professionisti locali</div>
      </div>
    ),
    size,
  );
}
