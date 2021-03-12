import { IncomingHttpHeaders } from 'http';

export type RenderResult = {
  status: number,
  headers: Record<string, string>,

  body: {
    head: string,
    html: string,
    css: string
  }
};

export type SSRContext = {
  cookies: Record<string, string>,
  headers: IncomingHttpHeaders
};

export type APIResult = {
  title: string,
  content: string
};