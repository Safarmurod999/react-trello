/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-pink": "#8F3F66",
        "light-pink": "#AA6D8A",
        "dark-bg": "#101204",
        "dark-gray": "#22272B",
        "text-color": "#89929D",
        "nav-bg": "#1D2125",
        "blue-color": "#579DFF",
      },
    },
  },
  plugins: [],
};
