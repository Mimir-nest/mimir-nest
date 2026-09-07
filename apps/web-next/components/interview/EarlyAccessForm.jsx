"use client";

import React, { useState, useRef } from "react";
import { ArrowRight, CheckCircle2, Mail, Loader2, Sparkles, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { submitEarlyAccess } from "@/lib/api/early-access";

export default function EarlyAccessForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState("");
  const inputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || status === "loading") return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await submitEarlyAccess(email);
      if (res.success) {
        setStatus("success");
        toast.success("You're on the list! We'll notify you when early access opens.");
      } else {
        setStatus("error");
        setErrorMessage(res.error || "Failed to submit. Please try again.");
        toast.error(res.error || "Please enter a valid email address.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again shortly.");
      toast.error("Network error. Please try again.");
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setEmail("");
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
    <div id="early-access" className="py-20 md:py-28 px-6 md:px-16 bg-mn-background max-w-full">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Main Early Access Card */}
        <div className="rounded-3xl bg-surface-container border-2 border-surface-tint/30 p-8 sm:p-12 md:p-14 relative overflow-hidden shadow-2xl">
          {/* Subtle Glow & Rings */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-surface-tint/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 border border-surface-tint/10 rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
            <span className="font-label-caps text-xs text-surface-tint tracking-widest uppercase font-semibold inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-tint/10 border border-surface-tint/20">
              <Sparkles className="w-3.5 h-3.5 text-surface-tint" />
              Limited Beta
            </span>

            <h2 className="font-headline-lg text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              Want to be one of the first to try it?
            </h2>

            <p className="font-body-lg text-base sm:text-lg text-on-surface-variant leading-relaxed">
              We're building Mimir Interview now. Join the early-access list and we'll email you when it's ready.
            </p>

            {status === "success" ? (
              <div className="p-6 rounded-2xl bg-surface-container-high border border-surface-tint/40 text-center space-y-3 animate-in fade-in zoom-in-95 duration-200">
                <div className="w-12 h-12 rounded-full bg-surface-tint/15 text-surface-tint flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6 text-surface-tint" />
                </div>
                <h3 className="text-lg font-bold text-foreground">You&apos;re on the list.</h3>
                <p className="text-sm text-on-surface-variant max-w-md mx-auto leading-relaxed">
                  Keep an eye on your inbox. If you&apos;re selected for early access, we&apos;ll send you an invitation.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs font-mono text-surface-tint hover:underline pt-2 inline-block cursor-pointer bg-transparent border-none"
                >
                  Register another email
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Mail className="w-5 h-5 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      ref={inputRef}
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address..."
                      required
                      disabled={status === "loading"}
                      className="w-full h-12 pl-11 pr-4 rounded-xl bg-mn-background border border-outline-variant text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-surface-tint focus:ring-1 focus:ring-surface-tint text-sm transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="h-12 px-7 rounded-xl bg-primary text-primary-foreground font-label-caps text-sm hover:opacity-90 active:scale-[0.99] transition-all flex items-center justify-center gap-2 font-semibold whitespace-nowrap cursor-pointer border-none disabled:opacity-50"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Joining...</span>
                      </>
                    ) : (
                      <>
                        <span>Get Early Access</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                {errorMessage && (
                  <div className="flex items-center gap-1.5 text-xs text-red-400 justify-center">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <p className="text-[11px] font-mono text-muted-foreground/70 text-center">
                  Zero spam. We only contact you when early access cohorts open up.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Section 9: Final CTA Banner */}
        <div className="rounded-2xl bg-surface-container-low border border-outline-variant/50 p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left space-y-1.5">
            <h3 className="text-xl sm:text-2xl font-bold text-foreground">
              Your next interview should be about your work.
            </h3>
            <p className="text-sm text-on-surface-variant font-body-md">
              Mimir Interview is coming soon.
            </p>
          </div>

          <button
            onClick={focusInput}
            className="bg-surface-container hover:bg-surface-container-high text-foreground border border-outline-variant/60 hover:border-surface-tint/40 px-6 py-3 rounded-xl font-label-caps text-xs tracking-wider uppercase font-semibold transition-all cursor-pointer whitespace-nowrap"
          >
            Get Early Access
          </button>
        </div>
      </div>
    </div>
  );
}
