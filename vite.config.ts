import { svelte, vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import cssHash from 'svelte-preprocess-css-hash'
import { importAssets } from 'svelte-preprocess-import-assets'
import { defineConfig } from 'vite'
import insertPreloadLinks from './insertPreloadLinks'

export default defineConfig(({ isSsrBuild }) => {
  const preprocess = [vitePreprocess(), importAssets(), cssHash()]

  if (isSsrBuild) {
    preprocess.push(insertPreloadLinks())
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
          inlineDynamicImports: isSsrBuild
        }
      }
    }
  }
})
