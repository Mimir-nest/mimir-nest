"use client";

import { useEffect, useState } from "react";
import { Clock, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { fetchCompletionCounts } from "@/lib/arena/supabase";
import { SeverityPill } from "./SeverityPill";

const LANGUAGE_LABEL = { typescript: "TypeScript", javascript: "JavaScript", python: "Python", go: "Go" };
const DIFFICULTY_ORDER = ["easy", "medium", "hard"];
const FILTERS = [
  { key: "language", label: "Language", format: (v) => LANGUAGE_LABEL[v] ?? v },
  { key: "bugClass", label: "Bug class" },
  { key: "difficulty", label: "Difficulty", sort: (a, b) => DIFFICULTY_ORDER.indexOf(a) - DIFFICULTY_ORDER.indexOf(b) },
];
// Chips come from the challenges themselves, so a new bug class or language shows up without code changes.
const optionsFor = (challenges, f) => [...new Set(challenges.map((c) => c[f.key]).filter(Boolean))].sort(f.sort);

function FilterChip({ active, onClick, children }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors",
        active
          ? "bg-surface-tint text-mn-background border-surface-tint"
          : "bg-surface-container border-border/60 text-on-surface-variant hover:text-mn-primary hover:border-surface-tint/50",
      )}
    >
      {children}
    </button>
  );
}

function Card({ c, completions }) {
  const body = (
    <>
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-xs text-on-surface-variant">{c.incidentId}</span>
        <SeverityPill severity={c.severity} />
      </div>
      <h3 className="mt-3 font-headline-md text-lg font-semibold text-mn-primary leading-snug">{c.title}</h3>
      <p className="mt-2 text-sm text-on-surface-variant leading-relaxed line-clamp-3">{c.report}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        <span className="px-2 py-0.5 rounded-md bg-surface-tint/10 border border-surface-tint/30 text-surface-tint text-xs font-medium">{c.bugClass}</span>
        <span className="px-2 py-0.5 rounded-md bg-surface-container-high border border-border/60 text-on-surface-variant text-xs">
          {LANGUAGE_LABEL[c.language] ?? c.language}
        </span>
        {c.mode !== "standard" && (
          <span className="px-2 py-0.5 rounded-md bg-surface-container-high border border-border/60 text-on-surface-variant text-xs">
            {c.mode === "interview" ? "Interview mode" : "Review the AI PR"}
          </span>
        )}
      </div>
      <div className="mt-auto pt-5 flex items-center justify-between text-xs text-on-surface-variant border-t border-border/60">
        <span className="flex items-center gap-1.5 pt-4">
          <Clock className="w-3.5 h-3.5" aria-hidden /> ~{c.estimatedMinutes} min · {c.difficulty}
        </span>
        <span className="flex items-center gap-1.5 pt-4">
          {c.live ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-surface-tint" aria-hidden /> {completions ?? 0} solved
            </>
          ) : (
            "Coming soon"
          )}
        </span>
      </div>
    </>
  );
  const cls = "flex flex-col h-full p-6 rounded-xl bg-surface-container border border-border/60 transition-colors";
  // Full page load on purpose: the IDE page needs its cross-origin isolation headers.
  return c.live ? (
    <a href={`/arena/incident/${c.slug}`} className={cn(cls, "hover:border-surface-tint/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-surface-tint")}>
      {body}
    </a>
  ) : (
    <div className={cn(cls, "opacity-60")} aria-disabled>
      {body}
    </div>
  );
}

export default function TicketWall({ challenges }) {
  const [filters, setFilters] = useState({});
  const [interviewOnly, setInterviewOnly] = useState(false);
  const [counts, setCounts] = useState({});

  useEffect(() => {
    fetchCompletionCounts().then(setCounts);
  }, []);

  const visible = challenges.filter(
    (c) => Object.entries(filters).every(([k, v]) => !v || c[k] === v) && (!interviewOnly || c.mode === "interview"),
  );

  return (
    <section className="max-w-6xl mx-auto px-container-padding-mobile md:px-container-padding-desktop mt-12">
      <div className="flex flex-col gap-4 p-4 rounded-xl bg-surface-container-low border border-border/60 lg:flex-row lg:flex-wrap lg:items-center lg:gap-6">
        {FILTERS.map((f) => (
          <div key={f.key} role="group" aria-label={f.label} className="flex flex-wrap items-center gap-2">
            <span className="font-label-caps text-label-caps uppercase text-on-surface-variant mr-1">{f.label}</span>
            <FilterChip active={!filters[f.key]} onClick={() => setFilters((s) => ({ ...s, [f.key]: null }))}>
              All
            </FilterChip>
            {optionsFor(challenges, f).map((o) => (
              <FilterChip key={o} active={filters[f.key] === o} onClick={() => setFilters((s) => ({ ...s, [f.key]: s[f.key] === o ? null : o }))}>
                {f.format ? f.format(o) : o}
              </FilterChip>
            ))}
          </div>
        ))}
        <label className="flex items-center gap-2 text-xs font-medium text-on-surface-variant lg:ml-auto cursor-pointer">
          <input type="checkbox" checked={interviewOnly} onChange={(e) => setInterviewOnly(e.target.checked)} className="w-4 h-4 accent-surface-tint" />
          Interview mode only
        </label>
      </div>

      {visible.length ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((c) => (
            <Card key={c.slug} c={c} completions={counts[c.slug]} />
          ))}
        </div>
      ) : (
        <p className="mt-8 p-16 rounded-2xl bg-surface-container/40 border border-dashed border-border/70 text-center text-sm text-on-surface-variant">
          No incidents match those filters yet.
        </p>
      )}
    </section>
  );
}
