export type SameSite = 'Lax' | 'Strict' | 'None'

export interface CookieOptions {
  domain?: string
  expires?: number | string | Date
  maxAge?: number
  partitioned?: boolean
  path?: string
  sameSite?: SameSite
  secure?: boolean
  httpOnly?: boolean
}

export type StringKV = Record<string, string | undefined>

export interface Context {
  setStatus(code: number, message?: string): void
  rewrite(path: string): void
  redirect(path: string, statusCode?: number): void
  setHeader(name: string, value: string | string[]): void
  getHeader(name: string): string | undefined
  setCookie(name: string, value: string, options?: CookieOptions): void
  getCookie(name: string): string | undefined
  removeCookie(name: string): void
}
