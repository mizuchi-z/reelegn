import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#080F1A",
        surface: "#0D1826",
        surface2: "#111F30",
        cyan: {
          DEFAULT: "#00B4D8",
          dim: "rgba(0,180,216,0.15)",
          glow: "rgba(0,180,216,0.3)",
        },
        border: "rgba(0,180,216,0.12)",
        purple: "#A78BFA",
        green: "#34D399",
        orange: "#FB923C",
        text: {
          DEFAULT: "#E8EFF6",
          muted: "#5A7089",
        },
      },
      fontFamily: {
        orbitron: ["Orbitron", "sans-serif"],
        sans: ["DM Sans", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        card: "8px",
        input: "6px",
        badge: "4px",
      },
      boxShadow: {
        cyan: "0 0 20px rgba(0,180,216,0.2)",
        "cyan-sm": "0 0 10px rgba(0,180,216,0.15)",
      },
    },
  },
  plugins: [],
};
export default config;
