# little-moles

Canvas操作の学習用に作ったミニゲーム

## 動作確認

- OSX 10.15.7
- node v15.1.0

## 初期設定

yarn

下記2ファイルを作成

- env/dev.js
- env/prod.js

```js
const envConfig = {
  MODE: 'dev', // or 'prod'
}

module.exports = envConfig
```

yarn serve

## コマンド一覧

| Task | Command | 補足 |
| --- | --- | --- |
| ビルド | yarn build | - |
| ローカル動作確認 | yarn dev | - |

## Sample

<https://maportf.web.app/little-moles/>
