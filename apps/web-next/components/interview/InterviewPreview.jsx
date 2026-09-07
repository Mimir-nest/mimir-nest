"use client";

import React, { useState } from "react";
import { Mic, MicOff, Video, PhoneOff, Radio, Sparkles, Terminal } from "lucide-react";
import { SiriOrb } from "@/components/ui/siri-orb";
import { orbStates } from "./InterviewOrb";

export default function InterviewPreview() {
  const [activeState, setActiveState] = useState("listening");
  const stateConfig = orbStates[activeState] || orbStates.listening;
  const StateIcon = stateConfig.icon;

  const stateQuotes = {
    listening: "Listening to your explanation of the caching architecture...",
    thinking: "Analyzing fallback behavior under 5,000 requests/sec...",
    speaking: "How does PostgreSQL survive the sudden cache stampede?",
  };

  return (
    <section className="py-14 sm:py-20 md:py-28 px-4 sm:px-6 md:px-12 lg:px-16 bg-mn-background max-w-full relative">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-10 sm:mb-12 text-center max-w-2xl mx-auto">
          <span className="font-label-caps text-xs text-surface-tint tracking-widest block mb-3 uppercase font-semibold">
            Product Preview · Coming Soon
          </span>
          <h2 className="font-headline-lg text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 tracking-tight break-words">
            The Live Interview Room
          </h2>
          <p className="font-body-md text-sm md:text-base text-on-surface-variant leading-relaxed">
            Sit across from an AI interviewer that listens, thinks, and responds to your spoken words in real time.
          </p>
        </div>

        {/* Live Interview Stage Container */}
        <div className="rounded-3xl bg-surface-container border-2 border-outline-variant/80 shadow-2xl overflow-hidden relative max-w-full">
          {/* Top Metadata Bar */}
          <div className="px-4 sm:px-6 py-3.5 sm:py-4 bg-surface-container-high border-b border-outline-variant/60 flex flex-wrap items-center justify-between gap-3 text-xs font-mono max-w-full">
            {/* Live Indicator & Status */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container border border-outline-variant text-foreground font-semibold text-[11px] sm:text-xs">
                <Radio className="w-3.5 h-3.5 text-red-500 animate-pulse shrink-0" />
                LIVE INTERVIEW
              </span>
              <span className="text-[10px] uppercase font-bold text-surface-tint px-2 py-0.5 rounded bg-surface-tint/15 border border-surface-tint/25">
                Preview Mode
              </span>
            </div>

            {/* Surrounding Metadata */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-muted-foreground text-[11px]">
              <div>
                <span className="text-muted-foreground/70 uppercase text-[9px] block">Project</span>
                <span className="font-semibold text-foreground">distributed-cache</span>
              </div>
              <div className="hidden sm:block h-6 w-px bg-outline-variant/60" />
              <div>
                <span className="text-muted-foreground/70 uppercase text-[9px] block">Stack</span>
                <span className="font-semibold text-foreground">Node.js · PostgreSQL · Redis</span>
              </div>
              <div className="hidden sm:block h-6 w-px bg-outline-variant/60" />
              <div>
                <span className="text-muted-foreground/70 uppercase text-[9px] block">Session</span>
                <span className="font-semibold text-foreground">Technical Interview</span>
              </div>
            </div>
          </div>

          {/* Main Interview Stage Canvas */}
          <div className="py-10 sm:py-16 md:py-20 px-4 sm:px-6 flex flex-col items-center justify-center text-center relative max-w-full">
            {/* Ambient Background Glow */}
            <div
              className="absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full blur-3xl pointer-events-none transition-all duration-700 opacity-30"
              style={{
                background:
                  activeState === "listening"
                    ? "radial-gradient(circle, rgba(74, 222, 128, 0.3) 0%, rgba(255, 90, 54, 0.15) 50%, transparent 75%)"
                    : activeState === "thinking"
                    ? "radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, rgba(59, 130, 246, 0.15) 50%, transparent 75%)"
                    : "radial-gradient(circle, rgba(255, 90, 54, 0.4) 0%, rgba(245, 158, 11, 0.2) 50%, transparent 75%)",
              }}
            />

            {/* Siri Orb Container */}
            <div className="relative p-4 sm:p-8 rounded-full bg-surface-container-high/60 border border-outline-variant/60 backdrop-blur-md shadow-2xl flex items-center justify-center mb-6 max-w-full">
              <SiriOrb
                size="170px"
                animationDuration={stateConfig.duration}
                colors={stateConfig.colors}
                className="shadow-2xl max-w-full"
              />
            </div>

            {/* AI Persona Header */}
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-2">
              AI INTERVIEWER · MIMIR
            </div>

            {/* Visual State Indicator */}
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-mono font-semibold transition-all duration-300 mb-4 max-w-full"
              style={{
                borderColor:
                  activeState === "listening"
                    ? "rgba(74, 222, 128, 0.4)"
                    : activeState === "thinking"
                    ? "rgba(168, 85, 247, 0.4)"
                    : "rgba(255, 90, 54, 0.4)",
                backgroundColor:
                  activeState === "listening"
                    ? "rgba(74, 222, 128, 0.1)"
                    : activeState === "thinking"
                    ? "rgba(168, 85, 247, 0.1)"
                    : "rgba(255, 90, 54, 0.1)",
                color:
                  activeState === "listening"
                    ? "#4ade80"
                    : activeState === "thinking"
                    ? "#c084fc"
                    : "#FF5A36",
              }}
            >
              <span className={`w-2 h-2 rounded-full ${stateConfig.dotColor} animate-pulse shrink-0`} />
              <StateIcon className="w-3.5 h-3.5 shrink-0" />
              <span className="capitalize truncate">{activeState}...</span>
            </div>

            {/* Dynamic Spoken Dialogue Quote */}
            <p className="text-base sm:text-lg font-medium text-foreground max-w-md italic leading-snug px-2">
              &ldquo;{stateQuotes[activeState]}&rdquo;
            </p>

            {/* Subtle State Control Tabs */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-1.5 p-1 rounded-xl bg-surface-container-high border border-outline-variant/60 z-10 text-xs font-mono max-w-full">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground px-2">
                Simulate State:
              </span>
              {["listening", "thinking", "speaking"].map((stateKey) => {
                const isSelected = activeState === stateKey;
                return (
                  <button
                    key={stateKey}
                    type="button"
                    onClick={() => setActiveState(stateKey)}
                    className={`px-3 py-1 rounded-lg text-xs capitalize transition-all cursor-pointer border-none ${
                      isSelected
                        ? "bg-surface-container text-foreground font-bold shadow-sm"
                        : "bg-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {stateKey}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Room Controls Bar (Visual Previews Only) */}
          <div className="px-4 sm:px-6 py-4 bg-surface-container-high border-t border-outline-variant/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono max-w-full">
            {/* Visual Controls Previews */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
              <div
                title="Microphone (Preview)"
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-surface-container border border-outline-variant text-muted-foreground opacity-75 cursor-not-allowed"
              >
                <Mic className="w-3.5 h-3.5 text-green-400 shrink-0" />
                <span className="text-[11px]">Microphone</span>
              </div>

              <div
                title="Camera (Preview)"
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-surface-container border border-outline-variant text-muted-foreground opacity-75 cursor-not-allowed"
              >
                <Video className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                <span className="text-[11px]">Camera</span>
              </div>

              <div
                title="End Interview (Preview)"
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 opacity-75 cursor-not-allowed"
              >
                <PhoneOff className="w-3.5 h-3.5 shrink-0" />
                <span className="text-[11px]">End Interview</span>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="text-[11px] text-muted-foreground flex items-center justify-center gap-1.5 text-center sm:text-left">
              <Sparkles className="w-3.5 h-3.5 text-surface-tint shrink-0" />
              <span>Visual preview only. Live audio sessions will open during cohort rollouts.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
