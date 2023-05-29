/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sourcesanspro: ["Source Sans Pro", "sans-serif"],
        ibmplexmono: ["IBM Plex Mono", "sans-serif"],
      },
    },
  },
  plugins: [],
};
