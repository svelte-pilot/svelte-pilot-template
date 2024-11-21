import cookie from 'cookie.js'

import type { Context, CookieOptions } from './types'

import router from '../router'
import Interruption from './Interruption'
import negotiateLanguage from './negotiateLanguage'

export default class ClientContext implements Context {
  getCookie(name: string) {
    return cookie.get(name)
  }

  getHeader() {
    return undefined
  }

  language(available: string[]) {
    return negotiateLanguage(navigator.languages, available)
  }

  redirect(url: string): never {
    router.replace(url)
    throw new Interruption()
  }

  removeCookie(name: string, options?: CookieOptions) {
    cookie.remove(name, options)
  }

  rewrite(path: string): never {
    router.handleClient(path)
    throw new Interruption()
  }

  setCookie(name: string, value: string, options?: CookieOptions) {
    cookie.set(name, value, options)
  }

  setHeader() {
    // nop
  }

  setStatus() {
    // nop
  }
}
