// src/App.tsx
import Header from './Components/header/Header'; 
import ListaCanciones from './Components/Listen Again/ListenAgain';
import Avatar from './Components/akon/akon'
import PlaybackBar from './Components/Play/play'
import './App.css';

function App() {
  return (
    <>
      <Header />
      <ListaCanciones />
      <Avatar />
      <PlaybackBar />
  
    </>
  );
}

export default App;
