import fs from 'fs'
import path from 'path'
import render from '../../render'
import _template from '/dist/index.html?raw'
import urls from '/ssg.json'

async function main() {
  const nojs = process.env.NOJS === '1'

  const template = nojs
    ? _template.replace(/<script\s.+?<\/script>/, '')
    : _template

  for (const url of urls) {
    console.log(url)

    const { body = '' } = await render({
      url,
      template,
      nojs
    })

    const filePath = 'dist' + url + (url.endsWith('/') ? 'index.html' : '.html')

    const dir = path.dirname(filePath)

    if (dir !== 'dist') {
      fs.mkdirSync(dir, { recursive: true })
    }

    fs.writeFileSync(filePath, body)
  }
}

main()
