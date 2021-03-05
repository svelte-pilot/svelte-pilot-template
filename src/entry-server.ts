import { ServerApp } from 'svelte-pilot';
import router from './router';
import { RenderResult } from './types';

export async function render(url: string, ctx?: unknown): Promise<RenderResult | null> {
  const matchedRoute = await router.handle(url, ctx);

  if (!matchedRoute) {
    return null;
  }

  const { route, preloadData } = matchedRoute;

  const res: RenderResult = Object.assign({
    status: 200,
    headers: {},

    body: {
      head: '',
      css: '',
      html: ''
    }
  }, route.meta.response);

  if (res.headers.location) {
    if (res.status === 200) {
      res.status = 301;
    }

    return res;
  } else {
    const body = ServerApp.render({ router, route, preloadData });
    body.html += `<script>__PRELOAD_DATA__ = ${JSON.stringify(preloadData)}</script>`;

    res.body = {
      ...body,
      css: body.css.code
    };

    return res;
  }
}
