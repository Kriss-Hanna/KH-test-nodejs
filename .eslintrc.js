const { join } = require('path');

module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:prettier/recommended',
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    babelOptions: {
      configFile: join(__dirname, '.babelrc'),
    },
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      spread: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['import', 'json-format', 'prettier'],
  rules: {
    'import/no-unresolved': 'off',
    'import/order': [
      'error',
      {
        alphabetize: {
          caseInsensitive: true,
          order: 'asc',
        },
        groups: [
          'builtin',
          ['external', 'object', 'unknown'],
          'internal',
          ['parent', 'sibling'],
          'index',
        ],
        'newlines-between': 'always',
        pathGroups: [
          {
            group: 'internal',
            pattern: '@pdbnode',
          },
          {
            group: 'index',
            pattern: '@domain/**',
          },
          {
            group: 'index',
            pattern: '@infrastructure/**',
          },
          {
            group: 'index',
            pattern: '@interface/**',
          },
        ],
      },
    ],
    'prettier/prettier': 'error',
    'sort-keys': [
      'error',
      'asc',
      {
        natural: true,
      },
    ],
  },
  settings: {
    'import/internal-regex': '@(pdbnode|domain|infrastructure|interface)',
    'json/ignore-files': ['**/package-lock.json'],
    'json/json-with-comments-files': ['.vscode/**'],
    'json/sort-package-json': 'standard',
  },
};
