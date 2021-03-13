const path = require('path');
const fs = require('fs');

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

const manifest = fs.readFileSync('./dist/ssr-manifest.json', 'utf8');
const regex = new RegExp(escapeRegExp(process.cwd() + path.sep), 'g');
fs.writeFileSync('./dist/ssr-manifest.json', manifest.replace(regex, ''));
