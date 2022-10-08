import del from 'del';
import zipPlugin from 'gulp-zip';
import { appConfig } from '../config/app.js';

export const zip = () => {
  del(`./${appConfig.path.rootFolder}.zip`);
  return appConfig.gulp
    .src(`${appConfig.path.buildFolder}/**/*.*`, {})
    .pipe(zipPlugin(`${appConfig.path.rootFolder}.zip`))
    .pipe(appConfig.gulp.dest('./'));
};
