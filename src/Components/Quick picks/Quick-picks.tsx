import Card from './tarjetas';
import Lista from './lista';
import './quick.css';
import Boton from '../botones/boton'
import FotoInicio from '../avatar/avatar';
import Romantico from '../../../public/image/ROMANTICOS.jpg'


function QuickPicks() {
  return (
    <>
     <FotoInicio title="Quick Picks">
            <p></p>
            </FotoInicio>
      <div className='quick-picks'>
        
        <Boton />
        {Lista.Musica.map(song => (
          <Card
            key={song.id}
            artist={song.artist}
            title={song.title}
            img={Romantico}
            
           
          >
            <div className='informacion'>
            <p className="titulo">{song.title}</p>
            <p className="artista">De :{song.artist}</p>
            <p className="album">Album: {song.id}</p> 
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

export default QuickPicks;
