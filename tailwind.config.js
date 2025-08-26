/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        safir: ['Safir', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      // --- ADD THE NEW COLORS INSIDE colors {} ---
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // --- ADDED YOUR COLORS HERE ---
        green: '#017666',
        gold: '#BE8A27',
        zolGreen: '#017666',
        zolGold: '#BE8A27',
        // Бичвэрийн үндсэн өнгийг нэмж өгвөл зүгээр
        zolDark: '#333333',
      },
      //  ... other theme customizations can go here ...
      gridTemplateColumns:{
        'auto': 'repeat(auto-fit, minmax(200px, 1fr))'
      },
    },
  },
  plugins: [],
};