"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { toast } from "sonner";
import {
  Search,
  BookOpen,
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  X,
  Sparkles,
  GraduationCap,
  Layers,
  Menu,
  BarChart3,
  Github,
  Bookmark,
  Share2,
  Clock,
  Check,
  Flame,
  ArrowRight,
  ChevronsUpDown,
  ListFilter,
  Trophy,
  Copy,
} from "lucide-react";
import { chapters, topics } from "./data/topics";

const ParticleWave = dynamic(
  () => import("@/components/ui/particle-wave").then((mod) => mod.ParticleWave),
  { ssr: false }
);

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
          <span className="w-1.5 h-4 rounded-full bg-gradient-to-b from-[#FF5A36] to-[#FF8A65] inline-block shrink-0 shadow-[0_0_8px_rgba(255,90,54,0.4)]" />
          {block.text}
        </h3>
      );
    case "p":
      return (
        <p className="text-[13.5px] md:text-[14px] text-white/75 leading-[1.7] font-normal">
          <InlineText text={block.text} />
        </p>
      );
    case "quote":
      return (
        <div className="relative my-4 p-4 rounded-xl bg-gradient-to-r from-[#FF5A36]/10 via-[#FF5A36]/5 to-transparent border-l-2 border-[#FF5A36] backdrop-blur-sm">
          <p className="italic text-[13.5px] text-white/85 leading-relaxed">
            {block.text}
          </p>
        </div>
      );
    case "list":
      return (
        <ul className="space-y-2 pl-1 my-2">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-[13.5px] md:text-[14px] text-white/75 leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A36] mt-2 shrink-0 shadow-[0_0_6px_rgba(255,90,54,0.6)]" />
              <div className="flex-1 min-w-0">
                <InlineText text={item} />
              </div>
            </li>
          ))}
        </ul>
      );
    case "table":
      return (
        <div className="overflow-x-auto my-4 rounded-xl border border-white/[0.08] bg-[#141517]/80 backdrop-blur-md shadow-inner">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-white/[0.04] border-b border-white/[0.08]">
                {block.headers.map((h, i) => (
                  <th key={i} className="px-3.5 py-2.5 text-left font-semibold text-white/90 uppercase tracking-wider text-[10px]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {block.rows.map((row, ri) => (
                <tr
                  key={ri}
                  className="hover:bg-white/[0.02] transition-colors"
                >
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-3.5 py-2.5 text-white/70">
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

// ── Chapter color map & visual badges ─────────────────────────────────────────
const CHAPTER_META = {
  "getting-started": { color: "#FF5A36", gradient: "from-[#FF5A36] to-[#FF8A65]", tag: "Foundations" },
  "chapter-i": { color: "#FF7A5A", gradient: "from-[#FF7A5A] to-[#FFA07A]", tag: "Networking" },
  "chapter-ii": { color: "#EC4899", gradient: "from-[#EC4899] to-[#F472B6]", tag: "Databases" },
  "chapter-iii": { color: "#8B5CF6", gradient: "from-[#8B5CF6] to-[#A78BFA]", tag: "Architecture" },
  "chapter-iv": { color: "#10B981", gradient: "from-[#10B981] to-[#34D399]", tag: "Advanced" },
  "chapter-v": { color: "#F59E0B", gradient: "from-[#F59E0B] to-[#FBBF24]", tag: "Case Studies" },
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

// ── Topic Card Component ───────────────────────────────────────────────────────
const TopicCard = ({
  topic,
  isRead,
  onToggleRead,
  isBookmarked,
  onToggleBookmark,
  isExpanded,
  onToggleExpand,
  onNextTopic,
  hasNext,
}) => {
  const meta = CHAPTER_META[topic.chapter] ?? CHAPTER_META["getting-started"];
  const readTime = useMemo(() => getReadTime(topic.content), [topic.content]);

  const copyTopicLink = (e) => {
    e.stopPropagation();
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}/system-design-guide#topic-${topic.id}`;
      navigator.clipboard.writeText(url);
      toast.success("Topic link copied to clipboard");
    }
  };

  return (
    <motion.div
      id={`topic-${topic.id}`}
      layout="position"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className={`group relative rounded-2xl transition-all duration-300 overflow-hidden ${
        isExpanded
          ? "bg-[#161719] border border-white/[0.14] shadow-[0_12px_36px_rgba(0,0,0,0.5)] ring-1 ring-[#FF5A36]/20"
          : isRead
          ? "bg-[#141517]/90 border border-[#FF5A36]/25 hover:border-[#FF5A36]/45 hover:bg-[#18191c]"
          : "bg-[#141517]/70 border border-white/[0.06] hover:border-white/[0.14] hover:bg-[#18191c] hover:shadow-lg"
      }`}
    >
      {/* Top subtle highlight gradient */}
      <div
        className={`absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-300 ${
          isExpanded ? "opacity-100" : "opacity-0 group-hover:opacity-60"
        }`}
        style={{
          background: `linear-gradient(90deg, transparent, ${meta.color}, transparent)`,
        }}
      />

      {/* Card Header clickable button */}
      <div
        onClick={onToggleExpand}
        className="w-full flex items-start gap-3.5 p-4 md:p-5 text-left cursor-pointer select-none"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggleExpand();
          }
        }}
      >
        {/* Topic Icon Container */}
        <div
          className="w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center text-lg md:text-xl shrink-0 transition-transform duration-300 group-hover:scale-105 shadow-inner"
          style={{
            background: `${meta.color}15`,
            border: `1px solid ${meta.color}35`,
          }}
        >
          {topic.emoji}
        </div>

        {/* Title + Metadata */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider"
              style={{
                background: `${meta.color}18`,
                color: meta.color,
                border: `1px solid ${meta.color}30`,
              }}
            >
              {meta.tag}
            </span>
            <span className="flex items-center gap-1 text-[11px] text-white/40">
              <Clock className="w-3 h-3 opacity-60" />
              {readTime}
            </span>
            {isRead && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FF5A36]/15 text-[#FF5A36] text-[10px] font-bold uppercase tracking-wider border border-[#FF5A36]/30 animate-in fade-in zoom-in-95">
                <CheckCircle2 className="w-2.5 h-2.5" />
                Read
              </span>
            )}
            {isBookmarked && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 text-[10px] font-bold uppercase tracking-wider border border-amber-500/30">
                <Bookmark className="w-2.5 h-2.5 fill-current" />
                Saved
              </span>
            )}
          </div>

          <h3 className="font-semibold text-sm md:text-[15px] text-white/95 leading-snug group-hover:text-white transition-colors">
            {topic.title}
          </h3>

          <p className="text-xs md:text-[13px] text-white/55 mt-1 leading-relaxed line-clamp-2">
            {topic.summary}
          </p>
        </div>

        {/* Right side quick actions */}
        <div className="flex items-center gap-1.5 shrink-0 self-center pl-2">
          {/* Quick Bookmark Toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark();
            }}
            title={isBookmarked ? "Remove Bookmark" : "Bookmark Topic"}
            className={`p-2 rounded-lg transition-all ${
              isBookmarked
                ? "text-amber-400 bg-amber-400/10 hover:bg-amber-400/20"
                : "text-white/30 hover:text-white/70 hover:bg-white/[0.06]"
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
          </button>

          {/* Quick Read Toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleRead();
            }}
            title={isRead ? "Mark as unread" : "Mark as read"}
            className={`p-2 rounded-lg transition-all ${
              isRead
                ? "text-[#FF5A36] bg-[#FF5A36]/10 hover:bg-[#FF5A36]/20"
                : "text-white/30 hover:text-white/70 hover:bg-white/[0.06]"
            }`}
          >
            {isRead ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <Circle className="w-4 h-4" />
            )}
          </button>

          {/* Expand chevron */}
          <div
            className={`p-2 rounded-lg text-white/40 group-hover:text-white/80 transition-transform duration-300 ${
              isExpanded ? "rotate-90 text-[#FF5A36]" : ""
            }`}
          >
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Expanded Content Area */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="px-5 md:px-7 pb-6 pt-2 border-t border-white/[0.06] space-y-4">
              {/* Optional Architecture Diagram */}
              {topic.image && (
                <div className="relative group/img rounded-xl overflow-hidden border border-white/[0.1] bg-[#0c0d0e] p-3 my-2 shadow-2xl">
                  <div className="absolute top-2 right-2 z-10 opacity-0 group-hover/img:opacity-100 transition-opacity">
                    <a
                      href={topic.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-md bg-black/70 text-white/80 hover:text-white text-[11px] font-medium backdrop-blur-md border border-white/20 inline-flex items-center gap-1"
                    >
                      <span>Full size</span>
                      <ExternalLink className="w-3 h-3" />
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
                  <p className="text-center text-[11px] text-white/40 mt-2 italic">
                    Architecture Diagram: {topic.title}
                  </p>
                </div>
              )}

              {/* Formatted Content Blocks */}
              <div className="space-y-3.5">
                {topic.content.map((block, i) => (
                  <ContentBlock key={i} block={block} />
                ))}
              </div>

              {/* Bottom Card Action Strip */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-5 mt-6 border-t border-white/[0.08]">
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Mark as read button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleRead();
                    }}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 shadow-sm ${
                      isRead
                        ? "bg-[#FF5A36] text-[#0F1010] hover:bg-[#ff6f4e] font-bold shadow-[0_0_15px_rgba(255,90,54,0.4)]"
                        : "bg-white/[0.06] text-white/80 hover:bg-white/[0.12] hover:text-white border border-white/[0.08]"
                    }`}
                  >
                    {isRead ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        Completed
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Mark as Complete
                      </>
                    )}
                  </button>

                  {/* Bookmark button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmark();
                    }}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border ${
                      isBookmarked
                        ? "bg-amber-400/15 text-amber-400 border-amber-400/30"
                        : "bg-white/[0.04] text-white/70 hover:text-white hover:bg-white/[0.08] border-white/[0.08]"
                    }`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? "fill-current" : ""}`} />
                    {isBookmarked ? "Saved" : "Bookmark"}
                  </button>

                  {/* Share button */}
                  <button
                    onClick={copyTopicLink}
                    title="Copy direct topic link"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-white/60 hover:text-white hover:bg-white/[0.08] transition-all border border-white/[0.06]"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    Share
                  </button>
                </div>

                {/* Next Topic Jumper */}
                {hasNext && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onNextTopic();
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white/80 hover:text-[#FF5A36] bg-white/[0.04] hover:bg-[#FF5A36]/10 border border-white/[0.08] hover:border-[#FF5A36]/30 transition-all ml-auto"
                  >
                    <span>Next Topic</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ── Main Page Component ────────────────────────────────────────────────────────
export default function SystemDesignGuidePage() {
  const allTopics = useMemo(() => Object.values(topics), []);
  const totalCount = allTopics.length;

  // ── States ───────────────────────────────────────────────────────────────────
  const [readTopics, setReadTopics] = useState(new Set());
  const [bookmarkedTopics, setBookmarkedTopics] = useState(new Set());
  const [expandedTopics, setExpandedTopics] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [activeChapter, setActiveChapter] = useState(null);
  const [filterMode, setFilterMode] = useState("all"); // 'all' | 'unread' | 'read' | 'bookmarked'
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const searchInputRef = useRef(null);
  const mobileNavRef = useRef(null);

  // ── Load persisted state ────────────────────────────────────────────────────
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

  // ── Handle Hash on load (deep link support) ──────────────────────────────────
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const id = window.location.hash.replace("#topic-", "").replace("#", "");
      if (topics[id]) {
        setExpandedTopics((prev) => new Set([...prev, id]));
        setTimeout(() => {
          const el = document.getElementById(`topic-${id}`);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 300);
      }
    }
  }, []);

  // ── Toggle Read ─────────────────────────────────────────────────────────────
  const toggleRead = useCallback((id) => {
    setReadTopics((prev) => {
      const next = new Set(prev);
      const wasRead = next.has(id);
      if (wasRead) {
        next.delete(id);
        toast.info(`Marked as unread`);
      } else {
        next.add(id);
        toast.success(`Completed "${topics[id]?.title || "Topic"}"! 🎉`);
      }
      localStorage.setItem("sdg-read-topics", JSON.stringify(Array.from(next)));
      return next;
    });
  }, []);

  // ── Toggle Bookmark ─────────────────────────────────────────────────────────
  const toggleBookmark = useCallback((id) => {
    setBookmarkedTopics((prev) => {
      const next = new Set(prev);
      const isBookmarked = next.has(id);
      if (isBookmarked) {
        next.delete(id);
        toast.info("Bookmark removed");
      } else {
        next.add(id);
        toast.success("Added to bookmarks ⭐");
      }
      localStorage.setItem("sdg-bookmarked-topics", JSON.stringify(Array.from(next)));
      return next;
    });
  }, []);

  // ── Toggle Expand ───────────────────────────────────────────────────────────
  const toggleExpand = useCallback((id) => {
    setExpandedTopics((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  // ── Expand/Collapse All ─────────────────────────────────────────────────────
  const expandAll = () => {
    setExpandedTopics(new Set(allTopics.map((t) => t.id)));
    toast.success("Expanded all topics");
  };

  const collapseAll = () => {
    setExpandedTopics(new Set());
    toast.info("Collapsed all topics");
  };

  // ── Filtered Topics Computation ─────────────────────────────────────────────
  const filteredTopics = useMemo(() => {
    let result = allTopics;

    // Filter by Chapter
    if (activeChapter) {
      result = result.filter((t) => t.chapter === activeChapter);
    }

    // Filter by Status Tab
    if (filterMode === "unread") {
      result = result.filter((t) => !readTopics.has(t.id));
    } else if (filterMode === "read") {
      result = result.filter((t) => readTopics.has(t.id));
    } else if (filterMode === "bookmarked") {
      result = result.filter((t) => bookmarkedTopics.has(t.id));
    }

    // Filter by Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.summary.toLowerCase().includes(q) ||
          t.content.some((b) =>
            (b.text || b.items?.join(" ") || "").toLowerCase().includes(q)
          )
      );
    }

    return result;
  }, [allTopics, activeChapter, filterMode, searchQuery, readTopics, bookmarkedTopics]);

  // ── Progress Stats ──────────────────────────────────────────────────────────
  const readCount = readTopics.size;
  const progressPercent = totalCount > 0 ? Math.round((readCount / totalCount) * 100) : 0;

  // Architect Rank based on progress
  const architectRank = useMemo(() => {
    if (progressPercent >= 100) return { title: "Grand Master Architect", icon: "👑", color: "#F59E0B" };
    if (progressPercent >= 75) return { title: "Principal Architect", icon: "💎", color: "#8B5CF6" };
    if (progressPercent >= 50) return { title: "Staff Engineer", icon: "🔥", color: "#FF5A36" };
    if (progressPercent >= 25) return { title: "Distributed Dev", icon: "⚡", color: "#10B981" };
    if (progressPercent > 0) return { title: "System Explorer", icon: "🌱", color: "#3B82F6" };
    return { title: "Apprentice", icon: "🚀", color: "#9B9992" };
  }, [progressPercent]);

  // ── Group filtered topics by chapter ───────────────────────────────────────
  const groupedTopics = useMemo(() => {
    const groups = {};
    filteredTopics.forEach((t) => {
      if (!groups[t.chapter]) groups[t.chapter] = [];
      groups[t.chapter].push(t);
    });
    return groups;
  }, [filteredTopics]);

  // ── Sequential Next Topic Handler ──────────────────────────────────────────
  const handleNextTopic = (currentTopicId) => {
    const currentIndex = allTopics.findIndex((t) => t.id === currentTopicId);
    if (currentIndex >= 0 && currentIndex < allTopics.length - 1) {
      const nextTopic = allTopics[currentIndex + 1];
      setExpandedTopics(new Set([nextTopic.id]));
      setTimeout(() => {
        const el = document.getElementById(`topic-${nextTopic.id}`);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    }
  };

  // ── Navigate to chapter ────────────────────────────────────────────────────
  const navigateToChapter = (chapterId) => {
    setActiveChapter(chapterId === activeChapter ? null : chapterId);
    setSearchQuery("");
    setMobileNavOpen(false);
  };

  // ── Keyboard shortcut: / to focus search ──────────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "/" && document.activeElement.tagName !== "INPUT") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === "Escape") {
        setSearchQuery("");
        setActiveChapter(null);
        setFilterMode("all");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const hasActiveFilters = !!searchQuery.trim() || !!activeChapter || filterMode !== "all";

  return (
    <div className="min-h-screen bg-[#0F1010] text-[#F4F1EA] relative selection:bg-[#FF5A36] selection:text-[#0F1010]">
      <Navbar />

      {/* ── HERO SECTION ────────────────────────────────────────────────────── */}
      <section className="relative pt-[130px] md:pt-[150px] pb-14 md:pb-20 px-4 sm:px-6 md:px-12 overflow-hidden border-b border-white/[0.06]">
        {/* Ambient radial glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(255,90,54,0.18),transparent_70%)] pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(139,92,246,0.08),transparent_60%)] pointer-events-none" />

        {/* Background Particle Wave */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-25">
          <ParticleWave />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col items-center text-center max-w-4xl mx-auto"
          >
            {/* Classy Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.12] backdrop-blur-xl shadow-[0_0_20px_rgba(255,90,54,0.1)] mb-6">
              <span className="flex h-2 w-2 rounded-full bg-[#FF5A36] animate-pulse" />
              <span className="text-[11px] font-bold tracking-widest text-[#FF5A36] uppercase">
                System Design Master Guide
              </span>
              <span className="text-white/20">|</span>
              <span className="text-[11px] text-white/60 font-medium">56 Core Concepts</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] mb-5">
              Master System Design{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF5A36] via-[#FF7A5A] to-[#FFA07A]">
                From First Principles.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-sm sm:text-base md:text-lg text-white/65 max-w-2xl mx-auto leading-relaxed mb-8 font-normal">
              An interactive, structured reference blueprint covering high-scale networking, distributed databases, event-driven architectures, and production case studies.
            </p>

            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-3xl mb-8">
              {[
                { val: totalCount, label: "Total Topics", icon: BookOpen, color: "#FF5A36" },
                { val: chapters.length, label: "Chapters", icon: Layers, color: "#8B5CF6" },
                { val: "5.5 Hours", label: "Study Material", icon: Clock, color: "#10B981" },
                { val: architectRank.title, label: `Rank ${architectRank.icon}`, icon: Trophy, color: architectRank.color, isRank: true },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-2xl bg-[#141517]/70 border border-white/[0.07] backdrop-blur-md hover:border-white/[0.15] transition-all text-center flex flex-col items-center justify-center group"
                >
                  <div className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <stat.icon className="w-3 h-3 opacity-60" style={{ color: stat.color }} />
                    {stat.label}
                  </div>
                  <div
                    className={`font-bold tracking-tight ${stat.isRank ? "text-xs md:text-sm font-semibold truncate max-w-full" : "text-lg md:text-xl text-white"}`}
                    style={stat.isRank ? { color: stat.color } : {}}
                  >
                    {stat.val}
                  </div>
                </div>
              ))}
            </div>

            {/* Progress Gauge */}
            <div className="w-full max-w-md p-4 rounded-2xl bg-[#141517]/80 border border-white/[0.08] backdrop-blur-md shadow-xl">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-white/80">Mastery Progress</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.06] text-white/50 font-mono">
                    {readCount} / {totalCount} Topics
                  </span>
                </div>
                <span className="text-xs font-bold text-[#FF5A36]">
                  {progressPercent}%
                </span>
              </div>

              {/* Progress track */}
              <div className="h-2 w-full bg-[#1e2022] rounded-full overflow-hidden p-0.5">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#FF5A36] to-[#FFA07A] rounded-full shadow-[0_0_12px_rgba(255,90,54,0.5)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>

              {/* Track Info */}
              <div className="mt-3 flex items-center justify-between text-[11px] text-white/40 pt-2 border-t border-white/[0.04]">
                <span>Self-paced Learning Track</span>
                <span className="text-[#FF5A36]/80 font-medium">Updated & Verified Content</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── MAIN CONTENT WORKSPACE ─────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

          {/* ── DESKTOP STICKY SIDEBAR NAVIGATION ─────────────────────────── */}
          <aside className="hidden md:block md:col-span-4 lg:col-span-3 sticky top-[100px] max-h-[calc(100vh-120px)] overflow-y-auto pr-2 space-y-3 scrollbar-hide">
            {/* Sidebar Card */}
            <div className="p-4 rounded-2xl bg-[#141517]/80 border border-white/[0.08] backdrop-blur-xl shadow-2xl space-y-4">
              
              {/* Header with Quick Actions */}
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#FF5A36]" />
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Curriculum
                  </h4>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={expandAll}
                    title="Expand all topics"
                    className="p-1 rounded text-white/40 hover:text-white hover:bg-white/[0.08] text-[10px] transition-colors"
                  >
                    Expand
                  </button>
                  <span className="text-white/20 text-[10px]">·</span>
                  <button
                    onClick={collapseAll}
                    title="Collapse all topics"
                    className="p-1 rounded text-white/40 hover:text-white hover:bg-white/[0.08] text-[10px] transition-colors"
                  >
                    Collapse
                  </button>
                </div>
              </div>

              {/* All Topics Overview Link */}
              <button
                onClick={() => {
                  setActiveChapter(null);
                  setSearchQuery("");
                }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-between ${
                  !activeChapter && !searchQuery
                    ? "bg-[#FF5A36]/15 text-[#FF5A36] font-bold border border-[#FF5A36]/30 shadow-[0_0_15px_rgba(255,90,54,0.15)]"
                    : "text-white/70 hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>All 56 Concepts</span>
                </div>
                <span className="text-[10px] opacity-60 font-mono">{totalCount}</span>
              </button>

              {/* Chapters List */}
              <div className="space-y-1.5">
                {chapters.map((ch) => {
                  const chTopicIds = ch.topics;
                  const readInChapter = chTopicIds.filter((id) => readTopics.has(id)).length;
                  const isActive = activeChapter === ch.id;
                  const meta = CHAPTER_META[ch.id] ?? CHAPTER_META["getting-started"];

                  return (
                    <div key={ch.id} className="space-y-1">
                      <button
                        onClick={() => navigateToChapter(ch.id)}
                        className={`w-full text-left px-3 py-2.5 rounded-xl text-xs transition-all flex items-center justify-between gap-2 group ${
                          isActive
                            ? "bg-white/[0.08] text-white font-bold border border-white/[0.12]"
                            : "text-white/65 hover:bg-white/[0.04] hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="text-sm shrink-0">{ch.icon}</span>
                          <span className="leading-snug truncate text-[12px]">{ch.label.split("—")[1] || ch.label}</span>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span
                            className="text-[9px] font-bold px-1.5 py-0.5 rounded-md font-mono"
                            style={{
                              background: `${meta.color}20`,
                              color: meta.color,
                            }}
                          >
                            {readInChapter}/{chTopicIds.length}
                          </span>
                          <ChevronRight
                            className={`w-3.5 h-3.5 opacity-40 transition-transform duration-200 ${
                              isActive ? "rotate-90 text-[#FF5A36] opacity-100" : "group-hover:opacity-80"
                            }`}
                          />
                        </div>
                      </button>

                      {/* Sub-topics list under active chapter */}
                      {isActive && (
                        <div className="ml-3 pl-3 my-1 space-y-0.5 border-l border-white/[0.1]">
                          {chTopicIds.map((tid) => {
                            const t = topics[tid];
                            if (!t) return null;
                            const isR = readTopics.has(tid);
                            const isB = bookmarkedTopics.has(tid);
                            const isExp = expandedTopics.has(tid);

                            return (
                              <button
                                key={tid}
                                onClick={() => {
                                  setExpandedTopics(new Set([tid]));
                                  setTimeout(() => {
                                    const el = document.getElementById(`topic-${tid}`);
                                    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                                  }, 100);
                                }}
                                className={`w-full text-left text-[11px] py-1 px-2 rounded-lg transition-colors flex items-center justify-between gap-1.5 ${
                                  isExp
                                    ? "text-[#FF5A36] bg-[#FF5A36]/10 font-semibold"
                                    : "text-white/60 hover:text-white hover:bg-white/[0.04]"
                                }`}
                              >
                                <div className="flex items-center gap-1.5 truncate">
                                  {isR ? (
                                    <CheckCircle2 className="w-2.5 h-2.5 text-[#FF5A36] shrink-0" />
                                  ) : (
                                    <Circle className="w-2.5 h-2.5 text-white/25 shrink-0" />
                                  )}
                                  <span className="truncate">{t.title}</span>
                                </div>
                                {isB && <Bookmark className="w-2.5 h-2.5 text-amber-400 fill-current shrink-0" />}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Bookmarks Quick Filter Button */}
              <div className="pt-2 border-t border-white/[0.06]">
                <button
                  onClick={() => {
                    setFilterMode(filterMode === "bookmarked" ? "all" : "bookmarked");
                    setActiveChapter(null);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-between ${
                    filterMode === "bookmarked"
                      ? "bg-amber-500/15 text-amber-400 font-bold border border-amber-500/30"
                      : "text-white/60 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Bookmark className="w-3.5 h-3.5 text-amber-400" />
                    <span>Saved Bookmarks</span>
                  </div>
                  <span className="text-[10px] font-mono text-amber-400 font-bold">
                    {bookmarkedTopics.size}
                  </span>
                </button>
              </div>
            </div>
          </aside>

          {/* ── RIGHT COLUMN: INTERACTIVE CONTENT ───────────────────────────── */}
          <main className="md:col-span-8 lg:col-span-9 space-y-6">

            {/* Mobile Chapter Selector */}
            <div className="md:hidden" ref={mobileNavRef}>
              <button
                onClick={() => setMobileNavOpen(!mobileNavOpen)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-2xl border border-white/[0.1] bg-[#141517] text-sm font-semibold text-white shadow-lg"
              >
                <div className="flex items-center gap-2.5">
                  <Layers className="w-4 h-4 text-[#FF5A36]" />
                  <span>
                    {activeChapter
                      ? chapters.find((c) => c.id === activeChapter)?.label ?? "All Chapters"
                      : "All 56 Concepts"}
                  </span>
                </div>
                <ChevronDown className={`w-4 h-4 text-white/50 transition-transform ${mobileNavOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {mobileNavOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-2 rounded-2xl border border-white/[0.1] bg-[#161719] shadow-2xl p-2 z-40 space-y-1"
                  >
                    <button
                      onClick={() => { setActiveChapter(null); setSearchQuery(""); setMobileNavOpen(false); }}
                      className={`w-full text-left px-3 py-2.5 text-xs rounded-xl transition-colors ${!activeChapter ? "bg-[#FF5A36]/15 text-[#FF5A36] font-bold" : "text-white/70 hover:bg-white/[0.04]"}`}
                    >
                      All Topics ({totalCount})
                    </button>
                    {chapters.map((ch) => (
                      <button
                        key={ch.id}
                        onClick={() => navigateToChapter(ch.id)}
                        className={`w-full text-left px-3 py-2.5 text-xs rounded-xl flex items-center gap-2.5 transition-colors ${activeChapter === ch.id ? "bg-[#FF5A36]/15 text-[#FF5A36] font-bold" : "text-white/70 hover:bg-white/[0.04]"}`}
                      >
                        <span>{ch.icon}</span>
                        <span className="truncate">{ch.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Search & Filter Toolbar */}
            <div className="space-y-3">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-[#FF5A36] transition-colors" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Search ${totalCount} system design topics... (Press / to focus)`}
                  className="w-full h-12 pl-11 pr-24 bg-[#141517]/90 border border-white/[0.08] hover:border-white/[0.15] rounded-2xl text-sm text-white placeholder:text-white/35 focus:outline-none focus:ring-1 focus:ring-[#FF5A36]/50 focus:border-[#FF5A36]/40 transition-all shadow-lg backdrop-blur-md"
                />
                
                {/* Keyboard badge or clear button */}
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                  {searchQuery ? (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="p-1 rounded-md text-white/40 hover:text-white transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  ) : (
                    <kbd className="hidden sm:inline-block px-2 py-0.5 rounded bg-white/[0.06] border border-white/[0.1] text-[10px] font-mono text-white/40">
                      /
                    </kbd>
                  )}
                </div>
              </div>

              {/* Filter Pills Tab Strip */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {[
                  { id: "all", label: "All Concepts", icon: Sparkles },
                  { id: "unread", label: "Unread", icon: Circle, count: totalCount - readCount },
                  { id: "read", label: "Completed", icon: CheckCircle2, count: readCount },
                  { id: "bookmarked", label: "Saved", icon: Bookmark, count: bookmarkedTopics.size },
                ].map((tab) => {
                  const isSelected = filterMode === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setFilterMode(tab.id)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all flex items-center gap-1.5 border ${
                        isSelected
                          ? "bg-[#FF5A36] text-[#0F1010] border-[#FF5A36] shadow-[0_0_15px_rgba(255,90,54,0.3)] font-bold"
                          : "bg-[#141517]/60 text-white/60 hover:text-white hover:bg-white/[0.06] border-white/[0.06]"
                      }`}
                    >
                      <tab.icon className={`w-3 h-3 ${isSelected && tab.id === "bookmarked" ? "fill-current" : ""}`} />
                      <span>{tab.label}</span>
                      {tab.count !== undefined && (
                        <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${isSelected ? "bg-black/20 text-black font-bold" : "bg-white/[0.08] text-white/50"}`}>
                          {tab.count}
                        </span>
                      )}
                    </button>
                  );
                })}

                {/* Active Filter Tags */}
                {hasActiveFilters && (
                  <button
                    onClick={() => {
                      setActiveChapter(null);
                      setSearchQuery("");
                      setFilterMode("all");
                    }}
                    className="ml-auto text-xs text-white/40 hover:text-[#FF5A36] transition-colors shrink-0 pl-2"
                  >
                    Reset filters
                  </button>
                )}
              </div>
            </div>

            {/* Active search pill */}
            {searchQuery && (
              <div className="flex items-center justify-between text-xs text-white/50 px-1">
                <span>
                  Showing results matching <span className="text-white font-semibold">"{searchQuery}"</span>
                </span>
                <span className="font-mono text-[#FF5A36] font-bold">
                  {filteredTopics.length} found
                </span>
              </div>
            )}

            {/* Empty State */}
            {filteredTopics.length === 0 && (
              <div className="py-20 text-center rounded-2xl border border-white/[0.06] bg-[#141517]/40 backdrop-blur-md">
                <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mx-auto mb-4">
                  <Search className="w-6 h-6 text-white/30" />
                </div>
                <h3 className="font-semibold text-white mb-1.5 text-base">No matching topics found</h3>
                <p className="text-xs text-white/50 max-w-sm mx-auto mb-5">
                  Try adjusting your search terms or clearing the active filters.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveChapter(null);
                    setFilterMode("all");
                  }}
                  className="px-4 py-2 rounded-xl bg-[#FF5A36] text-[#0F1010] text-xs font-bold hover:bg-[#ff6f4e] transition-all shadow-[0_0_15px_rgba(255,90,54,0.3)]"
                >
                  View All Topics
                </button>
              </div>
            )}

            {/* Topic Chapters & Cards List */}
            {filteredTopics.length > 0 && (
              <div className="space-y-10">
                {chapters.map((ch) => {
                  const chTopics = groupedTopics[ch.id];
                  if (!chTopics || chTopics.length === 0) return null;
                  const meta = CHAPTER_META[ch.id] ?? CHAPTER_META["getting-started"];
                  const readInChapter = chTopics.filter((t) => readTopics.has(t.id)).length;
                  const chapterProgress = Math.round((readInChapter / chTopics.length) * 100);

                  return (
                    <section key={ch.id} id={`chapter-${ch.id}`} className="space-y-4">
                      {/* Chapter Title Bar */}
                      <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                        <div className="flex items-center gap-3">
                          <span
                            className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0 shadow-inner"
                            style={{
                              background: `${meta.color}15`,
                              border: `1px solid ${meta.color}35`,
                            }}
                          >
                            {ch.icon}
                          </span>
                          <div>
                            <h2 className="text-sm md:text-base font-bold text-white leading-tight">
                              {ch.label}
                            </h2>
                            <p className="text-[11px] text-white/45 mt-0.5">
                              {chTopics.length} concepts · {readInChapter} completed
                            </p>
                          </div>
                        </div>

                        {/* Chapter Progress Gauge */}
                        <div className="flex items-center gap-2.5">
                          <div className="hidden sm:block w-20 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{
                                width: `${chapterProgress}%`,
                                background: meta.color,
                              }}
                            />
                          </div>
                          <span
                            className="text-[11px] font-bold font-mono px-2 py-0.5 rounded-md"
                            style={{
                              background: `${meta.color}15`,
                              color: meta.color,
                              border: `1px solid ${meta.color}30`,
                            }}
                          >
                            {chapterProgress}%
                          </span>
                        </div>
                      </div>

                      {/* Topic Cards Column */}
                      <div className="grid grid-cols-1 gap-3.5">
                        <AnimatePresence mode="popLayout">
                          {chTopics.map((topic, index) => {
                            const isRead = readTopics.has(topic.id);
                            const isBookmarked = bookmarkedTopics.has(topic.id);
                            const isExpanded = expandedTopics.has(topic.id);
                            const hasNext = index < chTopics.length - 1;

                            return (
                              <TopicCard
                                key={topic.id}
                                topic={topic}
                                isRead={isRead}
                                onToggleRead={() => toggleRead(topic.id)}
                                isBookmarked={isBookmarked}
                                onToggleBookmark={() => toggleBookmark(topic.id)}
                                isExpanded={isExpanded}
                                onToggleExpand={() => toggleExpand(topic.id)}
                                onNextTopic={() => handleNextTopic(topic.id)}
                                hasNext={hasNext}
                              />
                            );
                          })}
                        </AnimatePresence>
                      </div>
                    </section>
                  );
                })}
              </div>
            )}

            {/* Bottom Info */}
            <div className="mt-14 pt-8 border-t border-white/[0.08] text-center space-y-2">
              <p className="text-xs text-white/45">
                Curated with industry-standard system design patterns, distributed principles & interview frameworks.
              </p>
              <p className="text-[11px] text-white/30">
                Built for software engineers, tech leads & students preparing for high-scale systems.
              </p>
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
