/** Indice laterale a tacche, come un righello: compare solo su schermi larghi. Lo stato attivo lo imposta MotionRoot. */
export function ChapterRail({ items }: { items: { id: string; label: string }[] }) {
  return (
    <nav aria-label="In questa pagina" className="rail" data-rail>
      <ul>
        {items.map((c) => (
          <li key={c.id}>
            <a href={`#${c.id}`} data-rail-link={c.id}>
              <span aria-hidden="true" className="rail-tick" />
              <span className="rail-label">{c.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** Avanzamento di lettura: linea di cotto guidata dal CSS, senza JavaScript. */
export function ReadProgress() {
  return <div aria-hidden="true" className="read-progress" />;
}
