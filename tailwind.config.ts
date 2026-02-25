import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        display: ["var(--font-display)"]
      },
      colors: {
        base: {
          50: "#f8fbff",
          100: "#eef4ff",
          900: "#0a1228",
          950: "#060b1a"
        },
        accent: {
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488"
        }
      },
      boxShadow: {
        glow: "0 0 30px rgba(45, 212, 191, 0.25)",
        neon: "0 0 0 1px rgba(112, 231, 255, 0.2), 0 16px 44px rgba(43, 183, 255, 0.22)"
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        },
        floatIn: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        pulseGrid: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.7" }
        }
      },
      animation: {
        shimmer: "shimmer 7s linear infinite",
        floatIn: "floatIn 0.8s ease forwards",
        pulseGrid: "pulseGrid 5s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
