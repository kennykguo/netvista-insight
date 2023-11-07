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
        .pipe(postcss([autoprefixer(), cssnano()])) 
        //autoprefixer will add browser prefixes to support old browsers
        //cssnano minfies css file
        .pipe(dest('dist', { sourcemaps: '.' }));
        //puts file into dist. '.' means same location as dist
}

//Javascript task
function jsTask() {
    return src('app/js/script.js', { sourcemaps: true })
    .pipe (babel({presets: ['@babel/preset-env']}))
    //allow older browsers to support javascript
    .pipe(terser())
    //terser minifies JS file
    .pipe(dest('dist', { sourcemaps: '.' }));
    //destination script.js file goes into dist folder, along with its map
}

//Browsersync start
function browserSyncServer(cb) {
    browsersync.init({
      server: {
        baseDir: '.',
      },
      notify: {
        styles: {
        },
      },
    });
    cb();
  }

  //Browsersync reload
  function browserSyncReload(cb) {
    browsersync.reload();
    cb();
  }


//Watch task will keep watch for any changes then call BrowserSyncReload
function watchTask(){
    watch('*.html', browserSyncReload);
    watch(
        ['app/scss/**/*.scss', 'app/**/*.js'],
        series(scssTask, jsTask, browserSyncReload)
    );
}

//Execute all tasks in series (at the same time)
exports.default = series(scssTask, jsTask, browserSyncServer, watchTask);

