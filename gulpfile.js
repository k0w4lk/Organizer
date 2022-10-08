import gulp from 'gulp';
import { path } from './gulp/config/paths.js';
import { assets } from './gulp/tasks/assets.js';
import { otfToTtf, fontsStyle, ttfToWoff } from './gulp/tasks/fonts.js';
import { ftp } from './gulp/tasks/ftp.js';
import { html } from './gulp/tasks/html.js';
import { images } from './gulp/tasks/images.js';
import { js } from './gulp/tasks/js.js';
import { reset } from './gulp/tasks/reset.js';
import { scss } from './gulp/tasks/scss.js';
import { server } from './gulp/tasks/server.js';
import { zip } from './gulp/tasks/zip.js';

function watcher() {
  gulp.watch(path.watch.assets, assets);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.images, images);
}

const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);
const files = gulp.series(fonts, gulp.parallel(assets, html, js, scss, images));
const devEnv = gulp.parallel(watcher, server);

export const dev = gulp.series(reset, files, devEnv);
export const build = gulp.series(reset, files);
export const deployZIP = gulp.series(reset, files, zip);
export const deployFTP = gulp.series(reset, files, ftp);

gulp.task('default', dev);
