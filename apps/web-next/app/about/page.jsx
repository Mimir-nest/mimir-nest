"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { GraduationCap, Target, Users, Zap, Sparkles, Compass } from "lucide-react";
import { motion } from "framer-motion";
const About = () => {
    return (<div className="min-h-screen bg-mn-background text-on-background selection:bg-surface-tint/30">
      <Navbar />

      {/* ── Deep Green Sanctuary Hero ── */}
      <section className="relative bg-mn-primary pt-[120px] md:pt-[150px] pb-16 md:pb-24 px-6 md:px-16 overflow-hidden rounded-b-[40px] md:rounded-b-[80px]">
        {/* Decorative Rings */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full border border-surface-tint/15 translate-x-1/4 -translate-y-1/4 pointer-events-none"/>
        <div className="absolute top-0 right-0 w-[550px] h-[550px] rounded-full border border-surface-tint/20 translate-x-1/3 -translate-y-1/3 pointer-events-none"/>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full border border-primary-container/40 -translate-x-1/2 translate-y-1/2 pointer-events-none"/>

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-xs font-label-caps text-surface-tint tracking-widest uppercase mx-auto">
            <Sparkles className="w-4 h-4 text-surface-tint"/>
            <span>Empowering Global Scholars</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-primary leading-tight">
            About <span className="text-surface-tint">Mimir Nest.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-body-lg text-body-lg text-on-primary/80 max-w-2xl mx-auto leading-relaxed">
            Your ultimate companion for academic mastery and elite placement preparation. 
            We engineer tools to make your university trajectory focused, accelerated, and fulfilling.
          </motion.p>
        </div>
      </section>

      {/* ── Mission Pillars Bento ── */}
      <section className="py-20 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-label-caps text-label-caps text-surface-tint tracking-widest block mb-2 uppercase">
            Four Core Pillars
          </span>
          <h2 className="font-headline-lg text-headline-lg text-mn-primary">
            Built For Complete Academic Success
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
                icon: GraduationCap,
                title: "Academic Excellence",
                desc: "Supporting students with high-precision calculation tools and structured curriculums.",
                accent: "bg-surface-container text-surface-tint",
            },
            {
                icon: Target,
                title: "Placement Mastery",
                desc: "Curated real-time company interview problem archives from 190+ tech companies.",
                accent: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
            },
            {
                icon: Users,
                title: "Global Cohort",
                desc: "Fostering collaboration, open-source project building, and peer learning networks.",
                accent: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
            },
            {
                icon: Zap,
                title: "Focus Productivity",
                desc: "Deep focus timers, soundscapes, and speed assessments engineered for peak performance.",
                accent: "bg-primary/10 text-primary border border-primary/20",
            },
        ].map((item, index) => {
            const Icon = item.icon;
            return (<motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="group p-8 rounded-2xl bg-surface-container-lowest border border-border/60 hover:border-surface-tint/60 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className={`w-14 h-14 rounded-2xl ${item.accent} flex items-center justify-center mb-6 group-hover:scale-105 transition-transform`}>
                    <Icon className="h-7 w-7"/>
                  </div>
                  <h3 className="text-lg font-bold text-mn-primary mb-2.5 group-hover:text-surface-tint transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-on-surface-variant font-body-md text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>);
        })}
        </div>
      </section>

      {/* ── Story Section Bento ── */}
      <section className="py-12 px-6 md:px-16 max-w-5xl mx-auto">
        <div className="bg-surface-container-lowest rounded-[40px] p-8 md:p-14 border border-outline-variant/40 shadow-[0_20px_50px_rgba(0,19,8,0.06)] relative overflow-hidden">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-surface-container text-surface-tint text-xs font-label-caps tracking-widest uppercase mb-3">
              <Compass className="w-3.5 h-3.5"/>
              Our Origin
            </span>
            <h2 className="font-headline-lg text-headline-lg text-mn-primary">
              The Genesis of Mimir Nest
            </h2>
          </div>

          <div className="space-y-6 text-base text-on-surface-variant font-body-md leading-relaxed max-w-3xl mx-auto">
            <p>
              Mimir Nest was born from the vision of making every student's
              academic journey more manageable and successful. We understand the
              challenges that students face — from managing coursework and
              tracking grades to preparing for placements and staying
              productive.
            </p>
            <p>
              Our platform brings together essential tools like placement DSA archives, 
              CGPA calculators, Pomodoro timers, and verified student perks all in one unified digital sanctuary. 
              We believe that by providing students with the right tools, we can help them achieve their full potential.
            </p>
            <p>
              Today, Mimir Nest serves students worldwide, helping them stay
              organized, motivated, and prepared for high-impact technical careers.
            </p>
          </div>
        </div>
      </section>

      {/* ── Core Values Section ── */}
      <section className="py-20 px-6 md:px-16 max-w-5xl mx-auto pb-28">
        <div className="text-center mb-14">
          <span className="font-label-caps text-label-caps text-surface-tint tracking-widest block mb-2 uppercase">
            Guiding Philosophy
          </span>
          <h2 className="font-headline-lg text-headline-lg text-mn-primary">
            Our Core Values
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
                title: "Student-Centric Architecture",
                desc: "Designed ground-up around the genuine daily workflows of university engineers.",
            },
            {
                title: "Quality & Reliability",
                desc: "Precision formulas, verified problem data, and lightning-fast local performance.",
            },
            {
                title: "Zero-Barrier Accessibility",
                desc: "100% free open-source tools with no paywalls or gated knowledge.",
            },
            {
                title: "Continuous Evolution",
                desc: "Regularly updated question databases, active community contributions, and modern UI.",
            },
        ].map((value, i) => (<motion.div key={i} whileHover={{ y: -4 }} className="p-8 rounded-[32px] bg-surface-container border border-outline-variant/40 hover:border-surface-tint/60 transition-all duration-300">
              <div className="w-2.5 h-2.5 rounded-full bg-surface-tint mb-4"/>
              <h3 className="text-lg font-bold text-mn-primary mb-2 font-headline-md">
                {value.title}
              </h3>
              <p className="text-on-surface-variant text-sm font-body-md leading-relaxed">
                {value.desc}
              </p>
            </motion.div>))}
        </div>
      </section>

      <Footer />
    </div>);
};
export default About;
