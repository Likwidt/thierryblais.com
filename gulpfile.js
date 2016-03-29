"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect');
var open = require('gulp-open');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var inject = require('gulp-inject');
var jslint = require('gulp-jslint');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var cleanCSS = require('gulp-clean-css');
var runSequence = require('run-sequence');
var angularFilesort = require('gulp-angular-filesort');
var Karma = require('karma').Server;
var sources = {
	js: ['js/*.js', 'js/**/*.js'],
	css: ['css/*.css'],
  bower: ['bower_components/**/*'],
  img: ['img/*.*', 'img/**/*.*'],
  partials: ['partials/*.*', 'partials/**/*.*'],
	sass: ['sass/*.scss'],
	html: ['index.html', 'partials/*.html']
}
 
gulp.task('connect', function() {
  return connect.server({
    fallback: 'index.html',
    port: 4567,
    livereload: true
  });
});
 
gulp.task('html', function () {
  return gulp 
          .src('index.html')
          .pipe(connect.reload());
});

gulp.task('open', function () {
    return gulp 
            .src('index.html')
            .pipe(open({
                uri: 'http://localhost:4567/index.html',
                app: 'chrome' 
            }));
});

gulp.task('test', function (cb) {
  return new Karma({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, cb).start();
});

gulp.task('inject', function () {
	return gulp 
          .src('index.html')
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
      .pipe(sourcemaps.init())
        .pipe(cleanCSS())
      .pipe(sourcemaps.write('../css'))
      .pipe(gulp.dest('dist/css'));
});

gulp.task('minify-js', function () {
  return gulp 
    .src(sources.js)
    .pipe(angularFilesort())
    .pipe(concat('tb.min.js'))
    .pipe(sourcemaps.init())
      .pipe(uglify())
    .pipe(sourcemaps.write('../js'))
    .pipe(gulp.dest('dist/js'));
});


gulp.task('clean-dist', function() {
  return gulp .src(['dist'])
              .pipe(clean({force: true}));
});

gulp.task('inject-dist', function() {

  var min = gulp.src(['./dist/js/tb.min.js', './dist/css/tb.min.css'], {read: false});

  return gulp .src('index.html')
              .pipe(inject(min,{ignorePath: 'dist'}))
              .pipe(gulp.dest('./dist'));


});

gulp.task('copy-bower', function() {
  return gulp .src(sources.bower)
              .pipe(gulp.dest('dist/bower_components'));
});

gulp.task('copy-img', function() {
  return gulp .src(sources.img)
              .pipe(gulp.dest('dist/img'));
});

gulp.task('copy-partials', function() {
  return gulp .src(sources.partials)
              .pipe(gulp.dest('dist/partials'));
});

gulp.task('copy-assets', ['copy-bower', 'copy-img', 'copy-partials']);

 
gulp.task('default', function(done) {
  runSequence('jslint', 'sass', 'test', 'inject', 'connect', 'open', 'watch', done)
});

gulp.task('dist', function(done) {
  runSequence('clean-dist', 'jslint', 'test', 'minify-css', 'minify-js', 'copy-assets', 'inject-dist');
});

//gulp.task('dist', ['clean-dist', 'jslint', 'minify-css', 'minify-js', 'copy-assets', 'inject-dist']);

 

 

