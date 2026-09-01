import * as path from 'node:path';

import { vanillaExtractPlugin } from '@vanilla-extract/rollup-plugin';
import { defineConfig } from 'tsdown';
import solid from 'unplugin-solid/rolldown';

import { collectVanillaExtractCss } from './script/collect-vanilla-extract-css.ts';

const baseConfig = {
  format: 'esm',
  platform: 'neutral',
  target: 'es2020',
  outDir: 'dist',
  dts: true,
  hash: false,
  minify: true,
  alias: {
    '@/': `${path.resolve(import.meta.dirname, 'src')}/`,
  },
  deps: {
    skipNodeModulesBundle: true,
  },
} as const;

const createVanillaExtract = (fileName: string) => vanillaExtractPlugin({
  extract: {
    name: fileName,
    sourcemap: false,
  },
});

export default defineConfig([
  {
    ...baseConfig,
    entry: {
      index: 'src/index.ts',
    },
    clean: true,
    plugins: [
      solid(),
      createVanillaExtract('kit.css'),
      collectVanillaExtractCss({ fileName: 'kit.css' }),
    ],
  },
  {
    ...baseConfig,
    entry: {
      css: 'src/css.ts',
    },
    clean: false,
    plugins: [
      createVanillaExtract('kit.css'),
      collectVanillaExtractCss({ emit: false }),
    ],
  },
  {
    ...baseConfig,
    entry: {
      reset: 'src/theme/reset/reset.css.ts',
    },
    clean: false,
    dts: false,
    plugins: [
      createVanillaExtract('reset.css'),
      collectVanillaExtractCss({ fileName: 'reset.css', emitChunks: false }),
    ],
  },
  {
    ...baseConfig,
    entry: {
      global: 'src/theme/reset/global.css.ts',
    },
    clean: false,
    dts: false,
    plugins: [
      createVanillaExtract('global.css'),
      collectVanillaExtractCss({ fileName: 'global.css', emitChunks: false }),
    ],
  },
]);
