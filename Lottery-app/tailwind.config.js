/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // Include your main HTML file
    "C:/Users/hassa/OneDrive/Desktop/lottery/Lottery-app/src/**/*.{js,ts,jsx,tsx}", // Scan all files in the src folder for Tailwind classes
    "./node_modules/flowbite/**/*.js", // Include Flowbite files for scanning
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'), // Add Flowbite plugin
  ],
};
