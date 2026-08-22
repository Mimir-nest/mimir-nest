"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Shield, Lock, Eye, FileText } from "lucide-react";
import { motion } from "framer-motion";
const PrivacyPolicy = () => {
    return (<div className="min-h-screen bg-mn-background text-on-background selection:bg-surface-tint/30">
      <Navbar />

      {/* ── Deep Green Sanctuary Hero ── */}
      <section className="relative bg-surface-container pt-[120px] md:pt-[150px] pb-16 md:pb-24 px-6 md:px-16 overflow-hidden rounded-b-3xl">
        {/* Decorative Rings */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full border border-surface-tint/15 translate-x-1/4 -translate-y-1/4 pointer-events-none"/>
        <div className="absolute top-0 right-0 w-[550px] h-[550px] rounded-full border border-surface-tint/20 translate-x-1/3 -translate-y-1/3 pointer-events-none"/>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full border border-primary-container/40 -translate-x-1/2 translate-y-1/2 pointer-events-none"/>

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-xs font-label-caps text-surface-tint tracking-widest uppercase mx-auto">
            <Shield className="w-4 h-4 text-surface-tint"/>
            <span>Data Transparency & Privacy</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display-lg text-display-lg-mobile md:text-display-lg text-foreground leading-tight">
            Privacy <span className="text-surface-tint">Policy.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-body-lg text-body-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </motion.p>
        </div>
      </section>

      {/* ── Document Body ── */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-surface-container-lowest rounded-[40px] border border-outline-variant/40 p-6 sm:p-10 md:p-14 shadow-[0_20px_50px_rgba(0,19,8,0.06)] space-y-10">
          {/* Introduction */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-mn-primary font-headline-md flex items-center gap-2.5">
              <FileText className="w-5 h-5 text-surface-tint"/>
              <span>1. Introduction</span>
            </h2>
            <p className="text-on-surface-variant font-body-md text-sm leading-relaxed">
              At Mimir Nest, we are committed to protecting your academic data and personal privacy. 
              This Privacy Policy details how our platform handles, stores, and safeguards your information when you access our tools.
            </p>
          </div>

          {/* Data Collected */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-mn-primary font-headline-md flex items-center gap-2.5">
              <Eye className="w-5 h-5 text-surface-tint"/>
              <span>2. Information We Collect</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-surface-container border border-outline-variant/30">
                <h3 className="text-sm font-bold text-mn-primary mb-2">Local Academic Data</h3>
                <ul className="text-xs text-on-surface-variant space-y-1.5 font-body-md">
                  <li>• CGPA course credits and semester grades</li>
                  <li>• Solved DSA problem checklist status</li>
                  <li>• Custom Pomodoro timer preferences</li>
                </ul>
              </div>
              <div className="p-5 rounded-2xl bg-surface-container border border-outline-variant/30">
                <h3 className="text-sm font-bold text-mn-primary mb-2">Technical Telemetry</h3>
                <ul className="text-xs text-on-surface-variant space-y-1.5 font-body-md">
                  <li>• Browser type and screen dimensions</li>
                  <li>• Anonymous performance analytics</li>
                  <li>• Client-side error logs</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Usage */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-mn-primary font-headline-md flex items-center gap-2.5">
              <Lock className="w-5 h-5 text-surface-tint"/>
              <span>3. How We Use Your Data</span>
            </h2>
            <ul className="text-sm text-on-surface-variant space-y-2 font-body-md list-disc list-inside">
              <li>To compute instant client-side GPA calculations and academic analytics</li>
              <li>To retain your solved question progress and timer streaks in your local browser storage</li>
              <li>To continuously refine and optimize our open-source tools and user experience</li>
            </ul>
          </div>

          {/* Security */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-mn-primary font-headline-md">4. Data Storage & Local Persistence</h2>
            <p className="text-sm text-on-surface-variant font-body-md leading-relaxed">
              Mimir Nest stores your problem solving records and timer configurations locally on your machine using browser LocalStorage. 
              No third-party trackers or external advertising SDKs are embedded into the core experience.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {["Local-First Storage", "Zero Advertising Trackers", "Encrypted HTTPS", "Open Source Auditable"].map((tag, i) => (<span key={i} className="px-3 py-1 rounded-full bg-surface-container text-xs font-semibold text-surface-tint border border-surface-tint/20">
                  {tag}
                </span>))}
            </div>
          </div>

          {/* Contact Strip */}
          <div className="pt-8 border-t border-outline-variant/30 text-center space-y-2">
            <h3 className="font-headline-md text-lg font-bold text-mn-primary">Privacy Questions?</h3>
            <p className="text-xs text-on-surface-variant">Reach out to our engineering team at:</p>
            <a href="mailto:privacy@mimirnest.tech" className="inline-block text-base font-bold text-surface-tint hover:underline">
              privacy@mimirnest.tech
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>);
};
export default PrivacyPolicy;
