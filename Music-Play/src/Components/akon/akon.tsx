import  {  ReactNode } from 'react';
import '../akon/akon.css';
import Boton from '../botones/boton'
import FotoInicio from '../avatar/avatar';
import generos from './genero';


type Props = {
  children: ReactNode;
  img?: string;
  genero:string;
};

function AvatarChildren({ children, img, genero }: Props) {
  return (
    <div className='total'>
      <div className="imagen">
          {img && <img src={img} alt={`Cover of ${genero}`} className="card-image" />}
      </div>
      
      <div className='contenido'>{children}</div>

      </div>
  
  );
}

function Avatar() {
    return (
        <>
        <FotoInicio title="Akon" >
        <p></p>
        </FotoInicio>

      <div className="avatar1" >
      <Boton />
        {generos.map(song => (
          <AvatarChildren
            key={song.id}
            genero={song.genero}
            img={song.img}
            
            
          > 
            <p className="song-title">{song.title}</p>
            <p className="artist-name">De {song.artist}</p>
            <p className="album-name">Genero: {song.genero}</p>
          </AvatarChildren>
        ))}
        
      </div>

        </>
    );
}

export default Avatar;
