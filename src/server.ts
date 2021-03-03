import fs from 'fs';
import path from 'path';
import express from 'express';
import type { Response } from './entry-server';

async function main() {
  const app = express();

  if (process.env.DEV) {
    const { createServer } = await import('vite');

    const vite = await createServer({
      server: { middlewareMode: true }
    });

    app.use(vite.middlewares);

    app.use('*', async(req, res) => {
      try {
        const url = req.originalUrl;

        // 1. Read index.html
        let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');

        // 2. Apply vite HTML transforms. This injects the vite HMR client, and
        //    also applies HTML transforms from Vite plugins, e.g. global preambles
        //    from @vitejs/plugin-react-refresh
        template = await vite.transformIndexHtml(url, template);

        // 3. Load the server entry. vite.ssrLoadModule automatically transforms
        //    your ESM source code to be usable in Node.js! There is no bundling
        //    required, and provides efficient invalidation similar to HMR.
        const { render } = await vite.ssrLoadModule('/entry-server.ts');

        // 4. render the app HTML. This assumes entry-server.js's exported `render`
        //    function calls appropriate framework SSR APIs,
        //    e.g. ReacDOMServer.renderToString()
        const data = await render(url, {});

        if (data) {
          // 5. Inject the app-rendered HTML into the template.
          const html = injectHTML(data, template);
          // 6. Send the rendered HTML back.
          res.status(200).type('html').end(html);
        } else {
          res.status(404).end();
        }
      } catch (e) {
        // If an error is caught, let vite fix the stracktrace so it maps back to
        // your actual source code.
        vite.ssrFixStacktrace(e);
        console.error(e);
        res.status(500).end(e.message);
      }
    });
  } else {
    const { render } = await import('./entry-server');
    const template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');

    app.use('*', async(req, res) => {
      try {
        res.type('html');
        const data = await render(req.originalUrl, {});

        if (data) {
          // 5. Inject the app-rendered HTML into the template.
          const html = injectHTML(data, template);
          // 6. Send the rendered HTML back.
          res.status(200).end(html);
        } else {
          res.status(404).end(template);
        }
      } catch (e) {
        console.error(e);
        // Fallback to CSR
        res.status(500).end(template);
      }
    })
  }

  function injectHTML(data: Response, template: string) {
    return template
      .replace('<!--ssr-head-->', data.body.head)
      .replace('<!--ssr-css-->', '<style>' + data.body.css + '</style>')
      .replace('<!--ssr-html-->', data.body.html);
  }

  app.listen(3000);
}

main();
