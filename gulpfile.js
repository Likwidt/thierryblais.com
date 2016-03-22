"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect');
var open = require('gulp-open');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var inject = require('gulp-inject');
var jslint = require('gulp-jslint');
var clean = require('gulp-clean');
var angularFilesort = require('gulp-angular-filesort');
var Karma = require('karma').Server;
var sources = {
	js: ['js/*.js', 'js/**/*.js'],
	css: ['css/*.css'],
	googleFonts: ['https://fonts.googleapis.com/css?family=Open+Sans:400,700'],
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
 
gulp.task('html', ['sass'], function () {
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

gulp.task('inject', ['sass'], function () {
	var target = gulp.src('index.html');

	return target
			.pipe(inject(
				gulp.src(sources.js)
					.pipe(angularFilesort())
				))			
			.pipe(inject(gulp.src(sources.css)))
			.pipe(gulp.dest(''));

});

gulp.task('sass', function () {
  return gulp.src(sources.sass)
    .pipe(sass.sync().on('error', sass.logError))
    //.pipe(concat('tb.css'))
    .pipe(clean('css'))
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
	            global: ['angular', 'document', 'window', 'FastClick']
	        }))
    		.on('error', function (error) {
	            console.error(String(error));
	        });
});
 
gulp.task('watch', function () {
  gulp.watch(sources.html, ['html']);
  gulp.watch(sources.sass, ['sass', 'html']);
  gulp.watch(sources.js, ['inject', 'html']);
});
 
gulp.task('default', ['jslint', 'sass', 'inject', 'test', 'open', 'watch']);

 

 

