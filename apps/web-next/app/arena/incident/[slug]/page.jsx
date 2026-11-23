import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import ArenaIDE from "@/components/arena/ArenaIDE";
import { getChallenge, listChallenges } from "@/lib/arena/challenges";

export const dynamicParams = false;

export function generateStaticParams() {
  return listChallenges()
    .filter((c) => c.live)
    .map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const challenge = getChallenge(slug);
  if (!challenge) return { title: "Incident not found", robots: { index: false } };
  const { meta } = challenge;
  return {
    title: `${meta.incidentId}: ${meta.title} — Bug Squash Arena | Mimir Nest`,
    description: meta.report,
    alternates: { canonical: `https://mimirnest.vercel.app/arena/incident/${slug}` },
  };
}

export default async function IncidentPage({ params }) {
  const { slug } = await params;
  const challenge = getChallenge(slug);
  if (!challenge) notFound();

  return (
    <div className="h-dvh overflow-hidden bg-mn-background text-on-background flex flex-col">
      <Navbar />
      <main className="pt-16 md:pt-[72px]">
        <ArenaIDE meta={challenge.meta} initialFiles={challenge.files} />
      </main>
    </div>
  );
}
