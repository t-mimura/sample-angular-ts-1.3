'use strict';

var path = require('path');
var gulp = require('gulp');
var gls = require('gulp-live-server');
var through = require('through2');
var _ = require('lodash');
var conf = require('./conf');

var mockServerDir = 'mock-server';
var mockServerScriptPath = mockServerDir + '/mock-server.js';
var liveServer;

exports.reload = function(event) {
  if (event && event.isStream) {
    return through.obj(
      function(file, enc, cb) {
        if (liveServer) liveServer.notify(file);
        cb(null, file);
      },
      function(cb) {
        cb();
      }
    );
  } else {
    if (liveServer) liveServer.notify(event);
  }
};

exports.stop = function() {
  if (liveServer) return liveServer.stop();
};

function createServer(statics, includeBower) {
  var myEnv = {
    MOCK_SERVER_INCLUDE_BOWER: includeBower ? 'true' : 'false',
    MOCK_SERVER_APP_SOURCE: statics.join(',')
  };
  var env = _.extend({}, myEnv, process.env);
  return gls([mockServerScriptPath], { env: env });
}

gulp.task('serve', function () {
  if (conf.isStaging || conf.isProduction) {
    gulp.start('serve:dist');
  } else {
    gulp.start('serve:tmp');
  }
});

gulp.task('serve:tmp', ['watch'], function () {
  liveServer = createServer([
      path.join(conf.paths.tmp, '/serve'),
      conf.paths.src
    ],
    true);
  liveServer.start();

  // if my mock script is changed, restart server.
  gulp.watch(path.join(mockServerDir, '/**/*.js'), function() {
    liveServer.start();
  });
});

gulp.task('serve:dist', ['build'], function () {
  liveServer = createServer([conf.paths.dist], false);
  liveServer.start();
});

gulp.task('serve:e2e', ['serve:dist']);
