import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, Pause, Download, Heart, HeartOff, ArrowLeft } from 'lucide-react';
import { fetchTrackById } from '@/lib/jamendo';
import { useMusicPlayer } from '@/context/MusicPlayerContext';
import { Loader2 } from 'lucide-react';

const TrackDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [track, setTrack] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    currentTrack,
    isPlaying,
    playTrack,
    togglePlay,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  } = useMusicPlayer();

  useEffect(() => {
    const loadTrack = async () => {
      if (!id) return;
      try {
        const trackData = await fetchTrackById(id);
        if (trackData) {
          setTrack(trackData);
        } else {
          setError('Track not found');
        }
      } catch (err) {
        setError('Failed to load track');
      } finally {
        setLoading(false);
      }
    };

    loadTrack();
  }, [id]);

  const handlePlayClick = () => {
    if (track) {
      if (currentTrack?.id === track.id) {
        togglePlay();
      } else {
        playTrack(track);
      }
    }
  };

  const handleDownloadClick = () => {
    if (track) {
      const link = document.createElement('a');
      link.href = track.audio;
      link.download = `${track.name} - ${track.artist_name}.mp3`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleFavoriteClick = () => {
    if (track) {
      if (isFavorite(track)) {
        removeFromFavorites(track);
      } else {
        addToFavorites(track);
      }
    }
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error || !track) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            {error || 'Track not found'}
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/80"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const isCurrentTrack = currentTrack?.id === track.id;
  const isTrackPlaying = isCurrentTrack && isPlaying;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </button>

        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-lg overflow-hidden shadow-lg">
            <div className="md:flex">
              {/* Album Art */}
              <div className="md:w-1/3">
                <img
                  src={track.image || '/placeholder-album.jpg'}
                  alt={`${track.name} by ${track.artist_name}`}
                  className="w-full h-64 md:h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder-album.jpg';
                  }}
                />
              </div>

              {/* Track Details */}
              <div className="md:w-2/3 p-8">
                <div className="space-y-6">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                      {track.name}
                    </h1>
                    <p className="text-xl text-muted-foreground mb-2">
                      {track.artist_name}
                    </p>
                    {track.album_name && (
                      <p className="text-lg text-muted-foreground">
                        Album: {track.album_name}
                      </p>
                    )}
                  </div>

                  {/* Controls */}
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={handlePlayClick}
                      className="bg-primary hover:bg-primary/80 text-primary-foreground rounded-full p-4 shadow-lg"
                    >
                      {isTrackPlaying ? (
                        <Pause className="h-8 w-8" />
                      ) : (
                        <Play className="h-8 w-8 ml-1" />
                      )}
                    </button>

                    <button
                      onClick={handleFavoriteClick}
                      className="p-3 hover:bg-accent rounded-full transition-colors"
                    >
                      {isFavorite(track) ? (
                        <Heart className="h-6 w-6 fill-red-500 text-red-500" />
                      ) : (
                        <HeartOff className="h-6 w-6" />
                      )}
                    </button>

                    <button
                      onClick={handleDownloadClick}
                      className="p-3 hover:bg-accent rounded-full transition-colors"
                    >
                      <Download className="h-6 w-6" />
                    </button>
                  </div>

                  {/* Track Info */}
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="text-foreground">{formatTime(track.duration)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Track ID:</span>
                      <span className="text-foreground font-mono">{track.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Audio URL:</span>
                      <a
                        href={track.audio}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Open Audio
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackDetail;