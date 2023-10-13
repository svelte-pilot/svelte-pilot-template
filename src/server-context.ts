import type { Context, CookieOptions, StringKV } from './context-interface'

export default class ServerContext implements Context {
  statusCode?: number
  statusMessage?: string
  _rewrite?: string
  resHeaders: Record<string, string | string[] | undefined> = {}
  reqHeaders: StringKV = {}
  cookies: StringKV = {}

  constructor(headers?: StringKV) {
    if (headers) {
      this.reqHeaders = headers

      const cookies = headers.cookie
        ? Object.fromEntries(
            new URLSearchParams(headers.cookie.replace(/;\s*/g, '&')).entries()
          )
        : {}

      this.cookies = cookies
    }
  }

  setStatus(code: number, message?: string): void {
    this.statusCode = code
    this.statusMessage = message
  }

  rewrite(path: string) {
    this._rewrite = path
  }

  redirect(url: string, statusCode = 302) {
    this.setHeader('location', url)
    this.statusCode = statusCode
  }

  setHeader(name: string, value: string | string[]) {
    this.resHeaders[name.toLowerCase()] = value
  }

  getHeader(name: string) {
    return this.reqHeaders[name.toLowerCase()]
  }

  setCookie(
    name: string,
    value: string,
    {
      domain,
      expires,
      maxAge,
      partitioned,
      path,
      sameSite,
      secure,
      httpOnly
    }: CookieOptions = {}
  ) {
    let cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value)

    if (domain) {
      cookie += '; Domain=' + domain
    }

    if (expires) {
      if (expires.constructor === Number) {
        expires = new Date(expires)
      }

      cookie +=
        '; Expires=' +
        (expires instanceof Date ? expires.toUTCString() : expires)
    }

    if (maxAge || maxAge === 0) {
      cookie += '; Max-Age=' + maxAge
    }

    if (partitioned) {
      cookie += '; Partitioned'
    }

    if (path) {
      cookie += '; Path=' + path
    }

    if (sameSite) {
      cookie += '; SameSite=' + sameSite

      if (sameSite === 'None') {
        secure = true
      }
    }

    if (secure) {
      cookie += '; Secure'
    }

    if (httpOnly) {
      cookie += '; HttpOnly'
    }

    if (!this.resHeaders['set-cookie']) {
      this.resHeaders['set-cookie'] = []
    }

    ;(this.resHeaders['set-cookie'] as string[]).push(cookie)
  }

  getCookie(name: string) {
    return this.cookies[name]
  }

  removeCookie(name: string, options: CookieOptions = {}) {
    if (this.cookies[name]) {
      this.setCookie(name, '', { ...options, maxAge: 0 })
    }
  }
}
