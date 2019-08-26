import React from 'react';
import imageCompression from 'browser-image-compression';
import Button from '@material-ui/core/Button';

const ImageUploader = (props) => {
    const handleFileSubmission = (event) => {
        const file = event.target.files && event.target.files[0];
        if (!file) return;

        props.toggleLoading(true);
        const reader = new FileReader();
        reader.onload = (e) => {
            const imageEl = document.getElementById('uploaded-image');
            imageEl.src = e.target.result;
            imageEl.style.display = 'block';
        };

        const options = {
            maxSizeMB: props.maxFileSize,
            useWebWorker: true,
        };

        imageCompression(file, options).then((compressedFile) => {
            reader.readAsDataURL(compressedFile);
            props.selectPhoto(compressedFile);
            props.toggleLoading(false);
        });
    };

    /* eslint-disable jsx-a11y/label-has-for */
    /* eslint-disable jsx-a11y/label-has-associated-control */
    return (
        <div id="image-uploader">
            <input
                accept="image/*"
                id="file-input"
                multiple={false}
                type="file"
                onChange={handleFileSubmission}
            />
            <label htmlFor="file-input">
                <Button variant="contained" component="span">
                    Upload Photo
                </Button>
            </label>
            <img id="uploaded-image" src="#" alt="" />
        </div>
    );
};

export default ImageUploader;
