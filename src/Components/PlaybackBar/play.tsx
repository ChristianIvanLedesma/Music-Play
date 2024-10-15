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
  const [remainingTime, setRemainingTime] = useState<string>('');
  const [hoverTime, setHoverTime] = useState<string | null>(null);
  const [isClosed, setIsClosed] = useState<boolean>(false);

  useEffect(() => {
    const songIndex = playlist.findIndex((song) => song.audioUrl === currentSong);
    if (songIndex !== -1) {
      setCurrentSongIndex(songIndex);
      console.log('Current song index updated:', songIndex); 
    }
  }, [currentSong, playlist]);

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

      const playAudio = async () => {
        if (isPlaying) {
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
  }, [playlist, currentSongIndex, isPlaying]);

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

  const handleNext = () => {
    if (currentSongIndex < playlist.length - 1) {
      const nextSongUrl = playlist[currentSongIndex + 1]?.audioUrl;
      setCurrentSong(nextSongUrl);
      setCurrentSongIndex(currentSongIndex + 1);
      setIsPlaying(false);
    }
  };

  const handlePrevious = () => {
    if (currentSongIndex > 0) {
      const previousSongUrl = playlist[currentSongIndex - 1]?.audioUrl;
      setCurrentSong(previousSongUrl);
      setCurrentSongIndex(currentSongIndex - 1);
      setIsPlaying(false);
    }
  };

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

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

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

  const handleClose = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
    setIsClosed(true);
  };

  if (isClosed || playlist.length === 0) {
    return null;
  }

  return (
    <div className="play">
      <div className="play-controls">
        <button onClick={handlePrevious}>⏮️</button>
        <button onClick={handlePlayPause}>
          {isPlaying ? '⏸️' : '▶️'}
        </button>
        <button onClick={handleNext}>⏭️</button>
        <button onClick={handleClose}>❌ Cerrar</button>
      </div>
      <audio ref={audioRef} />
      <div className="progress-bar" 
           onClick={handleProgressClick} 
           onMouseMove={handleMouseMove}
           onMouseLeave={handleMouseLeave}>
        <div className="progress" style={{ width: `${progress}%` }} />
        {hoverTime && <span style={{ marginLeft: '10px' }}>{hoverTime}</span>}
      </div>
      <div>
        <span style={{color:'red'}}>{remainingTime} restantes</span>
      </div>
      <div className="time-info">
        <p>{playlist[currentSongIndex]?.songTitle}</p>
      </div>
      <img 
        className="foto8"
        src={playlist[currentSongIndex]?.imageUrl || 'public/image/default.jpg'} 
        style={{ width: '60px', height: '60px' }} 
      />
    </div>
  );
};

export default PlaybackBar;
