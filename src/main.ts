import { ClientApp, type SSRState } from 'svelte-pilot'
import ClientContext from './context/client'
import router from './router'

declare global {
  interface Window {
    __SSR__?: {
      state?: SSRState
      rewrite?: string
    }
  }
}

router.start(
  () => {
    new ClientApp({
      target: document.body,
      hydrate: Boolean(window.__SSR__?.state),
      props: { router }
    })

    delete window.__SSR__
  },
  {
    clientContext: new ClientContext(),
    ssrState: window.__SSR__?.state,
    path: window.__SSR__?.rewrite
  }
)
