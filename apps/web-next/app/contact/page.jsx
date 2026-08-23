"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Mail, HelpCircle, Bug, GitBranch, Shield, Github, Linkedin, Sparkles } from "lucide-react";
import dynamic from "next/dynamic";

const ParticleWave = dynamic(
  () => import("@/components/ui/particle-wave").then((mod) => mod.ParticleWave),
  { ssr: false }
);

const Contact = () => {
  const contactCategories = [
    {
      icon: HelpCircle,
      title: "General questions",
      desc: "Questions about Mimir Nest, feature scopes, or resource lists."
    },
    {
      icon: Bug,
      title: "Bug reports",
      desc: "For technical problems, include the page, what happened, and steps to reproduce it."
    },
    {
      icon: GitBranch,
      title: "Contributions",
      desc: "For sharing ideas, proposing roadmap improvements, or contribution questions."
    },
    {
      icon: Shield,
      title: "Security",
      desc: "For security vulnerabilities, please check our security reporting page instead of a public issue."
    }
  ];

  return (
    <div className="min-h-screen bg-mn-background text-on-background selection:bg-surface-tint/30 flex flex-col justify-between">
      <div>
        <Navbar />

        {/* Hero Section */}
        <section className="relative bg-surface-container pt-[120px] md:pt-[150px] pb-16 md:pb-24 px-6 md:px-16 overflow-hidden rounded-b-3xl">
          {/* Background Particle Wave */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-25">
            <ParticleWave />
          </div>

          {/* Decorative Rings */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full border border-surface-tint/15 translate-x-1/4 -translate-y-1/4 pointer-events-none" />
          <div className="absolute top-0 right-0 w-[550px] h-[550px] rounded-full border border-surface-tint/20 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full border border-primary-container/40 -translate-x-1/2 translate-y-1/2 pointer-events-none" />

          <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-xs font-label-caps text-surface-tint tracking-widest uppercase mx-auto font-semibold">
              <Sparkles className="w-4 h-4 text-surface-tint" />
              <span>Get In Touch</span>
            </div>

            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-foreground leading-tight">
              Get in touch.
            </h1>

            <p className="font-body-lg text-body-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Have a question, found a problem, or want to contribute to Mimir Nest? We'd like to hear from you.
            </p>
          </div>
        </section>

        {/* Document Body */}
        <main className="max-w-4xl mx-auto px-6 py-16">
          <div className="bg-surface-container-lowest rounded-[40px] border border-outline-variant/40 p-6 sm:p-10 md:p-14 shadow-sm space-y-10">
            
            {/* Primary Contact */}
            <div className="space-y-4 text-center">
              <h2 className="text-xl font-bold text-mn-primary font-headline-md flex items-center justify-center gap-2.5">
                <Mail className="w-5 h-5 text-surface-tint" />
                <span>Primary contact</span>
              </h2>
              <p className="text-sm text-on-surface-variant font-body-md leading-relaxed max-w-sm mx-auto">
                Email us directly with your inquiry, and we will get back to you as soon as possible.
              </p>
              <div className="pt-2">
                <a
                  href="mailto:mimirnest@gmail.com"
                  className="inline-block text-xl font-bold text-surface-tint hover:underline"
                >
                  mimirnest@gmail.com
                </a>
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-6 pt-8 border-t border-outline-variant/30">
              <h2 className="text-sm font-label-caps text-on-surface-variant/70 tracking-widest uppercase font-semibold text-center mb-6">
                Inquiry categories
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {contactCategories.map((cat, i) => {
                  const Icon = cat.icon;
                  return (
                    <div key={i} className="p-5 rounded-2xl bg-surface-container border border-outline-variant/30 space-y-2">
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4.5 h-4.5 text-surface-tint" />
                        <h3 className="text-sm font-bold text-foreground">{cat.title}</h3>
                      </div>
                      <p className="text-xs text-on-surface-variant leading-relaxed font-body-md">
                        {cat.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Project Links */}
            <div className="pt-8 border-t border-outline-variant/30 text-center space-y-4">
              <p className="text-sm text-on-surface-variant font-body-md leading-relaxed">
                You can also connect with the project repository or its creator online:
              </p>
              <div className="flex justify-center gap-6 pt-2">
                <a
                  href="https://github.com/Mimir-nest/mimir-nest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-surface-tint font-body-md transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/sachinskyte"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-surface-tint font-body-md transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>Sachin Patel</span>
                </a>
              </div>
            </div>

          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
