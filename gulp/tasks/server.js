import historyApiFallback from 'connect-history-api-fallback';
import { appConfig } from '../config/app.js';

export const server = () => {
  appConfig.plugins.browserSync.init({
    server: {
      baseDir: appConfig.path.build.html,
      middleware: [historyApiFallback()],
    },
    notify: true,
    port: 3000,
    open: false,
  });
};
