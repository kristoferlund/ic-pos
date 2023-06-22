/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/index.html", "./src/icpos_frontend/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
