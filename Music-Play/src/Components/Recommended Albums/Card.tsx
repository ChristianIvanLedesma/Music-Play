import { ReactNode } from 'react';
import './card.css';

type Props = {
  children: ReactNode;
  img?: string;
  album: string;
  title:string;
  artist:string;
};

function Card({ children, img, album}: Props) {
  return (
    <div className="card2">
        
      {img && <img src={img} alt={`Cover of ${album}`} className="card-image2" />}
      <div className="card-content2">
        {children}
      </div>
    </div>
  );
}

export default Card;
