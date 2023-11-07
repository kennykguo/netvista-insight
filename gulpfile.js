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

//Sass Task
gulp.task('scss', function(){
  return gulp.src('./app/scss/style.scss', {sourcemaps: true})
      .pipe(sass().on('error', sass.logError))
      .pipe(postcss([autoprefixer(), cssnano()])) 
      //autoprefixer will add browser prefixes to support old browsers
      .pipe(gulp.dest('./dist', {sourcemaps: '.'}));
})

//CSS Task
gulp.task('css', function () {
  return gulp.src('./app/css/*.css', {sourcemaps: true})
      .pipe(uglifycss({"uglyComments": true}))
      .pipe(gulp.dest('./app/css', {sourcemaps: '.'}));
});

//JS Task
gulp.task('js', function () {
  return gulp.src('./app/js/script.js', {sourcemaps: true})
  .pipe(terser())
  .pipe (babel({presets: ['@babel/preset-env']}))
   //allow older browsers to support javascript
  .pipe(gulp.dest('./dist/', {sourcemaps: '.'}))
});

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

gulp.task('run', gulp.series('scss', 'css', 'js'));

//Watch task will keep watch for any changes then call BrowserSyncReload
function watchTask(){
    watch('*.html', browserSyncReload);
    
}


//Dynamic watch task - watch change in SCSS files
gulp.task('watch', function () {
    gulp.watch('*.html', browserSyncReload);
    gulp.watch(['app/scss/**/*.scss', 'app/**/*.js'], series(scssTask, jsTask, browserSyncReload));
});

gulp.task('flask', function(){
  var spawn = process.spawn;
  console.info('Starting flask server');
  var PIPE = {stdio: 'inherit'};
  spawn('python', ['manage.py','runserver'], PIPE);
});


//Execute all tasks in series (at the same time)
gulp.task('default', gulp.series('run', 'watch'));

