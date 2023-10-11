import { svelte } from '@sveltejs/vite-plugin-svelte'
import fs from 'fs'
import urlToModule from 'rollup-plugin-import-meta-url-to-module'
import sveltePreprocess from 'svelte-preprocess'
import cssHash from 'svelte-preprocess-css-hash'
import htmlAsset from 'svelte-preprocess-html-asset'
import { defineConfig } from 'vite'
import preloadLink from './svelte-preprocess-preload-link'

export default defineConfig(({ ssrBuild }) => {
  const mode = process.env.VITE_MODE

  const preprocess = [
    sveltePreprocess({ postcss: true }),
    htmlAsset(),
    cssHash()
  ]

  if (ssrBuild) {
    preprocess.push(
      preloadLink(
        JSON.parse(fs.readFileSync('./dist/client/ssr-manifest.json', 'utf-8'))
      )
    )
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
