
import Card from './SongCard';
import musicData from './Lista-Canciones'; 
import shakira from '/image/shakira.jpg'; 
import Boton from '../botones/boton'
import FotoInicio from '../avatar/avatar'



const ListaCanciones = () => {
  const { listenAgain } = musicData;

  return (
    <>
       
      <FotoInicio title="Listen Again" >
      <p></p>
      </ FotoInicio>
      <div className="cards-cont" >
      <Boton />
        {listenAgain.map(song => (
          <Card
          
            key={song.id}
            img={shakira} 
            album={song.album}
          > 
            <p className="song-title">{song.title}</p>
            <p className="artist-name">De {song.artist}</p>
            <p className="album-name">Album: {song.album}</p>
          </Card>
        ))}
        
      </div>

     
    </>
  );
};

export default ListaCanciones;
