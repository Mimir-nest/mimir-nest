"use client";

import React from "react";
import { ArrowRight, Sparkles, GitBranch, Terminal, Shield, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function InterviewHero() {
  const scrollToEarlyAccess = () => {
    const el = document.getElementById("early-access");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToHowItWorks = () => {
    const el = document.getElementById("how-it-works");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative bg-surface-container pt-[120px] md:pt-[150px] pb-20 md:pb-[110px] px-6 md:px-16 overflow-hidden rounded-b-3xl border-b border-border/40">
      {/* Subtle Technical Ambient Geometry */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full border border-surface-tint/10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full border border-surface-tint/5 -translate-x-1/2 translate-y-1/2 pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#24252515_1px,transparent_1px),linear-gradient(to_bottom,#24252515_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 relative z-10 items-center">
        {/* Left Column: Copy & CTAs */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          {/* Coming Soon Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-surface-container-high border border-surface-tint/30 w-fit backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-surface-tint opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-surface-tint" />
            </span>
            <span className="font-label-caps text-[11px] text-surface-tint tracking-widest uppercase font-semibold">
              Coming Soon
            </span>
            <span className="text-muted-foreground/60 text-xs">|</span>
            <span className="text-xs text-foreground/80 font-medium">Mimir Ecosystem</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            className="font-headline-lg text-3xl sm:text-4xl lg:text-5xl font-extrabold text-on-background tracking-tight leading-[1.15]"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            Your GitHub becomes <br className="hidden sm:block" />
            <span className="text-surface-tint">your interview.</span>
          </motion.h1>

          {/* Supporting Headline */}
          <motion.p
            className="text-lg md:text-xl font-medium text-foreground/90 leading-snug"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
          >
            Practice with an AI interviewer that actually knows what you built.
          </motion.p>

          {/* Supporting Copy */}
          <motion.p
            className="font-body-md text-base text-on-surface-variant max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
          >
            Connect your GitHub, choose a project, and get a personalized mock interview based on your actual work, technology choices, architecture, and engineering decisions.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3.5 pt-2"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.25 }}
          >
            <button
              onClick={scrollToEarlyAccess}
              className="bg-primary text-primary-foreground px-7 py-3.5 rounded-xl font-label-caps text-sm hover:scale-[1.02] active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 tracking-wider font-semibold shadow-lg shadow-primary/20 border-none cursor-pointer"
            >
              Get Early Access
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={scrollToHowItWorks}
              className="bg-surface-container-high hover:bg-surface-container-highest border border-outline-variant/60 text-foreground px-6 py-3.5 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              See How It Works
            </button>
          </motion.div>

          {/* Micro Trust Indicators */}
          <motion.div
            className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-on-surface-variant pt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-surface-tint" />
              <span>Tailored to your repositories</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-surface-tint" />
              <span>Dynamic follow-up questions</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-surface-tint" />
              <span>Zero generic question banks</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Realistic Interview Interface Preview */}
        <motion.div
          className="lg:col-span-6"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
        >
          <div className="relative rounded-2xl bg-mn-background/90 border border-outline-variant/80 shadow-2xl overflow-hidden backdrop-blur-md">
            {/* Window Header / Titlebar */}
            <div className="px-4 py-3 bg-surface-container border-b border-outline-variant/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]/80" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]/80" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F]/80" />
                <div className="h-4 w-[1px] bg-border mx-1" />
                <span className="text-xs font-mono text-foreground/80 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-surface-tint" />
                  Mimir Interview
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-surface-tint/10 text-surface-tint border border-surface-tint/20">
                  <GitBranch className="w-3 h-3" />
                  auth-service/main
                </span>
                <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface-variant border border-outline-variant">
                  Preview
                </span>
              </div>
            </div>

            {/* Conversation Flow */}
            <div className="p-5 md:p-6 space-y-4 font-sans text-sm">
              {/* Interviewer Question 1 */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-mono text-surface-tint">
                  <span className="font-semibold">Interviewer</span>
                  <span className="text-muted-foreground/60 text-[10px]">Architecture Analysis</span>
                </div>
                <div className="p-3.5 rounded-xl bg-surface-container border border-outline-variant/60 text-foreground/90 leading-relaxed font-body-md">
                  &ldquo;I noticed you used Redis for caching in <code className="text-surface-tint bg-surface-container-high px-1 py-0.5 rounded text-xs font-mono">auth-service</code>. Why did you choose Redis instead of relying entirely on PostgreSQL?&rdquo;
                </div>
              </div>

              {/* Candidate Response 1 */}
              <div className="space-y-1.5 flex flex-col items-end">
                <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                  <span className="text-[10px]">You</span>
                </div>
                <div className="p-3.5 rounded-xl bg-primary/10 border border-primary/25 text-foreground/95 max-w-[92%] leading-relaxed font-body-md text-right">
                  &ldquo;I used Redis because our token blacklist verification had to run on every incoming request. Offloading active session checks kept Postgres connection pools free for transactional writes.&rdquo;
                </div>
              </div>

              {/* Interviewer Follow-up (Adaptive) */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-mono text-surface-tint">
                  <span className="font-semibold">Interviewer</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-surface-tint/15 text-surface-tint font-mono">
                    Adaptive Follow-Up
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-surface-container border border-surface-tint/30 text-foreground/90 leading-relaxed font-body-md">
                  &ldquo;That handles connection exhaustion. But what happens if Redis experiences a cluster split or cache stampede when 10,000 users re-authenticate at once?&rdquo;
                </div>
              </div>

              {/* Live typing / indicator */}
              <div className="pt-2 flex items-center justify-between border-t border-outline-variant/40 text-xs text-muted-foreground font-mono">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-surface-tint animate-pulse" />
                  Candidate answering in real-time...
                </span>
                <span className="text-[11px] text-surface-tint/80">
                  Questions adapt to your decisions
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
