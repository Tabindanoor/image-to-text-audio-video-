// // src/context/DarkModeContext.js
// import React, { createContext, useContext, useState } from 'react';

// const DarkModeContext = createContext();

// const DarkModeProvider = ({ children }) => {
//   const [theme, setTheme] = useState('light');

//   const toggleTheme = () => {
//     setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
//   };

//   return (
//     <DarkModeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </DarkModeContext.Provider>
//   );
// };

// const useDarkMode = () => {
//   const context = useContext(DarkModeContext);
//   if (!context) {
//     throw new Error('useDarkMode must be used within a DarkModeProvider');
//   }
//   return context;
// };

// export { DarkModeProvider, useDarkMode };
