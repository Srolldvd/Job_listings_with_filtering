/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-clr)",
        secondary: "var(--secondary-clr)",
        accent: {
          100: "var(--accent-clr-100)",
          200: "var(--accent-clr-200)",
          300: "var(--accent-clr-300)",
        },
      },
      backgroundImage: {
        "hero-mobile": "url('/src/assets/images/bg-header-mobile.svg')",
        "hero-desktop": "url('/src/assets/images/bg-header-desktop.svg')",
        remove: "url('/src/assets/images/icon-remove.svg')",
      },
    },
  },
  plugins: [],
};
