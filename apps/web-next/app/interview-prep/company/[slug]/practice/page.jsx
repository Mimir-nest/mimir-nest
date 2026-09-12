"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Circle,
  Bookmark,
  Sparkles,
  Clock,
  BookOpen,
  Lightbulb,
  Target,
  AlertTriangle,
  HelpCircle,
  RotateCcw,
  Building2,
  Check,
  Copy,
  ChevronDown,
  PenTool,
  X,
  ExternalLink,
} from "lucide-react";
import CompanyLogo from "@/components/common/CompanyLogo";
import { findCompanyBySlug, difficultyMeta } from "@/lib/interviewPrepUtils";

export default function PracticeModePage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const slug = params?.slug;

  const initialCategoryQuery = searchParams.get("category") || "all";

  // Data states
  const [companyData, setCompanyData] = useState(null);
  const [allQuestions, setAllQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Selected Category filter
  const [selectedCategory, setSelectedCategory] = useState(initialCategoryQuery);

  // Session state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGuidanceRevealed, setIsGuidanceRevealed] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Drafting State
  const [isDraftOpen, setIsDraftOpen] = useState(true);
  const [userDraft, setUserDraft] = useState("");

  // Progress & Bookmarks (shared localStorage keys)
  const [practicedIds, setPracticedIds] = useState(new Set());
  const [bookmarkedIds, setBookmarkedIds] = useState(new Set());
  const [copied, setCopied] = useState(false);

  // Load initial progress from localStorage
  useEffect(() => {
    try {
      const savedPracticed = JSON.parse(
        localStorage.getItem("mimir_prep_practiced") || "[]"
      );
      const savedBookmarks = JSON.parse(
        localStorage.getItem("mimir_prep_bookmarks") || "[]"
      );
      setPracticedIds(new Set(savedPracticed));
      setBookmarkedIds(new Set(savedBookmarks));
    } catch (e) {
      console.debug("Failed to read progress storage:", e);
    }
  }, []);

  // Fetch company & questions
  useEffect(() => {
    if (!slug) return;

    let isMounted = true;
    setLoading(true);

    Promise.all([
      fetch("/api/interview-prep?limit=400").then((r) => r.json()),
      fetch("/api/interview-prep/companies").then((r) => r.json()),
    ])
      .then(([questionsRes, companiesRes]) => {
        if (!isMounted) return;

        const allComps = companiesRes.data || [];
        const matched =
          allComps.find(
            (c) => c.name?.toLowerCase().replace(/\s+/g, "-") === slug.toLowerCase()
          ) || findCompanyBySlug(slug);

        if (!matched) {
          setError(`Company '${slug}' not found.`);
          setLoading(false);
          return;
        }

        setCompanyData(matched);

        const allQ = questionsRes.data || [];
        const compQuestions = allQ.filter(
          (q) =>
            q.company?.toLowerCase().trim() ===
            matched.name?.toLowerCase().trim()
        );

        setAllQuestions(compQuestions);
        setLoading(false);
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || "Failed to load practice questions.");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  // Available categories for this company
  const availableCategories = useMemo(() => {
    const set = new Set(allQuestions.map((q) => q.category).filter(Boolean));
    return Array.from(set);
  }, [allQuestions]);

  // Questions filtered for practice
  const practiceQuestions = useMemo(() => {
    if (selectedCategory === "all") return allQuestions;
    return allQuestions.filter(
      (q) => q.category?.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [allQuestions, selectedCategory]);

  // Find resume index (first unpracticed question or 0)
  const resumeIndex = useMemo(() => {
    if (practiceQuestions.length === 0) return 0;
    const firstUnpracticed = practiceQuestions.findIndex(
      (q) => !practicedIds.has(q.question_id)
    );
    return firstUnpracticed !== -1 ? firstUnpracticed : 0;
  }, [practiceQuestions, practicedIds]);

  // Initialize or update current question index on load or category change
  useEffect(() => {
    if (practiceQuestions.length > 0) {
      setCurrentIndex(resumeIndex);
      setIsGuidanceRevealed(false);
      setIsCompleted(false);
    }
  }, [selectedCategory, practiceQuestions.length, resumeIndex]);

  const currentQuestion = practiceQuestions[currentIndex] || null;

  // Load draft for current question
  useEffect(() => {
    if (currentQuestion?.question_id) {
      const savedDraft =
        localStorage.getItem(`mimir_draft_${currentQuestion.question_id}`) || "";
      setUserDraft(savedDraft);
      setIsGuidanceRevealed(false);
    }
  }, [currentQuestion?.question_id]);

  // Draft auto-save
  const handleDraftChange = (e) => {
    const val = e.target.value;
    setUserDraft(val);
    if (currentQuestion?.question_id) {
      try {
        localStorage.setItem(`mimir_draft_${currentQuestion.question_id}`, val);
      } catch (err) {
        console.debug("Failed to save draft:", err);
      }
    }
  };

  const handleClearDraft = () => {
    setUserDraft("");
    if (currentQuestion?.question_id) {
      try {
        localStorage.removeItem(`mimir_draft_${currentQuestion.question_id}`);
        toast.info("Draft cleared");
      } catch (err) {
        console.debug("Failed to clear draft:", err);
      }
    }
  };

  // Toggle Practiced
  const togglePracticed = useCallback(() => {
    if (!currentQuestion) return;
    const qid = currentQuestion.question_id;
    const updated = new Set(practicedIds);

    if (updated.has(qid)) {
      updated.delete(qid);
      toast.info("Marked as unpracticed");
    } else {
      updated.add(qid);
      toast.success("Marked as practiced! ✓");
    }
    setPracticedIds(updated);

    try {
      localStorage.setItem(
        "mimir_prep_practiced",
        JSON.stringify(Array.from(updated))
      );
    } catch (e) {
      console.debug("Failed to update practiced storage:", e);
    }
  }, [currentQuestion, practicedIds]);

  // Toggle Bookmark / Save
  const toggleBookmark = useCallback(() => {
    if (!currentQuestion) return;
    const qid = currentQuestion.question_id;
    const updated = new Set(bookmarkedIds);

    if (updated.has(qid)) {
      updated.delete(qid);
      toast.info("Removed from saved questions");
    } else {
      updated.add(qid);
      toast.success("Saved to bookmarked questions");
    }
    setBookmarkedIds(updated);

    try {
      localStorage.setItem(
        "mimir_prep_bookmarks",
        JSON.stringify(Array.from(updated))
      );
    } catch (e) {
      console.debug("Failed to update bookmarks storage:", e);
    }
  }, [currentQuestion, bookmarkedIds]);

  // Copy Question
  const handleCopyQuestion = () => {
    if (!currentQuestion) return;
    const shareText = `${currentQuestion.question}\n\n[Mimir Nest Practice #${currentQuestion.question_id} - ${currentQuestion.company} · ${currentQuestion.category}]`;
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    toast.success("Question copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  // Navigation handlers
  const handleNextQuestion = () => {
    if (currentIndex < practiceQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsGuidanceRevealed(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setIsCompleted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setIsGuidanceRevealed(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleRestartPractice = () => {
    setCurrentIndex(0);
    setIsGuidanceRevealed(false);
    setIsCompleted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Progress metrics
  const completedInSet = useMemo(() => {
    return practiceQuestions.filter((q) => practicedIds.has(q.question_id)).length;
  }, [practiceQuestions, practicedIds]);

  const progressPercentage = Math.round(
    practiceQuestions.length > 0
      ? ((currentIndex + 1) / practiceQuestions.length) * 100
      : 0
  );

  const isCurrentPracticed = currentQuestion
    ? practicedIds.has(currentQuestion.question_id)
    : false;
  const isCurrentBookmarked = currentQuestion
    ? bookmarkedIds.has(currentQuestion.question_id)
    : false;

  const meta = currentQuestion
    ? difficultyMeta[currentQuestion.difficulty] || difficultyMeta.Medium
    : difficultyMeta.Medium;

  // Parsed optional fields
  const strongSignals = useMemo(
    () => parseArrayField(currentQuestion?.strong_answer_signals),
    [currentQuestion?.strong_answer_signals]
  );
  const commonMistakes = useMemo(
    () => parseArrayField(currentQuestion?.common_mistakes),
    [currentQuestion?.common_mistakes]
  );
  const followUps = useMemo(
    () => parseArrayField(currentQuestion?.follow_ups),
    [currentQuestion?.follow_ups]
  );

  return (
    <div className="min-h-screen bg-mn-background text-on-background selection:bg-surface-tint/30 flex flex-col justify-between">
      <Navbar />

      <main className="flex-grow max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-20">
        {/* Loading State */}
        {loading && (
          <div className="py-36 text-center rounded-2xl glass-panel border border-border/40">
            <div className="w-8 h-8 border-2 border-surface-tint border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground text-sm font-body-md">
              Loading practice session...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="py-24 text-center rounded-2xl glass-panel border border-border/40 max-w-md mx-auto">
            <Building2 className="w-10 h-10 text-surface-tint mx-auto mb-3" />
            <h2 className="text-lg font-bold text-foreground mb-2">Practice Session Unavailable</h2>
            <p className="text-sm text-muted-foreground mb-6">{error}</p>
            <Link
              href="/interview-prep"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-tint text-on-primary font-semibold text-xs font-label-caps tracking-wider"
            >
              Back to Companies
            </Link>
          </div>
        )}

        {/* ── COMPLETION SCREEN ── */}
        {isCompleted && !loading && companyData && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 sm:p-12 rounded-3xl bg-surface-container border border-border/60 text-center space-y-8 max-w-2xl mx-auto shadow-2xl mt-4"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-surface-tint">
                Practice Session Complete
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                {companyData.name} Interview Set Finished
              </h1>
              <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                You&apos;ve completed all questions in the{" "}
                <strong className="text-foreground font-semibold">
                  {selectedCategory === "all" ? "full" : selectedCategory}
                </strong>{" "}
                practice set for {companyData.name}.
              </p>
            </div>

            {/* Score Strip */}
            <div className="p-4 rounded-2xl bg-surface-container-high border border-border/40 max-w-sm mx-auto flex items-center justify-around text-center">
              <div>
                <div className="text-2xl font-bold font-mono text-emerald-400">
                  {completedInSet}
                </div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                  Practiced
                </div>
              </div>
              <div className="w-px h-8 bg-border/40" />
              <div>
                <div className="text-2xl font-bold font-mono text-foreground">
                  {practiceQuestions.length}
                </div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                  Total Questions
                </div>
              </div>
            </div>

            {/* Completion Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={handleRestartPractice}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-surface-tint text-on-primary font-bold text-xs font-label-caps tracking-widest uppercase hover:scale-105 transition-all shadow-lg shadow-surface-tint/20 cursor-pointer border-none"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Practice Again</span>
              </button>

              <Link
                href={`/interview-prep/company/${slug}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full glass-panel text-foreground hover:text-surface-tint hover:bg-white/5 font-semibold text-xs font-label-caps tracking-widest uppercase border border-border/60 transition-all text-center"
              >
                <span>Browse {companyData.name} Vault</span>
              </Link>
            </div>

            {/* AI Mock Interview Teaser */}
            <div className="pt-6 border-t border-border/40 text-xs text-muted-foreground space-y-1.5">
              <p>Want a more realistic, voice-interactive technical & non-technical simulation?</p>
              <Link
                href="/interview"
                className="inline-flex items-center gap-1 text-surface-tint hover:underline font-semibold font-mono"
              >
                <span>Explore Mimir AI Interview (Coming Soon)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        )}

        {/* ── ACTIVE PRACTICE WORKSPACE ── */}
        {!isCompleted && !loading && currentQuestion && companyData && (
          <div className="space-y-8">
            {/* ── PRACTICE TOP BAR ── */}
            <div className="space-y-4 pb-6 border-b border-border/40">
              <div className="flex items-center justify-between gap-4">
                {/* Exit Link */}
                <Link
                  href={`/interview-prep/company/${slug}`}
                  className="text-xs font-mono text-muted-foreground hover:text-surface-tint flex items-center gap-1.5 transition-colors group"
                >
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                  <span>Exit Practice</span>
                </Link>

                {/* Company Badge */}
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-md bg-surface-container-high p-0.5 flex items-center justify-center border border-border/40 shrink-0">
                    <CompanyLogo company={companyData.name} className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-semibold text-foreground font-mono">
                    {companyData.name} Practice
                  </span>
                </div>

                {/* Question Counter */}
                <div className="text-xs font-mono text-muted-foreground">
                  <span className="text-surface-tint font-bold">
                    {currentIndex + 1}
                  </span>{" "}
                  of <span className="text-foreground font-semibold">{practiceQuestions.length}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 rounded-full bg-surface-container-high overflow-hidden">
                <div
                  className="h-full bg-surface-tint transition-all duration-300 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>

              {/* Optional Category Switcher Pills */}
              {availableCategories.length > 1 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground/60 mr-1">
                    Category:
                  </span>
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-colors border cursor-pointer ${
                      selectedCategory === "all"
                        ? "bg-surface-tint/15 text-surface-tint border-surface-tint/40 font-semibold"
                        : "bg-surface-container text-muted-foreground hover:text-foreground border-border/40"
                    }`}
                  >
                    All ({allQuestions.length})
                  </button>
                  {availableCategories.map((cat) => {
                    const count = allQuestions.filter(
                      (q) => q.category?.toLowerCase() === cat.toLowerCase()
                    ).length;
                    const isSelected =
                      selectedCategory.toLowerCase() === cat.toLowerCase();
                    return (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-colors border cursor-pointer ${
                          isSelected
                            ? "bg-surface-tint/15 text-surface-tint border-surface-tint/40 font-semibold"
                            : "bg-surface-container text-muted-foreground hover:text-foreground border-border/40"
                        }`}
                      >
                        {cat} ({count})
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* ── QUESTION HERO ── */}
            <section className="space-y-4">
              {/* Question Metadata */}
              <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
                <span className="font-semibold text-surface-tint px-2.5 py-0.5 rounded bg-surface-tint/10 border border-surface-tint/25">
                  {currentQuestion.question_id}
                </span>
                <span className="text-muted-foreground/40">·</span>
                <span className="font-medium uppercase tracking-wider text-muted-foreground">
                  {currentQuestion.category}
                </span>
                <span className="text-muted-foreground/40">·</span>
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded border text-[11px] font-semibold ${meta.bg} ${meta.text} ${meta.border}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
                  {currentQuestion.difficulty}
                </span>
                <span className="text-muted-foreground/40">·</span>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{currentQuestion.expected_time || "5–15 min"}</span>
                </div>
              </div>

              {/* The Question Prompt (The Hero) */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground leading-[1.28] tracking-tight pt-1">
                {currentQuestion.question}
              </h1>

              {currentQuestion.role && (
                <p className="text-xs text-muted-foreground font-mono">
                  Context Scope: <span className="text-foreground/90">{currentQuestion.role}</span>
                </p>
              )}

              {/* Quick Practice Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={togglePracticed}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold font-label-caps tracking-wider uppercase transition-all duration-200 cursor-pointer border ${
                    isCurrentPracticed
                      ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-400 shadow-sm"
                      : "bg-surface-container hover:bg-surface-container-high border-border text-foreground hover:border-surface-tint/40"
                  }`}
                >
                  {isCurrentPracticed ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Practiced</span>
                    </>
                  ) : (
                    <>
                      <Circle className="w-4 h-4 text-muted-foreground" />
                      <span>Mark as Practiced</span>
                    </>
                  )}
                </button>

                <button
                  onClick={toggleBookmark}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer border ${
                    isCurrentBookmarked
                      ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                      : "bg-surface-container hover:bg-surface-container-high border-border text-muted-foreground hover:text-foreground hover:border-surface-tint/40"
                  }`}
                >
                  <Bookmark
                    className={`w-3.5 h-3.5 ${isCurrentBookmarked ? "fill-amber-400" : ""}`}
                  />
                  <span>{isCurrentBookmarked ? "Saved" : "Save"}</span>
                </button>

                <button
                  onClick={handleCopyQuestion}
                  className="p-2.5 rounded-full border border-border/60 bg-surface-container text-muted-foreground hover:text-foreground hover:border-surface-tint/40 transition-colors cursor-pointer"
                  title="Copy Question"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>

                <Link
                  href={`/interview-prep/${currentQuestion.question_id}`}
                  target="_blank"
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono text-muted-foreground hover:text-surface-tint transition-colors"
                >
                  <span>Standalone View</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </section>

            {/* ── THINK FIRST PRACTICE AREA ── */}
            <section className="p-6 sm:p-7 rounded-2xl bg-surface-container/80 border border-border/60 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-surface-tint" />
                    <h2 className="text-xs sm:text-sm font-bold text-foreground font-mono uppercase tracking-wide">
                      BEFORE YOU LOOK AT THE GUIDANCE
                    </h2>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Take a moment to structure your response as if you&apos;re live in the interview.
                  </p>
                </div>

                <button
                  onClick={() => setIsDraftOpen(!isDraftOpen)}
                  className="text-xs font-mono text-muted-foreground hover:text-foreground flex items-center gap-1 py-1 px-2 rounded hover:bg-surface-container-high transition-colors cursor-pointer border-none bg-transparent"
                >
                  <span>{isDraftOpen ? "Collapse" : "Open Workspace"}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isDraftOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>

              <AnimatePresence initial={false}>
                {isDraftOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3 pt-1"
                  >
                    <textarea
                      value={userDraft}
                      onChange={handleDraftChange}
                      rows={5}
                      placeholder="Type your answer or outline your STAR bullet points here (Situation, Task, Action, Result)..."
                      className="w-full p-4 rounded-xl bg-surface-container-low border border-border/70 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-surface-tint/60 focus:ring-1 focus:ring-surface-tint/60 transition-all font-body-md resize-y"
                    />

                    <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-1.5 text-muted-foreground font-mono text-[11px]">
                        <PenTool className="w-3 h-3 text-surface-tint" />
                        <span>Notes saved locally on this device</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {userDraft && (
                          <button
                            onClick={handleClearDraft}
                            className="px-3 py-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface-container-high transition-colors cursor-pointer border-none bg-transparent"
                          >
                            Clear
                          </button>
                        )}
                        {!isGuidanceRevealed && (
                          <button
                            onClick={() => setIsGuidanceRevealed(true)}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-surface-tint text-on-primary font-semibold text-xs font-label-caps tracking-wider uppercase hover:opacity-90 transition-opacity cursor-pointer border-none shadow-md shadow-surface-tint/20"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Reveal Guidance ↓</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </section>

            {/* ── ANSWER GUIDANCE SECTION (HIDDEN BY DEFAULT) ── */}
            {!isGuidanceRevealed ? (
              <section className="p-8 sm:p-10 rounded-2xl bg-surface-container border border-dashed border-border/70 text-center space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-surface-tint/10 border border-surface-tint/25 text-surface-tint flex items-center justify-center mx-auto shadow-inner">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div className="max-w-md mx-auto space-y-1.5">
                  <h3 className="text-base sm:text-lg font-bold text-foreground">
                    Guidance & Strategy is Hidden
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Practice answering aloud or draft your STAR response above before reviewing the recommended answer structure.
                  </p>
                </div>
                <button
                  onClick={() => setIsGuidanceRevealed(true)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-surface-tint text-on-primary font-bold text-xs font-label-caps tracking-widest uppercase hover:scale-105 transition-all duration-200 shadow-lg shadow-surface-tint/20 cursor-pointer border-none"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Reveal Guidance</span>
                </button>
              </section>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8 pt-2"
              >
                {/* Header with Hide Button */}
                <div className="border-b border-border/40 pb-4 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-surface-tint font-semibold block mb-1">
                      Answer Guide
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                      How to approach this question
                    </h2>
                  </div>
                  <button
                    onClick={() => setIsGuidanceRevealed(false)}
                    className="px-3 py-1.5 rounded-lg glass-panel hover:bg-white/5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors border border-border/60 cursor-pointer"
                  >
                    Hide Guide
                  </button>
                </div>

                {/* 1. SHORT ANSWER / EXECUTIVE SUMMARY (FULL-WIDTH COMPACT) */}
                {currentQuestion.short_answer && (
                  <div className="p-5 sm:p-6 rounded-2xl bg-surface-container border border-border/60 border-l-4 border-l-surface-tint space-y-2">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-surface-tint">
                      <Lightbulb className="w-4 h-4 text-surface-tint" />
                      <span>Short Answer (Executive Summary)</span>
                    </div>
                    <p className="text-sm sm:text-base text-foreground/95 leading-relaxed font-body-md">
                      {currentQuestion.short_answer}
                    </p>
                  </div>
                )}

                {/* 2. TWO-COLUMN ANSWER GUIDE GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                  {/* LEFT COLUMN (Detailed Walkthrough, Intent, STAR, Strong Answer) */}
                  <div className={`${currentQuestion.evaluation_rubric || strongSignals.length > 0 || commonMistakes.length > 0 ? "lg:col-span-7" : "lg:col-span-12"} space-y-6`}>
                    <div className="flex items-center gap-2 pb-1">
                      <span className="w-2 h-2 rounded-full bg-surface-tint" />
                      <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                        Detailed Walkthrough & Strategy
                      </h3>
                    </div>

                    {currentQuestion.detailed_answer ? (
                      <StructuredDetailedAnswer text={currentQuestion.detailed_answer} />
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No additional detailed walkthrough recorded for this question.
                      </p>
                    )}
                  </div>

                  {/* RIGHT COLUMN (Interviewer Checklist & Calibration) */}
                  {(currentQuestion.evaluation_rubric || strongSignals.length > 0 || commonMistakes.length > 0) && (
                    <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-24">
                      {/* Evaluation Rubric */}
                      {currentQuestion.evaluation_rubric && (
                        <div className="p-5 rounded-2xl bg-surface-container/70 border border-border/60 space-y-2.5">
                          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                            <span className="w-2 h-2 rounded-full bg-amber-400" />
                            <span>Evaluation Rubric</span>
                          </div>
                          <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed font-body-md whitespace-pre-line">
                            {currentQuestion.evaluation_rubric}
                          </p>
                        </div>
                      )}

                      {/* Strong Answer Signals */}
                      {strongSignals.length > 0 && (
                        <div className="p-5 rounded-2xl bg-surface-container/70 border border-border/60 space-y-3">
                          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                            <Target className="w-4 h-4 text-emerald-400" />
                            <span>Strong Answer Signals</span>
                          </div>
                          <ul className="space-y-2 list-none pl-0">
                            {strongSignals.map((signal, i) => (
                              <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/90">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                                <span className="leading-relaxed">{signal}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Common Mistakes */}
                      {commonMistakes.length > 0 && (
                        <div className="p-5 rounded-2xl bg-surface-container/70 border border-border/60 space-y-3">
                          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-rose-400">
                            <AlertTriangle className="w-4 h-4 text-rose-400" />
                            <span>Common Mistakes to Avoid</span>
                          </div>
                          <ul className="space-y-2 list-none pl-0">
                            {commonMistakes.map((mistake, i) => (
                              <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/90">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                                <span className="leading-relaxed">{mistake}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* 3. LIKELY FOLLOW-UP QUESTIONS (FULL-WIDTH 2-COLUMN GRID) */}
                {followUps.length > 0 && (
                  <section className="pt-6 border-t border-border/40 space-y-4">
                    <div className="flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-purple-400" />
                      <h3 className="text-base font-bold text-foreground tracking-tight">
                        Likely Follow-up Questions
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {followUps.map((fu, i) => (
                        <div
                          key={i}
                          className="p-4 rounded-xl bg-surface-container border border-border/50 flex items-start gap-3"
                        >
                          <span className="font-mono text-xs font-bold text-surface-tint shrink-0 pt-0.5">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed font-body-md">
                            {fu}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </motion.div>
            )}

            {/* ── PRACTICE NAVIGATION BAR ── */}
            <div className="pt-8 border-t border-border/40 flex items-center justify-between gap-4">
              <button
                onClick={handlePrevQuestion}
                disabled={currentIndex === 0}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-panel border border-border/60 text-xs font-semibold font-label-caps tracking-wider uppercase text-foreground hover:bg-white/5 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <button
                onClick={handleNextQuestion}
                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-surface-tint text-on-primary font-bold text-xs font-label-caps tracking-widest uppercase hover:scale-105 transition-all shadow-lg shadow-surface-tint/20 cursor-pointer border-none"
              >
                <span>
                  {currentIndex === practiceQuestions.length - 1
                    ? "Finish Session ✓"
                    : "Next Question →"}
                </span>
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

// ── Helper: Parse Array Fields Safely ──
function parseArrayField(content) {
  if (!content) return [];
  if (Array.isArray(content)) return content.filter(Boolean);
  if (typeof content === "string") {
    const trimmed = content.trim();
    if (!trimmed) return [];
    if (trimmed.startsWith("[")) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) return parsed.filter(Boolean);
      } catch (e) {
        console.debug("Field is not JSON array:", e);
      }
    }
    if (trimmed.includes("\n")) {
      return trimmed
        .split("\n")
        .map((l) => l.trim().replace(/^[-•*]\s+/, ""))
        .filter(Boolean);
    }
    return [trimmed];
  }
  return [];
}

// ── Helper: Structured Detailed Answer Renderer ──
function StructuredDetailedAnswer({ text }) {
  if (!text) return null;
  const rawSections = text.split("\n\n").filter(Boolean);

  return (
    <div className="space-y-6">
      {rawSections.map((section, idx) => {
        const trimmed = section.trim();

        // 1. What interviewer wants to know
        if (
          trimmed.startsWith("**What the interviewer wants to know:**") ||
          trimmed.startsWith("What the interviewer wants to know:")
        ) {
          const content = trimmed
            .replace(/^\*\*What the interviewer wants to know:\*\*/i, "")
            .replace(/^What the interviewer wants to know:/i, "")
            .trim();

          return (
            <div
              key={idx}
              className="p-5 rounded-xl bg-surface-container/60 border border-border/50 border-l-2 border-l-surface-tint space-y-2"
            >
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-surface-tint">
                WHAT THE INTERVIEWER IS LOOKING FOR
              </h4>
              <p className="text-sm text-foreground/90 leading-relaxed font-body-md">
                {content}
              </p>
            </div>
          );
        }

        // 2. STAR Breakdown
        if (
          trimmed.includes("How to structure your answer") ||
          trimmed.includes("(STAR)") ||
          trimmed.includes("- **Situation:**") ||
          trimmed.includes("- **Task:**")
        ) {
          const lines = trimmed.split("\n");
          return (
            <div key={idx} className="space-y-4">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground">
                STRUCTURED STAR WALKTHROUGH
              </h4>
              <div className="space-y-3">
                {lines.map((line, lIdx) => {
                  const lTrimmed = line.trim();
                  if (!lTrimmed || lTrimmed.startsWith("**How to structure")) return null;

                  const starMatch = lTrimmed.match(
                    /^[-•*]?\s*\*\*(Situation|Task|Action|Result):\*\*\s*(.*)$/i
                  );

                  if (starMatch) {
                    const stepName = starMatch[1].toUpperCase();
                    const stepText = starMatch[2];

                    return (
                      <div
                        key={lIdx}
                        className="p-4 sm:p-5 rounded-xl bg-surface-container border border-border/50 flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4"
                      >
                        <div className="w-24 shrink-0 font-mono text-xs font-bold uppercase tracking-widest text-surface-tint">
                          {stepName}
                        </div>
                        <div className="text-sm text-foreground/90 leading-relaxed font-body-md flex-1">
                          <RichInlineText text={stepText} />
                        </div>
                      </div>
                    );
                  }

                  return (
                    <p key={lIdx} className="text-sm text-muted-foreground leading-relaxed">
                      <RichInlineText text={lTrimmed.replace(/^[-•*]\s+/, "")} />
                    </p>
                  );
                })}
              </div>
            </div>
          );
        }

        // 3. What makes a strong answer
        if (
          trimmed.toLowerCase().includes("what makes a strong answer") ||
          trimmed.toLowerCase().includes("strong answer signals") ||
          trimmed.toLowerCase().includes("key elements of a strong answer")
        ) {
          const lines = trimmed.split("\n");
          const items = lines
            .filter((l) => {
              const lt = l.trim().toLowerCase();
              return lt && !lt.includes("what makes a strong answer") && !lt.includes("strong answer signals");
            })
            .map((l) => l.replace(/^[-•*]\s+/, "").trim())
            .filter(Boolean);

          return (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl bg-surface-container/60 border border-border/60 space-y-3.5"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                  WHAT MAKES A STRONG ANSWER
                </h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {items.map((it, itIdx) => (
                  <div
                    key={itIdx}
                    className="p-3.5 rounded-xl bg-surface-container-low/80 border border-border/40 flex items-start gap-2.5 text-xs sm:text-sm text-foreground/90 leading-relaxed font-body-md"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <span className="flex-1">
                      <RichInlineText text={it} />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        }

        // 4. Headings
        if (trimmed.startsWith("**") && trimmed.includes("**\n")) {
          const [heading, ...rest] = trimmed.split("\n");
          return (
            <div key={idx} className="p-5 rounded-2xl bg-surface-container/40 border border-border/50 space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground">
                {heading.replace(/\*\*/g, "")}
              </h4>
              <div className="text-sm text-muted-foreground leading-relaxed space-y-2 font-body-md">
                {rest.map((rLine, rIdx) => (
                  <div key={rIdx} className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-surface-tint shrink-0" />
                    <span className="flex-1">
                      <RichInlineText text={rLine.replace(/^[-•*]\s+/, "")} />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        }

        // 5. Default bullets
        if (trimmed.startsWith("- ") || trimmed.startsWith("• ")) {
          const items = trimmed.split("\n").map((l) => l.replace(/^[-•*]\s+/, ""));
          return (
            <div key={idx} className="p-4 rounded-xl bg-surface-container/30 border border-border/40">
              <ul className="space-y-2 list-none pl-0">
                {items.map((it, itIdx) => (
                  <li key={itIdx} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-surface-tint shrink-0" />
                    <span className="leading-relaxed">
                      <RichInlineText text={it} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        }

        return (
          <p key={idx} className="text-sm text-foreground/90 leading-relaxed font-body-md">
            <RichInlineText text={trimmed} />
          </p>
        );
      })}
    </div>
  );
}

function RichInlineText({ text }) {
  if (!text) return null;
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return (
    <span>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="text-foreground font-semibold">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith("*") && part.endsWith("*")) {
          return (
            <em key={i} className="text-foreground/95 italic">
              {part.slice(1, -1)}
            </em>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
}
