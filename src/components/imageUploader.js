import React, { Component } from 'react';
import imageCompression from 'browser-image-compression';

class ImageUploader extends Component {
    handleChange = (event) => {
        const file = event.target.files && event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            document.getElementById('uploadedImage').src = e.target.result;
        };

        const options = {
            maxSizeMB: this.props.maxFileSize,
            useWebWorker: true,
        };

        imageCompression(file, options).then((compressedFile) => {
            reader.readAsDataURL(compressedFile);
            this.props.selectPhoto(compressedFile);
        }).catch((err) => {
            console.log(err);
            // TODO Handle
        });
    }

    render() {
        return (
            <div>
                <input type="file" multiple={false} accept="image/*" onChange={this.handleChange} />
                <img id="uploadedImage" src="#" alt="" />
            </div>
        );
    }
}

export default ImageUploader;
