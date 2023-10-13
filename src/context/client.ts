import cookie from 'cookie.js'
import router from '../router'
import negotiateLanguage from './negotiateLanguage'
import type { Context, CookieOptions } from './type'

export default class ClientContext implements Context {
  setStatus(code: number, message?: string | undefined) {
    // nop
  }

  rewrite(path: string) {
    router.handleClient(path)
    throw 0
  }

  redirect(url: string) {
    router.replace(url)
    throw 0
  }

  setHeader(name: string, value: string | string[]) {
    // nop
  }

  getHeader(name: string) {
    return undefined
  }

  language(available: string[]) {
    return negotiateLanguage(navigator.languages, available)
  }

  setCookie(name: string, value: string, options?: CookieOptions) {
    cookie.set(name, value, options)
  }

  getCookie(name: string) {
    return cookie.get(name)
  }

  removeCookie(name: string, options?: CookieOptions) {
    cookie.remove(name, options)
  }
}
