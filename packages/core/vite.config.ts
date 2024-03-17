import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'path';
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    react(),
    dts({
      exclude: ['**/*.stories.tsx', '**/*.stories.ts'],
      outputDir: ['dist/es', 'dist/cjs'],
    }),
  ],
  build: {
    sourcemap: true,
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => {
        const name = entryName.includes('node_modules')
          ? `depend/${entryName.split('node_modules/').at(-1)!}`
          : '[name]';
        if (name === '[name]' && entryName.endsWith('.css')) {
          return `${format}/${entryName.replace(/\.css$/, '')}.${format === 'es' ? 'mjs' : 'js'}`;
        }
        switch (format) {
          case 'es':
            return `es/${name}.mjs`;
          case 'cjs':
            return `cjs/${name}.cjs`;
          default:
            throw new Error(`Unsupported format '${format}'`);
        }
      },
    },
    commonjsOptions: {
      include: [/\.js$/],
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          'react': 'React',
          'react-dom': 'ReactDOM',
        },
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
    },
  },
});
