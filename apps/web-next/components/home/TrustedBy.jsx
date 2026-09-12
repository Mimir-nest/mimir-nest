"use client";

import React from "react";

const UNIVERSITIES = [
  { name: "UC Berkeley", code: "CAL", category: "University" },
  { name: "Carnegie Mellon", code: "CMU", category: "University" },
  { name: "Cornell University", code: "CORNELL", category: "University" },
  { name: "Princeton", code: "PRINCETON", category: "University" },
  { name: "Waterloo", code: "UWATERLOO", category: "University" },
  { name: "Stanford", code: "STANFORD", category: "University" },
  { name: "MIT", code: "MIT", category: "University" },
  { name: "Harvard", code: "HARVARD", category: "University" },
  { name: "IIT Bombay", code: "IITB", category: "University" },
  { name: "Georgia Tech", code: "GATECH", category: "University" },
  { name: "UT Austin", code: "TEXAS", category: "University" },
  { name: "UIUC", code: "UIUC", category: "University" },
];

const COMPANIES = [
  { name: "Google", code: "GOOGLE", category: "Company" },
  { name: "NVIDIA", code: "NVIDIA", category: "Company" },
  { name: "Amazon", code: "AMAZON", category: "Company" },
  { name: "Microsoft", code: "MICROSOFT", category: "Company" },
  { name: "Meta", code: "META", category: "Company" },
  { name: "Adobe", code: "ADOBE", category: "Company" },
  { name: "TCS", code: "TCS", category: "Company" },
  { name: "Bosch", code: "BOSCH", category: "Company" },
  { name: "Apple", code: "APPLE", category: "Company" },
  { name: "Intel", code: "INTEL", category: "Company" },
  { name: "Salesforce", code: "SALESFORCE", category: "Company" },
  { name: "Oracle", code: "ORACLE", category: "Company" },
];

// Clean monochrome SVG emblems for Universities
const UniversityLogo = ({ name, code }) => {
  return (
    <div
      className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-surface-container-high/40 border border-border/40 hover:border-surface-tint/30 transition-colors group cursor-default select-none shrink-0"
      aria-label={`${name} user affiliation`}
    >
      <div className="w-7 h-7 rounded-lg bg-surface-container-highest flex items-center justify-center border border-border/60 text-[11px] font-bold text-on-background/70 group-hover:text-surface-tint transition-colors">
        {code.slice(0, 3)}
      </div>
      <span className="font-label-caps text-xs md:text-sm font-medium tracking-wide text-on-background/75 group-hover:text-on-background transition-colors whitespace-nowrap">
        {name}
      </span>
    </div>
  );
};

// Clean monochrome SVG emblems for Companies
const CompanyLogo = ({ name, code }) => {
  return (
    <div
      className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-surface-container-high/40 border border-border/40 hover:border-surface-tint/30 transition-colors group cursor-default select-none shrink-0"
      aria-label={`${name} user affiliation`}
    >
      <div className="w-7 h-7 rounded-lg bg-surface-container-highest flex items-center justify-center border border-border/60 text-[11px] font-bold text-on-background/70 group-hover:text-surface-tint transition-colors">
        {code.slice(0, 2)}
      </div>
      <span className="font-label-caps text-xs md:text-sm font-medium tracking-wide text-on-background/75 group-hover:text-on-background transition-colors whitespace-nowrap">
        {name}
      </span>
    </div>
  );
};

const TrustedBy = () => {
  return (
    <section className="relative py-16 md:py-24 bg-mn-background overflow-hidden border-y border-border/40">
      <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
        <p className="font-label-caps text-xs text-surface-tint tracking-widest uppercase font-semibold mb-3">
          TRUSTED BY USERS FROM
        </p>
        <h2 className="font-headline-lg text-2xl md:text-3xl text-on-background max-w-3xl mx-auto mb-3 font-bold tracking-tight">
          Students and professionals from leading universities and companies
        </h2>
        <p className="font-body-md text-sm md:text-base text-on-background/70 max-w-xl mx-auto leading-relaxed">
          Join 3,000+ students and developers using Mimir Nest to learn, practice, and prepare.
        </p>
      </div>

      {/* Marquee Container with subtle side gradient masks */}
      <div className="relative w-full overflow-hidden group">
        {/* Subtle Edge Fade Masks */}
        <div className="pointer-events-none absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-mn-background via-mn-background/80 to-transparent z-10" />
        <div className="pointer-events-none absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-mn-background via-mn-background/80 to-transparent z-10" />

        {/* ROW 1: Universities (Left moving marquee) */}
        <div className="flex w-full overflow-hidden mb-4 sm:mb-6">
          <div className="flex w-max animate-marquee-left group-hover:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center">
            {/* First Sequence */}
            <div className="flex items-center gap-3 sm:gap-4 pr-3 sm:pr-4 shrink-0">
              {UNIVERSITIES.map((uni, idx) => (
                <UniversityLogo key={`uni-1-${idx}`} name={uni.name} code={uni.code} />
              ))}
            </div>
            {/* Duplicated Second Sequence for Seamless Infinite Loop */}
            <div className="flex items-center gap-3 sm:gap-4 pr-3 sm:pr-4 shrink-0" aria-hidden="true">
              {UNIVERSITIES.map((uni, idx) => (
                <UniversityLogo key={`uni-2-${idx}`} name={uni.name} code={uni.code} />
              ))}
            </div>
          </div>
        </div>

        {/* ROW 2: Companies (Right moving marquee) */}
        <div className="flex w-full overflow-hidden">
          <div className="flex w-max animate-marquee-right group-hover:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center">
            {/* First Sequence */}
            <div className="flex items-center gap-3 sm:gap-4 pr-3 sm:pr-4 shrink-0">
              {COMPANIES.map((comp, idx) => (
                <CompanyLogo key={`comp-1-${idx}`} name={comp.name} code={comp.code} />
              ))}
            </div>
            {/* Duplicated Second Sequence for Seamless Infinite Loop */}
            <div className="flex items-center gap-3 sm:gap-4 pr-3 sm:pr-4 shrink-0" aria-hidden="true">
              {COMPANIES.map((comp, idx) => (
                <CompanyLogo key={`comp-2-${idx}`} name={comp.name} code={comp.code} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
