// src/App.tsx
import Header from './Components/header/Header'; 
import ListaCanciones from './Components/Listen Again/ListenAgain';
import Avatar from './Components/akon/akon'
import PlaybackBar from './Components/PlaybackBar/play'
import Favoritos from './Components/Recommended Albums/CancionesFavoritas'
import QuickPicks from './Components/Quick picks/Quick-picks'
import './App.css';

function App() {
  return (
    <>
      <Header />
      <ListaCanciones />
      <Avatar />
      <PlaybackBar />
      <QuickPicks />
      <Favoritos />
  
    </>
  );
}

export default App;
