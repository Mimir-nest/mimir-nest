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
    <section className="relative bg-surface-container pt-[120px] md:pt-[160px] pb-24 md:pb-[120px] px-6 md:px-16 overflow-hidden rounded-b-3xl">
      {/* Background Particle Wave */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-65">
        <ParticleWave />
      </div>

      {/* Decorative Rings */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full border border-surface-tint/10 translate-x-1/4 -translate-y-1/4 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full border border-surface-tint/15 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full border-2 border-primary-container/35 -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10 items-center">
        {/* Hero Copy */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg glass-panel w-fit"
          >
            <Sparkles className="w-4 h-4 text-surface-tint" />
            <a
              href="https://github.com/Mimir-nest/mimir-nest"
              target="_blank"
              rel="noopener noreferrer"
              className="font-label-caps text-label-caps text-surface-tint hover:underline transition-all tracking-widest uppercase font-semibold"
            >
              Open source. Free to use.
            </a>
          </motion.div>

          <motion.h1
            className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-background leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Everything you need
            <br />
            <span className="text-surface-tint">for college.</span>
          </motion.h1>

          <motion.p
            className="font-body-lg text-body-lg text-on-background/80 max-w-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Study smarter, prepare for placements, build projects, and find useful resources — all in one free platform.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 mt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <button
              onClick={scrollToFeatures}
              className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-label-caps text-label-caps hover:scale-[1.02] transition-all flex items-center justify-center gap-2 tracking-widest font-semibold border-none cursor-pointer"
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

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              "8+ Student Tools",
              "50+ Learning Resources",
              "Open Source",
              "Free to Use"
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="font-label-caps text-label-caps text-on-background/45 tracking-widest uppercase">
                  {stat}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Hero Floating Cards (desktop only) */}
        <div className="lg:col-span-6 relative h-[500px] mt-12 lg:mt-0 hidden md:block">
          {/* Main hero logo card */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-[380px] rounded-2xl overflow-hidden border border-border/45 bg-surface-container flex items-center justify-center">
            <img
              src="/logo/logo.png"
              alt="Mimir Nest Logo"
              className="w-48 h-auto object-contain brightness-95"
            />
          </div>

          {/* Floating Stat Card 1 — Resources */}
          <div className="absolute top-10 right-0 glass-panel p-5 rounded-xl shadow-[0_8px_20px_rgba(0,0,0,0.3)] animate-float">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-lg bg-surface-tint/60 flex items-center justify-center">
                <Library className="w-4 h-4 text-primary-foreground" strokeWidth={2.5} />
              </div>
              <span className="font-label-caps text-label-caps text-on-background/70 tracking-widest">
                Resources
              </span>
            </div>
            <h3 className="font-headline-lg text-headline-lg text-on-background">50+</h3>
          </div>

          {/* Floating Stat Card 2 — Student Tools */}
          <div className="absolute bottom-10 left-0 bg-surface-container-lowest p-5 rounded-xl shadow-[0_8px_20px_rgba(0,0,0,0.3)] border border-border/40 animate-float-reverse">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-lg bg-primary-container flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary" strokeWidth={2.5} />
              </div>
              <span className="font-label-caps text-label-caps text-on-background/70 tracking-widest">
                Student Tools
              </span>
            </div>
            <h3 className="font-headline-lg text-headline-lg text-on-background">8+</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
