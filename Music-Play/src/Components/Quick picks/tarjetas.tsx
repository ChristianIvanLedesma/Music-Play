import {  ReactNode } from 'react';

type Props = {
  children: ReactNode;
  img?: string;
  title:string;
  artist:string;
};

function Card({ img,children}: Props) {
  return (
    <div className="card3">
        
      {img && <img src={img}  className="card-image3" />}
     <div className='chil'> {children}</div>
      
    </div>
  );
}

export default Card;
