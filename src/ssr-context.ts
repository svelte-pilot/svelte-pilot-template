type StringKV = Record<string, string | undefined>;

export type CookieOptions = {
  maxAge?: number;
  expires?: number | string | Date;
  path?: string;
  domain?: string;
  sameSite?: 'Strict' | 'Lax' | 'None';
  secure?: boolean;
  httpOnly?: boolean;
};

export default class SSRContext {
  req: {
    headers: StringKV;
    cookies: StringKV;
  };

  res: {
    error?: Error;
    statusCode?: number;
    statusMessage?: string;
    headers: Record<string, string | string[] | undefined>;
    cookies: StringKV;
  } = {
      headers: {},
      cookies: {}
    };

  rewrite?: string;

  constructor(headers: StringKV) {
    const cookies = headers.cookie
      ? Object.fromEntries(new URLSearchParams(headers.cookie.replace(/;\s*/g, '&')).entries())
      : {};

    this.req = {
      headers,
      cookies
    };
  }

  setHeader(name: string, value: string | string[]) {
    this.res.headers[name.toLowerCase()] = value;
  }

  getHeader(name: string) {
    return this.res.headers[name.toLowerCase()];
  }

  removeHeader(name: string) {
    delete this.res.headers[name.toLowerCase()];
  }

  setCookie(name: string, value: string, {
    maxAge,
    expires,
    path,
    domain,
    sameSite,
    secure,
    httpOnly
  }: CookieOptions = {}) {
    let cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

    if (maxAge || maxAge === 0) {
      cookie += '; Max-Age=' + maxAge;
    }

    if (expires) {
      if (expires.constructor === Number) {
        expires = new Date(expires);
      }

      cookie += '; Expires=' + (expires instanceof Date ? expires.toUTCString() : expires);
    }

    if (path) {
      cookie += '; Path=' + path;
    }

    if (domain) {
      cookie += '; Domain=' + domain;
    }

    if (sameSite) {
      cookie += '; SameSite=' + sameSite;

      if (sameSite === 'None') {
        secure = true;
      }
    }

    if (secure) {
      cookie += '; Secure';
    }

    if (httpOnly) {
      cookie += '; HttpOnly';
    }

    this.res.headers['set-cookie'] = (this.res.headers['set-cookie'] || []).concat(cookie);
    this.res.cookies[name] = value;
  }

  removeCookie(name: string, options: CookieOptions = {}) {
    this.setCookie(name, '', { ...options, maxAge: 0 });
  }
}
