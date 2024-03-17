import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import { resolve } from 'path';
const packages = ['core'];
const config: StorybookConfig = {
  stories: packages.flatMap((pkg) => ['../stories/**/*.mdx', `../../${pkg}/**/*.stories.@(js|jsx|ts|tsx)`]),
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  staticDirs: ['../public'],
  docs: {
    autodocs: true,
  },
  core: {
    disableWhatsNewNotifications: true,
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
      exclude: [...packages.map((pkg) => resolve(__dirname, `../../${pkg}/**/*.stories.tsx`)), 'node_modules', 'dist'],
      include: packages.map((pkg) => resolve(__dirname, `../../${pkg}/**/*.@(tsx|ts)`)),
      compilerOptions: {
        allowSyntheticDefaultImports: true,
        esModuleInterop: false,
        paths: {
          '@/*': packages.map((pkg) => resolve(__dirname, `../../${pkg}/src/*`).replace(/\\/g, '/')),
        },
      },
    },
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      build: {
        sourcemap: true,
        commonjsOptions: {
          include: [/\.js$/],
        },
      },
      optimizeDeps: {
        force: true,
        include: ['/node_modules/', 'core'],
      },
    });
  },
};
export default config;
