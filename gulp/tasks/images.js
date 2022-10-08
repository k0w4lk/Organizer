import webp from 'gulp-webp';
import imagemin from 'gulp-imagemin';
import { appConfig } from '../config/app.js';

export const images = () =>
  appConfig.gulp
    .src(appConfig.path.src.images)
    .pipe(appConfig.plugins.gulpNewer(appConfig.path.build.images))
    .pipe(webp())
    .pipe(appConfig.gulp.dest(appConfig.path.build.images))
    .pipe(appConfig.gulp.src(appConfig.path.src.images))
    .pipe(appConfig.plugins.gulpNewer(appConfig.path.build.images))
    .pipe(
      appConfig.plugins.gulpIf(
        appConfig.isBuild,
        imagemin({
          progressive: true,
          svgoPlugins: [{ removeViewBox: false }],
          interlaced: true,
          optimizationLevel: 3,
        }),
      ),
    )
    .pipe(appConfig.gulp.dest(appConfig.path.build.images))
    .pipe(appConfig.gulp.src(appConfig.path.src.nonconvertibleImages))
    .pipe(appConfig.gulp.dest(appConfig.path.build.images))
    .pipe(appConfig.plugins.browserSync.stream());
