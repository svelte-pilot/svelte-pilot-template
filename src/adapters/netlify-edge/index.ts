import render from '../../render'

import template from '/dist/client/index.html?raw'

export default async (req: Request) => {
  const url = new URL(req.url)

  if (url.pathname.startsWith('/assets/')) {
    return
  }

  const { body, headers, statusCode, statusMessage } = await render({
    headers: Object.fromEntries([...req.headers.entries()]),
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
