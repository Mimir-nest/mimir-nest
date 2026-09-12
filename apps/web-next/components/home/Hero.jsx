"use client";

import { ArrowRight, Sparkles, Code, Library } from "lucide-react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const ParticleWave = dynamic(
  () => import("@/components/ui/particle-wave").then((mod) => mod.ParticleWave),
  { ssr: false }
);

const Hero = () => {
  const router = useRouter();

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative bg-surface-container pt-[120px] md:pt-[160px] pb-20 md:pb-[120px] px-6 md:px-16 overflow-hidden rounded-b-3xl">
      {/* Background Particle Wave */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <ParticleWave />
      </div>

      {/* Decorative Background Glows */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full border border-surface-tint/10 translate-x-1/4 -translate-y-1/4 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full border border-surface-tint/15 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full border-2 border-primary-container/35 -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 items-center">
        {/* Hero Copy */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-high/90 border border-surface-tint/40 shadow-sm backdrop-blur-md w-fit"
          >
            <Sparkles className="w-4 h-4 text-surface-tint" />
            <span className="font-label-caps text-xs md:text-sm text-surface-tint tracking-widest uppercase font-bold">
              Everything You Need to Learn, Build & Launch
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight drop-shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Everything you need
            <br />
            <span className="text-surface-tint font-black">for college.</span>
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg text-white/90 max-w-lg leading-relaxed font-normal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            MimirNest is an open-source platform built to help students learn, build, and launch. Study smarter, prepare for placements, build projects, and find useful resources — all 100% free.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 mt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <button
              onClick={scrollToFeatures}
              className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-label-caps text-sm hover:scale-[1.02] transition-all flex items-center justify-center gap-2 tracking-widest font-bold border-none cursor-pointer shadow-lg shadow-primary/20"
            >
              Explore Tools
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => router.push("/email-perks")}
              className="bg-surface-container-lowest border border-border/80 text-white px-8 py-4 rounded-xl font-label-caps text-sm hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2 tracking-widest font-bold cursor-pointer"
            >
              <Code className="w-5 h-5 text-surface-tint" />
              View Resources
            </button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-border/40 mt-2"
          >
            {[
              "8+ Student Tools",
              "50+ Learning Resources",
              "100% Open Source",
              "Build & Launch"
            ].map((stat, i) => (
              <div key={i} className="text-center sm:text-left">
                <p className="font-label-caps text-xs text-white/80 font-bold tracking-wider uppercase">
                  {stat}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Hero Floating Cards (desktop only) */}
        <div className="lg:col-span-6 relative h-[480px] mt-12 lg:mt-0 hidden md:block">
          {/* Main hero logo card */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-[360px] rounded-2xl overflow-hidden border border-border/60 bg-surface-container-lowest flex items-center justify-center shadow-2xl">
            <img
              src="/logo/logo.png"
              alt="Mimir Nest Logo"
              className="w-48 h-auto object-contain brightness-105"
            />
          </div>

          {/* Floating Stat Card 1 — Resources */}
          <div className="absolute top-8 right-0 glass-panel p-5 rounded-xl shadow-2xl border border-white/10 animate-float z-20">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-lg bg-surface-tint flex items-center justify-center shadow-md">
                <Library className="w-4 h-4 text-primary-foreground" strokeWidth={2.5} />
              </div>
              <span className="font-label-caps text-xs text-white/80 font-bold tracking-widest uppercase">
                Resources
              </span>
            </div>
            <h3 className="text-3xl font-extrabold text-white">50+</h3>
          </div>

          {/* Floating Stat Card 2 — Student Tools */}
          <div className="absolute bottom-8 left-0 bg-surface-container-lowest p-5 rounded-xl shadow-2xl border border-border/80 animate-float-reverse z-20">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-lg bg-primary-container border border-surface-tint/30 flex items-center justify-center shadow-md">
                <Sparkles className="w-4 h-4 text-surface-tint" strokeWidth={2.5} />
              </div>
              <span className="font-label-caps text-xs text-white/80 font-bold tracking-widest uppercase">
                Student Tools
              </span>
            </div>
            <h3 className="text-3xl font-extrabold text-white">8+</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
