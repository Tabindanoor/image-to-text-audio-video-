// MainComponent.js
import React from 'react';
import { useTheme } from './ThemeContext';
import "./Login.css"

const MainComponent = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className={isDarkMode ? 'dark-mode' : 'light-mode'}>
      <h1>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</h1>
      <button className='text-center' onClick={toggleTheme}>{isDarkMode ? `Switch to Light Mode ` : 'Switch to Dark Mode'}</button>
     
    </div>
  );
};

export default MainComponent;

