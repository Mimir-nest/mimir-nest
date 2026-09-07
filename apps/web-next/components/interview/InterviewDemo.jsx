"use client";

import React from "react";
import { GitBranch, Sparkles, CornerDownRight, Mic, Volume2 } from "lucide-react";

export default function InterviewDemo() {
  const conversation = [
    {
      role: "interviewer",
      name: "AI Interviewer",
      badge: "Initial Project Discovery",
      text: "I see you used Redis in this feed service. Why did you choose Redis here instead of querying PostgreSQL directly?",
      intent: "Listens to foundational architectural rationale.",
    },
    {
      role: "candidate",
      name: "Candidate (Spoken)",
      badge: "Spoken Response",
      text: "I needed caching for frequently accessed user feed records to keep response times low.",
      intent: "Candidate provides high-level functional reasoning.",
    },
    {
      role: "interviewer",
      name: "AI Interviewer",
      badge: "Resilience Challenge",
      text: "Okay. What happens when Redis becomes unavailable or crashes during peak hours?",
      intent: "Listens to answer, then probes failure handling.",
    },
    {
      role: "candidate",
      name: "Candidate (Spoken)",
      badge: "Spoken Response",
      text: "I'd catch the connection failure and fall back to PostgreSQL.",
      intent: "Candidate proposes a direct database fallback.",
    },
    {
      role: "interviewer",
      name: "AI Interviewer",
      badge: "Systemic Risk Challenge",
      text: "Then what happens if 5,000 concurrent requests suddenly bypass the cache? How does PostgreSQL survive the cache stampede?",
      intent: "Probes real-world concurrency: mutex locking, probabilistic early expiration, or queue coalescing.",
    },
  ];

  return (
    <section className="py-14 sm:py-20 md:py-28 px-4 sm:px-6 md:px-12 lg:px-16 bg-surface-container rounded-3xl border-y border-border/40 max-w-full">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 sm:mb-14 max-w-3xl">
          <span className="font-label-caps text-xs text-surface-tint tracking-widest block mb-3 uppercase font-semibold">
            HOW THE INTERVIEW ADAPTS
          </span>
          <h2 className="font-headline-lg text-2xl sm:text-3xl md:text-4xl font-bold text-mn-primary mb-4 tracking-tight break-words">
            An interview, not a questionnaire.
          </h2>
          <p className="font-body-lg text-base md:text-lg text-on-surface-variant leading-relaxed">
            The interviewer should listen before deciding what to ask next. Below is a preview of the conversational logic behind the future live interview, illustrating how the AI probes technical depth rather than reading a static script.
          </p>
        </div>

        {/* Live Conversation Window */}
        <div className="rounded-2xl bg-mn-background border border-outline-variant/80 shadow-2xl overflow-hidden max-w-full">
          {/* Top Session Bar */}
          <div className="px-4 sm:px-5 py-3 sm:py-3.5 bg-surface-container-high border-b border-outline-variant/60 flex flex-wrap items-center justify-between gap-2.5 text-xs font-mono max-w-full">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 max-w-full">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-container text-foreground border border-outline-variant max-w-full">
                <GitBranch className="w-3.5 h-3.5 text-surface-tint shrink-0" />
                <span className="truncate">context: <span className="text-surface-tint font-bold">distributed-feed-engine</span></span>
              </span>
              <span className="hidden sm:inline-block text-muted-foreground truncate">
                Stack: Node.js, PostgreSQL, Redis
              </span>
            </div>
            <div className="inline-flex items-center gap-2 text-surface-tint font-semibold shrink-0">
              <span className="w-2 h-2 rounded-full bg-surface-tint animate-pulse shrink-0" />
              <span className="uppercase text-[10px] sm:text-[11px] tracking-wider">CONVERSATION PREVIEW</span>
            </div>
          </div>

          {/* Conversation Stream */}
          <div className="p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6 max-w-full">
            {conversation.map((msg, index) => {
              const isInterviewer = msg.role === "interviewer";
              return (
                <div
                  key={index}
                  className={`flex flex-col ${isInterviewer ? "items-start" : "items-end"} max-w-full`}
                >
                  {/* Speaker Label & Badge */}
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1.5 px-1 text-xs font-mono max-w-full">
                    <span className={isInterviewer ? "text-surface-tint font-semibold flex items-center gap-1" : "text-foreground/80 flex items-center gap-1"}>
                      {isInterviewer ? <Volume2 className="w-3.5 h-3.5 shrink-0" /> : <Mic className="w-3.5 h-3.5 shrink-0" />}
                      <span>{msg.name}</span>
                    </span>
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-surface-container border border-outline-variant text-muted-foreground truncate">
                      {msg.badge}
                    </span>
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`p-3.5 sm:p-4 md:p-5 rounded-2xl max-w-full sm:max-w-2xl text-sm leading-relaxed border transition-all ${
                      isInterviewer
                        ? "bg-surface-container border-outline-variant/70 text-foreground/95 rounded-tl-sm"
                        : "bg-primary/10 border-primary/30 text-foreground rounded-tr-sm"
                    }`}
                  >
                    <p className="font-body-md text-sm md:text-[15px] break-words">{msg.text}</p>
                    
                    {/* Insight Callout */}
                    <div className="mt-3 pt-2.5 border-t border-outline-variant/40 flex items-start gap-1.5 text-xs text-muted-foreground/90 font-mono">
                      <CornerDownRight className="w-3.5 h-3.5 mt-0.5 shrink-0 text-surface-tint" />
                      <span className="break-words min-w-0">{msg.intent}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Preview Disclaimer Note */}
          <div className="p-3.5 sm:p-4 bg-surface-container border-t border-outline-variant/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono max-w-full">
            <span className="text-on-surface-variant flex items-center gap-2 text-center sm:text-left">
              <Sparkles className="w-4 h-4 text-surface-tint shrink-0" />
              <span className="break-words">Vision note: The product vision is a live voice-first interview. Text previews demonstrate adaptive conversational logic.</span>
            </span>
            <span className="text-[10px] sm:text-[11px] text-surface-tint font-semibold uppercase tracking-wider shrink-0 text-center sm:text-right">
              Follow-ups driven by candidate answers
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
