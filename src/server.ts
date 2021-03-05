import fs from 'fs';
import path from 'path';
import express, { Response } from 'express';
import { RenderResult } from './types';

async function main() {
  const app = express();
  let manifest: Record<string, string[]>;

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
        response(res, data, template);
      } catch (e) {
        // If an error is caught, let vite fix the stracktrace so it maps back to
        // your actual source code.
        vite.ssrFixStacktrace(e);
        console.error(e);
        res.status(500).end(e.message);
      }
    });
  } else {
    app.use('/assets', express.static(path.resolve(__dirname, 'assets')));

    const { render } = await import('./entry-server.js');
    const template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
    manifest = (await import('./ssr-manifest.json')).default;

    app.use('*', async(req, res) => {
      try {
        res.type('html');
        const data = await render(req.originalUrl, {});
        response(res, data, template);
      } catch (e) {
        console.error(e);
        // Fallback to CSR
        res.status(500).end(template);
      }
    });
  }

  function response(res: Response, data: RenderResult | null, template: string) {
    if (process.env.DEV) {
      console.log(data);
    }

    if (data) {
      res.status(data.status).set(data.headers);

      if (!data.headers.location) {
        const preloadReg = /<link rel="preload" data-href="([^"]+)".*?>/g;
        const preloadTags: Set<string> = new Set();

        data.body.head = data.body.head.replace(preloadReg, (_, href) => {
          if (manifest) {
            const files = manifest[href];

            if (files?.length) {
              files.forEach(file => preloadTags.add(file));
            }
          }

          return '';
        });

        if (preloadTags.size) {
          data.body.head = Array.from(preloadTags).map(preloadLink).join('\n') + data.body.head;
        }

        const html = template
          .replace('<!--ssr-head-->', data.body.head)
          .replace('<!--ssr-css-->', '<style>' + data.body.css + '</style>')
          .replace('<!--ssr-html-->', data.body.html);

        res.end(html);
      }
    } else {
      res.redirect('/');
    }
  }

  app.listen(3000);
  console.log('http://localhost:3000');
}

function preloadLink(href: string) {
  const ext = href.split('.').pop();
  let rel = 'preload';
  let as = '';

  if (ext === 'js') {
    as = 'script';
    rel = 'modulepreload';
  } else if (ext === 'css') {
    as = 'style';
  }

  return as && `<link rel="${rel}" href="${href}" as="${as}">`;
}

main();
