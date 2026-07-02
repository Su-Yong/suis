import { defineConfig } from 'tsdown';
import solid from 'unplugin-solid/rolldown';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
  },
  format: 'esm',
  platform: 'neutral',
  target: 'es2020',
  dts: true,
  clean: true,
  hash: false,
  minify: true,
  deps: {
    skipNodeModulesBundle: true,
  },
  plugins: [
    solid(),
  ],
});
