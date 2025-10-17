import { Track, searchTracks } from '@/lib/jamendo';
import { SongCard } from './SongCard';
import { useEffect, useState } from 'react';

interface SearchProps {
  query: string;
  onPlay: (track: Track) => void;
  currentTrack: Track | null;
  isPlaying: boolean;
  favorites: Track[];
  onToggleFavorite: (track: Track) => void;
}

export function Search({ query, onPlay, currentTrack, isPlaying, favorites, onToggleFavorite }: SearchProps) {
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      const performSearch = async () => {
        setLoading(true);
        const results = await searchTracks(query);
        setSearchResults(results);
        setLoading(false);
      };
      performSearch();
    } else {
      setSearchResults([]);
    }
  }, [query]);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-white mb-4">🔍 Search Results for "{query}"</h2>
      {loading ? (
        <div className="text-center text-white text-xl">Searching...</div>
      ) : searchResults.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {searchResults.map((track) => (
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
      ) : query ? (
        <div className="text-center text-gray-400">No results found for "{query}"</div>
      ) : (
        <div className="text-center text-gray-400">Enter a search query to find music</div>
      )}
    </div>
  );
}