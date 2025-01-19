/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,tsx}", "index.html"],
  theme: {
    extend: {},
  },
  plugins: [],
}

// npx tailwindcss -i ./src/style.css -o ./src/generated.css --watch
