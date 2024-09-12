import { ReactNode } from 'react';
import './Card.css';

type Props = {
  children: ReactNode;
  img?: string;
  album: string;
};

function SongCard({ children, img, album }: Props) {
  return (
    <div className="card">
      {img && <img src={img} alt={`Cover of ${album}`} className="card-image" />}
      <div className="card-content">
        {children}
      </div>
    </div>
  );
}

export default SongCard;
