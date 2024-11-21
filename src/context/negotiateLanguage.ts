export default function negotiateLanguage(
  accept: readonly string[],
  available: readonly string[],
) {
  for (const lang of accept) {
    if (available.includes(lang)) {
      return lang
    }
  }

  for (const a of accept) {
    const primary = a.split('-')[0]

    for (const b of available) {
      if (b.split('-')[0] === primary) {
        return b
      }
    }
  }

  return available[0]
}
