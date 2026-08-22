import React from "react";
import { BookMarked, Map, ArrowRight } from "lucide-react";
import Link from "next/link";
const Features = () => {
    return (<section id="features" className="py-[120px] px-6 md:px-16 bg-mn-background max-w-full">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-16 max-w-2xl">
          <span className="font-label-caps text-label-caps text-surface-tint tracking-widest block mb-3">
            PREMIUM FEATURES
          </span>
          <h2 className="font-headline-lg text-headline-lg text-mn-primary mb-4">
            Everything You Need To Excel.
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Unlock your academic potential with our comprehensive suite of premium tools
            and resources designed to accelerate your learning journey.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[280px]">
          {/* Large Feature Card — Dark (primary-container) */}
          <Link href="/projects" className="md:col-span-8 rounded-[32px] bg-primary-container relative overflow-hidden group flex flex-col justify-end p-10 cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-t from-mn-primary to-transparent z-10 opacity-80"/>
            {/* Background abstract bars */}
            <div className="absolute inset-0 flex items-end justify-center gap-3 p-6 opacity-30">
              {[55, 75, 90, 60, 45, 80, 70, 50].map((h, i) => (<div key={i} className="flex-1 rounded-t-lg" style={{
                height: `${h}%`,
                background: i % 2 === 0 ? "#accfb7" : "#466552",
            }}/>))}
            </div>
            <div className="relative z-20 text-on-primary">
              <span className="inline-block px-3 py-1 rounded-full border border-surface-tint/50 text-surface-tint font-label-caps text-label-caps mb-4 backdrop-blur-sm tracking-widest">
                Deep Focus Mode
              </span>
              <h3 className="font-headline-lg text-headline-lg mb-2">
                Resume Project Explorer
              </h3>
              <p className="font-body-md text-body-md text-on-primary/80 max-w-md">
                Browse the most common and advanced resume projects with one click. Get inspiration and resources instantly.
              </p>
            </div>
          </Link>

          {/* Small Feature Card — Ivory (surface-container) */}
          <Link href="/courses" className="md:col-span-4 rounded-[32px] bg-surface-container p-8 flex flex-col items-start shadow-[0_10px_30px_rgba(10,42,26,0.04)] hover:shadow-[0_20px_40px_rgba(10,42,26,0.08)] transition-shadow group">
            <div className="w-14 h-14 rounded-full bg-surface-tint/10 flex items-center justify-center mb-auto group-hover:bg-surface-tint/20 transition-colors">
              <BookMarked className="w-7 h-7 text-surface-tint" strokeWidth={1.5}/>
            </div>
            <div className="mt-8">
              <h3 className="font-headline-md text-headline-md text-mn-primary mb-2">
                Structured Pathways
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Carefully designed curricula that build foundational knowledge sequentially.
              </p>
            </div>
          </Link>

          {/* Small Feature Card — Tint (surface-tint) */}
          <Link href="/roadmaps" className="md:col-span-4 rounded-[32px] bg-surface-tint p-8 flex flex-col items-start relative overflow-hidden group">
            <div className="absolute -right-8 -bottom-8 w-40 h-40 border border-white/20 rounded-full pointer-events-none"/>
            <div className="absolute -right-16 -bottom-16 w-56 h-56 border border-white/10 rounded-full pointer-events-none"/>
            <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-auto group-hover:bg-white/20 transition-colors">
              <Map className="w-7 h-7 text-white" strokeWidth={1.5}/>
            </div>
            <div className="mt-8 relative z-10">
              <h3 className="font-headline-md text-headline-md text-white mb-2">
                Peer Seminars
              </h3>
              <p className="font-body-md text-body-md text-white/80">
                Engage in high-level discourse with dedicated study groups.
              </p>
            </div>
          </Link>

          {/* Medium Feature Card — White (surface-container-lowest) */}
          <Link href="/placement-dsa" className="md:col-span-8 rounded-[32px] bg-surface-container-lowest border border-outline-variant/30 p-10 flex items-center gap-8 shadow-[0_10px_30px_rgba(10,42,26,0.04)] hover:shadow-[0_20px_40px_rgba(10,42,26,0.08)] transition-shadow">
            <div className="flex-1">
              <span className="font-label-caps text-label-caps text-surface-tint tracking-widest block mb-4">
                ANALYTICS
              </span>
              <h3 className="font-headline-lg text-headline-lg text-mn-primary mb-4">
                Real-Time Placement DSA.
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                Master technical interviews with up-to-date DSA questions, company-wise stats, and practice tools.
              </p>
              <span className="text-mn-primary font-label-caps text-label-caps flex items-center gap-2 hover:text-surface-tint transition-colors tracking-widest group">
                View Dashboard{" "}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
              </span>
            </div>
            {/* Abstract Data Viz */}
            <div className="w-1/3 h-full bg-surface-container rounded-2xl relative overflow-hidden flex items-end p-4 gap-2 shrink-0">
              {[40, 70, 90, 60].map((h, i) => (<div key={i} className="flex-1 rounded-t-lg" style={{
                height: `${h}%`,
                background: i === 0
                    ? "#accfb7"
                    : i === 1
                        ? "#466552"
                        : i === 2
                            ? "#001308"
                            : "rgba(70,101,82,0.5)",
            }}/>))}
            </div>
          </Link>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 text-on-surface-variant text-sm font-body-md">
            <div className="w-2 h-2 bg-surface-tint rounded-full animate-pulse"/>
            <span>All tools are free and ready to use</span>
          </div>
        </div>
      </div>
    </section>);
};
export default Features;
