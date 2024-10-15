import React, { createContext, useEffect, useState } from 'react';

interface AudioClip {
  id: number;
  title: string;
  description: string;
  audio_url: string;
}

interface ApiResponse {
  body: {
    audio_clips: {
      id: number;
      title: string;
      description: string;
      urls: {
        high_mp3: string; 
      };
    }[];
  };
}

interface AudioContextProps {
  clips: AudioClip[];
  currentClip: AudioClip | null;
  play: (clip: AudioClip) => void;
  error: string | null; 
}


const AudioContext = createContext<AudioContextProps | undefined>(undefined);


export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [clips, setClips] = useState<AudioClip[]>([]);
  const [currentClip, setCurrentClip] = useState<AudioClip | null>(null);
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    const fetchClips = async () => {
      try {
        const response = await fetch('https://api.audioboom.com/audio_clips');
        if (!response.ok) {
          throw new Error('Error en la respuesta de la red');
        }
        const data: ApiResponse = await response.json();

        
        const audioClips: AudioClip[] = data.body.audio_clips.map((clip) => ({
          id: clip.id,
          title: clip.title,
          description: clip.description,
          audio_url: clip.urls.high_mp3,
        }));

        setClips(audioClips);
        setError(null); 
      } catch (err) {
        console.error('Error al obtener los clips de audio:', err);
        
        if (err instanceof Error) {
          setError(err.message); 
        } else {
          setError('Error desconocido'); 
        }
      }
    };

    fetchClips();
  }, []);

  const play = (clip: AudioClip) => {
    setCurrentClip(clip);
  };

  return (
    <AudioContext.Provider value={{ clips, currentClip, play, error }}>
      {children}
    </AudioContext.Provider>
  );
};


export { AudioContext };
