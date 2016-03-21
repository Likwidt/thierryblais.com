"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect');
var open = require('gulp-open');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var inject = require('gulp-inject');
var sources = {
	js: ['js/*.js', 'js/**/*.js'],
	css: ['css/*.css'],
	sass: ['sass/*.scss'],
	html: ['index.html', 'partials/*.html']
}

 
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

gulp.task('inject', function () {
	var target = gulp.src('index.html');
	var allSources = sources.js.concat(sources.css);

	console.log(allSources);

	return target
			.pipe(inject(gulp.src(allSources)))
			.pipe(gulp.dest(''));

});

gulp.task('sass', function () {
  return gulp.src(sources.sass)
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(concat('tb.css'))
    .pipe(gulp.dest('css'));
});
 
gulp.task('watch', function () {
  gulp.watch(sources.html, ['html']);
  gulp.watch(sources.sass, ['sass', 'html']);
});
 
gulp.task('default', ['sass', 'inject', 'open', 'watch']);

 

 

