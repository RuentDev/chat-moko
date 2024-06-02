import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "linear-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        'primaryColor': '#1A202C',
        'secondaryColor': '#D9D9D9',
        'custom-yellow': '#FFCD29',
      },
      fontSize: {
        "fontHeadingPrimary": "24px",
      },

      colors: {
        "fontColor": "#746464",
        'borderColor': '#FFCD29',
        'borderbgcolor': '#ECECEC'
      }

    },

  },
  plugins: [],
};
export default config;
