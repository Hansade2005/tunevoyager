import { Track, Playlist, fetchTrendingTracks, fetchPlaylists } from '@/lib/jamendo';
import { PlaylistCard } from './PlaylistCard';
import { SongCard } from './SongCard';
import { useEffect, useState } from 'react';

interface HomeProps {
  onPlay: (track: Track) => void;
  currentTrack: Track | null;
  isPlaying: boolean;
  favorites: Track[];
  onToggleFavorite: (track: Track) => void;
  onPlayPlaylist: (playlist: Playlist) => void;
}

export function Home({ onPlay, currentTrack, isPlaying, favorites, onToggleFavorite, onPlayPlaylist }: HomeProps) {
  const [trendingTracks, setTrendingTracks] = useState<Track[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const [tracks, playlistData] = await Promise.all([
        fetchTrendingTracks(),
        fetchPlaylists(),
      ]);
      setTrendingTracks(tracks);
      setPlaylists(playlistData);
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="text-white text-xl">Loading amazing music...</div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">🔥 Trending Now</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {trendingTracks.map((track) => (
            <SongCard
              key={track.id}
              track={track}
              onPlay={onPlay}
              isPlaying={currentTrack?.id === track.id && isPlaying}
              isFavorite={favorites.some((fav) => fav.id === track.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">🎶 Featured Playlists</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {playlists.map((playlist) => (
            <PlaylistCard
              key={playlist.id}
              playlist={playlist}
              onPlayPlaylist={onPlayPlaylist}
            />
          ))}
        </div>
      </section>
    </div>
  );
}