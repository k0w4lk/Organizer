import webpack from 'webpack-stream';
import vinylNamed from 'vinyl-named';
import { appConfig } from '../config/app.js';

export const js = () =>
  appConfig.gulp
    .src(appConfig.path.src.js, { sourcemaps: appConfig.isDev })
    .pipe(vinylNamed())
    .pipe(
      webpack({
        mode: appConfig.isBuild ? 'production' : 'development',
        module: {
          rules: [
            {
              test: /\.(css|sass|scss)$/,
              use: [
                {
                  loader: 'style-loader',
                },
                {
                  loader: 'css-loader',
                },
                {
                  loader: 'sass-loader',
                },
              ],
            },
          ],
        },
      }),
    )
    .pipe(appConfig.plugins.gulpReplace(/@images\//g, '../images/'))
    .pipe(appConfig.gulp.dest(appConfig.path.build.js))
    .pipe(appConfig.plugins.browserSync.stream());
