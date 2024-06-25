/* eslint-disable import/no-extraneous-dependencies */
import {resolve} from 'path';
import path from 'path';

import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import postcssPresetEnv from 'postcss-preset-env';
import tailwindcss from 'tailwindcss';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@/': path.resolve(__dirname, './src'),
            '@/lib': path.resolve(__dirname, './src/lib'),
            '@/utils': path.resolve(__dirname, './src/lib/utils'),
            '@/components': path.resolve(__dirname, './src/lib/components'),
        },
    },
    plugins: [
        cssInjectedByJsPlugin(),
        react(),
        dts({insertTypesEntry: true, rollupTypes: true, exclude: ['src/demo']}),
    ],
    build: {
        sourcemap: true,
        lib: {
            // Could also be a dictionary or array of multiple entry points
            entry: resolve(__dirname, 'src/lib/index.ts'),
            name: 'react-full-year-scheduler',
            // the proper extensions will be added
            fileName: 'index',
        },
        rollupOptions: {
            external: ['react', 'react-dom', 'tailwindcss', 'dayjs'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    tailwindcss: 'tailwindcss',
                    dayjs: 'dayjs',
                },
            },
        },
    },
    css: {
        postcss: {
            plugins: [postcssPresetEnv({}), tailwindcss],
        },
    },
});
