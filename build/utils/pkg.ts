import findWorkspacePackages from "@pnpm/find-workspace-packages";
import { buildConfig } from "../build-info";
import { VF_PREFIX } from "./constants";
import { pkgRoot, proPackage } from "./paths";

import type { Module } from "../build-info";
import type { ProjectManifest } from "@pnpm/types";
import { stringify } from "querystring";

export const getWorkspacePackages = () => findWorkspacePackages(proPackage);

/**
 * get package list (theme-chalk excluded)
 */
export const getDistPackages = async () =>
  (await getWorkspacePackages())
    .map((pkg) => ({
      name: pkg.manifest.name,
      dir: pkg.dir,
    }))
    .filter(
      (pkg: any): pkg is { name: string; dir: string } =>
        pkg.name &&
        pkg.dir &&
        pkg.name.startsWith(VF_PREFIX) &&
        pkg.dir.startsWith(pkgRoot) &&
        pkg.name !== `${VF_PREFIX}/theme-chalk`
    );

export const getPackageManifest = (pkgPath: string) => {
  return require(pkgPath) as ProjectManifest;
};

export const getPackageDependencies = (pkgPath: string): string[] => {
  const manifest = getPackageManifest(pkgPath);
  const { dependencies } = manifest;
  return Object.keys(dependencies ?? {});
};

export const excludeFiles = (files: string[]) => {
  const excludes = ["node_modules", "test", "mock", "gulpfile", "dist"];

  return files.filter(
    (path) => !excludes.some((exclude) => path.includes(exclude))
  );
};
