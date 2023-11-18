import React, { useState, useRef } from 'react';
import Tesseract from 'tesseract.js';
import { exec } from 'fluent-ffmpeg';

const Video = () => {
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

      // Define output video path
      const outputVideoPath = 'outputVideo.mp4';

      // Run ffmpeg command to overlay text on the video
      exec()
        .input(inputVideoPath)
        .videoCodec('libx264')
        .inputFormat('lavfi')
        .complexFilter([
          `[0:v]drawtext=text='${textFromImage}':fontsize=24:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2[outv]`,
        ])
        .output(outputVideoPath)
        .on('end', () => {
          console.log('Video created successfully');
        })
        .on('error', (err) => {
          console.error('Error creating video:', err);
        })
        .run();
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

export default Video;
