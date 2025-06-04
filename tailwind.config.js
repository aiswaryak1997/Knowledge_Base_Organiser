module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",      // For App Router (Next.js 13+)
    "./pages/**/*.{js,ts,jsx,tsx}",    // For Pages Router
    "./components/**/*.{js,ts,jsx,tsx}", // If you keep components separately
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}