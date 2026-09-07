"use client";

import React from "react";
import { GraduationCap, Briefcase, Rocket, GitPullRequest, ShieldCheck } from "lucide-react";

export default function InterviewAudience() {
  const audiences = [
    {
      title: "Students Preparing for Placements",
      description:
        "Stand out in on-campus and off-campus tech drives by turning your academic capstones and resume projects into confident, articulate talking points.",
      icon: GraduationCap,
    },
    {
      title: "Developers Preparing for Job Interviews",
      description:
        "Prepare for the dreaded 'Walk me through your resume project' question where senior interviewers probe architecture and technical depth.",
      icon: Briefcase,
    },
    {
      title: "Builders with Serious Side Projects",
      description:
        "You spent dozens of hours engineering full-stack or systems software. Make sure you can defend every architecture decision you made under pressure.",
      icon: Rocket,
    },
    {
      title: "Open-Source Contributors",
      description:
        "Practice communicating complex pull requests, modular architecture, and distributed collaboration cleanly to future engineering peers.",
      icon: GitPullRequest,
    },
    {
      title: "Candidates Defending Portfolio Projects",
      description:
        "Eliminate the risk of sounding like you copy-pasted tutorial code. Prove authentic authorship, deep comprehension, and technical rationale.",
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="py-20 md:py-28 px-6 md:px-16 bg-surface-container rounded-3xl border-y border-border/40 max-w-full">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-14 max-w-3xl">
          <span className="font-label-caps text-xs text-surface-tint tracking-widest block mb-3 uppercase font-semibold">
            Who It Is For
          </span>
          <h2 className="font-headline-lg text-2xl sm:text-3xl md:text-4xl font-bold text-mn-primary mb-4 tracking-tight">
            Built for people who have something to show.
          </h2>
          <p className="font-body-lg text-base md:text-lg text-on-surface-variant leading-relaxed">
            Mimir Interview isn't a corporate ATS surveillance tool. It is built for students, builders, and aspiring engineers who want to walk into any interview room with genuine confidence.
          </p>
        </div>

        {/* Audience Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {audiences.map((aud) => {
            const Icon = aud.icon;
            return (
              <div
                key={aud.title}
                className="rounded-2xl bg-mn-background border border-outline-variant/60 p-6 flex flex-col justify-between hover:border-surface-tint/40 transition-all duration-200"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-surface-tint mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-headline-md text-base font-bold text-foreground mb-2">
                    {aud.title}
                  </h3>
                  <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                    {aud.description}
                  </p>
                </div>
              </div>
            );
          })}

          {/* Quick statement card */}
          <div className="rounded-2xl bg-surface-container-high/60 border border-surface-tint/20 p-6 flex flex-col justify-center text-center">
            <span className="font-mono text-xs uppercase tracking-widest text-surface-tint mb-2 font-semibold">
              The Bottom Line
            </span>
            <p className="font-body-md text-sm text-foreground/90 font-medium">
              If you built it on GitHub, you should be able to defend it with pride.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
