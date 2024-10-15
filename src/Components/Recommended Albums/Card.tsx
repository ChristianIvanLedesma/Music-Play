
import './card.css';

type Props = {
 
  img?: string;
  title:string;
  artist:string;
  onClick?: () => void;
};

function Card({  title,artist,img, onClick }: Props) {
  return (
    <div className="card2" onClick={onClick}>
        
      {img && <img src={img}  className="card-image2" />}
      <div className="card-content2">
        <p>{title}</p><br></br>
        <p className='artist-name'>{artist}</p>
      </div>
    </div>
  );
}

export default Card;
