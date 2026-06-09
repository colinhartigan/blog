import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        ViteImageOptimizer({
            jpeg: { quality: 75 },
            // svg: {
            //     plugins: [{ name: 'removeViewBox', active: false }, { name: 'sortAttrs' }],
            // },
        }),
    ],
    assetsInclude: ['**/*.md'],
    base: './',
    root: './',
    // publicDir: "public",
    build: {
        outDir: 'dist',
    },
});
