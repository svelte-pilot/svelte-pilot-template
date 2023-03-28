import render from '../../server-render';
// @ts-expect-error handle by rollup-plugin-string
import template from '../../../client/index.html';

export const onRequest: PagesFunction = async ctx => {
  const url = new URL(ctx.request.url);

  const result = await render({
    url: url.pathname + url.search,
    headers: Object.fromEntries([...ctx.request.headers.entries()]),
    template
  });

  if (result.error) {
    console.error(result.error);
  }

  return new Response(result.body, {
    status: result.statusCode || 200,
    statusText: result.statusMessage || 'OK',
    headers: {
      'content-type': 'text/html; charset=utf-8',
      ...result.headers
    }
  });
};
