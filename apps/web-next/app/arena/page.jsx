import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TicketWall from "@/components/arena/TicketWall";
import { listChallenges } from "@/lib/arena/challenges";

const title = "Bug Squash Arena — Fix Real Incidents in the Browser | Mimir Nest";
const description =
  "Read an on-call ticket, fix a realistic service in an in-browser IDE, and let hidden tests grade your patch. The debugging round product companies actually run.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "https://mimirnest.vercel.app/arena" },
  openGraph: { title, description, url: "https://mimirnest.vercel.app/arena", type: "website", siteName: "Mimir Nest" },
};

export default function ArenaPage() {
  const challenges = listChallenges();
  return (
    <div className="min-h-screen bg-mn-background text-on-background flex flex-col selection:bg-surface-tint selection:text-mn-background">
      <Navbar />
      <main className="flex-grow pt-28 pb-24">
        <section className="max-w-6xl mx-auto px-container-padding-mobile md:px-container-padding-desktop">
          <span className="font-label-caps text-label-caps uppercase text-surface-tint">Bug Squash Arena</span>
          <h1 className="mt-3 max-w-3xl font-display-lg text-display-lg-mobile md:text-display-lg text-mn-primary">
            Read the ticket. Fix the bug. Hidden tests grade you.
          </h1>
          <p className="mt-4 max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
            Every challenge is a realistic service with a planted production bug. It runs entirely in your browser: edit the code, run the
            tests, and ship the fix.
          </p>
        </section>
        <TicketWall challenges={challenges} />
      </main>
      <Footer />
    </div>
  );
}
