import React, { useState } from 'react';
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
  Info,
} from 'lucide-react';
import { useMusicPlayer } from '@/context/MusicPlayerContext';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

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

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

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
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 p-4 z-50">
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
              <h4 className="font-medium text-white truncate">{currentTrack.name}</h4>
              <p className="text-sm text-gray-300 truncate">{currentTrack.artist_name}</p>
              {currentTrack.album_name && (
                <p className="text-xs text-gray-400 truncate">{currentTrack.album_name}</p>
              )}
            </div>
            <div className="flex items-center space-x-1">
              <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                <DialogTrigger asChild>
                  <button
                    className="p-1 hover:bg-gray-700 rounded-full transition-colors text-gray-300"
                    title="Track Details"
                  >
                    <Info className="h-4 w-4" />
                  </button>
                </DialogTrigger>
                <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-white">Track Details</DialogTitle>
                    <DialogDescription className="text-gray-300">
                      Information about the current playing track
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={currentTrack.image || '/placeholder-album.jpg'}
                        alt={currentTrack.name}
                        className="w-20 h-20 rounded-lg object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder-album.jpg';
                        }}
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-white">{currentTrack.name}</h3>
                        <p className="text-gray-300">{currentTrack.artist_name}</p>
                        {currentTrack.album_name && (
                          <p className="text-gray-400 text-sm">{currentTrack.album_name}</p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Duration:</span>
                        <span className="text-white">{formatTime(duration)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Track ID:</span>
                        <span className="text-white font-mono text-xs">{currentTrack.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Audio URL:</span>
                        <a
                          href={currentTrack.audio}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-400 hover:text-green-300 underline text-xs truncate max-w-32"
                        >
                          Open Audio
                        </a>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <button
                onClick={handleFavorite}
                className="p-1 hover:bg-gray-700 rounded-full transition-colors"
              >
                {isFavorite(currentTrack) ? (
                  <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                ) : (
                  <HeartOff className="h-4 w-4 text-gray-300" />
                )}
              </button>
            </div>
          </div>

          {/* Player Controls */}
          <div className="flex flex-col items-center space-y-2 flex-1 max-w-md">
            {/* Control Buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={previousTrack}
                className="p-2 hover:bg-gray-700 rounded-full transition-colors text-white"
              >
                <SkipBack className="h-5 w-5" />
              </button>
              <button
                onClick={togglePlay}
                className="p-3 bg-green-600 hover:bg-green-500 text-white rounded-full transition-colors"
              >
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
              </button>
              <button
                onClick={nextTrack}
                className="p-2 hover:bg-gray-700 rounded-full transition-colors text-white"
              >
                <SkipForward className="h-5 w-5" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="flex items-center space-x-2 w-full">
              <span className="text-xs text-gray-400 w-10 text-right">
                {formatTime(currentTime)}
              </span>
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className={cn(
                  'flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer',
                  'accent-green-500 hover:accent-green-400'
                )}
                style={{
                  background: `linear-gradient(to right, #22c55e 0%, #22c55e ${progress}%, #374151 ${progress}%, #374151 100%)`,
                }}
              />
              <span className="text-xs text-gray-400 w-10">
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
                  'p-1 hover:bg-gray-700 rounded-full transition-colors text-white',
                  isShuffle && 'text-green-400 bg-gray-700'
                )}
                title="Shuffle"
              >
                <Shuffle className="h-4 w-4" />
              </button>
              <button
                onClick={toggleRepeat}
                className={cn(
                  'p-1 hover:bg-gray-700 rounded-full transition-colors text-white',
                  isRepeat && 'text-green-400 bg-gray-700'
                )}
                title="Repeat"
              >
                <Repeat className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={toggleMute}
              className="p-1 hover:bg-gray-700 rounded-full transition-colors text-white"
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
                'w-20 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer',
                'accent-green-500 hover:accent-green-400'
              )}
              style={{
                background: `linear-gradient(to right, #22c55e 0%, #22c55e ${volume * 100}%, #374151 ${volume * 100}%, #374151 100%)`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;