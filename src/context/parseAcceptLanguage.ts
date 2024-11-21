export default function parseAcceptLanguage(header?: string) {
  if (!header) {
    return []
  }

  const langs: Array<[string, number]> = []
  const pattern = /([a-z]+(?:-[a-z]+)*) *(?:; *q *= *(1|0\.\d+))?/gi
  let result: null | RegExpExecArray

  // eslint-disable-next-line no-cond-assign
  while ((result = pattern.exec(header))) {
    langs.push([result[1], Number(result[2] || 1)])
  }

  langs.sort((a, b) => {
    return b[1] - a[1]
  })

  return langs.map(item => item[0])
}
