import type { Context, CookieOptions, StringKV } from './types'

import Interruption from './Interruption'
import negotiateLanguage from './negotiateLanguage'
import parseAcceptLanguage from './parseAcceptLanguage'
import setCookieHeader from './setCookieHeader'

export default class ServerContext implements Context {
  _rewrite?: string
  cookies: StringKV = {}
  headers: Record<string, string | string[] | undefined> = {}
  reqHeaders: StringKV = {}
  statusCode?: number
  statusMessage?: string

  constructor(headers?: StringKV) {
    if (headers) {
      this.reqHeaders = headers

      const cookies = headers.cookie
        ? Object.fromEntries(
          new URLSearchParams(headers.cookie.replace(/;\s*/g, '&')).entries(),
        )
        : {}

      this.cookies = cookies
    }
  }

  getCookie(name: string) {
    return this.cookies[name]
  }

  getHeader(name: string) {
    return this.reqHeaders[name.toLowerCase()]
  }

  language(available: string[]) {
    return negotiateLanguage(
      parseAcceptLanguage(this.reqHeaders['accept-language']),
      available,
    )
  }

  redirect(url: string, statusCode = 302): never {
    this.setHeader('location', url)
    this.statusCode = statusCode
    throw new Interruption()
  }

  removeCookie(name: string, options: CookieOptions = {}) {
    if (this.cookies[name]) {
      this.setCookie(name, '', { ...options, maxAge: 0 })
    }
  }

  rewrite(path: string): never {
    this._rewrite = path
    throw new Interruption()
  }

  setCookie(name: string, value: string, options: CookieOptions = {}) {
    if (!this.headers['set-cookie']) {
      this.headers['set-cookie'] = []
    }

    ;(this.headers['set-cookie'] as string[]).push(
      setCookieHeader(name, value, options),
    )
  }

  setHeader(name: string, value: string | string[]) {
    this.headers[name.toLowerCase()] = value
  }

  setStatus(code: number, message?: string): void {
    this.statusCode = code
    this.statusMessage = message
  }
}
