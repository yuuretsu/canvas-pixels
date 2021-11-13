import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import pkg from "./package.json";
import typescript from '@rollup/plugin-typescript';
import { terser } from "rollup-plugin-terser";
import dts from 'rollup-plugin-dts';

require('fs').rmdirSync("./dist", { recursive: true });

const input = "./src/index.ts";
// const umdOutput = "./dist/umd/pxls.js";
const name = "pixels";

const plugins = [
  resolve(),
  commonjs(),
  typescript()
];

export default [
  {
    input,
    output: {
      file: `dist/${pkg.name}.min.js`,
      format: 'umd',
      name,
      esModule: false,
      exports: "named",
      sourcemap: true,
    },
    plugins: [...plugins, terser()],
  },
  {
    input,
    output: [
      {
        file: pkg.module,
        sourcemap: true,
        exports: "named",
        format: 'esm',
      },
      {
        file: pkg.main,
        sourcemap: true,
        exports: "named",
        format: 'cjs',
      },
    ],
    plugins: [...plugins],
  },
  {
    input,
    output: {
      file: pkg.types,
      format: 'esm',
    },
    plugins: [dts()],
  }
];
