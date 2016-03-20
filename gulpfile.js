"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect');
var open = require('gulp-open');
 
gulp.task('connect', function() {
  connect.server({
    root: ['www'],
    fallback: 'index.html',
    port: 4567,
    livereload: true
  });
});
 
gulp.task('html', function () {
  gulp.src('./www/*.html')
    .pipe(connect.reload());
});


gulp.task('open', ['connect'], function () {
    gulp.src('./www/*.html')
        .pipe(open({
            uri: 'http://localhost:4567/index.html',
            app: 'chrome' }));

});
 
gulp.task('watch', function () {
  gulp.watch(['./www/*.html'], ['html']);
});
 
gulp.task('default', ['open', 'watch']);
