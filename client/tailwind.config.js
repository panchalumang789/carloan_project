/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary-color-1": "#023641",
        "primary-color-2": "#276F77",
        "primary-color-3": "#558F96",
        "primary-color-4": "#001118",
        "primary-color-5": "#e3f6f5",
        "primary-color-6": "#042830",
        "primary-color-7": "#fefefe",
        "primary-color-8": "#1B2430",
        "primary-color-9": "#273950",
        "primary-color-10": "#cce3de",
        "primary-color-11": "#194e6e",
        // "primary-color-5": "#A3BEBE",
        // "primary-color-5": "#fffffe",
        // "primary-color-7": "#e0f5f5",
        // "primary-color-8": "#222831",
        // "primary-color-8": "#0a0603",
        // "primary-color-5": "#FAEAFF",
        // "primary-color-5": "#E3E2DF",
        // "primary-color-10": "#937EB1",
        // "primary-color-11": "#34587fd4",
        // "primary-color-11": "#31708E",
        "navbar-primary-color-1": "#A3BEBE",
        
      },
      gridTemplateColumns: {
        "user-display": "4fr 4fr 1fr",
      },
    },
  },
  plugins: [],
};
