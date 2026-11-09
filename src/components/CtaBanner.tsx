import { TrackedLink } from "./TrackedLink";
import { whatsappLink } from "@/config/site";

export function CtaBanner({
  title = "Hai un lavoro da fare in casa?",
  text = "Descrivi il progetto una volta sola. È gratuito e senza impegno.",
  label = "Richiedi un preventivo",
  service,
  location,
}: {
  title?: string;
  text?: string;
  label?: string;
  service?: string;
  location: string;
}) {
  const href = service ? `/preventivo/?servizio=${service}` : "/preventivo/";
  const wa = whatsappLink("Ciao, vorrei un preventivo per un lavoro a Messina");
  return (
    <section className="blueprint-dark rounded-[var(--radius-card)] p-6 text-white sm:p-10">
      <h2 className="text-2xl sm:text-3xl">{title}</h2>
      <p className="mt-2 max-w-2xl text-white/85">{text}</p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <TrackedLink href={href} event="cta_click" location={location} service={service} className="btn btn-primary">
          {label}
        </TrackedLink>
        {wa && (
          <TrackedLink href={wa} event="whatsapp_click" location={location} className="btn border-[1.5px] border-white text-white hover:bg-white hover:text-ink" external>
            Scrivici su WhatsApp
          </TrackedLink>
        )}
      </div>
    </section>
  );
}
