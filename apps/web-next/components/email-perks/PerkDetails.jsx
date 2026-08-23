"use client";

import React from "react";
import { ExternalLink, Check, Star, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { toast } from "sonner";

const isInformational = (link) => {
    const lower = (link || "").toLowerCase();
    return lower.includes("education.github.com/pack") || lower.includes("github.com/pack") || lower.endsWith("/pack") || lower.includes("about") || lower.includes("info");
};

const PerkDetails = ({
    provider,
    title,
    category,
    description,
    offers,
    link,
    benefit_type,
    value,
    currency,
    region,
    eligibility,
    verification_method,
    duration,
    renewal,
    source_type,
    last_verified,
    badge,
    icon
}) => {
    const handleAccessClick = () => {
        window.open(link, '_blank');
        toast.success(`Accessing ${title} benefits`, {
            description: "You're being redirected to the provider's website"
        });
    };

    return (
        <div className="space-y-6 text-mn-primary">
            {/* Header */}
            <div className="flex items-start gap-4">
                <div className="p-3.5 rounded-2xl bg-surface-container border border-outline-variant/30 shrink-0">
                    {icon}
                </div>
                
                <div className="space-y-1 text-left">
                    <span className="text-xs text-surface-tint font-bold font-label-caps tracking-widest uppercase block">
                        {provider || "Partner"}
                    </span>
                    <h2 className="text-xl md:text-2xl font-bold text-mn-primary font-headline-md tracking-tight leading-tight">
                        {title}
                    </h2>
                </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-surface-container text-surface-tint border border-outline-variant/30 rounded-md text-xs font-semibold uppercase font-label-caps tracking-wider">
                    {category}
                </span>
                {badge && badge !== "None" && (
                    <span className="px-3 py-1 bg-surface-container text-on-surface-variant border border-outline-variant/30 rounded-md text-xs font-semibold uppercase font-label-caps tracking-wider">
                        {badge}
                    </span>
                )}
                {value && value !== "Not specified" && (
                    <span className="px-3 py-1 border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 rounded-md text-xs font-semibold">
                        {value} {currency !== "None" ? currency : ""} Value
                    </span>
                )}
            </div>

            {/* Description */}
            <div className="space-y-2 text-left">
                <h4 className="text-xs font-label-caps tracking-widest text-mn-primary uppercase font-bold">About the Benefit</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed font-body-md">
                    {description}
                </p>
            </div>

            {/* What's Included / Offers */}
            {offers && offers.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-outline-variant/20 text-left">
                    <h4 className="text-xs font-label-caps tracking-widest text-mn-primary uppercase font-bold">What's Included</h4>
                    <div className="grid gap-2.5 md:grid-cols-2">
                        {offers.map((offer, i) => (
                            <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-container border border-outline-variant/20">
                                <div className="mt-0.5 p-0.5 rounded-full bg-surface-tint text-on-primary shrink-0">
                                    <Check className="h-3 w-3" strokeWidth={3}/>
                                </div>
                                <span className="text-on-surface-variant font-body-md text-xs leading-relaxed font-medium">
                                    {offer}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Details Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-outline-variant/20 text-left">
                <div>
                    <span className="text-[10px] text-on-surface-variant/60 font-label-caps uppercase block">Benefit Type</span>
                    <span className="text-sm text-mn-primary font-semibold">{benefit_type || "Free"}</span>
                </div>
                <div>
                    <span className="text-[10px] text-on-surface-variant/60 font-label-caps uppercase block">Region</span>
                    <span className="text-sm text-mn-primary font-semibold">{region || "Global"}</span>
                </div>
                <div>
                    <span className="text-[10px] text-on-surface-variant/60 font-label-caps uppercase block">Duration</span>
                    <span className="text-sm text-mn-primary font-semibold">{duration || "While enrolled"}</span>
                </div>
                <div>
                    <span className="text-[10px] text-on-surface-variant/60 font-label-caps uppercase block">Renewal</span>
                    <span className="text-sm text-mn-primary font-semibold">{renewal || "Not specified"}</span>
                </div>
                <div>
                    <span className="text-[10px] text-on-surface-variant/60 font-label-caps uppercase block">Verification</span>
                    <span className="text-sm text-mn-primary font-semibold">{verification_method || "Student Email"}</span>
                </div>
                <div>
                    <span className="text-[10px] text-on-surface-variant/60 font-label-caps uppercase block">Source</span>
                    <span className="text-sm text-mn-primary font-semibold">{source_type || "Student Pack"}</span>
                </div>
                {eligibility && (
                    <div className="col-span-2 sm:col-span-3">
                        <span className="text-[10px] text-on-surface-variant/60 font-label-caps uppercase block">Eligibility</span>
                        <span className="text-xs text-mn-primary font-semibold block leading-relaxed">{eligibility}</span>
                    </div>
                )}
                <div>
                    <span className="text-[10px] text-on-surface-variant/60 font-label-caps uppercase block">Last Verified</span>
                    <span className="text-xs text-on-surface-variant font-mono">{last_verified || "2026-08-23"}</span>
                </div>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-end gap-3 pt-6 border-t border-outline-variant/20">
                <DialogClose asChild>
                    <Button variant="ghost" className="text-on-surface-variant hover:text-foreground hover:bg-surface-container rounded-lg px-6 py-2.5 text-xs font-semibold h-auto font-label-caps tracking-wider">
                        Close
                    </Button>
                </DialogClose>
                <Button onClick={handleAccessClick} className="bg-primary text-primary-foreground hover:opacity-95 rounded-lg px-6 py-2.5 text-xs font-semibold h-auto font-label-caps tracking-wider border-none h-10 flex items-center">
                    {isInformational(link) ? "View Offer" : "Claim Benefit"}
                    <ExternalLink className="w-3.5 h-3.5 ml-2"/>
                </Button>
            </div>
        </div>
    );
};

export default PerkDetails;
