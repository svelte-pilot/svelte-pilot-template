import { ServerApp } from "svelte-pilot";
import router from "./router";
import SSRContext from "./ssr-context";

type Params = {
  url: string;
  headers: Record<string, string | undefined>;
  template: string;
};

export type Response = {
  statusCode: number;
  statusMessage?: string;
  headers: Record<string, string | string[] | undefined>;
  body?: string;
  error?: Error;
};

export default async function (args: Params): Promise<Response> {
  try {
    return await render(args);
  } catch (e) {
    return {
      error: e as Error,
      statusCode: 500,

      headers: {
        "Content-Type": "text/html",
        "Cache-Control": "no-store",
      },

      body: args.template, // Fallback to CSR
    };
  }
}

async function render({ url, headers, template }: Params): Promise<Response> {
  const urlObj = new URL(url, "http://127.0.0.1");
  const ctx = new SSRContext(headers);
  let route = await router.handle(urlObj.href, ctx);

  if (!route) {
    throw new Error(
      `${urlObj.href} did not match any routes, please check your routes config`
    );
  }

  if (ctx.rewrite) {
    route = await router.handle(ctx.rewrite, ctx);
  }

  if (!route) {
    throw new Error(
      `${ctx.rewrite} did not match any routes, please check your routes config`
    );
  }

  if (ctx.getHeader("location")) {
    return {
      statusCode: ctx.res.statusCode || 301,
      headers: ctx.res.headers,
    };
  }

  const body = ServerApp.render({ router, route });
  body.html += `<script>__SSR_STATE__ = ${serialize(route.ssrState)}</script>`;

  if (ctx.rewrite) {
    body.html += `<script>__REWRITE__ = ${serialize(ctx.rewrite)}</script>`;
  }

  return {
    statusCode: ctx.res.statusCode || 200,

    headers: {
      "Content-Type": "text/html",
      ...ctx.res.headers,
    },

    body: template
      .replace("</head>", body.head + "</head>")
      .replace(/<body.*?>/, ($0) => $0 + body.html),
  };
}

function serialize(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003C").replace(/>/g, "\\u003E");
}
