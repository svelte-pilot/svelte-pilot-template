import svelte from 'rollup-plugin-svelte';
import preprocess from 'svelte-preprocess';
import htmlAsset from 'svelte-preprocess-html-asset';
import cssHash from 'svelte-preprocess-css-hash';
import urlToModule from 'rollup-plugin-import-meta-url-to-module';

export default ({ command }) => {
  const isDev = command === 'serve';
  // const isBuild = !isDev;

  return {
    plugins: [
      svelte({
        hot: isDev,
        // emitCss: isBuild,

        compilerOptions: {
          hydratable: true
        },

        preprocess: [
          preprocess({ postcss: true }),
          htmlAsset(),
          cssHash()
        ]
      }),

      urlToModule({
        optimizeHref: true
      })
    ],

    build: {
      assetsInlineLimit: 0
    },

    dedupe: ['svelte']
  };
};
