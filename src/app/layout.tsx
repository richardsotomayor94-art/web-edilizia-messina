import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";
import { site, phoneHref, whatsappLink } from "@/config/site";
import { servicePages } from "@/config/services";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyCta } from "@/components/StickyCta";
import { Analytics } from "@/components/Analytics";
import { MotionRoot } from "@/components/MotionRoot";
import { DARK_GROUNDS, experience } from "@/config/service-experience";

// Due sole famiglie, servite dal nostro dominio.
const brandFont = Schibsted_Grotesk({ subsets: ["latin"], display: "swap", variable: "--font-brand", preload: false });
const editorialFont = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], display: "swap", variable: "--font-editorial" });

// Abilita le animazioni prima del primo paint e le disattiva da solo se il JS non parte.
// La prima pagina della sessione mostra l'intro del marchio, in meno di un secondo e senza bloccare nulla.
const motionBoot = `(function(){var d=document.documentElement;if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;d.classList.add('motion-ok');try{if(!sessionStorage.getItem('mc360')){sessionStorage.setItem('mc360','1');d.classList.add('brand-intro')}}catch(e){}setTimeout(function(){if(!window.__reveal)d.classList.remove('motion-ok')},3500)})()`;

// Pagine con apertura scura: l'header parte trasparente sopra la fotografia
const darkPaths = ["/", "/come-funziona/", "/chi-siamo/", "/come-selezioniamo-i-professionisti/", "/diventa-partner/", ...servicePages.filter((s) => DARK_GROUNDS.includes(experience[s.id].ground)).map((s) => s.path)];

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `Preventivi per lavori in casa a Messina | ${site.name}`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  robots: site.indexable ? { index: true, follow: true } : { index: false, follow: false, nocache: true },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#1c1b19",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${brandFont.variable} ${editorialFont.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionBoot }} />
      </head>
      <body className="min-h-dvh">
        <Header siteName={site.name} services={servicePages.map(({ id, path, cardTitle }) => ({ id, path, cardTitle }))} darkPaths={darkPaths} />
        <main id="contenuto">{children}</main>
        <Footer />
        <StickyCta phoneHref={phoneHref()} whatsappHref={whatsappLink("Ciao, vorrei informazioni per un lavoro a Messina")} />
        <Analytics ga4Id={site.analytics.ga4Id} />
        <MotionRoot />
      </body>
    </html>
  );
}
