// import { motion } from "framer-motion";
// import { useState } from "react";
// // import { motion } from "framer-motion";
// import { useEffect, useRef } from "react";


// const SquishyCard = () => {
//   return (
//     <section className="bg-neutral-900 w-full ">
//       <div className="mx-auto w-fit">
//         <Card />
//       </div>
//     </section>
//   );
// };




// const Card = () => {
    
//     const [feedback, setFeedback] = useState('');
// const [error, setError] = useState('');
// const [success, setSuccess] = useState('');

// const handleSubmit = async () => {
//   try {
//     if (!feedback) {
//       setError('Please enter feedback.'); 
//       return;
//     }

//     const response = await fetch('http://localhost:5001/feedback', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ message: feedback }),
//     });

//     const result = await response.json();

//     if (result.success) {
//       setSuccess('Feedback submitted successfully');
//       setError(''); 
//     } else {
//       setError('Feedback submission failed');
//       setSuccess(''); 
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };
//   return (
//     <motion.div
//       whileHover="hover"
//       transition={{
//         duration: 1,
//         ease: "backInOut",
//       }}
//       variants={{
//         hover: {
//           scale: 1.05,
//         },
//       }}
//       className="relative h-[700px] w-[500px] shrink-0 overflow-hidden rounded-xl bg-indigo-500 p-8"
//     >
//       <div className="relative z-10 text-white">
       
//         <motion.span
//           initial={{ scale: 0.85 }}
//           variants={{
//             hover: {
//               scale: 1,
//             },
//           }}
//           transition={{
//             duration: 1,
//             ease: "backInOut",
//           }}
//           className="my-2 block origin-top-left font-mono text-6xl font-black leading-[1.2]"
//         >
//         <textarea
//           className="bg-transparent p-3 rounded border-2 border-blue-900"
//           rows="4"
//           cols="13"
//           value={feedback}
//           onChange={(e) => setFeedback(e.target.value)}
//         />
//         <br />
//         <button
//           className="text-xl font-semibold text-white bg-purple-500 hover:bg-purple-700 py-2 px-4 rounded transition duration-300 transform hover:scale-105"
//           onClick={handleSubmit}
//         >
//           Submit Feedback
//         </button>
//           <br />
//         </motion.span>
        
//       </div>
     
//       <Background />
//     </motion.div>
//   );
// };

// const Background = () => {
//   return (
//     <motion.svg
//       width="320"
//       height="384"
//       viewBox="0 0 320 384"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//       className="absolute inset-0 z-0"
//       variants={{
//         hover: {
//           scale: 1.5,
//         },
//       }}
//       transition={{
//         duration: 1,
//         ease: "backInOut",
//       }}
//     >
//       <motion.circle
//         variants={{
//           hover: {
//             scaleY: 0.5,
//             y: -25,
//           },
//         }}
//         transition={{
//           duration: 1,
//           ease: "backInOut",
//           delay: 0.2,
//         }}
//         cx="160.5"
//         cy="114.5"
//         r="101.5"
//         fill="#262626"
//       />
//       <motion.ellipse
//         variants={{
//           hover: {
//             scaleY: 2.25,
//             y: -25,
//           },
//         }}
//         transition={{
//           duration: 1,
//           ease: "backInOut",
//           delay: 0.2,
//         }}
//         cx="160.5"
//         cy="265.5"
//         rx="101.5"
//         ry="43.5"
//         fill="#262626"
//       />
//     </motion.svg>
//   );
// };


import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const ButtonWrapper = () => {
  return (
    <div className="flex min-h-[200px] items-center justify-center bg-pink-500 px-4">
      <SpotlightButton />
    </div>
  );
};

const SpotlightButton = () => {
  const btnRef = useRef(null);
  const spanRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { width } = e.target.getBoundingClientRect();
      const offset = e.offsetX;
      const left = `${(offset / width) * 100}%`;

      spanRef.current.animate({ left }, { duration: 250, fill: "forwards" });
    };

    const handleMouseLeave = () => {
      spanRef.current.animate(
        { left: "50%" },
        { duration: 100, fill: "forwards" }
      );
    };

    btnRef.current.addEventListener("mousemove", handleMouseMove);
    btnRef.current.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      btnRef.current.removeEventListener("mousemove", handleMouseMove);
      btnRef.current.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <motion.button
      whileTap={{ scale: 0.985 }}
      ref={btnRef}
      className="relative w-full max-w-xs overflow-hidden rounded-lg bg-pink-200 px-4 py-3 text-lg font-medium text-blue"
    >
      <span className="pointer-events-none relative z-10 mix-blend-difference text-black">
        Submit Feedback
      </span>
      <span
        ref={spanRef}
        className="pointer-events-none absolute left-[50%] top-[50%] h-32 w-32 -translate-x-[50%] -translate-y-[50%] rounded-full bg-purple-500"
      />
    </motion.button>
  );
};

export default ButtonWrapper;