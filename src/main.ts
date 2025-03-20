import type { SSRState } from 'svelte-pilot'

import { hydrate } from 'svelte'
import { ClientApp } from 'svelte-pilot'

import ClientContext from './context/ClientContext'
import router from './router'

import 'virtual:uno.css'
import '@unocss/reset/tailwind.css'

declare global {
  interface Window {
    __SSR__?: {
      rewrite?: string
      state?: SSRState
    }
  }
}

router.start(
  () => {
    hydrate(ClientApp, {
      props: { router },
      target: document.body,
    })

    delete window.__SSR__
  },
  {
    clientContext: new ClientContext(),
    path: window.__SSR__?.rewrite,
    ssrState: window.__SSR__?.state,
  },
)
