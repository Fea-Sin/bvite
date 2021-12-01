import path from "path";
import { src, dest, parallel, series } from "gulp";
import { bviteOutput } from "../../build/utils/paths";
import rimraf from "rimraf";

import less from "gulp-less";
import LessAutoprefix from "less-plugin-autoprefix";
import cssmin from "gulp-cssmin";

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
  return src("./src/**/*.less")
    .pipe(
      less({
        plugins: [autoprefix],
      })
    )
    .pipe(cssmin())
    .pipe(dest(distFolder));
}

/**
 * clean css
 */
function cleanDist(cb: Function) {
  rimraf(distFolder, cb);
}
function cleanBundle(cb: Function) {
  rimraf(bundleFolder, cb);
}
const clean = parallel(cleanDist, cleanBundle);

/**
 * copy from packages/theme-chalk to dist/theme-chalk
 */
export function copyThemeChalk() {
  return src(`${distFolder}/**`).pipe(dest(bundleFolder));
}

/**
 * copy source file to packages
 */
export function copyThemeChalkSource() {
  return src(path.resolve(__dirname, "src/**")).pipe(
    dest(path.resolve(bundleFolder, "src"))
  );
}

export const build = parallel(
  copyThemeChalkSource,
  series(clean, buildThemeChalk, copyThemeChalk)
);

export default build;
