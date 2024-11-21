import type { CookieOptions } from './types'

export default function setCookieHeader(
  name: string,
  value: string,
  {
    domain,
    expires,
    httpOnly,
    maxAge,
    partitioned,
    path,
    sameSite,
    secure,
  }: CookieOptions = {},
) {
  let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`

  if (domain) {
    cookie += `; Domain=${domain}`
  }

  if (expires) {
    if (expires.constructor === Number) {
      expires = new Date(expires)
    }

    cookie
      += `; Expires=${expires instanceof Date ? expires.toUTCString() : expires}`
  }

  if (maxAge || maxAge === 0) {
    cookie += `; Max-Age=${maxAge}`
  }

  if (partitioned) {
    cookie += '; Partitioned'
  }

  if (path) {
    cookie += `; Path=${path}`
  }

  if (sameSite) {
    cookie += `; SameSite=${sameSite}`

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

  return cookie
}
