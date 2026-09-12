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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24 space-y-12">
        {/* ── 1. PAGE HERO ── */}
        <section className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-surface-tint" />
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-surface-tint">
              System Design Workspace
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-[1.15]">
            SYSTEM DESIGN PROBLEMS
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Practice system design by solving real-world architecture problems with constraints around scale, reliability, cost, and performance.
          </p>
        </section>

        {/* ── 2. SECTION INTRO & QUICK STATS ── */}
        <div className="p-6 sm:p-7 rounded-2xl bg-surface-container/60 border border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <h2 className="text-base sm:text-lg font-bold text-foreground">
              Architecture Challenges
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xl">
              Choose a problem, understand the constraints and traffic volume, then build your interactive architecture on the canvas.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/playground"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface-container-high border border-border hover:border-surface-tint/40 text-foreground text-xs font-semibold font-label-caps tracking-wider transition-colors"
            >
              <Boxes className="w-4 h-4 text-surface-tint" />
              <span>Blank Playground</span>
            </Link>
          </div>
        </div>

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
                      <div className="flex items-center justify-between gap-3 pt-1">
                        <Link
                          href={`/system-design/problems/${problem.slug}`}
                          className="text-xs font-semibold text-foreground hover:text-surface-tint inline-flex items-center gap-1 transition-colors"
                        >
                          <span>Open Problem</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </Link>

                        <Link
                          href={`/playground?challenge=${problem.slug}`}
                          className="px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-tint hover:text-on-primary text-[11px] font-mono font-medium text-foreground transition-all flex items-center gap-1 border border-border hover:border-surface-tint"
                        >
                          <span>Playground</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
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
