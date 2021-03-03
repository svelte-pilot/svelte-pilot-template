import { ServerApp } from 'svelte-pilot';
import router from './router';

export type Response = {
  status?: number,
  headers?: Record<string, string>,

  body: {
    head: string,
    html: string,
    css: string
  }
};

export async function render(url: string, ctx?: unknown): Promise<Response | null> {
  const matchedRoute = await router.handle(url, ctx);

  if (!matchedRoute) {
    return null;
  }

  const { route, preloadData } = matchedRoute;
  const res = (route.meta.response || {}) as Response;

  if (res?.headers?.location) {
    if (!res.status) {
      res.status = 301;
    }

    return res;
  } else {
    const body = ServerApp.render({ router, route, preloadData });

    res.body = {
      ...body,
      css: body.css.code
    };

    if (!res.status) {
      res.status = 200;
    }

    return res;
  }
}
