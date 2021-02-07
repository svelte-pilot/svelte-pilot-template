import { Router } from 'svelte-pilot';
import App from './views/App.svelte';

export default new Router({
  routes: [
    {
      component: App,

      children: [
        {
          path: '/',
          component: () => import('./views/List.svelte')
        }
      ]
    }
  ]
});
