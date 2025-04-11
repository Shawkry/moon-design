import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'path';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
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
        vanillaExtractPlugin({
            identifiers: 'debug',
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
            external: ['react', 'react-dom', 'react/jsx-runtime'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                },
                preserveModules: true,
                preserveModulesRoot: 'src',
            },
        },
    },
});
