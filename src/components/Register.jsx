import React,{useState} from 'react'
import axios from 'axios';
import "./Login.css"
import Navbar from './Navbar';
const Register = () => {
    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);


  const handleSignup = async () => {
    try {
      await axios.post('http://localhost:5000/signup', {
        username,
        password,
      });
   setSuccess(true)
   setSuccess(false)
      // alert('User created successfully');
    } catch (error) {
      // console.error(error);
      // alert('Error creating user');
      setError(true);
      setError(false)
    }
  };
  return (
    <div>
      <Navbar/>
      <div className="container" >
      
        <div className="top"></div>
        <div className="bottom"></div>
        <div className="center">
  
    <h2 className="text-center text-2xl font-semibold ">SignUp Page</h2><br />
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
    <button onClick={handleSignup}
      className="animate-bounce focus:animate-none hover:animate-none inline-flex text-md font-medium
      bg-sky-500 mt-3 px-4 py-2 rounded-lg tracking-wide text-black" aria-current="page"

>Signup</button>

  </div>
  </div>
    </div>
    

  )
}

export default Register