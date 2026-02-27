import type { StorybookConfig } from '@storybook/nextjs-vite';

const config = {
  framework: '@storybook/nextjs-vite',
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  typescript: {
    reactDocgen: 'react-docgen',
  },
} satisfies StorybookConfig;

export default config;
