// src/App.tsx
import Header from './Components/header/Header'; // Asegúrate de que Header.tsx esté en la misma carpeta
import ListaCanciones from './Components/Listen Again/ListenAgain'; // Asegúrate de que ExampleUsage.tsx esté en la misma carpeta
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
