import axios from 'axios';

const API_URL = 'https://api.spotify.com/v1/recommendations';
const AUTH_TOKEN = '';
axios.defaults.headers.common = { Authorization: `Bearer ${AUTH_TOKEN}` };

const spotify = {
    findSongs: (genre, energy, acousticness, danceability, valence, mode) => {
        return new Promise((resolve, reject) => {
            const params = {
                seed_genres: genre,
                target_energy: energy,
                target_acousticness: acousticness,
                target_danceability: danceability,
                targer_valence: valence,
                limit: 1,
                mode,
            };

            axios.get(API_URL, { params })
                .then((response) => {
                    resolve(response.data.tracks);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
};

export default spotify;
