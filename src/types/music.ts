export interface Track {
  id: string;
  name: string;
  artist_name: string;
  album_name?: string;
  duration: number;
  audio: string;
  image?: string;
  position?: number;
}

export interface Playlist {
  id: string;
  name: string;
  description?: string;
  tracks: Track[];
  image?: string;
}

export interface JamendoTrack {
  id: string;
  name: string;
  artist_name: string;
  album_name?: string;
  duration: number;
  audio: string;
  image?: string;
  position?: number;
}

export interface JamendoPlaylist {
  id: string;
  name: string;
  description?: string;
  tracks?: JamendoTrack[];
  image?: string;
}