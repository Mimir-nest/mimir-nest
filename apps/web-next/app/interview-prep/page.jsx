"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
} from "react";
import Link from "next/link";
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
  X,
  Sparkles,
  Bookmark,
  Copy,
  Clock,
  ArrowRight,
  Trophy,
  Target,
  Lightbulb,
  Tag,
  Building2,
  AlertTriangle,
  Info,
  ExternalLink,
  Layers,
  HelpCircle,
  RotateCcw,
  ChevronLeft,
} from "lucide-react";
import CompanyLogo from "@/components/common/CompanyLogo";

const ParticleWave = dynamic(
  () => import("@/components/ui/particle-wave").then((mod) => mod.ParticleWave),
  { ssr: false }
);

// ── Difficulty Metadata & Badges ─────────────────────────────────────────────
const difficultyMeta = {
  Easy: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/20",
    dot: "bg-emerald-400",
  },
  Medium: {
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    border: "border-amber-500/20",
    dot: "bg-amber-400",
  },
  Hard: {
    bg: "bg-[#FF5A36]/10",
    text: "text-[#FF5A36]",
    border: "border-[#FF5A36]/20",
    dot: "bg-[#FF5A36]",
  },
  Expert: {
    bg: "bg-purple-500/10",
    text: "text-purple-400",
    border: "border-purple-500/20",
    dot: "bg-purple-400",
  },
};

const DifficultyBadge = ({ level }) => {
  const meta = difficultyMeta[level] || difficultyMeta.Medium;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md border text-[11px] font-semibold ${meta.bg} ${meta.text} ${meta.border}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
      {level}
    </span>
  );
};

