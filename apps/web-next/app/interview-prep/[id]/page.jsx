"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  ArrowLeft,
  Building2,
  Clock,
  Sparkles,
  Tag,
  Bookmark,
  CheckCircle2,
  Circle,
  Copy,
  Check,
  ChevronDown,
  ChevronRight,
  ShieldAlert,
  AlertCircle,
  BookOpen,
  Target,
  Lightbulb,
  AlertTriangle,
  HelpCircle,
} from "lucide-react";
import CompanyLogo from "@/components/common/CompanyLogo";

const difficultyColors = {
  Easy: {
    bg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    dot: "bg-emerald-400",
  },
  Medium: {
    bg: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    dot: "bg-amber-400",
  },
  Hard: {
    bg: "bg-[#FF5A36]/10 text-[#FF5A36] border-[#FF5A36]/20",
    dot: "bg-[#FF5A36]",
  },
  Expert: {
    bg: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    dot: "bg-purple-400",
  },
};

export default function QuestionDetailPage() {
  const params = useParams();
  const questionId = params?.id;

  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isPracticed, setIsPracticed] = useState(false);

  // Accordion state
  const [openSections, setOpenSections] = useState({
    shortAnswer: true,
    detailedAnswer: true,
    strongSignals: false,
    commonMistakes: false,
    followUps: false,
  });

  const toggleSection = (sec) => {
    setOpenSections((prev) => ({ ...prev, [sec]: !prev[sec] }));
  };

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

    try {
      const savedBookmarks = JSON.parse(localStorage.getItem("mimir_prep_bookmarks") || "[]");
      const savedPracticed = JSON.parse(localStorage.getItem("mimir_prep_practiced") || "[]");
      setIsBookmarked(savedBookmarks.includes(questionId));
      setIsPracticed(savedPracticed.includes(questionId));
    } catch (e) {
      // ignore
    }

    return () => {
      isMounted = false;
    };
  }, [questionId]);

  const handleCopy = () => {
    if (!question) return;
    const shareText = `${question.question}\n\n[MimirNest Practice Question #${question.question_id} - ${question.company} · ${question.category}]`;
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    toast.success("Question copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleBookmark = () => {
    try {
      const saved = JSON.parse(localStorage.getItem("mimir_prep_bookmarks") || "[]");
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
      // ignore
    }
  };

  const togglePracticed = () => {
    try {
      const saved = JSON.parse(localStorage.getItem("mimir_prep_practiced") || "[]");
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
      // ignore
    }
  };

  const diffStyle = difficultyColors[question?.difficulty] || difficultyColors.Medium;

  return (
    <div className="min-h-screen bg-[#0F1010] text-[#F4F1EA] selection:bg-[#FF5A36]/30 selection:text-[#F4F1EA]">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        {/* Navigation Breadcrumbs */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <Link
            href="/interview-prep"
            className="inline-flex items-center gap-2 text-sm text-[#9B9992] hover:text-[#FF5A36] transition-colors py-1.5 px-3 rounded-lg bg-[#151616] border border-[#242525] hover:border-[#FF5A36]/40"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Question Bank</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleBookmark}
              className={`p-2 rounded-lg border transition-all ${
                isBookmarked
                  ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                  : "bg-[#151616] border-[#242525] text-[#9B9992] hover:text-[#F4F1EA]"
              }`}
              title={isBookmarked ? "Bookmarked" : "Bookmark this question"}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-amber-400" : ""}`} />
            </button>
            <button
              onClick={togglePracticed}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                isPracticed
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                  : "bg-[#151616] border-[#242525] text-[#9B9992] hover:text-[#F4F1EA]"
              }`}
            >
              {isPracticed ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Practiced</span>
                </>
              ) : (
                <>
                  <Circle className="w-4 h-4" />
                  <span>Mark as Practiced</span>
                </>
              )}
            </button>
            <button
              onClick={handleCopy}
              className="p-2 rounded-lg border bg-[#151616] border-[#242525] text-[#9B9992] hover:text-[#F4F1EA] transition-colors"
              title="Copy Question"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="p-12 text-center rounded-2xl bg-[#151616] border border-[#242525]">
            <div className="w-8 h-8 border-2 border-[#FF5A36] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-[#9B9992] text-sm">Loading interview question details...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="p-8 text-center rounded-2xl bg-rose-500/5 border border-rose-500/20 text-rose-300">
            <AlertCircle className="w-8 h-8 text-rose-400 mx-auto mb-3" />
            <h2 className="text-lg font-semibold text-rose-200 mb-1">Question Not Found</h2>
            <p className="text-sm text-[#9B9992] mb-4">{error}</p>
            <Link
              href="/interview-prep"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FF5A36] hover:bg-[#ff451d] text-white text-sm font-medium transition-colors"
            >
              Return to Question Bank
            </Link>
          </div>
        )}

        {/* Main Content */}
        {question && !loading && (
          <div className="space-y-6">
            {/* Header Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#151616] border border-[#242525] shadow-xl">
              {/* Meta Badges */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
                <span className="font-mono text-xs text-[#FF5A36] font-semibold px-2.5 py-1 rounded-md bg-[#FF5A36]/10 border border-[#FF5A36]/25">
                  {question.question_id}
                </span>

                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-semibold ${diffStyle.bg}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${diffStyle.dot}`} />
                  {question.difficulty}
                </span>

                <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md border text-xs font-medium bg-[#1E2020] border-[#242525] text-[#F4F1EA]">
                  <CompanyLogo company={question.company} className="w-4 h-4" />
                  <span>{question.company}</span>
                </span>

                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border text-xs font-medium bg-[#1E2020] border-[#242525] text-[#9B9992]">
                  <Tag className="w-3 h-3 text-[#9B9992]" />
                  {question.category}
                </span>

                <span className="inline-flex items-center gap-1.5 text-xs text-[#9B9992] px-2.5 py-1 rounded-md bg-[#1E2020] border border-[#242525]">
                  <Clock className="w-3.5 h-3.5 text-[#9B9992]" />
                  {question.expected_time || "5-15 min"}
                </span>
              </div>

              {/* Question Text */}
              <h1 className="text-xl sm:text-2xl font-bold text-[#F4F1EA] leading-snug mb-4">
                {question.question}
              </h1>

              {/* Contextual Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-[#242525] text-xs text-[#9B9992]">
                <div>
                  <span className="text-[#9B9992]/70 block mb-0.5">Industry Domain</span>
                  <span className="text-[#F4F1EA] font-medium">{question.industry || question.company_industry}</span>
                </div>
                <div>
                  <span className="text-[#9B9992]/70 block mb-0.5">Target Role Scope</span>
                  <span className="text-[#F4F1EA] font-medium">{question.role}</span>
                </div>
              </div>

              {/* Skills and Tags */}
              {(question.skills || question.tags) && (
                <div className="mt-4 pt-4 border-t border-[#242525] flex flex-wrap gap-1.5 items-center">
                  <span className="text-xs text-[#9B9992] mr-2">Tags:</span>
                  {(question.skills || question.tags || "")
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean)
                    .map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] px-2 py-0.5 rounded bg-[#1E2020] text-[#9B9992] border border-[#242525]"
                      >
                        #{t}
                      </span>
                    ))}
                </div>
              )}
            </div>

            {/* Expandable Sections */}
            <div className="space-y-3.5">
              {/* 1. Short Answer */}
              <AccordionSection
                id="shortAnswer"
                title="Short Answer (Executive Summary)"
                icon={<Lightbulb className="w-4 h-4 text-amber-400" />}
                isOpen={openSections.shortAnswer}
                onToggle={() => toggleSection("shortAnswer")}
                content={question.short_answer}
              />

              {/* 2. Detailed Answer */}
              <AccordionSection
                id="detailedAnswer"
                title="Detailed Answer & Structured Walkthrough"
                icon={<BookOpen className="w-4 h-4 text-[#FF8C68]" />}
                isOpen={openSections.detailedAnswer}
                onToggle={() => toggleSection("detailedAnswer")}
                content={question.detailed_answer}
              />

              {/* 3. Strong Answer Signals */}
              <AccordionSection
                id="strongSignals"
                title="Strong Answer Signals"
                icon={<Target className="w-4 h-4 text-emerald-400" />}
                isOpen={openSections.strongSignals}
                onToggle={() => toggleSection("strongSignals")}
                content={question.strong_answer_signals}
              />

              {/* 4. Common Mistakes */}
              <AccordionSection
                id="commonMistakes"
                title="Common Mistakes to Avoid"
                icon={<AlertTriangle className="w-4 h-4 text-rose-400" />}
                isOpen={openSections.commonMistakes}
                onToggle={() => toggleSection("commonMistakes")}
                content={question.common_mistakes}
              />

              {/* 5. Follow-ups */}
              <AccordionSection
                id="followUps"
                title="Likely Follow-up Questions"
                icon={<HelpCircle className="w-4 h-4 text-purple-400" />}
                isOpen={openSections.followUps}
                onToggle={() => toggleSection("followUps")}
                content={question.follow_ups}
              />

            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

