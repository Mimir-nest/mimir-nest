"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sparkles, ArrowRight, Compass } from "lucide-react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const ParticleWave = dynamic(
  () => import("@/components/ui/particle-wave").then((mod) => mod.ParticleWave),
  { ssr: false }
);

const Roadmaps = () => {
    return (<div className="min-h-screen bg-mn-background text-on-background flex flex-col justify-between selection:bg-surface-tint/30 relative">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center px-6 pt-32 pb-24 relative overflow-hidden">
        {/* Background Particle Wave */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
          <ParticleWave />
        </div>

        {/* Background ambient elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-surface-tint/10 pointer-events-none"/>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-surface-tint/15 pointer-events-none"/>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-xl mx-auto text-center bg-surface-container-lowest rounded-[40px] shadow-[0_24px_64px_rgba(0,19,8,0.08)] p-6 sm:p-10 md:p-14 border border-outline-variant/40 relative z-10 space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-surface-container flex items-center justify-center mx-auto text-surface-tint border border-surface-tint/20 shadow-inner">
            <Compass className="w-8 h-8 animate-spin-slow"/>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container text-xs font-label-caps text-surface-tint tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5"/>
            <span>Interactive Roadmaps</span>
          </div>

          <h1 className="font-display-lg text-display-lg-mobile text-foreground leading-tight font-bold">
            Structured Pathways <br />
            <span className="text-surface-tint">Coming Soon.</span>
          </h1>

          <p className="text-on-surface-variant font-body-md text-sm sm:text-base leading-relaxed max-w-md mx-auto">
            We are engineering expertly curated, sequential learning paths for frontend, backend, AI/ML, DevOps, and systems design.
          </p>

          <div className="pt-2">
            <Link href="/">
              <Button className="bg-primary text-primary-foreground px-8 py-6 rounded-lg font-label-caps text-xs tracking-widest uppercase hover:opacity-90 transition-all font-semibold border-none">
                <span>Back to Academic Sanctuary</span>
                <ArrowRight className="w-4 h-4 ml-2"/>
              </Button>
            </Link>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>);
};
export default Roadmaps;
