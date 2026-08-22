"use client";

import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Play, Pause, RotateCcw, Settings, Maximize2, BarChart3, Sparkles } from 'lucide-react';
import PomodoroSettings from '@/components/pomodoro/PomodoroSettings';
import YouTubePlayer from '@/components/pomodoro/YouTubePlayer';
import PomodoroStats from '@/components/pomodoro/PomodoroStats';
import FullscreenPomodoro from '@/components/pomodoro/FullscreenPomodoro';
const Pomodoro = () => {
    // Timer durations (customizable now)
    const [pomodoroTime, setPomodoroTime] = useState(25 * 60);
    const [shortBreakTime, setShortBreakTime] = useState(5 * 60);
    const [longBreakTime, setLongBreakTime] = useState(15 * 60);
    // State variables
    const [timeLeft, setTimeLeft] = useState(pomodoroTime);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState('pomodoro');
    const [completedPomodoros, setCompletedPomodoros] = useState(0);
    const [completedBreaks, setCompletedBreaks] = useState(0);
    const [showSettings, setShowSettings] = useState(false);
    const [totalFocusTime, setTotalFocusTime] = useState(0);
    const [todayPomodoros, setTodayPomodoros] = useState(0);
    const [longestStreak, setLongestStreak] = useState(0);
    const [currentStreak, setCurrentStreak] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    // YouTube player state for fullscreen
    const [youtubeVideoId, setYoutubeVideoId] = useState(null);
    const [isYoutubePlaying, setIsYoutubePlaying] = useState(false);
    const [isYoutubeMuted, setIsYoutubeMuted] = useState(false);
    const [youtubeVolume, setYoutubeVolume] = useState(100);
    const youtubePlayerRef = useRef(null);
    // Load stats from localStorage
    useEffect(() => {
        const savedStats = localStorage.getItem('pomodoroStats');
        if (savedStats) {
            const stats = JSON.parse(savedStats);
            setCompletedPomodoros(stats.completedPomodoros || 0);
            setCompletedBreaks(stats.completedBreaks || 0);
            setTotalFocusTime(stats.totalFocusTime || 0);
            const lastActiveDate = localStorage.getItem('lastActiveDate');
            const today = new Date().toDateString();
            if (lastActiveDate !== today) {
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                if (lastActiveDate === yesterday.toDateString()) {
                    setCurrentStreak(stats.currentStreak || 0);
                }
                else {
                    setCurrentStreak(0);
                }
                setTodayPomodoros(0);
            }
            else {
                setCurrentStreak(stats.currentStreak || 0);
                setTodayPomodoros(stats.todayPomodoros || 0);
            }
            setLongestStreak(stats.longestStreak || 0);
        }
        const savedSettings = localStorage.getItem('pomodoroSettings');
        if (savedSettings) {
            const settings = JSON.parse(savedSettings);
            setPomodoroTime(settings.pomodoroTime || 25 * 60);
            setShortBreakTime(settings.shortBreakTime || 5 * 60);
            setLongBreakTime(settings.longBreakTime || 15 * 60);
            if (!isActive) {
                setTimeLeft(settings.pomodoroTime || 25 * 60);
            }
        }
        localStorage.setItem('lastActiveDate', new Date().toDateString());
    }, []);
    // Save stats to localStorage
    useEffect(() => {
        const stats = { completedPomodoros, completedBreaks, totalFocusTime, todayPomodoros, longestStreak, currentStreak };
        localStorage.setItem('pomodoroStats', JSON.stringify(stats));
        localStorage.setItem('lastActiveDate', new Date().toDateString());
    }, [completedPomodoros, completedBreaks, totalFocusTime, todayPomodoros, longestStreak, currentStreak]);
    // Save timer settings
    useEffect(() => {
        const settings = { pomodoroTime, shortBreakTime, longBreakTime };
        localStorage.setItem('pomodoroSettings', JSON.stringify(settings));
    }, [pomodoroTime, shortBreakTime, longBreakTime]);
    // YouTube player functions
    const extractVideoId = (url) => {
        const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };
    const handleLoadYoutubeVideo = (url) => {
        const id = extractVideoId(url);
        if (id)
            setYoutubeVideoId(id);
    };
    const handleToggleYoutubePlay = () => {
        if (youtubePlayerRef.current) {
            if (isYoutubePlaying) {
                youtubePlayerRef.current.pauseVideo();
            }
            else {
                youtubePlayerRef.current.playVideo();
            }
            setIsYoutubePlaying(!isYoutubePlaying);
        }
    };
    const handleToggleYoutubeMute = () => {
        if (youtubePlayerRef.current) {
            if (isYoutubeMuted) {
                youtubePlayerRef.current.unMute();
                youtubePlayerRef.current.setVolume(youtubeVolume);
            }
            else {
                youtubePlayerRef.current.mute();
            }
            setIsYoutubeMuted(!isYoutubeMuted);
        }
    };
    const handleYoutubeVolumeChange = (volume) => {
        if (youtubePlayerRef.current) {
            setYoutubeVolume(volume);
            youtubePlayerRef.current.setVolume(volume);
            if (volume === 0) {
                setIsYoutubeMuted(true);
                youtubePlayerRef.current.mute();
            }
            else if (isYoutubeMuted) {
                setIsYoutubeMuted(false);
                youtubePlayerRef.current.unMute();
            }
        }
    };
    // Format time as MM:SS
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };
    // Toggle timer active state
    const toggleTimer = () => {
        setIsActive(!isActive);
        if (!isActive) {
            toast("Timer started", {
                description: `${mode.charAt(0).toUpperCase() + mode.slice(1)} timer is running`,
                action: { label: "Dismiss", onClick: () => console.log("Dismissed toast") },
            });
        }
        else {
            toast("Timer paused", {
                description: `${mode.charAt(0).toUpperCase() + mode.slice(1)} timer is paused`,
                action: { label: "Dismiss", onClick: () => console.log("Dismissed toast") },
            });
        }
    };
    // Reset timer
    const resetTimer = () => {
        setIsActive(false);
        switch (mode) {
            case 'pomodoro':
                setTimeLeft(pomodoroTime);
                break;
            case 'shortBreak':
                setTimeLeft(shortBreakTime);
                break;
            case 'longBreak':
                setTimeLeft(longBreakTime);
                break;
        }
        toast("Timer reset", {
            description: `${mode.charAt(0).toUpperCase() + mode.slice(1)} timer has been reset`,
            action: { label: "Dismiss", onClick: () => console.log("Dismissed toast") },
        });
    };
    // Change timer mode
    const changeMode = (newMode) => {
        setIsActive(false);
        setMode(newMode);
        switch (newMode) {
            case 'pomodoro':
                setTimeLeft(pomodoroTime);
                break;
            case 'shortBreak':
                setTimeLeft(shortBreakTime);
                break;
            case 'longBreak':
                setTimeLeft(longBreakTime);
                break;
        }
        toast(`${newMode.charAt(0).toUpperCase() + newMode.slice(1)} mode activated`, {
            description: "Timer has been reset for the new mode",
        });
    };
    // Update timer settings
    const updateTimerSettings = (pomodoro, shortBreak, longBreak) => {
        setPomodoroTime(pomodoro);
        setShortBreakTime(shortBreak);
        setLongBreakTime(longBreak);
        if (mode === 'pomodoro')
            setTimeLeft(pomodoro);
        else if (mode === 'shortBreak')
            setTimeLeft(shortBreak);
        else if (mode === 'longBreak')
            setTimeLeft(longBreak);
        toast("Settings updated", { description: "Your timer settings have been updated" });
    };
    // Timer effect
    useEffect(() => {
        let interval;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if (prevTime <= 1) {
                        clearInterval(interval);
                        return 0;
                    }
                    return prevTime - 1;
                });
                if (mode === 'pomodoro')
                    setTotalFocusTime(prev => prev + 1);
            }, 1000);
        }
        else if (timeLeft === 0) {
            setIsActive(false);
            const audio = new Audio('/notification.mp3');
            audio.play().catch(() => console.log('Audio playback failed'));
            if (mode === 'pomodoro') {
                const newCompletedPomodoros = completedPomodoros + 1;
                setCompletedPomodoros(newCompletedPomodoros);
                setTodayPomodoros(prev => prev + 1);
                const newStreak = currentStreak + 1;
                setCurrentStreak(newStreak);
                if (newStreak > longestStreak)
                    setLongestStreak(newStreak);
                toast("Pomodoro completed!", { description: "Time for a break!" });
                if (newCompletedPomodoros % 4 === 0)
                    changeMode('longBreak');
                else
                    changeMode('shortBreak');
            }
            else {
                setCompletedBreaks(prev => prev + 1);
                toast("Break completed!", { description: "Ready to get back to work?" });
                changeMode('pomodoro');
            }
        }
        return () => { if (interval)
            clearInterval(interval); };
    }, [isActive, timeLeft, mode, completedPomodoros]);
    // Calculate progress
    const calculateProgress = () => {
        let totalTime;
        switch (mode) {
            case 'pomodoro':
                totalTime = pomodoroTime;
                break;
            case 'shortBreak':
                totalTime = shortBreakTime;
                break;
            case 'longBreak':
                totalTime = longBreakTime;
                break;
            default: totalTime = pomodoroTime;
        }
        if (totalTime === 0)
            return 0;
        return Math.min(Math.max(((totalTime - timeLeft) / totalTime) * 100, 0), 100);
    };
    const getModeTitle = () => {
        switch (mode) {
            case 'pomodoro': return 'Focus Session';
            case 'shortBreak': return 'Short Break';
            case 'longBreak': return 'Long Break';
        }
    };
    const getModeSubtitle = () => {
        switch (mode) {
            case 'pomodoro': return 'Time to focus and get things done';
            case 'shortBreak': return 'Take a quick break and recharge';
            case 'longBreak': return 'Enjoy a well-deserved longer break';
        }
    };
    // Progress ring accent color per mode
    const ringColor = mode === 'pomodoro' ? '#466552' : mode === 'shortBreak' ? '#72937d' : '#accfb7';
    return (<div className="min-h-screen bg-mn-primary text-on-primary relative overflow-hidden">
      {/* Decorative rings */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full border border-surface-tint/10 translate-x-1/3 -translate-y-1/3 pointer-events-none"/>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full border border-surface-tint/15 translate-x-1/4 -translate-y-1/4 pointer-events-none"/>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full border border-primary-container/30 -translate-x-1/2 translate-y-1/2 pointer-events-none"/>
      <div className="absolute bottom-40 right-20 w-[200px] h-[200px] rounded-full border border-surface-tint/10 pointer-events-none"/>

      <Navbar />

      <main className="relative z-10 px-6 md:px-16 pt-32 md:pt-40 pb-20">
        <div className="max-w-4xl mx-auto">

          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-6 w-fit mx-auto">
              <Sparkles className="w-4 h-4 text-surface-tint"/>
              <span className="font-label-caps text-label-caps text-surface-tint tracking-widest">
                Productivity Hub
              </span>
            </div>
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-primary mb-4 leading-tight">
              Deep Focus <span className="text-surface-tint">Sanctuary</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-primary/70 max-w-lg mx-auto">
              Cultivate undisturbed attention in a serene digital environment.
            </p>
          </div>

          {/* ── Main Timer Card ── */}
          <div className="bg-surface-container-lowest rounded-[32px] shadow-[0_24px_64px_rgba(0,0,0,0.35)] mb-6 overflow-hidden">

            {/* Tab bar + controls */}
            <div className="flex items-center justify-between px-6 md:px-8 pt-5 pb-4 border-b border-outline-variant/20">
              <div className="flex bg-surface-container rounded-full p-1 gap-1">
                {['pomodoro', 'shortBreak', 'longBreak'].map((m) => (<button key={m} onClick={() => changeMode(m)} className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 font-body-md ${mode === m
                ? 'bg-mn-primary text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:text-mn-primary hover:bg-surface-container-high'}`}>
                    {m === 'pomodoro' ? 'Focus' : m === 'shortBreak' ? 'Short Break' : 'Long Break'}
                  </button>))}
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" onClick={() => setIsFullscreen(true)} className="text-on-surface-variant hover:text-mn-primary hover:bg-surface-container rounded-xl">
                  <Maximize2 className="h-5 w-5"/>
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setShowSettings(true)} className="text-on-surface-variant hover:text-mn-primary hover:bg-surface-container rounded-xl">
                  <Settings className="h-5 w-5"/>
                </Button>
              </div>
            </div>

            {/* Timer display */}
            <div className="px-8 md:px-20 py-10 md:py-14 flex flex-col items-center">
              <span className="font-label-caps text-label-caps text-on-surface-variant tracking-widest mb-8 uppercase">
                {getModeTitle()}
              </span>

              {/* Clock with progress ring */}
              <div className="relative w-52 h-52 md:w-60 md:h-60 mb-6">
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="46" stroke="#e7f1e5" strokeWidth="2" fill="none"/>
                  <circle cx="50" cy="50" r="46" stroke={ringColor} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 46}`} strokeDashoffset={`${2 * Math.PI * 46 * (1 - calculateProgress() / 100)}`} style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.5s ease' }}/>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="tabular-nums tracking-tighter text-mn-primary font-bold leading-none" style={{ fontSize: 'clamp(2.8rem, 9vw, 4rem)', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {formatTime(timeLeft)}
                  </span>
                  <span className={`mt-2 text-xs font-label-caps tracking-widest uppercase px-3 py-1 rounded-full ${isActive ? 'bg-surface-container text-surface-tint' : 'bg-surface-container-low text-on-surface-variant'}`}>
                    {isActive ? 'IN PROGRESS' : 'PAUSED'}
                  </span>
                </div>
              </div>

              {/* Italic quote */}
              <p className="font-body-md text-body-md text-on-surface-variant italic text-center mb-8 max-w-xs">
                "{getModeSubtitle()}"
              </p>

              {/* Controls */}
              <div className="flex items-center gap-4">
                <button onClick={toggleTimer} className={`flex items-center gap-2.5 px-8 py-3 rounded-full font-label-caps text-label-caps tracking-widest transition-all duration-300 hover:scale-105 shadow-sm ${isActive
            ? 'bg-surface-container text-mn-primary border border-outline-variant'
            : 'bg-mn-primary text-on-primary hover:opacity-90'}`}>
                  {isActive
            ? <><Pause className="h-4 w-4 fill-current"/> Pause</>
            : <><Play className="h-4 w-4 fill-current"/> Start</>}
                </button>
                <button onClick={resetTimer} className="flex items-center gap-2 px-6 py-3 rounded-full font-label-caps text-label-caps tracking-widest border border-outline-variant text-on-surface-variant hover:bg-surface-container hover:text-mn-primary transition-all duration-300">
                  <RotateCcw className="h-4 w-4"/> Reset
                </button>
              </div>
            </div>
          </div>

          {/* ── Bottom two-column cards ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Daily Progress */}
            <div className="bg-surface-container-lowest rounded-[32px] p-8 shadow-[0_12px_40px_rgba(0,0,0,0.25)]">
              <div className="flex items-center gap-2 mb-6">
                <BarChart3 className="h-5 w-5 text-surface-tint"/>
                <h3 className="font-headline-md text-headline-md text-mn-primary">Daily Progress</h3>
              </div>
              <PomodoroStats completedPomodoros={completedPomodoros} completedBreaks={completedBreaks} totalFocusTime={totalFocusTime} todayPomodoros={todayPomodoros} longestStreak={longestStreak}/>
            </div>

            {/* Focus Soundscapes */}
            <div className="bg-surface-container-lowest rounded-[32px] p-8 shadow-[0_12px_40px_rgba(0,0,0,0.25)] overflow-hidden relative">
              <div className="absolute top-0 right-0 w-24 h-24 rounded-bl-[80px] bg-surface-container pointer-events-none"/>
              <div className="relative z-10 mb-5">
                <h3 className="font-headline-md text-headline-md text-mn-primary mb-1">Focus Soundscapes</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">Curated ambient music for deep work.</p>
              </div>
              <div className="rounded-2xl overflow-hidden border border-outline-variant/30 bg-surface-container">
                <YouTubePlayer />
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Fullscreen Pomodoro */}
      <FullscreenPomodoro isOpen={isFullscreen} onClose={() => setIsFullscreen(false)} timeLeft={timeLeft} isActive={isActive} mode={mode} onToggleTimer={toggleTimer} onResetTimer={resetTimer} calculateProgress={calculateProgress} formatTime={formatTime} youtubeVideoId={youtubeVideoId} isYoutubePlaying={isYoutubePlaying} isYoutubeMuted={isYoutubeMuted} youtubeVolume={youtubeVolume} onLoadYoutubeVideo={handleLoadYoutubeVideo} onToggleYoutubePlay={handleToggleYoutubePlay} onToggleYoutubeMute={handleToggleYoutubeMute} onYoutubeVolumeChange={handleYoutubeVolumeChange}/>

      {/* Settings Sheet/Drawer */}
      <PomodoroSettings open={showSettings} onOpenChange={setShowSettings} pomodoroTime={pomodoroTime} shortBreakTime={shortBreakTime} longBreakTime={longBreakTime} onSave={updateTimerSettings}/>

      {/* Hidden YouTube for fullscreen */}
      {youtubeVideoId && (<div className="hidden">
          <div id="fullscreen-youtube-player"></div>
        </div>)}

      <Footer />
    </div>);
};
export default Pomodoro;
