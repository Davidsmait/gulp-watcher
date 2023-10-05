const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const pipeline = require('readable-stream').pipeline;
const gulpLoadPlugins = require('gulp-load-plugins');
const uglifycss = require('gulp-uglifycss');

const $ = gulpLoadPlugins({
  rename: {
    'gulp-file-include': 'fileInclude'
  }
});


function defaultTask(cb) {
  // place code for your default task here
  console.log("gulp works :D this is your parameter ->")
  cb();
}
exports.default = defaultTask


function buildStyles() {
  return gulp.src('./sass/*.scss')
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

exports.watch = function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
};
