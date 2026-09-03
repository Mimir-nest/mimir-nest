"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowRight, Github } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import dynamic from "next/dynamic";

const ParticleWave = dynamic(
  () => import("@/components/ui/particle-wave").then((mod) => mod.ParticleWave),
  { ssr: false }
);

const About = () => {
  const router = useRouter();

  const handleExplore = () => {
    router.push("/#features");
  };

  const productAreas = [
    {
      title: "Study",
      desc: "Tools for everyday academic work, including CGPA calculation, focus sessions, and typing practice."
    },
    {
      title: "Prepare",
      desc: "Resources for placement preparation, including DSA practice and interview-oriented material."
    },
    {
      title: "Build",
      desc: "Project ideas and roadmaps to help turn learning into practical work."
    },
    {
      title: "Learn",
      desc: "Curated courses and resources to help students learn at their own pace."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-mn-background text-on-background selection:bg-surface-tint/30 flex flex-col justify-between">
      <div>
        <Navbar />

        {/* ── 1. HERO ── */}
        <section className="relative bg-surface-container pt-[140px] md:pt-[180px] pb-20 md:pb-28 px-6 md:px-16 overflow-hidden rounded-b-3xl">
          {/* Background Particle Wave */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-65">
            <ParticleWave />
          </div>

          {/* Subtle Background Rings */}
          <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full border border-surface-tint/10 translate-x-1/4 -translate-y-1/4 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full border border-primary-container/30 -translate-x-1/2 translate-y-1/2 pointer-events-none" />

          <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-surface-container-high/60 text-xs font-label-caps text-surface-tint tracking-widest uppercase mx-auto font-semibold"
            >
              About Mimir Nest
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display-lg text-display-lg-mobile md:text-display-lg text-foreground leading-tight tracking-tight"
            >
              Built for students.
              <br />
              <span className="text-surface-tint font-medium">Open to everyone.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed"
            >
              Mimir Nest is an open-source collection of tools and resources designed to make everyday student life a little simpler — from studying and placement preparation to learning, building, and finding useful opportunities.
            </motion.p>
          </div>
        </section>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-5xl mx-auto px-6 py-20 md:py-28 space-y-24 md:space-y-32"
        >
          {/* ── 2. WHY MIMIR NEST ── */}
          <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-5">
              <h2 className="font-headline-lg text-2xl md:text-3xl text-foreground leading-snug max-w-sm">
                A simpler place for useful student resources.
              </h2>
            </div>
            <div className="md:col-span-7 space-y-6 text-on-surface-variant font-body-md text-base leading-relaxed">
              <p>
                College often means jumping between calculators, study tools, course platforms, placement resources, project ideas, and student benefits.
              </p>
              <p>
                Mimir Nest brings useful parts of that experience together in one place — without putting the core experience behind a paywall.
              </p>
            </div>
          </motion.section>

          {/* ── 3. WHAT IT BRINGS TOGETHER ── */}
          <motion.section variants={itemVariants} className="space-y-12 border-t border-border/40 pt-16">
            <div className="max-w-md">
              <h3 className="font-label-caps text-xs text-surface-tint tracking-widest uppercase font-semibold mb-2">
                Unified Ecosystem
              </h3>
              <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                Mimir Nest consolidates four fundamental pillars of student preparation into a single cohesive workflow.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {productAreas.map((area, index) => (
                <div key={index} className="space-y-3 pl-4 border-l-2 border-surface-tint/20 hover:border-surface-tint transition-colors duration-300">
                  <h4 className="font-headline-sm text-sm font-bold text-foreground uppercase tracking-wider">
                    {area.title}
                  </h4>
                  <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
                    {area.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* ── 4. OPEN SOURCE ── */}
          <motion.section
            variants={itemVariants}
            className="rounded-[32px] bg-surface-container p-8 md:p-12 border border-outline-variant/40 grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
          >
            <div className="md:col-span-7 space-y-4">
              <span className="font-label-caps text-xs text-surface-tint tracking-widest uppercase font-semibold block">
                Open Source
              </span>
              <h3 className="font-headline-lg text-2xl md:text-3xl text-foreground font-bold leading-tight">
                Built in the open.
              </h3>
              <p className="font-body-md text-sm text-on-surface-variant leading-relaxed max-w-xl">
                Mimir Nest is free to use and open source. The code is available for anyone to inspect, learn from, improve, or contribute to.
              </p>
            </div>
            <div className="md:col-span-5 md:text-right">
              <a
                href="https://github.com/Mimir-nest/mimir-nest"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-label-caps text-xs tracking-widest uppercase hover:opacity-95 transition-opacity font-semibold border-none cursor-pointer"
              >
                <Github className="w-4 h-4" />
                <span>View on GitHub</span>
              </a>
            </div>
          </motion.section>

          {/* ── 5. BUILT BY ── */}
          <motion.section variants={itemVariants} className="border-t border-border/40 pt-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-5">
              <h3 className="font-headline-lg text-xl md:text-2xl text-foreground font-bold">
                Built by Sachin Patel.
              </h3>
            </div>
            <div className="md:col-span-7">
              <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                Mimir Nest started as a simple idea: make useful student resources easier to find and easier to use. The platform is created and maintained by{" "}
                <a
                  href="https://www.linkedin.com/in/sachinskyte"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-surface-tint hover:underline font-semibold"
                >
                  Sachin Patel
                </a>{" "}
                as an open-source repository.
              </p>
            </div>
          </motion.section>

          {/* ── 6. CLOSING ── */}
          <motion.section variants={itemVariants} className="text-center py-12 space-y-6">
            <p className="font-body-lg text-lg text-foreground font-medium italic tracking-wide">
              For students, by the open-source community.
            </p>
            <div className="pt-2">
              <button
                onClick={handleExplore}
                className="inline-flex items-center gap-2 text-surface-tint hover:text-surface-tint-hover font-semibold tracking-wider font-label-caps text-xs uppercase cursor-pointer border-none bg-transparent"
              >
                <span>Explore Mimir Nest</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.section>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
