import axios from 'axios';

const API_URL = 'http://127.0.0.1:9090';

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
