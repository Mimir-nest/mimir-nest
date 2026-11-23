import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AutopsyForm from "@/components/arena/AutopsyForm";
import { getChallengeMeta, listChallenges } from "@/lib/arena/challenges";
import { postmortems } from "@/lib/arena/postmortems";

export const dynamicParams = false;

export function generateStaticParams() {
  return listChallenges()
    .filter((c) => c.live)
    .map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const meta = getChallengeMeta(slug);
  return { title: `Autopsy: ${meta?.incidentId ?? "incident"} — Bug Squash Arena | Mimir Nest`, robots: { index: false } };
}

export default async function AutopsyPage({ params }) {
  const { slug } = await params;
  const meta = getChallengeMeta(slug);
  if (!meta?.live) notFound();

  return (
    <div className="min-h-screen bg-mn-background text-on-background flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28 pb-24">
        <div className="max-w-3xl mx-auto px-container-padding-mobile md:px-0">
          <a href={`/arena/incident/${slug}`} className="text-xs text-on-surface-variant hover:text-mn-primary">
            ← Back to {meta.incidentId}
          </a>
          <span className="block mt-6 font-label-caps text-label-caps uppercase text-surface-tint">Autopsy · {meta.incidentId}</span>
          <h1 className="mt-2 font-headline-lg text-headline-lg text-mn-primary">{meta.title}</h1>
          <AutopsyForm slug={slug} postmortem={postmortems[meta.postmortemSlug] ?? null} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
