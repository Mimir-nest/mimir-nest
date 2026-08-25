"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  BookOpen,
  Search,
  Bookmark,
  CheckCircle2,
  Shuffle,
  Eye,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  X,
  RotateCcw,
  Video,
  Layers,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { sections, questions } from "./data/questions";

// ─── Inline markdown renderer ─────────────────────────────────────────────────
const InlineText = ({ text }) => {
  const regex = /(\*\*.*?\*\*|`[^`]+`|\[.*?\]\(.*?\))/g;
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**"))
          return <strong key={i} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>;
        if (part.startsWith("`") && part.endsWith("`"))
          return (
            <code key={i} className="bg-[#121313] px-1.5 py-0.5 rounded font-mono text-xs text-[#ff7a5c] border border-outline-variant/20">
              {part.slice(1, -1)}
            </code>
          );
        if (part.startsWith("[") && part.includes("](")) {
          const m = part.match(/\[(.*?)\]\((.*?)\)/);
          if (m) return (
            <a key={i} href={m[2]} target="_blank" rel="noopener noreferrer"
              className="text-surface-tint hover:underline inline-flex items-center gap-0.5 font-medium">
              {m[1]}<ExternalLink className="w-2.5 h-2.5" />
            </a>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
};

const AnswerText = ({ text }) => {
  if (!text) return null;
  const blocks = text.split(/\n\n+/);
  return (
    <div className="space-y-3 text-[15px] leading-[1.75] text-on-surface-variant/90">
      {blocks.map((block, idx) => {
        const trimmed = block.trim();
        if (!trimmed) return null;
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
          return (
            <ul key={idx} className="list-disc pl-5 space-y-1.5">
              {trimmed.split("\n").map((line, li) => (
                <li key={li}><InlineText text={line.replace(/^[-*]\s+/, "")} /></li>
              ))}
            </ul>
          );
        }
        return <p key={idx}><InlineText text={trimmed} /></p>;
      })}
    </div>
  );
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const FILTER_LABELS = ["All", "Unreviewed", "Reviewed", "Bookmarked"];

export default function SystemDesignPage() {
  // ── Topic / filter state
  const [activeSectionId, setActiveSectionId] = useState(null);
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [topicMenuOpen, setTopicMenuOpen] = useState(false);

  // ── Question navigation state (index within the filtered list)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answerVisible, setAnswerVisible] = useState(false);
  const [interviewMode, setInterviewMode] = useState(true);

  // ── Persistent user state (localStorage)
  const [reviewed, setReviewed] = useState(() => new Set());
  const [bookmarks, setBookmarks] = useState(() => new Set());

  // ── Refs
  const searchRef = useRef(null);
  const topicRef = useRef(null);

  // ── Load from localStorage on mount
  useEffect(() => {
    try {
      const r = localStorage.getItem("sd-reviewed");
      const b = localStorage.getItem("sd-bookmarks");
      const im = localStorage.getItem("sd-interview-mode");
      if (r) setReviewed(new Set(JSON.parse(r)));
      if (b) setBookmarks(new Set(JSON.parse(b)));
      if (im !== null) setInterviewMode(im !== "false");
    } catch (_) {}
  }, []);

  // ── Persist reviewed
  const persistReviewed = useCallback((next) => {
    localStorage.setItem("sd-reviewed", JSON.stringify(Array.from(next)));
  }, []);

  // ── Persist bookmarks
  const persistBookmarks = useCallback((next) => {
    localStorage.setItem("sd-bookmarks", JSON.stringify(Array.from(next)));
  }, []);

  // ── Persist interview mode
  useEffect(() => {
    localStorage.setItem("sd-interview-mode", String(interviewMode));
  }, [interviewMode]);

  // ── Close topic menu on outside click
  useEffect(() => {
    const handler = (e) => {
      if (topicRef.current && !topicRef.current.contains(e.target)) setTopicMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── Keyboard shortcut: Ctrl+K / Cmd+K → focus search
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // ── Derive the working question list from all filters
  const workingQuestions = questions.filter((q) => {
    if (activeSectionId !== null && q.sectionId !== activeSectionId) return false;
    if (filter === "Reviewed" && !reviewed.has(q.id)) return false;
    if (filter === "Unreviewed" && reviewed.has(q.id)) return false;
    if (filter === "Bookmarked" && !bookmarks.has(q.id)) return false;
    if (searchQuery.trim()) {
      const qry = searchQuery.toLowerCase();
      const sec = sections.find((s) => s.id === q.sectionId)?.name.toLowerCase() ?? "";
      if (
        !q.question.toLowerCase().includes(qry) &&
        !q.answer.toLowerCase().includes(qry) &&
        !sec.includes(qry)
      )
        return false;
    }
    return true;
  });

  // ── Clamp current index whenever the list changes
  useEffect(() => {
    setCurrentIndex(0);
    setAnswerVisible(false);
  }, [activeSectionId, filter, searchQuery]);

  const currentQuestion = workingQuestions[currentIndex] ?? null;

  // ── Navigation helpers
  const goNext = useCallback(() => {
    if (currentIndex < workingQuestions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setAnswerVisible(false);
    }
  }, [currentIndex, workingQuestions.length]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
      setAnswerVisible(false);
    }
  }, [currentIndex]);

  // Keyboard arrow navigation
  useEffect(() => {
    const handler = (e) => {
      if (document.activeElement === searchRef.current) return;
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === " ") { e.preventDefault(); setAnswerVisible((v) => !v); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev]);

  const randomQuestion = () => {
    if (!workingQuestions.length) return;
    const idx = Math.floor(Math.random() * workingQuestions.length);
    setCurrentIndex(idx);
    setAnswerVisible(false);
    toast.success(`Jumped to question #${workingQuestions[idx].number}`);
  };

  const toggleReviewed = (id) => {
    setReviewed((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      persistReviewed(next);
      return next;
    });
  };

  const toggleBookmark = (id) => {
    setBookmarks((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      persistBookmarks(next);
      return next;
    });
  };

  // ── Global progress (never affected by filters)
  const globalReviewed = reviewed.size;
  const globalTotal = questions.length;
  const globalPct =
    globalReviewed === 0 ? 0 : Math.max(1, Math.ceil((globalReviewed / globalTotal) * 100));

  // ── Active section meta
  const activeSection = sections.find((s) => s.id === activeSectionId) ?? null;
  const sectionQuestions = activeSectionId
    ? questions.filter((q) => q.sectionId === activeSectionId)
    : questions;
  const sectionReviewed = sectionQuestions.filter((q) => reviewed.has(q.id)).length;

  const isReviewed = currentQuestion ? reviewed.has(currentQuestion.id) : false;
  const isBookmarked = currentQuestion ? bookmarks.has(currentQuestion.id) : false;

  // ── Topic select helper
  const selectSection = (id) => {
    setActiveSectionId(id);
    setFilter("All");
    setTopicMenuOpen(false);
  };

  // ── Compact section label
  const activeSectionLabel = activeSection
    ? `${activeSection.id}. ${activeSection.name}`
    : "All Topics";

  return (
    <div className="min-h-screen bg-mn-background text-on-background">
      <Navbar />

      {/* ════════════════════════════════════════════════
          HERO — compact
      ════════════════════════════════════════════════ */}
      <section className="pt-[100px] md:pt-[130px] pb-10 md:pb-14 px-4 sm:px-8 bg-[#0f1010] border-b border-outline-variant/30">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-outline-variant/50 bg-surface-container text-[11px] font-semibold text-on-surface-variant uppercase tracking-widest">
            <BookOpen className="w-3.5 h-3.5 text-surface-tint" />
            Mimir Nest · Interview Prep
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight tracking-tight">
            500+ System Design<br />
            <span className="text-surface-tint">Interview Questions &amp; Answers</span>
          </h1>

          <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed max-w-2xl mx-auto">
            Prepare for system design interviews with 502+ questions covering scalability, databases,
            caching, distributed systems, networking, APIs, HLD, LLD, and advanced architecture.
          </p>

          {/* Compact metadata row */}
          <div className="flex items-center justify-center gap-5 text-sm text-on-surface-variant/80 pt-1">
            <span><span className="text-foreground font-bold">502</span> Questions</span>
            <span className="opacity-30">·</span>
            <span><span className="text-foreground font-bold">24</span> Topics</span>
            <span className="opacity-30">·</span>
            <span>Basic → Advanced</span>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button
              className="bg-primary text-primary-foreground hover:opacity-90 rounded-xl px-7 h-11 font-semibold shadow"
              onClick={() => searchRef.current?.focus()}
            >
              Start Practicing
            </Button>
            <Button
              variant="outline"
              className="border-outline-variant/60 hover:bg-surface-container-high rounded-xl px-7 h-11 font-semibold text-foreground"
              onClick={() => setTopicMenuOpen(true)}
            >
              Browse Topics
            </Button>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          PROGRESS STRIP — always global, always visible
      ════════════════════════════════════════════════ */}
      <div className="bg-[#111213] border-b border-outline-variant/30 px-4 sm:px-8 py-3">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <span className="text-xs text-on-surface-variant font-medium shrink-0">Your progress</span>
            {/* Bar */}
            <div className="flex-1 h-1.5 bg-surface-container rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-surface-tint rounded-full"
                animate={{ width: `${globalPct}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
            <span className="text-xs font-bold text-foreground shrink-0">
              {globalReviewed} <span className="text-on-surface-variant font-normal">/ {globalTotal}</span>
            </span>
          </div>

          {/* Quick filters */}
          <div className="flex items-center gap-1.5 shrink-0">
            {FILTER_LABELS.map((label) => (
              <button
                key={label}
                onClick={() => { setFilter(label); setCurrentIndex(0); setAnswerVisible(false); }}
                className={`text-[11px] px-2.5 py-1 rounded-full font-semibold transition-colors border ${
                  filter === label
                    ? "bg-surface-tint/10 text-surface-tint border-surface-tint/30"
                    : "text-on-surface-variant border-outline-variant/30 hover:text-foreground hover:border-outline-variant/60 bg-transparent"
                }`}
              >
                {label}
                {label === "Bookmarked" && bookmarks.size > 0 && (
                  <span className="ml-1 text-[10px]">({bookmarks.size})</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════
          SEARCH + TOPIC NAV
      ════════════════════════════════════════════════ */}
      <div className="bg-[#0f1010] px-4 sm:px-8 py-4 border-b border-outline-variant/20">
        <div className="max-w-4xl mx-auto space-y-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/60 pointer-events-none" />
            <input
              ref={searchRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search system design questions, topics or answers…"
              className="w-full h-11 pl-10 pr-24 bg-surface-container border border-outline-variant/40 rounded-2xl text-sm text-foreground placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-surface-tint/40 focus:border-surface-tint/60 transition-all"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="text-on-surface-variant/60 hover:text-foreground transition-colors p-0.5">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono border border-outline-variant/40 text-on-surface-variant/60 bg-surface-container-lowest">
                ⌘K
              </kbd>
            </div>
          </div>

          {/* Compact topic nav */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-0.5" ref={topicRef}>
            {/* All topics pill */}
            <button
              onClick={() => selectSection(null)}
              className={`shrink-0 text-xs px-3 py-1.5 rounded-full font-semibold border transition-all whitespace-nowrap ${
                activeSectionId === null
                  ? "bg-surface-tint text-[#0f1010] border-surface-tint shadow"
                  : "text-on-surface-variant border-outline-variant/40 hover:text-foreground hover:border-outline-variant/70 bg-transparent"
              }`}
            >
              All · {questions.length}
            </button>

            {sections.map((sec) => {
              const isActive = activeSectionId === sec.id;
              const shortName = sec.name
                .replace(" (Basic)", "")
                .replace(" & ", " & ")
                .split(" ")[0];
              return (
                <button
                  key={sec.id}
                  onClick={() => selectSection(sec.id)}
                  className={`shrink-0 text-xs px-3 py-1.5 rounded-full font-semibold border transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-surface-tint text-[#0f1010] border-surface-tint shadow"
                      : "text-on-surface-variant border-outline-variant/40 hover:text-foreground hover:border-outline-variant/70 bg-transparent"
                  }`}
                >
                  {shortName} · {sec.questionsCount}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════
          QUESTION WORKSPACE — primary content area
      ════════════════════════════════════════════════ */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-6">

        {/* Section header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-[11px] font-bold text-surface-tint uppercase tracking-widest mb-1">
              {activeSection ? activeSection.name : "All Topics"}
            </h2>
            <p className="text-xs text-on-surface-variant">
              {workingQuestions.length} question{workingQuestions.length !== 1 ? "s" : ""}
              {activeSectionId && (
                <> &nbsp;·&nbsp; <span className="text-foreground font-semibold">{sectionReviewed}/{sectionQuestions.length}</span> reviewed</>
              )}
            </p>
          </div>

          {/* Interview Mode toggle + random */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setInterviewMode((v) => !v)}
              className={`text-[11px] px-3 py-1.5 rounded-full font-semibold border transition-all ${
                interviewMode
                  ? "bg-surface-tint/10 text-surface-tint border-surface-tint/30"
                  : "text-on-surface-variant border-outline-variant/30 hover:text-foreground"
              }`}
            >
              {interviewMode ? "Interview mode ON" : "Interview mode OFF"}
            </button>

            <button
              onClick={randomQuestion}
              title="Random question"
              className="p-1.5 rounded-full text-on-surface-variant hover:text-surface-tint border border-outline-variant/30 hover:border-surface-tint/30 hover:bg-surface-tint/5 transition-all"
            >
              <Shuffle className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ── The question card ── */}
        {currentQuestion ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="bg-surface-container-lowest border border-outline-variant/40 rounded-3xl overflow-hidden shadow-sm"
            >
              {/* Card top strip */}
              <div className="bg-[#121313] border-b border-outline-variant/20 px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-[11px] text-on-surface-variant/60">
                    #{String(currentQuestion.number).padStart(3, "0")}
                  </span>
                  <span className="opacity-20 text-xs">·</span>
                  <span className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">
                    {sections.find((s) => s.id === currentQuestion.sectionId)?.name ?? ""}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  {/* Bookmark */}
                  <button
                    onClick={() => toggleBookmark(currentQuestion.id)}
                    title={isBookmarked ? "Remove bookmark" : "Bookmark"}
                    aria-label={isBookmarked ? "Remove bookmark" : "Bookmark question"}
                    className={`p-1.5 rounded-lg transition-all border ${
                      isBookmarked
                        ? "bg-surface-tint/10 text-surface-tint border-surface-tint/30"
                        : "text-on-surface-variant/50 border-outline-variant/20 hover:text-surface-tint hover:border-surface-tint/30"
                    }`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? "fill-current" : ""}`} />
                  </button>

                  {/* Reviewed */}
                  <button
                    onClick={() => toggleReviewed(currentQuestion.id)}
                    title={isReviewed ? "Mark as unreviewed" : "Mark as reviewed"}
                    aria-label={isReviewed ? "Mark as unreviewed" : "Mark as reviewed"}
                    className={`p-1.5 rounded-lg transition-all border ${
                      isReviewed
                        ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/30"
                        : "text-on-surface-variant/50 border-outline-variant/20 hover:text-emerald-400 hover:border-emerald-500/20"
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Question body */}
              <div className="px-6 md:px-8 pt-8 pb-6 space-y-6">
                {/* HLD / LLD badges */}
                {(currentQuestion.sectionId === 20 || currentQuestion.sectionId === 21) && (
                  <div className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg border ${
                    currentQuestion.sectionId === 20
                      ? "text-[#d88732] bg-[#d88732]/5 border-[#d88732]/20"
                      : "text-[#4b9fd5] bg-[#4b9fd5]/5 border-[#4b9fd5]/20"
                  }`}>
                    {currentQuestion.sectionId === 20 ? "System Design Case Study" : "Low-Level Design"}
                  </div>
                )}

                {/* Question text */}
                <h3 className="text-xl md:text-2xl font-bold text-foreground leading-snug">
                  {currentQuestion.question}
                </h3>

                {/* Answer area */}
                <AnimatePresence>
                  {!interviewMode || answerVisible ? (
                    <motion.div
                      key="answer"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-2 space-y-4">
                        {/* HLD / LLD notice */}
                        {currentQuestion.sectionId === 20 && (
                          <p className="text-[11px] text-[#d88732]/80 italic border-l-2 border-[#d88732]/30 pl-3">
                            Brief conceptual outline — expand in your own practice session with capacity estimation, diagrams, and trade-off discussion.
                          </p>
                        )}

                        <AnswerText text={currentQuestion.answer} />

                        {/* In-answer action row */}
                        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-outline-variant/20">
                          <button
                            onClick={() => toggleReviewed(currentQuestion.id)}
                            className={`flex items-center gap-2 text-xs px-4 py-2 rounded-xl font-semibold border transition-all ${
                              isReviewed
                                ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/30"
                                : "text-on-surface-variant border-outline-variant/30 hover:text-emerald-400 hover:border-emerald-500/20"
                            }`}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            {isReviewed ? "Reviewed ✓" : "Mark as reviewed"}
                          </button>

                          {interviewMode && (
                            <button
                              onClick={() => setAnswerVisible(false)}
                              className="flex items-center gap-2 text-xs text-on-surface-variant/60 hover:text-foreground transition-colors"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              Hide answer
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    /* Interview mode — answer hidden */
                    <motion.div
                      key="hidden"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center py-10 space-y-5 border border-dashed border-outline-variant/30 rounded-2xl"
                    >
                      <p className="text-xs text-on-surface-variant/60 font-medium">
                        Interview mode · Think before you reveal
                      </p>
                      <Button
                        onClick={() => setAnswerVisible(true)}
                        className="bg-surface-tint/10 text-surface-tint border border-surface-tint/30 hover:bg-surface-tint/20 rounded-xl px-6 h-10 text-sm font-semibold"
                      >
                        Reveal Answer
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Card bottom reveal strip (when NOT in interview mode and answer is implicitly visible) */}
              {!interviewMode && (
                <div className="px-6 md:px-8 pb-6" />
              )}
            </motion.div>
          </AnimatePresence>
        ) : (
          /* Empty state */
          <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-3xl p-12 text-center space-y-4">
            <BookOpen className="w-10 h-10 text-surface-tint/30 mx-auto" />
            <h4 className="font-bold text-foreground">No questions found</h4>
            <p className="text-sm text-on-surface-variant max-w-xs mx-auto leading-relaxed">
              {searchQuery
                ? `No results for "${searchQuery}". Try a different keyword.`
                : "No questions match the current filter. Try switching to All."}
            </p>
            <div className="flex gap-3 justify-center pt-2">
              <button
                onClick={() => { setSearchQuery(""); setFilter("All"); setActiveSectionId(null); }}
                className="text-xs font-semibold text-surface-tint hover:underline"
              >
                Reset filters
              </button>
            </div>
          </div>
        )}

        {/* ── Navigation row ── */}
        {currentQuestion && (
          <div className="flex items-center justify-between gap-4">
            <Button
              variant="outline"
              onClick={goPrev}
              disabled={currentIndex === 0}
              className="border-outline-variant/40 hover:bg-surface-container-high rounded-xl h-10 px-4 text-sm font-semibold disabled:opacity-30 text-foreground flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            {/* Position counter */}
            <div className="text-center space-y-1">
              <p className="text-xs font-mono font-semibold text-foreground">
                {currentIndex + 1}{" "}
                <span className="text-on-surface-variant font-normal">/ {workingQuestions.length}</span>
              </p>
              {/* Dot progress strip */}
              {workingQuestions.length <= 30 && (
                <div className="flex items-center justify-center gap-1 flex-wrap max-w-[180px]">
                  {workingQuestions.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => { setCurrentIndex(i); setAnswerVisible(false); }}
                      className={`rounded-full transition-all ${
                        i === currentIndex
                          ? "w-4 h-1.5 bg-surface-tint"
                          : reviewed.has(workingQuestions[i].id)
                          ? "w-1.5 h-1.5 bg-emerald-500/60"
                          : "w-1.5 h-1.5 bg-outline-variant/50 hover:bg-outline"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {currentIndex < workingQuestions.length - 1 ? (
              <Button
                variant="outline"
                onClick={goNext}
                className="border-outline-variant/40 hover:bg-surface-container-high rounded-xl h-10 px-4 text-sm font-semibold text-foreground flex items-center gap-1.5"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <div className="flex flex-col items-end gap-1">
                <span className="text-[10px] text-on-surface-variant font-medium">End of section</span>
                <button
                  onClick={() => { setCurrentIndex(0); setAnswerVisible(false); }}
                  className="flex items-center gap-1 text-xs font-semibold text-surface-tint hover:underline"
                >
                  <RotateCcw className="w-3 h-3" />
                  Review again
                </button>
              </div>
            )}
          </div>
        )}

        {/* ════════════════════════════════════════════════
            RESOURCES — below workspace, compact
        ════════════════════════════════════════════════ */}
        {activeSection && activeSection.videos.length > 0 && (
          <div className="pt-4 border-t border-outline-variant/20 space-y-3">
            <h4 className="text-[11px] font-bold text-on-surface-variant uppercase tracking-widest flex items-center gap-1.5">
              <Video className="w-3.5 h-3.5" />
              Learn more
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {activeSection.videos.map((vid, i) => (
                <a
                  key={i}
                  href={vid.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-3 rounded-2xl bg-surface-container/60 border border-outline-variant/20 hover:border-surface-tint/30 hover:bg-surface-container text-xs font-semibold text-foreground group transition-all"
                >
                  <span className="group-hover:text-surface-tint transition-colors truncate">{vid.name}</span>
                  <ExternalLink className="w-3 h-3 text-on-surface-variant group-hover:text-surface-tint transition-colors shrink-0 ml-2" />
                </a>
              ))}
            </div>
          </div>
        )}



      </main>

      <Footer />
    </div>
  );
}
