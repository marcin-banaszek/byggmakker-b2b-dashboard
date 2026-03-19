import type { Config } from "tailwindcss";
import tailwindTheme from "./tailwind-theme";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: (tailwindTheme as unknown as { theme: { extend: { colors: Record<string, string> } } })
        .theme.extend.colors
    },
  },
  plugins: [],
};
export default config;
