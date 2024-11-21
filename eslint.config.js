import antfu from '@antfu/eslint-config'
import perfectionist from 'eslint-plugin-perfectionist'

export default antfu(
  {
    formatters: true,
    svelte: true,
    unocss: true,
  },
  {
    rules: perfectionist.configs['recommended-natural'].rules,
  },
)
