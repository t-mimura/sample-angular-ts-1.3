'use strict';

var gulp = require('gulp');
var requireDir = require('require-dir');
var tasks = requireDir('./gulp');

gulp.task('default', ['build'], function() {
});
