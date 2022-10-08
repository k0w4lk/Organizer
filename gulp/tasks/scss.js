import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';
import cleanCss from 'gulp-clean-css';
import webpCss from 'gulp-webpcss';
import autoprefixer from 'gulp-autoprefixer';
import groupCssMediaQueries from 'gulp-group-css-media-queries';
import { appConfig } from '../config/app.js';

const sass = gulpSass(dartSass);

export const scss = () =>
  appConfig.gulp
    .src(appConfig.path.src.scss, { sourcemaps: appConfig.isDev })
    .pipe(sass())
    .pipe(appConfig.plugins.gulpIf(appConfig.isBuild, groupCssMediaQueries()))
    .pipe(
      appConfig.plugins.gulpIf(
        appConfig.isBuild,
        webpCss({
          webpClass: '.webp',
          noWebpClass: '.no-webp',
        }),
      ),
    )
    .pipe(
      appConfig.plugins.gulpIf(
        appConfig.isBuild,
        autoprefixer({
          grid: true,
          overrideBrowserslist: ['last 3 versions'],
          cascade: true,
        }),
      ),
    )
    // create expanded css files
    // .pipe(appConfig.gulp.dest(appConfig.path.build.css))
    .pipe(appConfig.plugins.gulpIf(appConfig.isBuild, cleanCss()))
    .pipe(
      rename({
        extname: '.min.css',
      }),
    )
    .pipe(appConfig.plugins.gulpReplace(/@images\//g, '../images/'))
    .pipe(appConfig.gulp.dest(appConfig.path.build.css))
    .pipe(appConfig.plugins.browserSync.stream());
