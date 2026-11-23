"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import {
  ArrowLeft,
  ArrowRight,
  Boxes,
  Activity,
  DollarSign,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Building2,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Layers,
  ChevronRight,
  ChevronLeft,
  Share2,
  Copy,
  Check,
  Zap,
  Gauge,
  Cpu,
} from "lucide-react";
import { getProblemBySlug, systemDesignProblems } from "../../data/problems";
import CompanyLogo from "@/components/common/CompanyLogo";

import { PixelScene } from "@/components/pixel";
const difficultyColors = {
  Easy: {
    bg: "bg-emerald-500/10",
    text: "text-good",
    border: "border-emerald-500/30",
    dot: "bg-emerald-400",
  },
  Medium: {
    bg: "bg-amber-500/10",
    text: "text-warn",
    border: "border-amber-500/30",
    dot: "bg-amber-400",
  },
  Hard: {
    bg: "bg-rose-500/10",
    text: "text-rose-400",
    border: "border-rose-500/30",
    dot: "bg-rose-400",
  },
};

export default function ProblemDetailPage() {
  const params = useParams();
  const slug = params?.slug;
  const problem = getProblemBySlug(slug);
  const [copied, setCopied] = useState(false);

  if (!problem) {
    notFound();
  }

  const currentIndex = systemDesignProblems.findIndex((p) => p.slug === problem.slug);
  const prevProblem = currentIndex > 0 ? systemDesignProblems[currentIndex - 1] : null;
  const nextProblem = currentIndex < systemDesignProblems.length - 1 ? systemDesignProblems[currentIndex + 1] : null;

  const diff = difficultyColors[problem.difficulty] || difficultyColors.Medium;
  const relatedProblems = systemDesignProblems
    .filter((p) => p.slug !== problem.slug && (p.category === problem.category || p.difficulty === problem.difficulty))
    .slice(0, 3);

  const handleCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-mn-background text-on-background selection:bg-surface-tint/30">
      <Navbar />

      {/* ── 1. TOP INTELLIGENT NAVIGATION & ACTION BAR ── */}
      <div className="pt-24 pb-3.5 px-4 sm:px-6 lg:px-12 border-b border-border/40 bg-surface-container/60 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          {/* Left: Breadcrumbs & Problem ID */}
          <div className="flex items-center gap-3">
            <Link
              href="/system-design/problems"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container border border-border/60 text-xs font-mono text-muted-foreground hover:text-foreground hover:border-surface-tint/40 transition-colors no-underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">All Challenges</span>
            </Link>

            <span className="text-muted-foreground/40 hidden sm:inline">/</span>

            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-surface-container-high border border-border/50 font-mono text-[11px] font-bold text-surface-tint">
                #{String(currentIndex + 1).padStart(2, "0")}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-foreground truncate max-w-[180px] sm:max-w-[280px]">
                {problem.title}
              </span>
            </div>
          </div>

          {/* Center: Problem Cycler (< Prev / Next >) */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-surface-container border border-border/60 text-xs font-mono">
            {prevProblem ? (
              <Link
                href={`/system-design/problems/${prevProblem.slug}`}
                className="px-2.5 py-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface-container-high transition-colors flex items-center gap-1 no-underline"
                title={`Previous: ${prevProblem.title}`}
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Prev</span>
              </Link>
            ) : (
              <span className="px-2.5 py-1 text-muted-foreground/30 flex items-center gap-1 cursor-not-allowed">
                <ChevronLeft className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Prev</span>
              </span>
            )}

            <span className="px-2 text-[11px] text-muted-foreground font-semibold">
              {currentIndex + 1} / {systemDesignProblems.length}
            </span>

            {nextProblem ? (
              <Link
                href={`/system-design/problems/${nextProblem.slug}`}
                className="px-2.5 py-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface-container-high transition-colors flex items-center gap-1 no-underline"
                title={`Next: ${nextProblem.title}`}
              >
                <span className="hidden md:inline">Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            ) : (
              <span className="px-2.5 py-1 text-muted-foreground/30 flex items-center gap-1 cursor-not-allowed">
                <span className="hidden md:inline">Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            )}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="p-2 rounded-xl bg-surface-container border border-border/60 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              title="Copy Problem Link"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-good" /> : <Copy className="w-3.5 h-3.5" />}
            </button>

            {problem.referenceWorkflow && (
              <Link
                href={`/playground?challenge=${problem.slug}&mode=solution`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1a1e20] border border-surface-tint/40 text-surface-tint font-semibold text-xs font-mono tracking-wider hover:bg-surface-tint/10 transition-colors no-underline"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reference</span> Workflow
              </Link>
            )}

            <Link
              href={`/playground?challenge=${problem.slug}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-surface-tint text-on-primary font-bold text-xs font-label-caps tracking-wider hover:opacity-95 transition-opacity no-underline shadow-sm"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Canvas</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ── 2. FLAGSHIP HERO HEADER ── */}
      <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-12 overflow-hidden pixel-grid border-b border-line">

        <div className="max-w-6xl mx-auto relative z-10 space-y-8">
          {/* Metadata Badges Ribbon */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs font-mono">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.1] text-white backdrop-blur-md">
              <CompanyLogo company={problem.company} className="w-4 h-4" />
              <span className="font-semibold text-white/90">{problem.company} System</span>
            </div>

            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-semibold ${diff.bg} ${diff.text} ${diff.border} backdrop-blur-md`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${diff.dot} animate-pulse`} />
              {problem.difficulty}
            </span>

            <span className="px-3 py-1 rounded-full bg-surface-container/60 border border-border/60 text-muted-foreground uppercase tracking-wider text-[11px] font-medium">
              {problem.category}
            </span>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container/60 border border-border/60 text-muted-foreground text-[11px]">
              <Clock className="w-3.5 h-3.5 text-surface-tint" />
              <span>{problem.estimatedTime}</span>
            </div>
          </div>

          {/* Title & Description */}
          <div className="space-y-4 max-w-4xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.18] font-sans">
              {problem.title}
            </h1>

            <p className="text-base sm:text-lg text-white/70 leading-relaxed font-normal">
              {problem.description}
            </p>
          </div>

          {/* 4-Pillar Scale & Architecture Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-surface-container-lowest/70 border border-white/[0.08] backdrop-blur-md flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-surface-tint/10 border border-surface-tint/20 flex items-center justify-center text-surface-tint shrink-0">
                <Activity className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 font-semibold block">
                  Scale &amp; Traffic
                </span>
                <span className="text-xs sm:text-sm font-bold text-white block">
                  {problem.scale}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-surface-container-lowest/70 border border-white/[0.08] backdrop-blur-md flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-good shrink-0">
                <DollarSign className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 font-semibold block">
                  Monthly Cloud Budget
                </span>
                <span className="text-xs sm:text-sm font-bold text-white block">
                  {problem.budget}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-surface-container-lowest/70 border border-white/[0.08] backdrop-blur-md flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-warn shrink-0">
                <Gauge className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 font-semibold block">
                  Latency Target (P99)
                </span>
                <span className="text-xs sm:text-sm font-bold text-white block">
                  &lt; 50ms Realtime SLA
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-surface-container-lowest/70 border border-white/[0.08] backdrop-blur-md flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 font-semibold block">
                  Availability SLA
                </span>
                <span className="text-xs sm:text-sm font-bold text-white block">
                  99.99% Multi-AZ Active
                </span>
              </div>
            </div>
          </div>

          {/* Quick Action CTAs */}
          <div className="flex items-center gap-3.5 flex-wrap pt-2">
            <Link
              href={`/playground?challenge=${problem.slug}`}
              className="px-6 py-3.5 rounded-xl bg-surface-tint text-black font-bold text-xs uppercase tracking-widest hover:bg-surface-tint transition-all flex items-center gap-2 group font-sans no-underline"
            >
              <Zap className="w-4 h-4" />
              <span>OPEN IN PLAYGROUND CANVAS</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            {problem.referenceWorkflow && (
              <Link
                href={`/playground?challenge=${problem.slug}&mode=solution`}
                className="px-6 py-3.5 rounded-xl bg-surface-container-lowest text-on-surface hover:text-white font-semibold text-xs uppercase tracking-widest hover:bg-surface-container-high transition-all border border-outline-variant flex items-center gap-2 font-sans no-underline"
              >
                <Sparkles className="w-4 h-4 text-surface-tint" />
                <span>VIEW REFERENCE WORKFLOW</span>
              </Link>
            )}

            <button
              onClick={() => {
                const el = document.getElementById("problem-spec");
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="px-5 py-3.5 rounded-xl bg-white/[0.04] text-white/80 hover:text-white font-semibold text-xs uppercase tracking-widest hover:bg-white/[0.08] transition-all border border-white/[0.08] flex items-center gap-2 font-sans cursor-pointer"
            >
              <span>SPECS &amp; CONSTRAINTS</span>
            </button>
          </div>
        </div>
        <div className="relative z-10 mx-auto mt-10 max-w-5xl sm:mt-14">
          <div className="frame"><PixelStrip /></div>
        </div>
      </section>

      <main id="problem-spec" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 pt-12 pb-24 space-y-12">
        {/* ── 3. REQUIREMENTS & CONSTRAINTS (TWO COLUMNS) ── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Functional Requirements (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-7 rounded-2xl bg-surface-container/60 border border-border/60 space-y-5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-surface-tint" />
                <h2 className="text-sm font-bold font-mono uppercase tracking-wider text-foreground">
                  System Requirements
                </h2>
              </div>

              <ul className="space-y-3 list-none pl-0">
                {problem.requirements.map((req, i) => (
                  <li
                    key={i}
                    className="p-3.5 rounded-xl bg-surface-container-low border border-border/40 flex items-start gap-3 text-xs sm:text-sm text-foreground/90 leading-relaxed font-body-md"
                  >
                    <CheckCircle2 className="w-4 h-4 text-good shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Graded Architecture Constraints (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-7 rounded-2xl bg-surface-container/80 border border-border/60 space-y-5">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-surface-tint" />
                <h2 className="text-sm font-bold font-mono uppercase tracking-wider text-foreground">
                  Graded Constraints
                </h2>
              </div>

              <div className="space-y-3">
                {problem.constraints.map((constraint, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-surface-container-low border border-border/40 flex items-start gap-3 text-xs text-muted-foreground leading-relaxed"
                  >
                    <span className="font-mono text-xs font-bold text-surface-tint shrink-0 pt-0.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-foreground/90 font-medium">
                      {constraint}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Primary Call to Action Box */}
            <div className="p-6 rounded-2xl bg-surface-container border border-surface-tint/30 space-y-4 text-center">
              <div className="space-y-1.5">
                <h3 className="text-base font-bold text-foreground">
                  Ready to design?
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Open this challenge in the interactive system design playground and satisfy all architecture constraints.
                </p>
              </div>

              <div className="space-y-2.5 pt-1">
                <Link
                  href={`/playground?challenge=${problem.slug}`}
                  className="w-full py-3.5 px-6 rounded-xl bg-surface-tint text-on-primary font-bold text-xs font-label-caps tracking-widest uppercase hover:opacity-95 transition-all flex items-center justify-center gap-2 shadow-lg border-none cursor-pointer no-underline"
                >
                  <span>OPEN IN PLAYGROUND</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {problem.referenceWorkflow && (
                  <Link
                    href={`/playground?challenge=${problem.slug}&mode=solution`}
                    className="w-full py-3 px-6 rounded-xl bg-surface-container-high hover:bg-surface-container-highest border border-surface-tint/40 text-surface-tint font-bold text-xs font-label-caps tracking-widest uppercase transition-all flex items-center justify-center gap-2 cursor-pointer no-underline"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>VIEW WORKFLOW</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. RELATED CHALLENGES ── */}
        {relatedProblems.length > 0 && (
          <section className="pt-12 border-t border-border/40 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-surface-tint font-semibold block mb-1">
                  Explore More
                </span>
                <h2 className="text-xl font-bold text-foreground tracking-tight">
                  Related Architecture Challenges
                </h2>
              </div>

              <Link
                href="/system-design/problems"
                className="text-xs font-mono text-muted-foreground hover:text-surface-tint flex items-center gap-1 transition-colors"
              >
                <span>All Problems</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedProblems.map((rp) => {
                const rDiff = difficultyColors[rp.difficulty] || difficultyColors.Medium;
                return (
                  <Link
                    key={rp.id}
                    href={`/system-design/problems/${rp.slug}`}
                    className="p-5 rounded-2xl bg-surface-container border border-border/50 hover:border-surface-tint/40 hover:bg-surface-container-high transition-all flex flex-col justify-between group space-y-3"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="font-semibold text-muted-foreground">{rp.company}</span>
                        <span className={`text-[11px] font-semibold ${rDiff.text}`}>{rp.difficulty}</span>
                      </div>
                      <h3 className="text-sm font-bold text-foreground group-hover:text-surface-tint transition-colors line-clamp-1">
                        {rp.title}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {rp.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-border/40 text-[11px] font-mono text-muted-foreground flex items-center justify-between">
                      <span>{rp.scale.split("·")[0]}</span>
                      <span className="text-surface-tint group-hover:translate-x-0.5 transition-transform">→</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
