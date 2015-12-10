namespace myApp {
  'use strict';

  /** 各画面のパスを定義するオブジェクトです。 */
  export const PATH = Object.freeze({
    HOGE_LIST: '/hoge-list',
    HOGE_DETAIL: (id: string): string => {
      return '/hoge-detail/' + id;
    }
  });

  /**
   * 画面遷移(ルート)の設定を行うクラスです。
   */
  export class RouterConfig {
    /**
     * RouteConfigのオブジェクトを生成します。
     * Routeの設定を行います。
     * @param $routeProvider routeProviderのインジェクション
     * @ngInject
     */
    constructor($routeProvider: ng.route.IRouteProvider) {
      $routeProvider
        .when(PATH.HOGE_LIST, {
          templateUrl: 'app/pages/hogeList/hogeList.html',
          controller: 'HogeListController',
          controllerAs: 'controller'
        })
        .when(PATH.HOGE_DETAIL(':id'), {
          templateUrl: 'app/pages/hogeDetail/hogeDetail.html',
          controller: 'HogeDetailController',
          controllerAs: 'controller'
        })
        .otherwise({
          redirectTo: PATH.HOGE_LIST
        });
    }
  }
}
