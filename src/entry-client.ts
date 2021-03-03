import { ClientApp } from 'svelte-pilot';
import router from './router';

new ClientApp({
  target: document.body,
  hydrate: Boolean(Number(import.meta.env.VITE_SVELTE_HYDRATABLE)),

  props: {
    router
  }
});
