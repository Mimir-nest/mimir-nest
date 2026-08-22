"use client";

import React from 'react';
import { useTypingStore } from '@/store/typingStore';
import TypingChart from './TypingChart';
import { Button } from '@/components/ui/button';
import { RotateCcw, Trophy, Target, Clock, Zap } from 'lucide-react';
export default function TypingTestResults({ onRestart }) {
    const { stats } = useTypingStore();
    const finalWPM = stats.wpm[stats.wpm.length - 1] || 0;
    const finalRaw = stats.raw[stats.raw.length - 1] || 0;
    const averageWPM = stats.wpm.length > 0
        ? Math.round(stats.wpm.reduce((a, b) => a + b, 0) / stats.wpm.length)
        : 0;
    const getPerformanceGrade = (wpm) => {
        if (wpm >= 70)
            return { grade: 'Master Tier', color: 'text-emerald-700 bg-emerald-50 border-emerald-200', icon: Trophy };
        if (wpm >= 50)
            return { grade: 'Proficient', color: 'text-surface-tint bg-surface-container border-outline-variant/30', icon: Target };
        if (wpm >= 30)
            return { grade: 'Intermediate', color: 'text-amber-700 bg-amber-50 border-amber-200', icon: Clock };
        return { grade: 'Needs Practice', color: 'text-rose-700 bg-rose-50 border-rose-200', icon: Zap };
    };
    const performance = getPerformanceGrade(finalWPM);
    const PerformanceIcon = performance.icon;
    return (<div className="space-y-8 max-w-4xl mx-auto">
      {/* Test Complete Header Banner */}
      <div className="text-center py-10 bg-primary-container text-on-primary rounded-[32px] border border-surface-tint/30 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full border border-surface-tint/20 translate-x-1/3 -translate-y-1/3 pointer-events-none"/>
        <div className="flex justify-center mb-4 relative z-10">
          <div className="p-4 bg-surface-container-lowest text-mn-primary rounded-full shadow-lg">
            <Trophy className="w-8 h-8 text-surface-tint"/>
          </div>
        </div>
        <h2 className="font-headline-lg text-3xl font-bold text-on-primary mb-2 relative z-10">
          Typing Assessment Complete
        </h2>
        <p className="text-on-primary/70 font-body-md text-sm relative z-10">
          Here is your comprehensive coding velocity and accuracy breakdown
        </p>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface-container-lowest p-7 rounded-[28px] border border-outline-variant/40 text-center shadow-sm flex flex-col justify-center items-center">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-3 font-semibold text-xs ${performance.color}`}>
            <PerformanceIcon className="w-4 h-4"/>
            <span>{performance.grade}</span>
          </div>
          <div className="text-xs font-label-caps text-on-surface-variant uppercase tracking-widest">Skill Evaluation</div>
        </div>
        
        <div className="bg-surface-container-lowest p-7 rounded-[28px] border border-outline-variant/40 text-center shadow-sm flex flex-col justify-center items-center">
          <div className="font-display-lg text-4xl md:text-5xl font-bold text-mn-primary tabular-nums mb-1">{finalWPM}</div>
          <div className="text-xs font-label-caps text-surface-tint uppercase tracking-widest">Final WPM</div>
          <div className="text-xs text-on-surface-variant/70 mt-1 font-body-md">Average Velocity: {averageWPM} WPM</div>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-outline-variant/40 text-center">
          <div className="font-headline-md text-2xl font-bold text-emerald-700 tabular-nums mb-1">{Math.round(stats.accuracy)}%</div>
          <div className="text-[11px] font-label-caps text-on-surface-variant uppercase tracking-wider">Accuracy</div>
          <div className="text-[11px] text-on-surface-variant/60 mt-0.5">Errors: {stats.totalErrors}</div>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-outline-variant/40 text-center">
          <div className="font-headline-md text-2xl font-bold text-mn-primary tabular-nums mb-1">{finalRaw}</div>
          <div className="text-[11px] font-label-caps text-on-surface-variant uppercase tracking-wider">Raw CPM</div>
          <div className="text-[11px] text-on-surface-variant/60 mt-0.5">Gross Speed</div>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-outline-variant/40 text-center">
          <div className="font-headline-md text-2xl font-bold text-mn-primary tabular-nums mb-1">
            {stats.time !== null ? `${stats.time}s` : '30s'}
          </div>
          <div className="text-[11px] font-label-caps text-on-surface-variant uppercase tracking-wider">Duration</div>
          <div className="text-[11px] text-on-surface-variant/60 mt-0.5">Elapsed Time</div>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-outline-variant/40 text-center">
          <div className="font-headline-md text-2xl font-bold text-mn-primary tabular-nums mb-1">
            {stats.characters.correct + stats.characters.incorrect}
          </div>
          <div className="text-[11px] font-label-caps text-on-surface-variant uppercase tracking-wider">Total Chars</div>
          <div className="text-[11px] text-on-surface-variant/60 mt-0.5">Keystrokes</div>
        </div>
      </div>

      {/* Performance Chart */}
      {stats.wpm.length > 0 && (<div className="bg-surface-container-lowest p-7 rounded-[32px] border border-outline-variant/40 shadow-sm">
          <h3 className="font-headline-md text-lg font-bold text-mn-primary mb-4">Velocity Over Time</h3>
          <TypingChart />
        </div>)}

      {/* Character Analysis */}
      <div className="bg-surface-container-lowest rounded-[32px] border border-outline-variant/40 p-7 shadow-sm">
        <h3 className="font-headline-md text-lg font-bold text-mn-primary mb-6 flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-surface-tint rounded-full"></span>
          Character Distribution Analysis
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-3 rounded-2xl bg-surface-container/50">
            <div className="text-2xl font-bold text-emerald-700 mb-1 tabular-nums">
              {stats.characters.correct}
            </div>
            <div className="text-[11px] font-label-caps text-on-surface-variant uppercase tracking-wider mb-2">Correct</div>
            <div className="w-full bg-surface-container-high rounded-full h-2">
              <div className="bg-emerald-600 h-2 rounded-full transition-all duration-300" style={{
            width: `${Math.min(100, (stats.characters.correct / Math.max(1, stats.characters.correct + stats.characters.incorrect)) * 100)}%`
        }}></div>
            </div>
          </div>
          
          <div className="text-center p-3 rounded-2xl bg-surface-container/50">
            <div className="text-2xl font-bold text-rose-700 mb-1 tabular-nums">
              {stats.characters.incorrect}
            </div>
            <div className="text-[11px] font-label-caps text-on-surface-variant uppercase tracking-wider mb-2">Incorrect</div>
            <div className="w-full bg-surface-container-high rounded-full h-2">
              <div className="bg-rose-600 h-2 rounded-full transition-all duration-300" style={{
            width: `${Math.min(100, (stats.characters.incorrect / Math.max(1, stats.characters.correct + stats.characters.incorrect)) * 100)}%`
        }}></div>
            </div>
          </div>
          
          <div className="text-center p-3 rounded-2xl bg-surface-container/50">
            <div className="text-2xl font-bold text-amber-700 mb-1 tabular-nums">
              {stats.characters.extra}
            </div>
            <div className="text-[11px] font-label-caps text-on-surface-variant uppercase tracking-wider mb-2">Extra</div>
            <div className="w-full bg-surface-container-high rounded-full h-2">
              <div className="bg-amber-600 h-2 rounded-full w-1/4 transition-all duration-300"></div>
            </div>
          </div>
          
          <div className="text-center p-3 rounded-2xl bg-surface-container/50">
            <div className="text-2xl font-bold text-on-surface-variant mb-1 tabular-nums">
              {stats.characters.missed}
            </div>
            <div className="text-[11px] font-label-caps text-on-surface-variant uppercase tracking-wider mb-2">Missed</div>
            <div className="w-full bg-surface-container-high rounded-full h-2">
              <div className="bg-on-surface-variant h-2 rounded-full w-1/4 transition-all duration-300"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Restart Button */}
      <div className="text-center pt-2">
        <Button onClick={onRestart} className="bg-mn-primary hover:opacity-90 text-on-primary px-8 py-6 rounded-full font-label-caps text-xs tracking-widest uppercase shadow-md hover:scale-105 transition-all">
          <RotateCcw className="w-4 h-4 mr-2"/>
          Take Another Test
        </Button>
      </div>
    </div>);
}
