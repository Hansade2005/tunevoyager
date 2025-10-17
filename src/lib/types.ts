export interface Track {
  id: string;
  name: string;
  duration: number;
  artist_name: string;
  album_name: string;
  audio: string;
  image: string;
  position?: number;
}

export interface Playlist {
  id: string;
  name: string;
  user_name: string;
  creation_date: string;
  duration: number;
  nb_tracks: number;
  image: string;
  description?: string;
  tracks?: Track[];
}