import type { Handler } from '@netlify/functions'

import render from '../../render'

import template from '/dist/client/index.html?raw'

export const handler: Handler = async (event) => {
  const url = new URL(event.rawUrl)

  const {
    body,
    headers,
    statusCode = 200,
  } = await render({
    headers: event.headers,
    template,
    url: url.pathname + url.search,
  })

  const singleValueHeaders: Record<string, string> = {}
  const multiValueHeaders: Record<string, string[]> = {}

  if (headers) {
    for (const [key, value] of Object.entries(headers)) {
      if (Array.isArray(value)) {
        multiValueHeaders[key] = value
      }
      else if (value) {
        singleValueHeaders[key] = value
      }
    }
  }

  return {
    body,
    headers: singleValueHeaders,
    multiValueHeaders,
    statusCode,
  }
}
