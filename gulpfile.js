"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect');
var open = require('gulp-open');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var inject = require('gulp-inject');
var jslint = require('gulp-jslint');
var clean = require('gulp-clean');
var minifyJS = require('gulp-minify');
var cleanCSS = require('gulp-clean-css');
var scsslint = require('gulp-scsslint');
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

gulp.task('minify-css', function () {
  gulp.src(sources.sass)
      .pipe(sass.sync().on('error', sass.logError))
      .pipe(concat('tb.min.css'))
      .pipe(cleanCSS())
      .pipe(gulp.dest('dist'));
});

gulp.task('compress-js', function () {
  return gulp .src(sources.js)
              .pipe(concat('tb.js'))
              .pipe(minifyJS({
                ext: {
                  min: '.min.js'
                }
              }))
              .pipe(gulp.dest('dist'));
});

gulp.task('delete-dev-js', ['compress-js'], function () {
  return gulp .src('dist/tb.js')
              .pipe(clean({force: true}));
});

gulp.task('minify-js', ['compress-js', 'delete-dev-js']);

gulp.task('clean-dist', function() {
  return gulp.src(['dist'])
      .pipe(clean({force: true}));
});

gulp.task('inject-dist', function() {
  return gulp.src('index.html')
      .pipe(inject(gulp.src('dist/tb.min.js')))      
      .pipe(inject(gulp.src('dist/tb.min.css')))
      .pipe(gulp.dest(''));
});

 
gulp.task('default', ['jslint', 'sass', 'inject', 'test', 'open', 'watch']);
gulp.task('dist', ['clean-dist', 'jslint', 'minify-css', 'minify-js', 'inject-dist', 'open']);

 

 

