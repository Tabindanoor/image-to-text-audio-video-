import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Route, Routes,BrowserRouter} from "react-router-dom"
import Register from './components/Register';
import Login from './components/Login';
import Video from './components/Video';
import Image2Pdf from "./components/Image2Pdf"
import Image2Text from "./components/Image2Text"
import Navbar from './components/Navbar';
import ChangeMode from './components/ChangeMode'
import { ThemeProvider } from './components/ThemeContext';
// import Navbar from './components/Navbar';
// import { DarkModeProvider } from './context/DarkModeContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<BrowserRouter>
<ThemeProvider>
  <React.StrictMode>
    <Routes>
    <Route  path='/dashboard' element={<App />} />
    <Route  path='/' element={<Login />} />
    <Route path="/signup" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route path="/video" element={<Video />} />
    <Route path="/image-2-pdf" element={<Image2Pdf />} />
    <Route path="/image-2-text" element={<Image2Text />} />
    <Route path="/changemode" element={<ChangeMode />} />
    {/* <Route path="/navbar" element={<Navbar />} /> */}

    </Routes>
    </React.StrictMode>
    </ThemeProvider>
  </BrowserRouter>
 
 
);

