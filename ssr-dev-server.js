import fs from 'fs'
import http from 'http'
import { createServer } from 'vite'

const PORT = Number(process.env.PORT) || 5173

const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom'
})

http
  .createServer((req, res) => {
    vite.middlewares(req, res, async () => {
      try {
        // 1. Read index.html
        let template = fs.readFileSync('index.html', 'utf-8')

        // 2. Apply vite HTML transforms. This injects the vite HMR client, and
        //    also applies HTML transforms from Vite plugins, e.g. global preambles
        //    from @vitejs/plugin-react-refresh
        template = await vite.transformIndexHtml(req.url, template)

        // 3. Load the server entry. vite.ssrLoadModule automatically transforms
        //    your ESM source code to be usable in Node.js! There is no bundling
        //    required, and provides efficient invalidation similar to HMR.
        const { default: render } = await vite.ssrLoadModule('/src/render.ts')

        // 4. render the app HTML. This assumes entry-server.js's exported `render`
        //    function calls appropriate framework SSR APIs,
        //    e.g. ReacDOMServer.renderToString()
        const {
          statusCode = 200,
          statusMessage,
          headers,
          body
        } = await render({
          url: req.url,
          template,
          headers: req.headers
        })

        res.writeHead(statusCode, statusMessage, headers)
        res.end(body)
      } catch (e) {
        // If an error is caught, let vite fix the stracktrace so it maps back to
        // your actual source code.
        vite.ssrFixStacktrace(e)
        console.error(e)
        res.writeHead(500, { 'Content-Type': 'text/plain' })
        res.end(e.message)
      }
    })
  })
  .listen(PORT)

console.log(`Server running at http://localhost:${PORT}`)
