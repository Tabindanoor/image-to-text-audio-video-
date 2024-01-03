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

  const handleLogin = async () => {
    try {
        await axios.post('http://localhost:5001/login', {username,password });

        setSuccess(true);
        navigate("/dashboard", { state: { username } });
    } catch (error) {
        // setError(true);



        // is ko uncomment krna ha 
        // setUsername("");
        // setPassword("")
        // setError("Invalid credentials");
    }
};
  return (
    <div className="container">
      {/* <div className="container"> */}
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
            bg-sky-500 mt-3 px-4 py-2 rounded-lg bg-purple-400 tracking-wide text-black" aria-current="page"
            onClick={handleLogin}
          >
            SignIn
          </button>
          <h2>&nbsp;</h2>
          <Link
            to={"/signup"}
            className="animate-bounce focus:animate-none hover:animate-none inline-flex text-md font-medium
            bg-sky-500 mt-3 px-4 py-2 rounded-lg bg-orange-400 tracking-wide text-black" aria-current="page"
          >
            Sign Up
          </Link>
        
          </div>
         
        </div>
      {/* </div> */}
    </div>
  );
};

export default Login;


