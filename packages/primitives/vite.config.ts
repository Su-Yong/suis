import { defineConfig } from 'rolldown-vite';

import solid from 'vite-plugin-solid';
import dts from 'unplugin-dts/rolldown';

export default defineConfig({
  plugins: [
    solid(),
    dts({ bundleTypes: true }),
  ],
  build: {
    outDir: 'dist',
    lib: {
      entry: 'src/index.ts',
      name: 'suis-primitives',
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