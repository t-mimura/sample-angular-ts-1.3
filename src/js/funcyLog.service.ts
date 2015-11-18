namespace myApp {
  'use strict';

  export class FuncyLog {

    /** inject のminify対策しないと */
    constructor(private $log: ng.ILogService) {
    }
    log(message: string) {
      var baseCss = ' background-color: black; line-height: 2em;';
      this.$log.log('%c * %c' + message + '%c * ',
        'color:yellow; font-weight: bold;' + baseCss,
        'color:pink;' + baseCss,
        'color:yellow; font-weight: bold;' +  baseCss);
    }
  }
}
/*
module.exports = ['$log', function($log) {
  var funcyLog = function(message) {
    var baseCss = ' background-color: black; line-height: 2em;';
    $log.log('%c * %c' + message + '%c * ',
      'color:yellow; font-weight: bold;' + baseCss,
      'color:pink;' + baseCss,
      'color:yellow; font-weight: bold;' +  baseCss);
  };

  return funcyLog;
}];
*/
