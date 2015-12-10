namespace myApp.stores {
  'use strict';

  /**
   * Hogeを扱うStoreクラスです。
   */
  export class HogesStore {
    private static ENDPOINT = myApp.Constants.API.BASE_URL + '/hoges';

    /**
     * HogesStoreを生成します。
     * @param http httpサービスのインジェクション
     * @param $q qサービスのインジェクション
     * @ngInject
     */
    constructor(
      private http: myApp.services.Http,
      private $q: ng.IQService
    ) {
    }
    /**
     * IDを指定してHogeをAPIから取得します。
     * @param id ID
     * @return Hoge取得のPromise
     */
    get(id: string): ng.IPromise<myApp.models.Hoge> {
      type ReturnHoge = { hoge: myApp.models.Hoge };
      const url = HogesStore.ENDPOINT + '/' + id;
      const result = this.$q.defer<myApp.models.Hoge>();
      this.http.get<ReturnHoge>(url).success((data: ReturnHoge) => {
        result.resolve(data.hoge);
      }).error(() => {
        result.reject();
      });
      return result.promise;
    }
    /**
     * すべてのHogeをAPIから取得します。
     * @return Hoge取得のPromise
     */
    getAll(): ng.IPromise<myApp.models.Hoge[]> {
      type ReturnHoges = { hoges: myApp.models.Hoge[] };
      const url = HogesStore.ENDPOINT;
      const result = this.$q.defer<myApp.models.Hoge[]>();
      this.http.get<ReturnHoges>(url).success((data: ReturnHoges) => {
        result.resolve(data.hoges);
      }).error(() => {
        result.reject();
      });
      return result.promise;
    }
  }
}
