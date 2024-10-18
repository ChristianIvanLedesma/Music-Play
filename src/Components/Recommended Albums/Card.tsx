import {useState} from 'react'
import './card.css';

type Props = {
 
  img?: string;
  title:string;
  artist:string;
  onClick?: () => void;
};

function Card({  title,artist,img, onClick }: Props) {

  const [isLiked,setIsLiked]= useState(false)

  const  handleLikeClick =()=>{
    setIsLiked(!isLiked)
  }

  return (
    <div className="card2" >
        
      {img && <img src={img}  className="card-image2" onClick={onClick} />}
      <div className="card-content2">
        <p>{title}</p>
        <div className='like2' onClick={handleLikeClick}>
      {isLiked ? '💜' : '🤍'}
        </div>
        <p className='artist-name'>{artist}</p>
      </div>
    
    </div>
  );
}

export default Card;
