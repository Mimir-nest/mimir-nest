"use client";

import React, { useState } from "react";
import { SiriOrb } from "@/components/ui/siri-orb";
import { Mic, Volume2, Brain, Sparkles, Radio } from "lucide-react";

export const orbStates = {
  listening: {
    label: "Listening...",
    subtext: "Listening to candidate explanation",
    icon: Mic,
    duration: 14,
    colors: {
      bg: "oklch(20% 0.02 264)",
      c1: "oklch(72% 0.22 35)", // Mimir signature orange
      c2: "oklch(78% 0.16 200)", // cyan
      c3: "oklch(74% 0.18 310)", // magenta
    },
    badgeColor: "bg-green-500/15 text-green-400 border-green-500/30",
    dotColor: "bg-green-400",
  },
  thinking: {
    label: "Thinking...",
    subtext: "Cross-checking architecture & code logic",
    icon: Brain,
    duration: 6,
    colors: {
      bg: "oklch(18% 0.02 280)",
      c1: "oklch(75% 0.24 300)", // violet
      c2: "oklch(70% 0.20 230)", // blue
      c3: "oklch(80% 0.22 35)", // orange highlight
    },
    badgeColor: "bg-purple-500/15 text-purple-400 border-purple-500/30",
    dotColor: "bg-purple-400",
  },
  speaking: {
    label: "Speaking...",
    subtext: "Posing adaptive follow-up challenge",
    icon: Volume2,
    duration: 18,
    colors: {
      bg: "oklch(20% 0.03 35)",
      c1: "oklch(70% 0.25 35)", // vibrant orange
      c2: "oklch(76% 0.18 55)", // amber
      c3: "oklch(72% 0.20 15)", // coral
    },
    badgeColor: "bg-surface-tint/15 text-surface-tint border-surface-tint/30",
    dotColor: "bg-surface-tint",
  },
};

export default function InterviewOrb({
  size = "220px",
  initialState = "listening",
  interactive = true,
  showControls = true,
  showHeader = true,
  project = "distributed-cache",
  className = "",
}) {
  const [currentState, setCurrentState] = useState(initialState);
  const config = orbStates[currentState] || orbStates.listening;
  const StateIcon = config.icon;

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      {/* Ambient Radial Glow */}
      <div
        className="absolute w-72 h-72 rounded-full blur-3xl pointer-events-none transition-all duration-700 opacity-40"
        style={{
          background:
            currentState === "listening"
              ? "radial-gradient(circle, rgba(74, 222, 128, 0.2) 0%, rgba(255, 90, 54, 0.15) 50%, transparent 75%)"
              : currentState === "thinking"
              ? "radial-gradient(circle, rgba(168, 85, 247, 0.25) 0%, rgba(59, 130, 246, 0.15) 50%, transparent 75%)"
              : "radial-gradient(circle, rgba(255, 90, 54, 0.35) 0%, rgba(245, 158, 11, 0.2) 50%, transparent 75%)",
        }}
      />

      {/* Top Session Tag */}
      {showHeader && (
        <div className="flex items-center justify-center gap-2 mb-5 z-10 max-w-full">
          <span className="inline-flex flex-wrap items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-surface-container border border-outline-variant text-[10px] sm:text-[11px] font-mono text-muted-foreground max-w-full text-center">
            <Radio className="w-3 h-3 text-red-400 animate-pulse shrink-0" />
            <span className="text-foreground font-semibold">LIVE INTERVIEW</span>
            <span className="text-muted-foreground/60 hidden xs:inline">|</span>
            <span className="text-surface-tint font-bold truncate max-w-[150px] sm:max-w-none">{project}</span>
          </span>
        </div>
      )}

      {/* Siri Orb Presence Container */}
      <div className="relative p-4 sm:p-6 rounded-full bg-surface-container/60 border border-outline-variant/50 backdrop-blur-md shadow-2xl flex items-center justify-center max-w-full">
        {/* Soft pulse ring */}
        <div
          className="absolute inset-0 rounded-full border border-surface-tint/20 animate-ping opacity-30 pointer-events-none"
          style={{ animationDuration: "3s" }}
        />

        <SiriOrb
          size={size}
          animationDuration={config.duration}
          colors={config.colors}
          className="shadow-2xl max-w-full"
        />
      </div>

      {/* AI Persona Title & State Indicator */}
      <div className="mt-6 text-center z-10 space-y-1.5 max-w-full px-2">
        <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground font-semibold">
          AI INTERVIEWER · MIMIR
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-xs font-mono font-semibold transition-all duration-300 max-w-full"
          style={{
            borderColor: currentState === "listening" ? "rgba(74, 222, 128, 0.4)" : currentState === "thinking" ? "rgba(168, 85, 247, 0.4)" : "rgba(255, 90, 54, 0.4)",
            backgroundColor: currentState === "listening" ? "rgba(74, 222, 128, 0.1)" : currentState === "thinking" ? "rgba(168, 85, 247, 0.1)" : "rgba(255, 90, 54, 0.1)",
            color: currentState === "listening" ? "#4ade80" : currentState === "thinking" ? "#c084fc" : "#FF5A36",
          }}
        >
          <span className={`w-2 h-2 rounded-full ${config.dotColor} animate-pulse shrink-0`} />
          <StateIcon className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{config.label}</span>
        </div>

        <p className="text-[11px] font-mono text-muted-foreground max-w-xs mx-auto">
          {config.subtext}
        </p>
      </div>

      {/* Interactive State Switcher Preview */}
      {interactive && showControls && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-1.5 p-1 rounded-xl bg-surface-container border border-outline-variant/60 z-10 text-xs font-mono max-w-full">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground px-2">
            State:
          </span>
          {Object.keys(orbStates).map((stateKey) => {
            const isSelected = currentState === stateKey;
            return (
              <button
                key={stateKey}
                type="button"
                onClick={() => setCurrentState(stateKey)}
                className={`px-3 py-1 rounded-lg text-xs capitalize transition-all cursor-pointer border-none ${
                  isSelected
                    ? "bg-surface-container-high text-foreground font-bold shadow-sm"
                    : "bg-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {stateKey}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
