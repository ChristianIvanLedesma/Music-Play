import { ReactNode } from 'react';
import {useState} from 'react'
import './Card.css';

type Props = {
  children?: ReactNode; 
  img?: string;
  title: string;
  artist: string;
  onClick?: () => void; 
};

function SongCard({ img, title, artist, onClick }: Props) {

  const [isLiked,setIsLiked]= useState (false)

  const handleLikeClick = ()=>{
    setIsLiked(!isLiked)
  }

  return (
    <div className="card" >
      {img && (
        <img onClick={onClick} src={img} alt={`Cover of ${title}`} className="card-image" />
      )}
      <div className="song-details">
        <p className='song-title'>{title}</p>
        <div className='like' onClick={handleLikeClick}>
        {isLiked ? '❤️' : '🤍'}
        </div>
        <p className='artist-name'>{artist}</p>
      </div>
    </div>
  );
}

export default SongCard;
