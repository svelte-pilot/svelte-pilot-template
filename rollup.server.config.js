import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import { string } from 'rollup-plugin-string';
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'dist/tmp/server.ts',

  output: {
    inlineDynamicImports: true,
    file: 'dist/server/index.js',
    format: 'es'
  },

  plugins: [
    resolve(),
    typescript(),
    json(),
    commonjs(),
    string({ include: '**/*.html' })
  ]
};
