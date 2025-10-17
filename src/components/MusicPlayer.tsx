import React from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Heart,
  HeartOff,
  Repeat,
  Shuffle,
} from 'lucide-react';
import { useMusicPlayer } from '@/context/MusicPlayerContext';
import { cn } from '@/lib/utils';

const MusicPlayer: React.FC = () => {
  const {
    currentTrack,
    isPlaying,
    volume,
    currentTime,
    duration,
    isShuffle,
    isRepeat,
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
  } = useMusicPlayer();

  if (!currentTrack) return null;

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    seekTo(time);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const toggleMute = () => {
    setVolume(volume === 0 ? 0.7 : 0);
  };

  const handleFavorite = () => {
    if (isFavorite(currentTrack)) {
      removeFromFavorites(currentTrack);
    } else {
      addToFavorites(currentTrack);
    }
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 z-50">
      <div className="container mx-auto">
        <div className="flex items-center space-x-4">
          {/* Track Info */}
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            <img
              src={currentTrack.image || '/placeholder-album.jpg'}
              alt={currentTrack.name}
              className="w-12 h-12 rounded-md object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder-album.jpg';
              }}
            />
            <div className="min-w-0 flex-1">
              <h4 className="font-medium text-foreground truncate">{currentTrack.name}</h4>
              <p className="text-sm text-muted-foreground truncate">{currentTrack.artist_name}</p>
            </div>
            <button
              onClick={handleFavorite}
              className="p-1 hover:bg-accent rounded-full transition-colors"
            >
              {isFavorite(currentTrack) ? (
                <Heart className="h-4 w-4 fill-red-500 text-red-500" />
              ) : (
                <HeartOff className="h-4 w-4" />
              )}
            </button>
          </div>

          {/* Player Controls */}
          <div className="flex flex-col items-center space-y-2 flex-1 max-w-md">
            {/* Control Buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={previousTrack}
                className="p-2 hover:bg-accent rounded-full transition-colors"
              >
                <SkipBack className="h-5 w-5" />
              </button>
              <button
                onClick={togglePlay}
                className="p-3 bg-primary hover:bg-primary/80 text-primary-foreground rounded-full transition-colors"
              >
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
              </button>
              <button
                onClick={nextTrack}
                className="p-2 hover:bg-accent rounded-full transition-colors"
              >
                <SkipForward className="h-5 w-5" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="flex items-center space-x-2 w-full">
              <span className="text-xs text-muted-foreground w-10 text-right">
                {formatTime(currentTime)}
              </span>
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className={cn(
                  'flex-1 h-1 bg-muted rounded-lg appearance-none cursor-pointer',
                  'accent-primary hover:accent-primary/80'
                )}
                style={{
                  background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${progress}%, hsl(var(--muted)) ${progress}%, hsl(var(--muted)) 100%)`,
                }}
              />
              <span className="text-xs text-muted-foreground w-10">
                {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Volume Control & Options */}
          <div className="flex items-center space-x-2 min-w-0 flex-1 justify-end">
            <div className="flex items-center space-x-1">
              <button
                onClick={toggleShuffle}
                className={cn(
                  'p-1 hover:bg-accent rounded-full transition-colors',
                  isShuffle && 'text-primary bg-accent'
                )}
                title="Shuffle"
              >
                <Shuffle className="h-4 w-4" />
              </button>
              <button
                onClick={toggleRepeat}
                className={cn(
                  'p-1 hover:bg-accent rounded-full transition-colors',
                  isRepeat && 'text-primary bg-accent'
                )}
                title="Repeat"
              >
                <Repeat className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={toggleMute}
              className="p-1 hover:bg-accent rounded-full transition-colors"
            >
              {volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className={cn(
                'w-20 h-1 bg-muted rounded-lg appearance-none cursor-pointer',
                'accent-primary hover:accent-primary/80'
              )}
              style={{
                background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${volume * 100}%, hsl(var(--muted)) ${volume * 100}%, hsl(var(--muted)) 100%)`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;