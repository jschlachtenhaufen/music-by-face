import React, { Component } from 'react';
import SpotifyPlayer from 'react-spotify-player';
import spotify from '../apis/spotify';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentSongUri: 'spotify:album:1TIUsv8qmYLpBEhvmBmyBk',
        };
    }

    handleClick = () => {
        spotify.findSongs('pop', 0.5, 0.5, 0.6, 0.6, 'minor').then((tracks) => {
            this.setState({
                currentSongUri: tracks[0].uri,
            });
        });
    }

    render() {
        const size = {
            width: '100%',
            height: 300,
        };
        const view = 'list'; // or 'coverart'
        const theme = 'black'; // or 'white'
        return (
            <div>
                <SpotifyPlayer
                    uri={this.state.currentSongUri}
                    size={size}
                    view={view}
                    theme={theme}
                />
                <button type="button" onClick={this.handleClick}>Test</button>
            </div>
        );
    }
}

export default App;
