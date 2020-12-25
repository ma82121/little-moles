module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true,
  },
  globals: {
    ENV: true,
    ga: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    // ecmaVersion: 2018,
    parser: "babel-eslint",
    sourceType: "module",
    allowImportExportEverywhere: true
  },
  extends: ['standard', 'plugin:prettier/recommended'],
  plugins: ['prettier', 'vue'],
  rules: {
    'no-console': [0],
    'no-unused-vars': ['off'],
    'comma-dangle': ['error', 'never'],
    quotes: ['error', 'single'],
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
        },
      },
    ],
    // prettierによる自動整形
    // https://prettier.io/docs/en/options.html
    // コード側で無効化したい場合は下記一行
    // prettier-ignore
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: false,
        trailingComma: 'none',
        printWidth: 120
      }
    ]
  },
};
