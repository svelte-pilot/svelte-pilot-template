import antfu from '@antfu/eslint-config'
import perfectionist from 'eslint-plugin-perfectionist'

export default antfu(
  {
    formatters: true,
    rules: {
      'prefer-const': 'off',
      ...perfectionist.configs['recommended-natural'].rules,
    },
    svelte: true,
    unocss: true,
  },
)
