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
    <section className="py-14 md:py-24 px-4 sm:px-5 bg-mn-background max-w-full relative overflow-hidden border-b border-line pixel-grid">

      <div className="max-w-6xl mx-auto relative z-10">
        <p className="kicker mb-6">06 · Mimir ecosystem</p>
        {/* Main Banner Card */}
        <div className="pop rounded-3xl bg-panel p-6 sm:p-10 md:p-14 relative overflow-hidden">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Teaser Copy & Positioning */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accentsoft border border-line">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-surface-tint opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-surface-tint" />
                </span>
                <span className="font-label-caps text-xs text-surface-tint tracking-wider font-semibold">
                  MIMIR ECOSYSTEM · COMING SOON
                </span>
              </div>

              <h2 className="display text-[2.1rem] sm:text-5xl text-foreground leading-[1.08]">
                Your GitHub becomes <br className="hidden sm:block" />
                <span className="text-surface-tint">your interview.</span>
              </h2>

              <p className="font-body-lg text-base md:text-lg text-on-surface-variant leading-relaxed">
                Coming soon: a live, voice-first AI interviewer that studies what you built on GitHub, then interviews you about the engineering decisions behind it.
              </p>

              {/* The Mimir Preparation Loop */}
              <div className="p-4 rounded-xl bg-panel2 border border-line space-y-2">
                <span className="text-xs font-mono tracking-wider text-surface-tint block font-semibold">
                  The Full Engineering Loop
                </span>
                <p className="text-xs text-foreground font-mono flex flex-wrap items-center gap-1.5 leading-normal">
                  <span className="text-on-surface-variant">Learn</span> &rarr;
                  <span className="text-on-surface-variant">Build</span> &rarr;
                  <span className="text-surface-tint font-bold">Mimir Interview</span> &rarr;
                  <span className="text-on-surface-variant">Diagnose Weaknesses</span>
                </p>
                <p className="text-xs text-on-surface-variant font-body-md">
                  Don&apos;t just memorize interview questions. Build something genuine, understand every decision behind it, and learn to defend your work with confidence.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  href="/interview"
                  className="pop bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold text-sm hover:-translate-y-0.5 transition-transform flex items-center justify-center gap-2"
                >
                  Explore Mimir Interview
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/interview#early-access"
                  className="border border-line bg-panel text-on-surface-variant px-6 py-3 rounded-full text-sm hover:border-fg hover:text-fg transition-colors flex items-center justify-center gap-2"
                >
                  Get Early Access
                </Link>
              </div>
            </div>

            {/* Right Column: Siri Orb Live AI Interviewer Presence Preview */}
            <div className="lg:col-span-6 flex items-center justify-center">
              <div className="frame w-full max-w-md p-6 sm:p-8 bg-panel2 relative flex flex-col items-center text-center">
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
