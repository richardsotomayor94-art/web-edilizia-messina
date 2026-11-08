import type { Metadata, Viewport } from "next";
import "./globals.css";
import { site, phoneHref, whatsappLink } from "@/config/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyCta } from "@/components/StickyCta";
import { Analytics } from "@/components/Analytics";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} – Ristrutturazioni e lavori in casa a Messina`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  robots: site.indexable ? { index: true, follow: true } : { index: false, follow: false, nocache: true },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#0f4c5c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body className="min-h-dvh pb-20 lg:pb-0">
        <Header siteName={site.name} />
        <main id="contenuto">{children}</main>
        <Footer />
        <StickyCta phoneHref={phoneHref()} whatsappHref={whatsappLink("Ciao, vorrei informazioni per un lavoro a Messina")} />
        <Analytics ga4Id={site.analytics.ga4Id} />
      </body>
    </html>
  );
}
