/// <reference path="../app/index.module.ts" />

namespace myApp {
  'use strict';

  myApp.appModule
    .config(/** @ngInject */($logProvider: ng.ILogProvider) => {
      $logProvider.debugEnabled(true);
    });
}
