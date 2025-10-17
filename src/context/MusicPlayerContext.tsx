import React, { createContext, useContext, useState, useRef, useEffect, useCallback, ReactNode } from 'react';
import { Track } from '@/lib/jamendo';

interface MusicPlayerContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  playlist: Track[];
  currentIndex: number;
  isShuffle: boolean;
  isRepeat: boolean;
  playTrack: (track: Track, playlist?: Track[]) => void;
  togglePlay: () => void;
  setVolume: (volume: number) => void;
  seekTo: (time: number) => void;
  nextTrack: () => void;
  previousTrack: () => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  addToFavorites: (track: Track) => void;
  removeFromFavorites: (track: Track) => void;
  isFavorite: (track: Track) => boolean;
}

const MusicPlayerContext = createContext<MusicPlayerContextType | undefined>(undefined);

export const useMusicPlayer = () => {
  const context = useContext(MusicPlayerContext);
  if (!context) {
    throw new Error('useMusicPlayer must be used within a MusicPlayerProvider');
  }
  return context;
};

interface MusicPlayerProviderProps {
  children: ReactNode;
}

export const MusicPlayerProvider: React.FC<MusicPlayerProviderProps> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.7);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [favorites, setFavorites] = useState<Track[]>([]);

  const audioRef = useRef<HTMLAudioElement>(null);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem('music-favorites');
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites));
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('music-favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => {
      if (isRepeat && currentTrack) {
        // Restart current track
        audio.currentTime = 0;
        audio.play().catch(console.error);
      } else {
        nextTrack();
      }
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [isRepeat, currentTrack]);

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const playTrack = (track: Track, trackPlaylist: Track[] = []) => {
    setCurrentTrack(track);
    setPlaylist(trackPlaylist);
    setCurrentIndex(trackPlaylist.findIndex(t => t.id === track.id) || 0);
    setIsPlaying(true);

    if (audioRef.current) {
      audioRef.current.src = track.audio;
      audioRef.current.play().catch(console.error);
    }
  };

  const togglePlay = () => {
    if (!currentTrack) return;

    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume);
  };

  const seekTo = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const nextTrack = () => {
    if (playlist.length === 0) return;

    let nextIndex;
    if (isShuffle) {
      // Random track, but not the current one
      do {
        nextIndex = Math.floor(Math.random() * playlist.length);
      } while (nextIndex === currentIndex && playlist.length > 1);
    } else {
      nextIndex = (currentIndex + 1) % playlist.length;
    }
    setCurrentIndex(nextIndex);
    playTrack(playlist[nextIndex], playlist);
  };

  const previousTrack = () => {
    if (playlist.length === 0) return;

    let prevIndex;
    if (isShuffle) {
      // In shuffle mode, previous just goes to a random track
      do {
        prevIndex = Math.floor(Math.random() * playlist.length);
      } while (prevIndex === currentIndex && playlist.length > 1);
    } else {
      prevIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1;
    }
    setCurrentIndex(prevIndex);
    playTrack(playlist[prevIndex], playlist);
  };

  const addToFavorites = (track: Track) => {
    setFavorites(prev => {
      if (prev.some(t => t.id === track.id)) return prev;
      return [...prev, track];
    });
  };

  const removeFromFavorites = (track: Track) => {
    setFavorites(prev => prev.filter(t => t.id !== track.id));
  };

  const isFavorite = (track: Track) => {
    return favorites.some(t => t.id === track.id);
  };

  const toggleShuffle = () => {
    setIsShuffle(!isShuffle);
  };

  const toggleRepeat = () => {
    setIsRepeat(!isRepeat);
  };

  const value: MusicPlayerContextType = {
    currentTrack,
    isPlaying,
    volume,
    currentTime,
    duration,
    playlist,
    currentIndex,
    isShuffle,
    isRepeat,
    playTrack,
    togglePlay,
    setVolume,
    seekTo,
    nextTrack,
    previousTrack,
    toggleShuffle,
    toggleRepeat,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  return (
    <MusicPlayerContext.Provider value={value}>
      {children}
      <audio ref={audioRef} />
    </MusicPlayerContext.Provider>
  );
};