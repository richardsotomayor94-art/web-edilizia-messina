/**
 * Normalizzazione numeri di telefono italiani in formato E.164 (+39...).
 * Accetta cellulari (3xx, 9–10 cifre) e fissi (0x, 6–11 cifre).
 * Numeri esteri ammessi solo se scritti con prefisso internazionale.
 */
export function normalizePhone(input: string | undefined | null): string | null {
  if (!input) return null;
  let s = input.trim().replace(/[\s.\-()/]/g, "");
  if (s.startsWith("00")) s = `+${s.slice(2)}`;
  if (!/^\+?\d+$/.test(s)) return null;

  if (s.startsWith("+")) {
    if (s.startsWith("+39")) return validateItalian(s.slice(3));
    // estero: lunghezza E.164
    return /^\+[1-9]\d{7,14}$/.test(s) ? s : null;
  }
  if (s.startsWith("39") && s.length >= 11) {
    const it = validateItalian(s.slice(2));
    if (it) return it;
  }
  return validateItalian(s);
}

function validateItalian(national: string): string | null {
  // cellulare
  if (/^3\d{8,9}$/.test(national)) return `+39${national}`;
  // fisso (prefisso 0)
  if (/^0\d{5,10}$/.test(national)) return `+39${national}`;
  return null;
}

/** Rileva sequenze palesemente finte (es. 3333333333, 3456789012 progressivo) */
export function looksFakePhone(e164: string): boolean {
  const digits = e164.replace(/\D/g, "").replace(/^39/, "");
  if (/^(\d)\1{6,}$/.test(digits.slice(1))) return true;
  if (/(0123456|1234567|2345678|3456789|9876543)/.test(digits)) return true;
  return false;
}
