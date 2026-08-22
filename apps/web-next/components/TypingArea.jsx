"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { useTypingStore } from '@/store/typingStore';
const SAMPLE_INTERVAL = 1000; // 1 second
export default function TypingArea({ snippet, timeLeft, onType, cursorPosition, setCursorPosition, currentText, setTimeLeft, testDuration, isStarted, onStart }) {
    const [isCursorVisible, setIsCursorVisible] = useState(true);
    const [hasStartedTyping, setHasStartedTyping] = useState(false);
    const [totalMistakes, setTotalMistakes] = useState(0);
    const [currentMistakes, setCurrentMistakes] = useState(new Set());
    const containerRef = useRef(null);
    const lastSampleTime = useRef(0);
    const timerRef = useRef(null);
    const { addWPMSample, updateAccuracy, updateCharacters, setComplete, settings } = useTypingStore();
    // Start timer when test is started
    useEffect(() => {
        if (isStarted && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                const newTime = timeLeft - 1;
                setTimeLeft(newTime);
                if (newTime <= 0) {
                    const elapsedTime = testDuration;
                    setComplete(elapsedTime);
                    if (timerRef.current) {
                        clearInterval(timerRef.current);
                    }
                }
            }, 1000);
            return () => {
                if (timerRef.current) {
                    clearInterval(timerRef.current);
                }
            };
        }
    }, [isStarted, setTimeLeft, testDuration, setComplete, timeLeft]);
    // Cursor blinking effect
    useEffect(() => {
        const blinkInterval = setInterval(() => {
            setIsCursorVisible((prev) => !prev);
        }, 530);
        return () => clearInterval(blinkInterval);
    }, []);
    // Auto-focus the typing area when test starts
    useEffect(() => {
        if (containerRef.current && isStarted) {
            containerRef.current.focus();
        }
    }, [isStarted]);
    // Prevent losing focus during test
    const handleBlur = useCallback(() => {
        if (containerRef.current && isStarted) {
            setTimeout(() => {
                if (containerRef.current) {
                    containerRef.current.focus();
                }
            }, 0);
        }
    }, [isStarted]);
    const calculateAndUpdateStats = useCallback(() => {
        const timeElapsed = (testDuration - timeLeft) / 60; // Convert to minutes
        if (timeElapsed > 0) {
            const wordCount = currentText.length / 5;
            const wpm = Math.round(wordCount / timeElapsed);
            const raw = Math.round((currentText.length / 5) / timeElapsed);
            // Calculate correct characters more accurately
            let correctChars = 0;
            let incorrectChars = 0;
            for (let i = 0; i < Math.min(currentText.length, snippet.code.length); i++) {
                if (currentText[i] === snippet.code[i]) {
                    correctChars++;
                }
                else {
                    incorrectChars++;
                }
            }
            // Add extra characters as incorrect
            if (currentText.length > snippet.code.length) {
                incorrectChars += currentText.length - snippet.code.length;
            }
            const accuracy = currentText.length > 0 ? (correctChars / currentText.length) * 100 : 100;
            addWPMSample(wpm, raw, totalMistakes);
            updateAccuracy(accuracy);
            // Update character stats
            updateCharacters({
                correct: correctChars,
                incorrect: incorrectChars,
                extra: Math.max(0, currentText.length - snippet.code.length),
                missed: Math.max(0, snippet.code.length - currentText.length),
            });
        }
    }, [timeLeft, currentText, snippet.code, totalMistakes, addWPMSample, updateAccuracy, updateCharacters, testDuration]);
    // Calculate and store WPM periodically
    useEffect(() => {
        if (!hasStartedTyping || !isStarted)
            return;
        const now = Date.now();
        if (now - lastSampleTime.current >= SAMPLE_INTERVAL) {
            calculateAndUpdateStats();
            lastSampleTime.current = now;
        }
        const interval = setInterval(() => {
            const now = Date.now();
            if (now - lastSampleTime.current >= SAMPLE_INTERVAL) {
                calculateAndUpdateStats();
                lastSampleTime.current = now;
            }
        }, 100);
        return () => clearInterval(interval);
    }, [hasStartedTyping, isStarted, calculateAndUpdateStats]);
    // Handle completion when text matches exactly
    useEffect(() => {
        if (currentText === snippet.code && isStarted) {
            calculateAndUpdateStats();
            const elapsedTime = (testDuration - timeLeft);
            setComplete(elapsedTime);
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        }
    }, [currentText, snippet.code, isStarted, timeLeft, calculateAndUpdateStats, setComplete]);
    const handleKeyDown = useCallback((e) => {
        if (timeLeft === 0)
            return;
        // Start the test on first keypress if not already started
        if (!isStarted) {
            onStart();
            return;
        }
        // Prevent default behavior for space
        if (e.code === 'Space') {
            e.preventDefault();
        }
        if (!hasStartedTyping) {
            setHasStartedTyping(true);
            lastSampleTime.current = Date.now();
        }
        const currentValue = currentText;
        const targetText = snippet.code;
        if (e.key === 'Enter') {
            e.preventDefault();
            const newText = currentValue.slice(0, cursorPosition) + '\n' + currentValue.slice(cursorPosition);
            onType(newText);
            setCursorPosition(cursorPosition + 1);
        }
        else if (e.key === 'Tab') {
            e.preventDefault();
            const newText = currentValue.slice(0, cursorPosition) + '  ' + currentValue.slice(cursorPosition);
            onType(newText);
            setCursorPosition(cursorPosition + 2);
        }
        else if (e.key === 'Backspace') {
            if (cursorPosition > 0) {
                // Remove mistake tracking if backspacing over a mistake
                const newMistakes = new Set(currentMistakes);
                newMistakes.delete(cursorPosition - 1);
                setCurrentMistakes(newMistakes);
                const newText = currentValue.slice(0, cursorPosition - 1) + currentValue.slice(cursorPosition);
                onType(newText);
                setCursorPosition(cursorPosition - 1);
            }
        }
        else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
            const expectedChar = targetText[cursorPosition];
            const isCorrect = e.key === expectedChar;
            const newText = currentValue.slice(0, cursorPosition) + e.key + currentValue.slice(cursorPosition);
            onType(newText);
            setCursorPosition(cursorPosition + 1);
            // Track mistakes more accurately
            if (!isCorrect && !currentMistakes.has(cursorPosition)) {
                setTotalMistakes(prev => prev + 1);
                const newMistakes = new Set(currentMistakes);
                newMistakes.add(cursorPosition);
                setCurrentMistakes(newMistakes);
            }
            // Check if this was the last character
            if (newText === targetText) {
                calculateAndUpdateStats();
                const elapsedTime = (testDuration - timeLeft);
                setComplete(elapsedTime);
            }
        }
    }, [timeLeft, isStarted, onStart, hasStartedTyping, currentText, snippet.code, cursorPosition, onType, setCursorPosition, calculateAndUpdateStats, setComplete, testDuration, currentMistakes]);
    // Bind keyboard events
    useEffect(() => {
        if (isStarted) {
            window.addEventListener('keydown', handleKeyDown);
            return () => window.removeEventListener('keydown', handleKeyDown);
        }
    }, [handleKeyDown, isStarted]);
    const handleContainerClick = () => {
        if (!isStarted) {
            onStart();
        }
        // Always focus the container when clicked
        if (containerRef.current) {
            containerRef.current.focus();
        }
    };
    return (<div className="relative">
      {/* Premium Header */}
      <div className="flex justify-between items-center mb-4 md:mb-8 p-4 md:p-6 bg-gradient-to-r from-zinc-800/70 via-zinc-700/70 to-zinc-800/70 rounded-xl border border-zinc-600/50 backdrop-blur-sm">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-gradient-to-r from-red-400 to-red-500 rounded-full shadow-lg shadow-red-500/30"></div>
            <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full shadow-lg shadow-yellow-500/30"></div>
            <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-green-500 rounded-full shadow-lg shadow-green-500/30"></div>
          </div>
          <div className="text-sm px-4 py-2 bg-gradient-to-r from-white to-zinc-100 text-black rounded-lg font-semibold capitalize shadow-lg">
            {snippet.language}
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="text-right">
            <div className="text-xs text-zinc-400 uppercase tracking-wider font-medium mb-1">Time Left</div>
            <div className={`text-3xl font-mono font-bold transition-all duration-300 ${timeLeft <= 10 ? 'text-red-400 animate-pulse' :
            timeLeft <= 20 ? 'text-yellow-400' : 'text-green-400'}`}>
              {timeLeft}s
            </div>
          </div>
          <div className="w-14 h-14 relative">
            <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 36 36">
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#52525b" strokeWidth="2"/>
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke={timeLeft <= 10 ? '#f87171' : timeLeft <= 20 ? '#fbbf24' : '#10b981'} strokeWidth="2" strokeDasharray={`${(timeLeft / testDuration) * 100}, 100`} className="transition-all duration-1000 ease-linear drop-shadow-lg"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Premium Code Display */}
      <div ref={containerRef} className={`relative font-mono text-sm md:text-lg leading-relaxed whitespace-pre-wrap outline-none bg-gradient-to-br from-zinc-900/50 via-black/50 to-zinc-900/50 p-4 md:p-8 rounded-xl border transition-all duration-300 min-h-[250px] md:min-h-[350px] backdrop-blur-sm ${isStarted ? 'focus:border-white/50 cursor-text border-zinc-600/50 shadow-inner' : 'cursor-pointer border-zinc-600/50 hover:border-zinc-500/50'}`} tabIndex={0} onBlur={handleBlur} onClick={handleContainerClick} style={{ lineHeight: '1.8' }}>
        {!isStarted && (<div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zinc-900/95 via-black/95 to-zinc-900/95 rounded-xl backdrop-blur-sm">
            <div className="text-center p-8">
              <p className="text-zinc-300 text-xl mb-3 font-medium">Click here or press any key to start typing</p>
              <p className="text-zinc-500 text-base">Make sure to click "Start Test" first</p>
            </div>
          </div>)}
        
        {snippet.code.split('').map((char, index) => {
            const isTyped = index < currentText.length;
            const typedChar = currentText[index];
            const isCorrect = isTyped && typedChar === char;
            const isWrong = isTyped && typedChar !== char;
            const isCursor = index === cursorPosition && isStarted;
            return (<span key={index} className={`relative transition-all duration-150 ${isTyped
                    ? isCorrect
                        ? 'text-green-400 bg-green-400/10 shadow-sm'
                        : isWrong
                            ? 'text-red-400 bg-red-400/20 rounded-sm'
                            : ''
                    : 'text-zinc-500'}`}>
              {isCursor && isCursorVisible && (<span className="absolute w-0.5 -ml-0.5 bg-white animate-pulse shadow-lg shadow-white/50" style={{ height: '1.6em' }} data-cursor/>)}
              {char}
            </span>);
        })}
      </div>

      {/* Premium Progress Bar */}
      <div className="mt-6">
        <div className="flex justify-between text-sm text-zinc-400 mb-2">
          <span className="font-medium">Progress</span>
          <span className="font-mono">{Math.round((currentText.length / snippet.code.length) * 100)}%</span>
        </div>
        <div className="w-full bg-zinc-800/50 rounded-full h-3 overflow-hidden shadow-inner">
          <div className="bg-gradient-to-r from-white to-zinc-200 h-3 rounded-full transition-all duration-500 ease-out shadow-lg" style={{ width: `${Math.min(100, (currentText.length / snippet.code.length) * 100)}%` }}></div>
        </div>
      </div>
    </div>);
}
