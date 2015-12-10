'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var server = require('./server');
var utf8ize = require('gulp-utf8ize-sourcemaps');

var $ = require('gulp-load-plugins')();

var tsProject = $.typescript.createProject({
  target: 'es5',
  module: 'commonjs',
  noEmitOnError: true,
  sortOutput: true
});

function doScriptTask(withReload) {
  var paths = [
    path.join(conf.paths.src, 'app/**/index.config.ts'),
    path.join(conf.paths.src, 'app/**/index.environments.ts'),
    path.join(conf.paths.src, 'app/**/index.constants.ts'),
    path.join(conf.paths.src, 'app/**/index.module.ts'),
    path.join(conf.paths.src, 'app/**/index.rootScope.ts'),
    path.join(conf.paths.src, 'app/**/index.route.ts'),
    path.join(conf.paths.src, 'app/**/index.run.ts'),
    path.join(conf.paths.src, 'app/*/**/*.ts')
  ];

  if (!(conf.isProduction || conf.isStaging)) {
    paths.push(
      path.join(conf.paths.src, 'dev/**/*.ts')
    );
  }

  return gulp.src(paths, { base: conf.paths.src })
    .pipe($.sourcemaps.init())
    .pipe($.tslint())
    .pipe($.tslint.report('prose', { emitError: false }))
    .pipe($.typescript(tsProject)).on('error', conf.errorHandler('TypeScript'))
    .pipe($.concat('index.module.js'))
    .pipe($.sourcemaps.write())
    .pipe(utf8ize())
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app')))
    .pipe($.if(withReload, server.reload({ isStream: true })))
    .pipe($.size());
}

gulp.task('scripts', ['tsd:install'], function () {
  return doScriptTask(true);
});

gulp.task('scripts:noReload', ['tsd:install'], function () {
  return doScriptTask(false);
});
