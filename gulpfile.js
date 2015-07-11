"use strict";

var del = require('del');
var gulp = require('gulp');
var gulpList = require('gulp-task-listing');
var electron = require('electron-prebuilt');
var es6transpiler = require('gulp-es6-transpiler');
var path = require('path');
var shell = require('shelljs');

gulp.task('help', gulpList);

gulp.task('default', ['help']);

gulp.task('clean', function() {
  del(['./dist/*']);
});

gulp.task('build', ['clean'], function() {
  gulp.src('package.json')
    .pipe(gulp.dest('./dist'));

  gulp.src('index.html')
    .pipe(gulp.dest('./dist'));

  gulp.src('*.js')
    .pipe(es6transpiler())
    .pipe(gulp.dest('./dist'));
});

gulp.task('run', ['build'], function() {
  var command = electron + " " + path.join(__dirname, 'dist');
  shell.exec(command, function(status, output) { });
});
