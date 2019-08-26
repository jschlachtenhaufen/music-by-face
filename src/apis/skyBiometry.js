import axios from 'axios';
import FormData from 'form-data';

const API_URL = 'http://api.skybiometry.com/fc/faces/detect.json';
const SKY_API_KEY = 'f0ep9l8adglienrj4l5glh1o0a'; // uses domain authentication, so exposure is okay

const skyBiometry = {
    detectFaces: (file) => {
        return new Promise((resolve, reject) => {
            const data = new FormData();
            data.append('image', file);
            axios.post(`${API_URL}?api_key=${SKY_API_KEY}&attributes=all`, data, {
                headers: {
                    accept: 'application/json',
                    'Accept-Language': 'en-US,en;q=0.8',
                    'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                },
            }).then((response) => {
                resolve(response.data.photos);
            }).catch((error) => {
                const message = error.response.data.error_message;
                reject(message);
                // TODO other handling?
            });
        });
    },
};

export default skyBiometry;
