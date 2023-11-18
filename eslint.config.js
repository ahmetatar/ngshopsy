const {FlatCompat} = require('@eslint/eslintrc');
const nrwlEslintPluginNx = require('@nrwl/eslint-plugin-nx');
const js = require('@eslint/js');
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});
module.exports = [
  ...compat.extends('plugin:playwright/recommended'),
  {plugins: {'@nrwl/nx': nrwlEslintPluginNx}},
  ...compat
    .config({
      extends: [
        //https://ngrx.io/guide/eslint-plugin
        'plugin:@ngrx/recommended',
        'plugin:@nrwl/nx/typescript',
        'plugin:@nrwl/nx/angular',
        'plugin:@angular-eslint/template/process-inline-templates',
      ],
    })
    .map((config) => ({
      ...config,
      files: ['**/*.ts'],
      rules: {
        '@ngrx/good-action-hygiene': 'error',
        '@ngrx/avoid-cyclic-effects': 'error',
        '@angular-eslint/directive-selector': [
          'error',
          {
            type: 'attribute',
            prefix: 'ngs',
            style: 'camelCase',
          },
        ],
        '@angular-eslint/component-selector': [
          'error',
          {
            type: 'element',
            prefix: 'ngs',
            style: 'kebab-case',
          },
        ],
      },
    })),
  ...compat.config({extends: ['plugin:@nrwl/nx/angular-template']}).map((config) => ({
    ...config,
    files: ['**/*.html'],
    rules: {},
  })),
  {
    files: ['e2e/**/*.{ts,js,tsx,jsx}'],
    rules: {},
  },
];
