import path from "path";
import { src, dest, parallel, series } from "gulp";
import { bviteOutput } from "../../build/utils/paths";

import less from "gulp-less";
import LessAutoprefix from "less-plugin-autoprefix";
// import cssmin from "gulp-cssmin";

const distFolder = path.resolve(__dirname, "dist");
const bundleFolder = path.resolve(bviteOutput, "theme-chalk");

/**
 * gulp theme-chalk
 * less, autoprefix, minify
 */

const autoprefix = new LessAutoprefix({
  browsers: ["ie > 9", "last 2 versions"],
});

function buildThemeChalk() {
  return src("./src/**/*.less").pipe(
    less({
      plugins: [autoprefix],
    }).pipe(dest(distFolder))
  );
}

/**
 * copy from packages/theme-chalk to dist/theme-chalk
 */
export function copyThemeChalk() {
  return src(`${distFolder}/**`).pipe(dest(bundleFolder));
}

export const build = parallel(series(buildThemeChalk, copyThemeChalk));

export default build;
