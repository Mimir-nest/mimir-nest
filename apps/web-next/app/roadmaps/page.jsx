"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { PixelScene } from "@/components/pixel";


const Roadmaps = () => {
    return (<div className="min-h-screen bg-mn-background text-on-background flex flex-col justify-between selection:bg-surface-tint/30 relative">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center px-6 pt-32 pb-24 relative overflow-hidden pixel-grid">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="pop w-full max-w-xl mx-auto text-center bg-panel rounded-3xl overflow-hidden relative z-10">
          <PixelScene kind="build" h={90} />
          <div className="p-6 sm:p-10 space-y-6 border-t-2 border-pop">
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
              <Button className="px-6">
                <span>Back to Academic Sanctuary</span>
                <ArrowRight className="w-4 h-4 ml-2"/>
              </Button>
            </Link>
          </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>);
};
export default Roadmaps;
