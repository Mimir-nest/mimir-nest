"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { toast } from "sonner";
import {
  Search,
  BookOpen,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  X,
  Bookmark,
  Copy,
  Check,
  Circle,
  ArrowRight,
  Clock,
} from "lucide-react";
import { chapters, topics } from "./data/topics";

// ── Inline content block renderer ────────────────────────────────────────────
const InlineText = ({ text }) => {
  if (!text) return null;
  const regex = /(\*\*.*?\*\*|`[^`]+`|\[.*?\]\(.*?\))/g;
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-semibold text-white/95">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code
              key={i}
              className="bg-[#1e2022] text-[#FF7A5A] px-1.5 py-0.5 rounded font-mono text-[12px] border border-white/[0.08]"
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
                className="text-[#FF5A36] hover:text-[#ff7a5a] underline underline-offset-2 inline-flex items-center gap-0.5 font-medium transition-colors"
              >
                {match[1]}
                <ExternalLink className="w-2.5 h-2.5 opacity-70" />
              </a>
            );
          }
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
};

const ContentBlock = ({ block }) => {
  switch (block.type) {
    case "h3":
      return (
        <h3 className="text-sm font-bold text-white/90 mt-6 mb-2.5 flex items-center gap-2.5 tracking-tight">
          <span className="w-1 h-3.5 bg-[#FF5A36] inline-block shrink-0" />
          {block.text}
        </h3>
      );
    case "p":
      return (
        <p className="text-[13.5px] md:text-[14px] text-white/70 leading-[1.7] font-normal">
          <InlineText text={block.text} />
        </p>
      );
    case "quote":
      return (
        <blockquote className="my-4 pl-4 border-l-2 border-[#FF5A36] italic text-[13.5px] text-white/80 leading-relaxed bg-[#1e2022]/30 py-2 rounded-r-lg">
          {block.text}
        </blockquote>
      );
    case "list":
      return (
        <ul className="space-y-2 pl-1 my-2">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-[13.5px] md:text-[14px] text-white/70 leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-2 shrink-0" />
              <div className="flex-1 min-w-0">
                <InlineText text={item} />
              </div>
            </li>
          ))}
        </ul>
      );
    case "table":
      return (
        <div className="overflow-x-auto my-4 rounded-lg border border-white/[0.06] bg-[#141517]">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-white/[0.02] border-b border-white/[0.06]">
                {block.headers.map((h, i) => (
                  <th key={i} className="px-3.5 py-2 text-left font-semibold text-white/80 uppercase tracking-wider text-[10px]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {block.rows.map((row, ri) => (
                <tr
                  key={ri}
                  className="hover:bg-white/[0.01] transition-colors"
                >
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-3.5 py-2.5 text-white/60">
                      <InlineText text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return null;
  }
};

// Estimate read time based on content length
const getReadTime = (content) => {
  if (!content) return "2 min";
  const wordCount = content.reduce((acc, block) => {
    if (block.text) return acc + block.text.split(" ").length;
    if (block.items) return acc + block.items.join(" ").split(" ").length;
    return acc;
  }, 0);
  const minutes = Math.max(1, Math.ceil(wordCount / 120));
  return `${minutes} min read`;
};

// ── Chapter Overview Component ───────────────────────────────────────────────
const ChapterOverview = ({
  chapter,
  chapterTopics,
  readTopics,
  bookmarkedTopics,
  onSelectTopic,
}) => {
  const readInChapter = chapterTopics.filter((t) => readTopics.has(t.id)).length;
  const progressPercent = chapterTopics.length > 0 ? Math.round((readInChapter / chapterTopics.length) * 100) : 0;
  const cleanTitle = chapter.label.replace(/^Chapter\s+[IVXLCDM]+\s+[-—–]\s+/i, "").trim();

  return (
    <div className="space-y-6">
      <div className="pb-5 border-b border-white/[0.06] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest block mb-1">CHAPTER OVERVIEW</span>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">{cleanTitle}</h2>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-white/50">{readInChapter} of {chapterTopics.length} completed</span>
          <span className="text-xs font-bold text-[#FF5A36] font-mono bg-[#FF5A36]/10 px-2 py-0.5 border border-[#FF5A36]/20 rounded">{progressPercent}%</span>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2">CONCEPTS</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {chapterTopics.map((topic, index) => {
            const isRead = readTopics.has(topic.id);
            const isSaved = bookmarkedTopics.has(topic.id);
            return (
              <div
                key={topic.id}
                onClick={() => onSelectTopic(topic.id)}
                className="p-4 rounded-xl border border-white/[0.05] hover:border-white/[0.1] bg-white/[0.01] hover:bg-white/[0.02] cursor-pointer transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-mono text-white/30">Concept {String(index + 1).padStart(2, "0")}</span>
                    <div className="flex items-center gap-1.5">
                      {isSaved && <Bookmark className="w-3 h-3 text-amber-500 fill-amber-500" />}
                      {isRead && <Check className="w-3.5 h-3.5 text-[#FF5A36] stroke-[3]" />}
                    </div>
                  </div>
                  <h4 className="text-sm font-semibold text-white/95 group-hover:text-white transition-colors">{topic.title}</h4>
                  <p className="text-xs text-white/45 mt-1 line-clamp-2 leading-relaxed">{topic.summary}</p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-white/[0.03] flex items-center justify-end text-[10px] font-semibold text-white/40 group-hover:text-[#FF5A36] transition-colors gap-1">
                  <span>Read Concept</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ── Concept Reader Component ─────────────────────────────────────────────────
const ConceptReader = ({
  topic,
  isRead,
  onToggleRead,
  isBookmarked,
  onToggleBookmark,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}) => {
  const readTime = useMemo(() => getReadTime(topic.content), [topic.content]);

  const copyTopicLink = () => {
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}/system-design-guide#topic-${topic.id}`;
      navigator.clipboard.writeText(url);
      toast.success("Topic link copied to clipboard");
    }
  };

  return (
    <div className="space-y-6">
      {/* Reader Header */}
      <div className="space-y-4 pb-5 border-b border-white/[0.06]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/[0.04] text-white/60 uppercase tracking-wider border border-white/[0.08]">
              {topic.chapter.replace("-", " ")}
            </span>
            <span className="text-white/20 text-[10px]">·</span>
            <span className="flex items-center gap-1 text-[11px] text-white/40">
              <Clock className="w-3 h-3 opacity-60" />
              {readTime}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Share link */}
            <button
              onClick={copyTopicLink}
              title="Copy direct link"
              className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.04] transition-colors border border-white/[0.06]"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>

            {/* Bookmark */}
            <button
              onClick={onToggleBookmark}
              title={isBookmarked ? "Remove bookmark" : "Bookmark topic"}
              className={`p-1.5 rounded-lg transition-colors border ${
                isBookmarked
                  ? "text-amber-500 border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/10"
                  : "text-white/40 hover:text-white border-white/[0.06] hover:bg-white/[0.04]"
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? "fill-current" : ""}`} />
            </button>

            {/* Read / Complete */}
            <button
              onClick={onToggleRead}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all border ${
                isRead
                  ? "bg-[#FF5A36]/10 text-[#FF5A36] border-[#FF5A36]/30 hover:bg-[#FF5A36]/20"
                  : "bg-white/[0.04] text-white/70 border-white/[0.08] hover:text-white hover:bg-white/[0.08]"
              }`}
            >
              {isRead ? (
                <>
                  <Check className="w-3 h-3 stroke-[3]" />
                  Completed
                </>
              ) : (
                <>
                  <Circle className="w-3 h-3" />
                  Mark Complete
                </>
              )}
            </button>
          </div>
        </div>

        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">
          {topic.title}
        </h2>
      </div>

      {/* Reader Body Content */}
      <div className="space-y-5 text-white/70 leading-[1.7] text-sm max-w-3xl font-sans">
        {/* Definition Summary */}
        <p className="text-base text-white/95 font-medium leading-relaxed italic border-l-2 border-[#FF5A36] pl-4 py-0.5">
          {topic.summary}
        </p>

        {/* Optional Architecture Diagram */}
        {topic.image && (
          <div className="relative group/img rounded-xl overflow-hidden border border-white/[0.06] bg-[#0c0d0e] p-3 my-6">
            <div className="absolute top-2 right-2 z-10 opacity-0 group-hover/img:opacity-100 transition-opacity">
              <a
                href={topic.image}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded bg-black/80 text-white/80 hover:text-white text-[10px] font-medium border border-white/10 inline-flex items-center gap-1"
              >
                <span>Full size</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
            <img
              src={topic.image}
              alt={`${topic.title} architecture diagram`}
              className="w-full object-contain max-h-80 rounded-lg mx-auto"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.parentElement.style.display = "none";
              }}
            />
            <p className="text-center text-[10px] text-white/35 mt-2 italic">
              Architecture Diagram: {topic.title}
            </p>
          </div>
        )}

        {/* Formatted Content Blocks */}
        <div className="space-y-4">
          {topic.content.map((block, i) => (
            <ContentBlock key={i} block={block} />
          ))}
        </div>
      </div>

      {/* Bottom Nav Strip */}
      <div className="pt-6 mt-8 border-t border-white/[0.06] flex items-center justify-between gap-4">
        {hasPrev ? (
          <button
            onClick={onPrev}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-white/50 hover:text-white hover:bg-white/[0.02] border border-white/[0.06] transition-all"
          >
            <ChevronRight className="w-3.5 h-3.5 rotate-180" />
            <span>Previous</span>
          </button>
        ) : (
          <div />
        )}

        {hasNext ? (
          <button
            onClick={onNext}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-white/85 hover:text-white hover:bg-white/[0.04] border border-[#FF5A36]/30 hover:border-[#FF5A36]/50 bg-[#FF5A36]/5 transition-all"
          >
            <span>Next Concept</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};

// ── Main Page Component ──────────────────────────────────────────────────────
export default function SystemDesignGuidePage() {
  const allTopics = useMemo(() => Object.values(topics), []);
  const totalCount = allTopics.length;

  // ── States ─────────────────────────────────────────────────────────────────
  const [readTopics, setReadTopics] = useState(new Set());
  const [bookmarkedTopics, setBookmarkedTopics] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [activeChapter, setActiveChapter] = useState(null);
  const [activeTopicId, setActiveTopicId] = useState(null);
  const [filterMode, setFilterMode] = useState("all"); // 'all' | 'unread' | 'read' | 'bookmarked'
  const [expandedChapters, setExpandedChapters] = useState(new Set(["getting-started", "chapter-i"]));

  const searchInputRef = useRef(null);

  // ── Load persisted state ──────────────────────────────────────────────────
  useEffect(() => {
    try {
      const savedRead = localStorage.getItem("sdg-read-topics");
      if (savedRead) setReadTopics(new Set(JSON.parse(savedRead)));

      const savedBookmarks = localStorage.getItem("sdg-bookmarked-topics");
      if (savedBookmarks) setBookmarkedTopics(new Set(JSON.parse(savedBookmarks)));
    } catch (e) {
      console.error(e);
    }
  }, []);

  // ── Select Topic Handler ───────────────────────────────────────────────────
  const selectTopic = useCallback((topicId) => {
    if (topics[topicId]) {
      setActiveTopicId(topicId);
      setActiveChapter(topics[topicId].chapter);
      localStorage.setItem("sdg-last-visited-topic", topicId);
      if (typeof window !== "undefined") {
        window.history.pushState(null, "", `#topic-${topicId}`);
      }
      // On mobile, scroll down to the reader
      if (window.innerWidth < 1024) {
        setTimeout(() => {
          const el = document.getElementById("reader-pane");
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, []);

  // ── Handle Hash on load (deep link support) ────────────────────────────────
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash && hash.startsWith("#topic-")) {
        const id = hash.replace("#topic-", "");
        if (topics[id]) {
          setActiveTopicId(id);
          setActiveChapter(topics[id].chapter);
          setExpandedChapters((prev) => {
            const next = new Set(prev);
            next.add(topics[id].chapter);
            return next;
          });
        }
      } else {
        const lastVisited = localStorage.getItem("sdg-last-visited-topic");
        const defaultId = lastVisited && topics[lastVisited] ? lastVisited : "what-is-system-design";
        if (topics[defaultId]) {
          setActiveTopicId(defaultId);
          setActiveChapter(topics[defaultId].chapter);
        }
      }
    }
  }, []);

  // ── Toggle Read ───────────────────────────────────────────────────────────
  const toggleRead = useCallback((id) => {
    setReadTopics((prev) => {
      const next = new Set(prev);
      const wasRead = next.has(id);
      if (wasRead) {
        next.delete(id);
        toast.info("Marked as unread");
      } else {
        next.add(id);
        toast.success(`Completed "${topics[id]?.title || "Topic"}"!`);
      }
      localStorage.setItem("sdg-read-topics", JSON.stringify(Array.from(next)));
      return next;
    });
  }, []);

  // ── Toggle Bookmark ───────────────────────────────────────────────────────
  const toggleBookmark = useCallback((id) => {
    setBookmarkedTopics((prev) => {
      const next = new Set(prev);
      const isBookmarked = next.has(id);
      if (isBookmarked) {
        next.delete(id);
        toast.info("Bookmark removed");
      } else {
        next.add(id);
        toast.success("Added to bookmarks");
      }
      localStorage.setItem("sdg-bookmarked-topics", JSON.stringify(Array.from(next)));
      return next;
    });
  }, []);

  // ── Toggle Chapter Expand ──────────────────────────────────────────────────
  const toggleChapterExpand = useCallback((chapterId) => {
    setExpandedChapters((prev) => {
      const next = new Set(prev);
      if (next.has(chapterId)) {
        next.delete(chapterId);
      } else {
        next.add(chapterId);
      }
      return next;
    });
  }, []);

  // ── Progress Stats ────────────────────────────────────────────────────────
  const readCount = readTopics.size;
  const progressPercent = totalCount > 0 ? Math.round((readCount / totalCount) * 100) : 0;

  // ── Continue Learning Handler ──────────────────────────────────────────────
  const continueLearning = useCallback(() => {
    let targetId = localStorage.getItem("sdg-last-visited-topic");
    if (!targetId || !topics[targetId]) {
      const firstUnread = allTopics.find((t) => !readTopics.has(t.id));
      targetId = firstUnread ? firstUnread.id : allTopics[0]?.id;
    }
    if (targetId) {
      selectTopic(targetId);
      setTimeout(() => {
        const el = document.getElementById("reader-pane");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [allTopics, readTopics, selectTopic]);

  // ── Sequential Next / Prev Handlers ────────────────────────────────────────
  const handlePrevTopic = useCallback(() => {
    if (!activeTopicId) return;
    const currentIndex = allTopics.findIndex((t) => t.id === activeTopicId);
    if (currentIndex > 0) {
      const prevTopic = allTopics[currentIndex - 1];
      selectTopic(prevTopic.id);
    }
  }, [activeTopicId, allTopics, selectTopic]);

  const handleNextTopic = useCallback(() => {
    if (!activeTopicId) return;
    const currentIndex = allTopics.findIndex((t) => t.id === activeTopicId);
    if (currentIndex >= 0 && currentIndex < allTopics.length - 1) {
      const nextTopic = allTopics[currentIndex + 1];
      selectTopic(nextTopic.id);
    }
  }, [activeTopicId, allTopics, selectTopic]);

  // ── Keyboard shortcut: / to focus search ──────────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "/" && document.activeElement.tagName !== "INPUT") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === "Escape") {
        setSearchQuery("");
        setFilterMode("all");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Filter count variables
  const filteredTopics = useMemo(() => {
    return allTopics.filter(t => {
      if (filterMode === "unread" && readTopics.has(t.id)) return false;
      if (filterMode === "read" && !readTopics.has(t.id)) return false;
      if (filterMode === "bookmarked" && !bookmarkedTopics.has(t.id)) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          t.title.toLowerCase().includes(q) ||
          t.summary.toLowerCase().includes(q) ||
          t.content.some(b => (b.text || b.items?.join(" ") || "").toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [allTopics, filterMode, searchQuery, readTopics, bookmarkedTopics]);

  const hasActiveFilters = !!searchQuery.trim() || filterMode !== "all";

  return (
    <div className="min-h-screen bg-[#0F1010] text-[#F4F1EA] selection:bg-[#FF5A36] selection:text-[#0F1010] flex flex-col font-sans">
      <Navbar />

      {/* ── HERO SECTION ────────────────────────────────────────────────────── */}
      <section className="pt-[110px] md:pt-[130px] pb-8 border-b border-white/[0.06] bg-[#0F1010]">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <span className="text-[10px] font-bold tracking-widest text-[#FF5A36] uppercase block mb-1">
            SYSTEM DESIGN
          </span>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2 font-sans font-semibold">
            System Design Guide
          </h1>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/40 mb-3 font-mono">
            <span>56 concepts</span>
            <span className="text-white/20">·</span>
            <span>6 chapters</span>
            <span className="text-white/20">·</span>
            <span>5.5h estimated</span>
          </div>
          <p className="text-xs md:text-sm text-white/60 leading-relaxed max-w-3xl font-normal font-sans">
            A structured reference for understanding the principles behind scalable, distributed systems — from networking and storage to databases, architecture, and system design interviews.
          </p>
        </div>
      </section>

      {/* ── PROGRESS SECTION ────────────────────────────────────────────────── */}
      <section className="py-4 border-b border-white/[0.06] bg-[#121314]">
        <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5">
            <span className="text-[10px] font-bold text-white/60 uppercase tracking-wider font-sans">YOUR PROGRESS</span>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-white/60 bg-white/[0.03] px-2 py-0.5 border border-white/[0.06] rounded">
                {readCount} / {totalCount} completed
              </span>
              <span className="text-xs font-bold text-[#FF5A36] font-mono">
                {progressPercent}%
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-1 sm:max-w-xs justify-between sm:justify-end">
            <div className="h-1.5 w-32 sm:w-full bg-white/[0.06] rounded-full overflow-hidden shrink-0">
              <div
                className="h-full bg-[#FF5A36] rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <button
              onClick={continueLearning}
              className="text-xs font-semibold text-[#FF5A36] hover:text-[#ff7a5a] transition-colors shrink-0 flex items-center gap-1 group font-sans"
            >
              Continue where you left off
              <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ── MAIN WORKSPACE ──────────────────────────────────────────────────── */}
      <div className="max-w-6xl w-full mx-auto px-4 md:px-8 py-8 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: CURRICULUM */}
          <aside className="lg:col-span-4 space-y-4">
            <div className="border border-white/[0.06] bg-[#141517] rounded-xl p-4 space-y-4 shadow-sm">
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.04]">
                <span className="text-xs font-bold text-white uppercase tracking-wider font-sans">CURRICULUM</span>
                <span className="text-[10px] text-white/40 font-mono">{totalCount} concepts</span>
              </div>

              {/* Search & Filters */}
              <div className="space-y-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search concepts... (Press / to focus)"
                    className="w-full h-9 pl-9 pr-8 bg-[#0F1010] border border-white/[0.08] hover:border-white/[0.12] rounded-lg text-xs text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-[#FF5A36]/50 focus:border-[#FF5A36]/40 transition-all font-sans font-normal"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded-md text-white/30 hover:text-white"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {/* Filters Segment */}
                <div className="grid grid-cols-4 gap-1 bg-[#0F1010] p-0.5 rounded-lg border border-white/[0.06]">
                  {[
                    { id: "all", label: "All" },
                    { id: "unread", label: "Unread" },
                    { id: "read", label: "Read" },
                    { id: "bookmarked", label: "Saved" },
                  ].map((tab) => {
                    const isSel = filterMode === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setFilterMode(tab.id)}
                        className={`py-1 rounded text-[10px] font-medium transition-all ${
                          isSel
                            ? "bg-[#FF5A36] text-[#0F1010] font-bold shadow-sm"
                            : "text-white/50 hover:text-white"
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Chapters List */}
              <div className="space-y-1 divide-y divide-white/[0.03]">
                {chapters.map((ch, index) => {
                  const chTopicIds = ch.topics;
                  const readInChapter = chTopicIds.filter((id) => readTopics.has(id)).length;
                  const isExpanded = expandedChapters.has(ch.id) || searchQuery.trim() !== "";

                  // Filter chapter's topics based on current search & filters
                  const chTopicsFiltered = chTopicIds.map(tid => topics[tid]).filter(t => {
                    if (!t) return false;
                    if (filterMode === "unread" && readTopics.has(t.id)) return false;
                    if (filterMode === "read" && !readTopics.has(t.id)) return false;
                    if (filterMode === "bookmarked" && !bookmarkedTopics.has(t.id)) return false;
                    if (searchQuery.trim()) {
                      const q = searchQuery.toLowerCase();
                      return (
                        t.title.toLowerCase().includes(q) ||
                        t.summary.toLowerCase().includes(q) ||
                        t.content.some(b => (b.text || b.items?.join(" ") || "").toLowerCase().includes(q))
                      );
                    }
                    return true;
                  });

                  if (chTopicsFiltered.length === 0 && searchQuery.trim() !== "") return null;

                  const chNum = String(index + 1).padStart(2, "0");
                  const cleanTitle = ch.label.replace(/^Chapter\s+[IVXLCDM]+\s+[-—–]\s+/i, "").trim();

                  return (
                    <div key={ch.id} className="pt-2 first:pt-0">
                      <button
                        onClick={() => toggleChapterExpand(ch.id)}
                        className="w-full text-left py-1.5 flex items-center justify-between text-xs font-semibold text-white/80 hover:text-white transition-colors group"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="font-mono text-[9px] text-white/20 shrink-0">{chNum}</span>
                          <span className="truncate leading-snug">{cleanTitle}</span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[9px] font-mono text-white/40">
                            {readInChapter}/{chTopicIds.length}
                          </span>
                          <ChevronRight
                            className={`w-3 h-3 opacity-40 transition-transform duration-200 ${
                              isExpanded ? "rotate-90 text-[#FF5A36] opacity-100" : ""
                            }`}
                          />
                        </div>
                      </button>

                      {/* Concept Links */}
                      {isExpanded && (
                        <div className="mt-1 ml-2.5 pl-2 border-l border-white/[0.06] space-y-0.5 py-1">
                          {chTopicsFiltered.map((t, ti) => {
                            const isRead = readTopics.has(t.id);
                            const isBookmarked = bookmarkedTopics.has(t.id);
                            const isAct = activeTopicId === t.id;
                            const tNum = String(ti + 1).padStart(2, "0");

                            return (
                              <button
                                key={t.id}
                                onClick={() => selectTopic(t.id)}
                                className={`w-full text-left text-[11px] py-1 px-1.5 rounded transition-all flex items-center justify-between gap-2 group/item ${
                                  isAct
                                    ? "text-[#FF5A36] bg-[#FF5A36]/10 font-bold"
                                    : "text-white/60 hover:text-white hover:bg-white/[0.02]"
                                }`}
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  <span className="font-mono text-[8px] text-white/20 shrink-0">{tNum}</span>
                                  <span className="truncate leading-snug">{t.title}</span>
                                </div>
                                <div className="flex items-center gap-1.5 shrink-0 font-sans">
                                  {isBookmarked && (
                                    <Bookmark className="w-2.5 h-2.5 text-amber-500 fill-amber-500 animate-in zoom-in-50" />
                                  )}
                                  {isRead ? (
                                    <Check className="w-3.5 h-3.5 text-[#FF5A36] stroke-[3]" />
                                  ) : (
                                    <Circle className="w-2.5 h-2.5 text-white/10" />
                                  )}
                                </div>
                              </button>
                            );
                          })}
                          {chTopicsFiltered.length === 0 && (
                            <div className="text-[10px] text-white/30 italic py-1 pl-2">
                              No concepts found
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {filteredTopics.length === 0 && (
                <div className="text-center py-6 text-xs text-white/40 font-medium">
                  No matching topics found.
                  {hasActiveFilters && (
                    <button
                      onClick={() => { setSearchQuery(""); setFilterMode("all"); }}
                      className="block mx-auto mt-2 text-[#FF5A36] hover:underline"
                    >
                      Reset filters
                    </button>
                  )}
                </div>
              )}
            </div>
          </aside>

          {/* Right Column: CONTENT READER */}
          <main id="reader-pane" className="lg:col-span-8 border border-white/[0.06] bg-[#141517] rounded-xl p-5 md:p-7 min-h-[500px] shadow-sm flex flex-col justify-between">
            {activeTopicId && topics[activeTopicId] ? (
              <ConceptReader
                topic={topics[activeTopicId]}
                isRead={readTopics.has(activeTopicId)}
                onToggleRead={() => toggleRead(activeTopicId)}
                isBookmarked={bookmarkedTopics.has(activeTopicId)}
                onToggleBookmark={() => toggleBookmark(activeTopicId)}
                onPrev={handlePrevTopic}
                onNext={handleNextTopic}
                hasPrev={allTopics.findIndex((t) => t.id === activeTopicId) > 0}
                hasNext={allTopics.findIndex((t) => t.id === activeTopicId) < allTopics.length - 1}
              />
            ) : activeChapter ? (
              <ChapterOverview
                chapter={chapters.find(c => c.id === activeChapter)}
                chapterTopics={allTopics.filter(t => t.chapter === activeChapter)}
                readTopics={readTopics}
                bookmarkedTopics={bookmarkedTopics}
                onSelectTopic={selectTopic}
              />
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-20 my-auto">
                <BookOpen className="w-8 h-8 text-white/20 mb-3" />
                <p className="text-xs text-white/40">Select a topic from the curriculum sidebar to start reading.</p>
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
