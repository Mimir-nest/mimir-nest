"use client";

import { ArrowRight, Code } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative bg-surface-container pt-[120px] md:pt-[160px] pb-24 md:pb-[120px] px-6 md:px-16 overflow-hidden rounded-b-3xl">
      {/* Decorative Rings */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full border border-surface-tint/10 translate-x-1/4 -translate-y-1/4 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full border border-surface-tint/15 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full border-2 border-primary-container/35 -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10 items-center">
        {/* Hero Copy */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          {/* Subtle Open Source Statement */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-outline-variant/40 bg-surface-container-low w-fit"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <a
              href="https://github.com/Mimir-nest/mimir-nest"
              target="_blank"
              rel="noopener noreferrer"
              className="font-label-caps text-xs text-on-surface-variant hover:text-surface-tint transition-colors tracking-wider font-semibold"
            >
              Open source. Free to use.
            </a>
          </motion.div>

          <motion.h1
            className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-background leading-tight"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            Everything you need
            <br />
            <span className="text-surface-tint">for college.</span>
          </motion.h1>

          <motion.p
            className="font-body-lg text-body-lg text-on-background/80 max-w-lg leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            Study smarter, prepare for placements, build projects, and find useful resources — all in one free platform.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 mt-2"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <button
              onClick={scrollToFeatures}
              className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-label-caps text-label-caps hover:opacity-95 transition-opacity flex items-center justify-center gap-2 tracking-widest font-semibold border-none cursor-pointer"
            >
              Explore Tools
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => router.push("/email-perks")}
              className="bg-surface-container-lowest border border-border text-on-background px-8 py-4 rounded-xl font-label-caps text-label-caps hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2 tracking-widest font-semibold cursor-pointer"
            >
              <Code className="w-5 h-5 text-surface-tint" />
              View Resources
            </button>
          </motion.div>

          {/* Simple Factual Highlights */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="pt-8 border-t border-outline-variant/30 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              "8+ Student Tools",
              "50+ Learning Resources",
              "Open Source",
              "Free to Use"
            ].map((stat, i) => (
              <div key={i} className="text-left">
                <p className="font-label-caps text-xs text-on-surface-variant/70 tracking-widest uppercase font-semibold">
                  {stat}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Hero Logo Card (Clean, desktop only) */}
        <div className="lg:col-span-6 relative h-[450px] mt-12 lg:mt-0 hidden lg:flex items-center justify-center">
          <div className="w-3/4 h-[350px] rounded-2xl border border-border/45 bg-surface-container flex items-center justify-center shadow-sm">
            <img
              src="/logo/logo.png"
              alt="Mimir Nest Logo"
              className="w-44 h-auto object-contain brightness-95"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
