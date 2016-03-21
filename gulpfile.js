"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect');
var open = require('gulp-open');
 
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
 
gulp.task('watch', function () {
  gulp.watch(['index.html'], ['html']);
});
 
gulp.task('default', ['open', 'watch']);
