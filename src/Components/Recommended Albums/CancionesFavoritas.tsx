import CancionesFavori from './lista-favoritos'
import Card from './Card'
import Madonna from '/image/madonna.jpg'
import Boton from '../botones/boton'
import FotoInicio from '../avatar/avatar'





function Favoritos(){
    const { lista } = CancionesFavori;

    return(
      <>
     
        
     <FotoInicio title="Recommended album" >
        <p></p>
      </ FotoInicio>
        <div className="favorito-principal">
         
        
      
        <Boton />
        {lista.map(song => (
          <Card
         
            key={song.id}
            album={song.album}
            title={song.title}
            artist={song.artist}
            img={Madonna} 
          >
            
            <p className="song-title2">{song.title}</p>
            <p className="artist-name2">De {song.artist}</p>
            <p className="album-name2">Album: {song.album}</p>
            
          </Card>
        ))}
      </div>

      </>
       
    );
}

export default Favoritos;