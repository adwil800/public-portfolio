import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      padding: {
        "6vh": "6vh",
      },
      margin: {
        "6vh": "6vh",
      },
      height: {
        "screen-98": "98.6vh",
        "screen-95": "95vh",
        "screen-half-appbar": "calc(100vh - 40px)",
        "screen-appbar": "calc(100vh - 77px)",
      },
      fontSize: {
        "fs-15": "15px !important",
        "fs-16": "16px !important",
        "fs-17": "17px !important",
      },
      colors: {
        primary: "var(--primary) !important",
        secondary: "var(--secondary) !important",
        accent: "var(--accent) !important",
        foreground: "var(--foreground) !important",
        muiPrimary: "var(--mui-primary) !important",
      },
      screens: {
        xs: "0px", 
        md: "960px",
      },
    },
  },
  plugins: [],
};
export default config;
