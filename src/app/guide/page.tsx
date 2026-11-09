import Link from "next/link";
import { guides } from "@/config/guides";
import { pageMetadata } from "@/lib/seo";
import { ContentPage } from "@/components/ContentPage";

const path = "/guide/";
const title = "Guide su ristrutturazioni a Messina";
const description = "Guide pratiche per chi deve ristrutturare casa a Messina: da cosa dipendono i costi, bonus fiscali 2026, quando serve la CILA.";
export const metadata = pageMetadata({ title, description, path });

export default function GuideIndex() {
  return (
    <ContentPage title="Guide per ristrutturare casa a Messina" description={description} path={path} pageType="CollectionPage" crumbs={[{ name: "Home", path: "/" }, { name: "Guide", path }]}
      intro={<p>Poche guide, aggiornate e con fonti, per arrivare preparati al sopralluogo.</p>}>
      <ul className="not-prose border-b border-stone">
        {guides.map((g) => (
          <li key={g.path} className="border-t border-stone">
            <Link href={g.path} className="group block py-6">
              <h2 className="font-display text-[clamp(1.9rem,3.4vw,3.25rem)] leading-[1.06] transition-transform duration-[var(--motion-normal)] group-hover:translate-x-2">{g.title}</h2>
              <p className="mt-2 max-w-2xl text-ink-soft">{g.excerpt}</p>
            </Link>
          </li>
        ))}
      </ul>
    </ContentPage>
  );
}
