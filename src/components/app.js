import React from 'react';
import SpotifyPlayer from 'react-spotify-player';

const App = (props) => {
    const size = {
        width: '100%',
        height: 300,
    };
    const view = 'list'; // or 'coverart'
    const theme = 'black'; // or 'white'
    return (
        <div>
            <SpotifyPlayer
                uri="spotify:album:1TIUsv8qmYLpBEhvmBmyBk"
                size={size}
                view={view}
                theme={theme}
            />
        </div>
    );
};

export default App;
