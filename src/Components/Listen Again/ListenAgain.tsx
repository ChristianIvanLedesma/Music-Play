

import { useEffect, useState } from 'react';
import { usePlayback } from '../hooks/veite'; 
import Card from './SongCard';
import './card.css';
import Boton from '../botones/boton';
import FotoInicio from '../avatar/avatar';
import PlaybackBar from '../PlaybackBar/play';

interface Channel {
  title: string;
}

interface User {
  id: number;
  urls: {
    profile: string;
    profile_image: {
      original: string;
    };
  };
}

interface Song {
  id: number;
  title: string;
  description: string;
  audio_url: string;
  channel: Channel;
  user: User;
}

interface ApiResponse {
  body: {
    audio_clips: Array<{
      id: number;
      title: string;
      description: string;
      urls: {
        high_mp3: string;
      };
      channel: Channel;
      user: User;
    }>;
  };
}

interface FavoritosProps {
  setPlaylist: React.Dispatch<React.SetStateAction<{ audioUrl: string; songTitle: string; artist: string; imageUrl: string; }[]>>;
  setCurrentSong: React.Dispatch<React.SetStateAction<string>>;
}

const SONGS_PER_PAGE = 6;

const Lista: React.FC<FavoritosProps> = ({ setPlaylist, setCurrentSong }) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const { currentSong } = usePlayback(); 

  useEffect(() => {
    fetch('https://api.audioboom.com/audio_clips')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la carga de datos');
        }
        return response.json() as Promise<ApiResponse>;
      })
      .then(data => {
        const audioClips: Song[] = data.body.audio_clips.map(clip => ({
          id: clip.id,
          title: clip.title,
          description: clip.description,
          audio_url: clip.urls.high_mp3,
          channel: clip.channel,
          user: clip.user,
        }));
        setSongs(audioClips);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        setError('Hubo un problema al cargar las canciones');
        setLoading(false);
      });
  }, []);

  const handleNext = () => {
    if ((currentPage + 1) * SONGS_PER_PAGE < songs.length) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const handlePlay = (audioUrl: string) => {
    setCurrentSong(audioUrl);
    setPlaylist(songs.map(song => ({
      audioUrl: song.audio_url,
      songTitle: song.title,
      artist: song.user.urls.profile,
      imageUrl: song.user.urls.profile_image.original || 'public/image/default.jpg', 
    })));
  };

  if (loading) {
    return <p>Cargando canciones...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const displayedSongs = songs.slice(currentPage * SONGS_PER_PAGE, (currentPage + 1) * SONGS_PER_PAGE);

  return (
    <>
      <FotoInicio title="Listen-Again">
        <p></p>
      </FotoInicio>
      <div className="favorito-principal">
        <Boton onNext={handleNext} onPrev={handlePrev} />
        {displayedSongs.map(song => (
          <Card
            key={song.id}
            artist={song.user.urls.profile} 
            title={song.title} 
            img={song.user.urls.profile_image.original || 'public/image/ROMANTICOS.jpg'}
            onClick={() => handlePlay(song.audio_url)} 
          />
        ))}
      </div>
      <PlaybackBar
        playlist={songs.map(song => ({
          audioUrl: song.audio_url,
          songTitle: song.title,
          artist: song.user.urls.profile,
          imageUrl: song.user.urls.profile_image.original || 'public/image/default.jpg', 
        }))}
        currentSong={currentSong || ''} 
      />
    </>
  );
};

export default Lista;
