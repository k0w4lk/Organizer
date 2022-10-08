import vinylFTP from 'vinyl-ftp';
import fancyLog from 'fancy-log';
import { appConfig } from '../config/app.js';
import { configFTP } from '../config/ftp.js';

export const ftp = () => {
  configFTP.log = fancyLog;
  const ftpConnect = vinylFTP.create(configFTP);
  return appConfig.gulp
    .src(`${appConfig.path.buildFolder}/**/*.*`, {})
    .pipe(
      ftpConnect.dest(`/${appConfig.path.ftp}/${appConfig.path.rootFolder}`),
    );
};
