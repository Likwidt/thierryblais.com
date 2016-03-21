"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect');
var open = require('gulp-open');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
 
gulp.task('connect', function() {
  connect.server({
    fallback: 'index.html',
    port: 4567,
    livereload: true
  });
});
 
gulp.task('html', function () {
  gulp.src('index.html')
    .pipe(connect.reload());
});

gulp.task('open', ['connect'], function () {
    gulp.src('index.html')
        .pipe(open({
            uri: 'http://localhost:4567/index.html',
            app: 'chrome' 
        }));

});

gulp.task('sass', function () {
  return gulp.src('sass/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(concat('tb.css'))
    .pipe(gulp.dest('css'));
});
 
gulp.task('watch', function () {
  gulp.watch(['index.html', 'partials/*.html'], ['html']);
  gulp.watch('sass/*.scss', ['sass', 'html']);
});
 
gulp.task('default', ['sass', 'open', 'watch']);

 

 

