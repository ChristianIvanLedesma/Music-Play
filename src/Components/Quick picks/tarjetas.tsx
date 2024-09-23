import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  img?: string;
  title: string;
  artist: string;
  onClick?: () => void;
};

function Card({ img, children, title, artist, onClick }: Props) {
  return (
    <div className="card3" onClick={onClick}> 
      {img && <img src={img} className="image" alt={title} />}
      <div className='chil'>
        {children}
        <p className="titulo"></p> 
        <p className="artista">{artist}</p> 
      </div>
    </div>
  );
}

export default Card;
