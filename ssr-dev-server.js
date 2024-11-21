import fs from 'node:fs'
import { createServer } from 'node:http'
import process from 'node:process'
import { createServer as createViteDevServer } from 'vite'

const PORT = Number(process.env.PORT) || 5173

// eslint-disable-next-line antfu/no-top-level-await
const vite = await createViteDevServer({
  appType: 'custom',
  server: { middlewareMode: true },
})

createServer((req, res) => {
  vite.middlewares(req, res, async () => {
    try {
      // 1. Read index.html
      let template = fs.readFileSync('index.html', 'utf-8')

      // 2. Apply Vite HTML transforms. This injects the Vite HMR client,
      //    and also applies HTML transforms from Vite plugins, e.g. global
      //    preambles from @vitejs/plugin-react
      template = await vite.transformIndexHtml(req.url, template)

      // 3. Load the server entry. ssrLoadModule automatically transforms
      //    ESM source code to be usable in Node.js! There is no bundling
      //    required, and provides efficient invalidation similar to HMR.
      const { default: render } = await vite.ssrLoadModule('/src/render.ts')

      // 4. render the app HTML. This assumes entry-server.js's exported
      //     `render` function calls appropriate framework SSR APIs,
      //    e.g. ReactDOMServer.renderToString()
      const {
        body,
        headers,
        statusCode = 200,
        statusMessage,
      } = await render({
        headers: req.headers,
        template,
        url: req.url,
      })

      res.writeHead(statusCode, statusMessage, headers)
      res.end(body)
    }
    catch (e) {
      // If an error is caught, let Vite fix the stack trace so it maps back
      // to your actual source code.
      vite.ssrFixStacktrace(e)
      console.error(e)
      res.writeHead(500, { 'Content-Type': 'text/plain' })
      res.end(e.message)
    }
  })
}).listen(PORT)

// eslint-disable-next-line no-console
console.log(`Server running at http://localhost:${PORT}`)
