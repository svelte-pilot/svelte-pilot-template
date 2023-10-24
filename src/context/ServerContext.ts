import negotiateLanguage from './negotiateLanguage'
import parseAcceptLanguage from './parseAcceptLanguage'
import setCookieHeader from './setCookieHeader'
import type { Context, CookieOptions, StringKV } from './types'

export default class ServerContext implements Context {
  statusCode?: number
  statusMessage?: string
  _rewrite?: string
  headers: Record<string, string | string[] | undefined> = {}
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
    throw 0
  }

  redirect(url: string, statusCode = 302) {
    this.setHeader('location', url)
    this.statusCode = statusCode
    throw 0
  }

  setHeader(name: string, value: string | string[]) {
    this.headers[name.toLowerCase()] = value
  }

  getHeader(name: string) {
    return this.reqHeaders[name.toLowerCase()]
  }

  language(available: string[]) {
    return negotiateLanguage(
      parseAcceptLanguage(this.reqHeaders['accept-language']),
      available
    )
  }

  setCookie(name: string, value: string, options: CookieOptions = {}) {
    if (!this.headers['set-cookie']) {
      this.headers['set-cookie'] = []
    }

    ;(this.headers['set-cookie'] as string[]).push(
      setCookieHeader(name, value, options)
    )
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
