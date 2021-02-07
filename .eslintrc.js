module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',

  plugins: [
    'ext',
    '@typescript-eslint'
    // 'svelte3'
  ],

  extends: [
    'enough',
    'plugin:@typescript-eslint/recommended'
  ],

  env: {
    node: true,
    browser: true
  },

  overrides: [
    {
      // enable the rule specifically for TypeScript files
      files: ['*.ts', '*.tsx'],

      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'error',
        '@typescript-eslint/no-var-requires': 'error'
      }
    }
    // {
    //   files: ['*.svelte'],
    //   processor: 'svelte3/svelte3'
    // }
  ],

  rules: {
    'ext/lines-between-object-properties': ['error', 'always', { exceptBetweenSingleLines: true }],
    // 'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 2, maxEOF: 1 }],
    'no-extra-parens': 'off',
    '@typescript-eslint/no-extra-parens': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-var-requires': 'off'
  }

  // settings: {
  //   'svelte3/ignore-styles': () => true
  // }
};
