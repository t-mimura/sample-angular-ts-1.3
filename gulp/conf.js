/**
 *  This file contains the variables used in other gulp files
 *  which defines tasks
 *  By design, we only put there very generic config values
 *  which are used in several places to keep good readability
 *  of the tasks
 */

var gutil = require('gulp-util');

var isProduction = exports.isProduction = process.env.NODE_ENV === 'production';
var isStaging = exports.isStaging = (process.env.NODE_ENV === 'staging');

/**
 *  The main paths of your project handle these with care
 */
exports.paths = {
  src: 'src',
  dist: 'dist',
  tmp: '.tmp',
  specs: 'specs',
  e2e: 'e2e'
};

exports.bowerPriorityOrder = [
  '**/normalize.css'
];

exports.bowerInjection = {
  includeDev: !(isProduction || isStaging)
};

/**
 *  Common implementation for an error handler of a Gulp plugin
 */
exports.errorHandler = function(title) {
  'use strict';

  return function(err) {
    gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
    this.emit('end');
    if (isProduction || isStaging) {
      process.exit(1);
    }
  };
};
