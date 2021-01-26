import { Router } from 'svelte-pilot';

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import('./App.svelte')
    }
  ]
});
