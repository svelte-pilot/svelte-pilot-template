import { Handler } from '@netlify/functions';
import render from './server-render';
// @ts-expect-error handle by rollup-plugin-string
import template from './index.html';

const handler: Handler = async event => {
  const { error, status, headers, body } = await render(
    {
      url: event.rawUrl,
      template,

      ctx: {
        cookies: event.headers.cookie
          ? Object.fromEntries(
            new URLSearchParams(event.headers.cookie.replace(/;\s*/g, '&')).entries()
          )
          : {},

        headers: event.headers
      }
    }
  );

  if (error) {
    console.error(error);
  }

  return {
    statusCode: status,
    body,
    headers
  };
};

export { handler };
