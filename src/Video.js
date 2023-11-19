import React, { useState, useRef } from 'react';
import Tesseract from 'tesseract.js';

const App = () => {
  const inputFileRef = useRef(null);
  const [imageSrc, setImageSrc] = useState('');
  const [textFromImage, setTextFromImage] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [error, setError] = useState('');

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];

    if (file) {
      try {
        const imageSrc = URL.createObjectURL(file);
        setImageSrc(imageSrc);
        await convertImageToText(imageSrc);
      } catch (error) {
        setError('Error loading the image. Please try again.');
      }
    }
  };

  const convertImageToText = async (imageSrc) => {
    try {
      const { data: { text } } = await Tesseract.recognize(imageSrc, 'eng');
      setTextFromImage(text);
      setError('');
    } catch (error) {
      setError('Error processing image. Please try again.');
    }
  };

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    setSelectedVideo(file);
  };

  const handleGenerateVideo = () => {
    if (textFromImage && selectedVideo) {
      const inputVideoPath = URL.createObjectURL(selectedVideo);

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      const video = document.createElement('video');
      video.crossOrigin = 'anonymous';
      video.src = inputVideoPath;

      video.onloadeddata = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        ctx.drawImage(video, 0, 0);

        ctx.font = '30px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText(textFromImage, canvas.width / 2, canvas.height / 2);

        const outputVideoDataUrl = canvas.toDataURL('video/webm');
        const outputVideo = document.createElement('video');
        outputVideo.src = outputVideoDataUrl;
        outputVideo.controls = true;
        document.body.appendChild(outputVideo);
      };
    } else {
      setError('Please choose an image and upload a video before generating the new video.');
    }
  };

  return (
    <div>
      <h1>Image to Video Converter</h1>

      <input type="file" accept="image/*" ref={inputFileRef} onChange={handleImageUpload} />
      <br />
      {imageSrc && <img src={imageSrc} alt="Selected" style={{ maxWidth: '100%' }} />}
      <br />
      {textFromImage && <p>Text from Image: {textFromImage}</p>}
      <br />

      <input type="file" accept="video/*" onChange={handleVideoUpload} />
      <br />
      {selectedVideo && <p>Selected Video: {selectedVideo.name}</p>}
      <br />

      <button onClick={handleGenerateVideo}>Generate Video</button>
      <br />
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default App;
