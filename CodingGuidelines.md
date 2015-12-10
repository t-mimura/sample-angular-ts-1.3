# Coding guidelines

## はじめに

このコーディングガイドはMicrosoftの[Coding guidelines](https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines)を元にしています。
(必要ないところは省いており、また本プロジェクトにあうように加筆修正しています。)
本ガイドはTypeScriptの場合のみに限定しており、gulpfile や spec(テストコード) で利用しているJavaScriptには当てはまりません。

TypeScriptにとどまらず、AngularJSに関わるルールは末尾にまとめてあります。重要ですので、そちらも是非ご確認ください。

また、コーディングスタイルに関しては、`.editorconfig`が用意されていますので、そちらが有効になるようにお使いのエディターを設定してください。(およびVisual Studio Codeでは代わりに`.vscode/settings.json`が用意されています。)
設定外のスタイルに関しては本ガイドを参考にしてください。
また、本プロジェクトではtslintを利用していますので、tslintで警告・エラーが出た場合は、それを解消してください。


## 用語説明

* PascalCase(パスカルケース) : 先頭が英大文字始まりで単語の区切り一文字目が大文字
* camelCase(キャメルケース) : 先頭が英小文字始まりで単語の区切り一文字目が大文字
* snake_case(スネークケース) : 全て小文字で単語の区切りにアンダースコアを用いる
* chain-case(チェインケース) : 全て小文字で単語の区切りにハイフンを用いる

## Name

1. 型名にはパスカルケースを使用してください。
2. インタフェース名の接頭辞として "I"を使用**しないで**ください。
3. 列挙型の値についてパスカルケースを使用してください。
4. 関数名はキャメルケースを使用してください。
5. プロパティ名とローカル変数にはキャメルケースを使用してください。
6. プライベートプロパティの接頭辞として"_"は使用**しないで**ください。
7. 可能な場合は単語全体を使用してください。

## コンポーネント

1. 論理コンポーネントごとに1ファイル（例えば、パーサー、スキャナー、エミッタ、チェッカー）。

## 型

1. 複数のコンポーネントに渡ってそれを共有する必要がある場合を除き、型/関数をエクスポートしないでください。
2. グローバル名前空間に新しいタイプ/値を導入しないでください。
3. ファイル内では、型定義は、最初に来る必要があります。

## `null`と`undeinfed`：

1. `undefined`を使用し、`null`を使用**しないで**ください。

## 一般的な前提条件

1. 外側のコンポーネントで不変として生成されたノード、シンボルなどのようなオブジェクトを考えてみましょう。それらを変更しないでください。
2. デフォルトで不変として配列を考えてみましょう。

## コメント

