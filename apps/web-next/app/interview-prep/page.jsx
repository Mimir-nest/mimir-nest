"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Search,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Building2,
  BookOpen,
  Layers,
  Clock,
  Target,
  ShieldCheck,
} from "lucide-react";
import CompanyLogo from "@/components/common/CompanyLogo";
import { companyToSlug } from "@/lib/interviewPrepUtils";
import { useAuthStore } from "@/store/useAuthStore";

const ParticleWave = dynamic(
  () => import("@/components/ui/particle-wave").then((mod) => mod.ParticleWave),
  { ssr: false }
);

export default function InterviewPrepHub() {
  const { isAuthenticated, openAuthModal } = useAuthStore();

  // Data States
  const [questions, setQuestions] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Company Explorer Filters
  const [companyIndustryFilter, setCompanyIndustryFilter] = useState("all");
  const [companySearchQuery, setCompanySearchQuery] = useState("");

  // Local Storage (Practiced & Saved)
  const [practicedIds, setPracticedIds] = useState(new Set());

  // Load User Progress from LocalStorage
  useEffect(() => {
    try {
      const savedPracticed = JSON.parse(
        localStorage.getItem("mimir_prep_practiced") || "[]"
      );
      setPracticedIds(new Set(savedPracticed));
    } catch (e) {
      console.debug("Failed to read initial storage:", e);
    }
  }, []);

  // Fetch all questions and companies
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    Promise.all([
      fetch("/api/interview-prep?limit=400").then((r) => r.json()),
      fetch("/api/interview-prep/companies").then((r) => r.json()),
    ])
      .then(([questionsRes, companiesRes]) => {
        if (!isMounted) return;

        const qList = questionsRes.data || [];
        const cList = companiesRes.data || [];

        setQuestions(qList);
        setCompanies(cList);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load interview prep data:", err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Filtered companies in company explorer
  const filteredCompanies = useMemo(() => {
    return companies.filter((c) => {
      if (
        companyIndustryFilter !== "all" &&
        c.industry?.toLowerCase() !== companyIndustryFilter.toLowerCase()
      ) {
        return false;
      }
      if (companySearchQuery.trim()) {
        const q = companySearchQuery.toLowerCase().trim();
        const matches =
          c.name?.toLowerCase().includes(q) ||
          c.industry?.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    });
  }, [companies, companyIndustryFilter, companySearchQuery]);

  // Unique Company Industries for quick tabs
  const companyIndustries = useMemo(() => {
    const set = new Set(companies.map((c) => c.industry).filter(Boolean));
    return Array.from(set);
  }, [companies]);

  // Smooth scroll helpers
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const practicedPercentage = Math.round(
    questions.length > 0 ? (practicedIds.size / questions.length) * 100 : 0
  );

  return (
    <div className="min-h-screen bg-mn-background text-on-background selection:bg-surface-tint/30">
      <Navbar />

      {/* ── Sanctuary Flagship Hero Header ── */}
      <section className="relative bg-surface-container pt-[120px] md:pt-[150px] pb-16 md:pb-24 px-4 sm:px-6 md:px-16 overflow-hidden rounded-b-3xl border-b border-border/40">
        {/* Background Particle Wave */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-65">
          <ParticleWave />
        </div>

        {/* Ambient Decorative Glowing Rings */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full border border-surface-tint/15 translate-x-1/4 -translate-y-1/4 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[550px] h-[550px] rounded-full border border-surface-tint/20 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full border border-primary-container/40 -translate-x-1/2 translate-y-1/2 pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-xs font-label-caps text-surface-tint tracking-widest uppercase mx-auto"
          >
            <Sparkles className="w-4 h-4 text-surface-tint" />
            <span>Non-Technical Interview Prep</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display-lg text-display-lg-mobile md:text-display-lg text-foreground leading-tight"
          >
            Prepare for the Conversations <br />
            <span className="text-surface-tint">Behind the Interview.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-body-lg text-body-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Practice behavioral, leadership, product strategy, consulting, and market-focused interview questions from 20 top-tier global companies with verified response blueprints.
          </motion.p>

          {/* Stats Strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto pt-2"
          >
            {[
              { label: "Questions", val: "400 Total" },
              { label: "Top Companies", val: "20 Leaders" },
              { label: "Core Categories", val: "8 Roles" },
              { label: "Framework", val: "STAR Ready" },
            ].map((stat, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl glass-panel text-center border border-border/40"
              >
                <div className="font-headline-md text-xl text-foreground font-bold">
                  {stat.val}
                </div>
                <div className="text-[10px] font-label-caps text-muted-foreground uppercase tracking-widest mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-3 pt-2"
          >
            <button
              onClick={() => scrollToSection("companies")}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-surface-tint text-on-primary font-semibold text-xs font-label-caps tracking-widest uppercase hover:scale-105 transition-all duration-200 shadow-lg shadow-surface-tint/20 cursor-pointer border-none"
            >
              <span>Explore Companies</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollToSection("how-to-prepare")}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full glass-panel text-foreground hover:text-surface-tint hover:bg-white/5 font-semibold text-xs font-label-caps tracking-widest uppercase transition-all duration-200 border border-border/60 cursor-pointer"
            >
              <span>How To Prepare</span>
            </button>
          </motion.div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-20">
        {/* ── 2. QUICK START / PRACTICE DIMENSIONS ── */}
        <section id="how-to-prepare" className="space-y-4">
          <h2 className="text-xs font-mono uppercase tracking-widest text-[#9B9992] font-semibold">
            How to prepare
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Step 1 */}
            <div className="p-5 rounded-2xl bg-[#151616] border border-[#242525] flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#FF5A36] block mb-2">
                  01 · TARGET A COMPANY
                </span>
                <h3 className="text-base font-bold text-[#F4F1EA] mb-1">
                  Company Context
                </h3>
                <p className="text-xs text-[#9B9992] leading-relaxed">
                  Select from 20 top technology, consulting, and finance leaders with tailored questions.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-2xl bg-[#151616] border border-[#242525] flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#FF5A36] block mb-2">
                  02 · STRUCTURE YOUR ANSWERS
                </span>
                <h3 className="text-base font-bold text-[#F4F1EA] mb-1">
                  STAR Frameworks
                </h3>
                <p className="text-xs text-[#9B9992] leading-relaxed">
                  Review executive summaries, detailed walkthroughs, and key signals interviewers look for.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-2xl bg-[#151616] border border-[#242525] flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#FF5A36] block mb-2">
                  03 · MASTER FOLLOW-UPS
                </span>
                <h3 className="text-base font-bold text-[#F4F1EA] mb-1">
                  Avoid Common Mistakes
                </h3>
                <p className="text-xs text-[#9B9992] leading-relaxed">
                  Prepare for probing questions and calibrate your responses against evaluation rubrics.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. COMPANY EXPLORER ── */}
        <section id="companies" className="space-y-6 pt-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#FF5A36] font-semibold block mb-1">
                Company Explorer
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#F4F1EA] tracking-tight">
                Practice by company
              </h2>
              <p className="text-sm text-[#9B9992] mt-1 max-w-xl">
                See what each company emphasizes and start with the interview style you&apos;re targeting.
              </p>
            </div>

            {/* Company Search */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-[#9B9992] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={companySearchQuery}
                  onChange={(e) => setCompanySearchQuery(e.target.value)}
                  placeholder="Find company..."
                  className="pl-8 pr-3 py-1.5 rounded-lg bg-[#151616] border border-[#242525] text-xs text-[#F4F1EA] placeholder:text-[#9B9992]/60 focus:outline-none focus:border-[#FF5A36]/60 transition-colors w-40 sm:w-48"
                />
              </div>
            </div>
          </div>

          {/* Industry Filter Pills for Companies */}
          {companyIndustries.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              <button
                onClick={() => setCompanyIndustryFilter("all")}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors border cursor-pointer ${
                  companyIndustryFilter === "all"
                    ? "bg-[#1E2020] text-[#FF5A36] border-[#FF5A36]/40 font-semibold"
                    : "bg-[#151616] text-[#9B9992] hover:text-[#F4F1EA] border-[#242525]"
                }`}
              >
                All Industries ({companies.length})
              </button>
              {companyIndustries.map((ind) => {
                const count = companies.filter((c) => c.industry === ind).length;
                const isSelected = companyIndustryFilter === ind;
                return (
                  <button
                    key={ind}
                    onClick={() => setCompanyIndustryFilter(isSelected ? "all" : ind)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors border cursor-pointer ${
                      isSelected
                        ? "bg-[#1E2020] text-[#FF5A36] border-[#FF5A36]/40 font-semibold"
                        : "bg-[#151616] text-[#9B9992] hover:text-[#F4F1EA] border-[#242525]"
                    }`}
                  >
                    {ind} ({count})
                  </button>
                );
              })}
            </div>
          )}

          {/* Company Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
            {loading ? (
              <div className="col-span-full p-16 text-center rounded-2xl bg-[#151616] border border-[#242525]">
                <div className="w-8 h-8 border-2 border-[#FF5A36] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-[#9B9992] text-sm">Loading companies...</p>
              </div>
            ) : filteredCompanies.length > 0 ? (
              filteredCompanies.map((comp) => {
                const slug = companyToSlug(comp.name);
                const previewCategories = (comp.categories || []).slice(0, 3);

                return (
                  <Link
                    key={comp.name}
                    href={`/interview-prep/company/${slug}`}
                    className="p-4 rounded-2xl bg-[#151616] border border-[#242525] hover:border-[#FF5A36]/40 hover:bg-[#1A1B1B] transition-all group flex flex-col justify-between"
                  >
                    <div>
                      {/* Card Top: Logo + Count */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-[#1E2020] p-2 flex items-center justify-center border border-[#242525] group-hover:border-[#FF5A36]/30 transition-colors">
                          <CompanyLogo company={comp.name} className="w-6 h-6" />
                        </div>

                        <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-[#1E2020] text-[#9B9992] group-hover:text-[#FF5A36] border border-[#242525] transition-colors">
                          {comp.totalQuestions || 20} Qs
                        </span>
                      </div>

                      {/* Name & Industry */}
                      <h3 className="text-sm font-semibold text-[#F4F1EA] group-hover:text-[#FF5A36] transition-colors">
                        {comp.name}
                      </h3>
                      <p className="text-xs text-[#9B9992] mt-0.5 line-clamp-1">
                        {comp.industry || "Technology"}
                      </p>
                    </div>

                    {/* Category Preview */}
                    <div className="mt-3 pt-2.5 border-t border-[#242525] flex items-center justify-between text-[11px] text-[#9B9992]/80">
                      <span className="truncate">
                        {previewCategories.join(" · ") || "Behavioral"}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#9B9992] group-hover:text-[#FF5A36] group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="col-span-full p-12 text-center rounded-2xl bg-[#151616] border border-[#242525]">
                <Search className="w-8 h-8 text-[#9B9992] mx-auto mb-3 opacity-60" />
                <h3 className="text-sm font-semibold text-[#F4F1EA] mb-1">
                  No companies found
                </h3>
                <p className="text-xs text-[#9B9992] max-w-sm mx-auto mb-4">
                  Try clearing your search or selecting a different industry.
                </p>
                <button
                  onClick={() => {
                    setCompanySearchQuery("");
                    setCompanyIndustryFilter("all");
                  }}
                  className="px-4 py-2 rounded-xl bg-[#1E2020] text-[#F4F1EA] text-xs font-medium border border-[#242525] hover:border-[#FF5A36]/30 cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ── 4. PROGRESS SECTION ── */}
        <section className="p-6 sm:p-8 rounded-2xl bg-[#151616] border border-[#242525] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-[#FF5A36] block mb-0.5">
                YOUR PROGRESS
              </span>
              <h3 className="text-base font-bold text-[#F4F1EA]">
                {practicedIds.size} of {questions.length} practiced ({practicedPercentage}%)
              </h3>
            </div>

            {!isAuthenticated && (
              <p className="text-xs text-[#9B9992]">
                <button
                  onClick={openAuthModal}
                  className="text-[#FF5A36] hover:underline font-semibold bg-transparent border-none p-0 cursor-pointer"
                >
                  Sign in
                </button>{" "}
                to save your progress across devices.
              </p>
            )}
          </div>

          {/* Minimal progress bar */}
          <div className="w-full h-2 rounded-full bg-[#1E2020] overflow-hidden">
            <div
              className="h-full bg-[#FF5A36] transition-all duration-300"
              style={{ width: `${practicedPercentage}%` }}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
