import { useEffect, useState, useRef } from 'react';
import { usePlayback } from '../hooks/veite';
import './play.css';

type PlaybackBarProps = {
  playlist: { audioUrl: string; songTitle: string; artist: string; imageUrl: string }[];
  currentSong: string;
};

const PlaybackBar = ({ playlist, currentSong }: PlaybackBarProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { setCurrentSong } = usePlayback();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [remainingTime, setRemainingTime] = useState<string>('0:00');
  const [hoverTime, setHoverTime] = useState<string | null>(null);
  const [isClosed, setIsClosed] = useState<boolean>(false);

  // Actualiza el índice de la canción actual y el estado de isPlaying
  useEffect(() => {
    const songIndex = playlist.findIndex((song) => song.audioUrl === currentSong);
    if (songIndex !== -1) {
      setCurrentSongIndex(songIndex);
      setIsPlaying(true); // Reproduce la canción al cambiar
    } else {
      setIsPlaying(false); // Si la canción no está en la lista, no está reproduciéndose
    }
  }, [currentSong, playlist]);

  // Efecto para manejar la reproducción de audio y el progreso
  useEffect(() => {
    if (playlist.length > 0 && audioRef.current) {
      const audioElement = audioRef.current;
      audioElement.src = playlist[currentSongIndex]?.audioUrl;

      const updateProgress = () => {
        if (audioElement.duration) {
          const percentage = (audioElement.currentTime / audioElement.duration) * 100;
          setProgress(percentage || 0);
          const remaining = audioElement.duration - audioElement.currentTime;
          setRemainingTime(formatTime(remaining));
        }
      };

      const handleError = () => {
        console.error('Error al cargar el audio:', audioElement.src);
        setIsPlaying(false);
      };

      audioElement.addEventListener('timeupdate', updateProgress);
      audioElement.addEventListener('error', handleError);

      // Reproduce la canción automáticamente si está cambiando
      const playAudio = async () => {
        if (currentSongIndex !== -1 && currentSong) {
          await audioElement.play().catch((err) => {
            console.error('No se pudo reproducir el audio:', err);
          });
        }
      };

      playAudio();

      return () => {
        audioElement.removeEventListener('timeupdate', updateProgress);
        audioElement.removeEventListener('error', handleError);
        audioElement.pause();
      };
    }
  }, [playlist, currentSongIndex, currentSong]);

  // Manejo de reproducción/pausa
  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((err) => {
          console.error('No se pudo reproducir el audio:', err);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Manejo de siguiente canción
  const handleNext = () => {
    if (currentSongIndex < playlist.length - 1) {
      const nextSongUrl = playlist[currentSongIndex + 1]?.audioUrl;
      setCurrentSong(nextSongUrl); // Actualiza la canción desde el contexto global
      setCurrentSongIndex(currentSongIndex + 1);
      setIsPlaying(true); // Se reproduce automáticamente
    }
  };

  // Manejo de canción anterior
  const handlePrevious = () => {
    if (currentSongIndex > 0) {
      const previousSongUrl = playlist[currentSongIndex - 1]?.audioUrl;
      setCurrentSong(previousSongUrl); // Actualiza la canción desde el contexto global
      setCurrentSongIndex(currentSongIndex - 1);
      setIsPlaying(true); // Se reproduce automáticamente
    }
  };

  // Manejo de clic en la barra de progreso
  const handleProgressClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const { clientX } = event;
    const progressBar = event.currentTarget;
    const { left, width } = progressBar.getBoundingClientRect();
    const clickPosition = clientX - left;
    const percentage = clickPosition / width;

    if (audioRef.current) {
      audioRef.current.currentTime = percentage * audioRef.current.duration;
    }
  };

  // Formateo de tiempo
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Manejo de hover en la barra de progreso
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = event.currentTarget;
    const { left, width } = progressBar.getBoundingClientRect();
    const clickPosition = event.clientX - left;
    const percentage = (clickPosition / width);

    if (audioRef.current) {
      const time = percentage * audioRef.current.duration;
      setHoverTime(formatTime(time));
    }
  };

  const handleMouseLeave = () => {
    setHoverTime(null);
  };

  // Cerrar la barra de reproducción
  const handleClose = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
    setIsClosed(true); // Cambiar el estado para cerrar la barra
  };

  // Si está cerrado o no hay lista de reproducción
  if (isClosed) {
    return (
      <button 
        onClick={() => setIsClosed(false)} 
        style={{ color: 'green', position: 'fixed', bottom: '20px', left: '20px', background: 'transparent', border: 'none', fontSize: '24px' }}
      >
        {'✓'} play
      </button>
    );
  }

  // Si no hay canciones en la lista, no mostrar nada
  if (playlist.length === 0) {
    return null;
  }

  return (
    <div className="play">
      <div className="play-controls">
        <button onClick={handlePrevious}>⏮</button>
        <button onClick={handlePlayPause}>
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button onClick={handleNext}>⏭</button>
        <button onClick={handleClose}>❌</button>
      </div>
      <audio ref={audioRef} />
      <div className="progress-bar" 
           onClick={handleProgressClick} 
           onMouseMove={handleMouseMove}
           onMouseLeave={handleMouseLeave}>
        <div className="progress" style={{ width: `${progress}%` }} />
        {hoverTime && <span style={{ marginLeft: '10px', color: 'black' }}>{hoverTime}</span>}
      </div>
      
      <div>
        <span style={{ color: 'red' }}>{remainingTime} Restantes</span>
      </div>
      <div className="current-song-info">
        <p>{playlist[currentSongIndex]?.songTitle}</p>
      </div>
      <img 
        className="foto8"
        src={playlist[currentSongIndex]?.imageUrl || ''} 
        style={{ width: '50px', height: '50px'}} 
        alt="Current Song"
      />
    </div>
  );
};

export default PlaybackBar;
