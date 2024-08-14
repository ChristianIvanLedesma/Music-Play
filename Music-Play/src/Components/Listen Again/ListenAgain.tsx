
import Card from './SongCard';
import musicData from './Lista-Canciones'; 
import shakira from '/image/shakira.jpg'; 
import Boton from '../botones/boton'



const ListaCanciones = () => {
  const { listenAgain } = musicData;

  return (
    <div>
      <Boton />
      <div className="cards-container" >
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

     
    </div>
  );
};

export default ListaCanciones;
