"use client";

import React from "react";

// SVG Logos for Universities
const UniversityLogos = {
  "UC Berkeley": (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0">
      <path d="M12 2L1 7l11 5 9-4.09V17h2V7L12 2zm0 8.5L3.8 7 12 3.3 20.2 7 12 10.5zM4 10.8v5.7c0 3.2 4.5 5.5 8 5.5s8-2.3 8-5.5v-5.7l-8 3.6-8-3.6z"/>
    </svg>
  ),
  "Carnegie Mellon": (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0">
      <path d="M2 4h5v16H2V4zm7 0h5v16H9V4zm7 0h6v16h-6V4z"/>
    </svg>
  ),
  "Cornell": (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/>
    </svg>
  ),
  "Princeton": (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0">
      <path d="M12 2L3 6v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V6l-9-4zm0 4a3 3 0 110 6 3 3 0 010-6zm0 14c-2.7 0-5.2-1.3-6.7-3.4.1-1.7 3.4-2.6 6.7-2.6s6.6.9 6.7 2.6c-1.5 2.1-4 3.4-6.7 3.4z"/>
    </svg>
  ),
  "Waterloo": (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0">
      <path d="M4 4h4l4 12 4-12h4l-6 16h-4L4 4z"/>
    </svg>
  ),
  "Stanford": (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0">
      <path d="M12 2L7 10h3v10h4V10h3L12 2z"/>
    </svg>
  ),
  "MIT": (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0">
      <path d="M2 4h3v16H2V4zm5 0h3v11H7V4zm5 0h3v16h-3V4zm5 0h3v16h-3V4z"/>
    </svg>
  ),
  "Harvard": (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0">
      <path d="M4 3h4v7h8V3h4v18h-4v-7H8v7H4V3z"/>
    </svg>
  ),
  "IIT Bombay": (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0">
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 4a6 6 0 110 12 6 6 0 010-12z"/>
    </svg>
  ),
  "Georgia Tech": (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0">
      <path d="M3 4h18v4H14v12h-4V8H3V4z"/>
    </svg>
  ),
  "UT Austin": (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0">
      <path d="M2 7l10-5 10 5v2l-10 5-10-5V7zm0 6l10 5 10-5v2l-10 5-10-5v-2z"/>
    </svg>
  ),
  "UIUC": (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0">
      <path d="M6 3h12v4h-4v10h4v4H6v-4h4V7H6V3z"/>
    </svg>
  ),
};

// SVG Logos for Companies
const CompanyLogos = {
  "Google": (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0">
      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 15.987 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
    </svg>
  ),
  "NVIDIA": (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0">
      <path d="M7.747 18.257c-2.39-1.096-3.778-3.08-3.778-5.386 0-3.362 2.875-6.07 6.402-6.07 3.328 0 6.136 2.394 6.55 5.563h2.64C19.066 7.027 15.114 3.5 10.37 3.5 4.643 3.5 0 8.016 0 13.58c0 4.187 2.651 7.828 6.51 9.07l1.237-4.393z"/>
      <path d="M10.37 8.765c-2.484 0-4.5 1.954-4.5 4.364 0 2.213 1.705 4.025 3.914 4.316l1.373-4.88h3.64c-.397-2.16-2.347-3.8-4.427-3.8z"/>
    </svg>
  ),
  "Amazon": (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0">
      <path d="M13.917 12.27c-.244-.313-.675-.487-1.127-.487-.753 0-1.393.473-1.393 1.258 0 .762.593 1.272 1.472 1.272.488 0 .907-.177 1.157-.468l-.109-1.575zm1.905 4.072c-.419.297-1.144.577-2.023.577-1.85 0-3.064-1.042-3.064-2.825 0-1.783 1.241-2.73 3.01-2.73.742 0 1.543.238 1.93.523v-.354c0-.775-.544-1.252-1.572-1.252-.77 0-1.52.228-2.062.545l-.438-1.22c.692-.416 1.764-.707 2.82-.707 1.95 0 2.94 1.074 2.94 2.875v3.468c0 .878.077 1.527.24 1.92h-1.677c-.104-.216-.182-.676-.304-1.09z"/>
      <path d="M1.38 19.389c5.202 2.62 12.188 2.637 17.653-.872.257-.165.558-.027.346.257-1.31 1.748-4.782 3.197-8.98 3.197-4.453 0-8.625-1.636-10.222-3.413-.19-.211.082-.363.303-.269z"/>
    </svg>
  ),
  "Microsoft": (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0">
      <path d="M0 0h11v11H0zM13 0h11v11H13zM0 13h11v11H0zM13 13h11v11H13z"/>
    </svg>
  ),
  "Meta": (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0">
      <path d="M22.56 12.25c0-2.88-1.84-5.25-4.38-5.25-2.02 0-3.42 1.34-4.52 2.76-1.06-1.4-2.43-2.76-4.48-2.76-2.54 0-4.38 2.37-4.38 5.25 0 3.86 3.14 7.25 6.3 7.25 1.55 0 2.82-.7 3.84-1.74 1.02 1.04 2.29 1.74 3.84 1.74 3.16 0 6.3-3.39 6.3-7.25zm-14.4 3.97c-1.8 0-3.3-2.1-3.3-3.97 0-1.42.84-2.5 2.1-2.5 1.48 0 2.65 1.48 3.52 2.75-.75 2.16-1.42 3.72-2.32 3.72zm8.16 0c-.9 0-1.57-1.56-2.32-3.72.87-1.27 2.04-2.75 3.52-2.75 1.26 0 2.1 1.08 2.1 2.5 0 1.87-1.5 3.97-3.3 3.97z"/>
    </svg>
  ),
  "Adobe": (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0">
      <path d="M13.966 22H24V2h-10.034zM0 2v20h10.034zM12 9.932l4.133 9.932h-3.082l-1.05-2.617h-3.905l2.428-5.834z"/>
    </svg>
  ),
  "TCS": (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0">
      <path d="M2 4h20v3.5H13.75V20H10.25V7.5H2V4zm14 6.5h6v3h-6v-3zm0 4.5h6v3h-6v-3z"/>
    </svg>
  ),
  "Bosch": (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 17.5c-4.14 0-7.5-3.36-7.5-7.5S7.86 4.5 12 4.5s7.5 3.36 7.5 7.5-3.36 7.5-7.5 7.5zm-4-10h8v5H8z"/>
    </svg>
  ),
  "Apple": (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.48c.67-.82 1.13-1.96.99-3.1-.98.04-2.16.66-2.85 1.47-.61.71-1.15 1.88-.99 2.99 1.1.08 2.21-.54 2.85-1.36z"/>
    </svg>
  ),
  "Intel": (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0">
      <path d="M12 4C6.48 4 2 7.58 2 12s4.48 8 10 8 10-3.58 10-8-4.48-8-10-8zm-4.5 11h-2v-6h2v6zm-.5-7a1 1 0 110-2 1 1 0 010 2zm6.5 7h-2v-3.5c0-.8-.7-1.5-1.5-1.5s-1.5.7-1.5 1.5V15h-2v-6h2v.8c.6-.6 1.4-.8 2.2-.8 1.7 0 2.8 1.3 2.8 3V15zm5 0h-2v-6h2v6zm-.5-7a1 1 0 110-2 1 1 0 010 2z"/>
    </svg>
  ),
  "Salesforce": (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0">
      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
    </svg>
  ),
  "Oracle": (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0">
      <path d="M16.447 3.5H7.553C3.382 3.5 0 6.882 0 11.053c0 4.17 3.382 7.552 7.553 7.552h8.894C20.618 18.605 24 15.223 24 11.053 24 6.882 20.618 3.5 16.447 3.5zm-.105 11.21H7.658c-2.046 0-3.71-1.664-3.71-3.71 0-2.047 1.664-3.71 3.71-3.71h8.684c2.046 0 3.71 1.663 3.71 3.71 0 2.046-1.664 3.71-3.71 3.71z"/>
    </svg>
  ),
};

