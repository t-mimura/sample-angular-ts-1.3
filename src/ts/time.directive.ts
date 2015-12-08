namespace myApp {

  interface TimeScope extends ng.IScope {
    format: string;
  }

  class TimeController {
    time: string;

    constructor($scope: TimeScope, $interval: ng.IIntervalService) {
      this.time = '';
      var format = $scope.format || 'YYYY/MM/DD-hh:mm:ss';
      $interval(() => {
        this.time = moment().format(format);
      }, 100);
    }
  }

  export function time(): ng.IDirective {
    return {
      restrict: 'E',
      template: '<div><span>{{controller.time}}</span></div>',
      scope: {
        format: '@'
      },
      controller: TimeController,
      controllerAs: 'controller'
    }
  }
}
/*
module.exports = function() {
  return {
    restrict: 'E',
    template: '<div><span>{{time}}</span><div>',
    scope: {
      format: '@'
    },
    controller: ['$scope', '$interval', function($scope, $interval) {
      var format = $scope.format || 'YYYY/MM/DD-hh:mm:ss';
      $interval(function() {
        $scope.time = moment().format(format);
      }, 100);
    }]
  };
};
*/
