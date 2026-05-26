import * as path from 'node:path';
import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import solid from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solid(), vanillaExtractPlugin()],
  optimizeDeps: {
    include: ['@vanilla-extract/recipes/createRuntimeFn'],
  },
  resolve: {
    alias: [
      {
        find: '@suis-ui/kit',
        replacement: path.resolve(__dirname, '../../packages/kit/src/index.ts'),
      },
      {
        find: '@suis-ui/primitives',
        replacement: path.resolve(__dirname, '../../packages/primitives/src/index.ts'),
      },
      {
        find: /^@\//,
        replacement: `${path.resolve(__dirname, '../../packages/kit/src')}/`,
      },
    ],
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.{ts,tsx}'],
    setupFiles: ['./src/setup.ts'],
    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
    },
  },
});
