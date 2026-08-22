"use client";

import { useState, useEffect } from 'react';
import { useTypingStore } from '@/store/typingStore';
import TypingArea from '@/components/TypingArea';
import TypingResults from '@/components/TypingResults';
import TypingTestResults from '@/components/TypingTestResults';
import LanguageSelector, { codeSnippets } from '@/components/LanguageSelector';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { RotateCcw, Play, Keyboard, Languages, Timer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from "framer-motion";
const Typing = () => {
    const [timeLeft, setTimeLeft] = useState(30);
    const [currentText, setCurrentText] = useState('');
    const [cursorPosition, setCursorPosition] = useState(0);
    const [isStarted, setIsStarted] = useState(false);
    const [currentSnippet, setCurrentSnippet] = useState(codeSnippets.javascript[0]);
    const [testDuration, setTestDuration] = useState(30);
    const { resetStats, stats } = useTypingStore();
    const isTestComplete = stats.isComplete || timeLeft === 0;
    const showResults = isTestComplete && isStarted;
    useEffect(() => {
        resetStats();
    }, []);
    const handleReset = () => {
        resetStats();
        setCurrentText('');
        setCursorPosition(0);
        setTimeLeft(testDuration);
        setIsStarted(false);
    };
    const handleStart = () => {
        if (!isStarted && timeLeft > 0) {
            setIsStarted(true);
        }
    };
    const handleLanguageChange = (snippet) => {
        if (!isStarted) {
            setCurrentSnippet(snippet);
            setCurrentText('');
            setCursorPosition(0);
            resetStats();
        }
    };
    const handleDurationChange = (duration) => {
        if (!isStarted) {
            setTestDuration(duration);
            setTimeLeft(duration);
        }
    };
    return (<div className="min-h-screen bg-mn-background text-on-background selection:bg-surface-tint/30 flex flex-col justify-between">
      <Navbar />

      {/* ── Deep Green Sanctuary Hero ── */}
      <section className="relative bg-surface-container pt-[120px] md:pt-[150px] pb-16 md:pb-24 px-4 sm:px-6 md:px-16 overflow-hidden rounded-b-3xl">
        {/* Decorative Rings */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full border border-surface-tint/15 translate-x-1/4 -translate-y-1/4 pointer-events-none"/>
        <div className="absolute top-0 right-0 w-[550px] h-[550px] rounded-full border border-surface-tint/20 translate-x-1/3 -translate-y-1/3 pointer-events-none"/>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full border border-primary-container/40 -translate-x-1/2 translate-y-1/2 pointer-events-none"/>

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-xs font-label-caps text-surface-tint tracking-widest uppercase mx-auto">
            <Keyboard className="w-4 h-4 text-surface-tint"/>
            <span>Developer Velocity Arena</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display-lg text-display-lg-mobile md:text-display-lg text-foreground leading-tight">
            Master Your <br />
            <span className="text-surface-tint">Coding Keystrokes.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-body-lg text-body-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Enhance real-world coding speed, syntax fluency, and muscle memory 
            across multiple programming languages with real algorithmic snippets.
          </motion.p>
        </div>
      </section>

      {/* ── Main Interactive Typing Section ── */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 md:px-16 py-12 w-full flex-grow">
        {!showResults ? (<motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="space-y-6">
            {/* Control Bar */}
            <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/40 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface-container border border-outline-variant/30 text-foreground text-sm font-medium">
                  <Languages className="w-4 h-4 text-surface-tint shrink-0"/>
                  <LanguageSelector currentLanguage={currentSnippet.language} onLanguageChange={handleLanguageChange} disabled={isStarted}/>
                </div>
                
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-surface-container border border-outline-variant/30 text-mn-primary text-sm font-medium">
                  <Timer className="w-4 h-4 text-surface-tint shrink-0"/>
                  <select value={testDuration} onChange={(e) => handleDurationChange(Number(e.target.value))} disabled={isStarted} className="bg-transparent border-none text-sm text-mn-primary focus:outline-none cursor-pointer font-bold">
                    <option value={15} className="bg-surface-container-lowest text-mn-primary">15s</option>
                    <option value={30} className="bg-surface-container-lowest text-mn-primary">30s</option>
                    <option value={60} className="bg-surface-container-lowest text-mn-primary">60s</option>
                    <option value={120} className="bg-surface-container-lowest text-mn-primary">120s</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                <Button onClick={handleReset} variant="ghost" className="text-on-surface-variant hover:text-foreground hover:bg-surface-container rounded-lg text-xs font-label-caps tracking-wider px-5" disabled={isStarted && timeLeft > 0}>
                  <RotateCcw className="w-3.5 h-3.5 mr-1.5"/>
                  Reset
                </Button>
                <Button onClick={handleStart} className="bg-primary text-primary-foreground rounded-lg hover:scale-[1.02] border-none font-semibold min-w-[130px] text-xs font-label-caps tracking-wider px-6 py-2.5" disabled={isStarted}>
                  <Play className="w-3.5 h-3.5 mr-1.5 fill-current"/>
                  {isStarted ? 'Running...' : 'Start Test'}
                </Button>
              </div>
            </div>

            {/* Typing Area Terminal Card */}
            <div className={`
              relative rounded-[32px] border transition-all duration-300 overflow-hidden bg-surface-container-lowest p-8 md:p-12 shadow-[0_20px_50px_rgba(0,19,8,0.06)]
              ${isStarted
                ? 'border-surface-tint ring-2 ring-surface-tint/20'
                : 'border-outline-variant/40'}
            `}>
              <TypingArea snippet={currentSnippet} timeLeft={timeLeft} onType={setCurrentText} cursorPosition={cursorPosition} setCursorPosition={setCursorPosition} currentText={currentText} setTimeLeft={setTimeLeft} testDuration={testDuration} isStarted={isStarted} onStart={handleStart}/>
            </div>
            
            {/* Live Stats */}
            <AnimatePresence>
              {isStarted && !isTestComplete && (<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
                  <TypingResults />
                </motion.div>)}
            </AnimatePresence>
          </motion.div>) : (<motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="w-full">
            <TypingTestResults onRestart={handleReset}/>
          </motion.div>)}
      </main>

      <Footer />
    </div>);
};
export default Typing;
