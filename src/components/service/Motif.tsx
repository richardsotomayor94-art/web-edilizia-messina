import type { CSSProperties, ReactElement } from "react";
import type { Motif as MotifName } from "@/config/service-experience";

/**
 * Disegni tecnici astratti che si completano all'apertura della pagina: uno per lavoro.
 * Tutti i tracciati hanno pathLength=1, così una sola regola CSS li disegna.
 * Solo decorazione: nessun valore reale o progetto eseguito.
 */
const L = ({ d, i = 0 }: { d: string; i?: number }) => <path d={d} pathLength="1" style={{ "--d": i } as CSSProperties} />;

function range(n: number) {
  return Array.from({ length: n }, (_, i) => i);
}

const MOTIFS: Record<MotifName, () => ReactElement> = {
  // Schema di posa: file sfalsate
  tiles: () => (
    <>
      {range(5).map((r) => (
        <L key={`h${r}`} d={`M0 ${r * 75}H400`} i={r} />
      ))}
      {range(4).map((r) =>
        range(4).map((c) => {
          const x = c * 120 + (r % 2 ? 60 : 0) + 20;
          return <L key={`v${r}${c}`} d={`M${x} ${r * 75}v75`} i={r + c + 3} />;
        }),
      )}
      <L d="M0 312H400M0 306v12M400 306v12" i={10} />
    </>
  ),
  // Livelli d'acqua e pendenza verso lo scarico
  water: () => (
    <>
      {range(6).map((r) => (
        <L key={r} d={`M${80 - r * 12} 150a${120 + r * 26} ${50 + r * 22} 0 1 0 ${240 + r * 24} 0a${120 + r * 26} ${50 + r * 22} 0 1 0 -${240 + r * 24} 0`} i={r * 2} />
      ))}
      <L d="M200 150v150M180 300h40" i={14} />
    </>
  ),
  // Pianta di una cucina: piano, isola, triangolo di lavoro
  layout: () => (
    <>
      <L d="M20 20H380V290H20Z" />
      <L d="M20 70H380" i={2} />
      <L d="M130 150H300V210H130Z" i={4} />
      <L d="M90 45L340 45L215 180Z" i={7} />
      <L d="M380 200a60 60 0 0 1 -60 60" i={9} />
      <L d="M320 200v60" i={9} />
    </>
  ),
  // Orditura di una parete: montanti e guide
  studs: () => (
    <>
      <L d="M0 16H400M0 26H400" />
      <L d="M0 274H400M0 284H400" i={1} />
      {range(7).map((c) => (
        <L key={c} d={`M${c * 60 + 20} 26V274M${c * 60 + 28} 26V274`} i={c + 3} />
      ))}
      <L d="M20 300H80M20 294v12M80 294v12" i={11} />
    </>
  ),
  // Dorsali e derivazioni di impianto
  runs: () => (
    <>
      <L d="M0 60H180V240H400" />
      <L d="M0 120H110V300" i={3} />
      <L d="M180 150H330V0" i={5} />
      <L d="M260 240V150" i={7} />
      {[
        [180, 60],
        [110, 120],
        [180, 150],
        [260, 150],
        [260, 240],
      ].map(([x, y], i) => (
        <L key={i} d={`M${x - 6} ${y}a6 6 0 1 0 12 0a6 6 0 1 0 -12 0`} i={9 + i} />
      ))}
    </>
  ),
  // Mani di pittura: passate parallele che si sovrappongono
  coats: () => (
    <>
      {range(9).map((c) => (
        <L key={c} d={`M${c * 46 + 8} 300V${40 + (c % 3) * 22}`} i={c} />
      ))}
      {range(9).map((c) => (
        <L key={`b${c}`} d={`M${c * 46 + 30} 300V${70 + ((c + 1) % 3) * 22}`} i={c + 3} />
      ))}
      <L d="M0 20H400" i={13} />
    </>
  ),
  // Prospetto di un palazzo: piani, finestre e balconi
  facade: () => (
    <>
      <L d="M60 300V24H340V300" />
      <L d="M44 24H356M44 14H356" i={2} />
      {range(3).map((f) => (
        <L key={`b${f}`} d={`M60 ${98 + f * 84}H340`} i={4 + f} />
      ))}
      {range(3).map((f) =>
        range(3).map((c) => <L key={`w${f}${c}`} d={`M${96 + c * 86} ${44 + f * 84}h34v46h-34Z`} i={6 + f + c} />),
      )}
      <L d="M0 300H400" i={14} />
    </>
  ),
  // Sezione di un terrazzo: strati, pendenza e scarico
  membrane: () => (
    <>
      <L d="M0 92L330 124" />
      <L d="M0 112L330 144" i={3} />
      <L d="M0 134L330 166" i={5} />
      <L d="M0 196H330" i={7} />
      <L d="M330 124V240M370 124V240" i={9} />
      <L d="M330 124H370" i={10} />
      {range(5).map((c) => (
        <L key={c} d={`M${48 + c * 64} ${40 + c * 6}v22`} i={11 + c} />
      ))}
    </>
  ),
  // Pianta di un appartamento con le sue porte
  plan: () => (
    <>
      <L d="M16 16H384V296H16Z" />
      <L d="M190 16V130M190 180V296" i={3} />
      <L d="M16 170H120M170 170H190" i={5} />
      <L d="M190 200H300M350 200H384" i={7} />
      <L d="M120 170a50 50 0 0 0 50 -50" i={10} />
      <L d="M170 120V170" i={10} />
      <L d="M300 200a50 50 0 0 1 50 50" i={12} />
      <L d="M350 200V250" i={12} />
    </>
  ),
};

export function ServiceMotif({ name, className = "" }: { name: MotifName; className?: string }) {
  const Draw = MOTIFS[name];
  return (
    <svg data-reveal="draw" className={`motif ${className}`} viewBox="-1 -1 402 322" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true" focusable="false">
      <Draw />
    </svg>
  );
}
