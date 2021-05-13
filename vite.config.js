import fs from 'fs';
import legacy from '@vitejs/plugin-legacy';
import svelte from '@sveltejs/vite-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';
import htmlAsset from 'svelte-preprocess-html-asset';
import cssHash from 'svelte-preprocess-css-hash';
import preloadLink from 'svelte-preprocess-preload-link';
import urlToModule from 'rollup-plugin-import-meta-url-to-module';

export default ({ command }) => {
  const isDev = command === 'serve';
  const isProd = !isDev;
  const mode = process.env.VITE_MODE;
  const isBuildSSR = process.argv.includes('--ssr');

  const preprocess = [
    sveltePreprocess({ postcss: true }),
    htmlAsset(),
    cssHash()
  ];

  if (isBuildSSR) {
    const manifest = JSON.parse(fs.readFileSync('./dist/tmp/ssr-manifest.json', 'utf-8'));
    preprocess.push(preloadLink({ manifest }));
  }

  const cfg = {
    root: './src',
    mode,
    isProduction: isProd,

    plugins: [
      svelte({
        hot: isDev,
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
      assetsInlineLimit: 0,
      assetsDir: '_assets',
      emptyOutDir: false
    },

    resolve: {
      dedupe: ['svelte']
    },

    optimizeDeps: {
      exclude: ['svelte']
    }
  };

  if (isProd && !isBuildSSR) {
    cfg.plugins.push(legacy());
  }

  return cfg;
};
