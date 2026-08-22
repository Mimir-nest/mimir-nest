"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Search, Filter, Layers, X, Sparkles } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
const POPULAR_TOPICS = [
    'Array',
    'Dynamic Programming',
    'String',
    'Tree',
    'Graph',
    'Hash Table',
    'Binary Search',
    'Two Pointers',
    'Stack',
    'Heap',
];
const SearchFilters = ({ searchTerm, setSearchTerm, difficultyFilter, setDifficultyFilter, topicFilter, setTopicFilter, difficulties, topics }) => {
    const cardVariants = {
        hidden: {
            y: 20,
            opacity: 0
        },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.3,
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        }
    };
    return (<motion.div className="space-y-4 mb-8" variants={cardVariants} initial="hidden" animate="visible">
      {/* ── Main Search & Select Controls Bar ── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 p-2 bg-surface-container-lowest rounded-[24px] border border-outline-variant/40 shadow-sm">
        
        {/* Search Input */}
        <div className="md:col-span-6 relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-surface-tint transition-colors pointer-events-none">
            <Search className="h-4 w-4"/>
          </div>
          <Input type="text" placeholder="Search problems by keyword or title..." className="pl-11 pr-10 bg-surface-container/60 border-none text-mn-primary placeholder:text-on-surface-variant/60 focus-visible:ring-2 focus-visible:ring-surface-tint h-12 rounded-2xl transition-all font-body-md text-sm" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
          {searchTerm && (<button onClick={() => setSearchTerm('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-mn-primary p-1 rounded-full hover:bg-surface-container transition-colors">
              <X className="h-4 w-4"/>
            </button>)}
        </div>
        
        {/* Difficulty Filter Dropdown */}
        <div className="md:col-span-3">
          <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
            <SelectTrigger className="w-full h-12 bg-surface-container/60 border-none text-mn-primary rounded-2xl hover:bg-surface-container transition-colors focus:ring-2 focus:ring-surface-tint font-body-md text-sm">
              <div className="flex items-center gap-2.5">
                <Filter className="h-4 w-4 text-surface-tint"/>
                <SelectValue placeholder="Difficulty"/>
              </div>
            </SelectTrigger>
            <SelectContent className="bg-surface-container-lowest border-outline-variant/40 text-mn-primary rounded-2xl shadow-xl">
              <SelectItem value="All">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-surface-tint"/>
                  <span>All Difficulties</span>
                </div>
              </SelectItem>
              {difficulties.filter(d => d !== 'All').map(difficulty => {
            const colorDot = difficulty === 'Easy'
                ? 'bg-emerald-500'
                : difficulty === 'Medium'
                    ? 'bg-amber-500'
                    : 'bg-rose-500';
            return (<SelectItem key={difficulty} value={difficulty}>
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${colorDot}`}/>
                      <span>{difficulty}</span>
                    </div>
                  </SelectItem>);
        })}
            </SelectContent>
          </Select>
        </div>

        {/* Topics Filter Dropdown */}
        <div className="md:col-span-3">
          <Select value={topicFilter} onValueChange={setTopicFilter}>
            <SelectTrigger className="w-full h-12 bg-surface-container/60 border-none text-mn-primary rounded-2xl hover:bg-surface-container transition-colors focus:ring-2 focus:ring-surface-tint font-body-md text-sm">
              <div className="flex items-center gap-2.5 truncate">
                <Layers className="h-4 w-4 text-surface-tint shrink-0"/>
                <SelectValue placeholder="Topics"/>
              </div>
            </SelectTrigger>
            <SelectContent className="bg-surface-container-lowest border-outline-variant/40 text-mn-primary rounded-2xl shadow-xl max-h-[320px]">
              <SelectItem value="All">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-surface-tint"/>
                  <span>All Topics</span>
                </div>
              </SelectItem>
              {topics.filter(t => t !== 'All').sort().map(topic => (<SelectItem key={topic} value={topic}>
                  {topic}
                </SelectItem>))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* ── Quick Topic Filter Chips ── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
        <span className="text-xs font-label-caps tracking-widest text-on-surface-variant/70 shrink-0 mr-1 uppercase">
          Tags:
        </span>
        <button onClick={() => setTopicFilter('All')} className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${topicFilter === 'All'
            ? 'bg-mn-primary text-on-primary shadow-sm'
            : 'bg-surface-container text-on-surface-variant hover:text-mn-primary hover:bg-surface-container-high'}`}>
          All
        </button>
        {POPULAR_TOPICS.map((topic) => {
            const isSelected = topicFilter === topic;
            return (<button key={topic} onClick={() => setTopicFilter(isSelected ? 'All' : topic)} className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${isSelected
                    ? 'bg-surface-tint text-on-primary shadow-sm'
                    : 'bg-surface-container/70 text-on-surface-variant hover:text-mn-primary hover:bg-surface-container'}`}>
              {topic}
            </button>);
        })}
      </div>
    </motion.div>);
};
export default SearchFilters;
