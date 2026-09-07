"use client";

import React from "react";
import { Github, FileSearch, Mic, BarChart3, ShieldCheck } from "lucide-react";

export default function InterviewHowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Connect GitHub",
      description: "Sign in with GitHub and choose the projects you want to discuss.",
      detail: "Scoped permissions. We only request read access to the specific repositories you choose.",
      icon: Github,
    },
    {
      number: "02",
      title: "Understand Your Project",
      description: "Mimir analyzes the technical context of your selected repository — including the stack, APIs, architecture, data models, documentation, and implementation decisions.",
      detail: "Deep analysis across code structure, schemas, endpoints, and architectural tradeoffs.",
      icon: FileSearch,
    },
    {
      number: "03",
      title: "Take the Live Interview",
      description: "Join a voice-first mock interview where the interviewer listens to your answers and adapts the conversation in real time.",
      detail: "Spoken question-and-answer flow with dynamic follow-up scrutiny.",
      icon: Mic,
    },
    {
      number: "04",
      title: "Understand Your Weaknesses",
      description: "Receive a detailed diagnosis of your technical understanding, reasoning, communication, and engineering judgment.",
      detail: "Identifies precise gaps and connects back to Mimir Nest's System Design and DSA guides.",
      icon: BarChart3,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 px-6 md:px-16 bg-surface-container rounded-3xl border-y border-border/40 max-w-full">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 max-w-3xl">
          <span className="font-label-caps text-xs text-surface-tint tracking-widest block mb-3 uppercase font-semibold">
            How It Works
          </span>
          <h2 className="font-headline-lg text-2xl sm:text-3xl md:text-4xl font-bold text-mn-primary mb-4 tracking-tight">
            From GitHub to a live technical interview.
          </h2>
          <p className="font-body-lg text-base md:text-lg text-on-surface-variant leading-relaxed">
            A future-oriented, structured pipeline designed to test how well you understand the systems you build.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="rounded-2xl bg-mn-background border border-outline-variant/60 p-6 flex flex-col justify-between group hover:border-surface-tint/40 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-2xl font-bold text-surface-tint">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-foreground group-hover:text-surface-tint group-hover:bg-surface-tint/10 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-headline-md text-lg font-bold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="font-body-md text-sm text-on-surface-variant leading-relaxed mb-4">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-outline-variant/30">
                  <p className="text-xs font-mono text-muted-foreground/80 leading-normal">
                    {step.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Privacy Note */}
        <div className="mt-12 p-4 rounded-xl bg-surface-container-high/60 border border-outline-variant/50 max-w-3xl mx-auto text-center flex items-center justify-center gap-2.5">
          <ShieldCheck className="w-4 h-4 text-surface-tint shrink-0" />
          <p className="text-xs text-on-surface-variant font-mono">
            GitHub access will be explicitly scoped to the repositories you choose, with credentials and sensitive tokens kept away from the client.
          </p>
        </div>
      </div>
    </section>
  );
}
