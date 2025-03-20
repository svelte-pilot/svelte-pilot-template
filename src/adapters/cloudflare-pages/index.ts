import render from '../../render'

import template from '/dist/index.html?raw'

export const onRequest: PagesFunction = async (ctx) => {
  const url = new URL(ctx.request.url)

  const {
    body = '',
    headers = {},
    statusCode,
    statusMessage,
  } = await render({
    headers: Object.fromEntries([...ctx.request.headers.entries()]),
    template,
    url: url.pathname + url.search,
  })

  return new Response(body, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
      ...headers,
    },
    status: statusCode,
    statusText: statusMessage,
  })
}
