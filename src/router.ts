import { Router } from 'svelte-pilot'

export default new Router({
  callLoadOnClient: true,

  routes: [
    {
      component: () => import('./views/index.svelte'),
      path: '/',
    },

    {
      component: () => import('./views/500.svelte'),
      path: '/500',
    },

    {
      component: () => import('./views/404.svelte'),
      path: '(.*)',
    },
  ],
})
