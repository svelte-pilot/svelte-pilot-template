module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',

  plugins: [
    '@typescript-eslint',
    'svelte3'
  ],

  extends: [
    'unambiguous',
    'plugin:@typescript-eslint/recommended'
  ],

  env: {
    node: true,
    browser: true
  },

  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3',

      rules: {
        'no-multiple-empty-lines': ['error', { max: 2, maxBOF: 2, maxEOF: 0 }],
        'no-duplicate-imports': 'off',
        'no-undef-init': 'off'
      }
    }
  ],

  rules: {
    'no-extra-parens': 'off',
    '@typescript-eslint/no-extra-parens': 'error',
    '@typescript-eslint/member-delimiter-style': 'error'
  },

  settings: {
    'svelte3/typescript': true,
    'svelte3/ignore-styles': () => true
  }
};
