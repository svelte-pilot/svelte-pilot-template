import { ClientApp } from 'svelte-pilot';
import router from './router';

new ClientApp({
  target: document.body,
  hydrate: true,

  props: {
    router
  }
});
