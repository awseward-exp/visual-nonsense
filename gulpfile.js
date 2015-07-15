"use strict";

var del = require("del");
var gulp = require("gulp");
var gulpList = require("gulp-task-listing");
var es6transpiler = require("gulp-es6-transpiler");
var path = require("path");
var shell = require("shelljs");

gulp.task("help", gulpList);

gulp.task("default", ["help"]);

gulp.task("clean", function() {
  return del(["./dist/*"]);
});

gulp.task("build", ["clean"], function() {
  gulp.src("package.json")
    .pipe(gulp.dest("./dist"));

  gulp.src("src/index.html")
    .pipe(gulp.dest("./dist"));

  return gulp.src("src/*.js")
    .pipe(es6transpiler())
    .pipe(gulp.dest("./dist"));
});

gulp.task("run", ["build"], function() {
  var command = require("electron-prebuilt") + " " + path.join(__dirname, "dist");
  return shell.exec(command);
});
