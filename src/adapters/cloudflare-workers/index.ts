import render from '../../render'

import template from '/dist/client/index.html?raw'

export default {
  async fetch(request/* , env, ctx */): Promise<Response> {
    const url = new URL(request.url)

    const {
      body = '',
      headers = {},
      statusCode,
      statusMessage,
    } = await render({
      headers: Object.fromEntries([...request.headers.entries()]),
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
  },
} satisfies ExportedHandler<Env>
