import { createServer } from 'node:http'
import { join } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import sirv from 'sirv'

import render from '../../render'

import template from '/dist/client/index.html?raw'

const PORT = Number(process.env.PORT) || 5173
const serve = sirv(join(fileURLToPath(import.meta.url), '../../client'))

createServer((req, res) => {
  const url = req.url || '/'
  // eslint-disable-next-line no-console
  console.log(url)

  if (url === '/') {
    handler()
  }
  else {
    serve(req, res, handler)
  }

  async function handler() {
    const {
      body,
      headers,
      statusCode = 200,
      statusMessage,
    } = await render({
      headers: req.headers as Record<string, string>,
      template,
      url,
    })

    res.writeHead(statusCode, statusMessage, headers)
    res.end(body)
  }
}).listen(PORT)

// eslint-disable-next-line no-console
console.log(`Server running at http://localhost:${PORT}`)
