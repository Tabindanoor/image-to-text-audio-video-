import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const TextToPdf = ({ imagePath }) => {
  const [text, setText] = useState('');

  const extractText = () => {
    Tesseract.recognize(
      imagePath,
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
      <button onClick={extractText}>Extract Text</button>
      <button onClick={createPdf}>Create PDF</button>
    </div>
  );
};

// const TextToPpt = ({ text }) => {
//   const createPpt = () => {
//     // Basic approach: each line of text becomes a slide
//     const pptContent = text.split('\n').map(line => ({ text: line }));
//     const pptDefinition = { content: pptContent };
//     pdfMake.createPdf(pptDefinition).download('textToPpt.pdf');
//   };

//   return (
//     <div>
//       {/* <h2>Text to PPT</h2> */}
//       <button onClick={createPpt}>Create PPT</button>
//     </div>
//   );
// };

const Image2Pdf = () => {
  const [imagePath, setImagePath] = useState(null);

  const handleImageChange = (event) => {
    setImagePath(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {imagePath && (
        <>
          <TextToPdf imagePath={imagePath} />
          {/* <TextToPpt text="Extracted text will appear here" /> */}
        </>
      )}
    </div>
  );
};

export default Image2Pdf;
