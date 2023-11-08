//Initialize the modules from the npm packages
const gulp= require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();
const uglifycss = require('gulp-uglifycss');

const paths = {
  src: {
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js',
  },
  dist: {
    css: 'gulp/dist/css',
    js: 'gulp/dist/js',
    flaskDist: 'flask_app/static/dist', // Add this path for Flask
  },
};

//SCSS Task
gulp.task('scss', function(){
  return gulp.src(paths.src.scss, {sourcemaps: true})
      .pipe(sass().on('error', sass.logError))
      .pipe(postcss([autoprefixer(), cssnano()])) 
      //autoprefixer will add browser prefixes to support old browsers
      //Creates files, along with sourcemaps in the gulp folder, and the Flask folder
      .pipe(gulp.dest(paths.dist.css, {sourcemaps: '.'}))
      .pipe(gulp.dest(paths.dist.flaskDist, {sourcemaps: '.'}))
      .pipe(browsersync.stream());
})

//JS Task
gulp.task('js', function () {
  return gulp.src(paths.src.js, {sourcemaps: true})
  .pipe(terser())
  //Allow older browsers to support javascript
  .pipe (babel({presets: ['@babel/preset-env']}))
   //Creates files in the gulp folder, and the Flask folder
  .pipe(gulp.dest(paths.dist.js, {sourcemaps: '.'}))
  .pipe(gulp.dest(paths.dist.flaskDist, {sourcemaps: '.'}))
  .pipe(browsersync.stream());
});


// Define BrowserSync Server task
gulp.task('browserSync', function (cb) {
  browsersync.init({
    server: {
      baseDir: '.',
    },
  });
  cb();
});

gulp.task('browserSyncReload', function (cb) {
  browsersync.reload();
  cb();
});

//Run all tasks above at the same time (in series)
gulp.task('run', gulp.series('scss', 'js'));

//Watch task will keep watch for any changes then call BrowserSyncReload
gulp.task('watch', function () {
  gulp.watch(paths.src.scss, gulp.series('scss'));
  gulp.watch(paths.src.js, gulp.series('js'));
  gulp.watch('./flask-app/templates/*'), browsersync.reload();
});

//Execute all tasks in series (at the same time)
gulp.task('default', gulp.series('run', 'watch'));

