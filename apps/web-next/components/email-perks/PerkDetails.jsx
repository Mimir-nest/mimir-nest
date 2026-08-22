"use client";

import React from "react";
import { ExternalLink, Check, Star, Gift, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
const PerkDetails = ({ title, description, offers, icon, link, value }) => {
    const handleAccessClick = () => {
        window.open(link, '_blank');
        toast.success(`Accessing ${title} benefits`, {
            description: "You're being redirected to the provider's website"
        });
    };
    return (<div className="space-y-6 text-mn-primary">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="p-3.5 rounded-2xl bg-surface-container border border-outline-variant/30 shrink-0">
            {icon}
          </div>
          
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-mn-primary font-headline-md tracking-tight">
              {title}
            </h2>
            <p className="text-on-surface-variant text-sm font-body-md leading-relaxed max-w-lg">
              {description}
            </p>
          </div>
        </div>
        
        {value && (<div className="sm:text-right shrink-0 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
            <div className="flex items-center gap-1.5 text-sm font-bold text-emerald-700">
              <Gift className="h-4 w-4"/>
              <span>{value} Value</span>
            </div>
          </div>)}
      </div>

      {/* Benefits Grid */}
      <div className="border border-outline-variant/40 rounded-2xl bg-surface-container-low p-6">
        <div className="flex items-center gap-2 mb-4">
          <Star className="h-4 w-4 text-surface-tint"/>
          <h3 className="font-headline-md text-base font-bold text-mn-primary">
            What's Included
          </h3>
        </div>
        
        <div className="grid gap-2.5 md:grid-cols-2">
          {offers.map((offer, i) => (<div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/20 hover:border-surface-tint/40 transition-colors">
              <div className="mt-0.5 p-0.5 rounded-full bg-surface-tint text-on-primary shrink-0">
                <Check className="h-3 w-3"/>
              </div>
              <span className="text-on-surface-variant font-body-md text-xs leading-relaxed font-medium">
                {offer}
              </span>
            </div>))}
        </div>
        
        {/* Action Section */}
        <div className="mt-6 pt-5 border-t border-outline-variant/30 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="text-center sm:text-left">
            <h4 className="text-sm font-bold text-mn-primary">Ready to get started?</h4>
            <p className="text-on-surface-variant text-xs">
              Access your verified student benefits instantly
            </p>
          </div>
          
          <Button className="w-full sm:w-auto px-6 py-2.5 bg-mn-primary hover:opacity-90 text-on-primary font-label-caps text-xs tracking-wider rounded-full shadow-sm" onClick={handleAccessClick}>
            Claim Benefit
            <ExternalLink className="ml-2 h-3.5 w-3.5"/>
          </Button>
        </div>
      </div>
      
      {/* Verification Trust Pills */}
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="p-3 rounded-xl bg-surface-container border border-outline-variant/30">
          <ShieldCheck className="h-4 w-4 text-surface-tint mx-auto mb-1"/>
          <div className="text-xs font-bold text-mn-primary">Verified</div>
          <div className="text-[10px] text-on-surface-variant">Student Email</div>
        </div>
        
        <div className="p-3 rounded-xl bg-surface-container border border-outline-variant/30">
          <Gift className="h-4 w-4 text-surface-tint mx-auto mb-1"/>
          <div className="text-xs font-bold text-mn-primary">100% Free</div>
          <div className="text-[10px] text-on-surface-variant">No Credit Card</div>
        </div>
        
        <div className="p-3 rounded-xl bg-surface-container border border-outline-variant/30">
          <Sparkles className="h-4 w-4 text-surface-tint mx-auto mb-1"/>
          <div className="text-xs font-bold text-mn-primary">Full Tier</div>
          <div className="text-[10px] text-on-surface-variant">Pro Features</div>
        </div>
      </div>
    </div>);
};
export default PerkDetails;
