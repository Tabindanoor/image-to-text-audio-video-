/** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }


const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: [ "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {},
  },
  plugins: [],
});

// module.exports = {
//   content: [
   
//   ],
//   // darkMode:"class",
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }
