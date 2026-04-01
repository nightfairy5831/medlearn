import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: {
          50: "#EEF2FF",
          100: "#E0E7FF",
          200: "#C7D2FE",
          300: "#A5B4FC",
          400: "#818CF8",
          500: "#6366F1",
          600: "#4F46E5",
          700: "#4338CA",
          800: "#3730A3",
          900: "#312E81",
        },
        secondary: {
          50: "#F0FDFA",
          100: "#CCFBF1",
          200: "#99F6E4",
          300: "#5EEAD4",
          400: "#2DD4BF",
          500: "#14B8A6",
          600: "#0D9488",
          700: "#0F766E",
          800: "#115E59",
          900: "#134E4A",
        },
        accent: {
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
          800: "#92400E",
          900: "#78350F",
        },
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #4F46E5 0%, #14B8A6 100%)",
        "gradient-accent": "linear-gradient(135deg, #4F46E5 0%, #F59E0B 100%)",
        "gradient-dark": "linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)",
        "gradient-sidebar": "linear-gradient(180deg, #1E1B4B 0%, #312E81 50%, #3730A3 100%)",
        "gradient-hero": "linear-gradient(135deg, #EEF2FF 0%, #F0FDFA 50%, #FFFBEB 100%)",
        "gradient-medical": "linear-gradient(135deg, #4F46E5 0%, #0D9488 50%, #14B8A6 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
