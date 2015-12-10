namespace myApp.controllers {

  /**
   * HogeList画面のコントローラクラスです。
   */
  export class HogeListController {
    hoges: myApp.models.Hoge[];

    /**
     * HogeListを生成します。
     * @param hogeStore hogeStoreのインジェクション
     * @ngInject
     */
    constructor(private hogeStore: myApp.stores.HogesStore) {
      this.refresh();
    }

    /**
     * Hogeを取得し、プロパティへ保持します。
     */
    refresh(): void {
      this.hogeStore.getAll().then((data: myApp.models.Hoge[]) => {
        this.hoges = data;
      });
    }
  }
}
