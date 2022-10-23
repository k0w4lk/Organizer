import fs from 'fs';
import fonter from 'gulp-fonter-unx';
import log from 'fancy-log';
import ttf2woff2 from 'gulp-ttf2woff2';
import { appConfig } from '../config/app.js';

export const otfToTtf = () =>
  appConfig.gulp
    .src(`${appConfig.path.srcFolder}/assets/fonts/*.otf`, {})
    .pipe(
      fonter({
        formats: ['ttf'],
      }),
    )
    .pipe(appConfig.gulp.dest(`${appConfig.path.srcFolder}/assets/fonts/`));

export const ttfToWoff = () =>
  appConfig.gulp
    .src(`${appConfig.path.srcFolder}/assets/fonts/*.ttf`, {})
    .pipe(
      fonter({
        formats: ['woff'],
      }),
    )
    .pipe(appConfig.gulp.dest(`${appConfig.path.build.fonts}`))
    .pipe(appConfig.gulp.src(`${appConfig.path.srcFolder}/assets/fonts/*.ttf`))
    .pipe(ttf2woff2())
    .pipe(appConfig.gulp.dest(`${appConfig.path.build.fonts}`));

export const fontsStyle = () => {
  const fontsFile = `${appConfig.path.srcFolder}/scss/utils/fonts.scss`;
  function cb() {}

  fs.readdir(appConfig.path.build.fonts, (err, fontsFiles) => {
    if (fontsFiles) {
      if (!fs.existsSync(fontsFile)) {
        fs.writeFile(fontsFile, '', cb);

        let prevFontFace;

        for (let i = 0; i < fontsFiles.length; i++) {
          const fontFileName = fontsFiles[i].split('.')[0];
          if (fontFileName !== undefined) {
            const fontName = fontFileName.split('-')[0]
              ? fontFileName.split('-')[0]
              : fontFileName;
            let fontWeight = fontFileName.split('-')[1]
              ? fontFileName.split('-')[1]
              : fontFileName;
            switch (fontWeight.toLowerCase()) {
              case 'thin':
                fontWeight = 100;
                break;
              case 'extralight':
                fontWeight = 200;
                break;
              case 'light':
                fontWeight = 300;
                break;
              case 'medium':
                fontWeight = 500;
                break;
              case 'semibold':
                fontWeight = 600;
                break;
              case 'bold':
                fontWeight = 700;
                break;
              case 'extrabold':
              case 'heavy':
                fontWeight = 800;
                break;
              case 'black':
                fontWeight = 900;
                break;

              default:
                fontWeight = 400;
                break;
            }

            const fontFace = `@font-face{\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../assets/fonts/${fontFileName}.woff2") format("woff2"), url("../assets/fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\n`;

            if (prevFontFace !== fontFace) {
              fs.appendFile(fontsFile, fontFace, cb);
            }

            prevFontFace = fontFace;
          }
        }
      } else {
        log.warn(
          'File scss/fonts.scss already exists. If you have updated fonts somehow - delete the file to update.',
        );
      }
    }
  });

  return appConfig.gulp.src(`${appConfig.path.srcFolder}`);
};
