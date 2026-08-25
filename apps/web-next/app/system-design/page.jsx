"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { sections, questions } from "./data/questions";

// Grouping of 24 canonical topics for left sidebar navigation
const topicGroups = [
  {
    name: "FOUNDATIONS",
    sectionIds: [1, 2, 3]
  },
  {
    name: "DATA",
    sectionIds: [4, 5, 6, 7]
  },
  {
    name: "DISTRIBUTED SYSTEMS",
    sectionIds: [8, 9, 10, 12, 13]
  },
  {
    name: "ARCHITECTURE",
    sectionIds: [11, 14, 15, 16, 17, 18, 19]
  },
  {
    name: "INTERVIEW",
    sectionIds: [20, 21, 22, 23, 24]
  }
];

const PAGE_SIZE = 20;

// Inline markdown formatter helper
const InlineText = ({ text }) => {
  const regex = /(\*\*.*?\*\*|`[^`]+`|\[.*?\]\(.*?\))/g;
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={i} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code key={i} className="bg-[#121313] px-1.5 py-0.5 rounded font-mono text-xs text-[#ff5a36] border border-outline-variant/20">
              {part.slice(1, -1)}
            </code>
          );
        }
        if (part.startsWith("[") && part.includes("](")) {
          const match = part.match(/\[(.*?)\]\((.*?)\)/);
          if (match) {
            return (
              <a
                key={i}
                href={match[2]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-surface-tint hover:underline inline-flex items-center gap-0.5 font-medium"
              >
                {match[1]}
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            );
          }
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
};

const FormattedAnswer = ({ text }) => {
  if (!text) return null;
  const blocks = text.split(/\n\n+/);
  return (
    <div className="space-y-3 text-[14px] md:text-[15px] leading-[1.75] text-on-surface-variant/90">
      {blocks.map((block, idx) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // Fenced code blocks
        if (trimmed.startsWith("```")) {
          const lines = trimmed.split("\n");
          const codeLines = lines.slice(1, lines[lines.length - 1] === "```" ? -1 : undefined);
          return (
            <pre
              key={idx}
              className="bg-[#0b0c0c] p-4 rounded-xl border border-outline-variant/35 overflow-x-auto my-3 font-mono text-xs text-orange-400"
            >
              <code>{codeLines.join("\n")}</code>
            </pre>
          );
        }

        // List blocks
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

