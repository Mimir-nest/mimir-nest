"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  ArrowLeft,
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
  Info,
  Building2,
  Tag,
} from "lucide-react";
import CompanyLogo from "@/components/common/CompanyLogo";
import { companyToSlug, difficultyMeta } from "@/lib/interviewPrepUtils";

export default function QuestionDetailPage() {
  const params = useParams();
  const router = useRouter();
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
      const savedBookmarks = JSON.parse(
        localStorage.getItem("mimir_prep_bookmarks") || "[]"
      );
      const savedPracticed = JSON.parse(
        localStorage.getItem("mimir_prep_practiced") || "[]"
      );
      setIsBookmarked(savedBookmarks.includes(questionId));
      setIsPracticed(savedPracticed.includes(questionId));
    } catch (e) {
      console.debug("Failed to read initial storage:", e);
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

  const meta = difficultyMeta[question?.difficulty] || difficultyMeta.Medium;

  return (
    <div className="min-h-screen bg-[#0F1010] text-[#F4F1EA] selection:bg-[#FF5A36] selection:text-[#0F1010]">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-24 space-y-8">
        {/* Navigation Breadcrumbs */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#9B9992] flex-wrap">
            <Link
              href="/interview-prep"
              className="hover:text-[#FF5A36] transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Question Bank</span>
            </Link>
            {question?.company && (
              <>
                <span>/</span>
                <Link
                  href={`/interview-prep/company/${companyToSlug(question.company)}`}
                  className="hover:text-[#FF5A36] transition-colors"
                >
                  {question.company}
                </Link>
              </>
            )}
            <span>/</span>
            <span className="text-[#F4F1EA] font-semibold">
              {questionId}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="p-2 rounded-xl border border-[#242525] bg-[#151616] text-[#9B9992] hover:text-[#F4F1EA] hover:border-[#FF5A36]/30 transition-colors cursor-pointer"
              title="Copy Question"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={toggleBookmark}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                isBookmarked
                  ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                  : "bg-[#151616] border-[#242525] text-[#9B9992] hover:text-[#F4F1EA] hover:border-[#FF5A36]/30"
              }`}
              title={isBookmarked ? "Bookmarked" : "Bookmark this question"}
            >
              <Bookmark
                className={`w-4 h-4 ${isBookmarked ? "fill-amber-400" : ""}`}
              />
            </button>

            <button
              onClick={togglePracticed}
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-xl border transition-all cursor-pointer ${
                isPracticed
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 font-semibold"
                  : "bg-[#151616] border-[#242525] text-[#9B9992] hover:text-[#F4F1EA] hover:border-[#FF5A36]/30"
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
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="p-16 text-center rounded-2xl bg-[#151616] border border-[#242525]">
            <div className="w-8 h-8 border-2 border-[#FF5A36] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-[#9B9992] text-sm">Loading interview question details...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="p-12 text-center rounded-2xl bg-[#151616] border border-[#242525]">
            <h2 className="text-lg font-bold text-[#F4F1EA] mb-2">Question Not Found</h2>
            <p className="text-sm text-[#9B9992] mb-6">{error}</p>
            <Link
              href="/interview-prep"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FF5A36] text-[#0F1010] font-semibold text-xs font-label-caps tracking-wider"
            >
              Return to Question Bank
            </Link>
          </div>
        )}

        {/* Main Content */}
        {question && !loading && (
          <div className="space-y-8">
            {/* ── Question Hero Card ── */}
            <div className="p-6 sm:p-10 rounded-2xl bg-[#151616] border border-[#242525] shadow-xl space-y-6">
              {/* Badges Row */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="font-mono text-xs font-semibold text-[#FF5A36] px-2.5 py-1 rounded bg-[#FF5A36]/10 border border-[#FF5A36]/25">
                  {question.question_id}
                </span>

                <span className="text-[11px] font-medium px-2.5 py-1 rounded bg-[#1E2020] text-[#9B9992] border border-[#242525]">
                  {question.category}
                </span>

                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded border text-[11px] font-semibold ${meta.bg} ${meta.text} ${meta.border}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
                  {question.difficulty}
                </span>

                <Link
                  href={`/interview-prep/company/${companyToSlug(question.company)}`}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border text-[11px] font-medium bg-[#1E2020] border-[#242525] text-[#F4F1EA] hover:border-[#FF5A36]/40 transition-colors"
                >
                  <CompanyLogo company={question.company} className="w-3.5 h-3.5" />
                  <span>{question.company}</span>
                </Link>

                <div className="flex items-center gap-1.5 text-xs text-[#9B9992] px-2.5 py-1 rounded bg-[#1E2020] border border-[#242525]">
                  <Clock className="w-3.5 h-3.5 text-[#9B9992]" />
                  <span>{question.expected_time || "5–15 min"}</span>
                </div>
              </div>

              {/* Main Question Text */}
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#F4F1EA] leading-snug tracking-tight">
                {question.question}
              </h1>

              {/* Contextual Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#242525] text-xs font-mono text-[#9B9992]">
                <div>
                  <span className="text-[#9B9992]/60 block mb-0.5">Industry Context</span>
                  <span className="text-[#F4F1EA] font-semibold">
                    {question.industry || question.company_industry || "Technology"}
                  </span>
                </div>
                <div>
                  <span className="text-[#9B9992]/60 block mb-0.5">Interview Scope</span>
                  <span className="text-[#F4F1EA] font-semibold">
                    {question.role || "Company-specific / Cross-functional"}
                  </span>
                </div>
              </div>
            </div>

            {/* ── Structured Answer Frameworks ── */}
            <div className="space-y-3.5">
              {/* 1. Short Answer */}
              <AccordionSection
                title="Short Answer (Executive Summary)"
                icon={<Lightbulb className="w-4 h-4 text-amber-400" />}
                isOpen={openSections.shortAnswer}
                onToggle={() => toggleSection("shortAnswer")}
                content={question.short_answer}
              />

              {/* 2. Detailed Answer */}
              <AccordionSection
                title="Detailed Answer & Structured Walkthrough"
                icon={<BookOpen className="w-4 h-4 text-[#FF5A36]" />}
                isOpen={openSections.detailedAnswer}
                onToggle={() => toggleSection("detailedAnswer")}
                content={question.detailed_answer}
              />

              {/* 3. Strong Answer Signals */}
              <AccordionSection
                title="Strong Answer Signals"
                icon={<Target className="w-4 h-4 text-emerald-400" />}
                isOpen={openSections.strongSignals}
                onToggle={() => toggleSection("strongSignals")}
                content={question.strong_answer_signals}
              />

              {/* 4. Common Mistakes */}
              <AccordionSection
                title="Common Mistakes to Avoid"
                icon={<AlertTriangle className="w-4 h-4 text-rose-400" />}
                isOpen={openSections.commonMistakes}
                onToggle={() => toggleSection("commonMistakes")}
                content={question.common_mistakes}
              />

              {/* 5. Follow-ups */}
              <AccordionSection
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

// ── Helpers ──

function parseField(content) {
  if (!content) return null;
  if (Array.isArray(content)) return content;
  const trimmed = typeof content === "string" ? content.trim() : "";
  if (!trimmed) return null;
  if (trimmed.startsWith("[")) {
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) return parsed;
    } catch (e) {
      // Fall through to plain text if JSON parse fails
      console.debug("Field is not a JSON array, treating as plain text:", e);
    }
  }
  return trimmed;
}

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

function RichText({ text }) {
  const lines = text.split("\n");
  const elements = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) {
      i++;
      continue;
    }

    if (line.startsWith("**") && line.endsWith("**")) {
      elements.push(
        <h4 key={i} className="text-[#F4F1EA] font-semibold text-sm mt-3 mb-1">
          {line.slice(2, -2)}
        </h4>
      );
      i++;
      continue;
    }

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
            <li key={j} className="flex items-start gap-2.5 text-sm text-[#9B9992]">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#FF5A36] shrink-0" />
              <RichLine text={item} />
            </li>
          ))}
        </ul>
      );
      continue;
    }

    elements.push(
      <p key={i} className="text-sm text-[#9B9992] leading-relaxed">
        <RichLine text={line} />
      </p>
    );
    i++;
  }

  return <div className="space-y-1.5">{elements}</div>;
}

function BulletList({ items }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5">
          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#FF5A36] shrink-0" />
          <span className="text-sm text-[#9B9992] leading-relaxed">
            <RichLine text={String(item)} />
          </span>
        </li>
      ))}
    </ul>
  );
}

function AccordionSection({ title, icon, isOpen, onToggle, content }) {
  const parsed = parseField(content);
  const hasContent = parsed !== null && parsed !== "";

  return (
    <div className="rounded-2xl border border-[#242525] bg-[#151616] overflow-hidden transition-colors hover:border-[#FF5A36]/30">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4.5 flex items-center justify-between text-left font-semibold text-[#F4F1EA] hover:bg-[#1E2020] transition-colors border-none bg-transparent cursor-pointer"
      >
        <div className="flex items-center gap-3 text-sm font-semibold">
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
            className="border-t border-[#242525] p-6 bg-[#111212] text-sm leading-relaxed"
          >
            {hasContent ? (
              Array.isArray(parsed) ? (
                <BulletList items={parsed} />
              ) : (
                <RichText text={parsed} />
              )
            ) : (
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-[#151616] border border-dashed border-[#242525] text-xs text-[#9B9992]">
                <Info className="w-4 h-4 text-[#FF5A36] shrink-0 mt-0.5" />
                <span>No details available for this section.</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
