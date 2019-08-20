import React, { Component } from 'react';
import * as _ from 'lodash';
import SpotifyPlayer from 'react-spotify-player';
import spotify from '../apis/spotify';
import skyBiometry from '../apis/skyBiometry';
import convertAttributesToMood from '../util';
import ImageUploader from './imageUploader';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            genres: [],
            currentSongUri: 'spotify:album:1TIUsv8qmYLpBEhvmBmyBk',
            selectedPhoto: null,
            selectedGenre: 'acoustic',
        };

        this.SKY_IMG_SIZE_LIMIT = 2; // 2 mb limit on images
    }

    componentDidMount() {
        spotify.getGenres().then((res) => {
            this.setState({
                genres: res.genres,
            });
        });
    }

    handleClick = () => {
        if (!this.state.selectedPhoto) return;
        skyBiometry.detectFaces(this.state.selectedPhoto).then((photos) => {
            const attributes = photos[0].tags.map(tag => tag.attributes);
            const mood = convertAttributesToMood(attributes);
            mood.seed_genres = this.state.selectedGenre;
            mood.limit = 1;
            console.log(attributes);
            console.log(mood);
            spotify.findSong(mood).then((res) => {
                const song = res.data[0];
                this.setState({
                    currentSongUri: song.uri,
                });
            });
        });
    }

    selectPhoto = (photo) => {
        this.setState({
            selectedPhoto: photo,
        });
    }

    handleGenreChange = (event) => {
        this.setState({
            selectedGenre: event.target.value,
        });
    }

    render() {
        const size = {
            width: '100%',
            height: 300,
        };

        const genres = _.map(this.state.genres, (genre) => {
            return <option key={genre} value={genre}>{genre}</option>;
        });
        const view = 'list'; // or 'coverart'
        const theme = 'black'; // or 'white'
        return (
            <div>
                <select onChange={this.handleGenreChange} value={this.state.selectedGenre}>
                    {genres}
                </select>
                <ImageUploader selectPhoto={this.selectPhoto} maxFileSize={this.SKY_IMG_SIZE_LIMIT} />
                <img id="uploadedImage" src="#" alt="" />
                <button type="button" onClick={this.handleClick}>Test</button>
                <SpotifyPlayer
                    uri={this.state.currentSongUri}
                    size={size}
                    view={view}
                    theme={theme}
                />
            </div>
        );
    }
}

export default App;
