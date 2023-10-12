import type { Context, CookieOptions, StringKV } from './context-interface'

export default class ServerContext implements Context {
  statusCode?: number
  statusMessage?: string
  _rewrite?: string
  headers: Record<string, string | string[] | undefined> = {}
  cookies: StringKV = {}

  constructor(headers?: StringKV) {
    if (headers) {
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
    this.headers[name.toLowerCase()] = value
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

    if (!this.headers['set-cookie']) {
      this.headers['set-cookie'] = []
    }

    ;(this.headers['set-cookie'] as string[]).push(cookie)
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
