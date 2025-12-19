import React from 'react';
import { Play, Pause, Heart, HeartOff, Download, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMusicPlayer } from '@/context/MusicPlayerContext';
import { Track } from '@/lib/jamendo';
import { cn } from '@/lib/utils';

interface SongCardProps {
  track: Track;
  className?: string;
}

const SongCard: React.FC<SongCardProps> = ({ track, className }) => {
  const navigate = useNavigate();
  const {
    currentTrack,
    isPlaying,
    playTrack,
    togglePlay,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  } = useMusicPlayer();

  const isCurrentTrack = currentTrack?.id === track.id;
  const isTrackPlaying = isCurrentTrack && isPlaying;

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCurrentTrack) {
      togglePlay();
    } else {
      playTrack(track);
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite(track)) {
      removeFromFavorites(track);
    } else {
      addToFavorites(track);
    }
  };

  const handleDownloadClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const link = document.createElement('a';
    link.href = track.audio;
    link.download = `${track.name} - ${track.artist_name}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewDetailsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/track/${track.id}`);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div
      className={cn(
        'group relative bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer',
        'border border-border hover:border-primary/20',
        className
      )}
      onClick={() => playTrack(track)}
    >
      {/* Image */}
      <div className=\"relative aspect-square overflow-hidden\">
        <img
          src={track.image || '/placeholder-album.jpg'}
          alt={`${track.name} by ${track.artist_name}`}
          className=\"w-full h-full object-cover transition-transform duration-300 group-hover:scale-105\"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder-album.jpg';
          }}
        />

        {/* Play/Pause Overlay */}
        <div className=\"absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center\">
          <button
            onClick={handlePlayClick}
            className=\"bg-primary hover:bg-primary/80 text-primary-foreground rounded-full p-3 shadow-lg transform transition-transform duration-200 hover:scale-110\"
          >
            {isTrackPlaying ? (
              <Pause className=\"h-6 w-6\" />
            ) : (
              <Play className=\"h-6 w-6 ml-1\" />
            )}
          </button>
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className=\"absolute top-2 right-2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200\"
        >
          {isFavorite(track) ? (
            <Heart className=\"h-4 w-4 fill-red-500 text-red-500\" />
          ) : (
            <HeartOff className=\"h-4 w-4\" />
          )}
        </button>
      </div>

      {/* Track Info */}
      <div className=\"p-4\">
        <h3 className=\"font-semibold text-foreground truncate mb-1\" title={track.name}>
          {track.name}
        </h3>
        <p className=\"text-sm text-muted-foreground truncate mb-2\" title={track.artist_name}>
          {track.artist_name}
        </p>
        <div className=\"flex items-center justify-between text-xs text-muted-foreground\">
          <span>{formatDuration(track.duration)}</span>
          <div className=\"flex items-center space-x-1\">
            <button
              onClick={handleViewDetailsClick}
              className=\"p-1 hover:bg-accent rounded transition-colors opacity-0 group-hover:opacity-100\"
              title=\"View track details\"
            >
              <Eye className=\"h-3 w-3\" />
            </button>
            <button
              onClick={handleDownloadClick}
              className=\"p-1 hover:bg-accent rounded transition-colors opacity-0 group-hover:opacity-100\"
              title=\"Download track\"
            >
              <Download className=\"h-3 w-3\" />
            </button>
            {track.album_name && (
              <span className=\"truncate ml-2\" title={track.album_name}>
                {track.album_name}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongCard;