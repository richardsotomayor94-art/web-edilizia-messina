import { TrackedLink } from "./TrackedLink";
import { whatsappLink } from "@/config/site";

export function CtaBanner({
  title = "Hai un lavoro da fare in casa?",
  text = "Descrivi il progetto in 2 minuti. È gratuito e senza impegno.",
  service,
  location,
}: {
  title?: string;
  text?: string;
  service?: string;
  location: string;
}) {
  const href = service ? `/preventivo/?servizio=${service}` : "/preventivo/";
  const wa = whatsappLink("Ciao, vorrei un preventivo per un lavoro a Messina");
  return (
    <section className="blueprint rounded-[var(--radius-card)] border border-sea/20 bg-sea-soft p-6 sm:p-8">
      <h2 className="text-2xl sm:text-3xl">{title}</h2>
      <p className="mt-2 max-w-2xl text-ink-soft">{text}</p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <TrackedLink href={href} event="cta_click" location={location} service={service} className="btn btn-primary">
          Richiedi un preventivo
        </TrackedLink>
        {wa && (
          <TrackedLink href={wa} event="whatsapp_click" location={location} className="btn btn-secondary" external>
            Scrivici su WhatsApp
          </TrackedLink>
        )}
      </div>
    </section>
  );
}
