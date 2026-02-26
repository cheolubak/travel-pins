import type { StorybookConfig } from "@storybook/nextjs-vite";

const config = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  framework: "@storybook/nextjs-vite",
  typescript: {
    reactDocgen: "react-docgen",
  },
} satisfies StorybookConfig;

export default config;
