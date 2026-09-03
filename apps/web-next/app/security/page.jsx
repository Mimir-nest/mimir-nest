"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Shield, Mail, Eye, Key, Sparkles, CheckCircle2 } from "lucide-react";
import dynamic from "next/dynamic";

const ParticleWave = dynamic(
  () => import("@/components/ui/particle-wave").then((mod) => mod.ParticleWave),
  { ssr: false }
);

const Security = () => {
  const securityPractices = [
    {
      title: "Dependency Updates",
      desc: "We track and update external packages weekly using Dependabot automation."
    },
    {
      title: "Static Security Scans",
      desc: "CodeQL static analysis automatically runs on repository updates to scan for common vulnerabilities."
    },
    {
      title: "Encrypted Connections",
      desc: "All traffic to Mimir Nest is served over secure, encrypted HTTPS via Vercel."
    },
    {
      title: "Safe Secret Handling",
      desc: "Sensitive credentials and deployment tokens are stored securely in GitHub Secrets, avoiding repository exposure."
    }
  ];

  return (
    <div className="min-h-screen bg-mn-background text-on-background selection:bg-surface-tint/30 flex flex-col justify-between">
      <div>
        <Navbar />

        {/* Hero Section */}
        <section className="relative bg-surface-container pt-[120px] md:pt-[150px] pb-16 md:pb-24 px-6 md:px-16 overflow-hidden rounded-b-3xl">
          {/* Background Particle Wave */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-65">
            <ParticleWave />
          </div>

          {/* Decorative Rings */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full border border-surface-tint/15 translate-x-1/4 -translate-y-1/4 pointer-events-none" />
          <div className="absolute top-0 right-0 w-[550px] h-[550px] rounded-full border border-surface-tint/20 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full border border-primary-container/40 -translate-x-1/2 translate-y-1/2 pointer-events-none" />

          <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-xs font-label-caps text-surface-tint tracking-widest uppercase mx-auto font-semibold">
              <Shield className="w-4 h-4 text-surface-tint" />
              <span>Security Sanctuary</span>
            </div>

            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-foreground leading-tight">
              Security
              <br />
              <span className="text-surface-tint">Guidelines.</span>
            </h1>

            <p className="font-body-lg text-body-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We take the security of Mimir Nest seriously. If you discover a security vulnerability, please report it responsibly so that we can investigate and address it.
            </p>
          </div>
        </section>

        {/* Document Body */}
        <main className="max-w-4xl mx-auto px-6 py-16">
          <div className="bg-surface-container-lowest rounded-[40px] border border-outline-variant/40 p-6 sm:p-10 md:p-14 shadow-sm space-y-12">
            
            {/* Report a Vulnerability */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-mn-primary font-headline-md flex items-center gap-2.5">
                <Mail className="w-5 h-5 text-surface-tint" />
                <span>Report a vulnerability</span>
              </h2>
              <p className="text-on-surface-variant font-body-md text-sm leading-relaxed">
                Please do NOT publicly disclose security vulnerabilities in public GitHub issues. Instead, report them privately by emailing us directly:
              </p>
              <div className="text-center py-4 bg-surface-container rounded-2xl border border-outline-variant/30">
                <a
                  href="mailto:mimirnest@gmail.com"
                  className="text-lg font-bold text-surface-tint hover:underline"
                >
                  mimirnest@gmail.com
                </a>
              </div>
              <p className="text-on-surface-variant font-body-md text-sm leading-relaxed">
                When reporting, please include as much detail as possible to help us reproduce and resolve the issue:
              </p>
              <ul className="pl-6 list-disc text-sm text-on-surface-variant space-y-2 font-body-md">
                <li>Description and potential impact of the vulnerability</li>
                <li>Clear steps to reproduce (or a proof-of-concept script/exploit)</li>
                <li>Affected page, API endpoint, or package/component</li>
                <li>Relevant screenshots, videos, or logs where appropriate</li>
              </ul>
            </div>

            {/* Responsible Disclosure */}
            <div className="space-y-4 pt-4 border-t border-outline-variant/30">
              <h2 className="text-xl font-bold text-mn-primary font-headline-md flex items-center gap-2.5">
                <Eye className="w-5 h-5 text-surface-tint" />
                <span>Responsible disclosure</span>
              </h2>
              <p className="text-on-surface-variant font-body-md text-sm leading-relaxed">
                Please allow reasonable time for the issue to be investigated, verified, and addressed before disclosing it publicly or publishing details.
              </p>
            </div>

            {/* What to expect */}
            <div className="space-y-4 pt-4 border-t border-outline-variant/30">
              <h2 className="text-xl font-bold text-mn-primary font-headline-md flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-surface-tint" />
                <span>What to expect</span>
              </h2>
              <p className="text-on-surface-variant font-body-md text-sm leading-relaxed">
                Once a report is submitted, we will review the details, investigate the issue locally, and coordinate with you to address the vulnerability before deploying remediation updates.
              </p>
            </div>

            {/* Security Practices */}
            <div className="space-y-6 pt-4 border-t border-outline-variant/30">
              <h2 className="text-xl font-bold text-mn-primary font-headline-md flex items-center gap-2.5">
                <Key className="w-5 h-5 text-surface-tint" />
                <span>Security practices</span>
              </h2>
              <p className="text-on-surface-variant font-body-md text-sm leading-relaxed">
                Mimir Nest leverages the following baseline open-source security practices built directly into our codebase:
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                {securityPractices.map((practice, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-surface-container border border-outline-variant/30 space-y-2">
                    <h3 className="text-sm font-bold text-foreground">{practice.title}</h3>
                    <p className="text-xs text-on-surface-variant leading-relaxed font-body-md">
                      {practice.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Security;
