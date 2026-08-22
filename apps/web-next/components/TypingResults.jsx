"use client";

import React from 'react';
import { useTypingStore } from '@/store/typingStore';
export default function TypingResults() {
    const { stats } = useTypingStore();
    const lastWPM = stats.wpm[stats.wpm.length - 1] || 0;
    const lastRaw = stats.raw[stats.raw.length - 1] || 0;
    return (<div className="mt-8">
      {/* Live Stats During Typing */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-outline-variant/40 text-center">
          <div className="font-headline-md text-3xl font-bold text-mn-primary tabular-nums mb-1">{lastWPM}</div>
          <div className="text-[11px] font-label-caps text-surface-tint uppercase tracking-widest">WPM Speed</div>
        </div>
        
        <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-outline-variant/40 text-center">
          <div className="font-headline-md text-3xl font-bold text-emerald-700 tabular-nums mb-1">{Math.round(stats.accuracy)}%</div>
          <div className="text-[11px] font-label-caps text-surface-tint uppercase tracking-widest">Accuracy</div>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-outline-variant/40 text-center">
          <div className="font-headline-md text-3xl font-bold text-mn-primary tabular-nums mb-1">{lastRaw}</div>
          <div className="text-[11px] font-label-caps text-surface-tint uppercase tracking-widest">Raw CPM</div>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-outline-variant/40 text-center">
          <div className="font-headline-md text-3xl font-bold text-rose-600 tabular-nums mb-1">{stats.totalErrors}</div>
          <div className="text-[11px] font-label-caps text-surface-tint uppercase tracking-widest">Mistakes</div>
        </div>
      </div>
    </div>);
}
