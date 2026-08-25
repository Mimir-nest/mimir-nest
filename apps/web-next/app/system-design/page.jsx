"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  BookOpen,
  Search,
  Bookmark,
  CheckCircle,
  Shuffle,
  Eye,
  EyeOff,
  Video,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Sparkles,
  Award,
  Terminal,
  Layers,
  FileCode,
  Layout,
  ExternalLink,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { sections, questions } from "./data/questions";

// Inline markdown formatter helper
const FormattedText = ({ text }) => {
  if (!text) return null;
  const blocks = text.split(/\n\n+/);
  return (
    <div className="space-y-3 font-body-md text-sm md:text-base leading-relaxed text-on-surface-variant/90">
      {blocks.map((block, idx) => {
        const trimmed = block.trim();
        if (trimmed.startsWith("```")) {
          const lines = trimmed.split("\n");
          const codeLines = lines.slice(1, lines[lines.length - 1] === "```" ? -1 : undefined);
          return (
            <pre
              key={idx}
              className="bg-[#0b0c0c] p-4 rounded-xl border border-outline-variant/30 overflow-x-auto my-3 font-mono text-xs text-orange-400"
            >
              <code>{codeLines.join("\n")}</code>
            </pre>
          );
        }
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
          const items = trimmed.split("\n").map((line) => line.replace(/^[-*]\s+/, ""));
          return (
            <ul key={idx} className="list-disc pl-5 space-y-1.5 my-2">
              {items.map((item, itemIdx) => (
                <li key={itemIdx}>{parseInlineFormatting(item)}</li>
              ))}
            </ul>
          );
        }
        return <p key={idx}>{parseInlineFormatting(trimmed)}</p>;
      })}
    </div>
  );
};

const parseInlineFormatting = (text) => {
  const regex = /(\*\*.*?\*\*|`.*?`|\[.*?\]\(.*?\))/g;
  const parts = text.split(regex);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-bold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={i}
          className="bg-[#121313] px-1.5 py-0.5 rounded font-mono text-xs text-orange-400 border border-outline-variant/20"
        >
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
            className="text-surface-tint hover:underline font-semibold inline-flex items-center gap-0.5"
          >
            {match[1]}
            <ExternalLink className="w-3 h-3 inline-block" />
          </a>
        );
      }
    }
    return part;
  });
};

const getSectionIdFromHash = (hash) => {
  if (!hash) return null;
  const cleanHash = decodeURIComponent(hash.replace("#", "").toLowerCase());
  const numMatch = cleanHash.match(/^(\d+)/);
  if (numMatch) {
    const id = parseInt(numMatch[1], 10);
    if (id >= 1 && id <= 24) return id;
  }
  const found = sections.find(
    (s) =>
      s.name.toLowerCase().replace(/[^a-z0-9]/g, "-").includes(cleanHash) ||
      cleanHash.includes(s.name.toLowerCase().replace(/[^a-z0-9]/g, "-"))
  );
  return found ? found.id : null;
};

