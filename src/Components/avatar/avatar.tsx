import { ReactNode } from 'react';
import './avatar.css'
import avatarinicio from '../../assets/avatarinicio.jpg';

type Props = {
    title: string;
    children: ReactNode;
    
   
    
};

 function FotoInicio({ title ,children}: Props){
    return (
        <div className='FotoInicio'>
            <img className='FotoInicioavatar' src={avatarinicio} alt="Usuario" />
            <p>{title}</p>
            <div style={{color:'#000000'}}>{children}</div>
            
            
        </div>
    );
}


export default FotoInicio;