/** @type {import('tailwindcss').Config} */
module.exports = {
  // Add the NativeWind preset
  presets: [require("nativewind/preset")],
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0077B6",
        secondary: "#00B4D8",
        accent: "#0096C7",
        background: "#F8F9FA",
        surface: "#FFFFFF",
        error: "#CF6679",
        success: "#4CAF50",
        warning: "#FF9800",
      },
    },
  },
  plugins: [],
};
