namespace myApp.utils {
  'use strict';

  /**
   * オブジェクトが空かどうかを調べます。
   * 次の時、`true`で返ります。
   * - undefinedの時
   * - nullの時
   * - Arrayのインスタンスで空配列([])と等しいとき
   * 上記以外はfalseとなります。
   * @param obj チェック対象
   * @return 空の場合`true`
   */
  export function isEmpty(obj: any) {
    if (obj === undefined) {
      return true;
    }
    if (obj === null) {
      return true;
    }
    if (!(obj instanceof Array)) {
      return false;
    }
    return obj.length === 0;
  }
}
