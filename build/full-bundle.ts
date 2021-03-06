import path from "path";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { rollup } from "rollup";
import commonjs from "@rollup/plugin-commonjs";
import vue from "rollup-plugin-vue";
import esbuild from "rollup-plugin-esbuild";
import replace from "@rollup/plugin-replace";
import filesize from "rollup-plugin-filesize";
import { parallel } from "gulp";
import { bviteRoot, bviteOutput } from "./utils/paths";
import { generateExternal, writeBundles } from "./utils/rollup";

import { withTaskName } from "./utils/gulp";

export const buildFull = (minify: boolean) => async () => {
  const bundle = await rollup({
    input: path.resolve(bviteRoot, "index.ts"),
    plugins: [
      nodeResolve({
        extensions: [".mjs", ".js", ".json", ".ts"],
      }),
      vue({
        target: "browser",
        exposeFilename: false,
      }),
      commonjs(),
      esbuild({
        minify,
        sourceMap: minify,
        target: "es2018",
      }),
      replace({
        "process.env.NODE_ENV": JSON.stringify("production"),
        preventAssignment: true,
      }),
      filesize(),
    ],
    external: await generateExternal({ full: true }),
  });
  const banner = "/*! BviteUi v1.0.0 */\n";

  await writeBundles(bundle, [
    {
      format: "umd",
      file: path.resolve(
        bviteOutput,
        `dist/index.full${minify ? ".min" : ""}.js`
      ),
      exports: "named",
      globals: {
        vue: "Vue",
      },
      sourcemap: minify,
      banner,
    },
    {
      format: "esm",
      file: path.resolve(
        bviteOutput,
        `dist/index.full${minify ? ".min" : ""}.mjs`
      ),
      sourcemap: minify,
      banner,
    },
  ]);
};

export const buildFullBundle = parallel(
  // withTaskName("buildFullMinified", buildFull(true)),
  withTaskName("buildFull", buildFull(false))
);
