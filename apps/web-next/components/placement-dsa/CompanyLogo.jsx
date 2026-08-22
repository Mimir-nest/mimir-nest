"use client";

import React, { useState } from "react";
const CompanyLogo = ({ company, className = "w-8 h-8", }) => {
    const [sourceIndex, setSourceIndex] = useState(0);
    // Map company slugs to their actual domain names
    const companyDomains = {
        google: "google.com",
        amazon: "amazon.com",
        microsoft: "microsoft.com",
        facebook: "meta.com",
        meta: "meta.com",
        apple: "apple.com",
        netflix: "netflix.com",
        uber: "uber.com",
        airbnb: "airbnb.com",
        linkedin: "linkedin.com",
        twitter: "x.com",
        x: "x.com",
        adobe: "adobe.com",
        salesforce: "salesforce.com",
        dropbox: "dropbox.com",
        spotify: "spotify.com",
        snapchat: "snap.com",
        snap: "snap.com",
        pinterest: "pinterest.com",
        robinhood: "robinhood.com",
        "palantir-technologies": "palantir.com",
        nvidia: "nvidia.com",
        samsung: "samsung.com",
        sap: "sap.com",
        nutanix: "nutanix.com",
        opendoor: "opendoor.com",
        "pocket-gems": "pocketgems.com",
        rubrik: "rubrik.com",
        splunk: "splunk.com",
        "riot-games": "riotgames.com",
        alibaba: "alibaba.com",
        coursera: "coursera.org",
        "akuna-capital": "akunacapital.com",
        "cruise-automation": "getcruise.com",
        cruise: "getcruise.com",
        didi: "didiglobal.com",
        databricks: "databricks.com",
        doordash: "doordash.com",
        docusign: "docusign.com",
        netease: "netease.com",
        "morgan-stanley": "morganstanley.com",
        "deutsche-bank": "db.com",
        dataminr: "dataminr.com",
        dell: "dell.com",
        drawbridge: "drawbridge.com",
        goldman_sachs: "goldmansachs.com",
        "goldman-sachs": "goldmansachs.com",
        bloomberg: "bloomberg.com",
        atlassian: "atlassian.com",
        stripe: "stripe.com",
        bytedance: "bytedance.com",
        tiktok: "tiktok.com",
        oracle: "oracle.com",
        cisco: "cisco.com",
        intel: "intel.com",
        qualcomm: "qualcomm.com",
        twilio: "twilio.com",
        zoom: "zoom.us",
        snowflake: "snowflake.com",
        coinbase: "coinbase.com",
    };
    const normalizedCompany = company
        .toLowerCase()
        .replace(/[.'\s]/g, "")
        .replace(/_/g, "-");
    const domain = companyDomains[normalizedCompany] ||
        `${normalizedCompany.replace(/-/g, "")}.com`;
    const logoSources = [
        `https://unavatar.io/${domain}`,
        `https://logo.clearbit.com/${domain}`,
        `https://icons.duckduckgo.com/ip3/${domain}.ico`,
        `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
    ];
    const fallbackLabel = company
        .split("-")
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase())
        .join("")
        .slice(0, 2) || "CO";
    if (sourceIndex >= logoSources.length) {
        return (<div className={`flex items-center justify-center bg-surface-container rounded-xl text-mn-primary font-bold text-xs tracking-wider border border-outline-variant/30 ${className}`}>
        <span>{fallbackLabel}</span>
      </div>);
    }
    return (<img src={logoSources[sourceIndex]} alt={`${company} logo`} className={`object-contain transition-transform duration-300 group-hover:scale-110 ${className}`} onError={() => setSourceIndex((current) => current + 1)} loading="lazy"/>);
};
export default CompanyLogo;
