export type SameSite = 'Lax' | 'None' | 'Strict'

export interface CookieOptions {
  domain?: string
  expires?: Date | number | string
  httpOnly?: boolean
  maxAge?: number
  partitioned?: boolean
  path?: string
  sameSite?: SameSite
  secure?: boolean
}

export type StringKV = Record<string, string | undefined>

export interface Context {
  getCookie: (name: string) => string | undefined
  getHeader: (name: string) => string | undefined
  language: (available: string[]) => string
  redirect: (path: string, statusCode?: number) => never
  removeCookie: (name: string) => void
  rewrite: (path: string) => never
  setCookie: (name: string, value: string, options?: CookieOptions) => void
  setHeader: (name: string, value: string | string[]) => void
  setStatus: (code: number, message?: string) => void
}
