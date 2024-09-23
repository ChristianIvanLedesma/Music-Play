import { useEffect, useState } from 'react';
import Card from './tarjetas';
import './quick.css';
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

const SONGS_PER_PAGE = 8;

function QuickPicks() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [currentSong, setCurrentSong] = useState<string | null>(null); 

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
      <FotoInicio title="Quick Picks">
        <p></p>
      </FotoInicio>
      <div className="quick-picks">
        <Boton onNext={handleNext} onPrev={handlePrev} />
        {displayedSongs.map(song => (
          <Card
            key={song.id}
            artist={song.user.urls.profile}
            title={song.title}
            img={song.user.urls.profile_image.original || 'public/image/ROMANTICOS.jpg'}
            onClick={() => handlePlay(song.audio_url)} 
          >
            <div>
              <p>{song.title}</p>
            </div>
          </Card>
        ))}
      </div>
      <PlaybackBar 
        playlist={displayedSongs.map(song => ({
          audioUrl: song.audio_url,
          songTitle: song.title,
          artist: song.user.urls.profile,
        }))}
        currentSong={currentSong}
      />
    </>
  );
}

export default QuickPicks;
