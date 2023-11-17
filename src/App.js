import React, { useState, useRef } from 'react';
import Tesseract from 'tesseract.js';
import styled from 'styled-components';
import VideoEditor from 'react-html5-video-editor';


const Container = styled.div`
  max-width: 600px;
  margin: auto;
  text-align: center;
  padding: 20px;
`;

const Input = styled.input`
  display: none;
`;

const Label = styled.label`
  padding: 10px;
  margin: 10px;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  margin: 10px;
  cursor: pointer;
`;

const App = () => {
  const inputFileRef = useRef(null);
  const [imageSrc, setImageSrc] = useState('');
  const [textFromImage, setTextFromImage] = useState('');
  const [error, setError] = useState('');
  const [isVideoEditorOpen, setIsVideoEditorOpen] = useState(false);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      try {
        const imageSrc = URL.createObjectURL(file);
        setImageSrc(imageSrc);
        convertImageToText(imageSrc);
      } catch (error) {
        setError('Error loading the image. Please try again.');
      }
    }
  };

  const convertImageToText = async (imageSrc) => {
    try {
      const { data: { text } } = await Tesseract.recognize(imageSrc, 'eng', {
        logger: info => console.log(info),
      });

      setTextFromImage(text);
      setError('');
    } catch (error) {
      setError('Error processing image. Please try again.');
    }
  };

  const speakText = () => {
    if (textFromImage) {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(textFromImage);
      synth.speak(utterance);
    }
  };

  const handleVideoEditorClose = () => {
    setIsVideoEditorOpen(false);
  };

  const handleGenerateVideo = () => {
    setIsVideoEditorOpen(true);
  };

  return (
    <Container>
      <h1>Image to Text</h1>

      <Input
        type="file"
        accept="image/*"
        ref={inputFileRef}
        onChange={handleFileChange}
      />
      <Label onClick={() => inputFileRef.current.click()}>Choose Image</Label>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {imageSrc && (
        <div>
          <img src={imageSrc} alt="Selected" style={{ maxWidth: '100%' }} />

          {textFromImage && (
            <div>
              <h2>Text from Image:</h2>
              <p>{textFromImage}</p>

              <Button onClick={speakText}>Speak Text</Button>

              <Button onClick={handleGenerateVideo}>Generate Video</Button>
            </div>
          )}

{isVideoEditorOpen && (
            <VideoEditor
              text={textFromImage}
              onVideoEditClose={handleVideoEditorClose}
            />
          )}
        </div>
      )}
    </Container>
  );
};

export default App;
