"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, ShieldCheck, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const COOKIE_CONSENT_KEY = "mimirnest_cookie_consent";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (!consent) {
        // Show banner after a slight delay for better UX
        const timer = setTimeout(() => setIsVisible(true), 800);
        return () => clearTimeout(timer);
      }
    } catch {
      // In case localStorage is blocked/disabled
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    } catch {
      // ignore
    }
    setIsVisible(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, "declined");
    } catch {
      // ignore
    }
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 z-[60] md:max-w-md w-auto"
        >
          <div className="bg-mn-surface/95 backdrop-blur-md border border-outline-variant/60 rounded-2xl p-5 shadow-[0_12px_32px_rgba(0,0,0,0.35)] space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-surface-tint/15 text-surface-tint flex-shrink-0">
                  <Cookie className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-headline-sm text-sm font-bold text-foreground">
                    Cookie Preferences
                  </h3>
                  <p className="text-xs text-on-surface-variant/70 font-body-md">
                    We use cookies to improve your experience.
                  </p>
                </div>
              </div>
              <button
                onClick={handleDecline}
                className="text-on-surface-variant/60 hover:text-foreground transition-colors p-1 rounded-lg hover:bg-surface-container border-none bg-transparent cursor-pointer"
                title="Dismiss"
                aria-label="Dismiss cookie notice"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
              MimirNest uses essential cookies and analytics to enhance your study workflow, remember preferences, and optimize platform performance. Read our{" "}
              <Link
                href="/privacy#cookies-storage"
                className="text-surface-tint hover:underline font-semibold"
              >
                Privacy Policy
              </Link>{" "}
              for details.
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-1">
              <button
                onClick={handleDecline}
                className="px-3.5 py-2 rounded-xl text-xs font-label-caps font-semibold text-on-surface-variant hover:text-foreground hover:bg-surface-container transition-colors border border-outline-variant/30 bg-transparent cursor-pointer"
              >
                Essential Only
              </button>
              <button
                onClick={handleAccept}
                className="px-4 py-2 rounded-xl text-xs font-label-caps font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity border-none cursor-pointer flex items-center gap-1.5 shadow-sm"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
