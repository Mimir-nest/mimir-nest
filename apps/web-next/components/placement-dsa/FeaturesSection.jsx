"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Book, BarChart3, Code2, Users, Sparkles } from 'lucide-react';
const FeaturesSection = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        }
    };
    const features = [
        {
            icon: Book,
            title: "Comprehensive Archive",
            description: "Access curated DSA questions sourced directly from technical rounds at top tech companies worldwide.",
            tag: "190+ Archives",
            accent: "bg-surface-container text-surface-tint",
        },
        {
            icon: BarChart3,
            title: "Real-Time Mastery Analytics",
            description: "Track your solved ratios, measure difficulty breakdown, and observe your rank progression live.",
            tag: "Smart Tracking",
            accent: "bg-emerald-50 text-emerald-700",
        },
        {
            icon: Code2,
            title: "Precision Topic Filtering",
            description: "Filter problem sets by dynamic programming, graphs, trees, and specific data structures instantly.",
            tag: "Topic Deep-Dive",
            accent: "bg-amber-50 text-amber-700",
        },
        {
            icon: Users,
            title: "Curated Interview Intel",
            description: "Questions verified by recent successful candidates from Google, Meta, Microsoft, and leading unicorns.",
            tag: "Verified Questions",
            accent: "bg-primary-fixed/60 text-mn-primary",
        }
    ];
    return (<div className="mt-20 pt-12 border-t border-outline-variant/30">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="font-label-caps text-label-caps text-surface-tint tracking-widest block mb-2 uppercase">
          Why Practice With Mimir Nest
        </span>
        <h2 className="font-headline-lg text-headline-lg text-mn-primary">
          Engineered For Elite Interview Preparation
        </h2>
      </div>

      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" variants={containerVariants} initial="hidden" animate="visible">
        {features.map((feature, index) => {
            const Icon = feature.icon;
            return (<motion.div key={index} variants={itemVariants} className="group relative bg-surface-container-lowest rounded-[32px] border border-outline-variant/40 p-7 hover:border-surface-tint/60 hover:shadow-[0_20px_40px_rgba(0,19,8,0.08)] transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${feature.accent}`}>
                    <Icon className="h-6 w-6"/>
                  </div>
                  <span className="text-[10px] font-label-caps text-on-surface-variant/70 uppercase tracking-wider px-2.5 py-1 rounded-full bg-surface-container">
                    {feature.tag}
                  </span>
                </div>
                <h3 className="font-headline-md text-lg text-mn-primary mb-2.5 group-hover:text-surface-tint transition-colors">
                  {feature.title}
                </h3>
                <p className="text-on-surface-variant font-body-md text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-outline-variant/20 flex items-center gap-2 text-xs font-label-caps text-surface-tint tracking-wider">
                <Sparkles className="w-3.5 h-3.5"/>
                <span>Mimir Standard</span>
              </div>
            </motion.div>);
        })}
      </motion.div>
    </div>);
};
export default FeaturesSection;
