"use client";

import { useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { AlertCircle, RotateCcw, Home, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error securely on the server/telemetry instead of dumping stack trace to public UI
    console.error("Application Runtime Boundary Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-mn-background text-on-background flex flex-col justify-between selection:bg-surface-tint/30">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center px-6 pt-32 pb-24 relative overflow-hidden">
        {/* Background ambient rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-surface-tint/10 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-surface-tint/15 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg mx-auto text-center bg-surface-container-lowest rounded-2xl p-10 md:p-14 border border-border/50 relative z-10 space-y-6"
        >
          <div className="w-16 h-16 rounded-xl bg-surface-container flex items-center justify-center mx-auto text-surface-tint border border-surface-tint/20 shadow-inner">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container text-xs font-label-caps text-surface-tint tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Runtime Exception</span>
          </div>

          <h1 className="font-display-lg text-4xl md:text-5xl font-bold text-foreground leading-tight">
            Something went <span className="text-surface-tint">wrong.</span>
          </h1>

          <p className="text-on-surface-variant font-body-md text-sm leading-relaxed max-w-sm mx-auto">
            Something unexpected happened. Please try again.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => reset()}
              className="bg-primary text-primary-foreground px-8 py-6 rounded-lg font-label-caps text-xs tracking-widest uppercase hover:opacity-90 transition-all font-semibold border-none w-full sm:w-auto flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Try again</span>
            </Button>
            <Link href="/">
              <Button
                variant="outline"
                className="border border-border bg-surface-container-lowest text-on-background px-8 py-6 rounded-lg font-label-caps text-xs tracking-widest uppercase hover:bg-surface-container-high transition-colors font-semibold w-full sm:w-auto flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                <span>Back home</span>
              </Button>
            </Link>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
