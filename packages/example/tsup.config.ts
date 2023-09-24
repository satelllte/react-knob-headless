import {defineConfig} from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  splitting: false,
  legacyOutput: true,
  sourcemap: true,
  clean: true,
  dts: true,
  format: ['cjs', 'esm'],
});
