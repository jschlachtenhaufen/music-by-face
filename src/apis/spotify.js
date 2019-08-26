import axios from 'axios';

const API_URL = 'https://music-by-face.herokuapp.com';

const spotify = {
    getGenres: () => {
        return new Promise((resolve, reject) => {
            axios.get(`${API_URL}/spotify/genres`)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    findSong: (params) => {
        return new Promise((resolve, reject) => {
            axios.get(`${API_URL}/spotify/recommendation`, { params }).then((track) => {
                resolve(track);
            }).catch((error) => {
                reject(error);
            });
        });
    },
};

export default spotify;
