var gulp = require('gulp');
var less = require('gulp-less');
var jade = require('gulp-jade');
var uglify = require('gulp-uglify');
var bower = require('bower-files')({
  overrides: {
    'counter-up': {
      main: 'jquery.counterup.js',
      dependencies: {}
    },
    waypoints: {
      main: 'lib/jquery.waypoints.js',
      dependencies: {}
    }
  }
});
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var browserSync = require('browser-sync').create();
var data = require('gulp-data');


var paths = {
  'styles': ['./style.less'],
  'template': ['./index.jade'],
  'script': ['./script.js']
}

gulp.task('less', function() {
  return gulp.src(paths.styles)
  .pipe(less())
  .pipe(concat('style.css'))
  .pipe(minifyCss())
  .pipe(gulp.dest('./public'))
})

gulp.task('bowerdeps', function() {
  return gulp.src(bower.ext('js').files)
    .pipe(concat('libs.min.js'))
    .pipe(gulp.dest('./public/'))
})

gulp.task('script', function() {
  return gulp.src(paths.script)
  //.pipe(uglify())
  .pipe(gulp.dest('./public/'))
})

gulp.task('jade', function() {
  return gulp.src(paths.template)
  .pipe(data(function(file) {
    return require('./data.json')
  }))
  .pipe(jade())
  .pipe(gulp.dest('./public'))
})

gulp.task('less-watch', ['less'], browserSync.reload);
gulp.task('script-watch', ['script'], browserSync.reload);
gulp.task('jade-watch', ['jade'], browserSync.reload);

gulp.task('watch', ['bowerdeps', 'script', 'less', 'jade'], function() {
  browserSync.init({
    server: {
      baseDir: './public/'
    },
    files: ['public/*']
  })

  gulp.watch(paths.styles, ['less-watch'])
  gulp.watch(paths.template, ['jade-watch'])
  gulp.watch(paths.script, ['script-watch'])
})

gulp.task('default', ['less', 'jade'])
