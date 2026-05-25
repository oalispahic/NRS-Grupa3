import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  const isTest = !!process.env.VITEST;

  return {
    plugins: [react()],
    resolve: {
      alias: isTest
        ? { recharts: path.resolve(__dirname, 'src/test/rechartsStub.jsx') }
        : {},
    },
    test: {
      environment: 'jsdom',
      setupFiles: './src/test/setupTests.js',
      globals: true,
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true,
        },
      },
    },
  };
});
