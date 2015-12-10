namespace myApp {
  'use strict';

  /**
   * 全てのモジュールが読み込まれたタイミングで処理する初期化を行うクラスです。
   */
  export class RunBlock {

    /**
     * 初期処理を行います。
     * @param logger Loggerサービスのインジェクション
     * @ngInject
     */
    constructor(
      logger: services.Logger
    ) {
      logger.debug('application start!');
    }
  }
}
