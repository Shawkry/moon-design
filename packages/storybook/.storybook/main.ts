import { fileURLToPath } from "node:url";
import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import { resolve, dirname } from 'path';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { createViteAliasUtil } from '../utils/createViteAliasUtil';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const packages = ['core'];
const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx',
    ...packages.flatMap((pkg) => `../../${pkg}/**/*.stories.@(js|jsx|ts|tsx)`),
  ],

  addons: [
    getAbsolutePath("@storybook/addon-onboarding"),
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@chromatic-com/storybook"),
    getAbsolutePath("@storybook/addon-docs")
  ],

  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },

  staticDirs: ['../public'],

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
    const existingAlias = Array.isArray(config.resolve?.alias)
      ? config.resolve.alias
      : config.resolve?.alias
        ? [config.resolve.alias]
        : [];
    return mergeConfig(config, {
      plugins: [vanillaExtractPlugin(), mdxFileProtocolAliasPlugin()],
      resolve: {
        alias: [...existingAlias, createViteAliasUtil('@', './src')],
      },
      build: {
        sourcemap: true,
        commonjsOptions: {
          include: [/\.js$/],
        },
      },
      optimizeDeps: {
        force: true,
        include: ['/node_modules/', 'core', '@mdx-js/react', 'markdown-to-jsx'],
      },
      server: {
        fs: {
          allow: [resolve(__dirname, '../..')],
        },
      },
    });
  }
};
export default config;

function getAbsolutePath(value: string): any {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}

/** Fix MDX imports: addon-docs emits file:// URLs which Vite cannot resolve. Resolve to package path. */
function mdxFileProtocolAliasPlugin() {
  let mdxShimPath: string;
  try {
    mdxShimPath = resolve(
      dirname(fileURLToPath(import.meta.resolve('@storybook/addon-docs/package.json'))),
      'dist/mdx-react-shim.js'
    );
  } catch {
    mdxShimPath = resolve(__dirname, '../../../node_modules/@storybook/addon-docs/dist/mdx-react-shim.js');
  }
  const fileProtocolRe = /(from\s+["'])file:\/\/[^"']*@storybook\/addon-docs[^"']*mdx-react-shim\.js(["'])/g;
  return {
    name: 'mdx-file-protocol-alias',
    enforce: 'pre' as const,
    resolveId(id: string) {
      if (id.startsWith('file://') && id.includes('@storybook/addon-docs') && id.includes('mdx-react-shim')) {
        return mdxShimPath;
      }
      if (id === '@storybook/addon-docs/dist/mdx-react-shim.js') {
        return mdxShimPath;
      }
      return null;
    },
    transform(code: string) {
      if (!fileProtocolRe.test(code)) return null;
      fileProtocolRe.lastIndex = 0;
      const newCode = code.replace(fileProtocolRe, '$1@storybook/addon-docs/dist/mdx-react-shim.js$2');
      return newCode !== code ? { code: newCode, map: null } : null;
    },
  };
}
