namespace myApp.services {
  'use strict';

  /**
   * LoggerのserviceProviderクラスです。
   * $logProviderとdebugEnabledを共有します。
   */
  export class LoggerProvider implements ng.IServiceProvider {
    private service: LoggerImpl = undefined;
    /** @ngInject */
    constructor(private $logProvider: ng.ILogProvider) {
      this.debugEnabled = false;
    }
    /**
     * デバグレベルのログ出力有効/無効を表すプロパティです。
     * @value デバグログ出力が有効な場合`true`
     */
    set debugEnabled(enabled: boolean) {
      this.$logProvider.debugEnabled(enabled);
    }
    get debugEnabled(): boolean {
      return this.$logProvider.debugEnabled();
    }
    /** @ngInject */
    $get($log: ng.ILogService, $http: ng.IHttpService): Logger {
      if (this.service === undefined) {
        this.service = new LoggerImpl($log, $http, this.debugEnabled);
      }
      return this.service;
    }
  }

  /**
   * Loggerサービスを表すインターフェースです。
   */
  export interface Logger {
    /**
     * debugログが有効かどうか。
     */
    debugEnabled: boolean;
    /**
     * デバグログを出力します。
     * @param data ログ出力する内容
     * @param cause ログ出力する内容の詳細
     */
    debug: (data: any, cause?: any) => void;
    /**
     * infoログを出力します。
     * @param message メッセージ
     * @param options 出力オプション
     */
    info: (message: string, ...options: string[]) => void;
    /**
     * エラーログを出力します。
     * @param data ログ出力する内容
     * @param cause ログ出力する内容の詳細
     */
    error: (data: any, cause?: any) => void;
  }

  /**
   * Loggerサービスを実装するクラスです。
   * {@link myApp.service.Logger}
   */
  class LoggerImpl implements Logger {
    constructor(private $log: ng.ILogService, private $http: ng.IHttpService, private isDebugEnabled: boolean) {
    }
    /**
     * ログをLogStoreへ送信します。
     * @param message ログメッセージ
     */
    sendLogStore(message: string): void {
      // todo
      // this.$http.post(url, message).error((data: reason) => {
      //   this.$log.error(this.formatMessage(data));
      // });
    }
    /**
     * デバグログを出力します。
     * @param data ログ出力する内容
     * @param cause ログ出力する内容の詳細
     */
    debug(data: any, cause?: any): void {
      if (this.debugEnabled === false) {
        return;
      }
      this.$log.debug(this.formatMessage(data, cause));
    }
    /**
     * infoログを出力します。
     * @param message メッセージ
     * @param options 出力オプション
     */
    info(message: string, ...options: string[]): void {
      let args = [message];
      args = args.concat(options);
      this.$log.info.apply(null, args);
    }
    /**
     * エラーログを出力します。
     * @param data ログ出力する内容
     * @param cause ログ出力する内容の詳細
     */
    error(data: any, cause?: any): void {
      this.$log.error(this.formatMessage(data));
      this.sendLogStore(this.formatMessage(data, cause));
    }
    /**
     * デバグレベルのログ出力が有効かどうかを取得します。
     * @return デバグレベルのログが有効な場合`true`
     */
    get debugEnabled(): boolean {
      return this.isDebugEnabled;
    }

    /**
     * ログメッセージを整形します。
     * @param data ログ出力する内容
     * @param cause ログ出力する内容の詳細
     * @return 整形したログメッセージ
     */
    private formatMessage(data: any, cause?: any): string {
      let message: string[] = [];
      let dataStr: string;
      try {
        dataStr = angular.toJson(data);
      } catch (error) {
        dataStr = String(data);
      }
      message.push('[' + moment().format('YYYY/MM/DD-HH:mm:ss.SSS') + '] ' + dataStr);
      message.push();

      if (cause) {
        if (cause instanceof Error) {
          // 例外発生のケース
          message.push(cause.name + ' - ' + cause.message);
          if (cause.stack) {
            message.push(cause.stack);
          }
        } else {
          try {
            message.push(angular.toJson(cause));
          } catch (error) {
            message.push(String(cause));
          }
        }
      }
      return message.join('\n');
    }
  }
}
