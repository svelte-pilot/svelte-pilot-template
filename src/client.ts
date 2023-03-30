import { ClientApp, SSRState } from 'svelte-pilot';
import router from './router';

declare global {
  interface Window {
    __SSR_STATE__?: SSRState;
    __REWRITE__?: string;
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

  delete window.__SSR_STATE__;
  delete window.__REWRITE__;
}

router.handle(window.__REWRITE__ || location.href);

if (window.__SSR_STATE__) {
  // Wait until the asynchronous components have loaded to prevent screen flash.
  router.once('update', main);
} else {
  main();
}
