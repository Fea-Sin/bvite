import { rollup } from "rollup";
import vue from "rollup-plugin-vue";
import css from "rollup-plugin-css-only";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import esbuild from "rollup-plugin-esbuild";
import filesize from "rollup-plugin-filesize";
import glob from "fast-glob";
import { bviteRoot, pkgRoot, tsconfigRoot } from "./utils/paths";
import { BviteUiAlias } from "./plugins/bvite-ui-alias";
import { generateExternal, writeBundles } from "./utils/rollup";
import { excludeFiles } from "./utils/pkg";
import { reporter } from "./plugins/size-reporter";
import { buildConfigEntries } from "./build-info";
import typescript from "@rollup/plugin-typescript";

import type { OutputOptions } from "rollup";

export const buildModules = async () => {
  const input = excludeFiles(
    await glob("**/*.{js,ts,vue}", {
      cwd: pkgRoot,
      absolute: true,
      onlyFiles: true,
    })
  );

  const bundle = await rollup({
    input,
    plugins: [
      vue(),
      typescript({
        tsconfig: tsconfigRoot,
      }),
      nodeResolve({
        extensions: [".mjs", ".js", ".json", ".ts"],
      }),
      commonjs(),
    ],
    external: await generateExternal({ full: false }),
    treeshake: false,
  });

  await writeBundles(
    bundle,
    buildConfigEntries.map(([module, config]): OutputOptions => {
      return {
        format: config.format,
        dir: config.output.path,
        exports: module === "cjs" ? "named" : undefined,
        preserveModules: true,
        preserveModulesRoot: bviteRoot,
        sourcemap: true,
        entryFileNames: `[name].${config.ext}`,
      };
    })
  );
};
