import React,{useState} from 'react'
import axios from 'axios';
import "./Login.css"
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);


  const navigate = useNavigate()

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:5001/signup', { username, password });
      console.log(response.data.message);
      setError('');
      navigate("/dashboard",{username:username});
    } catch (error) {
      setError(error.response.data.error);
    }
  };


  return (
    <div>
      {/* <Navbar/> */}
      <div className="container" >
      
        <div className="top"></div>
        <div className="bottom"></div>
        <div className="center">

      <h2>Register</h2>
      <div>{error && <p style={{ color: 'red' }}>{error}</p>}</div>
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)}
      className="border-2 border-blue-300 rounded-xl p-2" />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}
      className="border-2 border-blue-300 rounded-xl p-2 mt-2"
      />
      <button onClick={handleSignup}
       className="animate-bounce focus:animate-none hover:animate-none inline-flex text-md font-medium
      bg-sky-500 mt-3 px-4 py-2 rounded-lg tracking-wide text-black" aria-current="page">Register</button>

  </div>
  </div>
    </div>
    

  )
}

export default Register