export default function SystemDesignPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSectionId, setActiveSectionId] = useState(null);
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  const [interviewMode, setInterviewMode] = useState(false);
  
  const [reviewed, setReviewed] = useState(new Set());
  const [bookmarks, setBookmarks] = useState(new Set());
  const [expanded, setExpanded] = useState(new Set());
  const [revealedAnswers, setRevealedAnswers] = useState(new Set());
  const [visibleCount, setVisibleCount] = useState(25);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mainContentRef = useRef(null);

  // Sync state from localStorage on mount
  useEffect(() => {
    const savedReviewed = localStorage.getItem("system-design-reviewed");
    const savedBookmarks = localStorage.getItem("system-design-bookmarks");
    const savedInterviewMode = localStorage.getItem("system-design-interview-mode");
    if (savedReviewed) {
      try {
        setReviewed(new Set(JSON.parse(savedReviewed)));
      } catch (e) {
        console.error(e);
      }
    }
    if (savedBookmarks) {
      try {
        setBookmarks(new Set(JSON.parse(savedBookmarks)));
      } catch (e) {
        console.error(e);
      }
    }
    if (savedInterviewMode) {
      setInterviewMode(savedInterviewMode === "true");
    }
  }, []);

  // Listen for hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const sectionId = getSectionIdFromHash(hash);
      setActiveSectionId(sectionId);
      setVisibleCount(25);
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const toggleReviewed = (id) => {
    setReviewed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      localStorage.setItem("system-design-reviewed", JSON.stringify(Array.from(next)));
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
      localStorage.setItem("system-design-bookmarks", JSON.stringify(Array.from(next)));
      return next;
    });
  };

  const toggleCard = (id) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleRevealAnswer = (id) => {
    setRevealedAnswers((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const selectSection = (id) => {
    if (id === null) {
      window.location.hash = "";
      setActiveSectionId(null);
    } else {
      const section = sections.find((s) => s.id === id);
      if (section) {
        const slug = section.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        window.location.hash = `${id}-${slug}`;
      }
    }
    setVisibleCount(25);
    setMobileMenuOpen(false);
  };

  const resetProgress = () => {
    if (window.confirm("Are you sure you want to reset all your progress and bookmarks?")) {
      setReviewed(new Set());
      setBookmarks(new Set());
      setRevealedAnswers(new Set());
      localStorage.removeItem("system-design-reviewed");
      localStorage.removeItem("system-design-bookmarks");
      toast.success("Progress reset successfully!");
    }
  };

  const handleRandomQuestion = () => {
    if (filteredQuestions.length === 0) {
      toast.error("No questions in the active filter list to select from.");
      return;
    }
    const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
    const randomQuestion = filteredQuestions[randomIndex];

    setExpanded((prev) => {
      const next = new Set(prev);
      next.add(randomQuestion.id);
      return next;
    });

    if (interviewMode) {
      setRevealedAnswers((prev) => {
        const next = new Set(prev);
        next.delete(randomQuestion.id); // hide answer initially for the random pick
        return next;
      });
    }

    setTimeout(() => {
      const element = document.getElementById(`question-${randomQuestion.id}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.classList.add("ring-2", "ring-surface-tint");
        setTimeout(() => {
          element.classList.remove("ring-2", "ring-surface-tint");
        }, 2000);
      }
    }, 150);

    toast.success(`Shuffle picked Question #${randomQuestion.number}`);
  };

  // Filtered dataset mapping
  const filteredQuestions = questions.filter((q) => {
    if (activeSectionId !== null && q.sectionId !== activeSectionId) {
      return false;
    }
    if (showBookmarksOnly && !bookmarks.has(q.id)) {
      return false;
    }
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      const qText = q.question.toLowerCase();
      const aText = q.answer.toLowerCase();
      const sName = sections.find((s) => s.id === q.sectionId)?.name.toLowerCase() || "";

      if (!qText.includes(query) && !aText.includes(query) && !sName.includes(query)) {
        return false;
      }
    }
    return true;
  });

  const activeSection = sections.find((s) => s.id === activeSectionId);
  const visibleQuestions = filteredQuestions.slice(0, visibleCount);

  // Progress metrics calculation
  const overallReviewed = reviewed.size;
  const overallTotal = questions.length;
  const overallPercent = overallTotal > 0 ? Math.round((overallReviewed / overallTotal) * 100) : 0;

  const getSectionProgress = (sectionId) => {
    const sectionQuestions = questions.filter((q) => q.sectionId === sectionId);
    const sectionReviewed = sectionQuestions.filter((q) => reviewed.has(q.id)).length;
    return {
      reviewed: sectionReviewed,
      total: sectionQuestions.length,
      percent:
        sectionQuestions.length > 0
          ? Math.round((sectionReviewed / sectionQuestions.length) * 100)
          : 0,
    };
  };

  const handleStartLearning = () => {
    mainContentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-mn-background text-on-background selection:bg-surface-tint/30">
      <Navbar />

      {/* ── HERO SECTION ── */}
      <section className="relative bg-surface-container pt-[120px] md:pt-[150px] pb-16 md:pb-24 px-6 md:px-16 overflow-hidden rounded-b-3xl border-b border-outline-variant/40">
        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full border border-surface-tint/5 translate-x-1/4 -translate-y-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full border border-surface-tint/5 -translate-x-1/3 translate-y-1/3 pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-high border border-outline-variant/60 text-xs font-semibold text-surface-tint tracking-wider uppercase mx-auto"
          >
            <Sparkles className="w-4.5 h-4.5 text-surface-tint" />
            <span>Mimir Nest Learning Suite</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display-lg text-display-lg-mobile md:text-headline-lg lg:text-display-lg text-foreground font-bold tracking-tight leading-tight"
          >
            500+ System Design <br className="hidden sm:inline" />
            <span className="text-surface-tint">Interview Questions & Answers</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-body-lg text-body-md md:text-body-lg text-on-surface-variant max-w-3xl mx-auto leading-relaxed"
          >
            A structured system design preparation guide covering fundamentals, distributed systems,
            databases, scalability, networking, architecture, HLD, LLD, and advanced interview topics.
          </motion.p>

          {/* Stat Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-6"
          >
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-4 flex flex-col items-center">
              <span className="text-2xl font-bold text-surface-tint">502+</span>
              <span className="text-xs text-on-surface-variant/80 mt-1">Questions</span>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-4 flex flex-col items-center">
              <span className="text-2xl font-bold text-surface-tint">24</span>
              <span className="text-xs text-on-surface-variant/80 mt-1">Sections</span>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-4 flex flex-col items-center">
              <span className="text-xl font-bold text-foreground">Basic → Adv</span>
              <span className="text-xs text-on-surface-variant/80 mt-1">Difficulty</span>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-4 flex flex-col items-center">
              <span className="text-xl font-bold text-foreground">100% Ready</span>
              <span className="text-xs text-on-surface-variant/80 mt-1">Interview Prep</span>
            </div>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            <Button
              className="bg-primary text-primary-foreground hover:opacity-90 rounded-xl px-8 h-12 font-bold transition-all shadow-md"
              onClick={handleStartLearning}
            >
              Start Learning
            </Button>
            <Button
              variant="outline"
              className="border-outline border-outline-variant/60 hover:bg-surface-container-high rounded-xl px-8 h-12 font-semibold text-foreground"
              onClick={() => {
                setActiveSectionId(null);
                window.location.hash = "all-topics";
                handleStartLearning();
              }}
            >
              Browse Topics
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── WORKSPACE CONTENT ── */}
      <main ref={mainContentRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Progress Callout */}
        <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-3xl p-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1.5 flex-1">
            <h3 className="font-headline-md text-base md:text-lg font-bold text-foreground flex items-center gap-2">
              <Award className="w-5 h-5 text-surface-tint" />
              Your Interview Prep Progress
            </h3>
            <p className="text-xs text-on-surface-variant">
              Complete sections to test your design fundamentals. Progress persists locally.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <Progress value={overallPercent} className="h-2 bg-surface-container flex-1 rounded-full [&>div]:bg-surface-tint" />
              <span className="text-sm font-bold text-surface-tint shrink-0">{overallPercent}%</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3 shrink-0 items-center justify-end">
            <div className="px-4 py-2 bg-surface-container rounded-2xl border border-outline-variant/30 text-xs font-semibold text-foreground">
              Reviewed: <span className="text-surface-tint text-sm font-bold">{overallReviewed}</span> / {overallTotal}
            </div>
            <div className="px-4 py-2 bg-surface-container rounded-2xl border border-outline-variant/30 text-xs font-semibold text-foreground">
              Bookmarked: <span className="text-surface-tint text-sm font-bold">{bookmarks.size}</span> questions
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-on-surface-variant hover:text-rose-500 hover:bg-rose-500/10 rounded-xl h-9 w-9"
              title="Reset progress"
              onClick={resetProgress}
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Dynamic Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ── TOPIC SIDEBAR (Desktop) ── */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-[80px] h-[calc(100vh-120px)] overflow-y-auto pr-2 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-outline-variant/30">
              <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                Topics ({sections.length})
              </h4>
              <button
                className={`text-xs font-semibold hover:text-surface-tint transition-colors ${
                  activeSectionId === null ? "text-surface-tint" : "text-on-surface-variant"
                }`}
                onClick={() => selectSection(null)}
              >
                Clear Filters
              </button>
            </div>

            <div className="space-y-1.5">
              {/* All questions button */}
              <button
                className={`w-full text-left p-3.5 rounded-2xl border transition-all flex justify-between items-center ${
                  activeSectionId === null
                    ? "bg-[#1f1a18] border-surface-tint text-surface-tint font-bold shadow-sm"
                    : "bg-surface-container border-outline-variant/20 text-foreground hover:bg-surface-container-high hover:border-outline-variant/40"
                }`}
                onClick={() => selectSection(null)}
              >
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 shrink-0" />
                  <span className="text-sm truncate max-w-[200px]">All Topics</span>
                </div>
                <Badge variant="outline" className="text-xs border-outline-variant/60 font-semibold bg-surface-container-lowest">
                  {questions.length}
                </Badge>
              </button>

              {/* Individual Section Buttons */}
              {sections.map((sec) => {
                const isActive = activeSectionId === sec.id;
                const prog = getSectionProgress(sec.id);
                return (
                  <button
                    key={sec.id}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all ${
                      isActive
                        ? "bg-[#1f1a18] border-surface-tint text-surface-tint font-bold shadow-sm"
                        : "bg-surface-container border-outline-variant/20 text-foreground hover:bg-surface-container-high hover:border-outline-variant/40"
                    }`}
                    onClick={() => selectSection(sec.id)}
                  >
                    <div className="flex justify-between items-start gap-2 mb-1.5">
                      <span className="text-sm line-clamp-2 leading-tight">
                        {sec.id}. {sec.name}
                      </span>
                      <Badge variant="outline" className="text-xs shrink-0 border-outline-variant/60 bg-surface-container-lowest font-medium">
                        {sec.questionsCount}
                      </Badge>
                    </div>

                    {/* Progress bar per topic */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="h-1 bg-surface-container-lowest rounded-full flex-1 overflow-hidden">
                        <div
                          className="h-full bg-surface-tint transition-all duration-300"
                          style={{ width: `${prog.percent}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-on-surface-variant font-medium shrink-0">
                        {prog.reviewed}/{prog.total}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* ── MAIN WORKSPACE CONTENT ── */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Top Toolbar: Search + Controls */}
            <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-3xl p-5 md:p-6 space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant w-4.5 h-4.5" />
                  <Input
                    placeholder="Search system design questions, topics, or answers..."
                    className="pl-10 h-11 border-outline-variant/40 bg-surface-container rounded-2xl text-foreground text-sm font-medium focus-visible:ring-2 focus-visible:ring-surface-tint"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setVisibleCount(25);
                    }}
                  />
                </div>
                
                <div className="flex gap-2">
                  {/* Shuffle Question */}
                  <Button
                    variant="outline"
                    className="border-outline-variant/40 hover:bg-surface-container-high rounded-2xl h-11 px-4 text-sm font-semibold flex items-center gap-2 text-foreground w-full sm:w-auto"
                    onClick={handleRandomQuestion}
                  >
                    <Shuffle className="w-4 h-4 text-surface-tint" />
                    <span>Shuffle</span>
                  </Button>
                </div>
              </div>

              {/* Toggles & Options */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-outline-variant/20 text-sm">
                <div className="flex flex-wrap items-center gap-6">
                  {/* Bookmarks only Toggle */}
                  <label className="flex items-center gap-2.5 cursor-pointer font-medium text-foreground select-none">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={showBookmarksOnly}
                      onChange={(e) => {
                        setShowBookmarksOnly(e.target.checked);
                        setVisibleCount(25);
                      }}
                    />
                    <div className="w-9 h-5 bg-surface-container peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-on-surface-variant after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-surface-tint/90 peer-checked:after:bg-on-primary relative transition-colors"></div>
                    <span className="flex items-center gap-1">
                      <Bookmark className="w-3.5 h-3.5 text-surface-tint" />
                      Bookmarks only
                    </span>
                  </label>

                  {/* Interview Mode Toggle */}
                  <label className="flex items-center gap-2.5 cursor-pointer font-medium text-foreground select-none">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={interviewMode}
                      onChange={(e) => {
                        setInterviewMode(e.target.checked);
                        localStorage.setItem("system-design-interview-mode", e.target.checked.toString());
                      }}
                    />
                    <div className="w-9 h-5 bg-surface-container peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-on-surface-variant after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-surface-tint/90 peer-checked:after:bg-on-primary relative transition-colors"></div>
                    <span className="flex items-center gap-1">
                      <Terminal className="w-3.5 h-3.5 text-surface-tint" />
                      Interview Mode
                    </span>
                  </label>
                </div>

                <div className="text-xs text-on-surface-variant font-medium">
                  Showing <span className="text-foreground font-semibold">{filteredQuestions.length}</span> questions
                </div>
              </div>
            </div>

            {/* Mobile Topic Navigation (Horizontal Swiper/Dropdown) */}
            <div className="lg:hidden bg-surface-container-lowest border border-outline-variant/40 rounded-3xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                  Filter by Topic
                </span>
                <Button
                  variant="ghost"
                  className="text-xs font-bold text-surface-tint h-7 p-0"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? "Hide Topics" : "Change Topic"}
                </Button>
              </div>

              {/* Selected Topic Badge */}
              <div
                className="p-3 bg-surface-container rounded-2xl border border-outline-variant/30 text-sm font-semibold flex items-center justify-between cursor-pointer"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="truncate">
                  {activeSectionId ? `${activeSectionId}. ${activeSection.name}` : "All Topics"}
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileMenuOpen ? "rotate-180" : ""}`} />
              </div>

              {/* Collapsible Mobile Topics List */}
              <AnimatePresence>
                {mobileMenuOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden space-y-1.5 pt-2"
                  >
                    <button
                      className={`w-full text-left p-3 rounded-xl border text-sm flex justify-between items-center ${
                        activeSectionId === null
                          ? "bg-[#1f1a18] border-surface-tint text-surface-tint font-bold"
                          : "bg-surface-container border-outline-variant/20 text-foreground"
                      }`}
                      onClick={() => selectSection(null)}
                    >
                      <span>All Topics</span>
                      <Badge variant="outline" className="text-xs border-outline-variant/60 font-semibold bg-surface-container-lowest">
                        {questions.length}
                      </Badge>
                    </button>

                    <div className="max-h-[300px] overflow-y-auto space-y-1">
                      {sections.map((sec) => {
                        const isActive = activeSectionId === sec.id;
                        return (
                          <button
                            key={sec.id}
                            className={`w-full text-left p-3 rounded-xl border text-sm flex justify-between items-center ${
                              isActive
                                ? "bg-[#1f1a18] border-surface-tint text-surface-tint font-bold"
                                : "bg-surface-container border-outline-variant/20 text-foreground"
                            }`}
                            onClick={() => selectSection(sec.id)}
                          >
                            <span className="truncate pr-4">
                              {sec.id}. {sec.name}
                            </span>
                            <Badge variant="outline" className="text-xs border-outline-variant/60 font-semibold bg-surface-container-lowest">
                              {sec.questionsCount}
                            </Badge>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── RECOMMENDED RESOURCES CARD ── */}
            {activeSection && activeSection.videos.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-[#191513] to-surface-container-lowest border border-[#ff5a36]/20 rounded-3xl p-5 md:p-6"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Video className="w-5 h-5 text-surface-tint" />
                  <h4 className="font-bold text-foreground text-base">
                    Recommended Resources ({activeSection.name})
                  </h4>
                </div>
                <p className="text-xs text-on-surface-variant mb-4 leading-relaxed">
                  These verified channels/playlists provide excellent video walk-throughs for topics in this section:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeSection.videos.map((vid, vIdx) => (
                    <a
                      key={vIdx}
                      href={vid.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-xl bg-surface-container/60 hover:bg-surface-container border border-outline-variant/20 hover:border-[#ff5a36]/30 transition-all text-xs font-semibold text-foreground group"
                    >
                      <span className="truncate group-hover:text-surface-tint transition-colors">{vid.name}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-on-surface-variant group-hover:text-surface-tint transition-colors shrink-0" />
                    </a>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── QUESTIONS LIST ── */}
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {visibleQuestions.map((q) => {
                  const isExpanded = expanded.has(q.id);
                  const isBookmarked = bookmarks.has(q.id);
                  const isReviewed = reviewed.has(q.id);
                  const isAnswerRevealed = revealedAnswers.has(q.id);

                  // Formatting question indices
                  const numStr = q.number < 10 ? `0${q.number}` : `${q.number}`;
                  const secName = sections.find((s) => s.id === q.sectionId)?.name || "";

                  // Custom Styling for specific sections (HLD case studies or LLD OOP design)
                  const isHLD = q.sectionId === 20;
                  const isLLD = q.sectionId === 21;

                  let cardBorderClass = "border-outline-variant/30";
                  let cardHeaderBg = "";
                  
                  if (isHLD) {
                    cardBorderClass = "border-[#d88732]/30 hover:border-[#d88732]/50";
                    cardHeaderBg = "bg-[#181410]/40";
                  } else if (isLLD) {
                    cardBorderClass = "border-[#4b7a9f]/30 hover:border-[#4b7a9f]/50";
                    cardHeaderBg = "bg-[#11161a]/40";
                  }

                  return (
                    <motion.div
                      key={q.id}
                      id={`question-${q.id}`}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      className={`bg-surface-container-lowest rounded-3xl border ${cardBorderClass} overflow-hidden shadow-sm hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)] transition-shadow duration-300`}
                    >
                      {/* Card Header Area */}
                      <div
                        className={`p-5 md:p-6 cursor-pointer select-none transition-colors ${cardHeaderBg} hover:bg-surface-container/30`}
                        onClick={() => toggleCard(q.id)}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-2 flex-1">
                            
                            {/* Meta row */}
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-mono text-xs font-bold text-surface-tint">
                                #{numStr}
                              </span>
                              
                              <Badge
                                variant="outline"
                                className={`text-[10px] py-0.5 px-2 font-medium bg-surface-container-lowest ${
                                  isHLD
                                    ? "text-[#d88732] border-[#d88732]/30"
                                    : isLLD
                                    ? "text-[#4b7a9f] border-[#4b7a9f]/30"
                                    : "text-on-surface-variant/80 border-outline-variant/60"
                                }`}
                              >
                                {isHLD ? "High-Level Design" : isLLD ? "Low-Level Design" : secName}
                              </Badge>

                              {isReviewed && (
                                <Badge className="bg-emerald-500/10 hover:bg-emerald-500/15 text-emerald-500 border border-emerald-500/20 text-[10px] py-0.5 px-2 flex items-center gap-0.5">
                                  <CheckCircle className="w-2.5 h-2.5" />
                                  Reviewed
                                </Badge>
                              )}
                            </div>

                            {/* Question Title */}
                            <h3 className="font-headline-md text-base md:text-lg font-bold text-foreground leading-snug">
                              {q.question}
                            </h3>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0 pt-0.5" onClick={(e) => e.stopPropagation()}>
                            {/* Bookmark Toggle */}
                            <button
                              className={`p-2 rounded-xl transition-all border ${
                                isBookmarked
                                  ? "bg-[#ff5a36]/10 text-surface-tint border-[#ff5a36]/30"
                                  : "text-on-surface-variant hover:text-foreground border-outline-variant/20 hover:bg-surface-container"
                              }`}
                              onClick={() => toggleBookmark(q.id)}
                              aria-label="Bookmark question"
                            >
                              <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
                            </button>

                            {/* Mark reviewed toggle */}
                            <button
                              className={`p-2 rounded-xl transition-all border ${
                                isReviewed
                                  ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/30"
                                  : "text-on-surface-variant hover:text-foreground border-outline-variant/20 hover:bg-surface-container"
                              }`}
                              onClick={() => toggleReviewed(q.id)}
                              aria-label="Mark as reviewed"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>

                            {/* Expand toggle icon */}
                            <button
                              className="p-2 rounded-xl border border-outline-variant/20 text-on-surface-variant hover:text-foreground hover:bg-surface-container"
                              onClick={() => toggleCard(q.id)}
                              aria-label="Toggle answer details"
                            >
                              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Card Expandable Content */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "auto" }}
                            exit={{ height: 0 }}
                            className="overflow-hidden border-t border-outline-variant/20"
                          >
                            <div className="p-6 md:p-8 bg-surface-container/20 space-y-4">
                              
                              {/* Custom practice alert style for Section 20 HLD */}
                              {isHLD && (
                                <div className="p-4 rounded-2xl bg-[#1c1813] border border-[#d88732]/25 text-xs text-[#d88732] flex items-start gap-2.5 leading-relaxed mb-4">
                                  <Layout className="w-4.5 h-4.5 shrink-0 mt-0.5" />
                                  <div>
                                    <strong className="font-bold block mb-0.5">📐 System Design Practice Outline</strong>
                                    These answers are intentionally brief conceptual frameworks. In a real interview, construct your own diagram, estimate capacities, and dive deep into bottlenecks.
                                  </div>
                                </div>
                              )}

                              {/* Custom developer-themed style for Section 21 LLD */}
                              {isLLD && (
                                <div className="p-4 rounded-2xl bg-[#11161a] border border-[#4b7a9f]/25 text-xs text-[#4b7a9f] flex items-start gap-2.5 leading-relaxed mb-4">
                                  <FileCode className="w-4.5 h-4.5 shrink-0 mt-0.5" />
                                  <div>
                                    <strong className="font-bold block mb-0.5">💻 Low-Level Class Design</strong>
                                    Apply class structure, interfaces, SOLID patterns, and design patterns. Translate the outline below into concrete entity schemas in your programming language.
                                  </div>
                                </div>
                              )}

                              {/* Interview Mode: Hide Answer initially */}
                              {interviewMode && !isAnswerRevealed ? (
                                <div className="flex flex-col items-center justify-center p-8 rounded-2xl border border-dashed border-outline-variant/40 bg-surface-container-low text-center space-y-4">
                                  <Eye className="w-8 h-8 text-surface-tint/60 animate-pulse" />
                                  <div className="space-y-1">
                                    <p className="text-sm font-semibold text-foreground">Answer Hidden in Interview Mode</p>
                                    <p className="text-xs text-on-surface-variant max-w-[280px]">
                                      Try to formulate the design steps or core tradeoffs in your mind before checking.
                                    </p>
                                  </div>
                                  <Button
                                    className="bg-surface-tint/20 text-surface-tint border border-surface-tint/30 hover:bg-surface-tint/30 rounded-xl px-5 h-9 text-xs font-semibold"
                                    onClick={() => toggleRevealAnswer(q.id)}
                                  >
                                    Reveal Answer
                                  </Button>
                                </div>
                              ) : (
                                <div className="space-y-4">
                                  {/* Answer Body */}
                                  <div className={isLLD ? "font-mono" : ""}>
                                    <FormattedText text={q.answer} />
                                  </div>

                                  {/* Action block inside expanded card */}
                                  <div className="flex justify-between items-center pt-4 border-t border-outline-variant/20">
                                    {interviewMode && (
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-xs text-on-surface-variant hover:text-foreground h-8 flex items-center gap-1.5"
                                        onClick={() => toggleRevealAnswer(q.id)}
                                      >
                                        <EyeOff className="w-3.5 h-3.5" />
                                        Hide Answer
                                      </Button>
                                    )}
                                    
                                    <div className="flex items-center gap-3 ml-auto">
                                      <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-on-surface-variant select-none">
                                        <input
                                          type="checkbox"
                                          checked={isReviewed}
                                          onChange={() => toggleReviewed(q.id)}
                                          className="rounded border-outline-variant/40 text-surface-tint focus:ring-surface-tint h-3.5 w-3.5 bg-surface-container"
                                        />
                                        <span>Mark as reviewed</span>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              )}

                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Empty state when filters return nothing */}
            {filteredQuestions.length === 0 && (
              <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-3xl p-12 text-center space-y-4 max-w-lg mx-auto my-6">
                <BookOpen className="w-12 h-12 text-surface-tint/40 mx-auto" />
                <h4 className="font-headline-md text-base font-bold text-foreground">
                  No Questions Found
                </h4>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  No questions match your current search query "{searchQuery}" or selected filters. Try
                  adjusting keywords or selecting another topic.
                </p>
                <div className="pt-2">
                  <Button
                    variant="outline"
                    className="border-outline-variant/40 hover:bg-surface-container-high rounded-xl text-xs font-semibold"
                    onClick={() => {
                      setSearchQuery("");
                      setShowBookmarksOnly(false);
                      setActiveSectionId(null);
                      window.location.hash = "";
                    }}
                  >
                    Reset All Filters
                  </Button>
                </div>
              </div>
            )}

            {/* Load More Button */}
            {filteredQuestions.length > visibleQuestions.length && (
              <div className="flex justify-center pt-4">
                <Button
                  className="bg-surface-container-high hover:bg-surface-container-highest border border-outline-variant/40 text-foreground font-semibold rounded-2xl px-8 h-12 text-sm shadow-sm"
                  onClick={() => setVisibleCount((prev) => prev + 25)}
                >
                  Load More Questions
                </Button>
              </div>
            )}

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
