import React, { useState } from 'react';
import Navbar from "./Navbar"
import Footer from "./Footer"
import Motion from "./ButtonWrapper"
import ButtonWrapper from './ButtonWrapper';
const Feedback = () => {
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async () => {
    try {
      if (!feedback) {
        setError('Please enter feedback.'); 
        return;
      }

      const response = await fetch('http://localhost:5001/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: feedback }),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess('Feedback submitted successfully');
        setError(''); 
      } else {
        setError('Feedback submission failed');
        setSuccess(''); 
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
       <Navbar/>
      <div className="bg-gradient p-16 ">
       
        <div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
        <h1 className="text-4xl font-semibold text-black">Feedback Form</h1>
        <textarea
          className="border p-3 rounded bg-light-blue-100"
          rows="4"
          cols="50"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <br />
        <button
          className="text-xl font-semibold text-white bg-purple-500 hover:bg-purple-700 py-2 px-4 rounded transition duration-300 transform hover:scale-105"
          onClick={handleSubmit}
        >
          Submit Feedback
        </button>
      
      </div>
      {/* <ButtonWrapper/> */}
      <Footer/>
    </div>
  );
};

export default Feedback;
