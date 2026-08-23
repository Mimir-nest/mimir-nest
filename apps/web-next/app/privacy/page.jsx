import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Shield, Sparkles, FileText, Calendar, Info, Eye, Database, Globe, CheckCircle2, Lock, Mail, AlertTriangle } from "lucide-react";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-mn-background text-on-background selection:bg-surface-tint/30 flex flex-col justify-between">
      <div>
        <Navbar />

        {/* Hero Section */}
        <section className="relative bg-surface-container pt-[120px] md:pt-[150px] pb-16 md:pb-24 px-6 md:px-16 overflow-hidden rounded-b-3xl">
          {/* Decorative Rings */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full border border-surface-tint/15 translate-x-1/4 -translate-y-1/4 pointer-events-none" />
          <div className="absolute top-0 right-0 w-[550px] h-[550px] rounded-full border border-surface-tint/20 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full border border-primary-container/40 -translate-x-1/2 translate-y-1/2 pointer-events-none" />

          <div className="max-w-4xl mx-auto relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high/60 text-xs font-label-caps text-surface-tint tracking-widest uppercase font-semibold">
              <Shield className="w-3.5 h-3.5" />
              <span>Data & Privacy</span>
            </div>

            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-foreground leading-tight tracking-tight">
              Privacy Policy
            </h1>

            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
              This policy explains what information Mimir Nest processes and how your data is handled when you use the website.
            </p>

            <div className="flex items-center gap-2 text-xs font-label-caps text-on-surface-variant/75 tracking-widest font-semibold pt-4">
              <Calendar className="w-4 h-4 text-surface-tint" />
              <span>Effective Date: August 23, 2026</span>
            </div>
          </div>
        </section>

        {/* Document Body */}
        <main className="max-w-4xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Sidebar Table of Contents */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-4 hidden lg:block border-l border-border/40 pl-6">
            <span className="block text-[10px] font-label-caps text-muted-foreground/60 uppercase tracking-widest font-bold">Contents</span>
            <nav className="flex flex-col gap-2.5 text-xs font-body-md text-on-surface-variant">
              <a href="#overview" className="hover:text-surface-tint transition-colors">1. Overview</a>
              <a href="#info-collect" className="hover:text-surface-tint transition-colors">2. Information We Collect</a>
              <a href="#local-storage" className="hover:text-surface-tint transition-colors">3. Local Storage</a>
              <a href="#use" className="hover:text-surface-tint transition-colors">4. How We Use Information</a>
              <a href="#analytics" className="hover:text-surface-tint transition-colors">5. Google Analytics</a>
              <a href="#third-party" className="hover:text-surface-tint transition-colors">6. Third-Party Services</a>
              <a href="#sharing" className="hover:text-surface-tint transition-colors">7. Data Sharing</a>
              <a href="#retention" className="hover:text-surface-tint transition-colors">8. Retention</a>
              <a href="#security" className="hover:text-surface-tint transition-colors">9. Security</a>
              <a href="#choices" className="hover:text-surface-tint transition-colors">10. Your Choices and Rights</a>
              <a href="#children" className="hover:text-surface-tint transition-colors">11. Children's Privacy</a>
              <a href="#changes" className="hover:text-surface-tint transition-colors">12. Changes to this Policy</a>
              <a href="#contact" className="hover:text-surface-tint transition-colors">13. Contact Us</a>
            </nav>
          </aside>

          {/* Privacy Content */}
          <div className="lg:col-span-8 space-y-12 text-on-surface-variant font-body-md text-sm leading-relaxed select-text">
            
            {/* 1. Overview */}
            <section id="overview" className="space-y-4 scroll-mt-28">
              <h2 className="text-xl font-bold text-foreground font-headline-md">
                1. Overview
              </h2>
              <p>
                Mimir Nest is an open-source student platform. The project is designed with the objective of minimizing unnecessary data collection, allowing students to access utilities without subscription barriers or commercial tracking. This policy details what data may be processed when you interact with the website at <a href="https://mimirnest.vercel.app/" className="text-surface-tint hover:underline">mimirnest.vercel.app</a>.
              </p>
            </section>

            {/* 2. Information We Collect */}
            <section id="info-collect" className="space-y-4 scroll-mt-28 border-t border-border/40 pt-8">
              <h2 className="text-xl font-bold text-foreground font-headline-md">
                2. Information We Collect
              </h2>
              
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-foreground">Information You Provide</h3>
                <p>
                  Mimir Nest does not support user accounts, profile registration, or newsletters. When you browse the site, you do not input personal identifiers. If you voluntarily write to us at <a href="mailto:mimirnest@gmail.com" className="text-surface-tint hover:underline font-semibold">mimirnest@gmail.com</a>, we will process your email address and any message content to address your inquiry.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-bold text-foreground">Analytics Information</h3>
                <p>
                  Mimir Nest integrates Google Analytics (measurement ID <code>G-S9BCG5CN4G</code>). This service collects telemetry concerning how users access the site, including request timestamps, approximate geolocation (derived from IP addresses), browser types, and system configurations.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-bold text-foreground">Technical / Hosting Information</h3>
                <p>
                  Like most websites, our hosting infrastructure (Vercel) automatically processes standard web server log entries on every request. This includes your IP address, browser user-agent header, request pathways, and access timestamps. Mimir Nest does not maintain or copy these infrastructure logs locally.
                </p>
              </div>
            </section>

            {/* 3. Local Storage */}
            <section id="local-storage" className="space-y-4 scroll-mt-28 border-t border-border/40 pt-8">
              <h2 className="text-xl font-bold text-foreground font-headline-md">
                3. Local Storage
              </h2>
              <p>
                To provide persistent preferences and utilities without requiring accounts or cloud databases, Mimir Nest stores files and configurations directly inside your browser using the <code>localStorage</code> API:
              </p>
              <ul className="pl-6 list-disc space-y-1.5">
                <li><strong>Pomodoro Timer Settings & Stats:</strong> Saves active timer configurations, completed focus counts, and streak histories.</li>
                <li><strong>Placement DSA SOLVED logs:</strong> Saves checked statuses representing which questions you have solved locally.</li>
              </ul>
              <p>
                Based on our codebase audit, this stored browser information remains entirely client-side. It is never transmitted back to Mimir Nest servers or uploaded to any third-party services. You can clear this data at any time by utilizing your browser options to clear site storage cache.
              </p>
            </section>

            {/* 4. How We Use Information */}
            <section id="use" className="space-y-4 scroll-mt-28 border-t border-border/40 pt-8">
              <h2 className="text-xl font-bold text-foreground font-headline-md">
                4. How We Use Information
              </h2>
              <p>
                Mimir Nest and its service providers process information for the following specific purposes:
              </p>
              <ul className="pl-6 list-disc space-y-1.5">
                <li>Preserving local workspace settings and tools preferences in your browser.</li>
                <li>Measuring aggregate, non-identifying traffic patterns to monitor website usage.</li>
                <li>Diagnosing errors, improving site responsiveness, and preventing network abuse.</li>
                <li>Replying to manual inquiries submitted via email support.</li>
              </ul>
            </section>

            {/* 5. Google Analytics */}
            <section id="analytics" className="space-y-4 scroll-mt-28 border-t border-border/40 pt-8">
              <h2 className="text-xl font-bold text-foreground font-headline-md">
                5. Google Analytics
              </h2>
              <p>
                Google Analytics is a telemetry service provided by Google LLC. It leverages identifiers and cookies to compile reports on site traffic. Google's data handling is outlined in the <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-surface-tint hover:underline font-semibold">Google Privacy Policy</a> and <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-surface-tint hover:underline font-semibold">How Google uses information from sites</a>.
              </p>
              <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20 text-xs text-on-surface-variant space-y-2 leading-relaxed">
                <div className="flex items-center gap-2 text-red-500 font-bold">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Important Implementation Disclosure</span>
                </div>
                <p>
                  Google Analytics script loads and runs immediately upon page access. Mimir Nest does not currently feature a cookie consent banner. If you do not wish to be tracked, you can block the script by utilizing client-side privacy extensions (like uBlock Origin) or configuring your browser to block tracking scripts.
                </p>
              </div>
            </section>

            {/* 6. Third-Party Services */}
            <section id="third-party" className="space-y-4 scroll-mt-28 border-t border-border/40 pt-8">
              <h2 className="text-xl font-bold text-foreground font-headline-md">
                6. Third-Party Services
              </h2>
              <p>
                The following service providers process information necessary to host and analyze our platform:
              </p>
              
              <div className="overflow-x-auto rounded-xl border border-outline-variant/30">
                <table className="min-w-full divide-y divide-border/40 text-xs">
                  <thead className="bg-surface-container">
                    <tr>
                      <th className="px-4 py-3 text-left font-bold text-foreground uppercase tracking-wider">Provider</th>
                      <th className="px-4 py-3 text-left font-bold text-foreground uppercase tracking-wider">Purpose</th>
                      <th className="px-4 py-3 text-left font-bold text-foreground uppercase tracking-wider">Data Processed & Policy</th>
                    </tr>
                  </thead>
                  <tbody className="bg-surface-container-lowest divide-y divide-border/30">
                    <tr>
                      <td className="px-4 py-3 font-semibold text-foreground">Vercel</td>
                      <td className="px-4 py-3">Hosting & CDN Infrastructure</td>
                      <td className="px-4 py-3">
                        IP address, request paths, user agent. <br />
                        <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-surface-tint hover:underline font-medium">Vercel Privacy Policy</a>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-foreground">Google LLC</td>
                      <td className="px-4 py-3">Usage Telemetry & Traffic Auditing</td>
                      <td className="px-4 py-3">
                        Page interactions, browser metrics, cookies. <br />
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-surface-tint hover:underline font-medium">Google Privacy Policy</a>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-foreground">GitHub</td>
                      <td className="px-4 py-3">Code Repository & Collaboration</td>
                      <td className="px-4 py-3">
                        Processes account info of developers viewing or contributing to the codebase directly. <br />
                        <a href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement" target="_blank" rel="noopener noreferrer" className="text-surface-tint hover:underline font-medium">GitHub Statement</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 7. Data Sharing */}
            <section id="sharing" className="space-y-4 scroll-mt-28 border-t border-border/40 pt-8">
              <h2 className="text-xl font-bold text-foreground font-headline-md">
                7. Data Sharing
              </h2>
              <p>
                Mimir Nest does not sell, barter, or distribute your information to advertising agencies or data brokers. Data processing is strictly limited to the infrastructure partners (Vercel and Google Analytics) needed to load and evaluate the website's performance, subject to their respective configurations.
              </p>
            </section>

            {/* 8. Retention */}
            <section id="retention" className="space-y-4 scroll-mt-28 border-t border-border/40 pt-8">
              <h2 className="text-xl font-bold text-foreground font-headline-md">
                8. Data Retention
              </h2>
              
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground">Local Browser Data</h3>
                <p>
                  Data inside your browser's <code>localStorage</code> is retained indefinitely until you choose to clear your browser cache or site storage.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground">Contact Communications</h3>
                <p>
                  Any email correspondence sent to <code>mimirnest@gmail.com</code> is retained as long as necessary to address the request and maintain proper correspondence.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground">Third-Party Logs & Analytics</h3>
                <p>
                  Retention durations of access logs and analytics events are governed directly by Vercel's and Google's standard security and analytics data lifecycle schedules.
                </p>
              </div>
            </section>

            {/* 9. Security */}
            <section id="security" className="space-y-4 scroll-mt-28 border-t border-border/40 pt-8">
              <h2 className="text-xl font-bold text-foreground font-headline-md">
                9. Data Security
              </h2>
              <p>
                All Mimir Nest traffic is encrypted using HTTPS. We also implement static analysis security testing (CodeQL scans) on codebase upgrades to prevent vulnerability introduction. However, no transmission method over the internet or browser storage mechanism is completely secure, and we cannot guarantee absolute security.
              </p>
            </section>

            {/* 10. Your Choices and Rights */}
            <section id="choices" className="space-y-4 scroll-mt-28 border-t border-border/40 pt-8">
              <h2 className="text-xl font-bold text-foreground font-headline-md">
                10. Your Choices and Rights
              </h2>
              <p>
                You can manage how your data is handled using these available options:
              </p>
              <ul className="pl-6 list-disc space-y-1.5">
                <li><strong>Clear local files:</strong> Clear your browser cookies and site storage to reset Pomodoro logs and DSA checklists.</li>
                <li><strong>Block tracking scripts:</strong> Install tracker blockers (e.g. uBlock Origin) or block cookies in your browser settings to prevent Google Analytics from operating.</li>
                <li><strong>Privacy Requests:</strong> Depending on where you live and which privacy laws apply to you, you may have rights concerning your personal information (such as requesting access, deletion, or correction). To submit a request, contact us at <code>mimirnest@gmail.com</code>.</li>
              </ul>
            </section>

            {/* 11. Children's Privacy */}
            <section id="children" className="space-y-4 scroll-mt-28 border-t border-border/40 pt-8">
              <h2 className="text-xl font-bold text-foreground font-headline-md">
                11. Children's Privacy
              </h2>
              <p>
                Mimir Nest is intended for high school and college students, and the platform is not specifically directed at children under the age of 13. If we become aware that we have collected personal data from a child under 13 in circumstances where applicable law requires parental consent, we will take immediate steps to remove it.
              </p>
            </section>

            {/* 12. Changes */}
            <section id="changes" className="space-y-4 scroll-mt-28 border-t border-border/40 pt-8">
              <h2 className="text-xl font-bold text-foreground font-headline-md">
                12. Changes to this Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time to reflect changes to the website, our practices, or applicable requirements. When we make changes, we will update the effective date shown at the top of this page.
              </p>
            </section>

            {/* 13. Contact */}
            <section id="contact" className="space-y-4 scroll-mt-28 border-t border-border/40 pt-8">
              <h2 className="text-xl font-bold text-foreground font-headline-md">
                13. Contact Us
              </h2>
              <p>
                For questions, concerns, or privacy requests regarding this Privacy Policy, please email us directly:
              </p>
              <div className="pt-2 text-center sm:text-left">
                <a
                  href="mailto:mimirnest@gmail.com"
                  className="text-base font-bold text-surface-tint hover:underline"
                >
                  mimirnest@gmail.com
                </a>
              </div>
            </section>

          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Privacy;
