import render from '../../render'
import template from '/dist/client/index.html?raw'

export default async (req: Request) => {
  const url = new URL(req.url)

  if (url.pathname.startsWith('/assets/')) {
    return
  }

  const { statusCode, statusMessage, headers, body } = await render({
    url: url.pathname + url.search,
    headers: Object.fromEntries([...req.headers.entries()]),
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
