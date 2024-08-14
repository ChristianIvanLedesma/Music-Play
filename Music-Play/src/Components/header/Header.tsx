//logo de music - barra de busqueda - imagen del perfil

import './Header.css';
import logo from'../../assets/logs/header/Logo_Music.png';
import Avatar from '../../assets/logs/header/Avatar.jpg';




function Header(){

  return (
    <header className="header">
        <div className='contenedor-principal'>
     
      <img src={logo} alt="Logo-Music" className="Logo-Music" />
      <input type="text" placeholder="Buscar..." />
     
     
      <div className='contenedor-avatar'>
        <img className='Avatar' src={Avatar} alt="Usuario" />
        </div>
    
      </div>
    </header>
  );
}






export default Header;