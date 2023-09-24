import {defineConfig} from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  splitting: false,
  treeshake: true,
  legacyOutput: true,
  sourcemap: true,
  clean: true,
  dts: true,
  format: ['cjs', 'esm'],
});
