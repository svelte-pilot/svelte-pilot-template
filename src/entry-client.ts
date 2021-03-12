import { ClientApp, SSRState } from 'svelte-pilot';
import router from './router';

declare global {
  interface Window {
    __SSR_STATE__: SSRState
  }
}

new ClientApp({
  target: document.body,
  hydrate: Boolean(import.meta.env.VITE_SVELTE_HYDRATABLE),

  props: {
    router,
    ssrState: window.__SSR_STATE__
  }
});
