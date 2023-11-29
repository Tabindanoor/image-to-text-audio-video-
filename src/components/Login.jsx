import React,{useState} from "react";
import axios from "axios";
import "./Login.css"
import Navbar from "./Navbar";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
  
    const handleLogin = async () => {
      try {
        await axios.post('http://localhost:5000/login', {
          username,
          password,
        });
  
        // alert('Login successful');
        setSuccess(true)
        // setSuccess(false);
      } catch (error) {
        // console.error(error);
        // alert('Invalid credentials');
        setError(true);
        // setError(false);
      }
    };
  


    return (
      <div>
        <Navbar/>
         <div className="container">
        <div className="top"></div>
        <div className="bottom"></div>
        <div className="center">
        <h2 className="text-center text-2xl font-semibold ">Login Page</h2><br />

        {success && 
          <p className="green-red-600 text-sm">Login Successful :)</p>
        }

        {error && 
          <p className="text-red-600 text-sm">Invalid Credentails :(</p>
        }

        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          className="border-2 border-blue-300 rounded-xl p-2"
        />
    
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="border-2 border-blue-300 rounded-xl p-2 mt-2"

        />
        <br />
        <button
           className="animate-bounce focus:animate-none hover:animate-none inline-flex text-md font-medium
           bg-sky-500 mt-3 px-4 py-2 rounded-lg tracking-wide text-black" aria-current="page"
  
          onClick={handleLogin}>SignIn</button>
        <h2>&nbsp;</h2>
        </div>
      </div>
      </div>
     
    );
  };
  
 export default Login



// import React, { useState } from 'react';
// import axios from 'axios';
// import "./Login.css";

// const Register = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState(null);

//   const handleSignup = async () => {
//     try {
//       await axios.post('http://localhost:5000/signup', {
//         username,
//         password,
//       });
//       setMessage({ type: 'success', text: 'Signup Successful :)' });
//       setUsername("")
//       setPassword("")
//     } catch (error) {
//       setMessage({ type: 'error', text: 'Invalid Credentials :(' });
//       setUsername("")
//       setPassword("")
//     }
//   };

//   return (
//     <div className="container">
//       <div className="top"></div>
//       <div className="bottom"></div>
//       <div className="center">
//         <h2 className="text-center text-2xl font-semibold">Login Page</h2><br />

//         {message && (
//           <p className={message.type === 'success' ? 'text-green-600' : 'text-red-600'} text-sm>
//             {message.text}
//           </p>
//         )}

//         <input
//           type="text"
//           placeholder="Username"
//           onChange={(e) => setUsername(e.target.value)}
//           className="border-2 border-blue-300 rounded-xl p-2"
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           onChange={(e) => setPassword(e.target.value)}
//           className="border-2 border-blue-300 rounded-xl p-2 mt-2"
//         />

//         <button
//           onClick={handleSignup}
//           className="animate-bounce focus:animate-none hover:animate-none inline-flex text-md font-medium
//           bg-sky-500 mt-3 px-4 py-2 rounded-lg tracking-wide text-black"
//           aria-current="page"
//         >
//           Signup
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Register;
