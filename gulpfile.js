const gulp = require('gulp');
const {src , dest, watch, series} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const pipeline = require('readable-stream').pipeline;
const gulpLoadPlugins = require('gulp-load-plugins');
const uglifycss = require('gulp-uglifycss');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano')
const autoprefixer = require('autoprefixer')
const terser = require('gulp-terser')
const browsersync = require('browser-sync').create()



const $ = gulpLoadPlugins({
  rename: {
    'gulp-file-include': 'fileInclude'
  }
});

// Sass task

function scssTask(){
    return src('./sass/*.scss', { sourcemaps : true })
        .pipe(sass())
        .pipe(postcss([cssnano()], {}))
        .pipe(dest('dist', { sourcemaps: '.'}))
}

function jsTask(){
    return src('./app/js/*.js', { sourcemaps : true})
        .pipe(terser())
        .pipe(dest('dist'), { sourcemaps : '.'})
}

// browsersync task
function bowserSyncTask(cb) {
    browsersync.init({
        server: {
            baseDir: '.'
        }
    })
    cb()
}

function reloadBrowserTask(cb) {
    browsersync.reload()
    cb()
}

function watcher() {
    watch('./*.html', reloadBrowserTask)
    watch(['app/js/**/*.js', 'sass/**/*.scss'], series(scssTask, jsTask, reloadBrowserTask))
}

exports.default = series(scssTask, jsTask, bowserSyncTask, watcher)

// para pasar el parametro usa --name:
// gulp defaultTask --name John
function parameterTask(cb, name) {
  // place code for your default task here
  console.log(`gulp works :D this is your parameter -> ${name}`)
  cb();
}

exports.parameterTask = parameterTask

function buildStyles() {
  return src('./sass/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./css'));
};

exports.buildStyles = buildStyles;

gulp.task('compress', function() {
  return gulp.src('./css/*.css')
      .pipe(uglifycss({
          "maxLineLen": 80,
          "uglyComments": true
      }))
      .pipe(gulp.dest('./dist/'))
})

function watchFiles() {
    gulp.watch('./sass/*.scss', gulp.series(buildStyles, gulp.task('compress')))
}

exports.defaultSeries = gulp.series(buildStyles, gulp.task('compress'), watchFiles)
