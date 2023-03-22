import { Handler } from '@netlify/functions';
import render from '../server-render';
// @ts-expect-error handle by rollup-plugin-string
import template from '../../client/index.html';

const handler: Handler = async event => {
  const url = new URL(event.rawUrl);

  const { statusCode, headers, body, error } = await render({
    url: url.pathname + url.search,
    template,
    headers: event.headers
  });

  if (error) {
    console.error(error);
  }

  const singleValueHeaders: Record<string, string> = {};
  const multiValueHeaders: Record<string, string[]> = {};

  for (const [key, value] of Object.entries(headers)) {
    if (Array.isArray(value)) {
      multiValueHeaders[key] = value;
    } else if (value) {
      singleValueHeaders[key] = value;
    }
  }

  return {
    statusCode,
    body,
    headers: singleValueHeaders,
    multiValueHeaders
  };
};

export { handler };
