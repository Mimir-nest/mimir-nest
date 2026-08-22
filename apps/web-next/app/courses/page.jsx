"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ExternalLink, Clock, Users, Star, BookOpen, Zap, Trophy, Code, Search, Brain, Palette, Database, Shield, Smartphone, Globe, Calculator, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { contentApi } from "@/services/contentApi";
const categories = [
    { id: "all", label: "All Curriculums", iconKey: "sparkles" },
    { id: "web-dev", label: "Web Development", iconKey: "globe" },
    {
        id: "data-science",
        label: "Data Science",
        iconKey: "database",
    },
    {
        id: "mobile",
        label: "Mobile Apps",
        iconKey: "smartphone",
    },
    {
        id: "cybersecurity",
        label: "Cybersecurity",
        iconKey: "shield",
    },
    { id: "design", label: "UI / UX Design", iconKey: "palette" },
    {
        id: "algorithms",
        label: "Algorithms & CS",
        iconKey: "calculator",
    },
    { id: "ai-ml", label: "AI & Machine Learning", iconKey: "brain" },
];
const courseIcons = {
    code: <Code className="h-5 w-5 text-surface-tint"/>,
    trophy: <Trophy className="h-5 w-5 text-surface-tint"/>,
    zap: <Zap className="h-5 w-5 text-surface-tint"/>,
    "book-open": <BookOpen className="h-5 w-5 text-surface-tint"/>,
    brain: <Brain className="h-5 w-5 text-surface-tint"/>,
    smartphone: <Smartphone className="h-5 w-5 text-surface-tint"/>,
    shield: <Shield className="h-5 w-5 text-surface-tint"/>,
    palette: <Palette className="h-5 w-5 text-surface-tint"/>,
    database: <Database className="h-5 w-5 text-surface-tint"/>,
    calculator: <Calculator className="h-5 w-5 text-surface-tint"/>,
    globe: <Globe className="h-5 w-5 text-surface-tint"/>,
};
const categoryIcons = {
    all: Sparkles,
    "web-dev": Globe,
    "data-science": Database,
    mobile: Smartphone,
    cybersecurity: Shield,
    design: Palette,
    algorithms: Calculator,
    "ai-ml": Brain,
};
const levelBadgeStyles = {
    Beginner: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Intermediate: "bg-amber-50 text-amber-700 border-amber-200",
    Advanced: "bg-rose-50 text-rose-700 border-rose-200",
    "All Levels": "bg-surface-container text-surface-tint border-outline-variant/30",
};
const Courses = () => {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        let isMounted = true;
        contentApi
            .getCourses()
            .then((items) => {
            if (isMounted) {
                setCourses(items);
                setError(null);
            }
        })
            .catch(() => {
            if (isMounted) {
                setError("Failed to load courses.");
            }
        })
            .finally(() => {
            if (isMounted) {
                setLoading(false);
            }
        });
        return () => {
            isMounted = false;
        };
    }, []);
    const filteredCourses = useMemo(() => {
        let filtered = selectedCategory === "all"
            ? courses
            : courses.filter((course) => course.category === selectedCategory);
        if (searchQuery.trim()) {
            filtered = filtered.filter((course) => course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                course.description
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                course.topics.some((topic) => topic.toLowerCase().includes(searchQuery.toLowerCase())) ||
                course.provider.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        return filtered;
    }, [selectedCategory, searchQuery, courses]);
    return (<div className="min-h-screen bg-mn-background text-on-background selection:bg-surface-tint/30">
      <Navbar />

      {/* ── Deep Green Sanctuary Hero ── */}
      <section className="relative bg-mn-primary pt-[120px] md:pt-[150px] pb-16 md:pb-24 px-6 md:px-16 overflow-hidden rounded-b-[40px] md:rounded-b-[80px]">
        {/* Decorative Rings */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full border border-surface-tint/15 translate-x-1/4 -translate-y-1/4 pointer-events-none"/>
        <div className="absolute top-0 right-0 w-[550px] h-[550px] rounded-full border border-surface-tint/20 translate-x-1/3 -translate-y-1/3 pointer-events-none"/>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full border border-primary-container/40 -translate-x-1/2 translate-y-1/2 pointer-events-none"/>

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-xs font-label-caps text-surface-tint tracking-widest uppercase mx-auto">
            <Sparkles className="w-4 h-4 text-surface-tint"/>
            <span>Curated Academic Pathways</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-primary leading-tight">
            Master In-Demand <br />
            <span className="text-surface-tint">Engineering Disciplines.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-body-lg text-body-lg text-on-primary/80 max-w-2xl mx-auto leading-relaxed">
            Discover top verified courses from MIT, Stanford, Harvard, and premier tech educators. 
            Completely free curriculums with hands-on project assignments.
          </motion.p>

          {/* Search bar inside Hero */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="relative max-w-xl mx-auto pt-2">
            <div className="relative flex items-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-full shadow-2xl transition-all focus-within:border-surface-tint">
              <Search className="h-5 w-5 text-on-primary/60 ml-5"/>
              <input type="text" placeholder="Search courses, universities, or technologies..." className="w-full bg-transparent border-none text-base px-4 py-4 focus:outline-none text-white placeholder:text-on-primary/50 font-body-md" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
              {searchQuery && (<button onClick={() => setSearchQuery("")} className="mr-4 p-1 rounded-full text-on-primary/60 hover:text-white hover:bg-white/10">
                  <X className="w-4 h-4"/>
                </button>)}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Category Filter Bar ── */}
      <div className="sticky top-20 z-30 bg-mn-background/90 backdrop-blur-xl border-b border-outline-variant/30 py-4 mb-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-16 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 min-w-max justify-center">
            {categories.map((cat) => {
            const Icon = categoryIcons[cat.id] ?? Sparkles;
            const isSelected = selectedCategory === cat.id;
            return (<button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`
                    flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium transition-all duration-300
                    ${isSelected
                    ? "bg-mn-primary text-on-primary shadow-sm scale-105"
                    : "bg-surface-container text-on-surface-variant hover:text-mn-primary hover:bg-surface-container-high"}
                  `}>
                  <Icon className="w-3.5 h-3.5"/>
                  <span>{cat.label}</span>
                </button>);
        })}
          </div>
        </div>
      </div>

      {/* ── Courses Grid ── */}
      <main className="max-w-7xl mx-auto px-6 md:px-16 pb-24">
        {loading ? (<div className="flex flex-col items-center justify-center py-32">
            <div className="w-12 h-12 rounded-full border-4 border-surface-tint border-t-transparent animate-spin mb-4"/>
            <p className="text-on-surface-variant text-sm font-body-md">Loading curated courses...</p>
          </div>) : filteredCourses.length > 0 ? (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredCourses.map((course, index) => (<motion.div key={course.id || index} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.04 }} layout>
                  <div className="group relative h-full bg-surface-container-lowest border border-outline-variant/40 rounded-[32px] overflow-hidden hover:border-surface-tint/60 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,19,8,0.08)] flex flex-col justify-between p-7">
                    <div>
                      {/* Top Row: Icon + Level Badge */}
                      <div className="flex justify-between items-start mb-5">
                        <div className="p-3 bg-surface-container rounded-2xl border border-outline-variant/30 group-hover:scale-105 transition-transform">
                          {courseIcons[course.iconKey] || <BookOpen className="h-5 w-5 text-surface-tint"/>}
                        </div>
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${levelBadgeStyles[course.level] || levelBadgeStyles["All Levels"]}`}>
                          {course.level}
                        </span>
                      </div>

                      {/* Course Title */}
                      <h3 className="font-headline-md text-lg text-mn-primary mb-2.5 line-clamp-1 group-hover:text-surface-tint transition-colors">
                        {course.title}
                      </h3>

                      {/* Meta Statistics */}
                      <div className="flex items-center gap-4 text-xs text-on-surface-variant font-body-md mb-4">
                        <span className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-surface-tint"/>
                          {course.students}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-surface-tint"/>
                          {course.duration}
                        </span>
                        <span className="flex items-center gap-1.5 text-amber-600 font-bold">
                          <Star className="w-3.5 h-3.5 fill-current"/>
                          {course.rating}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-on-surface-variant text-xs font-body-md leading-relaxed mb-6 line-clamp-2">
                        {course.description}
                      </p>

                      {/* Topics Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {course.topics.slice(0, 3).map((topic, i) => (<span key={i} className="px-2.5 py-1 rounded-lg bg-surface-container text-on-surface-variant text-[11px] font-body-md border border-outline-variant/20">
                            {topic}
                          </span>))}
                        {course.topics.length > 3 && (<span className="px-2 py-1 rounded-lg bg-surface-container text-on-surface-variant/60 text-[11px]">
                            +{course.topics.length - 3}
                          </span>)}
                      </div>
                    </div>

                    {/* Bottom Action Strip */}
                    <div className="flex items-center justify-between pt-4 border-t border-outline-variant/20">
                      <div className="text-xs">
                        <span className="text-on-surface-variant/70">Provider:</span>
                        <span className="text-mn-primary font-bold ml-1.5">
                          {course.provider}
                        </span>
                      </div>
                      <Button className="bg-mn-primary hover:opacity-90 text-on-primary rounded-full text-xs font-label-caps tracking-wider px-5 py-2 shadow-sm" onClick={() => window.open(course.url, "_blank")}>
                        Explore
                        <ExternalLink className="w-3.5 h-3.5 ml-1.5"/>
                      </Button>
                    </div>
                  </div>
                </motion.div>))}
            </AnimatePresence>
          </div>) : (<div className="text-center py-32 bg-surface-container-lowest rounded-[32px] border border-outline-variant/30">
            <div className="inline-flex p-4 rounded-full bg-surface-container text-surface-tint mb-4">
              <Search className="w-8 h-8"/>
            </div>
            <h3 className="font-headline-md text-lg text-mn-primary mb-1">
              No courses found
            </h3>
            <p className="text-on-surface-variant text-sm font-body-md max-w-sm mx-auto">
              Try adjusting your search query or selecting a different discipline filter.
            </p>
          </div>)}
      </main>

      <Footer />
    </div>);
};
export default Courses;
