import { JAMENDO_CLIENT_ID, JAMENDO_API_URL, generateImageUrl } from '@/lib/utils';
import { Track, Playlist, JamendoTrack, JamendoPlaylist } from '@/types/music';

class JamendoApiService {
  private async fetchFromJamendo(endpoint: string, params: Record<string, string> = {}) {
    const url = new URL(`${JAMENDO_API_URL}${endpoint}`);
    url.searchParams.set('client_id', JAMENDO_CLIENT_ID);
    url.searchParams.set('format', 'json');

    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });

    try {
      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error(`Jamendo API error: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Jamendo API fetch error:', error);
      return null;
    }
  }

  async getTrendingTracks(limit: number = 20): Promise<Track[]> {
    const data = await this.fetchFromJamendo('/tracks', {
      order: 'popularity_total',
      limit: limit.toString(),
      include: 'musicinfo'
    });

    if (!data?.results) return [];

    return data.results.map((track: any): Track => ({
      id: track.id.toString(),
      name: track.name || 'Unknown Track',
      artist_name: track.artist_name || 'Unknown Artist',
      album_name: track.album_name,
      duration: track.duration || 0,
      audio: track.audio || '',
      image: track.image || generateImageUrl(`Album cover for "${track.name}" by ${track.artist_name}, music artwork, professional design`, track.id),
      position: track.position
    }));
  }

  async getPlaylists(limit: number = 10): Promise<Playlist[]> {
    const data = await this.fetchFromJamendo('/playlists', {
      order: 'popularity_total',
      limit: limit.toString(),
      include: 'tracks'
    });

    if (!data?.results) return [];

    return data.results.map((playlist: any): Playlist => ({
      id: playlist.id.toString(),
      name: playlist.name || 'Unknown Playlist',
      description: playlist.description,
      image: playlist.image || generateImageUrl(`Playlist cover for "${playlist.name}", music collection artwork, professional design`, playlist.id),
      tracks: playlist.tracks?.map((track: any) => ({
        id: track.id.toString(),
        name: track.name || 'Unknown Track',
        artist_name: track.artist_name || 'Unknown Artist',
        album_name: track.album_name,
        duration: track.duration || 0,
        audio: track.audio || '',
        image: track.image || generateImageUrl(`Album cover for "${track.name}" by ${track.artist_name}, music artwork, professional design`, track.id),
      })) || []
    }));
  }

  async searchTracks(query: string, limit: number = 20): Promise<Track[]> {
    if (!query.trim()) return [];

    const data = await this.fetchFromJamendo('/tracks', {
      search: query,
      limit: limit.toString(),
      include: 'musicinfo'
    });

    if (!data?.results) return [];

    return data.results.map((track: any): Track => ({
      id: track.id.toString(),
      name: track.name || 'Unknown Track',
      artist_name: track.artist_name || 'Unknown Artist',
      album_name: track.album_name,
      duration: track.duration || 0,
      audio: track.audio || '',
      image: track.image || generateImageUrl(`Album cover for "${track.name}" by ${track.artist_name}, music artwork, professional design`, track.id),
      position: track.position
    }));
  }
}

export const jamendoApi = new JamendoApiService();