import path from "path";
import { bviteOutput } from "./utils/paths";
import { VF_PKG } from "./utils/constants";
import type { ModuleFormat } from "rollup";

export const modules = ["esm", "cjs"] as const;
export type Module = typeof modules[number];

export interface BuildInfo {
  module: "ESNext" | "CommonJS";
  format: ModuleFormat;
  ext: "mjs" | "cjs" | "js";
  output: {
    name: string;
    path: string;
  };
  bundle: {
    path: string;
  };
}

export const buildConfig: Record<Module, BuildInfo> = {
  esm: {
    module: "ESNext",
    format: "esm",
    ext: "mjs",
    output: {
      name: "es",
      path: path.resolve(bviteOutput, "es"),
    },
    bundle: {
      path: `${VF_PKG}/es`,
    },
  },
  cjs: {
    module: "CommonJS",
    format: "cjs",
    ext: "js",
    output: {
      name: "lib",
      path: path.resolve(bviteOutput, "lib"),
    },
    bundle: {
      path: `${VF_PKG}/lib`,
    },
  },
};

export type BuildConfigEntries = [Module, BuildInfo][];

export type BuildConfig = typeof buildConfig;

export const buildConfigEntries = Object.entries(
  buildConfig
) as BuildConfigEntries;
