

import './Header.css';
import logo from '../../../public/image/logo.png';

import Avatar from '../../../public/image/Avatar.jpg';




function Header(){

  return (
    <header className="header">
        <div className='contenedor-principal'>
     
      <img src={logo} alt="Logo-Music" className="Logo-Music" />
      <input type="text" placeholder="Search..." />
     
     
      <div className='contenedor-avatar'>
        <img className='Avatar' src={Avatar} alt="Usuario" />
        </div>
    
      </div>
    </header>
  );
}






export default Header;