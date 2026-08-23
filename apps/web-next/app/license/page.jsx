"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FileText, Sparkles, CheckCircle2, AlertTriangle, Github } from "lucide-react";
import dynamic from "next/dynamic";

const ParticleWave = dynamic(
  () => import("@/components/ui/particle-wave").then((mod) => mod.ParticleWave),
  { ssr: false }
);

const License = () => {
  const permissions = [
    "You can use the software freely.",
    "You can modify the software.",
    "You can distribute copies.",
    "You can use it in private or commercial projects."
  ];

  const conditions = [
    "The original copyright and license notice must remain with copies or substantial portions of the software.",
    "The software is provided without warranty."
  ];

  const fullLicenseText = `MIT License

Copyright (c) 2026 Sachin Patel

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.`;

  return (
    <div className="min-h-screen bg-mn-background text-on-background selection:bg-surface-tint/30 flex flex-col justify-between">
      <div>
        <Navbar />

        {/* Hero Section */}
        <section className="relative bg-surface-container pt-[120px] md:pt-[150px] pb-16 md:pb-24 px-6 md:px-16 overflow-hidden rounded-b-3xl">
          {/* Background Particle Wave */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-25">
            <ParticleWave />
          </div>

          {/* Decorative Rings */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full border border-surface-tint/15 translate-x-1/4 -translate-y-1/4 pointer-events-none" />
          <div className="absolute top-0 right-0 w-[550px] h-[550px] rounded-full border border-surface-tint/20 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full border border-primary-container/40 -translate-x-1/2 translate-y-1/2 pointer-events-none" />

          <div className="max-w-4xl mx-auto relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high/60 text-xs font-label-caps text-surface-tint tracking-widest uppercase font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Legal</span>
            </div>

            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-foreground leading-tight tracking-tight">
              MIT License
            </h1>

            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
              Mimir Nest is released under the MIT License, allowing the software to be used, modified, and distributed with minimal restrictions.
            </p>

            {/* Metadata Summary Grid */}
            <div className="grid grid-cols-2 gap-8 max-w-xs py-4 border-t border-b border-border/40 font-body-md text-sm mt-8 text-on-surface-variant">
              <div>
                <span className="block text-[10px] font-label-caps text-muted-foreground/60 uppercase tracking-widest mb-1">License</span>
                <span className="font-semibold text-foreground">MIT License</span>
              </div>
              <div>
                <span className="block text-[10px] font-label-caps text-muted-foreground/60 uppercase tracking-widest mb-1">Copyright</span>
                <span className="font-semibold text-foreground">© 2026 Sachin Patel</span>
              </div>
            </div>
          </div>
        </section>

        {/* Document Body */}
        <main className="max-w-4xl mx-auto px-6 py-16 space-y-16">
          
          {/* 1. What this means */}
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-foreground font-headline-md">
              What this means
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <span className="text-xs font-label-caps text-surface-tint uppercase tracking-widest font-semibold block">Permissions</span>
                <ul className="space-y-2.5">
                  {permissions.map((perm, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-on-surface-variant font-body-md leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-surface-tint shrink-0 mt-0.5" />
                      <span>{perm}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <span className="text-xs font-label-caps text-red-500 uppercase tracking-widest font-semibold block">Conditions & Disclaimers</span>
                <ul className="space-y-2.5">
                  {conditions.map((cond, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-on-surface-variant font-body-md leading-relaxed">
                      <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <span>{cond}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-surface-container border border-outline-variant/30 text-xs text-on-surface-variant/80 font-body-md leading-relaxed">
              <strong>Please Note:</strong> This summary is provided for convenience and is not a replacement for the actual license text below.
            </div>
          </section>

          {/* 2. Full License */}
          <section className="space-y-6 border-t border-border/40 pt-12">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-xl font-bold text-foreground font-headline-md flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-surface-tint" />
                <span>Full License</span>
              </h2>
              
              <a
                href="https://github.com/Mimir-nest/mimir-nest/blob/main/LICENSE"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-label-caps text-surface-tint hover:underline uppercase tracking-widest font-semibold"
              >
                <Github className="w-4 h-4" />
                <span>View LICENSE on GitHub</span>
              </a>
            </div>

            <div className="p-6 md:p-8 rounded-xl bg-surface-container/60 border border-outline-variant/30 font-mono text-sm leading-relaxed overflow-x-auto text-foreground whitespace-pre shadow-inner select-text">
              {fullLicenseText}
            </div>

            <p className="text-xs text-on-surface-variant/60 font-body-md leading-relaxed text-center italic">
              This page provides a readable presentation of the repository license. The LICENSE file in the repository is the authoritative version.
            </p>
          </section>

        </main>
      </div>

      <Footer />
    </div>
  );
};

export default License;
