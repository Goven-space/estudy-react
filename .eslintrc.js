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
  settings: {
    'import/resolver': {
      webpack: {
        config: {
          resolve: {
            alias: {
              map:[
                ['@',path.resolve(__dirname, './src')]
              ]
              
            },
            extensions: ['.js', '.jsx', '.ts', '.tsx','.scss'],
          },
        }
      }
    }
  },
  env: {
    browser: true,
  },
  rules: {
    "indent": ["error", 2],
    "quotes": ["error", "single"],
    "semi": ["error", "always"],
    "no-console": 1,
    "arrow-parens": 0,
    "no-shadow": "off",
    "react/jsx-filename-extension": "off"
  }
}