import React, { Component } from 'react';
import * as _ from 'lodash';
import SpotifyPlayer from 'react-spotify-player';
import BeatLoader from 'react-spinners/BounceLoader';
import Select from 'react-select';
import Button from '@material-ui/core/Button';
import spotify from '../apis/spotify';
import skyBiometry from '../apis/skyBiometry';
import convertAttributesToMood from '../util';
import ImageUploader from './imageUploader';
import ParticleBackground from './particleBackground';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            genres: [],
            selectedPhoto: null,
            selectedGenre: null,
            currentSongUri: '',
            loading: false,

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

    handleGenreChange = (selectedGenre) => {
        this.setState({
            selectedGenre,
        });
    }

    selectPhoto = (photo) => {
        this.setState({
            selectedPhoto: photo,
        });
    }

    handleClick = () => {
        this.toggleLoading(true);
        skyBiometry.detectFaces(this.state.selectedPhoto).then((photos) => {
            const attributes = photos[0].tags.map(tag => tag.attributes);
            const mood = convertAttributesToMood(attributes);
            mood.seed_genres = this.state.selectedGenre.value;
            mood.limit = 1;
            spotify.findSong(mood).then((res) => {
                const song = res.data[0];
                this.setState({
                    loading: false,
                    currentSongUri: song.uri,
                });
                window.scrollTo(0, document.body.scrollHeight);
            });
        });
    }

    toggleLoading = (loading) => {
        this.setState({ loading });
    }

    render() {
        const genres = _.map(this.state.genres, (genre) => {
            return { value: genre, label: genre };
        });

        const canFindSong = this.state.selectedGenre && this.state.selectedPhoto;

        return (
            <div>
                <ParticleBackground />
                <h1>Music by Face</h1>
                <div id="content">
                    <p>
                    Choose a seed genre, upload a photo, then get a song recommededation based on the mood in the image. Uses SkyBiometry and Spotify&apos;s APIs.
                    </p>
                    <Select
                        onChange={this.handleGenreChange}
                        value={this.state.selectedGenre}
                        options={genres}
                        placeholder="Select seed genre..."
                        id="genre-selector"
                    />
                    <ImageUploader
                        selectPhoto={this.selectPhoto}
                        maxFileSize={this.SKY_IMG_SIZE_LIMIT}
                        toggleLoading={this.toggleLoading}
                    />
                    {canFindSong && (
                        <Button
                            id="find-song-button"
                            type="submit"
                            variant="outlined"
                            onClick={this.handleClick}
                        >
                        Find a Song
                        </Button>
                    )}
                </div>

                {this.state.currentSongUri && (
                    <SpotifyPlayer
                        uri={this.state.currentSongUri}
                        view="coverart"
                        theme="white"
                    />
                )}
                <div id="loading-indicator">
                    <BeatLoader
                        sizeUnit="px"
                        size={150}
                        color="#0EBFE9"
                        loading={this.state.loading}
                    />
                </div>
            </div>
        );
    }
}

export default App;
