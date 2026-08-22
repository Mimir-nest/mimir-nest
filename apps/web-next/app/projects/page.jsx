"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Star, Code, Sparkles, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Dialog, DialogTrigger, DialogContent, } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { contentApi } from "@/services/contentApi";
const categories = [
    { id: "all", label: "All Projects" },
    { id: "ai", label: "AI/ML & Data" },
    { id: "cloud", label: "Cloud Computing" },
    { id: "cybersecurity", label: "Cybersecurity" },
    { id: "devops", label: "DevOps & Infra" },
    { id: "iot", label: "IoT & Hardware" },
    { id: "blockchain", label: "Blockchain & Web3" },
    { id: "arvr", label: "AR / VR" },
    { id: "appdev", label: "Mobile Apps" },
];
const Projects = () => {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [projectCatalog, setProjectCatalog] = useState({
        projects: [],
        resumeProjects: [],
    });
    useEffect(() => {
        let isMounted = true;
        contentApi.getProjects().then((catalog) => {
            if (isMounted) {
                setProjectCatalog(catalog);
            }
        });
        return () => {
            isMounted = false;
        };
    }, []);
    const projects = projectCatalog.projects;
    const resumeProjects = projectCatalog.resumeProjects;
    const filteredProjects = selectedCategory === "all"
        ? projects
        : projects.filter((project) => project.category === selectedCategory);
    const featuredProjects = projects.filter((project) => project.featured);
    return (<div className="min-h-screen bg-mn-background text-on-background selection:bg-surface-tint/30">
      <Navbar />

      {/* ── Deep Green Sanctuary Hero ── */}
      <section className="relative bg-surface-container pt-[120px] md:pt-[150px] pb-16 md:pb-24 px-6 md:px-16 overflow-hidden rounded-b-3xl">
        {/* Decorative Rings */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full border border-surface-tint/15 translate-x-1/4 -translate-y-1/4 pointer-events-none"/>
        <div className="absolute top-0 right-0 w-[550px] h-[550px] rounded-full border border-surface-tint/20 translate-x-1/3 -translate-y-1/3 pointer-events-none"/>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full border border-primary-container/40 -translate-x-1/2 translate-y-1/2 pointer-events-none"/>

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-xs font-label-caps text-surface-tint tracking-widest uppercase mx-auto">
            <Code className="w-4 h-4 text-surface-tint"/>
            <span>Open Source Portfolio</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display-lg text-display-lg-mobile md:text-display-lg text-foreground leading-tight">
            Explore Modern <br />
            <span className="text-surface-tint">Project Vault.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-body-lg text-body-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover innovative, production-grade applications built with modern stacks. 
            From web platforms to machine learning and cloud infrastructures.
          </motion.p>

          <div className="flex items-center justify-center gap-6 pt-2 text-xs font-label-caps tracking-widest text-muted-foreground uppercase">
            <span className="flex items-center gap-2">
              <Star className="w-4 h-4 text-surface-tint"/>
              <span>Production Tested</span>
            </span>
            <span className="flex items-center gap-2">
              <Github className="w-4 h-4 text-surface-tint"/>
              <span>Open Source / MIT</span>
            </span>
          </div>
        </div>
      </section>

      {/* ── Category Filter Bar ── */}
      <div className="sticky top-20 z-30 bg-mn-background/90 backdrop-blur-xl border-b border-outline-variant/30 py-4 mb-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-16 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 min-w-max justify-center">
            {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (<button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`
                    px-5 py-2.5 rounded-full text-xs font-medium transition-all duration-300
                    ${isSelected
                    ? "bg-primary text-primary-foreground shadow-sm scale-105"
                    : "bg-surface-container text-on-surface-variant hover:text-foreground hover:bg-surface-container-high"}
                  `}>
                  <span>{cat.label}</span>
                </button>);
        })}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 md:px-16 pb-24 space-y-12">
        {/* ── Prominent Resume Projects Trigger Banner ── */}
        <div className="bg-surface-container text-foreground rounded-2xl p-6 sm:p-8 md:p-10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 border border-border/50 shadow-xl">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full border border-surface-tint/20 translate-x-1/3 -translate-y-1/3 pointer-events-none"/>
          
          <div className="relative z-10 space-y-2 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-surface-tint/50 text-surface-tint text-xs font-label-caps tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5"/>
              Resume Ready
            </span>
            <h2 className="font-headline-lg text-headline-lg text-foreground">
              Most Common Resume Projects Explorer
            </h2>
            <p className="text-muted-foreground font-body-md text-sm max-w-xl">
              Compare basic implementations vs production-grade advanced architectures to highlight on your resume.
            </p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="relative z-10 bg-primary text-primary-foreground hover:opacity-90 rounded-lg px-8 py-6 font-label-caps text-xs tracking-widest uppercase shadow-lg shrink-0 hover:scale-105 transition-all font-semibold border-none">
                <span>View Comparison Table</span>
                <ArrowRight className="w-4 h-4 ml-2"/>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-5xl w-full bg-surface-container-lowest text-mn-primary border-outline-variant/40 rounded-[32px] p-4 sm:p-8 shadow-2xl">
              <div className="mb-6">
                <h2 className="text-2xl font-bold font-headline-md text-mn-primary">
                  Common Resume Projects vs Advanced Architectures
                </h2>
                <p className="text-on-surface-variant font-body-md text-sm mt-1">
                  Curated guidance on transforming standard academic projects into standout resume highlights.
                </p>
              </div>
              <div className="overflow-x-auto max-h-[70vh] border border-outline-variant/30 rounded-2xl">
                <table className="min-w-[700px] text-sm text-left">
                  <thead className="bg-surface-container text-mn-primary font-bold text-xs uppercase tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4">#</th>
                      <th className="py-3.5 px-4">Project</th>
                      <th className="py-3.5 px-4">Basic Version</th>
                      <th className="py-3.5 px-4">Advanced Version</th>
                      <th className="py-3.5 px-4">Resource</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/20 font-body-md">
                    {resumeProjects.map((project, index) => (<tr key={project.id || index} className="hover:bg-surface-container-low transition-colors">
                        <td className="py-3.5 px-4 font-semibold text-on-surface-variant">{index + 1}</td>
                        <td className="py-3.5 px-4 font-bold text-mn-primary">{project.title}</td>
                        <td className="py-3.5 px-4 text-on-surface-variant text-xs">{project.basicVersion}</td>
                        <td className="py-3.5 px-4 text-surface-tint font-medium text-xs">{project.advancedVersion}</td>
                        <td className="py-3.5 px-4">
                          <a href={project.resourceLink} className="inline-flex items-center gap-1 text-mn-primary font-semibold hover:text-surface-tint underline text-xs" target="_blank" rel="noreferrer">
                            <span>{project.resourceLabel || "Link"}</span>
                            <ExternalLink className="w-3 h-3"/>
                          </a>
                        </td>
                      </tr>))}
                  </tbody>
                </table>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* ── Featured Projects Section ── */}
        {featuredProjects.length > 0 && selectedCategory === "all" && (<div className="space-y-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-surface-tint"/>
              <h2 className="font-headline-lg text-headline-lg text-mn-primary">
                Featured Highlights
              </h2>
            </div>

            <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
              {featuredProjects.slice(0, 2).map((project, index) => (<div key={`feat-${index}`} className="bg-surface-container-lowest border border-border/50 rounded-2xl p-8 hover:border-surface-tint/60 transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="font-headline-md text-xl font-bold text-mn-primary">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-md text-xs font-bold shrink-0">
                        <Star className="h-3.5 w-3.5 fill-current"/>
                        <span>{project.stars || "4.9"}</span>
                      </div>
                    </div>

                    <p className="text-on-surface-variant text-sm font-body-md leading-relaxed mb-6">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech) => (<span key={tech} className="bg-surface-container text-on-surface-variant text-xs font-body-md px-3 py-1 rounded-lg border border-outline-variant/20">
                          {tech}
                        </span>))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-outline-variant/20 flex gap-3">
                    <Button variant="outline" className="flex-1 bg-surface-container border-outline-variant/40 text-mn-primary hover:bg-surface-container-high rounded-lg text-xs font-label-caps tracking-wider" onClick={() => window.open(project.github, "_blank")}>
                      <Github className="mr-1.5 h-3.5 w-3.5"/>
                      Code
                    </Button>
                    {project.demo && (<Button className="flex-1 bg-primary text-primary-foreground rounded-lg text-xs font-label-caps tracking-wider shadow-sm font-semibold border-none" onClick={() => project.demo && window.open(project.demo, "_blank")}>
                        <ExternalLink className="mr-1.5 h-3.5 w-3.5"/>
                        Live Demo
                      </Button>)}
                  </div>
                </div>))}
            </div>
          </div>)}

        {/* ── Main Projects Grid ── */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-headline-lg text-headline-lg text-mn-primary">
              All Repository Archives
            </h2>
            <span className="text-xs font-label-caps text-on-surface-variant/70 uppercase tracking-widest">
              {filteredProjects.length} Projects
            </span>
          </div>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, index) => (<div key={project.id || index} className="bg-surface-container-lowest border border-border/50 rounded-2xl p-7 hover:border-surface-tint/60 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-headline-md text-lg font-bold text-mn-primary line-clamp-1">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-1 text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-md text-xs font-bold shrink-0">
                      <Star className="h-3 w-3 fill-current"/>
                      <span>{project.stars || "5.0"}</span>
                    </div>
                  </div>

                  <p className="text-on-surface-variant text-xs font-body-md leading-relaxed mb-5 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies.slice(0, 3).map((tech) => (<span key={tech} className="bg-surface-container text-on-surface-variant text-[11px] font-body-md px-2.5 py-1 rounded-lg border border-outline-variant/20">
                        {tech}
                      </span>))}
                    {project.technologies.length > 3 && (<span className="text-[11px] text-on-surface-variant/60 bg-surface-container px-2 py-1 rounded-lg">
                        +{project.technologies.length - 3}
                      </span>)}
                  </div>
                </div>

                <div className="pt-4 border-t border-outline-variant/20 flex gap-2.5">
                  <Button variant="outline" className="flex-1 bg-surface-container border-outline-variant/40 text-mn-primary hover:bg-surface-container-high rounded-lg text-xs font-label-caps tracking-wider" onClick={() => window.open(project.github, "_blank")}>
                    <Github className="mr-1.5 h-3.5 w-3.5"/>
                    Code
                  </Button>
                  {project.demo && (<Button className="flex-1 bg-primary text-primary-foreground rounded-lg text-xs font-label-caps tracking-wider shadow-sm font-semibold border-none" onClick={() => project.demo && window.open(project.demo, "_blank")}>
                        <ExternalLink className="mr-1.5 h-3.5 w-3.5"/>
                        Demo
                      </Button>)}
                </div>
              </div>))}
          </div>
        </div>

        {/* ── Community Contribution Banner ── */}
        <div className="text-center p-10 rounded-2xl bg-surface-container border border-border/45 space-y-4">
          <h3 className="font-headline-lg text-headline-lg text-foreground">
            Ready to Contribute?
          </h3>
          <p className="text-on-surface-variant max-w-xl mx-auto font-body-md text-sm">
            Join the Mimir Nest open-source ecosystem and build high-impact software alongside fellow engineers.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs font-label-caps tracking-widest text-on-surface-variant uppercase">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-surface-tint"/>
              Open to PRs
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-surface-tint"/>
              Active Reviewers
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-surface-tint"/>
              Peer Mentorship
            </span>
          </div>
        </div>
      </main>

      <Footer />
    </div>);
};
export default Projects;
