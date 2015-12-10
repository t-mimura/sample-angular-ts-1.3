namespace myApp.components {

  /**
   * Clockコンポーネント内のスコープを表すインターフェースです。
   */
  interface ClockScope {
    format: string;
  }

  /**
   * Clockコンポーネントのコントローラクラスです。
   */
  class ClockController {
    /** 表示する時刻文字列 */
    time: string;

    /**
     * ClockControllerを生成します。
     * @param $scope scopeのインジェクション
     * @param $interval intervalサービスのインジェクション
     * @ngInject
     */
    constructor($scope: ClockScope, $interval: ng.IIntervalService) {
      this.time = '';
      const format = $scope.format || 'YYYY/MM/DD-hh:mm:ss';
      $interval(() => {
        this.time = moment().format(format);
      }, 100);
    }
  }

  /**
   * Clockディレクティブ関数本体です。
   * @ngInject
   */
  export function clock(): ng.IDirective {
    return {
      restrict: 'E',
      templateUrl: 'app/components/clock/clock.html',
      scope: {
        format: '@'
      },
      controller: ClockController,
      controllerAs: 'controller'
    };
  }
}
