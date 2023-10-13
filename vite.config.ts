import { svelte, vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import cssHash from 'svelte-preprocess-css-hash'
import { importAssets } from 'svelte-preprocess-import-assets'
import { defineConfig } from 'vite'
import preloadLink from './svelte-preprocess-preload-link'

export default defineConfig(({ ssrBuild }) => {
  const preprocess = [vitePreprocess(), importAssets(), cssHash()]

  if (ssrBuild) {
    preprocess.push(preloadLink())
  }

  return {
    plugins: [
      svelte({
        preprocess,

        compilerOptions: {
          hydratable: Boolean(Number(process.env.VITE_SVELTE_HYDRATABLE))
        }
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
