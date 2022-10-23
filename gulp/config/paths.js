import * as nodePath from 'path';

const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = './docs';
const srcFolder = './src';

export const path = {
  build: {
    html: `${buildFolder}/`,
    css: `${buildFolder}/`,
    js: `${buildFolder}/`,
    images: `${buildFolder}/assets/images/`,
    fonts: `${buildFolder}/assets/fonts/`,
    assets: `${buildFolder}/assets/`,
  },
  src: {
    html: `${srcFolder}/**/*.html`,
    scss: `${srcFolder}/index.scss`,
    js: `${srcFolder}/**/*.js`,
    convertibleImages: `${srcFolder}/assets/images/**/*.{jpg,jpeg,png,webp}`,
    nonconvertibleImages: [
      `${srcFolder}/assets/images/**/*.*`,
      `!${srcFolder}/assets/images/**/*.{jpg,jpeg,png,webp}`,
    ],
    assets: [
      `${srcFolder}/assets/**/*.*`,
      `!${srcFolder}/assets/fonts/**/*.*`,
      `!${srcFolder}/assets/images/**/*.*`,
    ],
  },
  watch: {
    html: `${srcFolder}/**/*.html`,
    scss: `${srcFolder}/**/*.scss`,
    js: `${srcFolder}/**/*.js`,
    assets: `${srcFolder}/assets/**/*.*`,
  },
  clean: buildFolder,
  buildFolder,
  srcFolder,
  rootFolder,
  ftp: '',
};
