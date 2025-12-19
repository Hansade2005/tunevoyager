const JAMENDO_CLIENT_ID = '3efca530'; // Replace with your actual client ID

export interface Track {
  id: string;
  name: string;
  artist_name: string;
  album_name: string;
  duration: number;
  audio: string;
  image: string;
  waveform?: string;
}

export interface Playlist {
  id: string;
  name: string;
  description?: string;
  creation_date: string;
  user_name: string;
  zip: string;
  shareurl: string;
  image?: string;
}

const generateThumbnail = async (prompt: string): Promise<string> => {
  try {
    const response = await fetch('https://a0.dev/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: `Music album cover for "${prompt}". Professional, high quality, artistic`,
        width: 400,
        height: 400,
      }),
    });
    const data = await response.json();
    return data.image || '';
  } catch (error) {
    console.error('Error generating thumbnail:', error);
    return '';
  }
};

const fetchWithFallbackImage = async (url: string, trackName: string): Promise<any[]> => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const results = data.results || [];

    // Add fallback images for tracks without images
    const enhancedResults = await Promise.all(
      results.map(async (item: any) => {
        if (!item.image) {
          const generatedImage = await generateThumbnail(
            `${item.name || item.track_name} by ${item.artist_name || item.user_name}`
          );
          return { ...item, image: generatedImage };
        }
        return item;
      })
    );

    return enhancedResults;
  } catch (error) {
    console.error('Error fetching from Jamendo:', error);
    return [];
  }
};

export const fetchTrendingTracks = async (limit: number = 20, offset: number = 0): Promise<Track[]> => {
  const url = `https://api.jamendo.com/v3.0/tracks/?client_id=${JAMENDO_CLIENT_ID}&format=json&limit=${limit}&offset=${offset}&order=popularity_total&include=stats`;
  return fetchWithFallbackImage(url, 'trending tracks');
};

export const fetchPlaylists = async (limit: number = 10): Promise<Playlist[]> => {
  const url = `https://api.jamendo.com/v3.0/playlists/?client_id=${JAMENDO_CLIENT_ID}&format=json&limit=${limit}&order=creationdate_desc&include=stats`;
  return fetchWithFallbackImage(url, 'playlists');
};

export const fetchPlaylistTracks = async (playlistId: string, limit: number = 1): Promise<Track[]> => {
  const url = `https://api.jamendo.com/v3.0/playlists/tracks/?client_id=${JAMENDO_CLIENT_ID}&format=json&id=${playlistId}&limit=${limit}`;
  const data = await fetchWithFallbackImage(url, 'playlist tracks');
  return data.map((item: any) => item.track || item);
};

export const searchTracks = async (query: string, limit: number = 50): Promise<Track[]> => {
  const url = `https://api.jamendo.com/v3.0/tracks/?client_id=${JAMENDO_CLIENT_ID}&format=json&limit=${limit}&namesearch=${encodeURIComponent(query)}&include=stats`;
  return fetchWithFallbackImage(url, query);
};

export const fetchTrackById = async (id: string): Promise<Track | null> => {
  const url = `https://api.jamendo.com/v3.0/tracks/?client_id=${JAMENDO_CLIENT_ID}&format=json&id=${id}`;
  const data = await fetchWithFallbackImage(url, 'track');
  return data.length > 0 ? data[0] : null;
};