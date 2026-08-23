"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  FileText,
  Terminal,
  GitBranch,
  HelpCircle,
  Sparkles,
  Info,
  Bug,
  Lightbulb,
  Database,
  Accessibility,
} from "lucide-react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const ParticleWave = dynamic(
  () => import("@/components/ui/particle-wave").then((mod) => mod.ParticleWave),
  { ssr: false }
);

const Contributing = () => {
  const waysToContribute = [
    {
      icon: Bug,
      title: "Bug fixes",
      desc: "Find and fix reproducible problems."
    },
    {
      icon: Lightbulb,
      title: "Features",
      desc: "Propose or implement improvements that provide clear value to students."
    },
    {
      icon: Database,
      title: "Content",
      desc: "Improve course, roadmap, project, or student-benefit resources."
    },
    {
      icon: FileText,
      title: "Documentation",
      desc: "Improve setup instructions, guides, explanations, and examples."
    },
    {
      icon: Accessibility,
      title: "Design and accessibility",
      desc: "Improve usability, responsiveness, accessibility, and clarity."
    }
  ];

  return (
    <div className="min-h-screen bg-mn-background text-on-background selection:bg-surface-tint/30">
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-xs font-label-caps text-surface-tint tracking-widest uppercase mx-auto font-semibold"
          >
            <Sparkles className="w-4 h-4 text-surface-tint" />
            <span>Open Source Community</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display-lg text-display-lg-mobile md:text-display-lg text-foreground leading-tight"
          >
            Contributing to
            <br />
            <span className="text-surface-tint">Mimir Nest.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-body-lg text-body-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Mimir Nest is open source, and contributions are welcome. Whether you are fixing a bug, improving documentation, adding a useful feature, or improving an existing resource, your contribution can help make the project better for students.
          </motion.p>
        </div>
      </section>

      {/* Document Body */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-surface-container-lowest rounded-[40px] border border-outline-variant/40 p-6 sm:p-10 md:p-14 shadow-sm space-y-12">
          
          {/* Before you contribute */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-mn-primary font-headline-md flex items-center gap-2.5">
              <Info className="w-5 h-5 text-surface-tint" />
              <span>Before you contribute</span>
            </h2>
            <p className="text-on-surface-variant font-body-md text-sm leading-relaxed">
              To ensure a smooth collaboration, please review these resources before starting your work:
            </p>
            <ul className="pl-6 list-disc text-sm text-on-surface-variant space-y-2 font-body-md">
              <li>
                Read our{" "}
                <a
                  href="https://github.com/Mimir-nest/mimir-nest/blob/main/docs/contributing.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-surface-tint hover:underline font-semibold"
                >
                  Contribution Guidelines
                </a>{" "}
                to understand the project structure and folder rules.
              </li>
              <li>
                Search the{" "}
                <a
                  href="https://github.com/Mimir-nest/mimir-nest/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-surface-tint hover:underline font-semibold"
                >
                  Existing Issues
                </a>{" "}
                and open{" "}
                <a
                  href="https://github.com/Mimir-nest/mimir-nest/pulls"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-surface-tint hover:underline font-semibold"
                >
                  Pull Requests
                </a>{" "}
                to ensure you are not duplicating work.
              </li>
            </ul>
          </div>

          {/* Ways to contribute */}
          <div className="space-y-6 pt-4 border-t border-outline-variant/30">
            <h2 className="text-xl font-bold text-mn-primary font-headline-md flex items-center gap-2.5">
              <GitBranch className="w-5 h-5 text-surface-tint" />
              <span>Ways to contribute</span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {waysToContribute.map((way, i) => {
                const Icon = way.icon;
                return (
                  <div key={i} className="p-5 rounded-2xl bg-surface-container border border-outline-variant/30 space-y-2">
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-surface-tint" />
                      <h3 className="text-sm font-bold text-foreground">{way.title}</h3>
                    </div>
                    <p className="text-xs text-on-surface-variant leading-relaxed font-body-md">
                      {way.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Development */}
          <div className="space-y-4 pt-4 border-t border-outline-variant/30">
            <h2 className="text-xl font-bold text-mn-primary font-headline-md flex items-center gap-2.5">
              <Terminal className="w-5 h-5 text-surface-tint" />
              <span>Local Development Setup</span>
            </h2>
            
            <div className="space-y-4 text-sm text-on-surface-variant font-body-md leading-relaxed">
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Prerequisites</h3>
                <p className="text-xs">Node.js version 18.x or higher, and pnpm version 9.x or higher.</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-foreground">Setup steps</h3>
                
                <div className="space-y-1">
                  <p className="text-xs font-semibold">1. Clone the repository:</p>
                  <pre className="p-3 bg-surface-container rounded-lg font-mono text-xs text-foreground overflow-x-auto">
                    git clone https://github.com/Mimir-nest/mimir-nest.git
                  </pre>
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-semibold">2. Install dependencies:</p>
                  <pre className="p-3 bg-surface-container rounded-lg font-mono text-xs text-foreground overflow-x-auto">
                    pnpm install
                  </pre>
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-semibold">3. Run the development servers:</p>
                  <p className="text-xs text-on-surface-variant/80 mb-1">To run the Next.js web application (port 3000):</p>
                  <pre className="p-3 bg-surface-container rounded-lg font-mono text-xs text-foreground overflow-x-auto">
                    pnpm dev
                  </pre>
                  <p className="text-xs text-on-surface-variant/80 mt-2 mb-1">To run the Express Content API server (port 4000):</p>
                  <pre className="p-3 bg-surface-container rounded-lg font-mono text-xs text-foreground overflow-x-auto">
                    pnpm dev:api
                  </pre>
                </div>

                <div className="space-y-1 pt-2">
                  <p className="text-xs font-semibold">4. Build the project:</p>
                  <pre className="p-3 bg-surface-container rounded-lg font-mono text-xs text-foreground overflow-x-auto">
                    pnpm build
                  </pre>
                </div>

                <div className="space-y-1 pt-2">
                  <p className="text-xs font-semibold">5. Lint and Typecheck:</p>
                  <pre className="p-3 bg-surface-container rounded-lg font-mono text-xs text-foreground overflow-x-auto">
                    pnpm lint
                    pnpm typecheck
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* Pull requests */}
          <div className="space-y-4 pt-4 border-t border-outline-variant/30">
            <h2 className="text-xl font-bold text-mn-primary font-headline-md flex items-center gap-2.5">
              <GitBranch className="w-5 h-5 text-surface-tint" />
              <span>Pull requests</span>
            </h2>
            <ol className="pl-6 list-decimal text-sm text-on-surface-variant space-y-2 font-body-md leading-relaxed">
              <li>Create a new branch from `main` (e.g. `feature/your-feature`).</li>
              <li>Make focused, modular changes following project boundaries.</li>
              <li>Test your changes locally by running build, lint, and typechecks.</li>
              <li>Update documentation inside the `docs/` folder if necessary.</li>
              <li>Open a pull request targeting the `main` branch.</li>
              <li>Provide a clear description of what was changed and the reasoning behind it.</li>
            </ol>
          </div>

          {/* Good first contributions */}
          <div className="space-y-4 pt-4 border-t border-outline-variant/30">
            <h2 className="text-xl font-bold text-mn-primary font-headline-md flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-surface-tint" />
              <span>Good first contributions</span>
            </h2>
            <p className="text-sm text-on-surface-variant font-body-md leading-relaxed">
              If you are new to the repository, you can browse issues tagged with the{" "}
              <a
                href="https://github.com/Mimir-nest/mimir-nest/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22"
                target="_blank"
                rel="noopener noreferrer"
                className="text-surface-tint hover:underline font-semibold"
              >
                good first issue
              </a>{" "}
              label. These issues are curated to have limited scopes and serve as a great introduction to the codebase.
            </p>
          </div>

          {/* Questions */}
          <div className="space-y-4 pt-4 border-t border-outline-variant/30 text-center">
            <h2 className="text-xl font-bold text-mn-primary font-headline-md flex items-center justify-center gap-2.5">
              <HelpCircle className="w-5 h-5 text-surface-tint" />
              <span>Questions?</span>
            </h2>
            <p className="text-sm text-on-surface-variant font-body-md leading-relaxed">
              If you have any questions about project setup, guidelines, or ideas, feel free to email us directly at:
            </p>
            <a
              href="mailto:mimirnest@gmail.com"
              className="inline-block text-base font-bold text-surface-tint hover:underline"
            >
              mimirnest@gmail.com
            </a>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contributing;
