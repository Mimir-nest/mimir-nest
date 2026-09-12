"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import TrustedBy from "@/components/home/TrustedBy";
import Features from "@/components/home/Features";
import HomeInterviewSection from "@/components/home/HomeInterviewSection";
import FAQ from "@/components/home/FAQ";
const Index = () => {
    return (<div className="min-h-screen bg-mn-background text-on-background">
      <Navbar />
      <Hero />
      <TrustedBy />
      <Features />
      <HomeInterviewSection />
      <FAQ />
      <Footer />
    </div>);
};
export default Index;
