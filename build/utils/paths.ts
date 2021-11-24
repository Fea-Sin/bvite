import { resolve } from "path";

export const proRoot = resolve(__dirname, "..", "..");

export const pkgRoot = resolve(proRoot, "packages");

export const themeRoot = resolve(pkgRoot, "theme-chalk");

// dist
export const buildOutput = resolve(proRoot, "dist");

// dist/bvite-ui
export const bviteOutput = resolve(buildOutput, "bvite-ui");

export const proPackage = resolve(proRoot, "package.json");
