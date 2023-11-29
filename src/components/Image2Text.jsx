import React, { useState, useRef } from 'react';
import Tesseract from 'tesseract.js';
import styled from 'styled-components';
import Example from './ButtonHover';
import Navbar from './Navbar';



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

const Image2Text = () => {
  const inputFileRef = useRef(null);
  const [imageSrc, setImageSrc] = useState('');
  const [textFromImage, setTextFromImage] = useState('');
  const [error, setError] = useState('');

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
  }


  return (
    <div>
      <Navbar />
       <Container>
      

      <h1 className='text-2xl font-extrabold font-serif '>Image to Text</h1>
      <br />

      <Input
        type="file"
        accept="image/*"
        ref={inputFileRef}
        onChange={handleFileChange}
        className='text-center justify-center bg-blue-400'
      />

      <Label onClick={() => inputFileRef.current.click()} 
      className="animate-bounce font-bold focus:animate-none hover:animate-none inline-flex text-md 
      bg-sky-500 mt-3 px-4 py-2 rounded-lg tracking-wide text-black" aria-current="page"
        
        >Choose Image</Label>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {imageSrc && (
        <div>
          <img src={imageSrc} alt="Selected" style={{ maxWidth: '100%' }} />

<br />
          {textFromImage && (
            <div>
              <h2 className='text-2xl font-extrabold font-serif '>Text from Image:</h2><br />
              <p className='text-xl text-green-400 font-semibold'>{textFromImage}</p>
<br />


              <Button onClick={speakText}
                className=" font-bold focus:animate-none hover:animate-none inline-flex text-md 
                bg-lime-400 mt-3 px-4 py-2 rounded-lg tracking-wide text-black" aria-current="page"
                 
                 >Speak Text</Button>

            </div>
          )}
 </div>)}     

    </Container>
    </div>
   
  );
};

export default Image2Text;

