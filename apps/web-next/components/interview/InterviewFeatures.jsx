"use client";

import React from "react";
import {
  Code2,
  GitPullRequest,
  Layers,
  MessagesSquare,
  ClipboardCheck,
  Compass,
} from "lucide-react";

export default function InterviewFeatures() {
  const features = [
    {
      icon: Code2,
      tag: "Context Ingestion",
      title: "Project-Aware Questions",
      description:
        "Questions are generated directly from the code, dependencies, and architecture you actually committed—not generic LeetCode question templates.",
      status: "Designed for codebase parsing",
    },
    {
      icon: GitPullRequest,
      tag: "Conversational Depth",
      title: "Contextual Follow-Up Questions",
      description:
        "The interviewer doesn't simply skip to the next item on a checklist. It challenges the specific justifications and technical claims you make in your answers.",
      status: "Dynamic LLM reasoning loop",
    },
    {
      icon: Layers,
      tag: "Engineering Depth",
      title: "Real Technical Depth",
      description:
        "Expect focused discussion on databases, latency, concurrency, schema normalization, caching layers, and security decisions pertinent to your project.",
      status: "Evaluates tradeoffs & edge cases",
    },
    {
      icon: MessagesSquare,
      tag: "Interaction Model",
      title: "Natural Interview Flow",
      description:
        "Designed to simulate a senior engineer sitting across from you. Ask for clarification, explain tradeoffs, or push back on constraints just like in a live interview.",
      status: "Turn-by-turn dialogue engine",
    },
    {
      icon: ClipboardCheck,
      tag: "Actionable Insights",
      title: "Granular Post-Interview Diagnosis",
      description:
        "Receive honest, pinpoint feedback on where your reasoning was sharp, where your answers were vague, and what topics you struggled to defend.",
      status: "Objective diagnostic report",
    },
    {
      icon: Compass,
      tag: "Mimir Nest Bridge",
      title: "Personalized Learning Loop",
      description:
        "Weaknesses uncovered in your interview will link directly back to relevant Mimir Nest System Design chapters, DSA concepts, and architectural guides.",
      status: "Integrated with Mimir resources",
    },
  ];

  return (
    <section className="py-14 sm:py-20 md:py-28 px-4 sm:px-6 md:px-12 lg:px-16 bg-mn-background max-w-full">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16 max-w-3xl">
          <span className="font-label-caps text-xs text-surface-tint tracking-widest block mb-3 uppercase font-semibold">
            Features
          </span>
          <h2 className="font-headline-lg text-2xl sm:text-3xl md:text-4xl font-bold text-mn-primary mb-4 tracking-tight break-words">
            Built around your actual work.
          </h2>
          <p className="font-body-lg text-base md:text-lg text-on-surface-variant leading-relaxed">
            Every layer of Mimir Interview is engineered to test genuine software craftsmanship rather than rote memorization.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="rounded-2xl bg-surface-container border border-outline-variant/60 p-5 sm:p-7 flex flex-col justify-between group hover:border-surface-tint/40 transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-5 gap-2">
                    <div className="w-11 h-11 rounded-xl bg-surface-tint/10 flex items-center justify-center text-surface-tint group-hover:bg-surface-tint/20 transition-colors shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground bg-surface-container-high px-2 py-0.5 rounded border border-outline-variant/50 truncate">
                      {feat.tag}
                    </span>
                  </div>

                  <h3 className="font-headline-md text-base sm:text-lg font-bold text-foreground mb-2.5">
                    {feat.title}
                  </h3>
                  <p className="font-body-md text-sm text-on-surface-variant leading-relaxed mb-6">
                    {feat.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-outline-variant/30 flex items-center justify-between text-xs font-mono text-muted-foreground/80">
                  <span className="truncate">{feat.status}</span>
                  <span className="text-surface-tint opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                    →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
