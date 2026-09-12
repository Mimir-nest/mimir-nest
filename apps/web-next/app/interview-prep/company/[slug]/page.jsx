"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  ArrowLeft,
  Search,
  CheckCircle2,
  Circle,
  Bookmark,
  Copy,
  Check,
  Clock,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  Layers,
  Sparkles,
  Building2,
  X,
  ExternalLink,
} from "lucide-react";
import CompanyLogo from "@/components/common/CompanyLogo";
import { findCompanyBySlug, difficultyMeta } from "@/lib/interviewPrepUtils";

const ParticleWave = dynamic(
  () => import("@/components/ui/particle-wave").then((mod) => mod.ParticleWave),
  { ssr: false }
);

export default function CompanyInterviewPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug;

  const [companyData, setCompanyData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters within company page
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [activeTab, setActiveTab] = useState("all"); // "all" | "practiced" | "saved"

  // User State from LocalStorage
  const [practicedIds, setPracticedIds] = useState(new Set());
  const [bookmarkedIds, setBookmarkedIds] = useState(new Set());
  const [copiedId, setCopiedId] = useState(null);

  // Load user saved/practiced state
  useEffect(() => {
    try {
      const savedBookmarked = JSON.parse(
        localStorage.getItem("mimir_prep_bookmarks") || "[]"
      );
      const savedPracticed = JSON.parse(
        localStorage.getItem("mimir_prep_practiced") || "[]"
      );
      setBookmarkedIds(new Set(savedBookmarked));
      setPracticedIds(new Set(savedPracticed));
    } catch (_) {
      // ignore
    }
  }, []);

  // Fetch company metadata & questions
  useEffect(() => {
    if (!slug) return;
    let isMounted = true;
    setLoading(true);
    setError(null);

    Promise.all([
      fetch("/api/interview-prep/companies").then((r) => r.json()),
      fetch("/api/interview-prep?limit=400").then((r) => r.json()),
    ])
      .then(([companiesRes, questionsRes]) => {
        if (!isMounted) return;

        const companiesList = companiesRes.data || [];
        const matchedCompany = findCompanyBySlug(slug, companiesList);

        if (!matchedCompany) {
          setError(`Company "${slug}" could not be found.`);
          setLoading(false);
          return;
        }

        setCompanyData(matchedCompany);

        // Filter questions belonging to this company
        const allQuestions = questionsRes.data || [];
        const companyQuestions = allQuestions.filter(
          (q) =>
            q.company?.toLowerCase().trim() ===
            matchedCompany.name?.toLowerCase().trim()
        );

        setQuestions(companyQuestions);
        setLoading(false);
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || "Failed to load company questions.");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  const toggleBookmark = (id) => {
    const updated = new Set(bookmarkedIds);
    if (updated.has(id)) {
      updated.delete(id);
      toast.info("Removed from saved questions");
    } else {
      updated.add(id);
      toast.success("Saved to bookmarked questions");
    }
    setBookmarkedIds(updated);
    try {
      localStorage.setItem(
        "mimir_prep_bookmarks",
        JSON.stringify(Array.from(updated))
      );
    } catch (e) {
      console.debug("Failed to update saved bookmarks:", e);
    }
  };

  const togglePracticed = (id) => {
    const updated = new Set(practicedIds);
    if (updated.has(id)) {
      updated.delete(id);
      toast.info("Marked as unpracticed");
    } else {
      updated.add(id);
      toast.success("Marked as practiced!");
    }
    setPracticedIds(updated);
    try {
      localStorage.setItem(
        "mimir_prep_practiced",
        JSON.stringify(Array.from(updated))
      );
    } catch (e) {
      console.debug("Failed to update practiced questions:", e);
    }
  };

  const handleCopy = (q) => {
    const text = `${q.question}\n\n[MimirNest Practice Question #${q.question_id} - ${q.company} · ${q.category}]`;
    navigator.clipboard.writeText(text);
    setCopiedId(q.question_id);
    toast.success("Question copied to clipboard");
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Category counts for breakdown
  const categoryCounts = useMemo(() => {
    const counts = {};
    questions.forEach((q) => {
      const cat = q.category || "General";
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [questions]);

  // Filtered Questions
  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      // Search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesText =
          q.question?.toLowerCase().includes(query) ||
          q.question_id?.toLowerCase().includes(query) ||
          q.category?.toLowerCase().includes(query) ||
          (q.tags && q.tags.toLowerCase().includes(query));
        if (!matchesText) return false;
      }

      // Category
      if (selectedCategory !== "all" && q.category !== selectedCategory) {
        return false;
      }

      // Difficulty
      if (selectedDifficulty !== "all" && q.difficulty !== selectedDifficulty) {
        return false;
      }

      // Tab filter
      if (activeTab === "practiced" && !practicedIds.has(q.question_id)) {
        return false;
      }
      if (activeTab === "saved" && !bookmarkedIds.has(q.question_id)) {
        return false;
      }

      return true;
    });
  }, [
    questions,
    searchQuery,
    selectedCategory,
    selectedDifficulty,
    activeTab,
    practicedIds,
    bookmarkedIds,
  ]);

  const companyPracticedCount = useMemo(() => {
    return questions.filter((q) => practicedIds.has(q.question_id)).length;
  }, [questions, practicedIds]);

  const scrollToQuestions = () => {
    const el = document.getElementById("company-questions");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-mn-background text-on-background selection:bg-surface-tint/30">
      <Navbar />

      {/* ── Sanctuary Flagship Company Hero Header ── */}
      <section className="relative bg-surface-container pt-[120px] md:pt-[150px] pb-12 md:pb-16 px-4 sm:px-6 md:px-16 overflow-hidden rounded-b-3xl border-b border-border/40">
        {/* Background Particle Wave */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-65">
          <ParticleWave />
        </div>

        {/* Ambient Decorative Glowing Rings */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full border border-surface-tint/15 translate-x-1/4 -translate-y-1/4 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[550px] h-[550px] rounded-full border border-surface-tint/20 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full border border-primary-container/40 -translate-x-1/2 translate-y-1/2 pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10 space-y-6">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <Link
              href="/interview-prep"
              className="hover:text-surface-tint transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Interview Prep</span>
            </Link>
            <span>/</span>
            <Link
              href="/interview-prep#companies"
              className="hover:text-surface-tint transition-colors"
            >
              Companies
            </Link>
            <span>/</span>
            <span className="text-foreground font-semibold">
              {companyData?.name || slug}
            </span>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="p-16 text-center rounded-2xl glass-panel border border-border/40">
              <div className="w-8 h-8 border-2 border-surface-tint border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground text-sm">Loading company interview questions...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="p-12 text-center rounded-2xl glass-panel border border-border/40">
              <Building2 className="w-10 h-10 text-surface-tint mx-auto mb-3" />
              <h2 className="text-lg font-bold text-foreground mb-2">Company Not Found</h2>
              <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">{error}</p>
              <Link
                href="/interview-prep"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-tint text-on-primary font-semibold text-xs font-label-caps tracking-wider hover:opacity-90 transition-opacity"
              >
                Back to Companies
              </Link>
            </div>
          )}

          {companyData && !loading && (
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-2">
              <div className="flex items-start gap-4 sm:gap-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-surface-container-high p-3 flex items-center justify-center border border-border/40 shadow-xl shrink-0">
                  <CompanyLogo company={companyData.name} className="w-10 h-10 sm:w-12 sm:h-12" />
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-surface-tint px-2.5 py-0.5 rounded-full glass-panel border border-surface-tint/30">
                      {companyData.industry || "Technology"}
                    </span>
                    <span className="text-xs text-muted-foreground font-mono">
                      {questions.length} Questions
                    </span>
                  </div>

                  <h1 className="font-display-lg text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
                    {companyData.name} <span className="text-surface-tint">Interview Vault</span>
                  </h1>

                  <p className="font-body-md text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
                    Practice real non-technical interview questions across behavioral, leadership, product, strategy, and analytical dimensions asked at {companyData.name}.
                  </p>
                </div>
              </div>

              {/* Hero Actions */}
              <div className="flex flex-row md:flex-col gap-3 shrink-0 pt-2 md:pt-0">
                <button
                  onClick={scrollToQuestions}
                  className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-surface-tint text-on-primary font-semibold text-xs font-label-caps tracking-widest uppercase hover:scale-105 transition-all duration-200 shadow-lg shadow-surface-tint/20 cursor-pointer border-none"
                >
                  <span>Start Practice</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <Link
                  href="/interview-prep#companies"
                  className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full glass-panel text-foreground hover:text-surface-tint hover:bg-white/5 border border-border/60 transition-colors text-xs font-label-caps tracking-wider text-center"
                >
                  All Companies
                </Link>
              </div>
            </div>
          )}

          {companyData && !loading && (
            /* Progress snippet within company */
            <div className="pt-4 border-t border-border/40 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
              <div className="flex items-center gap-3">
                <span className="text-muted-foreground">Company Progress:</span>
                <span className="text-foreground font-semibold">
                  {companyPracticedCount} of {questions.length} practiced ({Math.round(questions.length > 0 ? (companyPracticedCount / questions.length) * 100 : 0)}%)
                </span>
              </div>
              <div className="w-full sm:w-56 h-2 rounded-full bg-surface-container-high overflow-hidden border border-border/40">
                <div
                  className="h-full bg-surface-tint transition-all duration-300"
                  style={{
                    width: `${
                      questions.length > 0
                        ? (companyPracticedCount / questions.length) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {companyData && !loading && (
          <div className="space-y-12">
                          ? (companyPracticedCount / questions.length) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* ── 2. Category Breakdown ── */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#FF5A36] font-semibold">
                  Category Breakdown
                </span>
                <span className="text-xs text-[#9B9992]">
                  Click a category to filter
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer border ${
                    selectedCategory === "all"
                      ? "bg-[#FF5A36] text-[#0F1010] font-semibold border-[#FF5A36]"
                      : "bg-[#151616] text-[#9B9992] hover:text-[#F4F1EA] border-[#242525] hover:border-[#FF5A36]/40"
                  }`}
                >
                  All Categories ({questions.length})
                </button>
                {Object.entries(categoryCounts).map(([cat, count]) => {
                  const isSelected = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(isSelected ? "all" : cat)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer border ${
                        isSelected
                          ? "bg-[#FF5A36] text-[#0F1010] font-semibold border-[#FF5A36]"
                          : "bg-[#151616] text-[#9B9992] hover:text-[#F4F1EA] border-[#242525] hover:border-[#FF5A36]/40"
                      }`}
                    >
                      {cat} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── 3. Question Explorer / Filter Toolbar ── */}
            <div id="company-questions" className="space-y-6 pt-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-[#F4F1EA] tracking-tight">
                    Interview Questions
                  </h2>
                  <p className="text-xs text-[#9B9992] mt-0.5">
                    Showing {filteredQuestions.length} of {questions.length} questions
                  </p>
                </div>

                {/* State Tabs: All / Practiced / Saved */}
                <div className="inline-flex p-1 rounded-xl bg-[#151616] border border-[#242525] text-xs font-medium self-start sm:self-auto">
                  <button
                    onClick={() => setActiveTab("all")}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer border-none ${
                      activeTab === "all"
                        ? "bg-[#1E2020] text-[#F4F1EA] font-semibold shadow-sm"
                        : "bg-transparent text-[#9B9992] hover:text-[#F4F1EA]"
                    }`}
                  >
                    All ({questions.length})
                  </button>
                  <button
                    onClick={() => setActiveTab("practiced")}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer border-none ${
                      activeTab === "practiced"
                        ? "bg-[#1E2020] text-[#F4F1EA] font-semibold shadow-sm"
                        : "bg-transparent text-[#9B9992] hover:text-[#F4F1EA]"
                    }`}
                  >
                    Practiced ({companyPracticedCount})
                  </button>
                  <button
                    onClick={() => setActiveTab("saved")}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer border-none ${
                      activeTab === "saved"
                        ? "bg-[#1E2020] text-[#F4F1EA] font-semibold shadow-sm"
                        : "bg-transparent text-[#9B9992] hover:text-[#F4F1EA]"
                    }`}
                  >
                    Saved (
                    {
                      questions.filter((q) => bookmarkedIds.has(q.question_id))
                        .length
                    }
                    )
                  </button>
                </div>
              </div>

              {/* Search & Difficulty Filter Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-8 relative">
                  <Search className="w-4 h-4 text-[#9B9992] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={`Search questions for ${companyData.name}...`}
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#151616] border border-[#242525] text-sm text-[#F4F1EA] placeholder:text-[#9B9992]/60 focus:outline-none focus:border-[#FF5A36]/60 transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9B9992] hover:text-[#F4F1EA] p-1 border-none bg-transparent cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="sm:col-span-4">
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#151616] border border-[#242525] text-sm text-[#F4F1EA] focus:outline-none focus:border-[#FF5A36]/60 cursor-pointer transition-colors"
                  >
                    <option value="all">All Difficulties</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
              </div>

              {/* ── 4. Questions List ── */}
              <div className="space-y-3">
                {filteredQuestions.length > 0 ? (
                  filteredQuestions.map((q) => {
                    const isPracticed = practicedIds.has(q.question_id);
                    const isBookmarked = bookmarkedIds.has(q.question_id);
                    const isCopied = copiedId === q.question_id;
                    const meta =
                      difficultyMeta[q.difficulty] || difficultyMeta.Medium;

                    return (
                      <div
                        key={q.question_id}
                        className={`p-5 rounded-2xl border transition-all duration-200 bg-[#151616] ${
                          isPracticed
                            ? "border-emerald-500/20 bg-[#151616]/80"
                            : "border-[#242525] hover:border-[#FF5A36]/40"
                        }`}
                      >
                        {/* Meta Header */}
                        <div className="flex items-center justify-between gap-3 mb-2.5 flex-wrap">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-semibold text-[#FF5A36]">
                              {q.question_id}
                            </span>
                            <span className="text-[#9B9992]/40">·</span>
                            <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-[#1E2020] text-[#9B9992] border border-[#242525]">
                              {q.category}
                            </span>
                            <span className="text-[#9B9992]/40">·</span>
                            <span
                              className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded border ${meta.bg} ${meta.text} ${meta.border}`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${meta.dot}`}
                              />
                              {q.difficulty}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 text-xs text-[#9B9992]">
                            <Clock className="w-3.5 h-3.5 text-[#9B9992]" />
                            <span>{q.expected_time || "5–15 min"}</span>
                          </div>
                        </div>

                        {/* Question Text */}
                        <Link
                          href={`/interview-prep/${q.question_id}`}
                          className="block text-base sm:text-lg font-semibold text-[#F4F1EA] hover:text-[#FF5A36] transition-colors leading-snug my-2 group"
                        >
                          <span>{q.question}</span>
                        </Link>

                        {/* Bottom Row */}
                        <div className="mt-4 pt-3.5 border-t border-[#242525] flex items-center justify-between gap-4 flex-wrap">
                          <div className="flex items-center gap-2 text-xs text-[#9B9992]">
                            <CompanyLogo
                              company={q.company}
                              className="w-4 h-4"
                            />
                            <span className="text-[#F4F1EA] font-medium">
                              {q.company}
                            </span>
                            <span className="text-[#9B9992]/40">·</span>
                            <span>{q.industry || companyData.industry}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleCopy(q)}
                              className="p-1.5 rounded-lg text-[#9B9992] hover:text-[#F4F1EA] hover:bg-[#1E2020] transition-colors border-none bg-transparent cursor-pointer"
                              title="Copy Question"
                            >
                              {isCopied ? (
                                <Check className="w-4 h-4 text-emerald-400" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </button>

                            <button
                              onClick={() => toggleBookmark(q.question_id)}
                              className={`p-1.5 rounded-lg transition-colors border-none bg-transparent cursor-pointer ${
                                isBookmarked
                                  ? "text-amber-400"
                                  : "text-[#9B9992] hover:text-[#F4F1EA] hover:bg-[#1E2020]"
                              }`}
                              title={
                                isBookmarked
                                  ? "Bookmarked"
                                  : "Bookmark Question"
                              }
                            >
                              <Bookmark
                                className={`w-4 h-4 ${
                                  isBookmarked ? "fill-amber-400" : ""
                                }`}
                              />
                            </button>

                            <button
                              onClick={() => togglePracticed(q.question_id)}
                              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer border ${
                                isPracticed
                                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 font-semibold"
                                  : "bg-[#1E2020] text-[#9B9992] hover:text-[#F4F1EA] border-[#242525] hover:border-[#FF5A36]/30"
                              }`}
                            >
                              {isPracticed ? (
                                <>
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                  <span>Practiced</span>
                                </>
                              ) : (
                                <>
                                  <Circle className="w-3.5 h-3.5" />
                                  <span>Mark Practiced</span>
                                </>
                              )}
                            </button>

                            <Link
                              href={`/interview-prep/${q.question_id}`}
                              className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-[#FF5A36] text-[#0F1010] font-semibold text-xs font-label-caps tracking-wider hover:opacity-90 transition-opacity"
                            >
                              <span>Practice</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-12 text-center rounded-2xl bg-[#151616] border border-[#242525]">
                    <Search className="w-8 h-8 text-[#9B9992] mx-auto mb-3 opacity-60" />
                    <h3 className="text-sm font-semibold text-[#F4F1EA] mb-1">
                      No matching questions found
                    </h3>
                    <p className="text-xs text-[#9B9992] max-w-sm mx-auto mb-4">
                      Try adjusting your search terms, difficulty, or category filter.
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedCategory("all");
                        setSelectedDifficulty("all");
                        setActiveTab("all");
                      }}
                      className="px-4 py-2 rounded-xl bg-[#1E2020] text-[#F4F1EA] text-xs font-medium border border-[#242525] hover:border-[#FF5A36]/30 cursor-pointer"
                    >
                      Reset Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
