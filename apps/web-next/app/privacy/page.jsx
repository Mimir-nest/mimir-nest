"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Shield, Calendar, AlertTriangle } from "lucide-react";
import dynamic from "next/dynamic";

const ParticleWave = dynamic(
  () => import("@/components/ui/particle-wave").then((mod) => mod.ParticleWave),
  { ssr: false }
);

const Privacy = () => {
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
              <span>Effective Date: August 30, 2026</span>
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
              <a href="#cookies-storage" className="hover:text-surface-tint transition-colors">3. Cookies and Local Storage</a>
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
                Mimir Nest is a student platform. The project is designed with the objective of minimizing unnecessary data collection, allowing students to access utilities without subscription barriers or commercial tracking. This policy details what data may be processed when you interact with the website at <a href="https://mimirnest.vercel.app/" className="text-surface-tint hover:underline">mimirnest.vercel.app</a>.
              </p>
              <p>
                Please note that while the website's educational content and application code are publicly accessible, your private account details, bookmarks, and learning progress are stored securely on our private backend infrastructure and are never made public.
              </p>
            </section>

            {/* 2. Information We Collect */}
            <section id="info-collect" className="space-y-4 scroll-mt-28 border-t border-border/40 pt-8">
              <h2 className="text-xl font-bold text-foreground font-headline-md">
                2. Information We Collect
              </h2>
              
              <p>
                You can browse our public educational content (including Projects, Courses, DSA checklists, System Design articles, and Email Perks) completely without creating an account. Creating an account is entirely optional.
              </p>

              <div className="space-y-3">
                <h3 className="text-sm font-bold text-foreground">Account and Profile Information</h3>
                <p>
                  If you choose to create a Mimir Nest account, we collect standard credentials:
                </p>
                <ul className="pl-6 list-disc space-y-1.5">
                  <li><strong>Basic Account Information:</strong> Your name and email address when you register using our signup form.</li>
                  <li><strong>Authentication Provider Info:</strong> If you use Google Sign-In, we receive authentication details from Google (email address, name, and profile picture/avatar URL) to create and log you into your Mimir Nest account.</li>
                  <li><strong>Saved Features and Progress:</strong> We store bookmarks and learning progress details that you choose to save when logged into your account.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-bold text-foreground">Contact Communications</h3>
                <p>
                  If you voluntarily write to us at <a href="mailto:mimirnest@gmail.com" className="text-surface-tint hover:underline font-semibold">mimirnest@gmail.com</a>, we process your email address and any message content to address your inquiry.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-bold text-foreground">Analytics Information</h3>
                <p>
                  Mimir Nest integrates Google Analytics (measurement ID <code>G-S9BCG5CN4G</code>). This service collects telemetry concerning how users access the site, including page views, request timestamps, approximate geolocation (derived from IP addresses), browser types, and system configurations.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-bold text-foreground">Technical / Hosting Information</h3>
                <p>
                  Our hosting and backend infrastructure automatically processes standard web server logs on every request. This includes your IP address, browser user-agent header, request pathways, and access timestamps. This information is processed to maintain performance, stability, and secure the service from unauthorized access or network abuse.
                </p>
              </div>
            </section>

            {/* 3. Cookies and Local Storage */}
            <section id="cookies-storage" className="space-y-4 scroll-mt-28 border-t border-border/40 pt-8">
              <h2 className="text-xl font-bold text-foreground font-headline-md">
                3. Cookies and Local Storage
              </h2>
              <p>
                Mimir Nest uses standard cookies and browser local storage to enable essential features, persist layout preferences, and measure traffic performance:
              </p>
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-foreground">Authentication Cookies</h3>
                <p>
                  If you choose to register or log in, we set an HttpOnly session cookie (named <code>token</code>) containing a JSON Web Token (JWT). This cookie is protected from client-side script access, securing your authentication session against cross-site scripting vulnerabilities.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-foreground">Preference Cookies</h3>
                <p>
                  We use a standard client-side cookie (named <code>sidebar:state</code>) to persist the open/close state of the navigation sidebar across page loads.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-foreground">Analytics Cookies</h3>
                <p>
                  Google Analytics sets standard telemetry cookies to compile reports on site traffic and page interaction metrics.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-foreground">Local Browser Storage</h3>
                <p>
                  To support offline/local utilities without requiring an account, Mimir Nest stores configurations directly inside your browser using the <code>localStorage</code> API:
                </p>
                <ul className="pl-6 list-disc space-y-1.5">
                  <li><strong>Pomodoro Timer Settings & Stats:</strong> Saves active timer configurations, completed focus counts, and streak histories.</li>
                  <li><strong>Placement DSA SOLVED logs:</strong> Saves checked statuses representing which questions you have solved locally.</li>
                </ul>
                <p>
                  This stored browser information remains entirely client-side and is never transmitted back to Mimir Nest servers or transferred to any third-party services. You can clear this data at any time by utilizing your browser options to clear site storage cache.
                </p>
              </div>
            </section>

            {/* 4. How We Use Information */}
            <section id="use" className="space-y-4 scroll-mt-28 border-t border-border/40 pt-8">
              <h2 className="text-xl font-bold text-foreground font-headline-md">
                4. How We Use Information
              </h2>
              <p>
                We use the collected information for the following specific purposes:
              </p>
              <ul className="pl-6 list-disc space-y-1.5">
                <li><strong>Authentication and Account Management:</strong> Creating your account, verifying your identity, managing your session, and providing access to personalized features.</li>
                <li><strong>Saving Preferences and Progress:</strong> Persisting your bookmarks and educational progress inside your account, or locally via browser storage/cookies if you are browsing without an account.</li>
                <li><strong>Operating and Securing the Service:</strong> Diagnosing errors, resolving technical issues, preventing security incidents, and protecting against network abuse.</li>
                <li><strong>Improving Performance:</strong> Monitoring website speed, layout responsiveness, and auditing traffic metrics.</li>
                <li><strong>Correspondence:</strong> Responding to inquiries or privacy requests sent to our contact email.</li>
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
                The following service providers process information necessary to host, secure, authenticate, and analyze our platform:
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
                        IP address, request paths, user agent headers. <br />
                        <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-surface-tint hover:underline font-medium">Vercel Privacy Policy</a>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-foreground">Neon</td>
                      <td className="px-4 py-3">Backend Database Hosting</td>
                      <td className="px-4 py-3">
                        User account credentials, email, profile name, bookmarks, and learning progress. <br />
                        <a href="https://neon.tech/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-surface-tint hover:underline font-medium">Neon Privacy Policy</a>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-foreground">Google LLC</td>
                      <td className="px-4 py-3">Usage Telemetry & Google Sign-In</td>
                      <td className="px-4 py-3">
                        Telemetry cookies, Google OAuth profile details (email, name, avatar URL). <br />
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-surface-tint hover:underline font-medium">Google Privacy Policy</a>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-foreground">GitHub</td>
                      <td className="px-4 py-3">Code Repository & Collaboration</td>
                      <td className="px-4 py-3">
                        Processes profile details of developers viewing or collaborating on the codebase directly. <br />
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
                Mimir Nest does not sell, barter, lease, or distribute your personal information to advertising agencies, data brokers, or third-party marketing services. Data processing is strictly limited to the infrastructure and integration partners (Vercel, Neon, and Google) needed to run, secure, authenticate, and analyze the website performance.
              </p>
            </section>

            {/* 8. Retention */}
            <section id="retention" className="space-y-4 scroll-mt-28 border-t border-border/40 pt-8">
              <h2 className="text-xl font-bold text-foreground font-headline-md">
                8. Data Retention
              </h2>
              
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground">Account and Progress Data</h3>
                <p>
                  Personal information, bookmarks, and learning progress stored on our backend database are retained for as long as your account remains active or as necessary to provide the platform services.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground">Local Browser Data</h3>
                <p>
                  Information stored in your browser's <code>localStorage</code> or client-side cookies is retained indefinitely until you choose to clear your browser cache or site storage cache.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground">Contact Communications</h3>
                <p>
                  Any email correspondence sent to <code>mimirnest@gmail.com</code> is retained as long as necessary to address the inquiry and maintain proper record of communication.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground">Infrastructure and Telemetry Logs</h3>
                <p>
                  Retention durations of standard web server logs and Google Analytics events are governed by the hosting and analytical platform lifecycle configurations (Vercel and Google LLC).
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
                You can manage your data using the following options:
              </p>
              <ul className="pl-6 list-disc space-y-1.5">
                <li><strong>Clear Local Storage and Cookies:</strong> You can clear your browser storage cache and cookies to reset Pomodoro logs, local DSA checkmarks, and the sidebar layout preference.</li>
                <li><strong>Account Deletion and Data Management:</strong> You can manage or delete your bookmarks and learning progress directly inside your account settings when logged in. To delete your account completely, please contact us at <code>mimirnest@gmail.com</code>.</li>
                <li><strong>Block Telemetry:</strong> Install tracker blockers (e.g., uBlock Origin) or block cookies in your browser settings to prevent Google Analytics scripts from running.</li>
                <li><strong>Privacy Rights:</strong> Depending on your jurisdiction, you may have statutory rights regarding your personal information (such as requesting access, deletion, porting, or correction). To send a formal request, email us at <code>mimirnest@gmail.com</code>.</li>
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
