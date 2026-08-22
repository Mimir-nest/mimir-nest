"use client";

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Building2, Sparkles, Flame, Trophy, ShieldCheck, Zap } from 'lucide-react';
import CompanyLogo from './CompanyLogo';

const FAANG_TIER = ['google', 'meta', 'apple', 'amazon', 'netflix', 'microsoft'];
const FINTECH_TIER = ['bloomberg', 'goldman-sachs', 'j.p.-morgan', 'morgan-stanley', 'jane-street', 'citadel', 'two-sigma', 'stripe', 'coinbase', 'robinhood', 'de-shaw', 'hudson-river-trading'];
const UNICORNS_TIER = ['uber', 'airbnb', 'doordash', 'bytedance', 'databricks', 'snowflake', 'openai', 'snap', 'spotify', 'pinterest', 'figma', 'canva', 'swiggy', 'zomato'];
const ENTERPRISE_TIER = ['adobe', 'salesforce', 'oracle', 'cisco', 'intel', 'nvidia', 'qualcomm', 'atlassian', 'vmware', 'servicenow', 'palantir-technologies'];
const CATEGORIES = [
    { id: 'all', label: 'All Companies', icon: Building2 },
    { id: 'faang', label: 'FAANG & Big Tech', icon: Trophy },
    { id: 'fintech', label: 'FinTech & Quant', icon: ShieldCheck },
    { id: 'unicorns', label: 'Top Unicorns', icon: Flame },
    { id: 'enterprise', label: 'Enterprise & Cloud', icon: Zap },
];

const CompanyGrid = ({ companies, onCompanySelect }) => {
    const [activeCategory, setActiveCategory] = useState('all');

    // Format company name for display
    const formatCompanyName = (company) => {
        return company
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    // Filter based on active category
    const filteredCategoryCompanies = useMemo(() => {
        if (activeCategory === 'faang') {
            return companies.filter(c => FAANG_TIER.includes(c.toLowerCase()));
        }
        if (activeCategory === 'fintech') {
            return companies.filter(c => FINTECH_TIER.includes(c.toLowerCase()));
        }
        if (activeCategory === 'unicorns') {
            return companies.filter(c => UNICORNS_TIER.includes(c.toLowerCase()));
        }
        if (activeCategory === 'enterprise') {
            return companies.filter(c => ENTERPRISE_TIER.includes(c.toLowerCase()));
        }
        return companies;
    }, [companies, activeCategory]);

    // Featured spotlight list
    const featuredSpotlight = useMemo(() => {
        const featuredKeys = ['google', 'amazon', 'microsoft', 'meta', 'apple', 'netflix', 'uber', 'bloomberg', 'nvidia', 'goldman-sachs'];
        return companies.filter(c => featuredKeys.includes(c.toLowerCase())).slice(0, 8);
    }, [companies]);

    return (
      <div className="mb-16">
        {/* ── Featured Top Giants Spotlight ── */}
        {activeCategory === 'all' && featuredSpotlight.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-surface-tint"/>
              <span className="font-label-caps text-label-caps text-surface-tint tracking-widest uppercase">
                Spotlight Tier Giants
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              {featuredSpotlight.map((company) => (
                <button
                  key={`spotlight-${company}`}
                  onClick={() => onCompanySelect(company)}
                  suppressHydrationWarning
                  className="group relative bg-surface-container-lowest rounded-2xl p-3 border border-outline-variant/40 shadow-sm hover:shadow-[0_12px_28px_rgba(0,19,8,0.12)] hover:border-surface-tint/60 hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-200 flex flex-col items-center justify-center gap-2 text-center"
                >
                  <div className="w-10 h-10 rounded-xl bg-surface-container/60 p-2 flex items-center justify-center border border-outline-variant/20 group-hover:border-surface-tint/30 transition-colors">
                    <CompanyLogo company={company} className="w-full h-full object-contain"/>
                  </div>
                  <span className="text-xs font-semibold text-mn-primary truncate w-full group-hover:text-surface-tint transition-colors">
                    {formatCompanyName(company)}
                  </span>
                  <span className="text-[10px] font-label-caps text-on-surface-variant/60 tracking-wider">
                    Top Tier
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Category Filter Pills + Header ── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="font-headline-lg text-headline-lg text-mn-primary">
                Company Question Archives
              </h2>
              <span className="px-3 py-1 rounded-full bg-surface-container text-surface-tint text-xs font-semibold tabular-nums border border-surface-tint/20">
                {filteredCategoryCompanies.length} available
              </span>
            </div>
            <p className="text-on-surface-variant font-body-md text-sm mt-1">
              Explore authentic technical interview questions tagged and weighted by hiring frequency
            </p>
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  suppressHydrationWarning
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? 'bg-mn-primary text-on-primary shadow-sm scale-105'
                      : 'bg-surface-container text-on-surface-variant hover:text-mn-primary hover:bg-surface-container-high'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5"/>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
        
        {/* ── All Companies Bento Grid ── */}
        {filteredCategoryCompanies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3.5 animate-in fade-in duration-300">
            {filteredCategoryCompanies.map((company) => (
              <div key={company} className="transition-transform duration-200 hover:-translate-y-0.5">
                <Button
                  onClick={() => onCompanySelect(company)}
                  suppressHydrationWarning
                  className="w-full h-auto p-4 bg-surface-container-lowest border border-outline-variant/30 hover:border-surface-tint/50 hover:bg-white transition-all duration-200 hover:shadow-[0_16px_36px_rgba(0,19,8,0.08)] rounded-2xl group relative overflow-hidden text-left flex flex-col items-start gap-3.5"
                  variant="ghost"
                >
                  {/* Subtle gradient hover highlight */}
                  <div className="absolute inset-0 bg-gradient-to-br from-surface-tint/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"/>
                  
                  <div className="w-full flex items-center justify-between relative z-10">
                    <div className="w-11 h-11 rounded-xl bg-surface-container p-2 flex items-center justify-center border border-outline-variant/20 group-hover:border-surface-tint/30 transition-colors shadow-inner">
                      <CompanyLogo company={company} className="w-full h-full object-contain"/>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-surface-container/60 group-hover:bg-mn-primary flex items-center justify-center transition-all duration-200">
                      <ArrowRight className="w-3.5 h-3.5 text-on-surface-variant group-hover:text-on-primary group-hover:translate-x-0.5 transition-all duration-200"/>
                    </div>
                  </div>

                  <div className="relative z-10 w-full">
                    <h3 className="text-mn-primary font-bold text-sm group-hover:text-surface-tint transition-colors truncate w-full">
                      {formatCompanyName(company)}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-surface-tint animate-pulse"/>
                      <span className="text-on-surface-variant/70 text-[11px] font-body-md group-hover:text-on-surface-variant transition-colors">
                        View problems
                      </span>
                    </div>
                  </div>
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-surface-container-lowest rounded-[32px] border border-outline-variant/30 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mx-auto mb-4 text-on-surface-variant">
              <Building2 className="w-8 h-8 text-surface-tint"/>
            </div>
            <h3 className="text-mn-primary font-headline-md text-lg mb-1">No companies match this filter</h3>
            <p className="text-on-surface-variant text-sm font-body-md max-w-sm mx-auto">
              Try switching to "All Companies" or search for a specific company name in the search bar above.
            </p>
            <button
              onClick={() => setActiveCategory('all')}
              suppressHydrationWarning
              className="mt-4 px-6 py-2 rounded-full bg-mn-primary text-on-primary text-xs font-label-caps tracking-wider hover:opacity-90 transition-opacity"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    );
};

export default CompanyGrid;

