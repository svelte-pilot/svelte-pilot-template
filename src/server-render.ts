import { ServerApp } from 'svelte-pilot';
import router from './router';

type RenderParams = {
  url: string,
  ctx?: unknown,
  template: string,
};

type RenderResult = {
  error?: Error,
  status: number,
  headers?: Record<string, string>,
  body?: string
};

export default async function(args: RenderParams): Promise<RenderResult> {
  try {
    return await render(args);
  } catch (e) {
    return {
      error: e as Error,
      status: 500,

      headers: {
        'Content-Type': 'text/html',
        'Cache-Control': 'no-store'
      },

      body: args.template // Fallback to CSR
    };
  }
}

async function render({ url, ctx, template }: RenderParams): Promise<RenderResult> {
  const _url = new URL(url, 'http://127.0.0.1');
  const matchedRoute = await router.handle(_url.href, ctx);

  if (!matchedRoute) {
    console.error('No route found for url:', url);

    if (_url.pathname === '/') {
      return {
        status: 404,
        body: 'Page Not Found',
        headers: { 'content-type': 'text/plain' }
      };
    } else {
      return {
        status: 301,

        headers: {
          location: '/',
          'Cache-Control': 'no-store'
        }
      };
    }
  }

  const { route, ssrState } = matchedRoute;

  const res = route.meta.response as { status?: number, headers?: Record<string, string> } | null;

  if (res?.headers?.location) {
    return {
      status: res.status || 301,
      headers: res.headers
    };
  } else {
    const body = ServerApp.render({ router, route, ssrState });
    body.html += `<script>__SSR_STATE__ = ${serialize(ssrState)}</script>`;

    return {
      status: res?.status || 200,

      headers: {
        'Content-Type': 'text/html',
        ...res?.headers
      },

      body: template
        .replace('</head>', body.head + '</head>')
        .replace('<body>', '<body>' + body.html)
    };
  }
}

function serialize(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003C').replace(/>/g, '\\u003E');
}
