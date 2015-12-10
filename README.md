# AngularJS 1.3 + TypeScript サンプルアプリケーション

## 必要環境
プロジェクトの開発には以下が必要。

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)

## プロジェクト clone

```bash
$ cd /path/to/dir
$ git clone git@github.com:t-mimura/sample-angular-ts-1.3.git
```

## 各種依存ファイルインストール

```bash
$ npm install
```
(bowerのコンポーネントはnodeのコンポーネントインストール後に自動でインストールされます。)

## ビルド実行
```bash
npm run build
```

## ローカルサーバ起動
### minify前(デバグ可能)、ライブリロード有
```bash
$ npm start
```

### minify後、ライブリロード無
```bash
$ npm run start:dist
```

### ブラウザ確認動作確認
http://localhost:3500/app-name/

## テスト実行
### 単体テスト
```bash
$ npm test
```

単体テスト用のスクリプトは、以下に配置します。

`/specs`

テスト対象のTSファイルが配置されているディレクトリと同じディレクトリ階層にします。

例)
* テスト対象）
    * src/app/utils/somefunction.ts
* テストスクリプト)
    * specs/app/utils/somefunction.spec.js

### end-to-end テスト
```bash
$ npm run e2e-test
```

テスト用スクリプトファイルは以下に配置します。

`/e2e`
