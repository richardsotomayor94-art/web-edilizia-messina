"use client";

import { createClient } from "@supabase/supabase-js";

export interface PreparedFile {
  name: string;
  blob: Blob;
  ext: string;
  type: string;
}

const MAX_DIM = 2000;

/** Ridimensiona/comprime le immagini decodificabili dal browser (JPEG/PNG/WebP). */
export async function prepareFile(file: File): Promise<PreparedFile> {
  const lower = file.name.toLowerCase();
  const extFromName = lower.split(".").pop() ?? "";
  if (["image/jpeg", "image/png", "image/webp"].includes(file.type) && typeof createImageBitmap === "function") {
    try {
      const bmp = await createImageBitmap(file);
      const scale = Math.min(1, MAX_DIM / Math.max(bmp.width, bmp.height));
      const w = Math.round(bmp.width * scale);
      const h = Math.round(bmp.height * scale);
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(bmp, 0, 0, w, h);
        const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/jpeg", 0.82));
        // la ricodifica rimuove anche i metadati EXIF (es. posizione GPS)
        if (blob && blob.size < file.size) return { name: file.name, blob, ext: "jpg", type: "image/jpeg" };
      }
    } catch {
      /* fallback: file originale */
    }
  }
  const ext = file.type === "application/pdf" ? "pdf" : file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : file.type.startsWith("image/hei") ? (extFromName === "heif" ? "heif" : "heic") : "jpg";
  return { name: file.name, blob: file, ext, type: file.type };
}

/**
 * Upload diretto nel bucket PRIVATO "lead-uploads".
 * La policy RLS consente l'INSERT solo nel percorso <leadId>/<token>/ con
 * token valido 30 minuti; nessuna lettura pubblica. Poi il server registra
 * gli allegati verificandone l'esistenza.
 */
export async function uploadLeadFiles(leadId: string, token: string, files: PreparedFile[]): Promise<number> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return 0;
  const supabase = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  let ok = 0;
  for (let i = 0; i < files.length; i++) {
    const f = files[i];
    const path = `${leadId}/${token}/file-${i + 1}.${f.ext}`;
    const { error } = await supabase.storage.from("lead-uploads").upload(path, f.blob, { contentType: f.type, upsert: false });
    if (!error) ok++;
  }
  if (ok > 0) {
    await fetch("/api/leads/attachments/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ leadId, token }),
    }).catch(() => undefined);
  }
  return ok;
}