1. 関数、インタフェース、列挙型、およびクラス用のJSDocの形式のコメントを使用してください。(補足：[このissue](https://github.com/sebastian-lenz/typedoc/issues/123)が改善されたら[TypeDoc](http://typedoc.io/)を使いたい。)

## 文字列

1. 文字列に引用符(シングルクオーテーション)を使用してください。

## 一般的な構築

様々な理由のために、私たちは、特定の構造を回避し、私たち自身のいくつかを使用します。その中で：

1. ECMAScript 5 の機能を使用しないでください。core.tsから見つけられる機能を代わりに使用してください。
2. `for..in` を使用しないでください。代わりに、`ts.forEach`、`ts.forEachKey`と`ts.forEachValue`を使用してください。そのわずかに異なるセマンティクスに注意してください。
3. 強く不便でない場合、ループの代わりに`ts.forEach`、`ts.map`、そして`ts.filter`を使用してみてください。

## スタイル

1. 匿名関数よりアロー関数を使用します。
2. 必要な場合にのみ、アロー関数のパラメータを囲みます。
例えば、`(x) => x + x` は間違っており、以下が適切です：
    1. `x => x + x`
    2. `(x、y)=> x + y`
    3. `<T>(x：T、y：T) => x === y`
3. ループと条件付きのボディは、常に中括弧で囲みます。
4. 開き中括弧は、常にそれが必要とされた行と同じ行に置きます。
5. 括弧で囲まれた構造物には前後の空白があってはいけません。
単一のスペースは、これらの構築物中のカンマ、コロン、セミコロンの後に続きます。例えば：
    1. `for (var i = 0, n = str.length; i < 10; i++) { }`
    2. `if (x < 10) { }`
    3. `function f(x: number, y: string): void { }`
6. 変数ステートメントごとに1つの宣言を使用してください
（つまり、`var x = 1, y = 2;` より `var x = 1; var y = 2;` を使用します）。
7. `else`は、閉じ中括弧と*同じ行*になります。

## AngularJSに関すること

### 全般
1. angularJSのinject指定には配列ではなく、[ng-annotate](https://github.com/olov/ng-annotate)の機能を利用します。(injectが必要な関数の前に`@ngInject`を含んだコメントを記載してください。)
例えば、

```typescript
/**
 * ほげを実行します。
 * @param $scope scopeのインジェクション
 * @ngInject
 */
function doHoge($scope: ng.IScope) {
  // ...
}
```

### 画面のControllerについて
1. ブラウザのページ単位に作成します。一つのページ内でControllerを分けたくなった場合はコンポーネント化を検討してください。
1. ControllerはTypeScriptのクラスとして作成し、ページ内の処理などは$scopeへ直接挿入するのではなく、Controllerの持ち物としてください。
1. 以下に例を示します。(実際には機能毎にファイルを分けてください。)

```typescript
class HogePageController {
  private message: string;
  /** @ngInject **/
  constructor(private $scope: ng.IScope) {
    // $scopeに対しては何もしません。
  }
  onSomeButtonClick(event: ng.IAngularEvent): void {
    this.message = 'button is clicked.';
  }
}
class RouterConfig {
  /** @ngInject */
  contructor($routeProvider: ng.route.IRouteProvider) {
    $routeProvider
      .when('/hoge', {
        templateUrl: 'path/to/hoge.html',
        controller: 'HogePageController',
        controllerAs: 'hogePageController'
      })
      .otherwise({
        redirectTo: '/'
      });
  }
var myApp = angular.module('myApp');
myApp.config(RouterConfig);
myApp.controller('hogePageController', HogePageController);
```

上記例の場合、HTMLからはRouterConfigで設定した`hogePageController`の名前でコントローラーにアクセスできます。

```html
<button ng-click="hogePageController.onSomeButtonClick($event))">ボタン１</button>
```

### Directiveについて
1. Directiveは`restrict`に`E`を指定し、コンポーネントとして利用します。どうしても必要なときのみ`restrict`に`A`の指定を使用します。それ以外の`restrict`は使用しないでください。
1. Directiveを利用する際は、`isolate scope`としてください。
1. Controllerは`controllerAs`で利用するのを前提に、$scopeを使わずにcontrollerへプロパティや関数を実装してください。(Directive利用側からAttributeで渡される値は、angularJSによって$scopeに挿入されますので、それらはそのまま用いてください。)
1. 以下に例を示します。

```typescript
interface FugaComponentScope extends ng.IScope {
  someAttributeValue: string;
}

class FugaComponentController {
  /** @ngInject */
  constructor(private $scope: FugaComponentScope) {
    // initialization. $scope.someAttributeValue is usable.
  }
  onClickComponentsButton(): void {
    // do something.
  }
}

/** @ngInject */
function FugaComponent(): ng.IDirective {
  return {
    restrict: 'E',
    templateUrl: 'path/to/components/template/FugaComponent.html',
    controller: FugaComponentController,
    controllerAs: 'controller',
    scope: {
      someAttributeValue: '='
    }
  };
}

var myApp = angular.module('myApp');
myApp.directive('fugaComponent', FugaComponent);
```

コンポーネントを利用する際は、チェインケースになります。
```html
<x-fuga-component data-some-attribute-value="pageController.someValue"></x-fuga-component>
```
