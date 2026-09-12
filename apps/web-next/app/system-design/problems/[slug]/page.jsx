"use client";

import React from "react";
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
} from "lucide-react";
import { getProblemBySlug, systemDesignProblems } from "../../data/problems";
import CompanyLogo from "@/components/common/CompanyLogo";

const difficultyColors = {
  Easy: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/30",
    dot: "bg-emerald-400",
  },
  Medium: {
    bg: "bg-amber-500/10",
    text: "text-amber-400",
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

  if (!problem) {
    return (
      <div className="min-h-screen bg-mn-background text-on-background selection:bg-surface-tint/30">
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 pt-36 pb-24 text-center space-y-6">
          <Boxes className="w-12 h-12 text-surface-tint mx-auto" />
          <h1 className="text-2xl font-bold text-foreground">Problem Not Found</h1>
          <p className="text-sm text-muted-foreground">
            The system design problem you requested could not be located in our challenge library.
          </p>
          <Link
            href="/system-design/problems"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-tint text-on-primary font-semibold text-xs font-label-caps tracking-wider"
          >
            Back to Problems Library
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const diff = difficultyColors[problem.difficulty] || difficultyColors.Medium;
  const relatedProblems = systemDesignProblems
    .filter((p) => p.slug !== problem.slug && (p.category === problem.category || p.difficulty === problem.difficulty))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-mn-background text-on-background selection:bg-surface-tint/30">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24 space-y-10">
        {/* ── 1. BREADCRUMBS ── */}
        <div className="flex items-center justify-between gap-4 pb-6 border-b border-border/40">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-muted-foreground flex-wrap">
            <Link
              href="/system-design/problems"
              className="hover:text-surface-tint transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>System Design Problems</span>
            </Link>
            <span>/</span>
            <span className="text-foreground font-semibold truncate max-w-[200px]">
              {problem.title}
            </span>
          </nav>

          <Link
            href={`/playground?challenge=${problem.slug}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-tint text-on-primary font-semibold text-xs font-label-caps tracking-wider hover:opacity-90 transition-opacity"
          >
            <span>Playground</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* ── 2. HERO HEADER ── */}
        <section className="space-y-6">
          <div className="space-y-3">
            {/* Top metadata tags */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[11px] font-semibold ${diff.bg} ${diff.text} ${diff.border}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${diff.dot}`} />
                {problem.difficulty}
              </span>
              <span className="text-muted-foreground/40">·</span>
              <span className="font-medium uppercase tracking-wider text-muted-foreground">
                {problem.category}
              </span>
              <span className="text-muted-foreground/40">·</span>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="w-3.5 h-3.5" />
                <span>{problem.estimatedTime}</span>
              </div>
            </div>

            {/* Company & Title */}
            <div className="flex items-center gap-3 pt-1">
              <div className="w-8 h-8 rounded-lg bg-surface-container-high p-1.5 flex items-center justify-center border border-border/60">
                <CompanyLogo company={problem.company} className="w-5 h-5" />
              </div>
              <span className="text-sm font-semibold text-muted-foreground">
                {problem.company} Architecture
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight leading-[1.15]">
              {problem.title}
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed pt-1">
              {problem.description}
            </p>
          </div>

          {/* Scale & Budget Key Metrics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-surface-container border border-border/60 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-surface-tint/10 border border-surface-tint/20 flex items-center justify-center text-surface-tint shrink-0">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground font-semibold block mb-0.5">
                  Traffic & Scale
                </span>
                <span className="text-sm sm:text-base font-bold text-foreground">
                  {problem.scale}
                </span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-surface-container border border-border/60 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground font-semibold block mb-0.5">
                  Monthly Budget Limit
                </span>
                <span className="text-sm sm:text-base font-bold text-foreground">
                  {problem.budget}
                </span>
              </div>
            </div>
          </div>
        </section>

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
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
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

              <Link
                href={`/playground?challenge=${problem.slug}`}
                className="w-full py-3.5 px-6 rounded-xl bg-surface-tint text-on-primary font-bold text-xs font-label-caps tracking-widest uppercase hover:opacity-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-surface-tint/20 border-none cursor-pointer"
              >
                <span>OPEN IN PLAYGROUND</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
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
