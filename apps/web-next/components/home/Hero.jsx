"use client";

import { ArrowRight, Sparkles, Code, Library } from "lucide-react";
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
    return (<section className="relative bg-mn-primary pt-[120px] md:pt-[160px] pb-24 md:pb-[120px] px-6 md:px-16 overflow-hidden rounded-b-[40px] md:rounded-b-[80px]">
      {/* Decorative Rings */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full border border-surface-tint/20 translate-x-1/4 -translate-y-1/4 pointer-events-none"/>
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full border border-surface-tint/30 translate-x-1/3 -translate-y-1/3 pointer-events-none"/>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full border-2 border-primary-container/50 -translate-x-1/2 translate-y-1/2 pointer-events-none"/>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10 items-center">
        {/* Hero Copy */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel w-fit">
            <Sparkles className="w-4 h-4 text-surface-tint"/>
            <span className="font-label-caps text-label-caps text-surface-tint tracking-widest">
              Elevated Learning
            </span>
          </motion.div>

          <motion.h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-primary leading-tight" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            Master Your
            <br />
            <span className="text-surface-tint">Academic Journey.</span>
          </motion.h1>

          <motion.p className="font-body-lg text-body-lg text-on-primary/80 max-w-lg leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            Mimir Nest brings together everything you need. From{" "}
            <span className="text-on-primary font-semibold">CGPA calculation</span> to{" "}
            <span className="text-on-primary font-semibold">placement prep</span> and{" "}
            <span className="text-on-primary font-semibold">exclusive perks</span>.
          </motion.p>

          <motion.div className="flex flex-col sm:flex-row gap-4 mt-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
            <button onClick={scrollToFeatures} className="bg-surface-container-lowest text-mn-primary px-8 py-4 rounded-full font-label-caps text-label-caps hover:scale-105 transition-transform shadow-lg flex items-center justify-center gap-2 tracking-widest">
              Explore Library
              <ArrowRight className="w-4 h-4"/>
            </button>
            <button onClick={() => router.push("/placement-dsa")} className="glass-panel text-on-primary px-8 py-4 rounded-full font-label-caps text-label-caps hover:bg-white/10 transition-colors flex items-center justify-center gap-2 tracking-widest">
              <Code className="w-5 h-5"/>
              Placement DSA
            </button>
          </motion.div>

          {/* Stats row */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 1 }} className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            {["50k+ Students", "100+ Colleges", "Premium Tools", "100% Free"].map((stat, i) => (<div key={i} className="text-center">
                  <p className="font-label-caps text-label-caps text-on-primary/40 tracking-widest uppercase">
                    {stat}
                  </p>
                </div>))}
          </motion.div>
        </div>

        {/* Hero Floating Cards (desktop only) */}
        <div className="lg:col-span-6 relative h-[500px] mt-12 lg:mt-0 hidden md:block">
          {/* Main hero video card */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-[380px] rounded-[32px] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.35)]">
            <video src="/logo/v1.mp4" autoPlay muted loop playsInline className="w-full h-full object-cover"/>
          </div>

          {/* Floating Stat Card 1 — Resources */}
          <div className="absolute top-10 right-0 glass-panel p-6 rounded-[24px] shadow-[0_10px_30px_rgba(0,0,0,0.2)] animate-float">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-surface-tint/60 flex items-center justify-center">
                <Library className="w-5 h-5 text-on-primary" strokeWidth={2}/>
              </div>
              <span className="font-label-caps text-label-caps text-on-primary/70 tracking-widest">Resources</span>
            </div>
            <h3 className="font-headline-lg text-headline-lg text-on-primary">15,000+</h3>
          </div>

          {/* Floating Stat Card 2 — Instructors */}
          <div className="absolute bottom-10 left-0 bg-surface-container-lowest p-6 rounded-[24px] shadow-[0_10px_30px_rgba(10,42,26,0.15)] animate-float-reverse">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-fixed" strokeWidth={2}/>
              </div>
              <span className="font-label-caps text-label-caps text-mn-primary/70 tracking-widest">Premium Tools</span>
            </div>
            <h3 className="font-headline-lg text-headline-lg text-mn-primary">Top 1%</h3>
          </div>
        </div>
      </div>
    </section>);
};
export default Hero;
