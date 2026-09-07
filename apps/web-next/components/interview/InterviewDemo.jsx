"use client";

import React, { useState } from "react";
import { Terminal, GitBranch, Sparkles, MessageSquare, ArrowRight, CornerDownRight } from "lucide-react";

export default function InterviewDemo() {
  const conversation = [
    {
      role: "interviewer",
      name: "Mimir Interviewer",
      badge: "Initial Project Discovery",
      text: "I've reviewed your repository. You are using both PostgreSQL and Redis. Walk me through why you introduced Redis into this architecture.",
      intent: "Probes candidate's foundational architectural decision.",
    },
    {
      role: "candidate",
      name: "Candidate",
      badge: "Candidate Response",
      text: "I use Redis for caching frequently accessed user feed records to keep response times low.",
      intent: "Candidate provides a basic, high-level justification.",
    },
    {
      role: "interviewer",
      name: "Mimir Interviewer",
      badge: "Fault-Tolerance Probe",
      text: "Okay. What happens if your Redis instance crashes or becomes unreachable during peak hours?",
      intent: "Interviewer challenges resilience rather than moving to a new topic.",
    },
    {
      role: "candidate",
      name: "Candidate",
      badge: "Candidate Response",
      text: "The service catches the connection error and falls back to querying PostgreSQL directly.",
      intent: "Candidate proposes simple database fallback.",
    },
    {
      role: "interviewer",
      name: "Mimir Interviewer",
      badge: "Systemic Risk & Concurrency Challenge",
      text: "That preserves availability. But what happens to PostgreSQL when 5,000 concurrent requests hit the un-cached query at once? How do you prevent a catastrophic cache stampede?",
      intent: "Deep engineering probe: mutex locking, probabilistic early expiration, or read-through coalescing.",
    },
  ];

  return (
    <section className="py-20 md:py-28 px-6 md:px-16 bg-surface-container rounded-3xl border-y border-border/40 max-w-full">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-14 max-w-3xl">
          <span className="font-label-caps text-xs text-surface-tint tracking-widest block mb-3 uppercase font-semibold">
            Sample Interview
          </span>
          <h2 className="font-headline-lg text-2xl sm:text-3xl md:text-4xl font-bold text-mn-primary mb-4 tracking-tight">
            Imagine your interviewer has already read your project.
          </h2>
          <p className="font-body-lg text-base md:text-lg text-on-surface-variant leading-relaxed">
            See how the dialogue progresses from broad architectural choices down to critical failure modes, exactly like an experienced lead engineer.
          </p>
        </div>

        {/* Interactive / Annotated Chat Container */}
        <div className="rounded-2xl bg-mn-background border border-outline-variant/80 shadow-2xl overflow-hidden">
          {/* Top Session Bar */}
          <div className="px-5 py-3.5 bg-surface-container-high border-b border-outline-variant/60 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-container text-foreground border border-outline-variant">
                <GitBranch className="w-3.5 h-3.5 text-surface-tint" />
                repo: <span className="text-surface-tint font-bold">distributed-feed-engine</span>
              </span>
              <span className="hidden sm:inline-block text-muted-foreground">
                Stack: Node.js, PostgreSQL, Redis, Docker
              </span>
            </div>
            <div className="inline-flex items-center gap-2 text-surface-tint">
              <span className="w-2 h-2 rounded-full bg-surface-tint animate-pulse" />
              <span className="text-[11px] uppercase tracking-wider font-semibold">
                Questions adapt to your answers
              </span>
            </div>
          </div>

          {/* Chat Stream */}
          <div className="p-6 md:p-8 space-y-6">
            {conversation.map((msg, index) => {
              const isInterviewer = msg.role === "interviewer";
              return (
                <div
                  key={index}
                  className={`flex flex-col ${isInterviewer ? "items-start" : "items-end"}`}
                >
                  {/* Speaker Label & Badge */}
                  <div className="flex items-center gap-2 mb-1.5 px-1 text-xs font-mono">
                    <span className={isInterviewer ? "text-surface-tint font-semibold" : "text-foreground/80"}>
                      {msg.name}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-surface-container border border-outline-variant text-muted-foreground">
                      {msg.badge}
                    </span>
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`p-4 md:p-5 rounded-2xl max-w-2xl text-sm leading-relaxed border transition-all ${
                      isInterviewer
                        ? "bg-surface-container border-outline-variant/70 text-foreground/95 rounded-tl-sm"
                        : "bg-primary/10 border-primary/30 text-foreground rounded-tr-sm"
                    }`}
                  >
                    <p className="font-body-md text-sm md:text-[15px]">{msg.text}</p>
                    
                    {/* Insight Callout */}
                    <div className="mt-3 pt-2.5 border-t border-outline-variant/40 flex items-start gap-1.5 text-xs text-muted-foreground/90 font-mono">
                      <CornerDownRight className="w-3.5 h-3.5 mt-0.5 shrink-0 text-surface-tint" />
                      <span>{msg.intent}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Live Outcome Banner */}
          <div className="p-4 bg-surface-container border-t border-outline-variant/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
            <span className="text-on-surface-variant flex items-center gap-2 text-center sm:text-left">
              <Sparkles className="w-4 h-4 text-surface-tint shrink-0" />
              Notice: The interviewer didn't jump to sorting algorithms. It drilled into the candidate's own system architecture.
            </span>
            <span className="text-surface-tint font-semibold whitespace-nowrap">
              No generic questionnaires
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
