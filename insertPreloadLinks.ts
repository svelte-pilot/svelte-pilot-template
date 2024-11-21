import mime from 'mime'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const reg = {}

export default function () {
  const manifest: Record<string, string[]> = JSON.parse(
    fs.readFileSync(
      `${process.env.CSR_OUT || 'dist/client'}/.vite/ssr-manifest.json`,
      'utf-8',
    ),
  )

  const nojs = process.env.NOJS === '1'

  for (const p in manifest) {
    if (
      !p.endsWith('.svelte')
      || p.startsWith('node_modules')
      || p.startsWith('\u0000')
    ) {
      delete manifest[p]
      continue
    }

    manifest[p] = manifest[p].filter(f => !f.includes('-legacy'))

    if (!manifest[p].length) {
      delete manifest[p]
      continue
    }

    if (!path.isAbsolute(p)) {
      manifest[path.resolve(p)] = manifest[p]
      delete manifest[p]
    }
  }

  return {
    markup({ content, filename }) {
      const files = manifest[filename]

      if (files) {
        const headTag = '<svelte:head>'
        const tags
          = `${headTag
          }\n${
            files.map(preloadLink).filter(Boolean).join('\n')
          }\n`

        content = content.includes(headTag)
          ? content.replace(headTag, tags)
          : `${tags}</svelte:head>\n${content}`
      }

      return {
        code: content,
      }
    },
  }

  function preloadLink(href) {
    if (reg[href]) {
      return ''
    }
    else {
      reg[href] = true
    }

    const ext = href.split('.').pop()

    if (ext === 'js') {
      return nojs ? '' : `<link href="${href}" rel="modulepreload" as="script">`
    }
    else if (ext === 'css') {
      return `<link href="${href}" rel="stylesheet">`
    }
    else if (
      ['apng', 'gif', 'ico', 'jpeg', 'jpg', 'png', 'webp'].includes(ext)
    ) {
      return `<link href="${href}" rel="preload" as="image" type="${mime.getType(
        ext,
      )}">`
    }
    else if (['eot', 'otf', 'ttf', 'woff', 'woff2'].includes(ext)) {
      return `<link href="${href}" rel="preload" as="font" type="${mime.getType(
        ext,
      )}" crossorigin>`
    }
    else {
      return ''
    }
  }
}