const UNIVERSITIES = [
  { name: "UC Berkeley" },
  { name: "Carnegie Mellon" },
  { name: "Cornell" },
  { name: "Princeton" },
  { name: "Waterloo" },
  { name: "Stanford" },
  { name: "MIT" },
  { name: "Harvard" },
  { name: "IIT Bombay" },
  { name: "Georgia Tech" },
  { name: "UT Austin" },
  { name: "UIUC" },
];

const COMPANIES = [
  { name: "Google" },
  { name: "NVIDIA" },
  { name: "Amazon" },
  { name: "Microsoft" },
  { name: "Meta" },
  { name: "Adobe" },
  { name: "TCS" },
  { name: "Bosch" },
  { name: "Apple" },
  { name: "Intel" },
  { name: "Salesforce" },
  { name: "Oracle" },
];

const LogoBadge = ({ name, isCompany = false }) => {
  const icon = isCompany ? CompanyLogos[name] : UniversityLogos[name];
  return (
    <div
      className="flex items-center gap-3 px-5 py-2.5 rounded-xl bg-surface-container-high/40 border border-border/40 hover:border-surface-tint/40 hover:bg-surface-container-high/80 transition-all text-on-background/70 hover:text-on-background group cursor-default select-none shrink-0"
      aria-label={`${name} logo`}
    >
      <div className="text-on-background/70 group-hover:text-surface-tint transition-colors">
        {icon}
      </div>
      <span className="font-label-caps text-xs md:text-sm font-semibold tracking-wide whitespace-nowrap">
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
                <LogoBadge key={`uni-1-${idx}`} name={uni.name} isCompany={false} />
              ))}
            </div>
            {/* Duplicated Second Sequence for Seamless Infinite Loop */}
            <div className="flex items-center gap-3 sm:gap-4 pr-3 sm:pr-4 shrink-0" aria-hidden="true">
              {UNIVERSITIES.map((uni, idx) => (
                <LogoBadge key={`uni-2-${idx}`} name={uni.name} isCompany={false} />
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
                <LogoBadge key={`comp-1-${idx}`} name={comp.name} isCompany={true} />
              ))}
            </div>
            {/* Duplicated Second Sequence for Seamless Infinite Loop */}
            <div className="flex items-center gap-3 sm:gap-4 pr-3 sm:pr-4 shrink-0" aria-hidden="true">
              {COMPANIES.map((comp, idx) => (
                <LogoBadge key={`comp-2-${idx}`} name={comp.name} isCompany={true} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