// ── Company Card (Clean, Professional, Logo-First Layout) ────────────────────
const CompanyCard = ({ company, isSelected, onClick }) => {
  const total = company.totalQuestions || 20;

  return (
    <motion.button
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`text-left p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between group ${
        isSelected
          ? "bg-[#1E2020] border-[#FF5A36] shadow-lg shadow-[#FF5A36]/15 ring-1 ring-[#FF5A36]/50"
          : "bg-[#151616] border-[#242525] hover:border-[#FF5A36]/40 hover:bg-[#1A1B1B]"
      }`}
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="w-12 h-12 rounded-xl bg-[#1E2020] p-2 flex items-center justify-center border border-[#242525] group-hover:border-[#FF5A36]/30 transition-colors">
            <CompanyLogo company={company.name} className="w-7 h-7" />
          </div>

          <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-[#1E2020] text-[#FF5A36] border border-[#242525]">
            {total} Questions
          </span>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-[#F4F1EA] group-hover:text-[#FF5A36] transition-colors">
            {company.name}
          </h3>
          <p className="text-xs text-[#9B9992] mt-0.5 line-clamp-1">{company.industry}</p>
        </div>
      </div>

      {/* Categories Snippet */}
      <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-[#242525]">
        {(company.categories || []).slice(0, 3).map((cat) => (
          <span
            key={cat}
            className="text-[10px] px-2 py-0.5 rounded-md bg-[#1E2020] text-[#9B9992] border border-[#242525]"
          >
            {cat}
          </span>
        ))}
        {(company.categories || []).length > 3 && (
          <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#1E2020] text-[#9B9992]/80">
            +{company.categories.length - 3}
          </span>
        )}
      </div>
    </motion.button>
  );
};

// ── Question Card Component ───────────────────────────────────────────────────
const QuestionCard = ({
  question: q,
  isPracticed,
  onTogglePracticed,
  isBookmarked,
  onToggleBookmark,
  isExpanded,
  onToggleExpand,
}) => {
  const copyQuestion = (e) => {
    e.stopPropagation();
    const text = `${q.question}\n\n[MimirNest Practice Question #${q.question_id} · ${q.company} · ${q.category}]`;
    navigator.clipboard.writeText(text);
    toast.success("Question copied to clipboard!");
  };

  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
        isExpanded
          ? "bg-[#181919] border-[#FF5A36]/40 shadow-xl shadow-black/40"
          : "bg-[#151616] border-[#242525] hover:border-[#FF5A36]/30 hover:bg-[#1A1B1B]"
      }`}
    >
      {/* Card Header (Click to Expand) */}
      <div
        onClick={onToggleExpand}
        className="p-5 cursor-pointer select-none space-y-3"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs text-[#FF5A36] font-semibold px-2 py-0.5 rounded bg-[#FF5A36]/10 border border-[#FF5A36]/25">
              {q.question_id}
            </span>
            <DifficultyBadge level={q.difficulty} />
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium bg-[#1E2020] text-[#F4F1EA] border border-[#242525]">
              <CompanyLogo company={q.company} className="w-3.5 h-3.5" />
              <span>{q.company}</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-medium bg-[#1E2020] text-[#9B9992] border border-[#242525]">
              <Tag className="w-3 h-3 text-[#9B9992]" />
              {q.category}
            </span>
          </div>

          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={onToggleBookmark}
              className={`p-1.5 rounded-lg border transition-colors ${
                isBookmarked
                  ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                  : "border-transparent text-[#9B9992] hover:text-[#F4F1EA] hover:bg-[#1E2020]"
              }`}
              title={isBookmarked ? "Bookmarked" : "Bookmark question"}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-amber-400" : ""}`} />
            </button>

            <button
              onClick={onTogglePracticed}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                isPracticed
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                  : "border-[#242525] text-[#9B9992] hover:text-[#F4F1EA] hover:bg-[#1E2020]"
              }`}
              title="Toggle practice status"
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

            <button
              onClick={copyQuestion}
              className="p-1.5 rounded-lg border border-transparent text-[#9B9992] hover:text-[#F4F1EA] hover:bg-[#1E2020] transition-colors"
              title="Copy Question"
            >
              <Copy className="w-4 h-4" />
            </button>

            <Link
              href={`/interview-prep/${q.question_id}`}
              className="p-1.5 rounded-lg border border-transparent text-[#9B9992] hover:text-[#FF5A36] hover:bg-[#1E2020] transition-colors"
              title="Open full page"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Question Text */}
        <h3 className="text-base sm:text-lg font-semibold text-[#F4F1EA] group-hover:text-[#FF8C68] transition-colors leading-snug">
          {q.question}
        </h3>

        {/* Bottom meta snippet */}
        <div className="flex flex-wrap items-center justify-between text-xs text-[#9B9992] gap-2 pt-1">
          <div className="flex items-center gap-3">
            <span>
              <strong className="text-[#9B9992]/70 font-normal">Industry:</strong> {q.industry || q.company_industry}
            </span>
            <span>
              <strong className="text-[#9B9992]/70 font-normal">Est. Time:</strong> {q.expected_time || "5-15 min"}
            </span>
          </div>

          <div className="flex items-center gap-1 text-[#FF5A36] font-medium text-xs">
            <span>{isExpanded ? "Collapse Details" : "View Details"}</span>
            {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
          </div>
        </div>
      </div>

      {/* Expanded Accordion Body (Clean, Minimal, Professional) */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-[#242525] bg-[#111212] p-5 space-y-4"
          >
            {/* If there's an actual answer, display it */}
            {q.short_answer && (
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>Key Summary</span>
                </div>
                <p className="text-xs sm:text-sm text-[#F4F1EA] leading-relaxed pl-4 border-l border-amber-500/30">
                  {q.short_answer}
                </p>
              </div>
            )}

            {/* Structured Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-[#151616] border border-[#242525] text-xs">
              <div>
                <span className="text-[#9B9992] block mb-0.5 text-[11px]">Role Focus</span>
                <span className="text-[#F4F1EA] font-medium">{q.role || "Cross-Functional"}</span>
              </div>
              <div>
                <span className="text-[#9B9992] block mb-0.5 text-[11px]">Domain / Category</span>
                <span className="text-[#F4F1EA] font-medium">{q.category} · {q.industry || q.company_industry}</span>
              </div>
              <div>
                <span className="text-[#9B9992] block mb-0.5 text-[11px]">Recommended Duration</span>
                <span className="text-[#F4F1EA] font-medium">{q.expected_time || "5-15 minutes"}</span>
              </div>
            </div>

            {/* Skills & Tag Chips */}
            {(q.skills || q.tags) && (
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs text-[#9B9992] mr-1">Focus Areas:</span>
                {(q.skills || q.tags || "")
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean)
                  .map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-[#1E2020] text-[#9B9992] border border-[#242525]"
                    >
                      #{tag}
                    </span>
                  ))}
              </div>
            )}

            {/* Action Bar */}
            <div className="pt-2 border-t border-[#242525] flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-[#9B9992]">
                Question #{q.question_id} · Contextualized for <strong className="text-[#F4F1EA]">{q.company}</strong>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={onTogglePracticed}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    isPracticed
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                      : "bg-[#1E2020] border-[#242525] text-[#F4F1EA] hover:bg-[#282a2a]"
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{isPracticed ? "Marked Complete" : "Mark Practiced"}</span>
                </button>

                <Link
                  href={`/interview-prep/${q.question_id}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#FF5A36] hover:bg-[#ff451d] text-white shadow-md shadow-[#FF5A36]/20 transition-all"
                >
                  <span>Open Question Page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ── Main Page Component ───────────────────────────────────────────────────────
