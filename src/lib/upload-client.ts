"use client";

export interface PreparedFile {
  name: string;
  blob: Blob;
  ext: string;
  type: string;
}

const MAX_DIM = 2000;

/**
 * Ricodifica ogni immagine in JPEG: oltre a ridurre il peso elimina i metadati
 * EXIF, compresa la posizione GPS. Se il browser non riesce a decodificarla
 * (es. HEIC su Chrome desktop) restituisce null: meglio rifiutare il file che
 * caricarlo con la posizione dentro.
 */
async function reencodeImage(file: File): Promise<Blob | null> {
  if (typeof createImageBitmap !== "function") return null;
  try {
    const bmp = await createImageBitmap(file);
    const scale = Math.min(1, MAX_DIM / Math.max(bmp.width, bmp.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bmp.width * scale);
    canvas.height = Math.round(bmp.height * scale);
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    // JPEG non ha trasparenza: senza fondo bianco una planimetria PNG diventerebbe nera
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bmp, 0, 0, canvas.width, canvas.height);
    return await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/jpeg", 0.82));
  } catch {
    return null;
  }
}

/** Prepara un allegato per l'upload. null = immagine non elaborabile da questo browser. */
export async function prepareFile(file: File): Promise<PreparedFile | null> {
  if (file.type === "application/pdf") return { name: file.name, blob: file, ext: "pdf", type: file.type };
  const blob = await reencodeImage(file);
  return blob ? { name: file.name, blob, ext: "jpg", type: "image/jpeg" } : null;
}

/**
 * Upload diretto nel bucket PRIVATO "lead-uploads".
 * La policy RLS consente l'INSERT solo nel percorso <leadId>/<token>/ con
 * token valido 30 minuti; nessuna lettura pubblica. Poi il server registra
 * gli allegati verificandone l'esistenza.
 *
 * supabase-js è importato solo qui, al momento dell'invio con allegati:
 * chi compila il modulo senza foto non scarica la libreria.
 */
export async function uploadLeadFiles(leadId: string, token: string, files: PreparedFile[]): Promise<number> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return 0;
  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  let ok = 0;
  for (let i = 0; i < files.length; i++) {
    const f = files[i];
    const path = `${leadId}/${token}/file-${i + 1}.${f.ext}`;
    const { error } = await supabase.storage.from("lead-uploads").upload(path, f.blob, { contentType: f.type, upsert: false });
    if (!error) ok++;
  }
  if (ok === 0) return 0;
  const registered = await fetch("/api/leads/attachments/", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ leadId, token }),
  }).catch(() => null);
  // senza registrazione lo staff non vede i file: per l'utente non sono arrivati
  return registered?.ok ? ok : 0;
}
