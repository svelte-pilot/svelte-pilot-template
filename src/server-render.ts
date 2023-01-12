import { ServerApp } from 'svelte-pilot';
import router from './router';
import SSRContext from './ssr-context';

type Params = {
  url: string;
  headers: Record<string, string | undefined>;
  template: string;
};

export type Response = {
  statusCode: number;
  statusMessage?: string;
  headers: Record<string, string | string[] | undefined>;
  body?: string;
  error?: Error;
};

export default async function(args: Params): Promise<Response> {
  try {
    return await render(args);
  } catch (e) {
    return {
      error: e as Error,
      statusCode: 500,

      headers: {
        'Content-Type': 'text/html',
        'Cache-Control': 'no-store'
      },

      body: args.template // Fallback to CSR
    };
  }
}

async function render({ url, headers, template }: Params): Promise<Response> {
  const urlObj = new URL(url, 'http://127.0.0.1');
  const ctx = new SSRContext(headers);
  const matchedRoute = await router.handle(urlObj.href, ctx);

  if (!matchedRoute) {
    console.error('No route found for url:', url);

    if (urlObj.pathname === '/') {
      return {
        statusCode: 404,
        body: 'Page Not Found',
        headers: { 'content-type': 'text/plain' }
      };
    } else {
      return {
        statusCode: 301,

        headers: {
          location: '/',
          'Cache-Control': 'no-store'
        }
      };
    }
  }

  if (ctx.getHeader('location')) {
    return {
      statusCode: ctx.res.statusCode || 301,
      headers: ctx.res.headers
    };
  }

  const { route, ssrState } = matchedRoute;
  const body = ServerApp.render({ router, route, ssrState });
  body.html += `<script>__SSR_STATE__ = ${serialize(ssrState)}</script>`;

  return {
    statusCode: ctx.res.statusCode || 200,

    headers: {
      'Content-Type': 'text/html',
      ...ctx.res.headers
    },

    body: template
      .replace('</head>', body.head + '</head>')
      .replace('<body>', '<body>' + body.html)
  };
}

function serialize(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003C').replace(/>/g, '\\u003E');
}
