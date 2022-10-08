import { appConfig } from '../config/app.js';

export const server = () => {
  appConfig.plugins.browserSync.init({
    server: {
      baseDir: appConfig.path.build.html,
    },
    notify: true,
    port: 3000,
    open: false,
  });
};
