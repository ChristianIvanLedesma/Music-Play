import  { ReactNode } from 'react';
import './avatar.css'
import avatarinicio from '../../assets/logs/header/avatarinicio.jpg';

type Props = {
    title: string;
    children: ReactNode;
    
};

 function FotoInicio({ title, children }: Props){
    return (
        <div className='FotoInicio'>
            <img className='FotoInicioavatar' src={avatarinicio} alt="Usuario" />
            <h3>{title}</h3>
            {children}
            
        </div>
    );
}


export default FotoInicio;