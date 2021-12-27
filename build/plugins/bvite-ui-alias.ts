import { VF_PKG, VF_PREFIX } from "../utils/constants";
import { getDistPackages } from "../utils/pkg";
import type { Plugin } from "rollup";

export async function BviteUiAlias(): Promise<Plugin> {
  const pkgs = await getDistPackages();

  return {
    name: "bvite-ui-alias-plugin",
    resolveId(id, importer, options) {
      if (!id.startsWith(VF_PREFIX)) return;

      const THEME_CHALK = `${VF_PREFIX}/theme-chalk`;
      if (id.startsWith(THEME_CHALK)) {
        return {
          id: id.replaceAll(THEME_CHALK, `${VF_PKG}/theme-chalk`),
          external: "absolute",
        };
      }

      let updateId = id;
      for (const pkg of pkgs) {
        if (id.startsWith(pkg.name)) {
          updateId = updateId.replace(pkg.name, pkg.dir);
        }
      }
      return this.resolve(id, importer, { skipSelf: true, ...options });
    },
  };
}
