import {defineConfig} from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  minify: true,
  splitting: false,
  treeshake: true,
  sourcemap: true,
  clean: true,
  dts: true,
  format: ['cjs', 'esm'],
});
