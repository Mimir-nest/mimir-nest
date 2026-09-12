"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Bookmark,
  CheckCircle2,
  Circle,
  Copy,
  Check,
  ChevronDown,
  ChevronRight,
  Lightbulb,
  BookOpen,
  Target,
  AlertTriangle,
  HelpCircle,
  Building2,
  Share2,
  PenTool,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import CompanyLogo from "@/components/common/CompanyLogo";
import { companyToSlug, difficultyMeta } from "@/lib/interviewPrepUtils";

export default function QuestionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const questionId = params?.id;

  // Data states
  const [question, setQuestion] = useState(null);
  const [relatedQuestions, setRelatedQuestions] = useState([]);
  const [prevQuestion, setPrevQuestion] = useState(null);
  const [nextQuestion, setNextQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Interaction states
  const [copied, setCopied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isPracticed, setIsPracticed] = useState(false);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);

  // Think First Drafting State
  const [isDraftOpen, setIsDraftOpen] = useState(true);
  const [userDraft, setUserDraft] = useState("");
  const [draftSavedToast, setDraftSavedToast] = useState(false);

  // Load question data
  useEffect(() => {
    if (!questionId) return;

    let isMounted = true;
    setLoading(true);

    fetch(`/api/interview-prep/${questionId}`)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`Question ${questionId} not found`);
        }
        return res.json();
      })
      .then((data) => {
        if (isMounted) {
          if (data.success && data.data) {
            setQuestion(data.data);
            setRelatedQuestions(data.relatedQuestions || []);
            setPrevQuestion(data.prevQuestion || null);
            setNextQuestion(data.nextQuestion || null);
          } else {
            throw new Error(data.error || "Question not found");
          }
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      });

    // Load bookmarks and practiced state
    try {
      const savedBookmarks = JSON.parse(
        localStorage.getItem("mimir_prep_bookmarks") || "[]"
      );
      const savedPracticed = JSON.parse(
        localStorage.getItem("mimir_prep_practiced") || "[]"
      );
      const savedDraft = localStorage.getItem(`mimir_draft_${questionId}`) || "";

      setIsBookmarked(savedBookmarks.includes(questionId));
      setIsPracticed(savedPracticed.includes(questionId));
      setUserDraft(savedDraft);
    } catch (e) {
      console.debug("Failed to read initial local storage:", e);
    }

    return () => {
      isMounted = false;
    };
  }, [questionId]);

  // Draft auto-save
  const handleDraftChange = (e) => {
    const val = e.target.value;
    setUserDraft(val);
    try {
      localStorage.setItem(`mimir_draft_${questionId}`, val);
    } catch (err) {
      console.debug("Failed to save draft:", err);
    }
  };

  const handleSaveDraftExplicit = () => {
    try {
      localStorage.setItem(`mimir_draft_${questionId}`, userDraft);
      toast.success("Draft response saved locally");
      setDraftSavedToast(true);
      setTimeout(() => setDraftSavedToast(false), 2000);
    } catch (err) {
      toast.error("Failed to save draft");
    }
  };

  const handleClearDraft = () => {
    setUserDraft("");
    try {
      localStorage.removeItem(`mimir_draft_${questionId}`);
      toast.info("Draft cleared");
    } catch (err) {
      console.debug("Failed to clear draft:", err);
    }
  };

  const handleCopy = () => {
    if (!question) return;
    const shareText = `${question.question}\n\n[Mimir Nest Practice Question #${question.question_id} - ${question.company} · ${question.category}]`;
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    toast.success("Question copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleBookmark = () => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("mimir_prep_bookmarks") || "[]"
      );
      let updated;
      if (saved.includes(questionId)) {
        updated = saved.filter((id) => id !== questionId);
        setIsBookmarked(false);
        toast.info("Removed from saved questions");
      } else {
        updated = [...saved, questionId];
        setIsBookmarked(true);
        toast.success("Saved to bookmarked questions");
      }
      localStorage.setItem("mimir_prep_bookmarks", JSON.stringify(updated));
    } catch (e) {
      console.debug("Failed to save bookmark:", e);
    }
  };

  const togglePracticed = () => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("mimir_prep_practiced") || "[]"
      );
      let updated;
      if (saved.includes(questionId)) {
        updated = saved.filter((id) => id !== questionId);
        setIsPracticed(false);
        toast.info("Marked as unpracticed");
      } else {
        updated = [...saved, questionId];
        setIsPracticed(true);
        toast.success("Marked as practiced!");
      }
      localStorage.setItem("mimir_prep_practiced", JSON.stringify(updated));
    } catch (e) {
      console.debug("Failed to save practiced status:", e);
    }
  };

  const scrollToAnswerGuide = () => {
    const el = document.getElementById("answer-guide");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Parsed optional fields
  const strongSignals = useMemo(
    () => parseArrayField(question?.strong_answer_signals),
    [question?.strong_answer_signals]
  );
  const commonMistakes = useMemo(
    () => parseArrayField(question?.common_mistakes),
    [question?.common_mistakes]
  );
  const followUps = useMemo(
    () => parseArrayField(question?.follow_ups),
    [question?.follow_ups]
  );

  const meta = difficultyMeta[question?.difficulty] || difficultyMeta.Medium;

  return (
    <div className="min-h-screen bg-mn-background text-on-background selection:bg-surface-tint/30">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-24 space-y-10">
        {/* ── 1. BREADCRUMBS ── */}
        <div className="flex items-center justify-between gap-4 pb-6 border-b border-border/40">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-muted-foreground flex-wrap">
            <Link
              href="/interview-prep"
              className="hover:text-surface-tint transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Interview Prep</span>
            </Link>
            <span>/</span>
            {question?.company && (
              <>
                <Link
                  href={`/interview-prep/company/${companyToSlug(question.company)}`}
                  className="hover:text-surface-tint transition-colors"
                >
                  {question.company}
                </Link>
                <span>/</span>
              </>
            )}
            <span className="text-foreground font-semibold">
              {questionId}
            </span>
          </nav>

          {/* Top Quick Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopy}
              className="p-2 rounded-lg border border-border/60 bg-surface-container text-muted-foreground hover:text-foreground hover:border-surface-tint/40 transition-colors cursor-pointer"
              title="Copy Question Text"
              aria-label="Copy Question"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={toggleBookmark}
              className={`p-2 rounded-lg border transition-all cursor-pointer ${
                isBookmarked
                  ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                  : "bg-surface-container border-border/60 text-muted-foreground hover:text-foreground hover:border-surface-tint/40"
              }`}
              title={isBookmarked ? "Saved" : "Save question"}
              aria-label="Save question"
            >
              <Bookmark
                className={`w-4 h-4 ${isBookmarked ? "fill-amber-400" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-32 text-center rounded-2xl glass-panel border border-border/40 mt-8">
            <div className="w-8 h-8 border-2 border-surface-tint border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground text-sm font-body-md">
              Loading interview question workspace...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="py-24 text-center rounded-2xl glass-panel border border-border/40 mt-8 max-w-md mx-auto">
            <Building2 className="w-10 h-10 text-surface-tint mx-auto mb-3" />
            <h2 className="text-lg font-bold text-foreground mb-2">Question Not Found</h2>
            <p className="text-sm text-muted-foreground mb-6">{error}</p>
            <Link
              href="/interview-prep"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-tint text-on-primary font-semibold text-xs font-label-caps tracking-wider"
            >
              Return to Interview Prep
            </Link>
          </div>
        )}

        {/* Main Workspace Layout */}
        {question && !loading && (
          <div className="space-y-10">
            {/* ── QUESTION HERO (THE HERO OF THE PAGE) ── */}
            <section className="space-y-4">
              {/* Clean Top Metadata Row */}
              <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
                <span className="font-semibold text-surface-tint px-2.5 py-0.5 rounded bg-surface-tint/10 border border-surface-tint/25">
                  {question.question_id}
                </span>
                <span className="text-muted-foreground/40">·</span>
                <span className="font-medium uppercase tracking-wider text-muted-foreground">
                  {question.category}
                </span>
                <span className="text-muted-foreground/40">·</span>
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded border text-[11px] font-semibold ${meta.bg} ${meta.text} ${meta.border}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
                  {question.difficulty}
                </span>
              </div>

              {/* Company & Context Bar */}
              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-muted-foreground">
                <Link
                  href={`/interview-prep/company/${companyToSlug(question.company)}`}
                  className="inline-flex items-center gap-2 font-medium text-foreground hover:text-surface-tint transition-colors group"
                >
                  <div className="w-6 h-6 rounded-md bg-surface-container-high p-1 flex items-center justify-center border border-border/40 group-hover:border-surface-tint/30 transition-colors">
                    <CompanyLogo company={question.company} className="w-4 h-4" />
                  </div>
                  <span className="font-semibold">{question.company}</span>
                </Link>

                <span className="text-muted-foreground/40">·</span>
                <span>{question.industry || question.company_industry || "Technology"}</span>

                <span className="text-muted-foreground/40">·</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                  <span>{question.expected_time || "5–15 min"}</span>
                </div>
              </div>

              {/* THE QUESTION HERO HEADLINE */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground leading-[1.25] tracking-tight pt-2">
                {question.question}
              </h1>

              {/* Interview Scope Note */}
              {question.role && (
                <p className="text-xs text-muted-foreground font-mono">
                  Target Scope: <span className="text-foreground/90">{question.role}</span>
                </p>
              )}

              {/* Immediate Practice Action Row */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <button
                  onClick={togglePracticed}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold font-label-caps tracking-wider uppercase transition-all duration-200 cursor-pointer border ${
                    isPracticed
                      ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-400 shadow-sm"
                      : "bg-surface-container hover:bg-surface-container-high border-border text-foreground hover:border-surface-tint/40"
                  }`}
                >
                  {isPracticed ? (
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
                    isBookmarked
                      ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                      : "bg-surface-container hover:bg-surface-container-high border-border text-muted-foreground hover:text-foreground hover:border-surface-tint/40"
                  }`}
                >
                  <Bookmark
                    className={`w-3.5 h-3.5 ${isBookmarked ? "fill-amber-400" : ""}`}
                  />
                  <span>{isBookmarked ? "Saved" : "Save"}</span>
                </button>

                <button
                  onClick={() => {
                    setIsAnswerRevealed(true);
                    setTimeout(() => scrollToAnswerGuide(), 100);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-medium text-surface-tint hover:underline bg-transparent border-none cursor-pointer"
                >
                  <span>{isAnswerRevealed ? "Jump to Answer Guide ↓" : "Reveal Answer Guide ↓"}</span>
                </button>
              </div>
            </section>

            {/* ── 2. "THINK FIRST" PRACTICE WORKSPACE ── */}
            <section className="p-6 sm:p-7 rounded-2xl bg-surface-container/70 border border-border/50 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-surface-tint" />
                    <h2 className="text-sm font-bold text-foreground tracking-wide font-mono uppercase">
                      Before you look at the answer
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
                  <span>{isDraftOpen ? "Collapse" : "Write Response"}</span>
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
                    <div className="relative">
                      <textarea
                        value={userDraft}
                        onChange={handleDraftChange}
                        rows={5}
                        placeholder="Structure your thoughts here using STAR (Situation, Task, Action, Result)..."
                        className="w-full p-4 rounded-xl bg-surface-container-low border border-border/70 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-surface-tint/60 focus:ring-1 focus:ring-surface-tint/60 transition-all font-body-md resize-y"
                        aria-label="Draft your answer"
                      />
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2 text-muted-foreground font-mono text-[11px]">
                        <Sparkles className="w-3.5 h-3.5 text-surface-tint" />
                        <span>Saved automatically on this device</span>
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
                        <button
                          onClick={handleSaveDraftExplicit}
                          className="px-4 py-1.5 rounded-lg bg-surface-container-high border border-border hover:border-surface-tint/40 text-foreground font-medium transition-colors cursor-pointer"
                        >
                          Save Draft
                        </button>
                        <button
                          onClick={() => {
                            setIsAnswerRevealed(true);
                            setTimeout(() => scrollToAnswerGuide(), 100);
                          }}
                          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-surface-tint text-on-primary font-semibold text-xs font-label-caps tracking-wider uppercase hover:opacity-90 transition-opacity cursor-pointer border-none shadow-md shadow-surface-tint/20"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Reveal Answer Guide ↓</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </section>

            {/* ── 3. ANSWER GUIDE & APPROACH (HIDDEN BY DEFAULT UNTIL REVEALED) ── */}
            {!isAnswerRevealed ? (
              <section id="answer-guide" className="p-8 sm:p-10 rounded-2xl bg-surface-container border border-dashed border-border/70 text-center space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-surface-tint/10 border border-surface-tint/25 text-surface-tint flex items-center justify-center mx-auto shadow-inner">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div className="max-w-md mx-auto space-y-1.5">
                  <h3 className="text-base sm:text-lg font-bold text-foreground">
                    Answer Guide is Hidden
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Take a moment to structure your response in the practice area above or answer aloud before reviewing the recommended strategy.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsAnswerRevealed(true);
                    setTimeout(() => scrollToAnswerGuide(), 100);
                  }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-surface-tint text-on-primary font-bold text-xs font-label-caps tracking-widest uppercase hover:scale-105 transition-all duration-200 shadow-lg shadow-surface-tint/20 cursor-pointer border-none"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Reveal Answer Guide</span>
                </button>
              </section>
            ) : (
              <div id="answer-guide" className="space-y-8 pt-4">
                {/* Answer Guide Header */}
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
                    onClick={() => setIsAnswerRevealed(false)}
                    className="px-3 py-1.5 rounded-lg glass-panel hover:bg-white/5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors border border-border/60 cursor-pointer"
                  >
                    Hide Guide
                  </button>
                </div>

                {/* 3.1 SHORT ANSWER / EXECUTIVE SUMMARY (FULL-WIDTH COMPACT) */}
                {question.short_answer && (
                  <div className="p-5 sm:p-6 rounded-2xl bg-surface-container border border-border/60 border-l-4 border-l-surface-tint space-y-2">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-surface-tint">
                      <Lightbulb className="w-4 h-4 text-surface-tint" />
                      <span>Short Answer (Executive Summary)</span>
                    </div>
                    <p className="text-sm sm:text-base text-foreground/95 leading-relaxed font-body-md">
                      {question.short_answer}
                    </p>
                  </div>
                )}

                {/* 3.2 TWO-COLUMN ANSWER GUIDE GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                  {/* LEFT COLUMN (Detailed Walkthrough, Intent, STAR, Strong Answer) */}
                  <div className={`${question.evaluation_rubric || strongSignals.length > 0 || commonMistakes.length > 0 ? "lg:col-span-7" : "lg:col-span-12"} space-y-6`}>
                    <div className="flex items-center gap-2 pb-1">
                      <span className="w-2 h-2 rounded-full bg-surface-tint" />
                      <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                        Detailed Walkthrough & Strategy
                      </h3>
                    </div>

                    {question.detailed_answer ? (
                      <StructuredDetailedAnswer text={question.detailed_answer} />
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No additional detailed walkthrough recorded for this question.
                      </p>
                    )}
                  </div>

                  {/* RIGHT COLUMN (Interviewer Checklist & Calibration) */}
                  {(question.evaluation_rubric || strongSignals.length > 0 || commonMistakes.length > 0) && (
                    <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-24">
                      {/* Evaluation Rubric */}
                      {question.evaluation_rubric && (
                        <div className="p-5 rounded-2xl bg-surface-container/70 border border-border/60 space-y-2.5">
                          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                            <span className="w-2 h-2 rounded-full bg-amber-400" />
                            <span>Evaluation Rubric</span>
                          </div>
                          <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed font-body-md whitespace-pre-line">
                            {question.evaluation_rubric}
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

                {/* 3.3 LIKELY FOLLOW-UP QUESTIONS (FULL-WIDTH 2-COLUMN GRID) */}
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
              </div>
            )}

            {/* ── 4. BOTTOM QUESTION NAVIGATION (PREV / NEXT) ── */}
            <div className="pt-8 border-t border-border/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {prevQuestion ? (
                <Link
                  href={`/interview-prep/${prevQuestion.question_id}`}
                  className="flex-1 p-4 rounded-xl bg-surface-container border border-border/60 hover:border-surface-tint/40 hover:bg-surface-container-high transition-all group"
                >
                  <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest flex items-center gap-1 mb-1">
                    <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
                    Previous Question
                  </span>
                  <span className="text-xs font-semibold text-foreground group-hover:text-surface-tint transition-colors line-clamp-1">
                    #{prevQuestion.question_id} · {prevQuestion.question}
                  </span>
                </Link>
              ) : (
                <div className="flex-1" />
              )}

              {nextQuestion ? (
                <Link
                  href={`/interview-prep/${nextQuestion.question_id}`}
                  className="flex-1 p-4 rounded-xl bg-surface-container border border-border/60 hover:border-surface-tint/40 hover:bg-surface-container-high transition-all text-right group"
                >
                  <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest flex items-center justify-end gap-1 mb-1">
                    Next Question
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                  <span className="text-xs font-semibold text-foreground group-hover:text-surface-tint transition-colors line-clamp-1">
                    #{nextQuestion.question_id} · {nextQuestion.question}
                  </span>
                </Link>
              ) : (
                <div className="flex-1" />
              )}
            </div>
          </div>
        )}

        {/* ── 8. CONTINUE PRACTICING (RELATED QUESTIONS) ── */}
        {relatedQuestions.length > 0 && !loading && (
          <section className="mt-20 pt-12 border-t border-border/40 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-surface-tint font-semibold block mb-1">
                  Continue Practicing
                </span>
                <h2 className="text-2xl font-bold text-foreground tracking-tight">
                  Related interview questions
                </h2>
              </div>

              {question?.company && (
                <Link
                  href={`/interview-prep/company/${companyToSlug(question.company)}`}
                  className="text-xs font-mono text-muted-foreground hover:text-surface-tint flex items-center gap-1 transition-colors"
                >
                  <span>More {question.company} questions</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedQuestions.map((rq) => {
                const rMeta = difficultyMeta[rq.difficulty] || difficultyMeta.Medium;
                return (
                  <Link
                    key={rq.question_id}
                    href={`/interview-prep/${rq.question_id}`}
                    className="p-4 rounded-2xl bg-surface-container border border-border/50 hover:border-surface-tint/40 hover:bg-surface-container-high transition-all flex flex-col justify-between group"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="font-semibold text-surface-tint">
                          {rq.question_id}
                        </span>
                        <span className={`text-[10px] font-semibold ${rMeta.text}`}>
                          {rq.difficulty}
                        </span>
                      </div>

                      <h3 className="text-xs sm:text-sm font-semibold text-foreground group-hover:text-surface-tint transition-colors line-clamp-3 leading-snug">
                        {rq.question}
                      </h3>
                    </div>

                    <div className="mt-4 pt-2.5 border-t border-border/30 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                      <span>{rq.category}</span>
                      <span className="text-surface-tint group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                        Practice <ChevronRight className="w-3 h-3" />
                      </span>
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

  // Split by double newline or sections
  const rawSections = text.split("\n\n").filter(Boolean);

  return (
    <div className="space-y-6">
      {rawSections.map((section, idx) => {
        const trimmed = section.trim();

        // 1. Check if section is "What the interviewer wants to know"
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

        // 2. Check if section is "How to structure your answer (STAR)"
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

                  // STAR Steps
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

        // 3. Check if section is "What makes a strong answer" / "Strong answer signals"
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

        // 4. Check for other headings or general text
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

        // 5. Default paragraph or bullet list
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

// ── Helper: Inline Bold and Italics Formatter ──
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
