import path from "path";
import { series, parallel } from "gulp";
import { run } from "./utils/process";
import { withTaskName } from "./utils/gulp";
import { buildOutput, bviteOutput, proPackage, proRoot } from "./utils/paths";
import { buildConfig } from "./build-info";
import type { TaskFunction } from "gulp";
import type { Module } from "./build-info";

const runTask = (name: string) =>
  withTaskName(name, () => run(`pnpm run build ${name}`));

export const copyFiles = () => {
  const copyTypings = async () => {
    const src = path.resolve(proRoot, "types", "global.d.ts");
    await run(`cp ${src} ${bviteOutput}`);
  };

  return Promise.all([
    run(`cp ${proPackage} ${path.join(bviteOutput, "package.json")}`),
    run(`cp README.md ${bviteOutput}`),
    copyTypings(),
  ]);
};
