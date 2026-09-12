"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Search,
  Building2,
  ArrowRight,
  ExternalLink,
  SlidersHorizontal,
  Sparkles,
  Layers,
  Database,
  Server,
  Cloud,
  Cpu,
  CheckCircle2,
  DollarSign,
  Activity,
  Boxes,
} from "lucide-react";
import { systemDesignProblems } from "../data/problems";
import CompanyLogo from "@/components/common/CompanyLogo";

import dynamic from "next/dynamic";

const ParticleWave = dynamic(
  () => import("@/components/ui/particle-wave").then((mod) => mod.ParticleWave),
  { ssr: false }
);

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

const categories = [
  "All",
  "Product Systems",
  "Distributed Systems",
  "Data Systems",
  "Infrastructure",
  "Fundamentals",
];

const difficulties = ["All", "Easy", "Medium", "Hard"];

export default function SystemDesignProblemsPage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProblems = useMemo(() => {
    return systemDesignProblems.filter((problem) => {
      const matchDifficulty =
        selectedDifficulty === "All" || problem.difficulty === selectedDifficulty;
      const matchCategory =
        selectedCategory === "All" || problem.category === selectedCategory;
      const matchSearch =
        !searchQuery ||
        problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        problem.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        problem.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchDifficulty && matchCategory && matchSearch;
    });
  }, [selectedDifficulty, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-mn-background text-on-background selection:bg-surface-tint/30">
      <Navbar />

      {/* ── FLAGSHIP HERO SECTION (Matches Mimir Nest Flagship Style) ── */}
      <section className="relative bg-[#151616] pt-[130px] md:pt-[160px] pb-16 md:pb-20 px-6 md:px-16 overflow-hidden rounded-b-3xl border-b border-white/[0.06] bg-cover bg-center" style={{ backgroundImage: "url('/images/hero-bg.png')" }}>
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#151616]/95 via-[#151616]/85 to-[#151616]/95 z-0 pointer-events-none" />

        {/* Background Particle Wave */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-65">
          <ParticleWave />
        </div>

        {/* Decorative Rings */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full border border-[#FF5A36]/10 translate-x-1/4 -translate-y-1/4 pointer-events-none z-0" />
        <div className="absolute top-0 right-0 w-[550px] h-[550px] rounded-full border border-[#FF5A36]/15 translate-x-1/3 -translate-y-1/3 pointer-events-none z-0" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full border border-white/[0.03] -translate-x-1/2 translate-y-1/2 pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-6 w-fit border border-white/[0.08] shadow-inner bg-white/[0.02] backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-[#FF5A36] animate-pulse" />
              <span className="font-mono text-xs text-[#FF5A36] tracking-widest uppercase font-semibold">
                Interactive Architecture Challenges
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15] mb-6 font-sans">
              System Design <br />
              <span className="text-[#FF5A36]">Problems & Workflows.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base md:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed mb-8 font-normal font-sans">
              Solve production-grade system design problems with live constraint validation, real scale SLAs, monthly cost limits, and reference architecture workflows.
            </p>

            {/* Quick Stats Strip */}
            <div className="grid grid-cols-3 gap-4 w-full max-w-2xl pt-2 mb-8 z-10 font-sans">
              {[
                { label: "Challenges", val: `${systemDesignProblems.length} Total` },
                { label: "Reference Workflows", val: "100% Available" },
                { label: "Validation Engine", val: "Live Graded" },
              ].map((stat, i) => (
                <div key={i} className="p-4 rounded-xl glass-panel text-center border border-white/[0.08] bg-[#141517]/55 backdrop-blur-md">
                  <div className="text-xl text-white font-bold">{stat.val}</div>
                  <div className="text-[10px] text-white/50 uppercase tracking-widest font-mono mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Navigation Actions */}
            <div className="flex items-center justify-center gap-3 flex-wrap pt-2">
              <button
                onClick={() => {
                  const el = document.getElementById("challenges-workspace");
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="px-6 py-3 rounded-full bg-[#FF5A36] text-black font-semibold text-xs uppercase tracking-widest hover:bg-[#ff7a5a] transition-all shadow-[0_0_20px_rgba(255,90,54,0.35)] flex items-center gap-2 group border border-[#FF5A36] font-sans cursor-pointer"
              >
                <span>Browse Challenges</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <Link
                href="/playground"
                className="px-6 py-3 rounded-full bg-[#161c1d] text-[#e1e7e3] hover:text-white font-semibold text-xs uppercase tracking-widest hover:bg-[#202729] transition-all border border-[#2e393b] flex items-center gap-2 font-sans no-underline"
              >
                <Boxes className="w-4 h-4 text-[#ff7657]" />
                <span>Blank Playground</span>
              </Link>

              <Link
                href="/system-design"
                className="px-6 py-3 rounded-full bg-[#161c1d] text-[#e1e7e3] hover:text-white font-semibold text-xs uppercase tracking-widest hover:bg-[#202729] transition-all border border-[#2e393b] flex items-center gap-2 font-sans no-underline"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#9aa6a5]" />
                <span>500+ Interview Q&A</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <main id="challenges-workspace" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 space-y-12">

        {/* ── 3. SEARCH & FILTERS ── */}
        <section className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search challenges (e.g. Gmail, Kafka, Rate Limiter)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-container border border-border/70 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-surface-tint/60 focus:ring-1 focus:ring-surface-tint/60 transition-all font-mono"
              />
            </div>

            {/* Difficulty Tabs */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-surface-container border border-border/60 overflow-x-auto">
              {difficulties.map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer border-none whitespace-nowrap ${
                    selectedDifficulty === diff
                      ? "bg-surface-tint text-on-primary font-semibold shadow-sm"
                      : "bg-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-muted-foreground font-mono text-[11px] uppercase tracking-wider shrink-0 mr-1">
              Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs transition-all duration-150 cursor-pointer border whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-surface-container-high border-surface-tint text-foreground font-semibold"
                    : "bg-surface-container border-border/50 text-muted-foreground hover:text-foreground hover:border-border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* ── 4. CHALLENGE GRID ── */}
        <section className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
            <span>
              Showing <strong className="text-foreground">{filteredProblems.length}</strong> problems
            </span>
            {(selectedDifficulty !== "All" || selectedCategory !== "All" || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedDifficulty("All");
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="text-surface-tint hover:underline cursor-pointer bg-transparent border-none"
              >
                Reset filters
              </button>
            )}
          </div>

          {filteredProblems.length === 0 ? (
            <div className="p-16 rounded-2xl bg-surface-container/40 border border-dashed border-border/70 text-center space-y-3">
              <Boxes className="w-10 h-10 text-muted-foreground mx-auto" />
              <h3 className="text-base font-bold text-foreground">No matching challenges found</h3>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                Try adjusting your search keyword, difficulty, or category filter to discover more system design problems.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProblems.map((problem) => {
                const diff = difficultyColors[problem.difficulty] || difficultyColors.Medium;

                return (
                  <div
                    key={problem.id}
                    className="p-5 sm:p-6 rounded-2xl bg-surface-container border border-border/60 hover:border-surface-tint/40 transition-all flex flex-col justify-between group space-y-4"
                  >
                    {/* Top Metadata */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-md bg-surface-container-high p-1 flex items-center justify-center border border-border/40">
                            <CompanyLogo company={problem.company} className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-xs font-medium text-muted-foreground">
                            {problem.company}
                          </span>
                        </div>

                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[11px] font-semibold font-mono ${diff.bg} ${diff.text} ${diff.border}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${diff.dot}`} />
                          {problem.difficulty}
                        </span>
                      </div>

                      {/* Title */}
                      <Link
                        href={`/system-design/problems/${problem.slug}`}
                        className="block group-hover:text-surface-tint transition-colors"
                      >
                        <h3 className="text-lg font-bold text-foreground tracking-tight line-clamp-1">
                          {problem.title}
                        </h3>
                      </Link>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {problem.description}
                      </p>
                    </div>

                    {/* Scale & Budget Badges */}
                    <div className="space-y-3 pt-2 border-t border-border/40">
                      <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                        <div className="p-2 rounded-lg bg-surface-container-low border border-border/40 flex items-center gap-1.5 text-muted-foreground">
                          <Activity className="w-3 h-3 text-surface-tint shrink-0" />
                          <span className="truncate" title={problem.scale}>
                            {problem.scale.split("·")[0].trim()}
                          </span>
                        </div>

                        <div className="p-2 rounded-lg bg-surface-container-low border border-border/40 flex items-center gap-1.5 text-muted-foreground">
                          <DollarSign className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span className="truncate">{problem.budget}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between gap-2 pt-1 flex-wrap sm:flex-nowrap">
                        <Link
                          href={`/system-design/problems/${problem.slug}`}
                          className="text-xs font-semibold text-foreground hover:text-surface-tint inline-flex items-center gap-1 transition-colors"
                        >
                          <span>Open Problem</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </Link>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {problem.referenceWorkflow && (
                            <Link
                              href={`/playground?challenge=${problem.slug}&mode=solution`}
                              className="px-2.5 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-tint/15 text-surface-tint text-[11px] font-mono font-medium transition-all flex items-center gap-1 border border-surface-tint/30 no-underline"
                              title="View reference workflow"
                            >
                              <Sparkles className="w-3 h-3" />
                              <span>Workflow</span>
                            </Link>
                          )}
                          <Link
                            href={`/playground?challenge=${problem.slug}`}
                            className="px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-tint hover:text-on-primary text-[11px] font-mono font-medium text-foreground transition-all flex items-center gap-1 border border-border hover:border-surface-tint no-underline"
                          >
                            <span>Playground</span>
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
