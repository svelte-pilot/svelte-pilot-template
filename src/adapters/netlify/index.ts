import type { Handler } from '@netlify/functions'
import template from '../../../dist/client/index.html?raw'
import render from '../../render'

export const handler: Handler = async event => {
  const url = new URL(event.rawUrl)

  const {
    statusCode = 200,
    headers,
    body
  } = await render({
    url: url.pathname + url.search,
    template,
    headers: event.headers
  })

  const singleValueHeaders: Record<string, string> = {}
  const multiValueHeaders: Record<string, string[]> = {}

  if (headers) {
    for (const [key, value] of Object.entries(headers)) {
      if (Array.isArray(value)) {
        multiValueHeaders[key] = value
      } else if (value) {
        singleValueHeaders[key] = value
      }
    }
  }

  return {
    statusCode,
    body,
    headers: singleValueHeaders,
    multiValueHeaders
  }
}
