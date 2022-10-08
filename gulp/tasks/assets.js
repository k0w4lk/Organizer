import { appConfig } from '../config/app.js';

export function assets() {
  return appConfig.gulp
    .src(appConfig.path.src.assets)
    .pipe(appConfig.gulp.dest(appConfig.path.build.assets));
}
