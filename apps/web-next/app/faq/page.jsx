"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/components/ui/accordion";
import { HelpCircle, Mail } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
const FAQ = () => {
    const faqs = [
        {
            question: "How accurate is the CGPA calculator?",
            answer: "The CGPA calculator uses standard academic weighted credit formulas to provide mathematically rigorous calculations. It accounts for course credits and grade points to compute cumulative GPA and predict future semester targets.",
        },
        {
            question: "How does the Pomodoro Timer work?",
            answer: "The Pomodoro Timer follows the proven focus technique with 25-minute concentrated work sprints followed by 5-minute rejuvenating breaks. After completing 4 cycles, you receive a longer 15-minute break with customizable intervals and soundscapes.",
        },
        {
            question: "Are the Roadmaps customizable?",
            answer: "Yes, our Roadmaps are designed to be flexible. While we provide curated learning pathways for various tech domains, you can follow them according to your custom schedule and pacing.",
        },
        {
            question: "Is my data secure and private?",
            answer: "We take data privacy seriously. All your academic calculations and timer settings are processed locally in your browser storage. We do not sell or distribute user information.",
        },
        {
            question: "How do I access the Placement DSA questions?",
            answer: "The Placement DSA vault contains curated questions from 190+ top tech companies. You can filter by company, difficulty, or topic. All questions are freely accessible and include frequency ranks and acceptance rate statistics.",
        },
        {
            question: "Can I use Mimir Nest offline?",
            answer: "Core tools like the Pomodoro Timer, Typing Practice, and CGPA Calculator work offline once loaded into your browser cache.",
        },
        {
            question: "Is Mimir Nest free to use?",
            answer: "Yes! Mimir Nest is 100% free and open-source. All our calculators, timers, curriculums, and interview archives are accessible without paywalls.",
        },
        {
            question: "How often is the content updated?",
            answer: "We continuously update our company question sets, course catalog, and student perks database as new resources and interview trends emerge.",
        },
        {
            question: "Can I contribute to the platform?",
            answer: "Absolutely! We welcome open-source contributions. You can submit questions, build features, report issues, or suggest new toolkits via our GitHub repository.",
        },
        {
            question: "What browsers are supported?",
            answer: "Mimir Nest is optimized for all modern web browsers including Chrome, Firefox, Safari, Edge, and mobile web clients.",
        },
    ];
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
            <HelpCircle className="w-4 h-4 text-surface-tint"/>
            <span>Knowledge Base & Support</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-primary leading-tight">
            Frequently Asked <br />
            <span className="text-surface-tint">Questions.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-body-lg text-body-lg text-on-primary/80 max-w-2xl mx-auto leading-relaxed">
            Find comprehensive answers about Mimir Nest's tools, calculations, interview archives, and student benefits.
          </motion.p>
        </div>
      </section>

      {/* ── FAQ Accordion Section ── */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (<AccordionItem key={index} value={`item-${index}`} className="bg-surface-container-lowest border border-outline-variant/40 rounded-[24px] px-6 md:px-8 shadow-sm hover:border-surface-tint/60 transition-colors">
              <AccordionTrigger className="text-mn-primary hover:text-surface-tint text-left py-6 text-base md:text-lg font-bold font-headline-md">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-on-surface-variant pb-6 text-sm font-body-md leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>))}
        </Accordion>

        {/* ── Support Card ── */}
        <div className="mt-16 bg-primary-container text-on-primary rounded-[32px] p-8 md:p-12 text-center relative overflow-hidden shadow-xl space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center mx-auto text-surface-tint mb-2 shadow-inner">
            <Mail className="w-6 h-6"/>
          </div>
          <h2 className="font-headline-lg text-2xl md:text-3xl font-bold text-on-primary">
            Still Have Questions?
          </h2>
          <p className="text-on-primary/70 font-body-md text-sm max-w-md mx-auto">
            Our student support team is always available to help answer your queries or assist with tool feedback.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <a href="mailto:support@mimirnest.tech">
              <Button className="bg-surface-container-lowest text-mn-primary hover:bg-white rounded-full px-8 py-6 font-label-caps text-xs tracking-widest uppercase shadow-md hover:scale-105 transition-all">
                <span>Contact Support</span>
              </Button>
            </a>
            <Link href="/">
              <Button variant="outline" className="border-white/30 text-on-primary hover:bg-white/10 rounded-full px-8 py-6 font-label-caps text-xs tracking-widest uppercase">
                <span>Back to Home</span>
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>);
};
export default FAQ;