export default function InterviewPrepPage() {
  const [questions, setQuestions] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Filters
  const [selectedCompany, setSelectedCompany] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const [selectedRole, setSelectedRole] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination & Display
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;
  const [expandedCardId, setExpandedCardId] = useState(null);

  // LocalStorage state
  const [practicedIds, setPracticedIds] = useState([]);
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const [filterView, setFilterView] = useState("all"); // all, practiced, bookmarked

  const questionListRef = useRef(null);

  // Load initial dataset from backend API
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    Promise.all([
      fetch("/api/interview-prep?limit=400").then((r) => r.json()),
      fetch("/api/interview-prep/companies").then((r) => r.json()),
      fetch("/api/interview-prep/stats").then((r) => r.json()),
    ])
      .then(([qRes, cRes, sRes]) => {
        if (!isMounted) return;
        if (qRes.success && qRes.data) {
          setQuestions(qRes.data);
        }
        if (cRes.success && cRes.data) {
          setCompanies(cRes.data);
        }
        if (sRes.success && sRes.data) {
          setStats(sRes.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load interview prep data:", err);
        if (isMounted) setLoading(false);
      });

    // Load progress from localStorage
    try {
      const savedP = JSON.parse(localStorage.getItem("mimir_prep_practiced") || "[]");
      const savedB = JSON.parse(localStorage.getItem("mimir_prep_bookmarks") || "[]");
      setPracticedIds(savedP);
      setBookmarkedIds(savedB);
    } catch (e) {
      // ignore
    }

    return () => {
      isMounted = false;
    };
  }, []);

  // Distinct Categories and Industries from dataset
  const availableCategories = useMemo(() => {
    const set = new Set(questions.map((q) => q.category).filter(Boolean));
    return Array.from(set).sort();
  }, [questions]);

  const availableIndustries = useMemo(() => {
    const set = new Set(questions.map((q) => q.industry).filter(Boolean));
    return Array.from(set).sort();
  }, [questions]);

  // Combined Dynamic Filtering
  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      if (filterView === "practiced" && !practicedIds.includes(q.question_id)) return false;
      if (filterView === "bookmarked" && !bookmarkedIds.includes(q.question_id)) return false;

      if (selectedCompany !== "all" && q.company.toLowerCase() !== selectedCompany.toLowerCase()) {
        return false;
      }
      if (selectedCategory !== "all" && q.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }
      if (selectedDifficulty !== "all" && q.difficulty.toLowerCase() !== selectedDifficulty.toLowerCase()) {
        return false;
      }
      if (selectedIndustry !== "all" && q.industry.toLowerCase() !== selectedIndustry.toLowerCase()) {
        return false;
      }
      if (selectedRole !== "all" && q.role.toLowerCase() !== selectedRole.toLowerCase()) {
        return false;
      }

      if (searchQuery.trim()) {
        const query = searchQuery.trim().toLowerCase();
        const matchesQuestion = (q.question || "").toLowerCase().includes(query);
        const matchesCompany = (q.company || "").toLowerCase().includes(query);
        const matchesCategory = (q.category || "").toLowerCase().includes(query);
        const matchesSkills = (q.skills || "").toLowerCase().includes(query);
        const matchesTags = (q.tags || "").toLowerCase().includes(query);
        if (!matchesQuestion && !matchesCompany && !matchesCategory && !matchesSkills && !matchesTags) {
          return false;
        }
      }

      return true;
    });
  }, [
    questions,
    filterView,
    practicedIds,
    bookmarkedIds,
    selectedCompany,
    selectedCategory,
    selectedDifficulty,
    selectedIndustry,
    selectedRole,
    searchQuery,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedCompany,
    selectedCategory,
    selectedDifficulty,
    selectedIndustry,
    selectedRole,
    searchQuery,
    filterView,
  ]);

  const paginatedQuestions = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredQuestions.slice(start, start + pageSize);
  }, [filteredQuestions, currentPage]);

  const totalPages = Math.ceil(filteredQuestions.length / pageSize) || 1;

  const activeFiltersCount = [
    selectedCompany !== "all",
    selectedCategory !== "all",
    selectedDifficulty !== "all",
    selectedIndustry !== "all",
    selectedRole !== "all",
    searchQuery.trim().length > 0,
    filterView !== "all",
  ].filter(Boolean).length;

  const resetFilters = () => {
    setSelectedCompany("all");
    setSelectedCategory("all");
    setSelectedDifficulty("all");
    setSelectedIndustry("all");
    setSelectedRole("all");
    setSearchQuery("");
    setFilterView("all");
    toast.info("All filters reset");
  };

  const handleCompanySelect = (compName) => {
    if (selectedCompany.toLowerCase() === compName.toLowerCase()) {
      setSelectedCompany("all");
    } else {
      setSelectedCompany(compName);
    }
    if (questionListRef.current) {
      questionListRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const togglePracticed = (id) => {
    let updated;
    if (practicedIds.includes(id)) {
      updated = practicedIds.filter((item) => item !== id);
      toast.info("Marked as unpracticed");
    } else {
      updated = [...practicedIds, id];
      toast.success("Question completed!");
    }
    setPracticedIds(updated);
    localStorage.setItem("mimir_prep_practiced", JSON.stringify(updated));
  };

  const toggleBookmark = (id) => {
    let updated;
    if (bookmarkedIds.includes(id)) {
      updated = bookmarkedIds.filter((item) => item !== id);
      toast.info("Removed from bookmarks");
    } else {
      updated = [...bookmarkedIds, id];
      toast.success("Saved to bookmarks");
    }
    setBookmarkedIds(updated);
    localStorage.setItem("mimir_prep_bookmarks", JSON.stringify(updated));
  };

  const practiceCount = practicedIds.length;
  const practicePercent = Math.min(100, Math.round((practiceCount / 400) * 100));
  const rank =
    practiceCount >= 100
      ? "Executive Leader"
      : practiceCount >= 50
      ? "Senior Interviewee"
      : practiceCount >= 20
      ? "Active Candidate"
      : practiceCount >= 5
      ? "Prep Apprentice"
      : "Explorer";

  return (
    <div className="min-h-screen bg-[#0F1010] text-[#F4F1EA] selection:bg-[#FF5A36]/30 selection:text-[#F4F1EA]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-28 pb-12 overflow-hidden border-b border-[#1E2020]">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <ParticleWave />
        </div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#FF5A36]/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#F4F1EA] tracking-tight leading-tight max-w-4xl">
            Non-Technical Interview <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF5A36] via-[#FF7A5A] to-[#FF9B7D]">Question Bank</span>
          </h1>

          <p className="mt-3 text-sm sm:text-base text-[#9B9992] max-w-3xl leading-relaxed">
            A comprehensive, multi-dimensional database of 400 interview questions covering 20 global enterprise leaders across Consulting, Product Management, Strategy, Finance, Behavioral, and Leadership.
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
            <div className="p-4 rounded-2xl bg-[#151616] border border-[#242525]">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-[#9B9992]">Total Questions</span>
                <BookOpen className="w-4 h-4 text-[#FF5A36]" />
              </div>
              <div className="text-2xl font-bold text-[#F4F1EA]">400</div>
              <div className="text-[11px] text-[#FF5A36] mt-0.5">20 questions / company</div>
            </div>

            <div className="p-4 rounded-2xl bg-[#151616] border border-[#242525]">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-[#9B9992]">Global Companies</span>
                <Building2 className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-[#F4F1EA]">20</div>
              <div className="text-[11px] text-blue-400 mt-0.5">Tech, Consulting, Finance</div>
            </div>

            <div className="p-4 rounded-2xl bg-[#151616] border border-[#242525]">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-[#9B9992]">Categories</span>
                <Layers className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-bold text-[#F4F1EA]">{availableCategories.length || 8}</div>
              <div className="text-[11px] text-amber-400 mt-0.5">Behavioral, PM, Strategy, Finance</div>
            </div>

            <div className="p-4 rounded-2xl bg-[#151616] border border-[#242525]">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-[#9B9992]">Your Progress</span>
                <Trophy className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-bold text-emerald-400">{practiceCount} / 400</div>
              <div className="text-[11px] text-[#9B9992] mt-0.5 flex items-center justify-between">
                <span>{rank}</span>
                <span>{practicePercent}%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Browsing Hub (All 20 Companies with Clean Original Logos) */}
      <section className="py-10 border-b border-[#1E2020] bg-[#111212]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#F4F1EA] flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#FF5A36]" />
                <span>Browse by Company</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#9B9992] mt-1">
                Select any company card to filter its interview practice questions.
              </p>
            </div>

            {selectedCompany !== "all" && (
              <button
                onClick={() => setSelectedCompany("all")}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#FF5A36]/10 border border-[#FF5A36]/30 text-[#FF5A36] hover:bg-[#FF5A36]/20 transition-colors"
              >
                <span>Viewing: {selectedCompany}</span>
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
            {companies.map((comp) => (
              <CompanyCard
                key={comp.name}
                company={comp}
                isSelected={selectedCompany.toLowerCase() === comp.name.toLowerCase()}
                onClick={() => handleCompanySelect(comp.name)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Main Question Explorer Section */}
      <section ref={questionListRef} className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Controls Bar: Search & View Modes */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#151616] border border-[#242525] shadow-xl mb-6 space-y-4">
            {/* Search Input */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#9B9992] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  suppressHydrationWarning
                  type="text"
                  placeholder="Search questions, companies, categories, skills, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#0F1010] border border-[#242525] text-sm text-[#F4F1EA] placeholder-[#9B9992]/60 focus:outline-none focus:border-[#FF5A36] focus:ring-1 focus:ring-[#FF5A36] transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9B9992] hover:text-[#F4F1EA]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* View Switcher: All / Practiced / Bookmarked */}
              <div suppressHydrationWarning className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0F1010] border border-[#242525] shrink-0">
                <button
                  suppressHydrationWarning
                  onClick={() => setFilterView("all")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    filterView === "all"
                      ? "bg-[#FF5A36] text-white shadow-md shadow-[#FF5A36]/30"
                      : "text-[#9B9992] hover:text-[#F4F1EA]"
                  }`}
                >
                  All ({questions.length})
                </button>
                <button
                  suppressHydrationWarning
                  onClick={() => setFilterView("practiced")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    filterView === "practiced"
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                      : "text-[#9B9992] hover:text-[#F4F1EA]"
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Practiced ({practicedIds.length})</span>
                </button>
                <button
                  suppressHydrationWarning
                  onClick={() => setFilterView("bookmarked")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    filterView === "bookmarked"
                      ? "bg-amber-600 text-white shadow-md shadow-amber-600/30"
                      : "text-[#9B9992] hover:text-[#F4F1EA]"
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>Saved ({bookmarkedIds.length})</span>
                </button>
              </div>
            </div>

            {/* Dynamic Combinable Filter Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2.5 pt-3 border-t border-[#242525] text-xs">
              {/* Company Filter */}
              <div>
                <label className="text-[#9B9992] font-medium block mb-1">Company</label>
                <select
                  suppressHydrationWarning
                  value={selectedCompany}
                  onChange={(e) => setSelectedCompany(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-[#0F1010] border border-[#242525] text-[#F4F1EA] focus:outline-none focus:border-[#FF5A36]"
                >
                  <option value="all">All Companies</option>
                  {companies.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category Filter */}
              <div>
                <label className="text-[#9B9992] font-medium block mb-1">Category</label>
                <select
                  suppressHydrationWarning
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-[#0F1010] border border-[#242525] text-[#F4F1EA] focus:outline-none focus:border-[#FF5A36]"
                >
                  <option value="all">All Categories</option>
                  {availableCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Difficulty Filter */}
              <div>
                <label className="text-[#9B9992] font-medium block mb-1">Difficulty</label>
                <select
                  suppressHydrationWarning
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-[#0F1010] border border-[#242525] text-[#F4F1EA] focus:outline-none focus:border-[#FF5A36]"
                >
                  <option value="all">All Difficulties</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>

              {/* Industry Filter */}
              <div>
                <label className="text-[#9B9992] font-medium block mb-1">Industry</label>
                <select
                  suppressHydrationWarning
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-[#0F1010] border border-[#242525] text-[#F4F1EA] focus:outline-none focus:border-[#FF5A36]"
                >
                  <option value="all">All Industries</option>
                  {availableIndustries.map((ind) => (
                    <option key={ind} value={ind}>
                      {ind}
                    </option>
                  ))}
                </select>
              </div>

              {/* Reset / Actions */}
              <div className="flex items-end col-span-2 sm:col-span-4 lg:col-span-1">
                {activeFiltersCount > 0 ? (
                  <button
                    onClick={resetFilters}
                    className="w-full px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#1E2020] hover:bg-[#242525] text-[#FF5A36] border border-[#FF5A36]/30 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Filters ({activeFiltersCount})</span>
                  </button>
                ) : (
                  <div className="text-[#9B9992]/60 text-xs py-1.5">No active filters</div>
                )}
              </div>
            </div>

            {/* Active Filter Badges */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-[#242525]">
                <span className="text-[11px] text-[#9B9992] mr-1">Active:</span>
                {selectedCompany !== "all" && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs bg-[#FF5A36]/15 text-[#FF5A36] border border-[#FF5A36]/30">
                    Company: {selectedCompany}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCompany("all")} />
                  </span>
                )}
                {selectedCategory !== "all" && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs bg-[#1E2020] text-[#F4F1EA] border border-[#242525]">
                    Category: {selectedCategory}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory("all")} />
                  </span>
                )}
                {selectedDifficulty !== "all" && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs bg-amber-500/15 text-amber-300 border border-amber-500/30">
                    Difficulty: {selectedDifficulty}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedDifficulty("all")} />
                  </span>
                )}
                {selectedIndustry !== "all" && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    Industry: {selectedIndustry}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedIndustry("all")} />
                  </span>
                )}
                {searchQuery.trim() && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs bg-[#1E2020] text-[#F4F1EA] border border-[#242525]">
                    Search: &quot;{searchQuery}&quot;
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchQuery("")} />
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Results Counter */}
          <div className="flex items-center justify-between text-xs text-[#9B9992] mb-4 px-1">
            <div>
              Showing <strong className="text-[#F4F1EA] font-semibold">{filteredQuestions.length}</strong> of{" "}
              {questions.length} questions
              {selectedCompany !== "all" && <span> for <span className="text-[#FF5A36]">{selectedCompany}</span></span>}
            </div>
            <div>
              Page <span className="text-[#F4F1EA] font-medium">{currentPage}</span> of {totalPages}
            </div>
          </div>

          {/* Questions List */}
          {loading ? (
            <div className="p-16 text-center rounded-2xl bg-[#151616] border border-[#242525]">
              <div className="w-8 h-8 border-2 border-[#FF5A36] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-[#9B9992] text-sm">Querying question bank database...</p>
            </div>
          ) : filteredQuestions.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-[#151616] border border-[#242525] space-y-3">
              <HelpCircle className="w-8 h-8 text-[#9B9992]/60 mx-auto" />
              <h3 className="text-base font-semibold text-[#F4F1EA]">No matching questions found</h3>
              <p className="text-xs text-[#9B9992] max-w-md mx-auto">
                No questions match your current combination of filters. Try clearing some filters or searching for different keywords.
              </p>
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#FF5A36] hover:bg-[#ff451d] text-white transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          ) : (
            <div className="space-y-3.5">
              {paginatedQuestions.map((q) => (
                <QuestionCard
                  key={q.question_id}
                  question={q}
                  isPracticed={practicedIds.includes(q.question_id)}
                  onTogglePracticed={() => togglePracticed(q.question_id)}
                  isBookmarked={bookmarkedIds.includes(q.question_id)}
                  onToggleBookmark={() => toggleBookmark(q.question_id)}
                  isExpanded={expandedCardId === q.question_id}
                  onToggleExpand={() =>
                    setExpandedCardId(expandedCardId === q.question_id ? null : q.question_id)
                  }
                />
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                disabled={currentPage === 1}
                onClick={() => {
                  setCurrentPage((p) => Math.max(1, p - 1));
                  if (questionListRef.current) {
                    questionListRef.current.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border bg-[#151616] border-[#242525] text-[#F4F1EA] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#1E2020] transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) pageNum = i + 1;
                  else if (currentPage <= 3) pageNum = i + 1;
                  else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                  else pageNum = currentPage - 2 + i;

                  return (
                    <button
                      key={pageNum}
                      onClick={() => {
                        setCurrentPage(pageNum);
                        if (questionListRef.current) {
                          questionListRef.current.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all ${
                        currentPage === pageNum
                          ? "bg-[#FF5A36] text-white shadow-md shadow-[#FF5A36]/30"
                          : "bg-[#151616] border border-[#242525] text-[#9B9992] hover:text-[#F4F1EA]"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                disabled={currentPage === totalPages}
                onClick={() => {
                  setCurrentPage((p) => Math.min(totalPages, p + 1));
                  if (questionListRef.current) {
                    questionListRef.current.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border bg-[#151616] border-[#242525] text-[#F4F1EA] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#1E2020] transition-colors"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
