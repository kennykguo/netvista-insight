//Initialize the modules from the npm packages
const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();

//Sass Task
function scssTask() {
    return src('app/scss/style.scss', { sourcemaps: true })
    //sourcemaps for debugging and viewing code
        .pipe(sass()) //running sass
        .pipe(postcss([autoprefixer(), cssnano()])) //autoprefixer will add browser prefixes to support old browsers
        //cssnano minimizes css file
        .pipe(dest('dist', { sourcemaps: '.' }));
        //puts file into dist - . means same location as dist
}

//Javascript task
function jsTask() {
    return src('app/js/script.js', { sourcemaps: true })
    .pipe (babel({presets: ['@babel/preset-env']}))
    //allow older browsers to support javascript
    .pipe(terser())
    //terser minimizes javascript file
    .pipe(dest('dist', { sourcemaps: '.' }));
    //destination file goes into dist folder
}

function browserSyncServer(cb) {
    browsersync.init({
      server: {
        baseDir: '.',
      },
      notify: {
        styles: {
          top: 'auto',
          bottom: '0',
        },
      },
    });
    cb();
  }
  function browserSyncReload(cb) {
    browsersync.reload();
    cb();
  }

//Watch task will keep watch for any changes then call BrowserSyncReload if there are to the html or javascript files

function watchTask(){
    watch('*.html', browserSyncReload);
    watch(
        ['app/scss/**/*.scss', 'app/**/*.js'],
        series(scssTask, jsTask, browserSyncReload)
    );
}

//Default gulp task
exports.default = series(scssTask, jsTask, browserSyncServer, watchTask);

