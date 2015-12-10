namespace myApp.models {
  'use strict';

  /**
   * API取得データのHOGEの型を表すインターフェースです。
   */
  export interface Hoge {
    id: string;
    name: string;
    email: string;
    age: number;
    description: string;
  }
}
