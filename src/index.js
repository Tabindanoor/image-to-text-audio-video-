import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Route, Routes,BrowserRouter} from "react-router-dom"
import Register from './components/Register';
import Login from './components/Login';
import Video from './components/Video';
import Image2Pdf from "./components/Image2Pdf"
import Image2Text from "./components/Image2Text"
import Navbar from './components/Navbar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>

  <React.StrictMode>
    <Navbar/>
    <Routes>
    <Route path='/' element={<App />} />
    <Route path="/signup" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route path="/video" element={<Video />} />
    <Route path="/image-2-pdf" element={<Image2Pdf />} />
    <Route path="/image-2-text" element={<Image2Text />} />
    </Routes>
  </React.StrictMode>
  </BrowserRouter>
 
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
