import {defineConfig} from 'tsup';

export default defineConfig({
  entry: ['src/exports/index.ts', 'src/exports/utils.ts'],
  minify: true,
  splitting: false,
  treeshake: true,
  sourcemap: true,
  clean: true,
  dts: true,
  format: ['cjs', 'esm'],
});
