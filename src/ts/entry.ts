/// <reference path="../../.tmp/typings/tsd.d.ts" />

/// <reference path="funcyLog.service.ts" />
/// <reference path="mainPageController.ts" />
/// <reference path="time.directive.ts" />

namespace myApp {
  'use strict';

  angular.module('myApp', [])
    .service('funcyLog', FuncyLog)
    .controller('mainPageController', MainPageController)
    .directive('time', time)

    .run(['funcyLog', function(funcyLog: FuncyLog) {
      funcyLog.log('application start!!!');
    }]);

}

/*

  var mainPageController = require('./mainPageController.js');
  var funcyLog = require('./funcyLog.service.js');
  var time = require('./time.directive.js');

  var myApp = angular.module('myApp', []);

  myApp.controller('mainPage', mainPageController);
  myApp.service('funcyLog', funcyLog);
  myApp.directive('time', time);

  myApp.run(['funcyLog', function(funcyLog) {
    funcyLog('application start!!!');
  }]);
*/
