import React, { useState, useRef } from 'react';

const TextToVideo = () => {
  const [imagePath, setImagePath] = useState('');
  const [extractedText, setExtractedText] = useState('');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImagePath(reader.result);
      extractText(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const extractText = (imageData) => {
    // Use Tesseract.js or any other OCR library to extract text
    // For simplicity, let's assume the text is directly provided
    setExtractedText(imageData);
  };

  const createVideo = () => {
    // if (!imagePath || !extractedText) {
    //   alert('Please select an image and extract text first.');
    //   return;
    // }

    const framesPerSecond = 30;
    const seconds = 5;
    const frames = framesPerSecond * seconds;
    const frameInterval = 1000 / framesPerSecond;

    const drawFrame = (ctx, frame) => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      ctx.fillStyle = 'white';
      ctx.font = '24px Arial';
      ctx.fillText(extractedText, ctx.canvas.width / 4, ctx.canvas.height / 2);
    };

    const startRecording = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      const mediaChunks = [];
      const mediaRecorder = new MediaRecorder(canvas.captureStream(framesPerSecond));

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          mediaChunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const mediaBlob = new Blob(mediaChunks, { type: 'video/webm' });
        const videoUrl = URL.createObjectURL(mediaBlob);
        videoRef.current.src = videoUrl;
      };

      mediaRecorder.start();

      for (let frame = 0; frame < frames; frame++) {
        setTimeout(() => {
          drawFrame(ctx, frame);
          mediaRecorder.requestData();
        }, frame * frameInterval);
      }

      setTimeout(() => {
        mediaRecorder.stop();
      }, frames * frameInterval);
    };

    // Rest of the component
    return (
      <div>
        <h2>Text to Video</h2>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {imagePath && (
          <>
            <div>Extracted Text: {extractedText}</div>
            <button onClick={startRecording}>Create Video</button>
          </>
        )}
        <canvas ref={canvasRef} width={640} height={480} style={{ display: 'none' }} />
        <video ref={videoRef} controls style={{ marginTop: '20px' }} />
      </div>
    );
  };

  return createVideo();
};

export default TextToVideo;
