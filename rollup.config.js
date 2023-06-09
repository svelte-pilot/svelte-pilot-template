import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { string } from "rollup-plugin-string";

export default {
  output: {
    inlineDynamicImports: true,
    file: "dist/server/index.js",
    format: "es",
  },

  plugins: [
    resolve(),
    typescript(),
    json(),
    commonjs(),
    string({ include: "**/*.html" }),
  ],
};
