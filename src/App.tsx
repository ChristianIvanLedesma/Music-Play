import { useState } from 'react';
import Header from './Components/header/Header'; 
import ListaCanciones from './Components/Listen Again/ListenAgain';
import Avatar from './Components/akon/akon';
import PlaybackBar from './Components/PlaybackBar/play';
import Favoritos from './Components/Recommended Albums/CancionesFavoritas';
import QuickPicks from './Components/Quick picks/Quick-picks';
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

  const handleMenuClick = () => {
    setIsFormVisible(prev => !prev); 
  };

  const handleCreatePlaylist = (newPlaylist: Playlist) => {
    setPlaylists(prevPlaylists => [...prevPlaylists, newPlaylist]); 
    setIsFormVisible(false); 
  };

  return (
    <>
      <Menu 
        onClick={handleMenuClick} 
        isFormVisible={isFormVisible} 
        playlists={playlists} 
      /> 
      <Header />
      <PlaybackBar />
      {isFormVisible ? (
        <FormPlayList onCreate={handleCreatePlaylist} />
      ) : (
        <>
          <ListaCanciones />
          <Avatar />
          <QuickPicks />
          <Favoritos />
        </>
      )}
    </>
  );
}

export default App;
