import path from "path";
import { series, parallel } from "gulp";
import { run } from "./utils/process";
import { withTaskName } from "./utils/gulp";
import {
  buildOutput,
  bviteOutput,
  proRoot,
  bviteRoot,
  vfuiPackage,
} from "./utils/paths";
import { buildConfig } from "./build-info";
import type { TaskFunction } from "gulp";
import type { Module } from "./build-info";

export * from "./types-definitions";
export * from "./modules";
export * from "./full-bundle";

const runTask = (name: string) =>
  withTaskName(name, () => run(`pnpm run build ${name}`));

export const copyFiles = () => {
  // const copyTypings = async () => {
  //   const src = path.resolve(proRoot, "types", "global.d.ts");
  //   await run(`cp ${src} ${bviteOutput}`);
  // };

  return Promise.all([
    run(`cp ${vfuiPackage} ${path.join(bviteOutput, "package.json")}`),
    run(`cp README.md ${bviteOutput}`),
    // copyTypings(),
  ]);
};

export const copyTypesDefinitions: TaskFunction = (done) => {
  const src = `${buildOutput}/types/`;
  const copy = (module: Module) =>
    withTaskName(`copyTypes:${module}`, () =>
      run(`rsync -a ${src} ${buildConfig[module].output.path}/`)
    );

  return parallel(copy("esm"), copy("cjs"))(done);
};

export const copyFullStyle = async () => {
  await run(`mkdir -p ${bviteOutput}/dist`);
  await run(
    `cp ${bviteOutput}/theme-chalk/index.css ${bviteOutput}/dist/index.css`
  );
};

export const copyFullComponent = async () => {
  await run(`mkdir -p ${bviteOutput}/dist`);
  await run(`cp ${bviteRoot}/dist/vfui.cjs.js ${bviteOutput}/dist/`);
  await run(`cp ${bviteRoot}/dist/vfui.es.js ${bviteOutput}/dist/`);
  await run(`cp ${bviteRoot}/dist/vfui.umd.js ${bviteOutput}/dist/`);
};

export default series(
  withTaskName("clean", () => run("pnpm run clean")),

  parallel(
    series(
      withTaskName("buildThemeChalk", () =>
        run("pnpm run -C packages/theme-chalk build")
      ),
      copyFullStyle
    ),
    series(
      withTaskName("buildComponent", () =>
        run("pnpm run -C packages/bvite-ui build")
      ),
      copyFullComponent
    ),
    runTask("buildModules"),
    runTask("generateTypesDefinitions")
  ),
  parallel(copyFiles)
);
