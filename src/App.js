

import React from 'react'
import { Link } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <Link to={"/"}>app home </Link>
      <Link to={"/login"}>login </Link>
      <Link to={"/signup"}>signup </Link>
      <Link to={"/video"}>video </Link>
      <Link to={"/image-2-pdf"}>pdf </Link>
      <Link to={"/image-2-text"}>text audio </Link>
    </div>
  )
}

export default App

// import React, { useState } from 'react';
// import axios from 'axios';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// const Home = () => <h2>Home</h2>;

// const Signup = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSignup = async () => {
//     try {
//       await axios.post('http://localhost:5000/signup', {
//         username,
//         password,
//       });

//       alert('User created successfully');
//     } catch (error) {
//       console.error(error);
//       alert('Error creating user');
//     }
//   };

//   return (
//     <div>
//       <h2>Signup</h2>
//       <input
//         type="text"
//         placeholder="Username"
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={handleSignup}>Signup</button>
//     </div>
//   );
// };

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async () => {
//     try {
//       await axios.post('http://localhost:5000/login', {
//         username,
//         password,
//       });

//       alert('Login successful');
//     } catch (error) {
//       console.error(error);
//       alert('Invalid credentials');
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <input
//         type="text"
//         placeholder="Username"
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// };

// const App = () => {
//   return (
//     <Router>
//       <div>
//         <nav>
//           <ul>
//             <li>
//               <Link to="/">Home</Link>
//             </li>
//             <li>
//               <Link to="/signup">Signup</Link>
//             </li>
//             <li>
//               <Link to="/login">Login</Link>
//             </li>
//           </ul>
//         </nav>

//         <hr />

//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/login" element={<Login />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;
