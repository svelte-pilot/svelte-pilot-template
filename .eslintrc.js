module.exports = {
  parser: '@typescript-eslint/parser',

  extends: [
    'enough',
    'plugin:@typescript-eslint/recommended'
  ],

  env: {
    node: true,
    browser: true
  },

  plugins: [
    'ext',
    '@typescript-eslint',
    'svelte3'
  ],

  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3'
    }
  ],

  rules: {
    'ext/lines-between-object-properties': ['error', 'always', { exceptBetweenSingleLines: true }],
    'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 2, maxEOF: 1 }],
    'no-extra-parens': 'off',
    '@typescript-eslint/no-extra-parens': 'error'
  },

  settings: {
    'svelte3/ignore-styles': () => true
  }
};
