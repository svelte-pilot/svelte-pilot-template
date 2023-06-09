import { ClientApp, SSRState } from "svelte-pilot";
import router from "./router";

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
      ssrState: window.__SSR_STATE__,
    },
  });

  delete window.__SSR_STATE__;
  delete window.__REWRITE__;
}

if (window.__REWRITE__) {
  // Handle the route, but do not change the location.
  // For instance, if the server rewrites the route to a 404 or 500 error page, the location should not be changed.
  router.handle(window.__REWRITE__);
} else {
  router.replace({
    path: location.href,
    state: history.state,
  });
}

if (window.__SSR_STATE__) {
  // Wait until the asynchronous components have loaded to prevent screen flash.
  router.once("update", main);
} else {
  main();
}
