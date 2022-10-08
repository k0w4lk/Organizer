import gulp from 'gulp';
import { path } from './paths.js';
import { plugins } from './plugins.js';

export const appConfig = {
  isBuild: process.argv.includes('--build'),
  isDev: !process.argv.includes('--build'),
  path,
  gulp,
  plugins,
};
