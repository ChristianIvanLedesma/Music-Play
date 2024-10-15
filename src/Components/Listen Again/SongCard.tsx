import { ReactNode } from 'react';
import './Card.css';

type Props = {
  children?: ReactNode; 
  img?: string;
  title: string;
  artist: string;
  onClick?: () => void; 
};

function SongCard({ img, title, artist, onClick }: Props) {
  return (
    <div className="card" onClick={onClick}>
      {img && (
        <img src={img} alt={`Cover of ${title}`} className="card-image" />
      )}
      <div className="song-details">
        <p className='song-title'>{title}</p>
        <p className='artist-name'>{artist}</p>
      </div>
    </div>
  );
}

export default SongCard;
