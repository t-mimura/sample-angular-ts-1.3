namespace myApp {
  'use strict';

  /**
   * ルートスコープを表すインターフェースです。
   */
  export interface MyAppRootScope extends ng.IRootScopeService {
    data_that_is_used_by_all_pages: boolean;
  }

  /**
   * ルートスコープへ設定を行うためのクラスです。
   */
  export class RootScopeConfig {
    /**
     * RootScopeConfigを生成します。
     * ルートスコープの初期化を行います。
     * @param $rootScope ルートスコープのインジェクションです
     * @param $ancharScroll ancharScrollサービスのインジェクションです
     * @ngInject
     */
    constructor(
      $rootScope: MyAppRootScope,
      $anchorScroll: ng.IAnchorScrollService
    ) {
      $rootScope.data_that_is_used_by_all_pages = false;

      $rootScope.$on('$routeChangeSuccess', function () {
        $anchorScroll('top');
      });
    }
  }
}
