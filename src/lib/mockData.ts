import { Song, Playlist, Artist } from '../types';

export const mockSongs: Song[] = [
  {
    id: '1',
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    album: 'A Night at the Opera',
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b273e8b066f70c206551210d902b',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3', // placeholder
    duration: 355,
    genre: 'Rock',
  },
  {
    id: '2',
    title: 'Stairway to Heaven',
    artist: 'Led Zeppelin',
    album: 'Led Zeppelin IV',
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b273c8a11e48c91a982d086afc69',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3', // placeholder
    duration: 482,
    genre: 'Rock',
  },
  {
    id: '3',
    title: 'Hotel California',
    artist: 'Eagles',
    album: 'Hotel California',
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b2734637341b9f9475218929193',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3', // placeholder
    duration: 391,
    genre: 'Rock',
  },
  {
    id: '4',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3', // placeholder
    duration: 200,
    genre: 'Pop',
  },
  {
    id: '5',
    title: 'Shape of You',
    artist: 'Ed Sheeran',
    album: '÷',
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3', // placeholder
    duration: 234,
    genre: 'Pop',
  },
];

export const mockPlaylists: Playlist[] = [
  {
    id: '1',
    name: 'Rock Classics',
    description: 'The greatest rock songs of all time',
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b273e8b066f70c206551210d902b',
    songs: mockSongs.filter(s => s.genre === 'Rock'),
  },
  {
    id: '2',
    name: 'Pop Hits',
    description: 'Latest pop hits',
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36',
    songs: mockSongs.filter(s => s.genre === 'Pop'),
  },
];

export const mockArtists: Artist[] = [
  {
    id: '1',
    name: 'Queen',
    imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb36a7768b15c63b7b8b7d8f6a',
    genres: ['Rock'],
  },
  {
    id: '2',
    name: 'The Weeknd',
    imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb12a2ef08d00dd7451a6dbed6',
    genres: ['Pop', 'R&B'],
  },
];

export const genres = ['Rock', 'Pop', 'Jazz', 'Hip-Hop', 'Electronic'];