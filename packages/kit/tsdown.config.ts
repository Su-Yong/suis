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

const vanillaExtract = vanillaExtractPlugin({
  extract: {
    name: 'kit.css',
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
      vanillaExtract,
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
      vanillaExtract,
      collectVanillaExtractCss({ emit: false }),
    ],
  },
]);