export default function SystemDesignPage() {
  // ── Mode selection ──────────────────────────────────────────────
  const [mode, setMode] = useState("browse"); // "browse" or "practice"

  // ── Core Navigation States (separate from filters) ──────────────
  const [activeSectionId, setActiveSectionId] = useState(null);
  const [difficultyFilter, setDifficultyFilter] = useState("All"); // "All", "Basic", "Advanced"

  // ── Filters & Search ────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All"); // "All", "Reviewed", "Unreviewed"
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // ── UI States ───────────────────────────────────────────────────
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [mobileTopicsOpen, setMobileTopicsOpen] = useState(false);
  const [topicSearch, setTopicSearch] = useState("");

  // ── Persistent state ────────────────────────────────────────────
  const [reviewed, setReviewed] = useState(new Set());
  const [bookmarks, setBookmarks] = useState(new Set());

  // ── View States ─────────────────────────────────────────────────
  const [expandedQuestions, setExpandedQuestions] = useState(new Set()); // For Browse Mode
  const [practiceIndex, setPracticeIndex] = useState(0); // For Practice Mode
  const [practiceAnswerRevealed, setPracticeAnswerRevealed] = useState(false);

  const mobileDropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // ── Load state from localStorage on mount ────────────────────────
  useEffect(() => {
    try {
      const r = localStorage.getItem("sd-reviewed");
      const b = localStorage.getItem("sd-bookmarks");
      const savedMode = localStorage.getItem("sd-active-mode");
      if (r) setReviewed(new Set(JSON.parse(r)));
      if (b) setBookmarks(new Set(JSON.parse(b)));
      if (savedMode === "practice") setMode("practice");
    } catch (err) {
      console.warn("Failed to load local storage state:", err);
    }
  }, []);

  // ── Persist states on change ────────────────────────────────────
  const saveReviewed = (next) => {
    localStorage.setItem("sd-reviewed", JSON.stringify(Array.from(next)));
  };

  const saveBookmarks = (next) => {
    localStorage.setItem("sd-bookmarks", JSON.stringify(Array.from(next)));
  };

  const changeMode = (newMode) => {
    setMode(newMode);
    localStorage.setItem("sd-active-mode", newMode);
    if (newMode === "practice") {
      setPracticeIndex(0);
      setPracticeAnswerRevealed(false);
    }
  };

  // ── Close mobile topics picker on outside click ──────────────────
  useEffect(() => {
    const handler = (e) => {
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(e.target)) {
        setMobileTopicsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── Reset to page 1 on filter changes ──────────────────────────
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeSectionId, difficultyFilter, statusFilter, showBookmarksOnly]);

  // ── Global progress statistics (always representation of complete bank) ──
  const globalReviewedCount = reviewed.size;
  const globalTotalCount = questions.length;
  const globalPercent = globalTotalCount > 0 ? Math.ceil((globalReviewedCount / globalTotalCount) * 100) : 0;

  // ── Derived difficulty labels based on section rules ──────────────
  const getQuestionDifficulty = (q) => {
    if (q.sectionId === 1) return "Basic";
    if (q.sectionId === 23) return "Advanced";
    return ""; // Empty/unspecified difficulty (do not invent intermediate/other values)
  };

  // ── Derived section metadata ────────────────────────────────────
  const activeSection = sections.find((s) => s.id === activeSectionId) ?? null;
  const activeSectionLabel = activeSection
    ? `${activeSection.id}. ${activeSection.name}`
    : "All Topics";

  // ── Build filtered dataset based on active filters ──────────────
  const filteredQuestions = questions.filter((q) => {
    // Topic Navigation
    if (activeSectionId !== null && q.sectionId !== activeSectionId) return false;

    // Level Navigation
    const diff = getQuestionDifficulty(q);
    if (difficultyFilter === "Basic" && diff !== "Basic") return false;
    if (difficultyFilter === "Advanced" && diff !== "Advanced") return false;

    // Status filter
    const isRev = reviewed.has(q.id);
    if (statusFilter === "Reviewed" && !isRev) return false;
    if (statusFilter === "Unreviewed" && isRev) return false;

    // Bookmarked filter
    if (showBookmarksOnly && !bookmarks.has(q.id)) return false;

    // Search query matches: question text, answer, or section name
    if (searchQuery.trim()) {
      const qry = searchQuery.toLowerCase();
      const qText = q.question.toLowerCase();
      const aText = q.answer.toLowerCase();
      const sName = sections.find((s) => s.id === q.sectionId)?.name.toLowerCase() ?? "";

      if (!qText.includes(qry) && !aText.includes(qry) && !sName.includes(qry)) {
        return false;
      }
    }

    return true;
  });

  // ── Pagination variables for Browse Mode ───────────────────────
  const totalPages = Math.ceil(filteredQuestions.length / PAGE_SIZE);
  const paginatedQuestions = filteredQuestions.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const getPageNumbers = (current, total) => {
    const pages = [];
    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      pages.push(1);
      if (current > 3) pages.push("...");

      const start = Math.max(2, current - 1);
      const end = Math.min(total - 1, current + 1);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }

      if (current < total - 2) pages.push("...");
      pages.push(total);
    }
    return pages;
  };

  // ── Toggle Actions ──────────────────────────────────────────────
  const toggleReviewed = (id) => {
    setReviewed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      saveReviewed(next);
      return next;
    });
  };

  const toggleBookmark = (id) => {
    setBookmarks((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      saveBookmarks(next);
      return next;
    });
  };

  const toggleExpandBrowseCard = (id) => {
    setExpandedQuestions((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // ── Practice Mode triggers ──────────────────────────────────────
  const practiceQuestion = filteredQuestions[practiceIndex] ?? null;

  const startPracticeForQuestion = (qId) => {
    const idx = filteredQuestions.findIndex((q) => q.id === qId);
    if (idx !== -1) {
      setPracticeIndex(idx);
      setPracticeAnswerRevealed(true);
      changeMode("practice");
    } else {
      toast.error("Question cannot be found in the current filtered set.");
    }
  };

  // ── Shuffle Random Question ─────────────────────────────────────
  const triggerRandomQuestion = () => {
    if (filteredQuestions.length === 0) {
      toast.error("No questions match the current filters to select from.");
      return;
    }
    const randIdx = Math.floor(Math.random() * filteredQuestions.length);
    const chosenQ = filteredQuestions[randIdx];

    if (mode === "practice") {
      setPracticeIndex(randIdx);
      setPracticeAnswerRevealed(false);
      toast.success(`Shuffle picked Question #${chosenQ.number}`);
    } else {
      toggleExpandBrowseCard(chosenQ.id);
      const qIndexInFiltered = filteredQuestions.findIndex((q) => q.id === chosenQ.id);
      const qPage = Math.floor(qIndexInFiltered / PAGE_SIZE) + 1;
      setCurrentPage(qPage);

      setTimeout(() => {
        const el = document.getElementById(`browse-q-${chosenQ.id}`);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          el.classList.add("ring-2", "ring-surface-tint");
          setTimeout(() => el.classList.remove("ring-2", "ring-surface-tint"), 2000);
        }
      }, 200);
      toast.success(`Shuffle highlighted Question #${chosenQ.number}`);
    }
  };

  // ── Clear all filters ───────────────────────────────────────────
  const clearAllFilters = () => {
    setSearchQuery("");
    setActiveSectionId(null);
    setDifficultyFilter("All");
    setStatusFilter("All");
    setShowBookmarksOnly(false);
    toast.success("Filters cleared.");
  };

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    activeSectionId !== null ||
    difficultyFilter !== "All" ||
    statusFilter !== "All" ||
    showBookmarksOnly;

  return (
    <div className="min-h-screen bg-mn-background text-on-background">
      <Navbar />

      {/* ════════════════════════════════════════════════
          1. COMPACT HERO
      ════════════════════════════════════════════════ */}
      <section className="pt-[100px] md:pt-[125px] pb-6 md:pb-8 px-6 sm:px-16 text-center bg-[#0f1010] border-b border-outline-variant/20">
        <div className="max-w-3xl mx-auto space-y-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-foreground tracking-tight">
            500+ System Design <span className="text-surface-tint">Interview Questions &amp; Answers</span>
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            Practice system design from fundamentals to advanced architecture with 502+ interview questions
            covering scalability, databases, caching, distributed systems, APIs, HLD, LLD, and more.
          </p>
          <div className="text-[11px] font-medium text-on-surface-variant/75 pt-1">
            502 Questions &nbsp;·&nbsp; 24 Topics &nbsp;·&nbsp; Basic → Advanced
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          2 & 3. GLOBAL PROGRESS & MODE CONTROLS
      ════════════════════════════════════════════════ */}
      <div className="bg-[#111213] border-b border-outline-variant/20 px-6 sm:px-12 py-3">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Global Progress Area */}
          <div className="flex items-center gap-3.5 flex-1 max-w-md">
            <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider shrink-0">
              Your Progress
            </span>
            <div className="h-1.5 bg-surface-container rounded-full flex-1 overflow-hidden">
              <div
                className="h-full bg-surface-tint rounded-full transition-all duration-300"
                style={{ width: `${globalPercent}%` }}
              />
            </div>
            <span className="text-xs font-semibold text-foreground shrink-0">
              {globalReviewedCount} <span className="text-on-surface-variant font-normal">/ {globalTotalCount} reviewed</span>
            </span>
            <span className="text-xs text-on-surface-variant/80 shrink-0">
              Bookmarks <span className="font-semibold text-foreground">{bookmarks.size}</span>
            </span>
          </div>

          {/* Mode switch */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => changeMode("browse")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                mode === "browse"
                  ? "bg-surface-tint text-[#0f1010] border-surface-tint shadow-sm"
                  : "text-on-surface-variant border-outline-variant/35 hover:text-foreground hover:bg-surface-container"
              }`}
            >
              Browse Questions
            </button>
            <button
              onClick={() => changeMode("practice")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                mode === "practice"
                  ? "bg-surface-tint text-[#0f1010] border-surface-tint shadow-sm"
                  : "text-on-surface-variant border-outline-variant/35 hover:text-foreground hover:bg-surface-container"
              }`}
            >
              Practice
            </button>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════
          TWO COLUMN WORKSPACE
      ════════════════════════════════════════════════ */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        
        {/* Mobile Topic navigation dropdown */}
        <div className="md:hidden mb-4" ref={mobileDropdownRef}>
          <button
            onClick={() => setMobileTopicsOpen(!mobileTopicsOpen)}
            className="w-full h-10 px-4 rounded-xl border border-outline-variant/40 bg-surface-container flex items-center justify-between text-xs font-bold text-foreground"
          >
            <span>Topic: {activeSection ? activeSection.name : "All Topics"}</span>
            <ChevronDown className="w-4 h-4 opacity-75" />
          </button>
          
          <AnimatePresence>
            {mobileTopicsOpen && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="absolute z-40 left-6 right-6 mt-1 max-h-80 overflow-y-auto bg-surface-container-lowest border border-outline-variant/45 rounded-xl shadow-lg p-3 space-y-3"
              >
                <input
                  type="text"
                  placeholder="Search topics..."
                  value={topicSearch}
                  onChange={(e) => setTopicSearch(e.target.value)}
                  className="w-full h-8 px-2.5 bg-surface-container border border-outline-variant/35 rounded-lg text-xs text-foreground placeholder:text-on-surface-variant/60 focus:outline-none"
                />
                <div className="space-y-2">
                  <button
                    onClick={() => { setActiveSectionId(null); setMobileTopicsOpen(false); }}
                    className={`w-full text-left px-2 py-1 rounded text-xs font-semibold ${
                      activeSectionId === null ? "text-surface-tint" : "text-foreground"
                    }`}
                  >
                    All Topics ({questions.length})
                  </button>
                  {sections.filter(s => s.name.toLowerCase().includes(topicSearch.toLowerCase())).map((sec) => (
                    <button
                      key={sec.id}
                      onClick={() => { setActiveSectionId(sec.id); setMobileTopicsOpen(false); }}
                      className={`w-full text-left px-2 py-1 rounded text-xs transition-all ${
                        activeSectionId === sec.id ? "text-surface-tint font-bold" : "text-foreground"
                      }`}
                    >
                      {sec.id}. {sec.name.replace(" (Basic)", "")} ({sec.questionsCount})
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* ════════════════════════════════════════════════
              4 & 5. DESKTOP SIDEBAR TOPIC NAVIGATION
          ════════════════════════════════════════════════ */}
          <aside className="hidden md:block md:col-span-3 sticky top-[90px] max-h-[calc(100vh-120px)] overflow-y-auto pr-2 space-y-5 border-r border-outline-variant/15">
            <div>
              <h4 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-2.5">
                Topic Navigation
              </h4>
              <button
                onClick={() => setActiveSectionId(null)}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-between ${
                  activeSectionId === null
                    ? "bg-surface-tint/10 text-surface-tint font-bold"
                    : "text-foreground hover:bg-surface-container/40"
                }`}
              >
                <span>All Topics</span>
                <span className="text-[10px] opacity-60 font-medium">{questions.length}</span>
              </button>
            </div>

            {topicGroups.map((group) => (
              <div key={group.name} className="space-y-1">
                <h5 className="text-[9px] font-bold text-on-surface-variant/50 tracking-widest px-2.5">
                  {group.name}
                </h5>
                <div className="space-y-0.5">
                  {sections
                    .filter((s) => group.sectionIds.includes(s.id))
                    .map((sec) => {
                      const isActive = activeSectionId === sec.id;
                      const cleanName = sec.name.replace(" (Basic)", "");
                      return (
                        <button
                          key={sec.id}
                          onClick={() => setActiveSectionId(sec.id)}
                          className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-all flex items-start justify-between gap-2 ${
                            isActive
                              ? "bg-surface-tint/10 text-surface-tint font-bold"
                              : "text-foreground hover:bg-surface-container/40"
                          }`}
                        >
                          <span className="line-clamp-2 leading-tight">
                            {sec.id}. {cleanName}
                          </span>
                          <span className="text-[10px] opacity-60 shrink-0 font-medium pt-0.5">
                            {sec.questionsCount}
                          </span>
                        </button>
                      );
                    })}
                </div>
              </div>
            ))}
          </aside>

          {/* ════════════════════════════════════════════════
              RIGHT COLUMN: QUESTIONS WORKSPACE
          ════════════════════════════════════════════════ */}
          <section className="md:col-span-9 space-y-6">

            {/* 8. SEARCH COMPONENT */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/50" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search system design questions, topics, or answers..."
                className="w-full h-11 pl-10 pr-12 bg-surface-container border border-outline-variant/35 rounded-xl text-xs text-foreground placeholder:text-on-surface-variant/45 focus:outline-none focus:ring-1 focus:ring-surface-tint/50 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/60 hover:text-foreground p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* 7. LEVEL NAVIGATION */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2 border-b border-outline-variant/15">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mr-2">
                  Level:
                </span>
                {["All", "Basic", "Advanced"].map((level) => (
                  <button
                    key={level}
                    onClick={() => setDifficultyFilter(level)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all border ${
                      difficultyFilter === level
                        ? "bg-surface-tint/10 text-surface-tint border-surface-tint/30 font-bold"
                        : "bg-surface-container border-outline-variant/30 text-foreground hover:bg-surface-container-high"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>

              {/* 9. SECONDARY FILTERS TOGGLE */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowMoreFilters(!showMoreFilters)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold border flex items-center gap-1 transition-all ${
                    showMoreFilters || statusFilter !== "All" || showBookmarksOnly
                      ? "bg-surface-tint/5 text-surface-tint border-surface-tint/20 font-bold"
                      : "bg-transparent border-outline-variant/30 text-foreground hover:bg-surface-container"
                  }`}
                >
                  <span>More Filters</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${showMoreFilters ? "rotate-180" : ""}`} />
                </button>

                <Button
                  variant="outline"
                  onClick={triggerRandomQuestion}
                  className="border-outline-variant/40 hover:bg-surface-container-high rounded-xl h-8 px-2.5 text-xs font-bold text-foreground flex items-center gap-1"
                >
                  <Shuffle className="w-3 h-3 text-surface-tint" />
                  <span>Random</span>
                </Button>
              </div>
            </div>

            {/* Expanded secondary filters pane */}
            <AnimatePresence>
              {showMoreFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden bg-surface-container/30 border border-outline-variant/20 rounded-xl"
                >
                  <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                    {/* Status filter selection */}
                    <div className="space-y-1.5">
                      <span className="font-bold text-on-surface-variant uppercase text-[10px] tracking-wider">
                        Status
                      </span>
                      <div className="flex gap-1">
                        {["All", "Reviewed", "Unreviewed"].map((status) => (
                          <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`px-3 py-1.5 rounded-lg border font-semibold ${
                              statusFilter === status
                                ? "bg-surface-tint/15 text-surface-tint border-surface-tint/35"
                                : "bg-surface-container-lowest border-outline-variant/30 text-foreground hover:bg-surface-container"
                            }`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Bookmark filter selection */}
                    <div className="space-y-1.5">
                      <span className="font-bold text-on-surface-variant uppercase text-[10px] tracking-wider">
                        Bookmarks
                      </span>
                      <div className="flex gap-1">
                        <button
                          onClick={() => setShowBookmarksOnly(false)}
                          className={`px-3 py-1.5 rounded-lg border font-semibold ${
                            !showBookmarksOnly
                              ? "bg-surface-tint/15 text-surface-tint border-surface-tint/35"
                              : "bg-surface-container-lowest border-outline-variant/30 text-foreground hover:bg-surface-container"
                          }`}
                        >
                          All Questions
                        </button>
                        <button
                          onClick={() => setShowBookmarksOnly(true)}
                          className={`px-3 py-1.5 rounded-lg border font-semibold flex items-center gap-1 ${
                            showBookmarksOnly
                              ? "bg-surface-tint/15 text-surface-tint border-surface-tint/35"
                              : "bg-surface-container-lowest border-outline-variant/30 text-foreground hover:bg-surface-container"
                          }`}
                        >
                          <Bookmark className="w-3 h-3 fill-current" />
                          <span>Bookmarked Only</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 16. ACTIVE FILTERS CLEAR NOTIFICATION */}
            {hasActiveFilters && (
              <div className="flex items-center flex-wrap gap-1.5 bg-surface-tint/5 border border-surface-tint/10 rounded-lg p-2.5">
                <span className="text-[10px] font-bold text-surface-tint uppercase tracking-wider mr-1.5">
                  Filters Active:
                </span>
                
                {activeSectionId && (
                  <Badge variant="secondary" className="text-[9px] bg-surface-container/60 hover:bg-surface-container border border-outline-variant/40">
                    Topic: {activeSection.name.split(" ")[0]}
                  </Badge>
                )}
                {difficultyFilter !== "All" && (
                  <Badge variant="secondary" className="text-[9px] bg-surface-container/60 hover:bg-surface-container border border-outline-variant/40">
                    Level: {difficultyFilter}
                  </Badge>
                )}
                {statusFilter !== "All" && (
                  <Badge variant="secondary" className="text-[9px] bg-surface-container/60 hover:bg-surface-container border border-outline-variant/40">
                    Status: {statusFilter}
                  </Badge>
                )}
                {showBookmarksOnly && (
                  <Badge variant="secondary" className="text-[9px] bg-surface-container/60 hover:bg-surface-container border border-outline-variant/40">
                    Bookmarked
                  </Badge>
                )}
                {searchQuery && (
                  <Badge variant="secondary" className="text-[9px] bg-surface-container/60 hover:bg-surface-container border border-outline-variant/40">
                    Search: "{searchQuery}"
                  </Badge>
                )}

                <button
                  onClick={clearAllFilters}
                  className="text-[10px] font-bold text-rose-500 hover:text-rose-400 hover:underline ml-auto flex items-center gap-0.5"
                >
                  <X className="w-3 h-3" />
                  <span>Clear All</span>
                </button>
              </div>
            )}

            {/* ════════════════════════════════════════════════
                10. QUESTION RESULTS LIST (BROWSE MODE)
            ════════════════════════════════════════════════ */}
            {mode === "browse" && (
              <div className="space-y-4">
                <div className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
                  Showing {filteredQuestions.length} of {questions.length} questions
                </div>

                {paginatedQuestions.length > 0 ? (
                  <div className="space-y-3">
                    {paginatedQuestions.map((q) => {
                      const isExpanded = expandedQuestions.has(q.id);
                      const isBookmarked = bookmarks.has(q.id);
                      const isReviewed = reviewed.has(q.id);
                      const difficulty = getQuestionDifficulty(q);

                      return (
                        <div
                          key={q.id}
                          id={`browse-q-${q.id}`}
                          className={`bg-surface-container-lowest border rounded-2xl transition-all duration-200 overflow-hidden ${
                            isExpanded ? "border-surface-tint/50" : "border-outline-variant/35"
                          }`}
                        >
                          {/* 11. QUESTION CARD VISUAL HIERARCHY */}
                          <div
                            onClick={() => toggleExpandBrowseCard(q.id)}
                            className="p-4 md:p-5 flex items-start justify-between gap-4 cursor-pointer hover:bg-surface-container/20 transition-colors"
                          >
                            <div className="space-y-1.5 flex-1 min-w-0">
                              {/* Metadata (Subtle & Clean) */}
                              <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-on-surface-variant/70">
                                <span className="font-mono font-bold text-surface-tint">
                                  #{String(q.number).padStart(3, "0")}
                                </span>
                                <span>·</span>
                                <span className="uppercase tracking-wider font-semibold truncate max-w-[200px]">
                                  {sections.find((s) => s.id === q.sectionId)?.name.split(". ")[1] ?? ""}
                                </span>
                                {difficulty && (
                                  <>
                                    <span>·</span>
                                    <Badge className="bg-surface-container hover:bg-surface-container border border-outline-variant/60 text-on-surface-variant text-[8px] py-0 px-1 font-bold uppercase">
                                      {difficulty}
                                    </Badge>
                                  </>
                                )}
                                {isReviewed && (
                                  <>
                                    <span>·</span>
                                    <span className="text-emerald-500 font-bold flex items-center gap-0.5 text-[9px]">
                                      ✓ Reviewed
                                    </span>
                                  </>
                                )}
                              </div>

                              {/* Question Title (Largest visual weight) */}
                              <h3 className="text-sm md:text-base font-bold text-foreground leading-snug">
                                {q.question}
                              </h3>
                            </div>

                            {/* Bookmark control (Subtle button on right) */}
                            <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                              <button
                                onClick={() => toggleBookmark(q.id)}
                                className={`p-2 rounded-lg border transition-all ${
                                  isBookmarked
                                    ? "bg-surface-tint/10 text-surface-tint border-surface-tint/30"
                                    : "text-on-surface-variant/40 border-outline-variant/20 hover:text-surface-tint hover:bg-surface-container"
                                }`}
                                title="Bookmark question"
                              >
                                <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? "fill-current" : ""}`} />
                              </button>
                            </div>
                          </div>

                          {/* 12. ANSWER VIEW (Expanded inline card) */}
                          <AnimatePresence initial={false}>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: "auto" }}
                                exit={{ height: 0 }}
                                className="overflow-hidden border-t border-outline-variant/15 bg-[#121313]/20"
                              >
                                <div className="p-5 md:p-6 space-y-4">
                                  <div className="space-y-1">
                                    <h4 className="text-[10px] font-bold text-surface-tint uppercase tracking-wider">
                                      Answer
                                    </h4>
                                    <FormattedAnswer text={q.answer} />
                                  </div>

                                  <div className="flex items-center justify-between gap-3 pt-3 border-t border-outline-variant/15">
                                    <Button
                                      variant="outline"
                                      onClick={() => startPracticeForQuestion(q.id)}
                                      className="border-[#ff5a36]/30 text-surface-tint hover:bg-[#ff5a36]/5 rounded-xl h-8 px-3 text-xs font-bold"
                                    >
                                      Practice This Question
                                    </Button>

                                    <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-on-surface-variant select-none">
                                      <input
                                        type="checkbox"
                                        checked={isReviewed}
                                        onChange={() => toggleReviewed(q.id)}
                                        className="rounded border-outline-variant/40 text-surface-tint focus:ring-surface-tint h-3.5 w-3.5 bg-surface-container"
                                      />
                                      <span>Mark Reviewed</span>
                                    </label>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  /* 17. EMPTY STATE */
                  <div className="bg-surface-container-lowest border border-outline-variant/35 rounded-3xl p-12 text-center space-y-3">
                    <BookOpen className="w-9 h-9 text-surface-tint/30 mx-auto" />
                    <h4 className="font-bold text-foreground text-sm">No questions found</h4>
                    <p className="text-xs text-on-surface-variant max-w-xs mx-auto leading-relaxed">
                      Try changing the topic, level, or filter criteria to discover questions.
                    </p>
                    <div className="pt-2">
                      <Button
                        variant="outline"
                        className="border-outline-variant/40 hover:bg-surface-container-high rounded-xl text-xs font-bold"
                        onClick={clearAllFilters}
                      >
                        Clear Filters
                      </Button>
                    </div>
                  </div>
                )}

                {/* 13. PAGINATION */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-1.5 pt-6">
                    <Button
                      variant="outline"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      className="h-8 px-2.5 rounded-lg border-outline-variant/40 hover:bg-surface-container-high text-xs font-semibold disabled:opacity-40"
                    >
                      Previous
                    </Button>

                    {getPageNumbers(currentPage, totalPages).map((num, idx) => {
                      if (num === "...") {
                        return (
                          <span key={`dots-${idx}`} className="px-1.5 text-xs text-on-surface-variant/50">
                            ...
                          </span>
                        );
                      }
                      return (
                        <button
                          key={`page-${num}`}
                          onClick={() => setCurrentPage(num)}
                          className={`w-8 h-8 rounded-lg text-xs font-bold border transition-all ${
                            currentPage === num
                              ? "bg-surface-tint border-surface-tint text-[#0f1010]"
                              : "border-outline-variant/30 text-on-surface-variant hover:text-foreground hover:border-outline-variant/70"
                          }`}
                        >
                          {num}
                        </button>
                      );
                    })}

                    <Button
                      variant="outline"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      className="h-8 px-2.5 rounded-lg border-outline-variant/40 hover:bg-surface-container-high text-xs font-semibold disabled:opacity-40"
                    >
                      Next
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* ════════════════════════════════════════════════
                14. PRACTICE MODE WORKSPACE
            ════════════════════════════════════════════════ */}
            {mode === "practice" && (
              <div className="space-y-6">
                
                {practiceQuestion ? (
                  <div className="space-y-6">
                    {/* Practice workspace card */}
                    <motion.div
                      key={practiceQuestion.id}
                      initial={{ opacity: 0, scale: 0.99 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-surface-container-lowest border border-outline-variant/40 rounded-3xl overflow-hidden shadow-sm"
                    >
                      {/* Top Control strip */}
                      <div className="bg-[#121313] border-b border-outline-variant/20 px-6 py-4 flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-surface-tint">
                          Question {practiceIndex + 1} of {filteredQuestions.length}
                        </span>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => toggleBookmark(practiceQuestion.id)}
                            className={`p-2 rounded-lg border transition-all ${
                              bookmarks.has(practiceQuestion.id)
                                ? "bg-surface-tint/10 text-surface-tint border-surface-tint/30"
                                : "text-on-surface-variant/50 border-outline-variant/20 hover:text-surface-tint hover:bg-surface-container"
                            }`}
                          >
                            <Bookmark className={`w-3.5 h-3.5 ${bookmarks.has(practiceQuestion.id) ? "fill-current" : ""}`} />
                          </button>

                          <button
                            onClick={() => toggleReviewed(practiceQuestion.id)}
                            className={`p-2 rounded-lg border transition-all ${
                              reviewed.has(practiceQuestion.id)
                                ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/30"
                                : "text-on-surface-variant/50 border-outline-variant/20 hover:text-emerald-500 hover:bg-surface-container"
                            }`}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="p-6 md:p-8 space-y-6">
                        <div className="space-y-2">
                          <Badge variant="outline" className="text-[10px] font-semibold tracking-wider text-on-surface-variant/80 uppercase">
                            {sections.find((s) => s.id === practiceQuestion.sectionId)?.name ?? ""}
                          </Badge>
                          <h2 className="text-lg md:text-xl font-bold leading-snug text-foreground">
                            {practiceQuestion.question}
                          </h2>
                        </div>

                        {/* Toggleable Answer Display */}
                        <div className="pt-4 border-t border-outline-variant/15">
                          {practiceAnswerRevealed ? (
                            <div className="space-y-4">
                              <h4 className="text-[10px] font-bold text-surface-tint uppercase tracking-wider">
                                Answer
                              </h4>
                              <FormattedAnswer text={practiceQuestion.answer} />

                              <div className="pt-2 flex items-center justify-between border-t border-outline-variant/15 pt-4">
                                <button
                                  onClick={() => toggleReviewed(practiceQuestion.id)}
                                  className={`flex items-center gap-2 text-xs px-3.5 py-2 rounded-xl font-bold border transition-all ${
                                    reviewed.has(practiceQuestion.id)
                                      ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/30"
                                      : "text-on-surface-variant border-outline-variant/30 hover:text-emerald-400"
                                  }`}
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>{reviewed.has(practiceQuestion.id) ? "Reviewed ✓" : "Mark Reviewed"}</span>
                                </button>
                                
                                <button
                                  onClick={() => setPracticeAnswerRevealed(false)}
                                  className="text-xs text-on-surface-variant/60 hover:text-foreground font-semibold"
                                >
                                  Hide Answer
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center py-12 space-y-4 border border-dashed border-outline-variant/35 rounded-2xl bg-[#111213]/40">
                              <p className="text-xs font-semibold text-foreground">Answer is hidden</p>
                              <Button
                                onClick={() => setPracticeAnswerRevealed(true)}
                                className="bg-surface-tint/10 text-surface-tint border border-surface-tint/30 hover:bg-surface-tint/20 rounded-xl px-6 h-9 text-xs font-bold"
                              >
                                Reveal Answer
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>

                    {/* Controller navigation */}
                    <div className="flex items-center justify-between gap-4">
                      <Button
                        variant="outline"
                        disabled={practiceIndex === 0}
                        onClick={() => {
                          setPracticeIndex((i) => i - 1);
                          setPracticeAnswerRevealed(false);
                        }}
                        className="border-outline-variant/40 hover:bg-surface-container-high rounded-xl h-10 px-4 text-xs font-bold text-foreground disabled:opacity-40"
                      >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Previous
                      </Button>

                      {practiceIndex < filteredQuestions.length - 1 ? (
                        <Button
                          variant="outline"
                          onClick={() => {
                            setPracticeIndex((i) => i + 1);
                            setPracticeAnswerRevealed(false);
                          }}
                          className="border-outline-variant/40 hover:bg-surface-container-high rounded-xl h-10 px-4 text-xs font-bold text-foreground"
                        >
                          <span>Next</span>
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      ) : (
                        <div className="text-right flex flex-col items-end gap-1">
                          <span className="text-[9px] text-on-surface-variant font-bold uppercase tracking-wider">
                            End of Section
                          </span>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => {
                                setPracticeIndex(0);
                                setPracticeAnswerRevealed(false);
                              }}
                              className="text-xs font-bold text-surface-tint hover:underline flex items-center gap-1"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                              Review Again
                            </button>
                            <span className="opacity-30">|</span>
                            <button
                              onClick={() => {
                                if (window.innerWidth < 768) {
                                  setMobileTopicsOpen(true);
                                } else {
                                  toast.info("Select another topic from the sidebar.");
                                }
                              }}
                              className="text-xs font-bold text-surface-tint hover:underline"
                            >
                              Another Topic
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="bg-surface-container-lowest border border-outline-variant/35 rounded-3xl p-12 text-center space-y-3.5">
                    <BookOpen className="w-9 h-9 text-surface-tint/30 mx-auto" />
                    <h4 className="font-bold text-foreground text-sm">No questions to practice</h4>
                    <p className="text-xs text-on-surface-variant max-w-xs mx-auto leading-relaxed">
                      No questions match your current filters in this topic. Adjust filters or return to browse.
                    </p>
                    <div className="pt-2 flex justify-center gap-3">
                      <Button
                        variant="outline"
                        className="border-outline-variant/40 hover:bg-surface-container-high rounded-xl text-xs font-bold"
                        onClick={clearAllFilters}
                      >
                        Reset All Filters
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => changeMode("browse")}
                        className="text-xs font-bold text-surface-tint"
                      >
                        Return to Browse
                      </Button>
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* ════════════════════════════════════════════════
                18. LEARNING RESOURCES & GAURAV SEN LINKS
            ════════════════════════════════════════════════ */}
            {activeSection && activeSection.videos.length > 0 && (
              <div className="pt-6 border-t border-outline-variant/20 space-y-3">
                <h4 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider flex items-center gap-2">
                  <Video className="w-4 h-4 text-surface-tint" />
                  Recommended Resources ({activeSection.name.split(" ")[0]})
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeSection.videos.map((vid, idx) => (
                    <a
                      key={idx}
                      href={vid.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-surface-container/30 border border-outline-variant/20 hover:border-surface-tint/35 hover:bg-surface-container text-xs font-semibold text-foreground group transition-all"
                    >
                      <span className="truncate group-hover:text-surface-tint transition-colors">{vid.name}</span>
                      <ExternalLink className="w-3 h-3 text-on-surface-variant group-hover:text-surface-tint transition-colors shrink-0 ml-2" />
                    </a>
                  ))}
                </div>
              </div>
            )}



          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
