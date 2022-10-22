import * as nodePath from 'path';

const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = './docs';
const srcFolder = './src';

export const path = {
  build: {
    html: `${buildFolder}/`,
    css: `${buildFolder}/`,
    js: `${buildFolder}/`,
    images: `${buildFolder}/images/`,
    fonts: `${buildFolder}/fonts/`,
    assets: `${buildFolder}/assets/`,
  },
  src: {
    html: [`${srcFolder}/**/*.html`],
    scss: [`${srcFolder}/scss/index.scss`, `${srcFolder}/scss/pages/*.scss`],
    js: [`${srcFolder}/js/index.js`, `${srcFolder}/js/controllers/*.js`],
    images: `${srcFolder}/images/**/*.{jpg,jpeg,png,webp}`,
    nonconvertibleImages: `${srcFolder}/images/**/*.{svg,gif,ico}`,
    assets: `${srcFolder}/assets/**/*.*`,
  },
  watch: {
    html: `${srcFolder}/**/*.html`,
    scss: `${srcFolder}/scss/**/*.scss`,
    js: `${srcFolder}/js/**/*.js`,
    images: `${srcFolder}/images/**/*.{jpg,jpeg,png,webp,gif,svg,ico}`,
    assets: `${srcFolder}/assets/**/*.*`,
  },
  clean: buildFolder,
  buildFolder,
  srcFolder,
  rootFolder,
  ftp: '',
};
