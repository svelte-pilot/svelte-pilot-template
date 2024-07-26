import { hydrate } from 'svelte'
import { ClientApp, type SSRState } from 'svelte-pilot'
import ClientContext from './context/ClientContext'
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
    hydrate(ClientApp, {
      target: document.body,
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
