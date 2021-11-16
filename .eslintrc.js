const path = require('path');

module.exports = {
  root: true, 
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      legacyDecorators: true,
    }
  },
  env: {
    browser: true,
  },
  rules: {
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'no-console': 'off',
    'arrow-parens': 0,
    'no-shadow': 'off',
    'react/jsx-filename-extension': 'off'
  }
};