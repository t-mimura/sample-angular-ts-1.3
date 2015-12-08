namespace myApp {

  export class MainPageController {
    name: string;
    constructor(
      private $window: ng.IWindowService,
      private $scope: ng.IScope
    ) {
      this.name = 'hoge-name2';
    }

    onButtonClick(): void {
      this.$window.alert('hogeee!!!');
    }
  }


}
/*
module.exports = ['$scope', function($scope) {
  $scope.name = 'Hoge-Name';
}];
*/
