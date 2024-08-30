import React from 'react';
import './menu.css';

interface Playlist {
    image: string;
    title: string;
    price: string;
}

interface MenuProps {
    onClick: () => void; 
    isFormVisible: boolean; 
    playlists: Playlist[]; 
}

const Menu: React.FC<MenuProps> = ({ onClick, isFormVisible, playlists }) => {
    return (
        <div className='menu-principal'>
            <button className='boton' onClick={onClick}>
            {isFormVisible ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-round-minus"><path d="M2 21a8 8 0 0 1 13.292-6"/><circle cx="10" cy="8" r="5"/><path d="M22 19h-6"/></svg> 
            : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-plus"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>}
                {isFormVisible ? 'Cerrar Playlist' : 'Nueva Playlist'}
            </button>
            <div className='conte-playlist'>
                {/* Muestra todas las playlists una debajo de la otra */}
                {playlists.map((playlist, index) => (
                    <div key={index} className="playlist-info">
                        <img src={playlist.image} alt={playlist.title} />
                        <p>{playlist.title} / {playlist.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Menu;
