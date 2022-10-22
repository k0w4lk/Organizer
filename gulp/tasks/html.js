import gulpFormatHtml from 'gulp-format-html';
import gulpHtmlImgWrapper from 'gulp-html-img-wrapper';
import gulpVersionNumber from 'gulp-version-number';
import { appConfig } from '../config/app.js';

export function html() {
  return appConfig.gulp
    .src(appConfig.path.src.html)
    .pipe(gulpHtmlImgWrapper())
    .pipe(
      appConfig.plugins.gulpIf(
        appConfig.isBuild,
        gulpVersionNumber({
          value: '%DT%',
          append: {
            key: '_v',
            cover: 0,
            to: ['css', 'js'],
          },
          output: {
            file: 'gulp/version.json',
          },
        }),
      ),
    )
    .pipe(appConfig.plugins.gulpReplace(/@images\//g, 'images/'))
    .pipe(gulpFormatHtml())
    .pipe(appConfig.gulp.dest(appConfig.path.build.html))
    .pipe(appConfig.plugins.browserSync.stream());
}
