'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var server = require('./server');

var $ = require('gulp-load-plugins')();

var mainBowerFiles = require('main-bower-files');
var _ = require('lodash');

var replace = require('gulp-replace');

gulp.task('inject', ['scripts:noReload', 'styles:noReload'], function () {

  var injectStyles = gulp.src([
    path.join(conf.paths.tmp, '/serve/app/**/*.css'),
    path.join('!' + conf.paths.tmp, '/serve/app/vendor.css')
  ], { read: false });

  var injectScripts = gulp.src([
    path.join(conf.paths.src, '/app/**/*.module.js'),
    path.join(conf.paths.src, '/app/**/*.js'),
    path.join(conf.paths.tmp, '/serve/app/**/*.module.js'),
    path.join(conf.paths.tmp, '/serve/app/**/*.js'),
    path.join('!' + conf.paths.src, '/app/**/*.spec.js'),
    path.join('!' + conf.paths.src, '/app/**/*.mock.js')
  ], { read: false });

  var injectOptions = {
    ignorePath: [conf.paths.src, path.join(conf.paths.tmp, '/serve')],
    addRootSlash: false
  };

  var bowerAll = mainBowerFiles(conf.bowerInjection);
  var bowerHead = mainBowerFiles(_.extend({}, conf.bowerInjection, {filter: conf.bowerPriorityOrder}));
  var bowerTail = _.difference(bowerAll, bowerHead);

  return gulp.src(path.join(conf.paths.src, '/*.html'))
    .pipe($.inject(injectStyles, injectOptions))
    .pipe($.inject(injectScripts, injectOptions))
    .pipe($.inject(
      gulp
        .src(bowerHead, {read: false})
        .pipe($.order(conf.bowerPriorityOrder))
      , {name: 'bowerhead', relative: true})
    )
    .pipe($.inject(
      gulp
        .src(bowerTail, {read: false})
      , {name: 'bower', relative: true})
    )
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve')))
    .pipe(server.reload({ isStream: true }));
});
