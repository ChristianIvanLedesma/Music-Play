import { ReactNode, useEffect, useState } from 'react';
import '../akon/akon.css';
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

type AvatarChildrenProps = {
  children: ReactNode;
  img?: string;
  genero: string;
  onClick: () => void; 
};

function AvatarChildren({ children, img, genero, onClick }: AvatarChildrenProps) {
  return (
    <div className='total'>
      <div className="imagen" onClick={onClick}>
        {img && <img src={img} alt={`Cover of ${genero}`} className="card-image" />}
      </div>
      <div className='contenido'>{children}</div>
    </div>
  );
}

function Avatar() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [currentSong, setCurrentSong] = useState<string>(''); 
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null); 

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch('https://api.audioboom.com/audio_clips');
        if (!response.ok) {
          throw new Error('Error en la carga de datos');
        }
        const data = await response.json() as ApiResponse;
        const audioClips: Song[] = data.body.audio_clips.map(clip => ({
          id: clip.id,
          title: clip.title,
          description: clip.description,
          audio_url: clip.urls.high_mp3,
          channel: clip.channel,
          user: clip.user,
        }));
        setSongs(audioClips);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Hubo un problema al cargar las canciones');
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
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
    if (audioElement) {
      audioElement.pause(); 
    }

    const newAudioElement = new Audio(audioUrl);
    setAudioElement(newAudioElement);
    newAudioElement.play().catch(err => {
      console.error('No se pudo reproducir el audio:', err);
    });

    setCurrentSong(audioUrl); 
  };

  if (loading) {
    return <p>Cargando canciones...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const displayedSongs = songs.slice(currentPage * SONGS_PER_PAGE, (currentPage + 1) * SONGS_PER_PAGE).slice(0, 5);

  return (
    <>
      <FotoInicio title="Akon">
        <p></p>
      </FotoInicio>

      <div className="avatar1">
        <Boton onNext={handleNext} onPrev={handlePrev} />
        {displayedSongs.map(song => (
          <AvatarChildren
            key={song.id}
            genero={song.user.urls.profile}
            img={song.user.urls.profile_image.original || 'public/image/ROMANTICOS.jpg'}
            onClick={() => handlePlay(song.audio_url)}
          >
            <p className="song-title">{song.title}</p>
            <p className="artist-name">De {song.user.urls.profile}</p>
            <p className="album-name"></p>
          </AvatarChildren>
        ))}
      </div>

      <PlaybackBar 
        playlist={displayedSongs.map(song => ({
          audioUrl: song.audio_url,
          songTitle: song.title,
          artist: song.user.urls.profile,
          imageUrl: song.user.urls.profile_image.original || 'public/image/ROMANTICOS.jpg'
        }))}
        currentSong={currentSong || ''} 
      />
    </>
  );
}

export default Avatar;
