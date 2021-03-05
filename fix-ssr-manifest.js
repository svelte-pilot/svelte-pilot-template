const path = require('path');
const fs = require('fs');

const manifest = fs.readFileSync('./dist/ssr-manifest.json', 'utf8');
fs.writeFileSync('./dist/ssr-manifest.json', manifest.replaceAll(process.cwd() + path.sep, ''));
