let projectFolder = 'dist';
let sourceFolder = '#src';

let path = {
  build: {
    html: projectFolder + '/',
    css: projectFolder + '/css/',
    js: projectFolder + '/js/',
    img: projectFolder + '/images/',
    fonts: projectFolder + '/fonts/',
  },
  src: {
    html: [sourceFolder + '/*.html', '!' + sourceFolder + '/_*.html'],
    css: sourceFolder + '/scss/style.scss',
    js: sourceFolder + '/js/script.js',
    img: sourceFolder + '/images/**/*.+(png|jpg|gif|ico|svg|webp)',
    fonts: sourceFolder + '/fonts/*.+(ttf|otf|woff|woff2)',
  },
  watch: {
    html: sourceFolder + '/**/*.html',
    css: sourceFolder + '/scss/**/*.scss',
    js: sourceFolder + '/js/**/*.js',
    img: sourceFolder + '/images/**/*.+(png|jpg|gif|ico|svg|webp)',
    fonts: sourceFolder + '/fonts/**/*.+(ttf|otf|woff|woff2)',
  },
  clean: './' + projectFolder + '/',
};

let { src, dest } = require('gulp'),
  gulp = require('gulp'),
  browserSync = require('browser-sync').create(),
  fileInclude = require('gulp-file-include'),
  del = require('del'),
  scss = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  groupMedia = require('gulp-group-css-media-queries'),
  cleanCSS = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify-es').default,
  imageMin = require('gulp-imagemin');

function browserSynchronize() {
  browserSync.init({
    server: {
      baseDir: './' + projectFolder + '/',
    },
    port: 3000,
    notify: false,
  });
}

function html() {
  return src(path.src.html)
    .pipe(fileInclude())
    .pipe(dest(path.build.html))
    .pipe(browserSync.stream());
}

function css() {
  return src(path.src.css)
    .pipe(
      scss({
        outputStyle: 'expanded',
      })
    )
    .pipe(groupMedia())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['last 5 versions'],
        cascade: true,
      })
    )
    .pipe(dest(path.build.css))
    .pipe(cleanCSS())
    .pipe(
      rename({
        extname: '.min.css',
      })
    )
    .pipe(dest(path.build.css))
    .pipe(browserSync.stream());
}

function js() {
  return src(path.src.js)
    .pipe(fileInclude())
    .pipe(dest(path.build.js))
    .pipe(uglify())
    .pipe(
      rename({
        extname: '.min.js',
      })
    )
    .pipe(dest(path.build.js))
    .pipe(browserSync.stream());
}

function images() {
  return src(path.src.img)
    .pipe(
      imageMin({
        progressive: true,
        svgoPlugins: [{ remoteViewBox: false }],
        interlaced: true,
        optimizationLevel: 3, // from 0 to 7
      })
    )
    .pipe(dest(path.build.img))
    .pipe(browserSync.stream());
}

function fonts() {
  return src(path.src.fonts).pipe(dest(path.build.fonts)).pipe(browserSync.stream());
}

function watchFiles() {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.img], images);
  gulp.watch([path.watch.fonts], fonts);
}

function clean() {
  return del(path.clean);
}

let build = gulp.series(
  clean,
  gulp.parallel(js, css, html, images, fonts)
);
let watch = gulp.parallel(build, watchFiles, browserSynchronize);

exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.fonts = fonts;
exports.build = build;
exports.watch = watch;
exports.default = watch;
