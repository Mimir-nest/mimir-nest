"use client";

import React, { useState } from "react";

const companyDomains = {
  google: "google.com",
  amazon: "amazon.com",
  microsoft: "microsoft.com",
  meta: "meta.com",
  facebook: "meta.com",
  apple: "apple.com",
  adobe: "adobe.com",
  salesforce: "salesforce.com",
  atlassian: "atlassian.com",
  flipkart: "flipkart.com",
  walmart: "walmart.com",
  accenture: "accenture.com",
  deloitte: "deloitte.com",
  mckinsey: "www.mckinsey.com",
  mckinseycompany: "www.mckinsey.com",
  "mckinsey-company": "www.mckinsey.com",
  "mckinsey & company": "www.mckinsey.com",
  bcg: "bcg.com",
  bostonconsultinggroup: "bcg.com",
  bain: "bain.com",
  baincompany: "bain.com",
  "bain-company": "bain.com",
  "bain & company": "bain.com",
  zs: "zs.com",
  zsassociates: "zs.com",
  "zs-associates": "zs.com",
  goldmansachs: "goldmansachs.com",
  "goldman-sachs": "goldmansachs.com",
  jpmorgan: "jpmorganchase.com",
  jpmorganchase: "jpmorganchase.com",
  "jpmorgan-chase": "jpmorganchase.com",
  "j.p. morgan": "jpmorganchase.com",
  morganstanley: "morganstanley.com",
  "morgan-stanley": "morganstanley.com",
  kpmg: "kpmg.com",
};

export default function CompanyLogo({
  company = "",
  className = "w-8 h-8",
  size = 128,
}) {
  const [sourceIndex, setSourceIndex] = useState(0);

  const cleanName = (company || "").trim();
  const normalized = cleanName
    .toLowerCase()
    .replace(/[.'\s&]/g, "")
    .replace(/_/g, "-");

  const domain =
    companyDomains[cleanName.toLowerCase()] ||
    companyDomains[normalized] ||
    `${normalized}.com`;

  // Google s2 favicon is fastest and provides 128px official crisp icons
  const logoSources = [
    `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`,
    `https://icons.duckduckgo.com/ip3/${domain}.ico`,
    `https://unavatar.io/${domain}`,
  ];

  const fallbackLabel =
    cleanName
      .split(/[\s&]+/)
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase())
      .join("")
      .slice(0, 2) || "CO";

  if (sourceIndex >= logoSources.length) {
    return (
      <div
        className={`flex items-center justify-center rounded-xl bg-[#1E2020] text-[#FF5A36] font-bold text-xs tracking-wider border border-[#242525] shrink-0 select-none ${className}`}
      >
        <span>{fallbackLabel}</span>
      </div>
    );
  }

  return (
    <img
      src={logoSources[sourceIndex]}
      alt={`${cleanName} logo`}
      className={`object-contain transition-transform duration-300 group-hover:scale-110 shrink-0 ${className}`}
      onError={() => setSourceIndex((current) => current + 1)}
      loading="lazy"
    />
  );
}
