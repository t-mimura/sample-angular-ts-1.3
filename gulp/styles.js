'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var server = require('./server');

var $ = require('gulp-load-plugins')();

var mainBowerFiles = require('main-bower-files');
var _ = require('lodash');

function doStyleTask(withReload) {
  var sassOptions = {
    style: 'expanded'
  };

  var injectFiles = gulp.src([
    path.join(conf.paths.src, '/app/**/*.scss'),
    path.join('!' + conf.paths.src, '/app/index.scss'),
    path.join('!' + conf.paths.src, '/app/styles/base.scss')
  ], { read: false });

  var injectOptions = {
    transform: function(filePath) {
      filePath = filePath.replace(conf.paths.src + '/app/', '');
      return '@import "' + filePath + '";';
    },
    starttag: '// injector',
    endtag: '// endinjector',
    addRootSlash: false
  };

  return gulp.src([
      path.join(conf.paths.src, '/app/index.scss')
    ])
    .pipe($.inject(injectFiles, injectOptions))
    .pipe($.inject(gulp.src(mainBowerFiles(conf.bowerInjection), {read: false})))
    .pipe($.sourcemaps.init())
    .pipe($.sass(sassOptions)).on('error', conf.errorHandler('Sass'))
    .pipe($.autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app/')))
    .pipe($.if(withReload, server.reload({ isStream: true })));
}

gulp.task('styles', function () {
  return doStyleTask(true);
});

gulp.task('styles:noReload', function () {
  return doStyleTask(false);
});
