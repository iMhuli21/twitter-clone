import type { Config } from "tailwindcss";

import { withUt } from "uploadthing/tw";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        myWhite: "#fefae0",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        pt: ["PT Sans", "sans-serif"],
      },
    },
  },

  daisyui: {
    themes: ["dark", "light"],
  },
  plugins: [require("daisyui")],
};

export default withUt(config);
