import React,{useState} from "react";
import axios from "axios";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = async () => {
      try {
        await axios.post('http://localhost:5000/login', {
          username,
          password,
        });
  
        alert('Login successful');
      } catch (error) {
        console.error(error);
        alert('Invalid credentials');
      }
    };
  
    return (
      <div>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  };
  
 export default Login