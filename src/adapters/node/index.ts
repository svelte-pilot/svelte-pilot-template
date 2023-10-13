import { createServer } from 'node:http'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sirv from 'sirv'
import render from '../../render'
import template from '/dist/client/index.html?raw'

const PORT = Number(process.env.PORT) || 5173
const serve = sirv(join(fileURLToPath(import.meta.url), '../../client'))

createServer(async (req, res) => {
  const url = req.url || '/'
  console.log(url)

  serve(req, res, async () => {
    const {
      statusCode = 200,
      statusMessage,
      headers,
      body
    } = await render({
      url,
      template,
      headers: req.headers as Record<string, string>
    })

    res.writeHead(statusCode, statusMessage, headers)
    res.end(body)
  })
}).listen(PORT)

console.log(`Server running at http://localhost:${PORT}`)
