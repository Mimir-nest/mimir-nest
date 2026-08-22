"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Code, Palette, Cloud, GraduationCap, Music, ShoppingBag, Settings, Briefcase, Sparkles, ExternalLink, Search, X, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import PerkDetails from "@/components/email-perks/PerkDetails";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { contentApi } from "@/services/contentApi";
const categories = [
    { id: "all", label: "All Benefits", icon: Sparkles },
    { id: "developers", label: "Developers", icon: Code },
    { id: "creativity", label: "Creativity & Design", icon: Palette },
    {
        id: "placement-prep",
        label: "Placement Prep",
        icon: GraduationCap,
    },
    { id: "utilities", label: "Cloud & Utilities", icon: Settings },
];
const perkIcons = {
    code: <Code className="h-5 w-5 text-surface-tint"/>,
    palette: <Palette className="h-5 w-5 text-surface-tint"/>,
    cloud: <Cloud className="h-5 w-5 text-surface-tint"/>,
    "graduation-cap": <GraduationCap className="h-5 w-5 text-surface-tint"/>,
    settings: <Settings className="h-5 w-5 text-surface-tint"/>,
    briefcase: <Briefcase className="h-5 w-5 text-surface-tint"/>,
    music: <Music className="h-5 w-5 text-surface-tint"/>,
    "shopping-bag": <ShoppingBag className="h-5 w-5 text-surface-tint"/>,
    sparkles: <Sparkles className="h-5 w-5 text-surface-tint"/>,
};
const EmailPerks = () => {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [perks, setPerks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        let isMounted = true;
        contentApi
            .getPerks()
            .then((items) => {
            if (isMounted) {
                setPerks(items);
                setError(null);
            }
        })
            .catch(() => {
            if (isMounted) {
                setError("Failed to load email perks.");
            }
        })
            .finally(() => {
            if (isMounted) {
                setLoading(false);
            }
        });
        return () => {
            isMounted = false;
        };
    }, []);
    const filteredPerks = useMemo(() => {
        let filtered = selectedCategory === "all"
            ? perks
            : perks.filter((perk) => perk.category === selectedCategory);
        if (searchQuery.trim()) {
            filtered = filtered.filter((perk) => perk.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                perk.description.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        return filtered;
    }, [selectedCategory, searchQuery, perks]);
    const handleAccessClick = (link, title) => {
        window.open(link, "_blank");
        toast.success(`Accessing ${title} benefits`, {
            description: "You're being redirected to the provider's website",
        });
    };
    return (<div className="min-h-screen bg-mn-background text-on-background selection:bg-surface-tint/30">
      <Navbar />

      {/* ── Deep Green Sanctuary Hero ── */}
      <section className="relative bg-surface-container pt-[120px] md:pt-[150px] pb-16 md:pb-24 px-6 md:px-16 overflow-hidden rounded-b-3xl">
        {/* Decorative Rings */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full border border-surface-tint/15 translate-x-1/4 -translate-y-1/4 pointer-events-none"/>
        <div className="absolute top-0 right-0 w-[550px] h-[550px] rounded-full border border-surface-tint/20 translate-x-1/3 -translate-y-1/3 pointer-events-none"/>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full border border-primary-container/40 -translate-x-1/2 translate-y-1/2 pointer-events-none"/>

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-xs font-label-caps text-surface-tint tracking-widest uppercase mx-auto">
            <Sparkles className="w-4 h-4 text-surface-tint"/>
            <span>Student Exclusive Perks</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display-lg text-display-lg-mobile md:text-display-lg text-foreground leading-tight">
            Unlock $15,000+ in <br />
            <span className="text-surface-tint">Academic Benefits.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-body-lg text-body-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Access top developer packs, cloud credits, design suites, and productivity tools 
            completely free using your university student email.
          </motion.p>

          {/* Search bar inside Hero */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="relative max-w-xl mx-auto pt-2">
            <div className="relative flex items-center bg-surface-container border border-border rounded-full shadow-2xl transition-all focus-within:border-surface-tint">
              <Search className="h-5 w-5 text-muted-foreground ml-5"/>
              <input type="text" placeholder="Search tools (e.g. GitHub, AWS, JetBrains, Figma)..." className="w-full bg-transparent border-none text-base px-4 py-4 focus:outline-none text-white placeholder:text-muted-foreground/60 font-body-md" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
              {searchQuery && (<button onClick={() => setSearchQuery("")} className="mr-4 p-1 rounded-full text-muted-foreground hover:text-white hover:bg-white/10">
                  <X className="w-4 h-4"/>
                </button>)}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Category Filter Bar ── */}
      <div className="sticky top-20 z-30 bg-mn-background/90 backdrop-blur-xl border-b border-outline-variant/30 py-4 mb-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-16 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 min-w-max justify-center">
            {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (<button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`
                    flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium transition-all duration-300
                    ${isSelected
                    ? "bg-primary text-primary-foreground shadow-sm scale-105"
                    : "bg-surface-container text-on-surface-variant hover:text-foreground hover:bg-surface-container-high"}
                  `}>
                  <Icon className="w-3.5 h-3.5"/>
                  <span>{cat.label}</span>
                </button>);
        })}
          </div>
        </div>
      </div>

      {/* ── Perks Grid ── */}
      <main className="max-w-7xl mx-auto px-6 md:px-16 pb-24">
        {loading ? (<div className="flex flex-col items-center justify-center py-32">
            <div className="w-12 h-12 rounded-full border-4 border-surface-tint border-t-transparent animate-spin mb-4"/>
            <p className="text-on-surface-variant text-sm font-body-md">Loading student perks...</p>
          </div>) : filteredPerks.length > 0 ? (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredPerks.map((perk, index) => (<motion.div key={perk.id || index} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.04 }} layout>
                  <div className="group relative h-full bg-surface-container-lowest border border-border/50 rounded-2xl overflow-hidden hover:border-surface-tint/60 transition-all duration-300 flex flex-col justify-between p-7">
                    
                    <div>
                      {/* Top Row: Icon + Value Badge */}
                      <div className="flex justify-between items-start mb-5">
                        <div className="p-3 bg-surface-container rounded-xl border border-outline-variant/30 group-hover:scale-105 transition-transform">
                          {perkIcons[perk.iconKey] || <Gift className="h-5 w-5 text-surface-tint"/>}
                        </div>
                        <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-md">
                          {perk.value} Value
                        </span>
                      </div>

                      {/* Title & Description */}
                      <h3 className="font-headline-md text-lg text-mn-primary mb-2 line-clamp-1 group-hover:text-surface-tint transition-colors">
                        {perk.title}
                      </h3>

                      <p className="text-on-surface-variant text-xs font-body-md leading-relaxed mb-5 line-clamp-2">
                        {perk.description}
                      </p>

                      {/* Offers List */}
                      <div className="space-y-2 mb-6">
                        {perk.offers.slice(0, 3).map((offer, i) => (<div key={i} className="flex items-start gap-2.5 text-xs text-on-surface font-body-md">
                            <div className="mt-1 w-1.5 h-1.5 rounded-full bg-surface-tint shrink-0"/>
                            <span className="line-clamp-1">{offer}</span>
                          </div>))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-4 border-t border-outline-variant/20 flex gap-2.5">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="flex-1 bg-surface-container border-outline-variant/40 text-mn-primary hover:bg-surface-container-high rounded-lg text-xs font-label-caps tracking-wider">
                            Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-surface-container border-border rounded-2xl max-w-2xl p-8">
                          <PerkDetails {...perk} icon={perkIcons[perk.iconKey] || <Gift className="h-5 w-5 text-surface-tint"/>}/>
                        </DialogContent>
                      </Dialog>

                      <Button className="flex-1 bg-primary text-primary-foreground hover:opacity-90 rounded-lg text-xs font-label-caps tracking-wider shadow-sm font-semibold border-none" onClick={() => handleAccessClick(perk.link, perk.title)}>
                        Claim
                        <ExternalLink className="w-3.5 h-3.5 ml-1.5"/>
                      </Button>
                    </div>
                  </div>
                </motion.div>))}
            </AnimatePresence>
          </div>) : (<div className="text-center py-32 bg-surface-container-lowest rounded-2xl border border-outline-variant/30">
            <div className="inline-flex p-4 rounded-full bg-surface-container text-surface-tint mb-4">
              <Search className="w-8 h-8"/>
            </div>
            <h3 className="font-headline-md text-lg text-mn-primary mb-1">
              No perks found
            </h3>
            <p className="text-on-surface-variant text-sm font-body-md max-w-sm mx-auto">
              Try adjusting your search terms or selecting a different category filter.
            </p>
          </div>)}
      </main>

      <Footer />
    </div>);
};
export default EmailPerks;
