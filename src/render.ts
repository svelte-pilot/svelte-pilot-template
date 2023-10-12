import { ServerApp } from 'svelte-pilot'
import router from './router'
import ServerContext from './server-context'

type Params = {
  url: string
  template: string
  headers?: Record<string, string | undefined>
  nojs?: boolean
}

export type Response = {
  statusCode?: number
  statusMessage?: string
  headers?: Record<string, string | string[] | undefined>
  body?: string
}

export default async function render({
  url,
  template,
  headers,
  nojs
}: Params): Promise<Response> {
  try {
    const ctx = new ServerContext(headers)

    async function handle(url: string) {
      const route = await router.handleServer(url, ctx)

      if (!route) {
        return
      }

      if (ctx._rewrite) {
        return handle(ctx._rewrite)
      }

      return route
    }

    const route = await handle(new URL(url, 'http://127.0.0.1').href)

    if (!route) {
      return {
        statusCode: 404,
        body: import.meta.env.DEV
          ? `${url} did not match any routes. Did you forget to add a catch-all route?`
          : '404 Not Found'
      }
    }

    if (ctx.headers['location']) {
      return {
        statusCode: ctx.statusCode || 302,
        headers: ctx.headers
      }
    }

    const body = ServerApp.render({ router, route })

    const __SSR__ = {
      state: route.ssrState,
      rewrite: ctx._rewrite
    }

    if (nojs) {
      body.head = body.head.replace(/<!--.+?-->/g, '')
    } else {
      body.html += `<script>__SSR__ = ${serialize(__SSR__)}</script>`
    }

    return {
      statusCode: ctx.statusCode,

      headers: {
        'Content-Type': 'text/html',
        ...ctx.headers
      },

      body: template
        .replace('</head>', body.head + '</head>')
        .replace(/<body.*?>/, $0 => $0 + body.html)
    }
  } catch (e) {
    if (import.meta.env.DEV) {
      throw e
    } else {
      console.error(e)

      return {
        statusCode: 500,
        body: import.meta.env.DEV && e instanceof Error ? e.message : ''
      }
    }
  }
}

function serialize(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003C').replace(/>/g, '\\u003E')
}
