import path from 'path';
import svelte from 'vite-plugin-svelte-ssr-hot';
import preprocess from 'svelte-preprocess';
import htmlAsset from 'svelte-preprocess-html-asset';
import cssHash from 'svelte-preprocess-css-hash';
import urlToModule from 'rollup-plugin-import-meta-url-to-module';

export default ({ command }) => {
  const isDev = command === 'serve';

  return {
    root: './src',

    plugins: [
      svelte({
        hot: isDev,

        compilerOptions: {
          hydratable: Boolean(Number(process.env.VITE_SVELTE_HYDRATABLE))
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
      assetsInlineLimit: 0,
      outDir: path.resolve(__dirname, 'dist'),
      emptyOutDir: false
    },

    resolve: {
      dedupe: ['svelte']
    },

    optimizeDeps: {
      exclude: ['svelte']
    },

    ssr: {
      external: ['svelte']
    }
  };
};
