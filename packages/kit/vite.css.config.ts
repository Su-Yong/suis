import * as path from 'node:path';
import { rm } from 'node:fs/promises';
import { defineConfig } from 'vite';

import dts from 'unplugin-dts/rolldown';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import type { Plugin } from 'vite';

import { globals, isExternal } from './build-options';

const omitCssHelperStyles = (): Plugin => ({
  name: 'omit-css-helper-styles',
  async closeBundle() {
    await rm(path.resolve(__dirname, 'dist/css.css'), { force: true });
  },
});

export default defineConfig({
  plugins: [
    vanillaExtractPlugin(),
    dts({
      entryRoot: 'src',
      include: [
        'src/css.ts',
        'src/theme/token/default/default.css.ts',
        'src/theme/token/semantic/vars.css.ts',
        'src/ui/component.css.ts',
        'src/ui/Popup/animation.ts',
      ],
    }),
    omitCssHelperStyles(),
  ],
  resolve: {
    alias: [{ find: /^@\//, replacement: `${path.resolve(__dirname, 'src')}/` }],
  },
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    lib: {
      entry: 'src/css.ts',
      formats: ['es', 'cjs'],
      fileName: (format) => `css.${format}.js`,
      cssFileName: 'css',
    },
    rollupOptions: {
      external: isExternal,
      output: {
        globals,
      },
    },
  },
});
