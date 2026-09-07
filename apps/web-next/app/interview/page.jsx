"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import InterviewHero from "@/components/interview/InterviewHero";
import InterviewComparison from "@/components/interview/InterviewComparison";
import InterviewHowItWorks from "@/components/interview/InterviewHowItWorks";
import InterviewPreview from "@/components/interview/InterviewPreview";
import InterviewDemo from "@/components/interview/InterviewDemo";
import InterviewSpokenNatural from "@/components/interview/InterviewSpokenNatural";
import InterviewFeatures from "@/components/interview/InterviewFeatures";
import InterviewEvaluation from "@/components/interview/InterviewEvaluation";
import InterviewAudience from "@/components/interview/InterviewAudience";
import EarlyAccessForm from "@/components/interview/EarlyAccessForm";

export default function InterviewPage() {
  return (
    <div className="min-h-screen bg-mn-background text-on-background flex flex-col selection:bg-surface-tint selection:text-mn-background">
      <Navbar />
      <main className="flex-grow">
        <InterviewHero />
        <InterviewComparison />
        <InterviewHowItWorks />
        <InterviewPreview />
        <InterviewDemo />
        <InterviewSpokenNatural />
        <InterviewFeatures />
        <InterviewEvaluation />
        <InterviewAudience />
        <EarlyAccessForm />
      </main>
      <Footer />
    </div>
  );
}
