import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'happy-dom',
        setupFiles: './test/setupTests.js',
        css: true,
        include: ['**/*.test.?(c|m)[jt]s?(x)'],
    },
});
