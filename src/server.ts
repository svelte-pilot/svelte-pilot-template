import http from 'http';
import path from 'path';
import serveStatic from 'serve-static';
import render from './server-render';
// @ts-expect-error handle by rollup-plugin-string
import template from '../client/index.html';

const PORT = Number(process.env.PORT) || 3000;
const serve = serveStatic(path.resolve(path.dirname(new URL(import.meta.url).pathname), '../client'));

http.createServer(async(req, res) => {
  const url = req.url || '/';
  console.log(url);

  if (url.startsWith('/_assets/')) {
    serve(req, res, () => {
      res.statusCode = 404;
      res.end('Not Found');
    });
  } else {
    const { statusCode, statusMessage, headers, body, error } = await render(
      {
        url,
        template,
        headers: req.headers as Record<string, string>
      }
    );

    if (error) {
      console.error(error);
    }

    if (statusMessage) {
      res.statusMessage = statusMessage;
    }

    res.writeHead(statusCode, headers);
    res.end(body);
  }
}).listen(PORT);
