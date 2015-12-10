namespace myApp {
  'use strict';

  /**
   * サンプル
   */
  enum PLACE {
    THERE,
    WHERE,
    HERE,
    SOMEWHERE
  };

  /**
   * アプリケーション内で共通に利用する定数定義を保持するためのオブジェクトです。
   */
  export const Constants = {
    API: {
      BASE_URL: '/api/v1'
    },
    HOGE: {
      FUGA: 1,
      PIYO: 2
    },
    PLACE: PLACE
  };
}
