import render from '../../render'
import template from '/dist/index.html?raw'

export const onRequest: PagesFunction = async ctx => {
  const url = new URL(ctx.request.url)

  const {
    statusCode,
    statusMessage,
    headers = {},
    body = ''
  } = await render({
    url: url.pathname + url.search,
    headers: Object.fromEntries([...ctx.request.headers.entries()]),
    template
  })

  return new Response(body, {
    status: statusCode,
    statusText: statusMessage,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      ...headers
    }
  })
}
