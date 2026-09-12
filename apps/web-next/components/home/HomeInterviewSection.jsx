"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";

const InterviewOrb = dynamic(() => import("@/components/interview/InterviewOrb"), {
  ssr: false,
  loading: () => <div className="w-[220px] h-[220px] rounded-full bg-surface-container/60 animate-pulse" />,
});

export default function HomeInterviewSection() {
  return (
    <section className="py-20 md:py-28 px-6 md:px-16 bg-mn-background max-w-full relative overflow-hidden">
      {/* Subtle Background Glow & Grid */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-surface-tint/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#24252512_1px,transparent_1px),linear-gradient(to_bottom,#24252512_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Banner Card */}
        <div className="rounded-3xl bg-surface-container border-2 border-surface-tint/30 p-8 sm:p-12 md:p-16 relative overflow-hidden shadow-2xl">
          {/* Subtle Decorative Rings */}
          <div className="absolute top-0 right-0 w-96 h-96 border border-surface-tint/10 rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Teaser Copy & Positioning */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high border border-surface-tint/30 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-surface-tint opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-surface-tint" />
                </span>
                <span className="font-label-caps text-[11px] text-surface-tint tracking-widest uppercase font-semibold">
                  MIMIR ECOSYSTEM · COMING SOON
                </span>
              </div>

              <h2 className="font-headline-lg text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight leading-[1.15]">
                Your GitHub becomes <br className="hidden sm:block" />
                <span className="text-surface-tint">your interview.</span>
              </h2>

              <p className="font-body-lg text-base md:text-lg text-on-surface-variant leading-relaxed">
                Coming soon: a live, voice-first AI interviewer that studies what you built on GitHub, then interviews you about the engineering decisions behind it.
              </p>

              {/* The Mimir Preparation Loop */}
              <div className="p-4 rounded-xl bg-mn-background/80 border border-outline-variant/60 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-surface-tint block font-semibold">
                  The Full Engineering Loop
                </span>
                <p className="text-xs text-foreground/90 font-mono flex flex-wrap items-center gap-1.5 leading-normal">
                  <span className="text-muted-foreground">Learn</span> &rarr;
                  <span className="text-muted-foreground">Build</span> &rarr;
                  <span className="text-surface-tint font-bold">Mimir Interview</span> &rarr;
                  <span className="text-muted-foreground">Diagnose Weaknesses</span>
                </p>
                <p className="text-[11px] text-on-surface-variant/80 font-body-md">
                  Don&apos;t just memorize interview questions. Build something genuine, understand every decision behind it, and learn to defend your work with confidence.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  href="/interview"
                  className="bg-primary text-primary-foreground px-7 py-3.5 rounded-xl font-label-caps text-sm hover:scale-[1.02] active:scale-[0.99] transition-all flex items-center justify-center gap-2 tracking-wider font-semibold shadow-lg shadow-primary/20"
                >
                  Explore Mimir Interview
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/interview#early-access"
                  className="bg-surface-container-high hover:bg-surface-container-highest border border-outline-variant/70 text-foreground px-6 py-3.5 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2"
                >
                  Get Early Access
                </Link>
              </div>
            </div>

            {/* Right Column: Siri Orb Live AI Interviewer Presence Preview */}
            <div className="lg:col-span-6 flex items-center justify-center">
              <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl bg-mn-background border border-outline-variant/80 shadow-2xl relative overflow-hidden flex flex-col items-center text-center">
                {/* Session Header */}
                <div className="w-full flex items-center justify-between pb-3 mb-4 border-b border-outline-variant/50 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="font-bold text-foreground">LIVE SESSION</span>
                    <span className="text-muted-foreground/60">|</span>
                    <span className="text-[11px] text-surface-tint font-bold">distributed-cache</span>
                  </div>
                  <span className="text-[10px] uppercase font-semibold text-surface-tint px-2 py-0.5 rounded bg-surface-tint/15 border border-surface-tint/25">
                    COMING SOON
                  </span>
                </div>

                {/* Siri Orb */}
                <div className="py-2">
                  <InterviewOrb
                    size="150px"
                    initialState="listening"
                    interactive={true}
                    showControls={false}
                    showHeader={false}
                  />
                </div>

                {/* Callout Quote */}
                <div className="mt-4 pt-3 border-t border-outline-variant/40 w-full">
                  <p className="text-xs font-mono text-surface-tint font-medium">
                    &ldquo;An interviewer that actually reads your project.&rdquo;
                  </p>
                  <p className="text-[11px] font-mono text-muted-foreground mt-1">
                    Voice-first AI mock interview preview based on your GitHub code.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
