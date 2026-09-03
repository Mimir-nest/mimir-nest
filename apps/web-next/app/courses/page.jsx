"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ExternalLink, Clock, Users, Star, BookOpen, Zap, Trophy, Code, Search, Brain, Palette, Database, Shield, Smartphone, Globe, Calculator, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { contentApi } from "@/services/contentApi";
import dynamic from "next/dynamic";

const ParticleWave = dynamic(
  () => import("@/components/ui/particle-wave").then((mod) => mod.ParticleWave),
  { ssr: false }
);
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
    Beginner: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    Intermediate: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    Advanced: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    "All Levels": "bg-surface-container text-surface-tint border-outline-variant/30",
};
const Courses = () => {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [visibleCount, setVisibleCount] = useState(10);
    const [selectedCourse, setSelectedCourse] = useState(null);
    useEffect(() => {
        setVisibleCount(10);
    }, [selectedCategory, searchQuery]);
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
    const displayedCourses = useMemo(() => {
        return filteredCourses.slice(0, visibleCount);
    }, [filteredCourses, visibleCount]);
    return (<div className="min-h-screen bg-mn-background text-on-background selection:bg-surface-tint/30">
      <Navbar />

      {/* ── Deep Green Sanctuary Hero ── */}
      <section className="relative bg-surface-container pt-[120px] md:pt-[150px] pb-16 md:pb-24 px-6 md:px-16 overflow-hidden rounded-b-3xl">
        {/* Background Particle Wave */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-65">
          <ParticleWave />
        </div>

        {/* Decorative Rings */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full border border-surface-tint/15 translate-x-1/4 -translate-y-1/4 pointer-events-none"/>
        <div className="absolute top-0 right-0 w-[550px] h-[550px] rounded-full border border-surface-tint/20 translate-x-1/3 -translate-y-1/3 pointer-events-none"/>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full border border-primary-container/40 -translate-x-1/2 translate-y-1/2 pointer-events-none"/>

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-xs font-label-caps text-surface-tint tracking-widest uppercase mx-auto">
            <Sparkles className="w-4 h-4 text-surface-tint"/>
            <span>Curated Academic Pathways</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display-lg text-display-lg-mobile md:text-display-lg text-foreground leading-tight">
            Master In-Demand <br />
            <span className="text-surface-tint">Engineering Disciplines.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-body-lg text-body-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover top verified courses from MIT, Stanford, Harvard, and premier tech educators. 
            Completely free curriculums with hands-on project assignments.
          </motion.p>

          {/* Search bar inside Hero */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="relative max-w-xl mx-auto pt-2">
            <div className="relative flex items-center bg-surface-container border border-border rounded-full shadow-2xl transition-all focus-within:border-surface-tint">
              <Search className="h-5 w-5 text-muted-foreground ml-5"/>
              <input type="text" placeholder="Search courses, universities, or technologies..." className="w-full bg-transparent border-none text-base px-4 py-4 focus:outline-none text-white placeholder:text-muted-foreground/60 font-body-md" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
              {searchQuery && (<button onClick={() => setSearchQuery("")} className="mr-4 p-1 rounded-full text-muted-foreground hover:text-white hover:bg-white/10">
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
                    ? "bg-primary text-primary-foreground shadow-sm scale-105"
                    : "bg-surface-container text-on-surface-variant hover:text-foreground hover:bg-surface-container-high"}
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
          </div>) : filteredCourses.length > 0 ? (
            <div className="space-y-16">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence>
                  {displayedCourses.map((course, index) => (<motion.div key={course.id || index} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: (index % 10) * 0.04 }} layout>
                    <div className="group relative bg-surface-container-lowest border border-border/50 rounded-2xl p-6 hover:border-surface-tint/60 transition-all duration-300 flex flex-col justify-between gap-5 h-full">
                      <div className="space-y-4">
                        {/* Badges Row */}
                        <div className="flex justify-between items-center text-[10px] font-label-caps tracking-widest uppercase">
                          <span className="text-surface-tint font-bold">
                            {course.subcategory || course.category}
                          </span>
                          <span className={`px-2.5 py-0.5 rounded border text-[10px] font-semibold ${levelBadgeStyles[course.level] || levelBadgeStyles["All Levels"]}`}>
                            {course.level}
                          </span>
                        </div>

                        {/* Title and Provider */}
                        <div>
                          <h3 className="font-headline-md text-base text-foreground mb-1 line-clamp-1 group-hover:text-surface-tint transition-colors">
                            {course.title}
                          </h3>
                          <p className="text-[11px] text-on-surface-variant/70 font-medium font-body-md">
                            by <span className="text-foreground font-semibold">{course.provider}</span>
                          </p>
                        </div>

                        {/* 1-Line Description */}
                        <p className="text-on-surface-variant/80 text-[11px] font-body-md leading-relaxed line-clamp-1">
                          {course.description}
                        </p>
                      </div>

                      {/* Explore Button */}
                      <Button onClick={() => setSelectedCourse(course)} className="w-full bg-primary text-primary-foreground hover:opacity-95 rounded-lg text-xs font-label-caps tracking-widest px-4 py-2 border-none font-semibold h-9 mt-1">
                        Explore
                      </Button>
                    </div>
                  </motion.div>))}
                </AnimatePresence>
              </div>
              {filteredCourses.length > visibleCount && (
                <div className="flex justify-center pt-8">
                  <Button 
                    onClick={() => setVisibleCount((prev) => prev + 10)} 
                    className="bg-surface-container hover:bg-surface-container-high text-surface-tint border border-outline-variant/30 rounded-full px-8 py-5 font-label-caps text-label-caps tracking-widest font-semibold hover:scale-105 transition-all shadow-md h-auto"
                  >
                    Load More Courses
                  </Button>
                </div>
              )}

              {/* Course Details Dialog */}
              <Dialog open={!!selectedCourse} onOpenChange={(open) => { if (!open) setSelectedCourse(null); }}>
                <DialogContent className="max-w-2xl w-full bg-surface-container-lowest text-mn-primary border-outline-variant/40 rounded-3xl p-6 md:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
                  {selectedCourse && (
                    <div className="space-y-6">
                      {/* Header */}
                      <div>
                        <span className="text-xs text-surface-tint font-bold font-label-caps tracking-widest uppercase block mb-1">
                          {selectedCourse.provider}
                        </span>
                        <DialogTitle className="text-xl md:text-2xl font-bold font-headline-lg text-mn-primary leading-tight">
                          {selectedCourse.title}
                        </DialogTitle>
                      </div>

                      {/* Badges */}
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-surface-container text-surface-tint border border-outline-variant/30 rounded-md text-xs font-semibold uppercase font-label-caps tracking-wider">
                          {selectedCourse.category}
                        </span>
                        {selectedCourse.subcategory && (
                          <span className="px-3 py-1 bg-surface-container text-on-surface-variant border border-outline-variant/30 rounded-md text-xs font-semibold uppercase font-label-caps tracking-wider">
                            {selectedCourse.subcategory}
                          </span>
                        )}
                        <span className={`px-3 py-1 rounded-md border text-xs font-semibold ${levelBadgeStyles[selectedCourse.level] || levelBadgeStyles["All Levels"]}`}>
                          {selectedCourse.level}
                        </span>
                      </div>

                      {/* Full Description */}
                      <div className="space-y-2">
                        <h4 className="text-xs font-label-caps tracking-widest text-mn-primary uppercase font-bold">About the Course</h4>
                        <p className="text-sm text-on-surface-variant leading-relaxed font-body-md">
                          {selectedCourse.description}
                        </p>
                      </div>

                      {/* Details Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-outline-variant/20">
                        <div>
                          <span className="text-[10px] text-on-surface-variant/60 font-label-caps uppercase block">Duration</span>
                          <span className="text-sm text-mn-primary font-semibold">{selectedCourse.duration || "Self-paced"}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-on-surface-variant/60 font-label-caps uppercase block">Students</span>
                          <span className="text-sm text-mn-primary font-semibold">{selectedCourse.students || "Unlimited"}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-on-surface-variant/60 font-label-caps uppercase block">Rating</span>
                          <span className="text-sm text-mn-primary font-semibold">{selectedCourse.rating || "Not specified"}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-on-surface-variant/60 font-label-caps uppercase block">Price</span>
                          <span className="text-sm text-mn-primary font-semibold">{selectedCourse.price || "Free"}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-on-surface-variant/60 font-label-caps uppercase block">Access</span>
                          <span className="text-sm text-mn-primary font-semibold">{selectedCourse.access_type || "Free audit"}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-on-surface-variant/60 font-label-caps uppercase block">Certificate</span>
                          <span className="text-sm text-mn-primary font-semibold">{selectedCourse.certificate || "No"}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-on-surface-variant/60 font-label-caps uppercase block">Project-Based</span>
                          <span className="text-sm text-mn-primary font-semibold">{selectedCourse.project_based ? "Yes" : "No"}</span>
                        </div>
                        {selectedCourse.language && (
                          <div>
                            <span className="text-[10px] text-on-surface-variant/60 font-label-caps uppercase block">Language</span>
                            <span className="text-sm text-mn-primary font-semibold">{selectedCourse.language}</span>
                          </div>
                        )}
                        {selectedCourse.source_type && (
                          <div>
                            <span className="text-[10px] text-on-surface-variant/60 font-label-caps uppercase block">Source</span>
                            <span className="text-sm text-mn-primary font-semibold">{selectedCourse.source_type}</span>
                          </div>
                        )}
                      </div>

                      {/* Topics */}
                      {selectedCourse.topics && selectedCourse.topics.length > 0 && (
                        <div className="pt-4 border-t border-outline-variant/20">
                          <h4 className="text-xs font-label-caps tracking-widest text-mn-primary uppercase font-bold mb-3">Topics Covered</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedCourse.topics.map((topic, i) => (
                              <span key={i} className="px-2.5 py-1 rounded-lg bg-surface-container text-on-surface-variant text-xs font-body-md border border-outline-variant/20">
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Footer Actions */}
                      <div className="flex items-center justify-end gap-3 pt-6 border-t border-outline-variant/20">
                        <DialogClose asChild>
                          <Button variant="ghost" className="text-on-surface-variant hover:text-foreground hover:bg-surface-container rounded-lg px-6 py-2.5 text-xs font-semibold h-auto font-label-caps tracking-wider">
                            Close
                          </Button>
                        </DialogClose>
                        <Button onClick={() => window.open(selectedCourse.url, "_blank")} className="bg-primary text-primary-foreground hover:opacity-95 rounded-lg px-6 py-2.5 text-xs font-semibold h-auto font-label-caps tracking-wider border-none">
                          Open Course
                          <ExternalLink className="w-3.5 h-3.5 ml-2"/>
                        </Button>
                      </div>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          ) : (<div className="text-center py-32 bg-surface-container-lowest rounded-2xl border border-outline-variant/30">
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
