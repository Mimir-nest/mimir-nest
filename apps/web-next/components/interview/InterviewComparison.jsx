"use client";

import React from "react";
import { X, Check, GitCommit, HelpCircle, Code2, AlertTriangle, ShieldCheck } from "lucide-react";

export default function InterviewComparison() {
  const comparisonItems = [
    {
      label: "Question Source",
      traditional: "Generic question banks & generic textbook prompts",
      mimir: "Your actual GitHub repositories, codebase & commits",
    },
    {
      label: "Follow-Up Mechanism",
      traditional: "Pre-scripted or detached from previous responses",
      mimir: "Adapts dynamically to the depth and claims of your answers",
    },
    {
      label: "Project Context",
      traditional: "Completely unaware of what you wrote or why",
      mimir: "Inspects your schemas, APIs, packages, and architecture",
    },
    {
      label: "Defensibility",
      traditional: "Memorized LeetCode / trivia recitations",
      mimir: "Real-world engineering defense of tradeoffs and failure cases",
    },
    {
      label: "Student Value",
      traditional: "Same generic test experience given to everyone",
      mimir: "100% personalized diagnosis of your genuine code understanding",
    },
  ];

  return (
    <section className="py-20 md:py-28 px-6 md:px-16 bg-mn-background max-w-full">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-14 max-w-3xl">
          <span className="font-label-caps text-xs text-surface-tint tracking-widest block mb-3 uppercase font-semibold">
            The Differentiator
          </span>
          <h2 className="font-headline-lg text-2xl sm:text-3xl md:text-4xl font-bold text-mn-primary mb-4 tracking-tight">
            Not a random list of interview questions.
          </h2>
          <p className="font-body-lg text-base md:text-lg text-on-surface-variant leading-relaxed">
            Most mock interviews ask questions that could have been generated for anyone. Mimir Interview starts with what you actually built.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Traditional Card */}
          <div className="rounded-2xl bg-surface-container/60 border border-outline-variant/60 p-6 md:p-8 flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-outline-variant/40 mb-6">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground/80">Standard Approach</span>
                  <h3 className="text-xl font-bold text-foreground/80 mt-1">Traditional AI Interview</h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-surface-container-high border border-outline-variant flex items-center justify-center text-muted-foreground">
                  <AlertTriangle className="w-5 h-5 text-muted-foreground/80" />
                </div>
              </div>

              <ul className="space-y-4">
                {comparisonItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm">
                    <div className="w-5 h-5 rounded-full bg-surface-container-high border border-outline-variant flex items-center justify-center shrink-0 mt-0.5">
                      <X className="w-3 h-3 text-muted-foreground" />
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground block font-mono">{item.label}</span>
                      <span className="text-on-surface-variant font-body-md">{item.traditional}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-outline-variant/30 text-xs font-mono text-muted-foreground/70">
              Outcome: Superficial practice that doesn't test real project ownership.
            </div>
          </div>

          {/* Mimir Interview Card */}
          <div className="rounded-2xl bg-surface-container border-2 border-surface-tint/40 p-6 md:p-8 flex flex-col justify-between relative overflow-hidden shadow-xl shadow-surface-tint/5">
            <div className="absolute top-0 right-0 w-32 h-32 bg-surface-tint/5 rounded-bl-full pointer-events-none" />

            <div>
              <div className="flex items-center justify-between pb-6 border-b border-surface-tint/20 mb-6">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-surface-tint font-semibold">Mimir Approach</span>
                  <h3 className="text-xl font-bold text-foreground mt-1 flex items-center gap-2">
                    Mimir Interview
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-surface-tint/15 text-surface-tint border border-surface-tint/25">
                      Project-Centric
                    </span>
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-surface-tint/15 border border-surface-tint/30 flex items-center justify-center text-surface-tint">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              </div>

              <ul className="space-y-4">
                {comparisonItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm">
                    <div className="w-5 h-5 rounded-full bg-surface-tint/15 border border-surface-tint/40 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-surface-tint" />
                    </div>
                    <div>
                      <span className="text-xs text-surface-tint/80 block font-mono font-medium">{item.label}</span>
                      <span className="text-foreground font-body-md font-medium">{item.mimir}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-surface-tint/20 text-xs font-mono text-surface-tint/90 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-surface-tint" />
              Outcome: Deep confidence in defending your code, architectural tradeoffs, and design choices.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
