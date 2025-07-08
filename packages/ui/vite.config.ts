import * as path from 'node:path';
import { defineConfig } from 'rolldown-vite';

import solid from 'vite-plugin-solid';
import dts from 'unplugin-dts/rolldown';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

export default defineConfig({
  plugins: [
    solid(),
    vanillaExtractPlugin(),
    dts({ bundleTypes: true }),
  ],
  resolve: {
    alias: [{ find: /^@\//, replacement: `${path.resolve(__dirname, 'src')}/` }],
  },
  build: {
    outDir: 'dist',
    lib: {
      entry: 'src/index.ts',
      name: 'suis-ui',
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['solid-js'],
      output: {
        globals: {
          'solid-js': 'solid-js',
        },
      },
    },
  },
});
