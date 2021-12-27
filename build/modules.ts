import { rollup } from "rollup";
import vue from "rollup-plugin-vue";
import commonjs from "@rollup/plugin-commonjs";
import esbuild from "rollup-plugin-esbuild";
import filesize from "rollup-plugin-filesize";
import glob from "fast-glob";
import { bviteRoot, pkgRoot } from "./utils/paths";
import { BviteUiAlias } from "./plugins/bvite-ui-alias";
import { generateExternal, writeBundles } from "./utils/rollup";
import { excludeFiles } from "./utils/pkg";
import { reporter } from "./plugins/size-reporter";
import { buildConfigEntries } from "./build-info";

import type { OutputOptions } from "rollup";

export const buildModules = async () => {
  const input = excludeFiles(
    await glob("**/*.{ts,vue}", {
      cwd: pkgRoot,
      absolute: true,
      onlyFiles: true,
    })
  );

  const bundle = await rollup({
    input,
    plugins: [
      await BviteUiAlias(),
      vue({ target: "browser" }),
      commonjs(),
      esbuild({
        sourceMap: true,
        target: "es2018",
      }),
      filesize({ reporter }),
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
