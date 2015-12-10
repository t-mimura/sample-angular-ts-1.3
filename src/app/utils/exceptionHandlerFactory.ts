namespace myApp.utils {
  'use strict';

  const DEFAULT_EXCEPTION_MESSAGE = '予期せぬ例外が発生しました。';

  /**
   * 例外が発生した際の処理を受け持つクラスです。
   * $exceptionHandlerに紐付けられて動作します。
   * {@link https://code.angularjs.org/1.3.20/docs/api/ng/service/$exceptionHandler}
   */
  export class ExceptionHandlerFactory {
    private logger: myApp.services.Logger = undefined;

    /** @ngInject */
    constructor(private $injector: ng.auto.IInjectorService) {
    }

    /**
     * Exception Handler を取得します。
     * @return Exception Handler関数
     */
    get() {
      return (exception: Error, cause?: string) => {
        // コンストラクタでDI解決しようとすると循環参照になって失敗するので、ここではlazy initializeとする。。
        if (this.logger === undefined) {
          this.logger = <myApp.services.Logger>this.$injector.get('logger');
        }

        let message: string = DEFAULT_EXCEPTION_MESSAGE;
        if (cause) {
          message += cause;
        }
        this.logger.error(message, exception);
        if (this.logger.debugEnabled) {
          this.logger.debug(message, exception);
        }

        // TODO: 適切なユーザ表示を行う
        alert(message);
      };
    }
  }
}
