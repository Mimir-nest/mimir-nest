"use client";

import React from "react";
import { Mic, Languages, Sparkles, Cpu } from "lucide-react";
import InterviewOrb from "./InterviewOrb";

export default function InterviewSpokenNatural() {
  const conceptualPipeline = [
    { step: "01", label: "YOUR VOICE", desc: "Spoken naturally in English, Hindi, or Hinglish" },
    { step: "02", label: "SPEECH UNDERSTANDING", desc: "Acoustic and dialect processing for Indian contexts" },
    { step: "03", label: "PROJECT CONTEXT", desc: "Cross-checked against your GitHub codebase" },
    { step: "04", label: "AI REASONING", desc: "Analyzes depth, tradeoffs, and failure modes" },
    { step: "05", label: "ADAPTIVE INTERVIEW", desc: "Formulates next contextual challenge" },
    { step: "06", label: "SPOKEN RESPONSE", desc: "Spoken back to you naturally in real time" },
  ];

  return (
    <section className="py-14 sm:py-20 md:py-28 px-4 sm:px-6 md:px-12 lg:px-16 bg-surface-container rounded-3xl border-y border-border/40 max-w-full">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-10 sm:mb-14 max-w-3xl">
          <span className="font-label-caps text-xs text-surface-tint tracking-widest block mb-3 uppercase font-semibold">
            Spoken Communication & Voice Vision
          </span>
          <h2 className="font-headline-lg text-2xl sm:text-3xl md:text-4xl font-bold text-mn-primary mb-4 tracking-tight break-words">
            Speak naturally.
          </h2>
          <p className="font-body-lg text-base md:text-lg text-foreground/90 font-medium mb-2 leading-relaxed">
            Technical interviews shouldn&apos;t require you to sound like a textbook.
          </p>
          <p className="font-body-md text-sm md:text-base text-on-surface-variant leading-relaxed">
            Mimir Interview is being designed around natural spoken conversations — including the way Indian students actually communicate, whether that&apos;s English, Hindi, Hinglish, or other Indian languages.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Left Column: Spoken Natural Dialogue Example */}
          <div className="lg:col-span-6 rounded-2xl bg-mn-background border border-outline-variant/70 p-5 sm:p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between pb-4 border-b border-outline-variant/40 mb-6 gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-surface-tint font-semibold flex items-center gap-1.5">
                  <Languages className="w-4 h-4 shrink-0" />
                  <span>Natural Spoken Cadence</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-container-high text-muted-foreground border border-outline-variant">
                  English / Hindi / Hinglish
                </span>
              </div>

              <div className="space-y-4 text-sm font-sans">
                {/* Interviewer Turn */}
                <div className="space-y-1.5">
                  <span className="text-xs font-mono text-surface-tint font-semibold block">AI Interviewer</span>
                  <div className="p-3.5 rounded-xl bg-surface-container border border-outline-variant/60 text-foreground/90 font-body-md break-words">
                    &ldquo;Explain your database choice for the order processing service.&rdquo;
                  </div>
                </div>

                {/* Candidate Turn in Hinglish */}
                <div className="space-y-1.5 flex flex-col items-end">
                  <span className="text-xs font-mono text-muted-foreground font-semibold block">Candidate (Spoken)</span>
                  <div className="p-3.5 rounded-xl bg-primary/10 border border-primary/25 text-foreground/95 max-w-full font-body-md text-right break-words">
                    &ldquo;Basically, maine PostgreSQL use kiya because transactional consistency was critical for the order service. Document stores me eventual consistency manage karna needlessly risky hota.&rdquo;
                  </div>
                </div>

                {/* Interviewer Follow-Up */}
                <div className="space-y-1.5">
                  <span className="text-xs font-mono text-surface-tint font-semibold block">Adaptive Follow-Up</span>
                  <div className="p-3.5 rounded-xl bg-surface-container border border-surface-tint/30 text-foreground/90 font-body-md break-words">
                    &ldquo;Now defend that decision under 10,000 concurrent writes per second. How do connection pool limits behave?&rdquo;
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-outline-variant/40 text-xs font-mono text-muted-foreground flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-surface-tint shrink-0" />
              <span className="break-words">Communicate complex technical reasoning fluently without artificial language barriers.</span>
            </div>
          </div>

          {/* Right Column: Subtle Conceptual Pipeline & Exploration Note */}
          <div className="lg:col-span-6 rounded-2xl bg-mn-background border border-outline-variant/70 p-5 sm:p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between pb-4 border-b border-outline-variant/40 mb-5 gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-foreground font-semibold flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-surface-tint shrink-0" />
                  <span>Conceptual Voice Pipeline</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-container-high text-surface-tint border border-surface-tint/30">
                  Provider Agnostic
                </span>
              </div>

              {/* Compact Orb Presence Indicator */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 sm:gap-4 p-3.5 mb-5 rounded-xl bg-surface-container border border-outline-variant/60">
                <div className="shrink-0">
                  <InterviewOrb
                    size="70px"
                    initialState="listening"
                    interactive={false}
                    showControls={false}
                    showHeader={false}
                  />
                </div>
                <div className="text-xs font-mono space-y-1 min-w-0">
                  <div className="flex items-center justify-center sm:justify-start gap-1.5 text-surface-tint font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shrink-0" />
                    <span>Spoken Reasoning Active</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground font-body-md leading-normal">
                    Adapts to the cadence, vocabulary, and mixed-language explanations of Indian engineering students.
                  </p>
                </div>
              </div>

              {/* 6-step flow */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                {conceptualPipeline.map((item) => (
                  <div
                    key={item.step}
                    className="p-3 rounded-xl bg-surface-container border border-outline-variant/50"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-[11px] font-bold text-surface-tint shrink-0">
                        {item.step}
                      </span>
                      <span className="text-xs font-semibold text-foreground truncate">{item.label}</span>
                    </div>
                    <p className="text-[11px] text-on-surface-variant font-mono leading-tight break-words">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Subtle Sarvam Exploration Statement */}
            <div className="pt-4 border-t border-outline-variant/40">
              <div className="p-3 rounded-xl bg-surface-container-high/60 border border-outline-variant/50 text-xs text-on-surface-variant font-mono leading-relaxed break-words">
                <span className="text-surface-tint font-semibold mr-1.5">Technology Direction:</span>
                We&apos;re exploring Sarvam&apos;s language and speech capabilities to make this experience more natural for Indian students.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
