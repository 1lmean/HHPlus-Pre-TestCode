/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'esnext',
    outDir: 'build',
  },
  server: {
    port: 3000,
    open: true,
  },
  test: {
    globals: true,          // describe, it, expect 전역 사용 가능
    environment: 'jsdom',   // React 컴포넌트 테스트 필수
    setupFiles: './vitest.setup.ts', // jest-dom 같은 확장 불러오기
  },
});