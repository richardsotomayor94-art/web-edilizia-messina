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
    <ContentPage title="Guide" description={description} path={path} pageType="CollectionPage" crumbs={[{ name: "Home", path: "/" }, { name: "Guide", path }]}
      intro={<p>Poche guide, aggiornate e con fonti, per arrivare preparati al sopralluogo.</p>}>
      <ul className="!list-none !pl-0 space-y-4">
        {guides.map((g) => (
          <li key={g.path} className="rounded-[var(--radius-card)] border border-stone bg-white p-5">
            <h2 className="!mt-0 !text-xl"><Link href={g.path} className="!no-underline hover:!underline">{g.title}</Link></h2>
            <p className="!mb-0">{g.excerpt}</p>
          </li>
        ))}
      </ul>
    </ContentPage>
  );
}
