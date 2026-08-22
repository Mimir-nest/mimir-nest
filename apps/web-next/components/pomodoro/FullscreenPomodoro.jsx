import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Play, Pause, RotateCcw, Music, Volume2, VolumeX } from 'lucide-react';
import { Input } from '@/components/ui/input';
const FullscreenPomodoro = ({ isOpen, onClose, timeLeft, isActive, mode, onToggleTimer, onResetTimer, calculateProgress, formatTime, youtubeVideoId, isYoutubePlaying = false, isYoutubeMuted = false, youtubeVolume = 100, onLoadYoutubeVideo, onToggleYoutubePlay, onToggleYoutubeMute, onYoutubeVolumeChange }) => {
    const [showMusicControl, setShowMusicControl] = useState(false);
    const [musicUrl, setMusicUrl] = useState('');
    const [isFullscreenMode, setIsFullscreenMode] = useState(false);
    // Enter/exit fullscreen when component opens/closes
    useEffect(() => {
        if (isOpen) {
            enterFullscreen();
        }
        else {
            exitFullscreen();
        }
        // Cleanup on component unmount
        return () => {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            }
        };
    }, [isOpen]);
    // Listen for fullscreen changes
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreenMode(!!document.fullscreenElement);
            // If user exits fullscreen manually, close the component
            if (!document.fullscreenElement && isOpen) {
                onClose();
            }
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, [isOpen, onClose]);
    const enterFullscreen = async () => {
        try {
            if (document.documentElement.requestFullscreen) {
                await document.documentElement.requestFullscreen();
            }
        }
        catch (error) {
            console.log('Could not enter fullscreen mode:', error);
        }
    };
    const exitFullscreen = async () => {
        try {
            if (document.fullscreenElement && document.exitFullscreen) {
                await document.exitFullscreen();
            }
        }
        catch (error) {
            console.log('Could not exit fullscreen mode:', error);
        }
    };
    const handleClose = () => {
        exitFullscreen();
        onClose();
    };
    // Handle Escape key to exit fullscreen
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape' && isOpen) {
                handleClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen]);
    if (!isOpen)
        return null;
    const getModeTitle = () => {
        switch (mode) {
            case 'pomodoro':
                return 'Focus Session';
            case 'shortBreak':
                return 'Short Break';
            case 'longBreak':
                return 'Long Break';
        }
    };
    const handleLoadMusic = (e) => {
        e.preventDefault();
        if (musicUrl.trim()) {
            onLoadYoutubeVideo(musicUrl);
            setMusicUrl('');
            setShowMusicControl(false);
        }
    };
    return (<div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Close button */}
      <Button variant="ghost" size="icon" className="absolute top-4 right-4 text-white hover:bg-zinc-800/50 rounded-xl z-10" onClick={handleClose}>
        <X className="h-6 w-6"/>
      </Button>

      {/* Minimalist Music Control */}
      <div className="absolute top-4 left-4 z-10">
        {!showMusicControl ? (<div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-white hover:bg-zinc-800/50 rounded-xl" onClick={() => setShowMusicControl(true)}>
              <Music className="h-5 w-5"/>
            </Button>
            {youtubeVideoId && (<>
                <Button variant="ghost" size="icon" className="text-white hover:bg-zinc-800/50 rounded-xl" onClick={onToggleYoutubePlay}>
                  {isYoutubePlaying ? <Pause className="h-4 w-4"/> : <Play className="h-4 w-4"/>}
                </Button>
                <Button variant="ghost" size="icon" className="text-white hover:bg-zinc-800/50 rounded-xl" onClick={onToggleYoutubeMute}>
                  {isYoutubeMuted ? <VolumeX className="h-4 w-4"/> : <Volume2 className="h-4 w-4"/>}
                </Button>
                <div className="flex items-center gap-2">
                  <input type="range" min="0" max="100" value={youtubeVolume} onChange={(e) => onYoutubeVolumeChange(Number(e.target.value))} className="w-16 h-1 bg-zinc-700 rounded-lg appearance-none" style={{
                    background: `linear-gradient(to right, #FF5A36 0%, #FF5A36 ${youtubeVolume}%, #4a5568 ${youtubeVolume}%, #4a5568 100%)`
                }}/>
                </div>
              </>)}
          </div>) : (<form onSubmit={handleLoadMusic} className="flex items-center gap-2 bg-zinc-900/80 backdrop-blur-sm rounded-xl p-3">
            <Input value={musicUrl} onChange={(e) => setMusicUrl(e.target.value)} placeholder="YouTube URL..." className="w-64 bg-zinc-800 border-zinc-700 text-white text-sm" autoFocus/>
            <Button type="submit" size="sm" variant="secondary">
              Load
            </Button>
            <Button type="button" size="sm" variant="ghost" onClick={() => setShowMusicControl(false)} className="text-white hover:bg-zinc-800/50">
              <X className="h-4 w-4"/>
            </Button>
          </form>)}
      </div>

      {/* Fullscreen Timer */}
      <div className="flex flex-col items-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">{getModeTitle()}</h2>
        
        {/* Circular Progress Timer */}
        <div className="relative mb-12">
          <div className="w-80 h-80 md:w-96 md:h-96 lg:w-[32rem] lg:h-[32rem] rounded-full relative">
            {/* Background circle */}
            <div className="absolute inset-0 rounded-full border-8 border-zinc-800/30"></div>
            
            {/* Progress circle */}
            <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="8" fill="none" className="text-zinc-800/30"/>
              <circle cx="50" cy="50" r="45" stroke="url(#gradient)" strokeWidth="8" fill="none" strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 45}`} strokeDashoffset={`${2 * Math.PI * 45 * (1 - calculateProgress() / 100)}`} className="transition-all duration-1000 ease-out"/>
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={mode === 'pomodoro' ? '#FF5A36' : mode === 'shortBreak' ? '#D6D2C9' : '#5D5B56'}/>
                  <stop offset="100%" stopColor={mode === 'pomodoro' ? '#FF6A3D' : mode === 'shortBreak' ? '#9B9992' : '#242525'}/>
                </linearGradient>
              </defs>
            </svg>
            
            {/* Time display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-4 font-mono tracking-tight">
                {formatTime(timeLeft)}
              </div>
              <div className="text-xl text-zinc-400 font-medium">
                {isActive ? 'Active' : 'Paused'}
              </div>
            </div>
          </div>
        </div>
        
        {/* Controls */}
        <div className="flex gap-6">
          <Button size="lg" className={`${isActive
            ? 'bg-primary text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/20'
            : 'bg-zinc-800 text-white hover:bg-zinc-700'} px-12 py-6 text-xl font-semibold rounded-xl transition-all duration-300 hover:scale-105 border-none`} onClick={onToggleTimer}>
            {isActive ? <Pause className="mr-4 h-8 w-8"/> : <Play className="mr-4 h-8 w-8"/>}
            {isActive ? 'Pause' : 'Start'}
          </Button>
          <Button size="lg" variant="outline" className="border-2 border-zinc-700 bg-zinc-850 text-zinc-300 hover:text-white hover:border-zinc-650 hover:bg-zinc-700/80 px-10 py-6 text-xl font-semibold rounded-xl transition-all duration-300 hover:scale-105" onClick={onResetTimer}>
            <RotateCcw className="mr-4 h-8 w-8"/>
            Reset
          </Button>
        </div>
      </div>

      {/* Custom styles for range input */}
      <style>
        {`
          input[type="range"]::-webkit-slider-thumb {
            appearance: none;
            height: 12px;
            width: 12px;
            border-radius: 50%;
            background: #ffffff;
            cursor: pointer;
            border: none;
          }
          input[type="range"]::-moz-range-thumb {
            height: 12px;
            width: 12px;
            border-radius: 50%;
            background: #ffffff;
            cursor: pointer;
            border: none;
          }
        `}
      </style>
    </div>);
};
export default FullscreenPomodoro;
