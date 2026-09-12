"use client";

import React from "react";

const UNIVERSITIES = [
  { name: "UC Berkeley", logo: "/logos/berkeley.svg" },
  { name: "Carnegie Mellon University", logo: "/logos/cmu.svg" },
  { name: "Cornell University", logo: "/logos/cornell.svg" },
  { name: "Princeton University", logo: "/logos/princeton.svg" },
  { name: "University of Waterloo", logo: "/logos/waterloo.svg" },
  { name: "Stanford University", logo: "/logos/stanford.svg" },
];

const COMPANIES = [
  { name: "Bosch", logo: "/logos/bosch.svg" },
  { name: "Tata Consultancy Services (TCS)", logo: "/logos/tcs.svg" },
  { name: "Google", logo: "/logos/google.svg" },
  { name: "NVIDIA", logo: "/logos/nvidia.svg" },
  { name: "Amazon", logo: "/logos/amazon.svg" },
  { name: "Microsoft", logo: "/logos/microsoft.svg" },
  { name: "Meta", logo: "/logos/meta.svg" },
  { name: "Adobe", logo: "/logos/adobe.svg" },
];

const TrustedBy = () => {
  return (
    <section className="relative py-16 md:py-24 bg-mn-background overflow-hidden border-y border-border/40">
      <div className="max-w-7xl mx-auto px-6 mb-12 md:mb-16 text-center">
        <p className="font-label-caps text-xs text-surface-tint tracking-widest uppercase font-semibold mb-3">
          TRUSTED BY USERS FROM
        </p>
        <h2 className="font-headline-lg text-2xl md:text-3xl lg:text-4xl text-on-background max-w-3xl mx-auto mb-3 font-bold tracking-tight">
          Students and professionals from leading universities and companies
        </h2>
        <p className="font-body-md text-sm md:text-base text-on-background/70 max-w-xl mx-auto leading-relaxed">
          Join 3,000+ students and developers using Mimir Nest to learn, practice, and prepare.
        </p>
      </div>

      {/* Marquee Container with subtle edge gradient masks */}
      <div className="relative w-full overflow-hidden group">
        {/* Edge Fade Masks */}
        <div className="pointer-events-none absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-mn-background via-mn-background/80 to-transparent z-10" />
        <div className="pointer-events-none absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-mn-background via-mn-background/80 to-transparent z-10" />

        {/* ROW 1: Universities (Left moving marquee) */}
        <div className="flex w-full overflow-hidden mb-8 sm:mb-12">
          <div className="flex w-max animate-marquee-left group-hover:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center">
            {/* First Sequence */}
            <div className="flex items-center gap-10 sm:gap-14 md:gap-20 pr-10 sm:pr-14 md:pr-20 shrink-0">
              {UNIVERSITIES.map((uni, idx) => (
                <img
                  key={`uni-1-${idx}`}
                  src={uni.logo}
                  alt={uni.name}
                  title={uni.name}
                  className="h-7 sm:h-9 md:h-10 w-auto max-w-[130px] sm:max-w-[170px] md:max-w-[200px] object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity duration-300 shrink-0 select-none pointer-events-auto"
                  loading="lazy"
                />
              ))}
            </div>
            {/* Duplicated Second Sequence for Seamless Infinite Loop */}
            <div className="flex items-center gap-10 sm:gap-14 md:gap-20 pr-10 sm:pr-14 md:pr-20 shrink-0" aria-hidden="true">
              {UNIVERSITIES.map((uni, idx) => (
                <img
                  key={`uni-2-${idx}`}
                  src={uni.logo}
                  alt=""
                  title={uni.name}
                  className="h-7 sm:h-9 md:h-10 w-auto max-w-[130px] sm:max-w-[170px] md:max-w-[200px] object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity duration-300 shrink-0 select-none pointer-events-auto"
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </div>

        {/* ROW 2: Companies (Right moving marquee) */}
        <div className="flex w-full overflow-hidden">
          <div className="flex w-max animate-marquee-right group-hover:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center">
            {/* First Sequence */}
            <div className="flex items-center gap-10 sm:gap-14 md:gap-20 pr-10 sm:pr-14 md:pr-20 shrink-0">
              {COMPANIES.map((comp, idx) => (
                <img
                  key={`comp-1-${idx}`}
                  src={comp.logo}
                  alt={comp.name}
                  title={comp.name}
                  className="h-7 sm:h-9 md:h-10 w-auto max-w-[130px] sm:max-w-[170px] md:max-w-[200px] object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity duration-300 shrink-0 select-none pointer-events-auto"
                  loading="lazy"
                />
              ))}
            </div>
            {/* Duplicated Second Sequence for Seamless Infinite Loop */}
            <div className="flex items-center gap-10 sm:gap-14 md:gap-20 pr-10 sm:pr-14 md:pr-20 shrink-0" aria-hidden="true">
              {COMPANIES.map((comp, idx) => (
                <img
                  key={`comp-2-${idx}`}
                  src={comp.logo}
                  alt=""
                  title={comp.name}
                  className="h-7 sm:h-9 md:h-10 w-auto max-w-[130px] sm:max-w-[170px] md:max-w-[200px] object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity duration-300 shrink-0 select-none pointer-events-auto"
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
