import del from 'del';
import { appConfig } from '../config/app.js';

export function reset() {
  return del(appConfig.path.clean);
}
