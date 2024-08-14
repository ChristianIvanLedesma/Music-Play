import  { ReactNode } from 'react';
import './akon.css';
import Boton from '../botones/boton'
import FotoInicio from '../avatar/avatar'



type Props = {
    title: string;
    children: ReactNode;
    
};

function AvatarChildren({ title, children }: Props) {
    return (
        
        <div className="Contenedor-redondo">
      
            <div className="imagen">
            
                <h3>{title}</h3>
                {children}
            </div>
        </div>
    );
}

function Avatar() {
    return (
        <>
        
            <Boton />
            
           <FotoInicio title="Akon">
           <p></p>
           </FotoInicio>
            
            <AvatarChildren title='imagen 1'>
            <img
          className="avatar"
          src="https://www.nme.com/wp-content/uploads/2023/01/2023_coldplay_getty_2000x1270.jpg"
          alt="Aklilu Lemma"
          
        />
            </AvatarChildren>
           
            <AvatarChildren title='imagen 2'>
             <img
          className="avatar"
          src="https://images.says.com/uploads/story_source/source_image/535732/4cab.jpg"
          alt="Aklilu Lemma"
         
          
        />
            </AvatarChildren>
            <AvatarChildren title='imagen 3'>
            <img
          className="avatar"
          src="https://i2.wp.com/decider.com/wp-content/uploads/2018/11/coldplay-a-head-full-of-dreams.jpg?quality=90&strip=all&ssl=1"
          alt="Aklilu Lemma"
          
        />
            </AvatarChildren>
            <AvatarChildren title='imagen 4'>
            <img
          className="avatar"
          src="https://fmaspen.com/wp-content/uploads/2023/04/coldplay-1.jpg"
          alt="Aklilu Lemma"
          
        />
            </AvatarChildren>
            <AvatarChildren title='imagen 5'>
            <img
          className="avatar"
          src="https://i.pinimg.com/originals/35/ef/9b/35ef9b969d85c81dd7f1ee45b866c7b8.jpg"
          alt="Aklilu Lemma"
          
        />
           
            </AvatarChildren>
        </>
    );
}

export default Avatar;
