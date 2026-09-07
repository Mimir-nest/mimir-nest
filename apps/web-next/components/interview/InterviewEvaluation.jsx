"use client";

import React from "react";
import {
  Cpu,
  Boxes,
  Lightbulb,
  Scale,
  Fingerprint,
  MessageSquare,
  Binary,
  Compass,
} from "lucide-react";

export default function InterviewEvaluation() {
  const criteria = [
    {
      title: "Technical Understanding",
      description: "How thoroughly you understand the internal workings of the libraries, databases, and frameworks you selected.",
      icon: Cpu,
    },
    {
      title: "Architecture & Design",
      description: "How modules, services, and data flows connect, scale, and isolate boundaries across your application.",
      icon: Boxes,
    },
    {
      title: "Problem Solving",
      description: "Your methodology for diagnosing production bottlenecks, concurrency issues, and unhandled edge cases.",
      icon: Lightbulb,
    },
    {
      title: "Engineering Tradeoffs",
      description: "Your ability to articulate why you chose one technology over another, recognizing that no technical decision is free.",
      icon: Scale,
    },
    {
      title: "Project Ownership",
      description: "Defending why specific decisions were made and proving you genuinely wrote and reasoned through the implementation.",
      icon: Fingerprint,
    },
    {
      title: "Technical Communication",
      description: "Clarity, precision, and structured explanations without relying on vague buzzwords or hand-waving.",
      icon: MessageSquare,
    },
    {
      title: "Depth of Understanding",
      description: "Knowledge beyond surface-level tutorials—covering network latency, I/O limits, and query performance.",
      icon: Binary,
    },
    {
      title: "Engineering Judgment",
      description: "Pragmatism, knowing when simple solutions outperform over-engineered abstractions, and anticipating failure points.",
      icon: Compass,
    },
  ];

  return (
    <section className="py-14 sm:py-20 md:py-28 px-4 sm:px-6 md:px-12 lg:px-16 bg-mn-background max-w-full">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-10 sm:mb-14 max-w-3xl">
          <span className="font-label-caps text-xs text-surface-tint tracking-widest block mb-3 uppercase font-semibold">
            Future Evaluation Dimensions
          </span>
          <h2 className="font-headline-lg text-2xl sm:text-3xl md:text-4xl font-bold text-mn-primary mb-4 tracking-tight break-words">
            More than whether you got the answer right.
          </h2>
          <p className="font-body-lg text-base md:text-lg text-on-surface-variant leading-relaxed">
            Real tech interviews aren&apos;t binary multiple-choice tests. The upcoming Mimir evaluation engine is being designed to evaluate candidates along genuine engineering dimensions rather than memorized trivia.
          </p>
        </div>

        {/* Evaluation Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {criteria.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-2xl bg-surface-container border border-outline-variant/60 p-5 sm:p-6 flex flex-col justify-between group hover:border-surface-tint/40 transition-all duration-200"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-surface-container-high border border-outline-variant flex items-center justify-center text-surface-tint mb-4 sm:mb-5 group-hover:bg-surface-tint/15 group-hover:border-surface-tint/30 transition-all shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-headline-md text-base font-bold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="font-body-md text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-outline-variant/30 text-[11px] font-mono text-muted-foreground flex items-center justify-between">
                  <span>Designed to evaluate</span>
                  <span className="text-surface-tint opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                    &rarr;
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
