import React,{useState} from 'react'
import axios
 from 'axios';
const Register = () => {
    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      await axios.post('http://localhost:5000/signup', {
        username,
        password,
      });

      alert('User created successfully');
    } catch (error) {
      console.error(error);
      alert('Error creating user');
    }
  };
  return (
    <div>
    <h2>Signup</h2>
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
    <button onClick={handleSignup}>Signup</button>
  </div>
  )
}

export default Register