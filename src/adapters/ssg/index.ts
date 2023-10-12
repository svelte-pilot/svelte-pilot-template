import fs from 'fs'
import path from 'path'
import render from '../../render'
import _template from '/dist/index.html?raw'
import packageJson from '/package.json'

async function main() {
  const urls = packageJson.ssg
  const nojs = process.env.NOJS == '1'

  const template = nojs
    ? _template.replace(/<script\s.+?<\/script>/, '')
    : _template

  for (const url of urls) {
    console.log(url)

    let { body = '' } = await render({
      url,
      template,
      nojs
    })

    if (nojs) {
      const parts = body.split('</head>')
      const head = parts[0].replace(/<!--.+?-->/g, '').replace(/\n\s+\n/g, '\n')
      body = head + '</head>' + parts[1]
    }

    const filePath = 'dist' + url + (url.endsWith('/') ? 'index.html' : '.html')

    const dir = path.dirname(filePath)

    if (dir !== 'dist') {
      fs.mkdirSync(dir, { recursive: true })
    }

    fs.writeFileSync(filePath, body)
  }
}

main()
