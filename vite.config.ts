import { svelte, vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import urlToModule from 'rollup-plugin-import-meta-url-to-module'
import cssHash from 'svelte-preprocess-css-hash'
import htmlAsset from 'svelte-preprocess-html-asset'
import { defineConfig } from 'vite'
import preloadLink from './svelte-preprocess-preload-link'

export default defineConfig(({ ssrBuild }) => {
  const mode = process.env.VITE_MODE

  const preprocess = [vitePreprocess(), htmlAsset(), cssHash()]

  if (ssrBuild) {
    preprocess.push(preloadLink())
  }

  return {
    mode,

    plugins: [
      svelte({
        preprocess,

        compilerOptions: {
          hydratable: Boolean(Number(process.env.VITE_SVELTE_HYDRATABLE))
        }
      }),

      urlToModule({
        optimizeHref: true
      })
    ],

    build: {
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          inlineDynamicImports: ssrBuild
        }
      }
    }
  }
})
