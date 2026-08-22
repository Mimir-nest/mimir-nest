import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Music2, Link, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Slider } from '@/components/ui/slider';
const YouTubePlayer = ({ className }) => {
    const [url, setUrl] = useState('');
    const [videoId, setVideoId] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [playerReady, setPlayerReady] = useState(false);
    const [showUrlInput, setShowUrlInput] = useState(false);
    const [volume, setVolume] = useState(100);
    const [videoTitle, setVideoTitle] = useState('');
    const playerRef = useRef(null);
    // Load YouTube API
    useEffect(() => {
        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
            window.onYouTubeIframeAPIReady = () => {
                setPlayerReady(true);
            };
        }
        else {
            setPlayerReady(true);
        }
        return () => {
            if (playerRef.current) {
                playerRef.current.destroy();
            }
        };
    }, []);
    // Initialize or update player when videoId changes
    useEffect(() => {
        if (!playerReady || !videoId)
            return;
        if (playerRef.current) {
            playerRef.current.loadVideoById(videoId);
            playerRef.current.pauseVideo();
            setIsPlaying(false);
        }
        else {
            const newPlayer = new window.YT.Player('youtube-player', {
                height: '0',
                width: '0',
                videoId: videoId,
                playerVars: {
                    autoplay: 0,
                    controls: 0,
                    disablekb: 1,
                    fs: 0,
                    modestbranding: 1,
                    showinfo: 0,
                    rel: 0,
                },
                events: {
                    onReady: (event) => {
                        playerRef.current = event.target;
                        event.target.pauseVideo();
                        // Get video title
                        setVideoTitle(event.target.getVideoData().title);
                    },
                    onStateChange: (event) => {
                        if (event.data === window.YT.PlayerState.ENDED) {
                            setIsPlaying(false);
                        }
                    },
                    onError: () => {
                        toast.error("Error playing this video");
                        setVideoId(null);
                        setUrl('');
                        setVideoTitle('');
                    }
                }
            });
        }
    }, [playerReady, videoId]);
    const extractVideoId = (url) => {
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[7].length === 11) ? match[7] : null;
    };
    const handleUrlChange = (e) => {
        setUrl(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const id = extractVideoId(url);
        if (id) {
            setVideoId(id);
            setShowUrlInput(false);
            toast.success("YouTube audio loaded");
        }
        else {
            toast.error("Invalid YouTube URL");
        }
    };
    const togglePlay = () => {
        if (!playerRef.current)
            return;
        if (isPlaying) {
            playerRef.current.pauseVideo();
        }
        else {
            playerRef.current.playVideo();
        }
        setIsPlaying(!isPlaying);
    };
    const toggleMute = () => {
        if (!playerRef.current)
            return;
        if (isMuted) {
            playerRef.current.unMute();
            playerRef.current.setVolume(volume);
        }
        else {
            playerRef.current.mute();
        }
        setIsMuted(!isMuted);
    };
    const handleVolumeChange = (value) => {
        if (!playerRef.current)
            return;
        const newVolume = value[0];
        setVolume(newVolume);
        playerRef.current.setVolume(newVolume);
        if (newVolume === 0) {
            setIsMuted(true);
            playerRef.current.mute();
        }
        else if (isMuted) {
            setIsMuted(false);
            playerRef.current.unMute();
        }
    };
    const skipForward = () => {
        if (!playerRef.current)
            return;
        const currentTime = playerRef.current.getCurrentTime();
        playerRef.current.seekTo(currentTime + 10, true);
    };
    const skipBackward = () => {
        if (!playerRef.current)
            return;
        const currentTime = playerRef.current.getCurrentTime();
        playerRef.current.seekTo(Math.max(0, currentTime - 10), true);
    };
    const clearVideo = () => {
        if (playerRef.current) {
            playerRef.current.stopVideo();
        }
        setVideoId(null);
        setUrl('');
        setVideoTitle('');
        setIsPlaying(false);
    };
    return (<div className={`rounded-xl overflow-hidden bg-dark-900/80 backdrop-blur-md border border-dark-800 ${className}`}>
      <div className="p-4 border-b border-dark-800">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Music2 className="h-5 w-5 text-blue-500"/>
            <h3 className="text-white text-lg font-medium">Background Music</h3>
          </div>
          {!videoId && (<Button variant="ghost" size="sm" className="text-gray-400 hover:text-white" onClick={() => setShowUrlInput(true)}>
              <Link className="h-4 w-4 mr-2"/>
              Add Music
            </Button>)}
        </div>
        
        {showUrlInput && (<form onSubmit={handleSubmit} className="flex gap-2">
            <Input value={url} onChange={handleUrlChange} placeholder="Paste YouTube URL..." className="bg-dark-800 border-dark-700 flex-1" autoFocus/>
            <Button type="submit" variant="secondary" className="shrink-0">
              Load
            </Button>
            <Button type="button" variant="ghost" size="icon" onClick={() => setShowUrlInput(false)} className="text-gray-400 hover:text-white">
              <X className="h-4 w-4"/>
            </Button>
          </form>)}
      </div>
      
      {videoId && (<div className="p-4 space-y-4">
          {/* Video Title */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400 truncate flex-1">{videoTitle}</p>
            <Button variant="ghost" size="icon" onClick={clearVideo} className="text-gray-400 hover:text-white ml-2">
              <X className="h-4 w-4"/>
            </Button>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="icon" onClick={skipBackward} className="text-gray-400 hover:text-white">
                <SkipBack className="h-5 w-5"/>
              </Button>
              
              <Button variant="ghost" size="icon" onClick={togglePlay} className={`${isPlaying ? "text-blue-500 hover:text-blue-400" : "text-gray-400 hover:text-white"} transition-colors`}>
                {isPlaying ? <Pause className="h-6 w-6"/> : <Play className="h-6 w-6"/>}
              </Button>
              
              <Button variant="ghost" size="icon" onClick={skipForward} className="text-gray-400 hover:text-white">
                <SkipForward className="h-5 w-5"/>
              </Button>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-24">
                <Slider value={[volume]} min={0} max={100} step={1} onValueChange={handleVolumeChange} className="cursor-pointer"/>
              </div>
              <Button variant="ghost" size="icon" onClick={toggleMute} className={`${isMuted ? "text-red-500 hover:text-red-400" : "text-gray-400 hover:text-white"} transition-colors`}>
                {isMuted ? <VolumeX className="h-5 w-5"/> : <Volume2 className="h-5 w-5"/>}
              </Button>
            </div>
          </div>
        </div>)}
      
      <div id="youtube-player" className="hidden"></div>
    </div>);
};
export default YouTubePlayer;
