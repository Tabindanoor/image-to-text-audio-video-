import React, { useState } from 'react';

const Feedback = () => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5001/feedback', { message: feedback })

      const result = await response.json();

      if (result.success) {
        console.log('Feedback submitted successfully');
        // Handle success, e.g., show a confirmation message
      } else {
        console.error(result.error);
        // Handle error, e.g., show an error message
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
        <div className="bg-gradient p-16 h-screen">
      <h1 className="text-4xl font-semibold text-white">Feedback Form</h1>
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
    </div>
  );
};

export default Feedback;


