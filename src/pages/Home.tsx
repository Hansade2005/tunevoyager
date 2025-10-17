import React, { useEffect, useState, useCallback } from 'react';
import SongCard from '@/components/SongCard';
import PlaylistCard from '@/components/PlaylistCard';
import { fetchTrendingTracks, fetchPlaylists, fetchPlaylistTracks } from '@/lib/jamendo';
import { useMusicPlayer } from '@/context/MusicPlayerContext';
import { Loader2 } from 'lucide-react';

const Home: React.FC = () => {
  const [trendingTracks, setTrendingTracks] = useState<any[]>([]);
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [loadingTracks, setLoadingTracks] = useState(true);
  const [loadingPlaylists, setLoadingPlaylists] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const { playTrack } = useMusicPlayer();

  const loadTrendingTracks = useCallback(async (reset = false) => {
    try {
      const currentOffset = reset ? 0 : offset;
      const tracks = await fetchTrendingTracks(20, currentOffset);
      if (tracks.length === 0) {
        setHasMore(false);
        return;
      }
      setTrendingTracks(prev => reset ? tracks : [...prev, ...tracks]);
      setOffset(currentOffset + 20);
    } catch (error) {
      console.error('Error loading trending tracks:', error);
    }
  }, [offset]);

  const loadPlaylists = useCallback(async () => {
    try {
      const playlistData = await fetchPlaylists(10);
      const playlistsWithTracks = await Promise.all(
        playlistData.map(async (playlist: any) => {
          try {
            const tracks = await fetchPlaylistTracks(playlist.id, 1);
            return { ...playlist, firstTrack: tracks[0] };
          } catch {
            return playlist;
          }
        })
      );
      setPlaylists(playlistsWithTracks);
    } catch (error) {
      console.error('Error loading playlists:', error);
    } finally {
      setLoadingPlaylists(false);
    }
  }, []);

  useEffect(() => {
    loadPlaylists();
    loadTrendingTracks(true).finally(() => setLoadingTracks(false));
  }, []);

  const observer = React.useRef<IntersectionObserver>();
  const lastTrackRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loadingMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setLoadingMore(true);
          loadTrendingTracks().finally(() => setLoadingMore(false));
        }
      });
      if (node) observer.current.observe(node);
    },
    [loadingMore, hasMore, loadTrendingTracks]
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Featured Playlists */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Featured Playlists</h2>
          {loadingPlaylists ? (
            <div className="flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {playlists.map((playlist) => (
                <PlaylistCard key={playlist.id} playlist={playlist} />
              ))}
            </div>
          )}
        </section>

        {/* Trending Tracks */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-foreground">Trending Tracks</h2>
          {loadingTracks ? (
            <div className="flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {trendingTracks.map((track, index) => (
                <div
                  key={track.id}
                  ref={index === trendingTracks.length - 1 ? lastTrackRef : null}
                >
                  <SongCard track={track} />
                </div>
              ))}
            </div>
          )}
          {loadingMore && (
            <div className="flex justify-center mt-8">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Home;