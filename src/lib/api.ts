const JAMENDO_CLIENT_ID = 'your-jamendo-client-id'; // Replace with actual client ID

export interface Track {
  id: string;
  name: string;
  artist_name: string;
  album_name: string;
  duration: number;
  audio: string;
  image: string;
}

export interface Playlist {
  id: string;
  name: string;
  creation_date: string;
  user_name: string;
  tracks: Track[];
}

export const fetchTrendingTracks = async (limit = 20, offset = 0): Promise<Track[]> => {
  try {
    const response = await fetch(
      `https://api.jamendo.com/v3.0/tracks/?client_id=${JAMENDO_CLIENT_ID}&format=json&limit=${limit}&offset=${offset}&order=popularity_total&include=musicinfo`
    );
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error fetching trending tracks:', error);
    return [];
  }
};

export const fetchPlaylists = async (limit = 10): Promise<Playlist[]> => {
  try {
    const response = await fetch(
      `https://api.jamendo.com/v3.0/playlists/?client_id=${JAMENDO_CLIENT_ID}&format=json&limit=${limit}&order=creationdate_desc`
    );
    const data = await response.json();
    const playlists = data.results || [];

    // Fetch tracks for each playlist
    const playlistsWithTracks = await Promise.all(
      playlists.map(async (playlist: any) => {
        try {
          const tracksResponse = await fetch(
            `https://api.jamendo.com/v3.0/playlists/tracks/?client_id=${JAMENDO_CLIENT_ID}&format=json&id=${playlist.id}&limit=5`
          );
          const tracksData = await tracksResponse.json();
          return {
            ...playlist,
            tracks: tracksData.results || [],
          };
        } catch (error) {
          console.error(`Error fetching tracks for playlist ${playlist.id}:`, error);
          return { ...playlist, tracks: [] };
        }
      })
    );

    return playlistsWithTracks;
  } catch (error) {
    console.error('Error fetching playlists:', error);
    return [];
  }
};

export const searchTracks = async (query: string, limit = 20): Promise<Track[]> => {
  try {
    const response = await fetch(
      `https://api.jamendo.com/v3.0/tracks/?client_id=${JAMENDO_CLIENT_ID}&format=json&limit=${limit}&namesearch=${encodeURIComponent(query)}&include=musicinfo`
    );
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error searching tracks:', error);
    return [];
  }
};