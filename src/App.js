// import React, { useState, useRef } from 'react';
// import Tesseract from 'tesseract.js';
// import styled from 'styled-components';
// import VideoEditor from 'react-html5-video-editor';


// const Container = styled.div`
//   max-width: 600px;
//   margin: auto;
//   text-align: center;
//   padding: 20px;
//   background:orange;
// `;

// const Input = styled.input`
//   display: none;
// `;

// const Label = styled.label`
//   padding: 10px;
//   margin: 10px;
//   cursor: pointer;
//   border: 1px solid #ccc;
//   border-radius: 5px;
// `;

// const Button = styled.button`
//   padding: 10px;
//   margin: 10px;
//   cursor: pointer;
// `;

// const App = () => {
//   const inputFileRef = useRef(null);
//   const [imageSrc, setImageSrc] = useState('');
//   const [textFromImage, setTextFromImage] = useState('');
//   const [error, setError] = useState('');
//   const [isVideoEditorOpen, setIsVideoEditorOpen] = useState(false);

//   const handleFileChange = async (event) => {
//     const file = event.target.files[0];

//     if (file) {
//       try {
//         const imageSrc = URL.createObjectURL(file);
//         setImageSrc(imageSrc);
//         convertImageToText(imageSrc);
//       } catch (error) {
//         setError('Error loading the image. Please try again.');
//       }
//     }
//   };

//   const convertImageToText = async (imageSrc) => {
//     try {
//       const { data: { text } } = await Tesseract.recognize(imageSrc, 'eng', {
//         logger: info => console.log(info),
//       });

//       setTextFromImage(text);
//       setError('');
//     } catch (error) {
//       setError('Error processing image. Please try again.');
//     }
//   };

//   const speakText = () => {
//     if (textFromImage) {
//       const synth = window.speechSynthesis;
//       const utterance = new SpeechSynthesisUtterance(textFromImage);
//       synth.speak(utterance);
//     }
//   };

//   const handleVideoEditorClose = () => {
//     setIsVideoEditorOpen(false);
//   };

//   const handleGenerateVideo = () => {
//     setIsVideoEditorOpen(true);
//   };



//   return (
//     <Container>
//       <h1>Image to Text</h1>

//       <Input
//         type="file"
//         accept="image/*"
//         ref={inputFileRef}
//         onChange={handleFileChange}
//       />
//       <Label onClick={() => inputFileRef.current.click()}>Choose Image</Label>

//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       {imageSrc && (
//         <div>
//           <img src={imageSrc} alt="Selected" style={{ maxWidth: '100%' }} />

//           {textFromImage && (
//             <div>
//               <h2>Text from Image:</h2>
//               <p>{textFromImage}</p>

//               <Button onClick={speakText}>Speak Text</Button>

//             </div>
//           )}
//  </div>)}


// {
//   textFromImage &&
//   (

//     <Button onClick={handleGenerateVideo}>Generate Video</Button>
//   )
// }


// { isVideoEditorOpen  && (
//             <VideoEditor
//               text={textFromImage}
//               onVideoEditClose={handleVideoEditorClose}
//             />
//           )}
       

//     </Container>
//   );
// };

// export default App;






// import React, { useState, useRef } from 'react';
// import Tesseract from 'tesseract.js';

// const App = () => {
//   const inputFileRef = useRef(null);
//   const [imageSrc, setImageSrc] = useState('');
//   const [textFromImage, setTextFromImage] = useState('');
//   const [selectedVideo, setSelectedVideo] = useState(null);
//   const [error, setError] = useState('');

//   const handleImageUpload = async (event) => {
//     const file = event.target.files[0];

//     if (file) {
//       try {
//         const imageSrc = URL.createObjectURL(file);
//         setImageSrc(imageSrc);
//         await convertImageToText(imageSrc);
//       } catch (error) {
//         setError('Error loading the image. Please try again.');
//       }
//     }
//   };

//   const convertImageToText = async (imageSrc) => {
//     try {
//       const { data: { text } } = await Tesseract.recognize(imageSrc, 'eng');
//       setTextFromImage(text);
//       setError('');
//     } catch (error) {
//       setError('Error processing image. Please try again.');
//     }
//   };

//   const handleVideoUpload = (event) => {
//     const file = event.target.files[0];
//     setSelectedVideo(file);
//   };

//   const handleGenerateVideo = async () => {
//     if (textFromImage && selectedVideo) {
//       const inputVideoPath = URL.createObjectURL(selectedVideo);
  
//       const video = document.createElement('video');
//       video.crossOrigin = 'anonymous';
//       video.src = inputVideoPath;
  
//       video.onloadedmetadata = () => {
//         const canvas = document.createElement('canvas');
//         const ctx = canvas.getContext('2d');
//         canvas.width = video.videoWidth;
//         canvas.height = video.videoHeight;
  
//         ctx.drawImage(video, 0, 0);
//         ctx.font = '30px Arial';
//         ctx.fillStyle = 'white';
//         ctx.fillText(textFromImage, canvas.width/2, canvas.height/2 );
  
//         const stream = canvas.captureStream();
//         const mediaRecorder = new MediaRecorder(stream);
//         const chunks = [];
  
//         mediaRecorder.ondataavailable = (e) => {
//           if (e.data.size > 0) {
//             chunks.push(e.data);
//           }
//         };
  
//         mediaRecorder.onstop = () => {
//           const outputBlob = new Blob(chunks, { type: 'video/webm' });
//           const outputVideoUrl = URL.createObjectURL(outputBlob);
  
//           const outputVideo = document.createElement('video');
//           outputVideo.src = outputVideoUrl;
//           outputVideo.controls = true;
//         // outputVideo.autoplay = true;
//         outputVideo.style.width="500px" 
//         outputVideo.style.height="500px" 
  
//           // Append the output video to the DOM
         
//           document.body.appendChild(outputVideo);        };
  
//         mediaRecorder.start();
//         video.play();
  
//         setTimeout(() => {
//           mediaRecorder.stop();
//         }, 5000); // Adjust the duration as needed
//       };
//     } else {
//       setError('Please choose an image and upload a video before generating the new video.');
//     }
//   };
  
//   return (
//     <div>
//       <h1>Image to Video Converter</h1>

//       <input type="file" accept="image/*" ref={inputFileRef} onChange={handleImageUpload} />
//       <br />
//       {imageSrc && <img src={imageSrc} alt="Selected" style={{ maxWidth: '100%' }} />}
//       <br />
//       {textFromImage && <p>Text from Image: {textFromImage}</p>}
//       <br />

//       <input type="file" accept="video/*" onChange={handleVideoUpload} />
//       <br />
//       {selectedVideo && <p>Selected Video: {selectedVideo.name}</p>}
//       <br />

//       <button onClick={handleGenerateVideo}>Generate Video</button>
//       <br />
//       {error && <p style={{ color: 'red' }}>{error}</p>}
      
//     </div>
//   );
// };

// export default App;




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
