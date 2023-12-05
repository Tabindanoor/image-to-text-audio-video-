// import React,{useState} from "react";
// import axios from "axios";
// import "./Login.css"
// import Navbar from "./Navbar";
// import { Link, Navigate } from "react-router-dom";

// const Login = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState(false);
//     const [success, setSuccess] = useState(false);
  

//     // const [username, setUsername] = useState('');
//     // const [password, setPassword] = useState('');
//     // const [success, setSuccess] = useState(false);
//     // const [error, setError] = useState(false);
  
  
//     const handleSignup = async () => {
//       try {
//         await axios.post('http://localhost:5000/signup', {
//           username,
//           password,
//         });
//      setSuccess(true)
//      setSuccess(false)
//         // alert('User created successfully');
//       } catch (error) {
//         // console.error(error);
//         // alert('Error creating user');
//         setError(true);
//         setError(false)
//       }
//     };

//     const handleLogin = async () => {
//       try {
//         await axios.post('http://localhost:5000/login', {
//           username,
//           password,
//         });
  
//         // alert('Login successful');
//         setSuccess(true);
//         Navigate("/dashboard");
//         // setSuccess(false);
//       } catch (error) {
//         // console.error(error);
//         // alert('Invalid credentials');
//         setError(true);
//         // setError(false);
//       }
//     };
  


//     return (
//       <div>
//         {/* <Navbar/> */}
//          <div className="container">
//         <div className="top"></div>
//         <div className="bottom"></div>
//         <div className="center">
//         <h2 className="text-center text-2xl font-semibold ">Login Page</h2><br />

//         {success && 
//           <p className="green-red-600 text-sm">Login Successful :)</p>
//         }

//         {error && 
//           <p className="text-red-600 text-sm">Invalid Credentails :(</p>
//         }

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
//         <br />
//         <button
//            className="animate-bounce focus:animate-none hover:animate-none inline-flex text-md font-medium
//            bg-sky-500 mt-3 px-4 py-2 rounded-lg tracking-wide text-black" aria-current="page"
  
//           onClick={handleLogin}>SignIn</button>
//         <h2>&nbsp;</h2>
//         <Link to={"/signup"}
//            className="animate-bounce focus:animate-none hover:animate-none inline-flex text-md font-medium
//            bg-sky-500 mt-3 px-4 py-2 rounded-lg tracking-wide text-black" aria-current="page"
  
//           >SIgn Up</Link>
//         </div>
//       </div>
//       </div>
     
//     );
//   };
  
//  export default Login


import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // Use the useHistory hook to get access to the history object
  const navigate = useNavigate();


  const handleSignup = async () => {
    try {
      await axios.post('http://localhost:5000/signup', {
        username,
        password,
      });
      setSuccess(true);
      // setSuccess(false);
    } catch (error) {
      setError(true);
      setError(false);
    }
  };

  const handleLogin = async () => {
    try {
      await axios.post('http://localhost:5000/login', {
        username,
        password,
      });

      // Login successful, navigate to the dashboard
      setSuccess(true);
      navigate("/dashboard",{state:{username}});
    } catch (error) {
      // setError(true);
      setError("invalid credentails");
    }
  };

  return (
    <div>
      <div className="container">
        <div className="top"></div>
        <div className="bottom"></div>
        <div className="center">
          <h2 className="text-center text-2xl font-semibold">Login Page</h2><br />

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
          <div className="flex justify-between">
             <button
            className="animate-bounce focus:animate-none hover:animate-none inline-flex text-md font-medium
            bg-sky-500 mt-3 px-4 py-2 rounded-lg tracking-wide text-black" aria-current="page"
            onClick={handleLogin}
          >
            SignIn
          </button>
          <h2>&nbsp;</h2>
          <Link
            to={"/signup"}
            className="animate-bounce focus:animate-none hover:animate-none inline-flex text-md font-medium
            bg-sky-500 mt-3 px-4 py-2 rounded-lg tracking-wide text-black" aria-current="page"
          >
            Sign Up
          </Link>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default Login;
