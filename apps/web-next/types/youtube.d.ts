
declare namespace YT {
  interface Player {
    loadVideoById: (videoId: string) => void;
    pauseVideo: () => void;
    playVideo: () => void;
    mute: () => void;
    unMute: () => void;
    isMuted: () => boolean;
    setVolume: (volume: number) => void;
    getVolume: () => number;
    getCurrentTime: () => number;
    seekTo: (seconds: number, allowSeekAhead: boolean) => void;
    getVideoData: () => { title: string };
    stopVideo: () => void;
    destroy: () => void;
  }

  interface PlayerEvent {
    target: Player;
    data: number;
  }

  interface PlayerOptions {
    height?: string | number;
    width?: string | number;
    videoId?: string;
    playerVars?: {
      autoplay?: number;
      controls?: number;
      disablekb?: number;
      fs?: number;
      modestbranding?: number;
      showinfo?: number;
      rel?: number;
    };
    events?: {
      onReady?: (event: PlayerEvent) => void;
      onStateChange?: (event: PlayerEvent) => void;
      onError?: (event: any) => void;
    };
  }

  enum PlayerState {
    ENDED = 0,
    PLAYING = 1,
    PAUSED = 2,
    BUFFERING = 3,
    CUED = 5
  }

  interface PlayerConstructor {
    new (elementId: string, options: PlayerOptions): Player;
  }
}

interface Window {
  YT: {
    Player: YT.PlayerConstructor;
    PlayerState: YT.PlayerState;
  };
  onYouTubeIframeAPIReady: () => void;
}
