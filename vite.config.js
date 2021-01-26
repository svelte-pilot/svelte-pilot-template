import svelte from 'rollup-plugin-svelte';
import urlToModule from 'rollup-plugin-import-meta-url-to-module';
import preprocess from 'svelte-preprocess';
import htmlAsset from 'svelte-preprocess-html-asset';
import cssHash from 'svelte-preprocess-css-hash';

export default {
  plugins: [
    svelte({
      compilerOptions: {
        hydratable: true
      },

      preprocess: [
        preprocess({ postcss: true }),
        htmlAsset(),
        cssHash()
      ]
    }),

    urlToModule()
  ],

  optimizeDeps: {
    exclude: ['svelte']
  }
};
