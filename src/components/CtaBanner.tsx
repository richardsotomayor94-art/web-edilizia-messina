import { TrackedLink } from "./TrackedLink";
import { Icon } from "./Icon";
import { CTA_LABEL, whatsappLink } from "@/config/site";

export function CtaBanner({
  title = "Hai un lavoro da fare in casa?",
  text = "Descrivi il progetto una volta sola. È gratuito e senza impegno.",
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
    <section className="on-dark bg-ink p-6 text-paper sm:p-10 lg:p-14">
      <h2 className="t-h2 max-w-3xl">{title}</h2>
      <p className="t-lead mt-3 max-w-2xl text-paper/80">{text}</p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <TrackedLink href={href} event="cta_click" location={location} service={service} className="btn btn-primary">
          {CTA_LABEL} <Icon name="arrow" />
        </TrackedLink>
        {wa && (
          <TrackedLink href={wa} event="whatsapp_click" location={location} className="btn border border-paper text-paper hover:bg-paper hover:text-ink" external>
            Scrivici su WhatsApp
          </TrackedLink>
        )}
      </div>
    </section>
  );
}
