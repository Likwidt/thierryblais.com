"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect');
var open = require('gulp-open');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var inject = require('gulp-inject');
var jshint = require('gulp-jshint');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var stylish = require('jshint-stylish');
var sourcemaps = require('gulp-sourcemaps');
var cleanCSS = require('gulp-clean-css');
var runSequence = require('run-sequence');
var angularFilesort = require('gulp-angular-filesort');
var Karma = require('karma').Server;
var sources = {
	js: ['js/*.js', 'js/**/*.js'],
	css: ['css/*.css', 'lib/**/*.min.css'],
  bower: ['bower_components/**/*'],
  img: ['img/*.*', 'img/**/*.*'],
  partials: ['partials/*.*', 'partials/**/*.*'],
	sass: ['sass/*.scss'],
	html: ['index.html', 'partials/*.html'],
  lib: ['lib/**/*.min.js'],
  libcss: ['lib/**/*.min.css']
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
        		gulp.src(sources.js.concat(sources.lib))
        			.pipe(angularFilesort())
        		))			
        	.pipe(inject(gulp.src(sources.css)))
        	.pipe(gulp.dest(''));
});

gulp.task('sass', function () {
  return gulp.src(sources.sass)
    .pipe(sass.sync().on('error', sass.logError))
    //.pipe(concat('tb.css'))
    .pipe(gulp.dest('css'));
});

gulp.task('jshint', function () {
    return gulp.src(sources.js)
      .pipe(jshint())
      .pipe(jshint.reporter('jshint-stylish'))
      .pipe(jshint.reporter('fail'));
});

gulp.task('watch-html', function () {
  return gulp.watch(sources.html, ['html']);
});
gulp.task('watch-sass', function () {
  return gulp.watch(sources.sass, ['sass', 'inject', 'html']);
});
gulp.task('watch-js', function () {
  return gulp.watch(sources.js, ['html']);
});
 
gulp.task('watch', ['watch-html', 'watch-sass', 'watch-js']);

gulp.task('minify-css', function () {
  return gulp.src(sources.sass)
      .pipe(sass.sync().on('error', sass.logError))
      .pipe(concat('tb.min.css'))
      .pipe(sourcemaps.init())
        .pipe(cleanCSS())
      .pipe(sourcemaps.write('../css'))
      .pipe(gulp.dest('dist/css'));
});

gulp.task('minify-js', function () {
  return gulp 
    .src(sources.js.concat(sources.lib))
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
  runSequence('jshint', 'sass', 'test', 'inject', 'watch', 'connect', 'open', done)
});

gulp.task('dist', function(done) {
  runSequence('clean-dist', 'jshint', 'test', 'minify-css', 'minify-js', 'copy-assets', 'inject-dist');
});

 

 

