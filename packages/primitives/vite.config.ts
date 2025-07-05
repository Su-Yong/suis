import { defineConfig } from 'rolldown-vite';

import solid from 'vite-plugin-solid';

export default defineConfig({
  plugins: [
    solid(),
  ],
  build: {
    outDir: 'dist',
    lib: {
      entry: 'src/index.ts',
      name: 'Primitives',
      fileName: (format) => `suis.primitives.${format}.js`,
    },
    rollupOptions: {
      external: ['solid-js'],
    },
  },
});