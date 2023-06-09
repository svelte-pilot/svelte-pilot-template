import render from "../../server-render";
// @ts-expect-error handle by rollup-plugin-string
import template from "../../../client/index.html";

export default async (req: Request) => {
  const url = new URL(req.url);

  if (url.pathname.startsWith("/_assets/")) {
    return;
  }

  const result = await render({
    url: url.pathname + url.search,
    headers: Object.fromEntries([...req.headers.entries()]),
    template,
  });

  if (result.error) {
    console.error(result.error);
  }

  return new Response(result.body, {
    status: result.statusCode || 200,
    statusText: result.statusMessage || "OK",
    headers: {
      "content-type": "text/html; charset=utf-8",
      ...result.headers,
    },
  });
};
