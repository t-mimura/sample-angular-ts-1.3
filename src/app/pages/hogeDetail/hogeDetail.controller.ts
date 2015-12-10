namespace myApp.controllers {

  /**
   * HogeDetail画面のコントローラクラスです。
   */
  export class HogeDetailController {
    /** URLパラメタのID */
    id: string;
    /** API取得データのHOGE */
    hoge: myApp.models.Hoge;

    /**
     * HogeDetailを生成します。
     * @param hogeStore hogeStoreのインジェクション
     * @param $routePrams routeParamsサービスのインジェクション
     * @ngInject
     */
    constructor(
      private hogeStore: myApp.stores.HogesStore,
      $routeParams: ng.route.IRouteParamsService,
      private $location: ng.ILocationService
    ) {
      const idKey = 'id';
      this.id = $routeParams[idKey];
      this.refresh();
    }

    /**
     * Hogeを取得し、プロパティへ保持します。
     */
    refresh(): void {
      this.hogeStore.get(this.id).then((data: myApp.models.Hoge) => {
        this.hoge = data;
      }).catch(() => {
        this.hoge = undefined;
      });
    }

    /**
     * Hogeが存在しているかどうか取得します。
     * @return Hogeがあるときは`true`
     */
    isExists(): boolean {
      return this.hoge !== undefined;
    }

    /**
     * HogeList画面へ遷移します。
     */
    transitionToHogeList(): void {
      this.$location.path(myApp.PATH.HOGE_LIST);
    }
  }
}
