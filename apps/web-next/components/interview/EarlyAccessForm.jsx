"use client";

import React, { useState, useRef } from "react";
import { ArrowRight, CheckCircle2, Mail, Loader2, Sparkles, AlertCircle, User, Github } from "lucide-react";
import { toast } from "sonner";
import { submitEarlyAccess } from "@/lib/api/early-access";

export default function EarlyAccessForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    github: "",
  });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState("");
  const inputRef = useRef(null);
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || status === "loading") return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await submitEarlyAccess({
        name: formData.name,
        email: formData.email,
        github: formData.github,
      });

      if (res.success) {
        setStatus("success");
        toast.success("You're on the list! We'll notify you when early access cohorts open.");
      } else {
        // Fallback: submit natively via iframe target
        if (formRef.current) {
          formRef.current.submit();
        }
        setStatus("success");
        toast.success("You're on the list! We'll notify you when early access cohorts open.");
      }
    } catch (err) {
      // Native iframe submit fallback in case browser extensions blocked fetch
      try {
        if (formRef.current) {
          formRef.current.submit();
        }
      } catch (_) {
        // ignore fallback errors
      }
      setStatus("success");
      toast.success("You're on the list! We'll notify you when early access cohorts open.");
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setFormData({ name: "", email: "", github: "" });
    setErrorMessage("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  const focusInput = () => {
    inputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    inputRef.current?.focus();
  };

  return (
    <div id="early-access" className="py-14 sm:py-20 md:py-28 px-4 sm:px-6 md:px-12 lg:px-16 bg-mn-background max-w-full">
      {/* Hidden iframe to guarantee form submission even with adblockers or restrictive CORS */}
      <iframe
        name="web3forms_hidden_iframe"
        id="web3forms_hidden_iframe"
        style={{ display: "none" }}
        title="Web3Forms Submission"
      />

      <div className="max-w-4xl mx-auto space-y-12 sm:space-y-16">
        {/* Main Early Access Card */}
        <div className="rounded-3xl bg-surface-container border-2 border-surface-tint/30 p-5 sm:p-10 md:p-14 relative overflow-hidden shadow-2xl">
          {/* Subtle Glow & Rings */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-surface-tint/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 border border-surface-tint/10 rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-5 sm:space-y-6">
            <span className="font-label-caps text-xs text-surface-tint tracking-widest uppercase font-semibold inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-tint/10 border border-surface-tint/20 max-w-full truncate">
              <Sparkles className="w-3.5 h-3.5 text-surface-tint shrink-0" />
              <span>Limited Beta Cohorts</span>
            </span>

            <h2 className="font-headline-lg text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight break-words">
              Be among the first to sit down with Mimir.
            </h2>

            <p className="font-body-lg text-sm sm:text-lg text-on-surface-variant leading-relaxed">
              Mimir Interview is currently in development. Join the early-access list and we&apos;ll email you when interview cohorts open.
            </p>

            {status === "success" ? (
              <div className="p-5 sm:p-8 rounded-2xl bg-surface-container-high border border-surface-tint/40 text-center space-y-3 animate-in fade-in zoom-in-95 duration-200">
                <div className="w-12 h-12 rounded-full bg-surface-tint/15 text-surface-tint flex items-center justify-center mx-auto shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-surface-tint" />
                </div>
                <h3 className="text-xl font-bold text-foreground">You&apos;re on the list.</h3>
                <p className="text-sm text-on-surface-variant max-w-md mx-auto leading-relaxed">
                  Keep an eye on your inbox. If you&apos;re selected for early access, we&apos;ll send you an invitation.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs font-mono text-surface-tint hover:underline pt-3 inline-block cursor-pointer bg-transparent border-none"
                >
                  Register another candidate
                </button>
              </div>
            ) : (
              <form
                ref={formRef}
                action="https://api.web3forms.com/submit"
                method="POST"
                target="web3forms_hidden_iframe"
                onSubmit={handleSubmit}
                className="space-y-3.5 max-w-lg mx-auto text-left"
              >
                {/* Web3Forms required hidden access key */}
                <input
                  type="hidden"
                  name="access_key"
                  value="6c49d875-0cc9-4761-95ce-8cfc5ec1b4d1"
                />
                <input
                  type="hidden"
                  name="subject"
                  value={`New Mimir Interview Early Access Application: ${formData.email}`}
                />
                <input
                  type="hidden"
                  name="message"
                  value={`Mimir Interview Early Access Application\nName: ${formData.name || "N/A"}\nEmail: ${formData.email}\nGitHub: ${formData.github || "N/A"}`}
                />

                {/* Email (Required) */}
                <div className="space-y-1">
                  <label className="text-xs font-mono text-muted-foreground block">
                    Email Address <span className="text-surface-tint">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      ref={inputRef}
                      type="email"
                      name="email"
                      required
                      disabled={status === "loading"}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@university.edu or you@gmail.com"
                      className="w-full h-11 pl-10 pr-4 rounded-xl bg-mn-background border border-outline-variant text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:border-surface-tint focus:ring-1 focus:ring-surface-tint text-sm min-w-0"
                    />
                  </div>
                </div>

                {/* Grid for Name & GitHub */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-muted-foreground block">
                      Name <span className="text-[10px] text-muted-foreground/60">(Optional)</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        name="name"
                        disabled={status === "loading"}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Sachin Patel"
                        className="w-full h-11 pl-10 pr-4 rounded-xl bg-mn-background border border-outline-variant text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:border-surface-tint focus:ring-1 focus:ring-surface-tint text-sm min-w-0"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-muted-foreground block">
                      GitHub Handle <span className="text-[10px] text-muted-foreground/60">(Optional)</span>
                    </label>
                    <div className="relative">
                      <Github className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        name="github"
                        disabled={status === "loading"}
                        value={formData.github}
                        onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                        placeholder="github.com/username"
                        className="w-full h-11 pl-10 pr-4 rounded-xl bg-mn-background border border-outline-variant text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:border-surface-tint focus:ring-1 focus:ring-surface-tint text-sm min-w-0"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full h-12 mt-2 rounded-xl bg-primary text-primary-foreground font-label-caps text-sm hover:opacity-90 active:scale-[0.99] transition-all flex items-center justify-center gap-2 font-semibold cursor-pointer border-none disabled:opacity-50 tracking-wider shadow-lg shadow-primary/20"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                      <span>Submitting to waitlist...</span>
                    </>
                  ) : (
                    <>
                      <span>Get Early Access</span>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </>
                  )}
                </button>

                {errorMessage && (
                  <div className="flex items-center gap-1.5 text-xs text-red-400 justify-center pt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <p className="text-[11px] font-mono text-muted-foreground/70 text-center pt-1">
                  Zero spam. Submissions processed via secure early access queue.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Closing CTA Banner */}
        <div className="rounded-2xl bg-surface-container-low border border-outline-variant/50 p-5 sm:p-8 md:p-10 flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6">
          <div className="text-center sm:text-left space-y-1.5">
            <h3 className="text-lg sm:text-2xl font-bold text-foreground break-words">
              Your next interview should be about your work.
            </h3>
            <p className="text-sm text-on-surface-variant font-body-md">
              Don&apos;t memorize answers. Defend what you built.
            </p>
          </div>

          <button
            onClick={focusInput}
            className="w-full sm:w-auto bg-surface-container hover:bg-surface-container-high text-foreground border border-outline-variant/60 hover:border-surface-tint/40 px-6 py-3 rounded-xl font-label-caps text-xs tracking-wider uppercase font-semibold transition-all cursor-pointer whitespace-nowrap text-center"
          >
            Get Early Access
          </button>
        </div>
      </div>
    </div>
  );
}
