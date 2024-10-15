import { useContext } from 'react';
import { AudioContext } from '../contex/contex';

export const usePlayback = () => {
  const context = useContext(AudioContext); 

 
  if (!context) {
    throw new Error('usePlayback must be used within an AudioProvider');
  }

  const { currentClip, play } = context; 

  const setCurrentSong = (audioUrl: string) => {
    const currentSongClip = { id: 0, title: '', description: '', audio_url: audioUrl }; 
    play(currentSongClip);
  };

  return { currentSong: currentClip?.audio_url, setCurrentSong };
};
