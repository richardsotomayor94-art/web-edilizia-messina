/** Marchio: pianta di una casa stilizzata con angolo "360" (segno, non foto). */
export function Logo({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <rect width="32" height="32" rx="7" fill="#0f4c5c" />
      <path d="M8 16.5L16 9l8 7.5V24H8v-7.5z" fill="none" stroke="#f7f4ee" strokeWidth="2" strokeLinejoin="round" />
      <path d="M13.5 24v-5h5v5" fill="none" stroke="#f7f4ee" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="24.5" cy="8" r="3" fill="#b4472f" />
    </svg>
  );
}
