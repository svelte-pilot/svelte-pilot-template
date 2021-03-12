import { Router } from 'svelte-pilot';
import App from './views/App.svelte';

export default new Router({
  routes: [
    {
      component: App,

      children: [
        {
          path: '/',
          component: () => import('./views/Home.svelte'),
          props: route => ({ page: route.query.int('page', { defaults: 1 }) })
        }
      ]
    }
  ]
});
