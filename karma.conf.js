'use strict';

var path = require('path');
var conf = require('./gulp/conf');

var _ = require('lodash');
var mainBowerFiles = require('main-bower-files');

function listFiles() {
  var bowerFiles = mainBowerFiles({
    includeDev: true,
    filter: /.*\.js/
  });
  return [].concat(bowerFiles)
    .concat([
      path.join(conf.paths.tmp, '/serve/app/index.module.js'),
      path.join(conf.paths.specs, '/**/*.spec.js'),
      path.join(conf.paths.specs, '/**/*.mock.js'),
      path.join(conf.paths.src, '/**/*.html')
    ]);
}

module.exports = function(config) {

  var configuration = {
    files: listFiles(),

    singleRun: true,

    autoWatch: false,

    frameworks: ['jasmine'],

    ngHtml2JsPreprocessor: {
      stripPrefix: 'src/',
      moduleName: 'dsOrder'
    },

    browsers : ['PhantomJS'],

    plugins : [
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-ng-html2js-preprocessor'
    ],

    preprocessors: {
      'src/**/*.html': ['ng-html2js']
    }
  };

  // This block is needed to execute Chrome on Travis
  // If you ever plan to use Chrome and Travis, you can keep it
  // If not, you can safely remove it
  // https://github.com/karma-runner/karma/issues/1144#issuecomment-53633076
  if(configuration.browsers[0] === 'Chrome' && process.env.TRAVIS) {
    configuration.customLaunchers = {
      'chrome-travis-ci': {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    };
    configuration.browsers = ['chrome-travis-ci'];
  }

  config.set(configuration);
};
