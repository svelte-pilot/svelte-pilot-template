import { ClientApp, SSRState } from 'svelte-pilot';
import router from './router';

declare global {
  interface Window {
    __SSR_STATE__: SSRState
  }
}

function main() {
  new ClientApp({
    target: document.body,
    hydrate: Boolean(window.__SSR_STATE__),

    props: {
      router,
      ssrState: window.__SSR_STATE__
    }
  });
}

if (window.__SSR_STATE__) {
  // wait unitl async components loaded
  // prevent screen flash
  router.once('update', main);
} else {
  main();
}
