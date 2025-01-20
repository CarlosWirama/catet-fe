/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}

// npx tailwindcss -i ./src/style.css -o ./src/generated.css --watch
