namespace myApp.services {
  'use strict';

  /**
   * HTTPサービスを呼び出す際のデフォルトの設定です。
   */
  const DEFAULT_CONFIG: ng.IRequestShortcutConfig = {
    responseType: 'json',
    timeout: 30 * 1000
  };

  /**
   * HTTP通信時にエラーが起きたときのログ出力を行う関数です。
   * @param logger Loggerサービス
   * @param url HTTP通信したURL
   * @param data http response body
   * @param status http response status
   * @param httpErrorMessages HttpErrorMessagesユーティリティ
   */
  function log(
    logger: myApp.services.Logger,
    url: string,
    data: any,
    status: number
  ): void {
    // TODO: メッセージを正しく定義
    var message = 'HTTPで例外発生';
    let errorDetail = 'HTTP response error.\nurl: ' + url + ' => response: (' + status + ')';
    if (data) {
      errorDetail += '\n' + angular.toJson(data);
    }
    logger.error(message, errorDetail);
    logger.debug(message, errorDetail);
  }

  /**
   * HTTPリクエストの設定を表すインターフェースです。
   * errorProcessにHTTPレスポンスエラーの時の処理を指定できます。
   * また、この関数がtrueを返した場合は共通のエラー処理を実行しません。
   */
  export interface HttpRequestConfig extends ng.IRequestShortcutConfig {
    /**
     * HTTP通信でエラーが起きた際の処理
     */
    errorProcess?: { (data: any, status: number, headers: ng.IHttpHeadersGetter, config: ng.IRequestConfig): boolean };
  }

  /**
   * $httpをラップしたクラスです。
   * Http通信で共通の処理を行います。またデフォルトのConfigを次のように設定しています。
   * - responseType: 'json'
   * - timeout: 30,000[msec]
   */
  export class Http {
    /**
     * Httpを生成します。
     * @param $http $httpのインジェクションです
     * @param logger loggerサービスのインジェクションです
     * @ngInject
     */
    constructor(
      private $http: ng.IHttpService,
      private logger: services.Logger
    ) {
    }
    /**
     * HTTPのGETメソッドを呼び出します。
     * @param url URL
     * @param config 通信時の設定
     * @return HTTP通信のPromise
     * @template T
     */
    get<T>(url: string, config?: HttpRequestConfig): ng.IHttpPromise<T> {
      config = angular.extend({}, DEFAULT_CONFIG, config);
      return this.call<T>('GET', url, config);
    }
    /**
     * HTTPのPOSTメソッドを呼び出します。
     * @param url URL
     * @param data payload
     * @param config 通信時の設定
     * @return HTTP通信のPromise
     * @template T
     */
    post<T>(url: string, data: any, config?: HttpRequestConfig): ng.IHttpPromise<T> {
      config = angular.extend({}, DEFAULT_CONFIG, config, { data: data });
      return this.call<T>('POST', url, config);
    }
    /**
     * HTTPのPUTメソッドを呼び出します。
     * @param url URL
     * @param data payload
     * @param config 通信時の設定
     * @return HTTP通信のPromise
     * @template T
     */
    put<T>(url: string, data: any, config?: HttpRequestConfig): ng.IHttpPromise<T> {
      config = angular.extend({}, DEFAULT_CONFIG, config, { data: data });
      return this.call<T>('PUT', url, config);
    }
    /**
     * HTTPのDELETEメソッドを呼び出します。
     * @param url URL
     * @param data payload
     * @param config 通信時の設定
     * @return HTTP通信のPromise
     * @template T
     */
    delete<T>(url: string, config?: HttpRequestConfig): ng.IHttpPromise<T> {
      config = angular.extend({}, DEFAULT_CONFIG, config);
      return this.call<T>('DELETE', url, config);
    }
    /**
     * HTTP通信を行います。
     * @param method メソッド(GET/POST/PUT/DELETE)
     * @param url URL
     * @param myConfig 通信の設定
     * @return HTTP通信のPromise
     * @template T
     */
    private call<T>(method: string, url: string, myConfig: HttpRequestConfig): ng.IHttpPromise<T> {
      const tempConfig: ng.IRequestConfig = <ng.IRequestConfig>myConfig;
      tempConfig.method = method;
      tempConfig.url = url;

      return this.$http<T>(tempConfig).success((data: T, status: number, headers: ng.IHttpHeadersGetter, config: ng.IRequestConfig) => {
        this.logger.debug('http success - ' + url);
      }).error((data: any, status: number, headers: ng.IHttpHeadersGetter, config: ng.IRequestConfig) => {
        log(this.logger, url, data, status);
        if (myConfig.errorProcess && myConfig.errorProcess(data, status, headers, config)) {
          return;
        }
        // TODO: 適切な画面表示
        alert(url + '(' + status + ')');
      });
    }
  }
}
