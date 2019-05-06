import axios from 'axios';
import FormData from 'form-data';

const API_KEY = '';
const API_SECRET = '';
const API_URL = 'http://api.skybiometry.com/fc/faces/detect.json';

const skyBiometry = {
    detectFaces: (files) => {
        return new Promise((resolve, reject) => {
            const data = new FormData();
            files.forEach((file) => {
                data.append('image', file);
            });
            axios.post(`${API_URL}?api_key=${API_KEY}&api_secret=${API_SECRET}&attributes=all`, data, {
                headers: {
                    accept: 'application/json',
                    'Accept-Language': 'en-US,en;q=0.8',
                    'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                },
            }).then((response) => {
                resolve(response.data.photos);
                // TODO process before resolving?
            }).catch((error) => {
                reject(error);
            });
        });
    },
};

export default skyBiometry;
