import React from 'react';
import SongCard from './SongCard';
import { Track } from '@/lib/jamendo';

interface SearchResultsProps {
  tracks: Track[];
  onPlayTrack: (track: Track) => void;
  onFavoriteTrack: (track: Track) => void;
  favorites: Track[];
  loading: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  tracks,
  onPlayTrack,
  onFavoriteTrack,
  favorites,
  loading,
}) => {
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p>Searching for your music...</p>
        </div>
      </div>
    );
  }

  if (tracks.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl mb-4">No tracks found</p>
          <p className="text-gray-400">Try searching for something else!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-purple-400">🔍 Search Results</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {tracks.map((track) => (
            <SongCard
              key={track.id}
              track={track}
              onPlay={onPlayTrack}
              onFavorite={onFavoriteTrack}
              isFavorited={favorites.some(fav => fav.id === track.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;