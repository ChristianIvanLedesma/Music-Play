import { AudioProvider } from './Components/contex/contex';
import QuickPicks from './Components/Quick picks/Quick-picks';
import PlaybackBar from './Components/PlaybackBar/play';
import Favoritos from './Components/Recommended Albums/CancionesFavoritas'
import { useState } from 'react';
import Header from './Components/header/Header'; 
import Lista  from './Components/Listen Again/ListenAgain';
import Menu from './Components/Sidebar/menu';
import FormPlayList from './Components/Sidebar/form'; 
import './App.css';

interface Playlist {
  image: string;
  title: string;
  price: string;
}

function App() {
  const [isFormVisible, setIsFormVisible] = useState(false); 
  const [playlists, setPlaylists] = useState<Playlist[]>([]); 
  const [currentSong, setCurrentSong] = useState<string>(''); 
  const [playlist, setPlaylist] = useState<{ audioUrl: string; songTitle: string; artist: string; imageUrl: string; }[]>([]); 

  const handleMenuClick = () => {
    setIsFormVisible(prev => !prev); 
  };

  const handleCreatePlaylist = (newPlaylist: Playlist) => {
    setPlaylists(prevPlaylists => [...prevPlaylists, newPlaylist]); 
    setIsFormVisible(false); 
  };

  return (
    <AudioProvider>
      <>
        <Menu 
          onClick={handleMenuClick} 
          isFormVisible={isFormVisible} 
          playlists={playlists} 
        /> 
        
        <Header />
        <PlaybackBar 
          playlist={playlist} 
          currentSong={currentSong}
        />
        {isFormVisible ? (
          <FormPlayList onCreate={handleCreatePlaylist} />
        ) : (
          <>
            <Lista setPlaylist={setPlaylist} setCurrentSong={setCurrentSong}/>
            <QuickPicks setPlaylist={setPlaylist} setCurrentSong={setCurrentSong} />
            <Favoritos setPlaylist={setPlaylist} setCurrentSong={setCurrentSong}/>
            
          </>
        )}
      </>
    </AudioProvider>
  );
}

export default App; 
