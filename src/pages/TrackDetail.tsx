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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Hero Section */}
      <div className="relative">
        {/* Background Image Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url(${track.image || '/placeholder-album.jpg'})`,
            filter: 'blur(20px)',
          }}
        />

        <div className="relative z-10 container mx-auto px-4 py-12">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-white/70 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back</span>
          </button>

          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
            {/* Large Album Art */}
            <div className="flex-shrink-0">
              <img
                src={track.image || '/placeholder-album.jpg'}
                alt={`${track.name} by ${track.artist_name}`}
                className="w-80 h-80 lg:w-96 lg:h-96 object-cover rounded-2xl shadow-2xl border-4 border-white/10"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder-album.jpg';
                }}
              />
            </div>

            {/* Track Information */}
            <div className="flex-1 text-center lg:text-left max-w-2xl">
              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                    {track.name}
                  </h1>
                  <p className="text-xl lg:text-2xl text-white/80 mb-2 font-medium">
                    {track.artist_name}
                  </p>
                  {track.album_name && (
                    <p className="text-lg text-white/60">
                      {track.album_name}
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-center lg:justify-start space-x-6 mt-8">
                  <button
                    onClick={handlePlayClick}
                    className="bg-green-500 hover:bg-green-400 text-black font-bold rounded-full px-8 py-4 shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center space-x-3"
                  >
                    {isTrackPlaying ? (
                      <>
                        <Pause className="h-6 w-6" />
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <Play className="h-6 w-6 ml-1" />
                        <span>Play</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleFavoriteClick}
                    className="p-4 hover:bg-white/10 rounded-full transition-all duration-200 group"
                  >
                    {isFavorite(track) ? (
                      <Heart className="h-8 w-8 fill-red-500 text-red-500 group-hover:scale-110 transition-transform" />
                    ) : (
                      <HeartOff className="h-8 w-8 text-white/70 group-hover:text-white group-hover:scale-110 transition-all" />
                    )}
                  </button>

                  <button
                    onClick={handleDownloadClick}
                    className="p-4 hover:bg-white/10 rounded-full transition-all duration-200 group"
                  >
                    <Download className="h-8 w-8 text-white/70 group-hover:text-white group-hover:scale-110 transition-all" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Track Details Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-8">Track Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-white/70 font-medium">Duration</span>
                  <span className="text-white font-mono">{formatTime(track.duration)}</span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-white/70 font-medium">Track ID</span>
                  <span className="text-white font-mono text-sm">{track.id}</span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-white/70 font-medium">Artist</span>
                  <span className="text-white">{track.artist_name}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-white/70 font-medium">Album</span>
                  <span className="text-white">{track.album_name || 'N/A'}</span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-white/70 font-medium">Audio URL</span>
                  <a
                    href={track.audio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 hover:text-green-300 underline transition-colors"
                  >
                    Open Audio
                  </a>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-white/70 font-medium">Status</span>
                  <span className="text-green-400 font-medium">Available</span>
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