/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        background: "#F8F6F0",
        primaryPink: "#F1B3D9",
        primaryPurple: "#A3A6FD",
        primaryYellow: "#F7D78A",
        darkBlack: "#25292C",
        lightBlack: "#E5E5E5",
        primaryGreen: "#C7D0BD",
        lightWhite: "#7B7C81"
      },
      keyframes:{
        popup: {
          "0%":{
            transform: "scale(0,0)"
          }
        },
        moveUp:{
          "0%": {
            transform: "translateY(1000px)"
          },
          "100%":{
            transform: "translateY(0px)"
          }
        }
      }  ,
      animation:{
        popup: "popup 0.1s ease-in",
        moveUp: "moveup 1s ease-in"
      } 
    },
  },
  plugins: [],
}