// ── Helpers ─────────────────────────────────────────────────────────────────

/** Parse a field that may be a plain string or a JSON-encoded array */
function parseField(content) {
  if (!content) return null;
  if (Array.isArray(content)) return content;
  const trimmed = typeof content === "string" ? content.trim() : "";
  if (!trimmed) return null;
  // Try to parse as JSON array
  if (trimmed.startsWith("[")) {
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) return parsed;
    } catch (_) {
      // fall through to plain string
    }
  }
  return trimmed;
}

/**
 * Render a single line of text with **bold** markers converted to <strong>.
 * Also supports lines starting with "- " as bullet items.
 */
function RichLine({ text }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <span>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i} className="text-[#F4F1EA] font-semibold">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
}

/** Render a plain string field with markdown-like formatting */
function RichText({ text }) {
  const lines = text.split("\n");
  const elements = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Blank line
    if (!line.trim()) {
      i++;
      continue;
    }

    // Heading-like lines: **Heading:**  or lines ending with ":"
    if (line.startsWith("**") && line.endsWith("**")) {
      elements.push(
        <h4 key={i} className="text-[#F4F1EA] font-semibold text-sm mt-3 mb-1">
          {line.slice(2, -2)}
        </h4>
      );
      i++;
      continue;
    }

    // Bullet line: starts with "- " or "• "
    if (line.trim().startsWith("- ") || line.trim().startsWith("• ")) {
      const bulletItems = [];
      while (
        i < lines.length &&
        (lines[i].trim().startsWith("- ") || lines[i].trim().startsWith("• "))
      ) {
        bulletItems.push(lines[i].trim().replace(/^[-•]\s+/, ""));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="list-none space-y-1.5 my-2">
          {bulletItems.map((item, j) => (
            <li key={j} className="flex items-start gap-2 text-sm text-[#9B9992]">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#FF5A36] flex-shrink-0" />
              <RichLine text={item} />
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Normal paragraph line
    elements.push(
      <p key={i} className="text-sm text-[#9B9992] leading-relaxed">
        <RichLine text={line} />
      </p>
    );
    i++;
  }

  return <div className="space-y-1">{elements}</div>;
}

/** Render an array as a styled bullet list */
function BulletList({ items }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#FF5A36] flex-shrink-0" />
          <span className="text-sm text-[#9B9992] leading-relaxed">
            <RichLine text={String(item)} />
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Render an evaluation rubric string (1: ... 2: ... pattern) as score cards */
function RubricDisplay({ text }) {
  const SCORE_LABELS = ["Poor", "Basic", "Good", "Strong", "Excellent"];
  const SCORE_COLORS = [
    "bg-rose-500/10 border-rose-500/20 text-rose-300",
    "bg-orange-500/10 border-orange-500/20 text-orange-300",
    "bg-amber-500/10 border-amber-500/20 text-amber-300",
    "bg-emerald-500/10 border-emerald-500/20 text-emerald-300",
    "bg-cyan-500/10 border-cyan-500/20 text-cyan-300",
  ];

  // Try to parse "1: ...... 2: ...... 3: ..." pattern
  const pattern = /([1-5])\s*:/g;
  const matches = [...text.matchAll(pattern)];

  if (matches.length < 2) {
    // Fallback: just render as rich text
    return <RichText text={text} />;
  }

  const scores = [];
  for (let i = 0; i < matches.length; i++) {
    const score = parseInt(matches[i][1]);
    const start = matches[i].index + matches[i][0].length;
    const end = i + 1 < matches.length ? matches[i + 1].index : text.length;
    const description = text.slice(start, end).trim().replace(/\.$/, "");
    scores.push({ score, description });
  }

  return (
    <div className="space-y-2">
      {scores.map(({ score, description }) => (
        <div
          key={score}
          className={`p-3 rounded-lg border text-sm ${SCORE_COLORS[score - 1] || SCORE_COLORS[2]}`}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold text-base">{score}</span>
            <span className="font-semibold text-xs uppercase tracking-wider opacity-80">
              {SCORE_LABELS[score - 1] || ""}
            </span>
          </div>
          <p className="opacity-80 leading-relaxed">{description}</p>
        </div>
      ))}
    </div>
  );
}

// ── Reusable Accordion Section ────────────────────────────────────────────────
function AccordionSection({
  id,
  title,
  icon,
  isOpen,
  onToggle,
  content,
  isRubric = false,
}) {
  const parsed = parseField(content);
  const hasContent = parsed !== null && parsed !== "";

  function renderContent() {
    if (!hasContent) return null;
    if (Array.isArray(parsed)) return <BulletList items={parsed} />;
    if (isRubric) return <RubricDisplay text={parsed} />;
    return <RichText text={parsed} />;
  }

  return (
    <div className="rounded-xl border border-[#242525] bg-[#151616] overflow-hidden transition-colors hover:border-[#FF5A36]/30">
      <button
        onClick={onToggle}
        className="w-full px-5 py-4 flex items-center justify-between text-left font-semibold text-[#F4F1EA] hover:bg-[#1E2020] transition-colors"
      >
        <div className="flex items-center gap-2.5 text-sm">
          {icon}
          <span>{title}</span>
        </div>
        {isOpen ? (
          <ChevronDown className="w-4 h-4 text-[#9B9992]" />
        ) : (
          <ChevronRight className="w-4 h-4 text-[#9B9992]" />
        )}
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-[#242525] p-5 bg-[#111212] text-sm leading-relaxed"
          >
            {hasContent ? (
              renderContent()
            ) : (
              <div className="flex items-start gap-3 p-4 rounded-lg bg-[#151616] border border-dashed border-[#242525] text-[#9B9992]">
                <Info className="w-4 h-4 text-[#FF5A36] shrink-0 mt-0.5" />
                <p className="text-xs text-[#9B9992] leading-normal">No content available for this section yet.</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
