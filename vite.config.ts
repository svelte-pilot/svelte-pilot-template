import { svelte, vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import extractorSvelte from '@unocss/extractor-svelte'
import cssHash from 'svelte-preprocess-css-hash'
import { importAssets } from 'svelte-preprocess-import-assets'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

import insertPreloadLinks from './insertPreloadLinks'

export default defineConfig(({ isSsrBuild }) => {
  const preprocess = [vitePreprocess(), importAssets(), cssHash()]
  const plugins = [svelte({ preprocess })]

  if (isSsrBuild) {
    preprocess.push(insertPreloadLinks())
  }
  else {
    plugins.unshift(UnoCSS({
      extractors: [extractorSvelte()],
    }))
  }

  return {
    build: {
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          inlineDynamicImports: isSsrBuild,
        },
      },
    },

    plugins,
  }
})
