import React, { useState, useEffect } from 'react';
import Tesseract from 'tesseract.js';
import { useDropzone } from 'react-dropzone';
import Navbar from './Navbar';
import Footer from './Footer';

const Video = () => {
  const [image, setImage] = useState(null);
  const [extractedText, setExtractedText] = useState('');

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // This ensures that the container takes up the full height of the viewport
  };
  useEffect(() => {
    // Cleanup function to remove canvas and video elements when the component unmounts
    return () => {
      const canvas = document.querySelector('canvas');
      if (canvas) {
        document.body.removeChild(canvas);
      }

      const video = document.querySelector('video');
      if (video) {
        document.body.removeChild(video);
      }
    };
  }, []);


  const onDrop = (acceptedFiles) => {
    const reader = new FileReader();
    const file = acceptedFiles[0];

    reader.onload = (event) => {
      setImage(event.target.result);
      extractText(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const extractText = (imageData) => {
    Tesseract.recognize(
      imageData,
      'eng', // English language
      { logger: (info) => console.log(info) } // You can remove this logger if not needed
    ).then(({ data: { text } }) => {
      setExtractedText(text);
    });
  };

  const createVideo = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const framesPerSecond = 20;
    const seconds = 3;
    const frames = framesPerSecond * seconds;
    const frameInterval = 2000 / framesPerSecond;
  
    canvas.width = 320;
    canvas.height = 240;
    document.body.appendChild(canvas);

    const drawFrame = (text, frame) => {
      const lines = text.split('\n');
      const lineHeight = 20; // Adjust the line height as needed
    
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    
      ctx.fillStyle = 'white';
      ctx.font = '12px Arial';
    
      lines.forEach((line, index) => {
        const textWidth = ctx.measureText(line).width;
        let xPos = (frame * 10) % (canvas.width + textWidth);
        let yPos = canvas.height / 2 + index * lineHeight;
    
        // Draw each line at the calculated position
        ctx.fillText(line, xPos, yPos);
      });
    };
    
  
    const startRecording = () => {
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
  
        // Display the video or handle it as needed
        const video = document.createElement('video');
        video.src = videoUrl;
        video.controls = true;
        document.body.appendChild(video);
        document.body.style.textAlign="center"
        document.body.style.alignItems="center"
        document.body.style ='containerStyle'
        // document.body.style.width ="200px";
        // document.body.style.height="200px"
      };
  
      mediaRecorder.start();
  
      for (let frame = 0; frame < frames; frame++) {
        setTimeout(() => {
          drawFrame(extractedText, frame);
          mediaRecorder.requestData();
        }, frame * frameInterval);
      }
  
      setTimeout(() => {
        mediaRecorder.stop();
      }, frames * frameInterval);
    };
    
    startRecording();
  };
  

  return (
    <div className='text-center mx-auto justify-center'>
      <Navbar/>
      <br />
      <h2 className='text-3xl text-red-500 font-semibold'>Image to Video with Marquee</h2>
      <div>
        <p   className="animate-pulse font-bold focus:animate-none hover:animate-none inline-flex text-md 
                bg-purple-400 mt-3 px-4 py-2 rounded-lg tracking-wide text-black" aria-current="page"
                >Upload an image:</p>
             <br />
             <br />
        <ImageUploader onDrop={onDrop} />
      </div>
      {image && <img src={image} alt="Uploaded" style={{ maxWidth: '100%' }} />}
      {extractedText && <div className='text-purple-700 text-2xl font-bold'>Extracted Text: <br /><p className='text-xl font-serif text-pink-300'>{extractedText}</p></div>}
      {
        image &&
        <button onClick={createVideo}
        className="animate-pulse font-bold focus:animate-none hover:animate-none inline-flex text-md 
        bg-blue-400 mt-3 px-4 py-2 rounded-lg tracking-wide text-black" aria-current="page"
       >Create Video</button>}

       {/* <Footer/> */}
    </div>
  );
};

const ImageUploader = ({ onDrop }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} style={dropzoneStyle} className='text-green-600 font-mono  p-12'>

      <input {...getInputProps()} />
      {isDragActive ? <p>Drop the image here ...</p> : <p>Drag 'n' drop an image here, or click to select one</p>}
    </div>
  );
};

const dropzoneStyle = {
  border: '2px dashed #ccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};

export default Video;


