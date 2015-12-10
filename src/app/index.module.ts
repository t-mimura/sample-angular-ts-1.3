/// <reference path="../../.tmp/typings/tsd.d.ts" />

// top level

/// <reference path="index.constants.ts" />
/// <reference path="index.config.ts" />
/// <reference path="index.rootScope.ts" />
/// <reference path="index.route.ts" />
/// <reference path="index.run.ts" />

// utils
/// <reference path="utils/exceptionHandlerFactory.ts" />
/// <reference path="utils/functions.ts" />

// model
/// <reference path="models/hoge.model.ts" />

// core service
/// <reference path="services/http.service.ts" />
/// <reference path="services/logger.service.ts" />

// other service (store)
/// <reference path="stores/hoges.store.ts" />

// other service (use store)

// component
/// <reference path="components/clock/clock.directive.ts" />

// page controller
/// <reference path="pages/hogeList/hogeList.controller.ts" />
/// <reference path="pages/hogeDetail/hogeDetail.controller.ts" />

/**
 * アプリケーションの名前空間です。
 */
namespace myApp {
  'use strict';

  export const appModule = angular.module('myApp', ['ngRoute'])
    .config(Config)
    .config(RouterConfig)
    .run(RootScopeConfig)
    .run(RunBlock)

    .factory('$exceptionHandler', /** @ngInject */($injector: ng.auto.IInjectorService) => {
      return new utils.ExceptionHandlerFactory($injector).get();
    })

    .provider('logger', myApp.services.LoggerProvider)

    .service('http', myApp.services.Http)

    .service('hogeStore', myApp.stores.HogesStore)

    .directive('clock', myApp.components.clock)

    .controller('HogeListController', myApp.controllers.HogeListController)
    .controller('HogeDetailController', myApp.controllers.HogeDetailController)
    ;
}
