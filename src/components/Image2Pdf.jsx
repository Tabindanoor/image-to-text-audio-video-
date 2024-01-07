import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import Navbar from './Navbar';
import Footer from './Footer';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const TextToPdf = ({ imagePath }) => {
  const [text, setText] = useState('');

  const extractText = async() => {
    Tesseract.recognize(
      await imagePath,
      'eng',
      { logger: info => setText(text + info.word + ' ') }
    ).then(({ data: { text } }) => {
      setText(text);
    });
  };

  const createPdf = () => {
    const pdfContent = [{ text }];
    pdfMake.createPdf({ content: pdfContent }).download('textToPdf.pdf');
  };

  return (
    <div>
      <h2>Text to PDF</h2>
       
      <button
      
      className=" focus:animate-none hover:animate-none 
            inline-flex text-md font-medium bg-indigo-700 mt-3 px-4 py-2 rounded-lg tracking-wide 
            text-white"
      onClick={extractText}>Extract Text</button>
     
        {text !== undefined  && (
            <div>
            <br />
              <p className='text-xl text-green-400 font-semibold'>{text}</p>
</div>)
        }
  
  {/* &nbsp;&nbsp; */}
  <br />
        <button 
      className=" focus:animate-none hover:animate-none 
      inline-flex text-md font-medium bg-indigo-700 mt-3 px-4 py-2 rounded-lg tracking-wide 
      text-white"
      onClick={createPdf}>Create PDF</button>
    </div>
  );
};

const Image2Pdf = () => {
  const [imagePath, setImagePath] = useState(null);

  const handleImageChange = (event) => {
    setImagePath(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <div className='text-center '>
      <Navbar/>
      <div className='px-12'>
      <br />
      <h1 className='text-2xl text-orange-600  font-serif font-semibold'> Choose an Image </h1>
<br />
      <input type="file" accept="image/*" onChange={handleImageChange} />
      
      {imagePath && (
        <>
          <TextToPdf imagePath={imagePath} />
        </>
      )}
      </div>
     
      <Footer/>
    </div>
  );
};

export default Image2Pdf;
