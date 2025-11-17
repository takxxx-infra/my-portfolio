import type { Config } from "tailwindcss";

const tagColors = {
  aws: "#7EC3D0",
  terraform: "#6DA3B5",
  serverless: "#9FC9A6",
  container: "#7FB2A8",
  kubernetes: "#4F87A2",
  docker: "#5CA9C2",
  linux: "#A0B18C",
  networking: "#C0D6C2",
  security: "#F2A5A0",
  automation: "#E7C18D",
  cost: "#F6D8B5",
  data: "#C6B6E1",
  observability: "#B0A0C0",
  devops: "#86B5B2",
  iac: "#5F8C94",
  cicd: "#8ED0C3",
  python: "#F7C87C",
  go: "#9ED3D2",
  typescript: "#7AA9E6",
  database: "#D5B89E",
} as const;

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        tag: tagColors,
      },
      fontFamily: {
        display: ["\"Press Start 2P\"", "cursive"],
      },
    },
  },
  plugins: [],
} satisfies Config;
