import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SongCard from '@/components/SongCard';
import { searchTracks } from '@/lib/jamendo';
import { Loader2, Search as SearchIcon } from 'lucide-react';

const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [tracks, setTracks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (query) {
      performSearch(query);
    } else {
      setTracks([]);
    }
  }, [query]);

  const performSearch = async (searchQuery: string) => {
    setLoading(true);
    setError(null);
    try {
      const results = await searchTracks(searchQuery, 50);
      setTracks(results);
    } catch (err) {
      setError('Failed to search tracks. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            Search Results
          </h1>
          {query && (
            <p className="text-lg text-muted-foreground">
              Showing results for "{query}"
            </p>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin mr-2" />
            <span className="text-lg">Searching...</span>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <SearchIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg text-muted-foreground">{error}</p>
          </div>
        ) : tracks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tracks.map((track) => (
              <SongCard key={track.id} track={track} />
            ))}
          </div>
        ) : query ? (
          <div className="text-center py-12">
            <SearchIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg text-muted-foreground">
              No tracks found for "{query}"
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Try different keywords or check your spelling
            </p>
          </div>
        ) : (
          <div className="text-center py-12">
            <SearchIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg text-muted-foreground">
              Enter a search term to find music
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;