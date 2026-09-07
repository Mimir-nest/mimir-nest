"use client";

import React from "react";
import { ArrowRight, Sparkles, Mic, Radio, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import InterviewOrb from "./InterviewOrb";

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
    <section className="relative bg-surface-container pt-[100px] sm:pt-[120px] md:pt-[150px] pb-16 sm:pb-20 md:pb-[110px] px-4 sm:px-6 md:px-12 lg:px-16 overflow-hidden rounded-b-3xl border-b border-border/40 max-w-full">
      {/* Subtle Technical Ambient Geometry */}
      <div className="absolute top-0 right-0 w-[350px] sm:w-[700px] h-[350px] sm:h-[700px] rounded-full border border-surface-tint/10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full border border-surface-tint/5 -translate-x-1/2 translate-y-1/2 pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#24252515_1px,transparent_1px),linear-gradient(to_bottom,#24252515_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 relative z-10 items-center">
        {/* Left Column: Copy & CTAs */}
        <div className="lg:col-span-6 flex flex-col gap-5 sm:gap-6">
          {/* Coming Soon Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-surface-container-high border border-surface-tint/30 w-fit max-w-full backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-surface-tint opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-surface-tint" />
            </span>
            <span className="font-label-caps text-[10px] sm:text-[11px] text-surface-tint tracking-widest uppercase font-semibold truncate">
              COMING SOON · MIMIR ECOSYSTEM
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            className="font-headline-lg text-2xl sm:text-4xl lg:text-5xl font-extrabold text-on-background tracking-tight leading-[1.18] break-words"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            Your GitHub becomes <br className="hidden sm:block" />
            <span className="text-surface-tint">your interview.</span>
          </motion.h1>

          {/* Supporting Headline */}
          <motion.p
            className="text-base sm:text-lg md:text-xl font-medium text-foreground/90 leading-snug"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
          >
            Practice with an AI interviewer that actually knows what you built.
          </motion.p>

          {/* Supporting Copy */}
          <motion.p
            className="font-body-md text-sm sm:text-base text-on-surface-variant max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
          >
            Connect your GitHub, choose a project, and sit through a live voice-first mock interview built around your actual code, architecture, decisions, and engineering experience. An interviewer that has actually read your project—so you don&apos;t just memorize answers, you defend what you built.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 pt-2 w-full sm:w-auto"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.25 }}
          >
            <button
              onClick={scrollToEarlyAccess}
              className="w-full sm:w-auto bg-primary text-primary-foreground px-7 py-3.5 rounded-xl font-label-caps text-sm hover:scale-[1.02] active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 tracking-wider font-semibold shadow-lg shadow-primary/20 border-none cursor-pointer"
            >
              Get Early Access
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={scrollToHowItWorks}
              className="w-full sm:w-auto bg-surface-container-high hover:bg-surface-container-highest border border-outline-variant/60 text-foreground px-6 py-3.5 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              See How It Works
            </button>
          </motion.div>

          {/* Value props */}
          <motion.div
            className="flex flex-wrap items-center gap-y-2 gap-x-5 sm:gap-x-6 text-xs text-on-surface-variant pt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <div className="flex items-center gap-1.5">
              <Mic className="w-3.5 h-3.5 text-surface-tint shrink-0" />
              <span>Voice-first live session</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-surface-tint shrink-0" />
              <span>Contextual AI presence</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-surface-tint shrink-0" />
              <span>Defend what you built</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Siri Orb Live AI Interviewer Presence */}
        <motion.div
          className="lg:col-span-6 flex items-center justify-center w-full"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.2 }}
        >
          <div className="w-full max-w-md p-4 sm:p-8 rounded-3xl bg-mn-background/80 border border-outline-variant/80 shadow-2xl backdrop-blur-md relative overflow-hidden flex flex-col items-center justify-center">
            <InterviewOrb
              size="180px"
              initialState="listening"
              interactive={true}
              showControls={true}
              project="distributed-cache"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
