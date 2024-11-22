import { render } from 'svelte/server'
import { ServerApp } from 'svelte-pilot'

import Interruption from './context/Interruption'
import ServerContext from './context/ServerContext'
import router from './router'

interface Params {
  headers?: Record<string, string | undefined>
  nojs?: boolean
  template: string
  url: string
}

export interface Response {
  body?: string
  headers?: Record<string, string | string[] | undefined>
  statusCode?: number
  statusMessage?: string
}

export default async function ({
  headers,
  nojs,
  template,
  url,
}: Params): Promise<Response> {
  try {
    const ctx = new ServerContext(headers)

    async function handle(url: string) {
      try {
        return await router.handleServer(url, ctx)
      }
      catch (e) {
        if (e instanceof Interruption) {
          if (ctx._rewrite) {
            return handle(ctx._rewrite)
          }
        }
        else {
          throw e
        }
      }
    }

    const route = await handle(new URL(url, 'http://127.0.0.1').href)

    if (!route) {
      if (ctx.headers.location) {
        return {
          headers: ctx.headers,
          statusCode: ctx.statusCode || 302,
        }
      }
      else {
        return {
          body: import.meta.env.DEV
            ? `${url} did not match any routes. Did you forget to add a catch-all route?`
            : '404 Not Found',
          statusCode: 404,
        }
      }
    }

    const html = render(ServerApp, {
      props: { route, router },
    })

    const __SSR__ = {
      rewrite: ctx._rewrite,
      state: route.ssrState,
    }

    if (nojs) {
      html.head = html.head.replace(/<!--.+?-->/g, '')
    }
    else {
      html.body += `<script>__SSR__ = ${serialize(__SSR__)}</script>`
    }

    return {
      body: template
        .replace('</head>', `${html.head}</head>`)
        .replace(/<body.*?>/, $0 => $0 + html.body),

      headers: {
        'Content-Type': 'text/html',
        ...ctx.headers,
      },

      statusCode: ctx.statusCode,
    }
  }
  catch (e) {
    if (import.meta.env.DEV) {
      throw e
    }
    else {
      console.error(e)

      return {
        body: import.meta.env.DEV && e instanceof Error ? e.message : '',
        statusCode: 500,
      }
    }
  }
}

function serialize(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003C').replace(/>/g, '\\u003E')
}
