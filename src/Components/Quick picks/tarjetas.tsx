import { ReactNode } from 'react';
import { useState } from 'react';
type Props = {
  children: ReactNode;
  img?: string;
  title: string;
  artist: string;
  onClick?: () => void;
};



function Card({ img, children, title, artist, onClick }: Props) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };
  return (
    <div className="card3" > 
    
      {img && <img onClick={onClick} src={img} className="image1" alt={title} />}
     
      <div className='chil'>
     
        {children}
        <p className="titulo"></p> 
        <div className='Like' onClick={handleLikeClick}>
        {isLiked ? '💚' : '🤍'}
        </div>
        <p className="artist-name">{artist}</p> 
      
        <div>
      
      
    </div>
      </div>
    </div>
  );
}

export default Card;
