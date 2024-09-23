import { useEffect, useState, useRef } from 'react';
import './play.css';

type PlaybackBarProps = {
  playlist?: { audioUrl: string; songTitle: string; artist: string }[];
  currentSong: string | null; 
};

const PlaybackBar = ({ playlist = [], currentSong }: PlaybackBarProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    if (currentSong) {
      const songIndex = playlist.findIndex(song => song.audioUrl === currentSong);
      if (songIndex !== -1) {
        setCurrentSongIndex(songIndex);
      }
    }
  }, [currentSong, playlist]); 

  useEffect(() => {
    if (playlist.length > 0 && audioRef.current) {
      const audioElement = audioRef.current;
      audioElement.src = playlist[currentSongIndex].audioUrl;

      const updateProgress = () => {
        if (audioElement) {
          const percentage = (audioElement.currentTime / audioElement.duration) * 100;
          setProgress(percentage || 0);
        }
      };

      const handleError = () => {
        console.error('Error al cargar el audio:', audioElement.src);
        setIsPlaying(false);
      };

      audioElement.addEventListener('timeupdate', updateProgress);
      audioElement.addEventListener('error', handleError);

      audioElement.play().catch(err => {
        console.error('No se pudo reproducir el audio:', err);
      });

      return () => {
        audioElement.removeEventListener('timeupdate', updateProgress);
        audioElement.removeEventListener('error', handleError);
      };
    }
  }, [playlist, currentSongIndex]); 

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => {
          console.error('No se pudo reproducir el audio:', err);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleNext = () => {
    if (currentSongIndex < playlist.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
      setIsPlaying(false);
    }
  };

  const handlePrevious = () => {
    if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1);
      setIsPlaying(false);
    }
  };

  if (playlist.length === 0) {
    return <p></p>;
  }

  return (
    <div className="play">
      <div className="play-controls">
        <button onClick={handlePrevious}>⏮️ anterior</button>
        <button onClick={handlePlayPause}>
          {isPlaying ? '⏸️ Pause' : '▶️ Play'}
        </button>
        <button onClick={handleNext}>⏭️ siguiente</button>
      </div>
      <p>{playlist[currentSongIndex].artist} - {playlist[currentSongIndex].songTitle}</p>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
      <audio ref={audioRef} />
    </div>
  );
};

export default PlaybackBar;
