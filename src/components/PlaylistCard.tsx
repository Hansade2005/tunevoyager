import React from 'react';
import { Play, Music } from 'lucide-react';
import { useMusicPlayer } from '@/context/MusicPlayerContext';
import { Playlist, Track } from '@/lib/jamendo';
import { cn } from '@/lib/utils';

interface PlaylistCardProps {
  playlist: Playlist & { firstTrack?: Track };
  className?: string;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist, className }) => {
  const { playTrack } = useMusicPlayer();

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (playlist.firstTrack) {
      playTrack(playlist.firstTrack);
    }
  };

  return (
    <div
      className={cn(
        'group relative bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer',
        'border border-border hover:border-primary/20',
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500">
        {playlist.image ? (
          <img
            src={playlist.image}
            alt={playlist.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Music className="h-16 w-16 text-white/70" />
          </div>
        )}

        {/* Play Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={handlePlayClick}
            disabled={!playlist.firstTrack}
            className="bg-primary hover:bg-primary/80 disabled:bg-muted disabled:cursor-not-allowed text-primary-foreground rounded-full p-3 shadow-lg transform transition-transform duration-200 hover:scale-110 disabled:hover:scale-100"
          >
            <Play className="h-6 w-6 ml-1" />
          </button>
        </div>
      </div>

      {/* Playlist Info */}
      <div className="p-4">
        <h3 className="font-semibold text-foreground truncate mb-1" title={playlist.name}>
          {playlist.name}
        </h3>
        <p className="text-sm text-muted-foreground truncate mb-2" title={playlist.user_name}>
          by {playlist.user_name}
        </p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Playlist</span>
          {playlist.firstTrack && (
            <span className="text-primary">
              {Math.floor(playlist.firstTrack.duration / 60)}:
              {(playlist.firstTrack.duration % 60).toString().padStart(2, '0')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaylistCard;