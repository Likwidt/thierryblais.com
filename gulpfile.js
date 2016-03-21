"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect');
var open = require('gulp-open');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var inject = require('gulp-inject');
var jslint = require('gulp-jslint');
var angularFilesort = require('gulp-angular-filesort');
var Karma = require('karma').Server;
var sources = {
	js: ['js/*.js', 'js/**/*.js'],
	css: ['css/*.css'],
	sass: ['sass/*.scss'],
	html: ['index.html', 'partials/*.html']
}

 
gulp.task('connect', ['test'], function() {
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

gulp.task('test', function (done) {
  new Karma({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('inject', function () {
	var target = gulp.src('index.html');
	var allSources = sources.js.concat(sources.css);

	return target
			.pipe(inject(
				gulp.src(allSources)
					.pipe(angularFilesort())
				))
			.pipe(gulp.dest(''));

});

gulp.task('sass', function () {
  return gulp.src(sources.sass)
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(concat('tb.css'))
    .pipe(gulp.dest('css'));
});

gulp.task('jslint', function () {
    return gulp.src(sources.js)
	    .pipe(
	    	jslint({
	            node: true,
	            evil: true,
	            nomen: true,
	            white: true,
	            errorsOnly: false,
	            global: ['angular']
	        }))
    		.on('error', function (error) {
	            console.error(String(error));
	        });
});
 
gulp.task('watch', function () {
  gulp.watch(sources.html, ['html']);
  gulp.watch(sources.sass, ['sass', 'html']);
});
 
gulp.task('default', ['jslint', 'sass', 'inject', 'test', 'open', 'watch']);

 

 

