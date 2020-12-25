module.exports = {
  plugins: ['stylelint-scss'],
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recess-order',
    './node_modules/prettier-stylelint/config.js'
  ],
  rules: {
    'color-hex-length': 'short',
    'color-no-invalid-hex': true,
    indentation: 2,
    'length-zero-no-unit': true,
    'number-leading-zero': 'never',
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true
  }
}
