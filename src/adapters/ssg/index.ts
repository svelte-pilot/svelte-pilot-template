import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

import render from '../../render'

import _template from '/dist/index.html?raw'
import urls from '/ssg.json'

async function main() {
  const nojs = process.env.NOJS === '1'

  const template = nojs
    ? _template.replace(/<script\s.+?<\/script>/, '')
    : _template

  for (const url of urls) {
    // eslint-disable-next-line no-console
    console.log(url)

    const { body = '' } = await render({
      nojs,
      template,
      url,
    })

    const filePath = `dist${url}${url.endsWith('/') ? 'index.html' : '.html'}`

    const dir = path.dirname(filePath)

    if (dir !== 'dist') {
      fs.mkdirSync(dir, { recursive: true })
    }

    fs.writeFileSync(filePath, body)
  }
}

main()
