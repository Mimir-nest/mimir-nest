"use client";

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Copy, Check, ExternalLink, Trophy, Target, Zap, BarChart3, Filter, CircleDot, RotateCcw } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useAuthStore } from "@/store/useAuthStore";
import { useProgressStore } from "@/store/useProgressStore";
const QuestionsTable = ({ filteredQuestions, copiedQuestionId, handleCopyQuestion }) => {
    const { isAuthenticated } = useAuthStore();
    const { progressMap, updateProgress: storeUpdateProgress, removeProgress: storeRemoveProgress } = useProgressStore();

    const [localSolvedQuestions, setLocalSolvedQuestions] = useState(() => {
        try {
            const saved = localStorage.getItem('mimir_dsa_solved');
            return saved ? new Set(JSON.parse(saved)) : new Set();
        }
        catch {
            return new Set();
        }
    });

    const solvedQuestions = useMemo(() => {
        if (isAuthenticated) {
            const set = new Set();
            Object.keys(progressMap).forEach((key) => {
                if (key.startsWith("dsa_") && progressMap[key] === "solved") {
                    set.add(key.replace("dsa_", ""));
                }
            });
            return set;
        }
        return localSolvedQuestions;
    }, [isAuthenticated, progressMap, localSolvedQuestions]);

    const [showUnsolvedOnly, setShowUnsolvedOnly] = useState(false);
    const cardVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.4
            }
        }
    };
    const handleCheckboxChange = async (questionId, checked) => {
        const stringId = String(questionId);
        if (isAuthenticated) {
            if (checked) {
                await storeUpdateProgress("dsa", stringId, "solved");
            } else {
                await storeRemoveProgress("dsa", stringId);
            }
        } else {
            const newSolvedQuestions = new Set(localSolvedQuestions);
            if (checked) {
                newSolvedQuestions.add(questionId);
            }
            else {
                newSolvedQuestions.delete(questionId);
            }
            setLocalSolvedQuestions(newSolvedQuestions);
            try {
                localStorage.setItem('mimir_dsa_solved', JSON.stringify(Array.from(newSolvedQuestions)));
            }
            catch (e) {
                console.error(e);
            }
        }
    };
    const handleResetProgress = async () => {
        if (isAuthenticated) {
            const dsaKeys = Object.keys(progressMap).filter(key => key.startsWith("dsa_"));
            for (const key of dsaKeys) {
                const id = key.replace("dsa_", "");
                await storeRemoveProgress("dsa", id);
            }
        } else {
            setLocalSolvedQuestions(new Set());
            localStorage.removeItem('mimir_dsa_solved');
        }
    };
    // Calculate stats by difficulty
    const easyQuestions = filteredQuestions.filter(q => q.difficulty === 'Easy');
    const mediumQuestions = filteredQuestions.filter(q => q.difficulty === 'Medium');
    const hardQuestions = filteredQuestions.filter(q => q.difficulty === 'Hard');
    const easySolved = easyQuestions.filter(q => solvedQuestions.has(q.id)).length;
    const mediumSolved = mediumQuestions.filter(q => solvedQuestions.has(q.id)).length;
    const hardSolved = hardQuestions.filter(q => solvedQuestions.has(q.id)).length;
    const totalSolved = filteredQuestions.filter(q => solvedQuestions.has(q.id)).length;
    const totalQuestions = filteredQuestions.length;
    const progressPercentage = totalQuestions > 0 ? (totalSolved / totalQuestions) * 100 : 0;
    // Level status badge based on completion
    const getRankBadge = (pct) => {
        if (pct >= 80)
            return { label: 'FAANG Ready', color: 'bg-emerald-500 text-white' };
        if (pct >= 50)
            return { label: 'Interview Ready', color: 'bg-surface-tint text-white' };
        if (pct >= 25)
            return { label: 'Rising Star', color: 'bg-amber-500 text-white' };
        return { label: 'Warmup Phase', color: 'bg-surface-container text-on-surface-variant' };
    };
    const rank = getRankBadge(progressPercentage);
    // Filter display list based on showUnsolvedOnly toggle
    const displayQuestions = showUnsolvedOnly
        ? filteredQuestions.filter(q => !solvedQuestions.has(q.id))
        : filteredQuestions;
    return (<motion.div className="space-y-6 mb-16" variants={cardVariants} initial="hidden" animate="visible">
      {/* ── Futuristic Mastery Analytics Bento ── */}
      <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-[32px] p-6 md:p-8 shadow-[0_20px_50px_rgba(0,19,8,0.06)] relative overflow-hidden">
        {/* Subtle decorative ring */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full border border-surface-tint/10 translate-x-1/3 -translate-y-1/3 pointer-events-none"/>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center mb-8">
          
          {/* Header + Rank */}
          <div className="lg:col-span-6 flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-surface-container flex items-center justify-center text-surface-tint border border-surface-tint/20">
                <BarChart3 className="h-6 w-6"/>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-headline-md text-headline-md text-mn-primary">Interview Mastery Hub</h3>
                  <span className={`text-[10px] font-label-caps uppercase tracking-widest px-2.5 py-0.5 rounded-full ${rank.color}`}>
                    {rank.label}
                  </span>
                </div>
                <p className="text-on-surface-variant font-body-md text-sm">
                  Track your solved questions and measure preparation readiness
                </p>
              </div>
            </div>
          </div>

          {/* Solved Counters & Toggle Actions */}
          <div className="lg:col-span-6 flex flex-wrap items-center justify-start lg:justify-end gap-3">
            <button onClick={() => setShowUnsolvedOnly(!showUnsolvedOnly)} className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all ${showUnsolvedOnly
            ? 'bg-surface-tint text-on-primary shadow-sm'
            : 'bg-surface-container text-on-surface-variant hover:text-mn-primary'}`}>
              <CircleDot className="w-3.5 h-3.5"/>
              <span>{showUnsolvedOnly ? 'Showing Unsolved' : 'Show All'}</span>
            </button>

            {totalSolved > 0 && (<button onClick={handleResetProgress} className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs text-on-surface-variant/70 hover:text-destructive hover:bg-error-container/40 transition-colors" title="Reset marked questions">
                <RotateCcw className="w-3 h-3"/>
                <span>Reset</span>
              </button>)}

            <div className="bg-surface-container px-5 py-2.5 rounded-2xl border border-outline-variant/30 flex items-center gap-3">
              <div className="text-right">
                <div className="font-headline-md text-2xl text-mn-primary font-bold tabular-nums leading-none">
                  {Math.round(progressPercentage)}%
                </div>
                <div className="text-[10px] font-label-caps text-on-surface-variant uppercase tracking-wider">
                  {totalSolved} / {totalQuestions} Solved
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="relative h-2.5 bg-surface-container rounded-full overflow-hidden mb-8 shadow-inner">
          <motion.div className="absolute top-0 left-0 h-full bg-gradient-to-r from-surface-tint via-primary-fixed-dim to-surface-tint rounded-full" initial={{ width: 0 }} animate={{ width: `${progressPercentage}%` }} transition={{ duration: 1, ease: "easeOut" }}/>
        </div>

        {/* Difficulty Breakdown Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Easy */}
          <div className="p-4 rounded-2xl bg-surface-container/60 border border-outline-variant/30 hover:bg-surface-container transition-colors flex items-center gap-4">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
              <Zap className="h-5 w-5"/>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-bold text-mn-primary font-body-md uppercase tracking-wider">Easy</span>
                <span className="text-xs text-on-surface-variant font-medium tabular-nums">
                  {easySolved} / {easyQuestions.length} ({easyQuestions.length > 0 ? Math.round((easySolved / easyQuestions.length) * 100) : 0}%)
                </span>
              </div>
              <div className="h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: `${easyQuestions.length > 0 ? (easySolved / easyQuestions.length) * 100 : 0}%` }}/>
              </div>
            </div>
          </div>

          {/* Medium */}
          <div className="p-4 rounded-2xl bg-surface-container/60 border border-outline-variant/30 hover:bg-surface-container transition-colors flex items-center gap-4">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-600 border border-amber-500/20">
              <Target className="h-5 w-5"/>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-bold text-mn-primary font-body-md uppercase tracking-wider">Medium</span>
                <span className="text-xs text-on-surface-variant font-medium tabular-nums">
                  {mediumSolved} / {mediumQuestions.length} ({mediumQuestions.length > 0 ? Math.round((mediumSolved / mediumQuestions.length) * 100) : 0}%)
                </span>
              </div>
              <div className="h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full transition-all duration-500" style={{ width: `${mediumQuestions.length > 0 ? (mediumSolved / mediumQuestions.length) * 100 : 0}%` }}/>
              </div>
            </div>
          </div>

          {/* Hard */}
          <div className="p-4 rounded-2xl bg-surface-container/60 border border-outline-variant/30 hover:bg-surface-container transition-colors flex items-center gap-4">
            <div className="p-3 rounded-xl bg-rose-500/10 text-rose-600 border border-rose-500/20">
              <Trophy className="h-5 w-5"/>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-bold text-mn-primary font-body-md uppercase tracking-wider">Hard</span>
                <span className="text-xs text-on-surface-variant font-medium tabular-nums">
                  {hardSolved} / {hardQuestions.length} ({hardQuestions.length > 0 ? Math.round((hardSolved / hardQuestions.length) * 100) : 0}%)
                </span>
              </div>
              <div className="h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                <div className="h-full bg-rose-500 rounded-full transition-all duration-500" style={{ width: `${hardQuestions.length > 0 ? (hardSolved / hardQuestions.length) * 100 : 0}%` }}/>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Questions Table Terminal ── */}
      <div className="border border-outline-variant/40 rounded-[32px] overflow-hidden bg-surface-container-lowest shadow-[0_20px_50px_rgba(0,19,8,0.06)]">
        <ScrollArea className="h-[600px] md:h-[700px]">
          <Table className="min-w-[800px]">
            <TableHeader className="bg-surface-container/90 sticky top-0 z-20 backdrop-blur-md border-b border-outline-variant/30">
              <TableRow className="border-outline-variant/30 hover:bg-transparent">
                <TableHead className="text-mn-primary font-bold pl-6 w-[50px]">Done</TableHead>
                <TableHead className="text-mn-primary font-bold">Problem Title</TableHead>
                <TableHead className="text-mn-primary font-bold w-[120px]">Difficulty</TableHead>
                <TableHead className="text-mn-primary font-bold hidden md:table-cell">Topics</TableHead>
                <TableHead className="text-mn-primary font-bold text-right">Acceptance</TableHead>
                <TableHead className="text-mn-primary font-bold text-right w-[200px] pr-6">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayQuestions.length > 0 ? (displayQuestions.map((question, index) => {
            const isSolved = solvedQuestions.has(question.id);
            return (<TableRow key={question.id || index} className={`group border-outline-variant/20 transition-colors duration-150 ${isSolved
                    ? 'bg-surface-container/30 hover:bg-surface-container/50'
                    : 'hover:bg-surface-container-low'}`}>
                      {/* Checkbox */}
                      <TableCell className="pl-6">
                        <Checkbox checked={isSolved} onCheckedChange={(checked) => handleCheckboxChange(question.id, checked)} className="border-outline-variant data-[state=checked]:bg-surface-tint data-[state=checked]:border-surface-tint w-5 h-5 rounded-lg transition-all"/>
                      </TableCell>

                      {/* Question Title */}
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <span className={`font-body-md text-sm font-semibold transition-all ${isSolved
                    ? 'text-on-surface-variant/50 line-through'
                    : 'text-mn-primary group-hover:text-surface-tint'}`}>
                            {question.title}
                          </span>
                          {copiedQuestionId === Number(question.id) && (<motion.span initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-[10px] font-label-caps text-surface-tint bg-primary-fixed/50 px-2 py-0.5 rounded-full">
                              Copied!
                            </motion.span>)}
                        </div>
                      </TableCell>

                      {/* Difficulty Badge */}
                      <TableCell>
                        <Badge variant="outline" className={`
                            font-semibold text-xs border px-3 py-1 rounded-md
                            ${question.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                    question.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                        'bg-rose-500/10 text-rose-400 border-rose-500/20'}
                          `}>
                          {question.difficulty}
                        </Badge>
                      </TableCell>

                      {/* Topic Tags */}
                      <TableCell className="hidden md:table-cell">
                        <div className="flex flex-wrap gap-1.5">
                          {question.topics.slice(0, 2).map((topic, i) => (<span key={i} className="text-xs text-on-surface-variant bg-surface-container border border-outline-variant/30 px-2.5 py-1 rounded-lg font-body-md">
                              {topic}
                            </span>))}
                          {question.topics.length > 2 && (<span className="text-xs text-on-surface-variant/60 bg-surface-container border border-outline-variant/30 px-2 py-1 rounded-lg">
                              +{question.topics.length - 2}
                            </span>)}
                        </div>
                      </TableCell>

                      {/* Acceptance Rate */}
                      <TableCell className="text-right text-on-surface-variant font-mono text-sm tabular-nums">
                        {question.acceptance}
                      </TableCell>

                      {/* Action buttons */}
                      <TableCell className="text-right pr-6">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-surface-container text-on-surface-variant hover:text-mn-primary rounded-xl transition-colors" onClick={() => handleCopyQuestion(Number(question.id), question.title)} title="Copy problem title">
                            {copiedQuestionId === Number(question.id) ? (<Check className="h-4 w-4 text-surface-tint"/>) : (<Copy className="h-4 w-4"/>)}
                          </Button>

                          <Button size="sm" className="bg-primary text-primary-foreground hover:opacity-90 border-none shadow-sm transition-all duration-300 gap-1.5 h-8 px-4 font-label-caps text-label-caps tracking-wider rounded-full hover:scale-105" onClick={() => window.open(question.link, '_blank')}>
                            <span>Solve</span>
                            <ExternalLink className="h-3 w-3"/>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>);
        })) : (<TableRow>
                  <TableCell colSpan={6} className="h-80 text-center">
                    <div className="flex flex-col items-center justify-center text-on-surface-variant py-12">
                      <div className="p-4 bg-surface-container rounded-full mb-3 text-surface-tint">
                        <Filter className="h-8 w-8"/>
                      </div>
                      <p className="text-lg font-headline-md font-bold text-mn-primary mb-1">No matching questions</p>
                      <p className="text-sm text-on-surface-variant max-w-xs">
                        Try adjusting your search query, topic filter, or difficulty level.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>)}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </motion.div>);
};
export default QuestionsTable;
