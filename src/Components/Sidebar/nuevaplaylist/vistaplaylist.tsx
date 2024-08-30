import React, { useState } from 'react';
import Header from '../../header/Header';
import Menu from '../../Sidebar/menu';
import FormPlayList from '../form';
import '../../header/Header.css';

interface Playlist {
    image: string;
    title: string;
    price: string;
}

const Listanueva: React.FC = () => {
    const [showForm, setShowForm] = useState(false); 
    const [playlists, setPlaylists] = useState<Playlist[]>([]); 

    const handleNewPlaylistClick = () => {
        setShowForm(prev => !prev); 
    };

    const handleCreatePlaylist = (playlist: Playlist) => {
        setPlaylists(prevPlaylists => [...prevPlaylists, playlist]); 
        setShowForm(false); 
    };

    return (
        <>
            <Header />
            <Menu 
                onClick={handleNewPlaylistClick} 
                isFormVisible={showForm}
                playlists={playlists} 
            />
            {showForm && <FormPlayList onCreate={handleCreatePlaylist} />}

            {/* playlists creadas */}
            <div className='conte-playlist'>
                {playlists.map((playlist, index) => (
                    <div key={index} className='playlist-info'>
                        <h2>Playlist Creada</h2>
                        <img src={playlist.image} alt={playlist.title} />
                       <div> <p>{playlist.title}</p>
                        <p>{playlist.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Listanueva;
